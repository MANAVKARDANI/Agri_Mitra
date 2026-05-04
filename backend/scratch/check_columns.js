import pool from "../config/db.js";

async function check() {
  try {
    const { rows } = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'cart_items'
    `);
    console.log(rows);
    await pool.end();
  } catch (err) {
    console.error(err);
    await pool.end();
    process.exit(1);
  }
}

check();
