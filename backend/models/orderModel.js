import pool from "../config/db.js";

const createOrderError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const createOrderWithItems = async ({ userId, status, items }) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    let totalAmount = 0;
    const priceByProductId = new Map();
    for (const item of items) {
      const productId = Number(item.product_id);
      const qty = Number(item.quantity);
      if (!Number.isFinite(productId) || !Number.isFinite(qty) || qty <= 0) {
        throw createOrderError("Invalid order item", 400);
      }

      const productRes = await client.query(
        "SELECT id, price, stock FROM products WHERE id = $1 FOR UPDATE",
        [productId]
      );
      const product = productRes.rows[0];
      if (!product) throw createOrderError(`Product not found: ${productId}`, 404);
      if (Number(product.stock) < qty) {
        throw createOrderError(`Insufficient stock for product ${productId}`, 400);
      }

      const unitPrice = Number(product.price);
      if (!Number.isFinite(unitPrice)) {
        throw createOrderError(`Invalid price for product ${productId}`, 500);
      }
      priceByProductId.set(productId, unitPrice);
      totalAmount += unitPrice * qty;
    }

    const orderResult = await client.query(
      `
      INSERT INTO orders (user_id, total_amount, status)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [userId, totalAmount, status || "pending"]
    );
    const order = orderResult.rows[0];

    for (const item of items) {
      const productId = Number(item.product_id);
      const qty = Number(item.quantity);
      const unitPrice = Number(priceByProductId.get(productId));
      if (!Number.isFinite(unitPrice)) {
        throw createOrderError(`Invalid derived price for product ${productId}`, 500);
      }

      await client.query(
        `
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES ($1, $2, $3, $4)
        `,
        [order.id, productId, qty, unitPrice]
      );

      await client.query("UPDATE products SET stock = stock - $1 WHERE id = $2", [qty, productId]);
    }

    await client.query("COMMIT");
    return order;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const listOrders = async ({ user }) => {
  const values = [];
  let whereClause = "";
  if (user.role !== "admin") {
    whereClause = "WHERE o.user_id = $1";
    values.push(user.id);
  }

  const { rows } = await pool.query(
    `
    SELECT
      o.id,
      o.user_id,
      o.total_amount,
      o.status,
      o.created_at,
      u.name AS user_name,
      u.email AS user_email,
      COALESCE(
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', oi.id,
            'product_id', oi.product_id,
            'quantity', oi.quantity,
            'price', oi.price,
            'product_name', p.name
          )
          ORDER BY oi.id
        ) FILTER (WHERE oi.id IS NOT NULL),
        '[]'::json
      ) AS items
    FROM orders o
    JOIN users u ON u.id = o.user_id
    LEFT JOIN order_items oi ON oi.order_id = o.id
    LEFT JOIN products p ON p.id = oi.product_id
    ${whereClause}
    GROUP BY o.id, u.id
    ORDER BY o.id DESC
    `,
    values
  );

  return rows;
};
