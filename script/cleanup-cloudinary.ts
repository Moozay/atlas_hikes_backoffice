/**
 * Deletes Cloudinary images under atlas-hikes/tours that are not
 * referenced by any tour in the database.
 *
 * Run with: docker compose exec app npx tsx script/cleanup-cloudinary.ts
 */
import { v2 as cloudinary } from "cloudinary";
import { Pool } from "pg";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function getAllCloudinaryResources(): Promise<{ public_id: string; secure_url: string }[]> {
  const all: { public_id: string; secure_url: string }[] = [];
  let next: string | undefined;
  do {
    const res: any = await cloudinary.api.resources({
      type: "upload",
      prefix: "atlas-hikes/tours",
      max_results: 500,
      next_cursor: next,
    });
    all.push(...res.resources.map((r: any) => ({ public_id: r.public_id, secure_url: r.secure_url })));
    next = res.next_cursor;
  } while (next);
  return all;
}

async function getLinkedUrls(): Promise<Set<string>> {
  const { rows } = await pool.query("SELECT unnest(images) AS url FROM tours");
  return new Set(rows.map((r: any) => r.url as string));
}

async function main() {
  console.log("Fetching all Cloudinary images...");
  const resources = await getAllCloudinaryResources();
  console.log(`  Found ${resources.length} images in Cloudinary`);

  console.log("Fetching linked URLs from database...");
  const linked = await getLinkedUrls();
  console.log(`  Found ${linked.size} image URLs linked to tours`);

  // An image is orphaned if its secure_url doesn't appear in the DB set.
  // Cloudinary URLs can have version numbers (v1234.../path) — normalise by
  // stripping the version segment for comparison.
  function stripVersion(url: string): string {
    return url.replace(/\/v\d+\//, "/");
  }

  const linkedNorm = new Set([...linked].map(stripVersion));

  const orphans = resources.filter((r) => !linkedNorm.has(stripVersion(r.secure_url)));
  console.log(`\n  Orphaned images (not linked to any tour): ${orphans.length}`);

  if (orphans.length === 0) {
    console.log("Nothing to delete.");
    await pool.end();
    return;
  }

  // Delete in batches of 100 (Cloudinary API limit)
  const BATCH = 100;
  let deleted = 0;
  for (let i = 0; i < orphans.length; i += BATCH) {
    const batch = orphans.slice(i, i + BATCH).map((r) => r.public_id);
    const result = await cloudinary.api.delete_resources(batch);
    const ok = Object.values(result.deleted).filter((v) => v === "deleted").length;
    deleted += ok;
    process.stdout.write(`  Deleted batch ${Math.floor(i / BATCH) + 1}: ${ok}/${batch.length} OK\n`);
  }

  console.log(`\nDone. Deleted ${deleted} orphaned images.`);
  await pool.end();
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
