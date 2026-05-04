import pool from "../config/db.js";

export const createOrderWithItems = async ({
  userId,
  status,
  items,
  payment_method,
  payment_status,
}) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    let totalAmount = 0;
    const priceByProductId = new Map();
    for (const item of items) {
      const productId = Number(item.product_id);
      const qty = Number(item.quantity);
      if (!Number.isFinite(productId) || !Number.isFinite(qty) || qty <= 0) {
        throw new Error("Invalid order item");
      }

      const productRes = await client.query(
        "SELECT id, price, stock FROM products WHERE id = $1 FOR UPDATE",
        [productId]
      );
      const product = productRes.rows[0];
      if (!product) {
        const error = new Error(`Product not found: ${productId}`);
        error.statusCode = 404;
        throw error;
      }
      if (Number(product.stock) < qty) {
        const error = new Error(`Insufficient stock for product ${productId}`);
        error.statusCode = 400;
        throw error;
      }

      const unitPrice = Number(product.price);
      if (!Number.isFinite(unitPrice))
        throw new Error(`Invalid price for product ${productId}`);
      priceByProductId.set(productId, unitPrice);
      totalAmount += unitPrice * qty;
    }

    const orderResult = await client.query(
      `
      INSERT INTO orders (user_id, total_amount, status, payment_method, payment_status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
        userId,
        totalAmount,
        status || "pending",
        payment_method || "Cash",
        payment_status || "Pending",
      ]
    );

    const order = orderResult.rows[0];

    for (const item of items) {
      const productId = Number(item.product_id);
      const qty = Number(item.quantity);
      const unitPrice = Number(priceByProductId.get(productId));
      if (!Number.isFinite(unitPrice)) throw new Error(`Invalid derived price for product ${productId}`);

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
      o.payment_method,
      o.payment_status,
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

export const updateOrderStatusById = async (id, status) => {
  const allowed = ["pending", "completed", "cancelled"];
  if (!allowed.includes(status)) {
    throw new Error("Invalid order status");
  }

  // If status is "completed", we also set payment_status to "Paid"
  const query =
    status === "completed"
      ? `
      UPDATE orders
      SET status = $1, payment_status = 'Paid'
      WHERE id = $2
      RETURNING id, user_id, total_amount, status, payment_method, payment_status, created_at
      `
      : `
      UPDATE orders
      SET status = $1
      WHERE id = $2
      RETURNING id, user_id, total_amount, status, payment_method, payment_status, created_at
      `;

  const { rows } = await pool.query(query, [status, id]);
  return rows[0];
};

