import pool from "../config/db.js";

async function check() {
  try {
    const { rows } = await pool.query("SELECT to_regclass('public.cart_items') as exists");
    console.log(rows[0]);
    await pool.end();
  } catch (err) {
    console.error(err);
    await pool.end();
    process.exit(1);
  }
}

check();
