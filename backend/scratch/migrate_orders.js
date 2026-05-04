import pool from "../config/db.js";

async function migrate() {
  try {
    await pool.query(`
      ALTER TABLE orders 
      ADD COLUMN IF NOT EXISTS payment_method VARCHAR(20) DEFAULT 'Cash',
      ADD COLUMN IF NOT EXISTS payment_status VARCHAR(20) DEFAULT 'Pending';
    `);
    console.log("Migration successful");
    await pool.end();
  } catch (err) {
    console.error("Migration failed:", err);
    await pool.end();
    process.exit(1);
  }
}

migrate();
