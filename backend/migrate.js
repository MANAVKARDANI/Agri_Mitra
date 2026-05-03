import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pool from "./config/db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function migrate() {
  const dir = path.join(__dirname, "migrations");
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".sql"))
    .sort();
  for (const f of files) {
    const full = path.join(dir, f);
    const sql = fs.readFileSync(full, "utf8");
    await pool.query(sql);
    // eslint-disable-next-line no-console
    console.log("Migration applied:", f);
  }
  await pool.end();
}

migrate().catch(async (err) => {
  // eslint-disable-next-line no-console
  console.error("Migration failed:", err);
  await pool.end();
  process.exit(1);
});
