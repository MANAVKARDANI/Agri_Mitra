import pool from "../config/db.js";

async function check() {
  try {
    const { rows } = await pool.query(`
      SELECT conname, pg_get_constraintdef(c.oid) 
      FROM pg_constraint c 
      JOIN pg_namespace n ON n.oid = c.connamespace 
      WHERE n.nspname = 'public' AND conrelid = 'cart_items'::regclass;
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
