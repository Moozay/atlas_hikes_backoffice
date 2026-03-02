/**
 * Seed script: imports tours from script/tours.ts into the database.
 * Run inside Docker with:
 *   docker compose exec app npx tsx script/seed-tours.ts
 */
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { tours } from "../shared/schema";
import { allTours } from "./tours";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

/** Map free-text difficulty strings to the DB enum */
function mapDifficulty(raw: string): "easy" | "moderate" | "difficult" | "extreme" {
  const s = raw.toLowerCase();
  if (s.includes("extreme") || s.includes("mountaineering")) return "extreme";
  if (s.includes("very challeng") || s.includes("challeng")) return "difficult";
  if (s.includes("moderate")) return "moderate";
  return "easy";
}

/** Build a unique slug from the tour's id field */
function toSlug(id: string): string {
  return id
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function seed() {
  console.log(`Seeding ${allTours.length} tours…`);

  let inserted = 0;
  let skipped = 0;

  for (const tour of allTours) {
    const slug = toSlug(tour.id);

    // Combine the primary image + images array, deduplicate
    const imageSet = new Set<string>();
    if (tour.image) imageSet.add(tour.image);
    if (Array.isArray(tour.images)) tour.images.forEach((img) => imageSet.add(img));
    const images = Array.from(imageSet).filter(Boolean);

    const row = {
      title: tour.title,
      slug,
      region: tour.location ?? "Morocco",
      description: tour.description,
      durationDays: tour.duration,
      difficulty: mapDifficulty(tour.difficulty),
      price: tour.price,
      status: "published" as const,
      featured: tour.featured ?? false,
      images,
      highlights:           (tour.highlights           ?? []) as string[],
      itinerary:            (tour.itinerary            ?? []) as any[],
      included:             (tour.included             ?? []) as string[],
      excluded:             (tour.excluded             ?? []) as string[],
      whatToBring:          (tour.whatToBring          ?? []) as string[],
      bestTime:             tour.bestTime             ?? null,
      physicalRequirements: tour.physicalRequirements ?? null,
      culturalNotes:        tour.culturalNotes        ?? null,
      groupSize:            tour.groupSize            ?? null,
      category:             tour.category            ?? null,
      reviews:              (tour.reviews             ?? []) as any[],
      routeGeoJson:         tour.routeGeoJson        ?? null,
    };

    try {
      await db
        .insert(tours)
        .values(row)
        .onConflictDoUpdate({
          target: tours.slug,
          set: {
            highlights:           row.highlights,
            itinerary:            row.itinerary,
            included:             row.included,
            excluded:             row.excluded,
            whatToBring:          row.whatToBring,
            bestTime:             row.bestTime,
            physicalRequirements: row.physicalRequirements,
            culturalNotes:        row.culturalNotes,
            groupSize:            row.groupSize,
            category:             row.category,
            reviews:              row.reviews,
            routeGeoJson:         row.routeGeoJson,
          },
        });

      console.log(`  ✓ ${tour.title}`);
      inserted++;
    } catch (err: any) {
      console.error(`  ✗ ${tour.title}: ${err.message}`);
      skipped++;
    }
  }

  console.log(`\nDone — ${inserted} inserted, ${skipped} skipped.`);
  await pool.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
