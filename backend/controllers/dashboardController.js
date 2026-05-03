import pool from "../config/db.js";

function buildLast7DaysTrend(rows) {
  const byDay = new Map();
  for (const r of rows) {
    const d = r.day instanceof Date ? r.day.toISOString().slice(0, 10) : String(r.day).slice(0, 10);
    byDay.set(d, Number(r.count));
  }
  const out = [];
  for (let i = 6; i >= 0; i -= 1) {
    const dt = new Date();
    dt.setHours(0, 0, 0, 0);
    dt.setDate(dt.getDate() - i);
    const key = dt.toISOString().slice(0, 10);
    const weekday = dt.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
    out.push({ label: weekday, date: key, count: byDay.get(key) ?? 0 });
  }
  return out;
}

export const getDashboardStats = async (_req, res) => {
  try {
    const [usersRes, productsRes, suppliersRes, ordersRes, recentSuppliersRes, trendRes, lowStockRes] =
      await Promise.all([
        pool.query("SELECT COUNT(*)::int AS count FROM users"),
        pool.query("SELECT COUNT(*)::int AS count FROM products"),
        pool.query("SELECT COUNT(*)::int AS count FROM suppliers"),
        pool.query("SELECT COUNT(*)::int AS count FROM orders"),
        pool.query(
          "SELECT id, name, address, created_at FROM suppliers ORDER BY id DESC LIMIT 3"
        ),
        pool.query(
          `
          SELECT DATE(created_at) AS day, COUNT(*)::int AS count
          FROM orders
          WHERE created_at >= (CURRENT_DATE - INTERVAL '6 days')
          GROUP BY DATE(created_at)
          ORDER BY day
          `
        ),
        pool.query(
          `
          SELECT id, name, stock
          FROM products
          WHERE stock < 10
          ORDER BY stock ASC, id ASC
          LIMIT 25
          `
        ),
      ]);

    const orderTrend = buildLast7DaysTrend(trendRes.rows);

    return res.json({
      users: usersRes.rows[0].count,
      products: productsRes.rows[0].count,
      suppliers: suppliersRes.rows[0].count,
      orders: ordersRes.rows[0].count,
      recentSuppliers: recentSuppliersRes.rows,
      orderTrend,
      lowStockProducts: lowStockRes.rows,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch dashboard stats", error: error.message });
  }
};
