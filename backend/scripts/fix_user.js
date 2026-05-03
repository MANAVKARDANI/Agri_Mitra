import pool from "../config/db.js";

async function fix() {
  try {
    const res = await pool.query("UPDATE users SET role = 'admin' WHERE email = 'manavkardani75@gmail.com' RETURNING *");
    console.log("Updated user:", res.rows[0]);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
fix();
