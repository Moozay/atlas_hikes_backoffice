/**
 * Uploads GeoJSON file content into the route_geo_json column for each tour.
 * Run with: tsx script/upload-geojson.ts
 */
import { readFileSync, existsSync } from "fs";
import path from "path";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Map: tour id → geojson filename (relative to client/public/routes/)
const mapping: Record<number, string> = {
  1:  "toubkal-trek.geojson",
  2:  "atlas-sahara-5day-merzouga.geojson",
  3:  "atlas-sahara-3day-zagora.geojson",
  4:  "artisan-villages-craft-tour.geojson",
  5:  "southeast-nomad-trail-5day.geojson",
  6:  "sahara-expedition-7day.geojson",
  7:  "desert-photography-5day.geojson",
  8:  "berber-summer-pastures-trek.geojson",
  9:  "southeast-gorges-valleys-4day.geojson",
  10: "mgoun-massif-traverse.geojson",
  11: "family-atlas-adventure-4day.geojson",
  12: "winter-toubkal-snowshoe-trek.geojson",
  13: "atlas-adventure-combo-7day.geojson",
  14: "luxury-atlas-experience-5day.geojson",
  15: "weekend-atlas-escape-2day.geojson",
  16: "toubkal-2day-ascent.geojson",
  17: "toubkal-3day-azzaden-aguelzim.geojson",
  18: "toubkal-circuit-lake-ifni-6day.geojson",
  19: "ouanoukrim-ras-timesguida.geojson",
  20: "imlil-aroumd.geojson",
  21: "tizi-mzik-pass-day-trek.geojson",
  22: "tamsoult-waterfalls-hidden-cascade.geojson",
  23: "sidi-chamharouch-waterfalls-dayhike.geojson",
  24: "tizi-tamatert-tachedirt-dayhike.geojson",
  25: "berber-villages-3day-circuit.geojson",
  26: "atlas-trek-village-stay-2day.geojson",
  27: "high-atlas-skyline-traverse.geojson",
  28: "angour-ridge-tachedirt.geojson",
  29: "erber-villages-7day-atlas-immersion.geojson",
  30: "hidden-4000ers-weekend.geojson",
};

const routesDir = path.resolve("client/public/routes");

async function main() {
  let updated = 0;
  let skipped = 0;

  for (const [idStr, filename] of Object.entries(mapping)) {
    const id = Number(idStr);
    const filePath = path.join(routesDir, filename);

    if (!existsSync(filePath)) {
      console.warn(`  SKIP  id=${id} — file not found: ${filename}`);
      skipped++;
      continue;
    }

    const content = readFileSync(filePath, "utf-8");

    // Validate it's real JSON before storing
    try {
      JSON.parse(content);
    } catch {
      console.warn(`  SKIP  id=${id} — invalid JSON in ${filename}`);
      skipped++;
      continue;
    }

    await pool.query(
      "UPDATE tours SET route_geo_json = $1 WHERE id = $2",
      [content, id]
    );

    console.log(`  OK    id=${id} — ${filename}`);
    updated++;
  }

  console.log(`\nDone. Updated: ${updated}, Skipped: ${skipped}`);
  await pool.end();
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
