import pool from "../config/db.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runUpdate() {
  console.log("Starting database update...");

  // 1. Run main schema
  const schemaPath = path.join(__dirname, "..", "schema.sql");
  if (fs.existsSync(schemaPath)) {
    console.log("Applying schema.sql...");
    const schemaSql = fs.readFileSync(schemaPath, "utf8");
    await pool.query(schemaSql);
  }

  // 2. Run migrations
  const migrationsDir = path.join(__dirname, "..", "migrations");
  if (fs.existsSync(migrationsDir)) {
    const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith(".sql")).sort();
    for (const file of files) {
      console.log(`Applying migration: ${file}`);
      const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
      await pool.query(sql);
    }
  }

  console.log("Database update complete!");
  process.exit(0);
}

runUpdate().catch(err => {
  console.error("Database update failed:", err);
  process.exit(1);
});
