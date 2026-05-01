import pool from "../config/db.js";

export const getDashboardStats = async (_req, res) => {
  try {
    const [usersRes, productsRes, suppliersRes, ordersRes] = await Promise.all([
      pool.query("SELECT COUNT(*)::int AS count FROM users"),
      pool.query("SELECT COUNT(*)::int AS count FROM products"),
      pool.query("SELECT COUNT(*)::int AS count FROM suppliers"),
      pool.query("SELECT COUNT(*)::int AS count FROM orders"),
    ]);

    const recentSuppliersRes = await pool.query(
      "SELECT id, name, address, created_at FROM suppliers ORDER BY id DESC LIMIT 3"
    );

    return res.json({
      users: usersRes.rows[0].count,
      products: productsRes.rows[0].count,
      suppliers: suppliersRes.rows[0].count,
      orders: ordersRes.rows[0].count,
      recentSuppliers: recentSuppliersRes.rows,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch dashboard stats", error: error.message });
  }
};
