/**
 * Uploads tour images from /app/tour-images to Cloudinary and stores the URLs in the DB.
 * Run with: docker-compose exec app npx tsx script/upload-tour-images.ts
 */
import { readdirSync, existsSync } from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { Pool } from "pg";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const IMAGES_ROOT = "/app/tour-images";

// Map: folder name → tour id
const mapping: Record<string, number> = {
  "2-Day Atlas Trek with Village Stay":             26,
  "2-Day Mount Toubkal Ascent":                     16,
  "2-Day Weekend Atlas Escape":                     15,
  "3-Day Atlas to Zagora Desert":                    3,
  "3-Day Berber Villages Circuit":                  25,
  "3-Day Toubkal via Azzaden & Aguelzim":           17,
  "4-Day Artisan Villages & Craft Tour":             4,
  "4-Day Family Atlas Adventure":                   11,
  "4-Day Gorges & Valleys Explorer":                 9,
  "4-Day Winter Toubkal Snowshoe Trek":             12,
  "5-Day Atlas to Merzouga Desert":                  2,
  "5-Day Luxury Atlas Experience":                  14,
  "5-Day Nomadic Trails of Southeast Morocco":       5,
  "5-Day Sahara Photography Expedition":             7,
  "6-Day M'Goun Massif Traverse":                   10,
  "6-Day Toubkal Circuit via Lake Ifni":            18,
  "7-Day Atlas Multi-Activity Adventure":           13,
  "7-Day Atlas Villages Cultural Immersion":        29,
  "7-Day Sahara Desert Expedition":                  6,
  "Angour Ridge to Tachedirt":                      28,
  "Hidden 4000ers Weekend":                         30,
  "High Atlas Skyline Traverse":                    27,
  "Ras & Timesguida (Ouanoukrim)":                  19,
  "Timesguida":                                     19, // Additional images for same tour
  "Tizi n'Tamatert Balconies to Tachedirt":         24,
  "azzaden-tamsolt":                                 8,
  "chamharouchday":                                 23,
  "imlil-aroumd-day-loop":                          20,
  "m-goun-massif":                                  10, // Additional images for same tour
  "tamsoult-waterfalls-hidden-cascade":             22,
  "tizi-mzik-day-trek":                             21,
};

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

async function uploadFolder(folder: string, tourId: number): Promise<string[]> {
  const folderPath = path.join(IMAGES_ROOT, folder);
  if (!existsSync(folderPath)) {
    console.warn(`  SKIP  "${folder}" — folder not found`);
    return [];
  }

  const files = readdirSync(folderPath).filter((f) =>
    IMAGE_EXTS.has(path.extname(f).toLowerCase())
  );

  if (files.length === 0) {
    console.warn(`  SKIP  "${folder}" — no image files`);
    return [];
  }

  const urls: string[] = [];
  for (const file of files) {
    const filePath = path.join(folderPath, file);
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: `atlas-hikes/tours/${tourId}`,
        use_filename: true,
        unique_filename: true,
        overwrite: false,
      });
      urls.push(result.secure_url);
      process.stdout.write(".");
    } catch (err: any) {
      console.warn(`\n  WARN  "${file}" — ${err.message}`);
    }
  }
  return urls;
}

async function main() {
  // Group folders by tour id so we merge images from duplicate folders (e.g. m-goun-massif + 6-Day M'Goun)
  const tourImages: Map<number, string[]> = new Map();

  for (const [folder, tourId] of Object.entries(mapping)) {
    process.stdout.write(`\nUploading "${folder}" → tour ${tourId} `);
    const urls = await uploadFolder(folder, tourId);
    const existing = tourImages.get(tourId) ?? [];
    tourImages.set(tourId, [...existing, ...urls]);
    console.log(` (${urls.length} uploaded)`);
  }

  console.log("\nUpdating database...");
  let updated = 0;
  for (const [tourId, urls] of tourImages.entries()) {
    if (urls.length === 0) continue;
    await pool.query(
      "UPDATE tours SET images = $1 WHERE id = $2",
      [urls, tourId]
    );
    console.log(`  OK  tour ${tourId} — ${urls.length} image(s)`);
    updated++;
  }

  console.log(`\nDone. Updated ${updated} tours.`);
  await pool.end();
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
