import pool from "../config/db.js";

const mapCartRows = (rows) =>
  rows.map((row) => ({
    id: row.id,
    product_id: row.product_id,
    name: row.name,
    description: row.description,
    price: row.price,
    image: row.image,
    stock: row.stock,
    quantity: row.quantity,
    line_total: Number(row.price) * Number(row.quantity),
  }));

export const listCartItems = async (userId) => {
  const { rows } = await pool.query(
    `
    SELECT
      ci.id,
      ci.product_id,
      ci.quantity,
      p.name,
      p.description,
      p.price,
      p.image,
      p.stock
    FROM cart_items ci
    JOIN products p ON p.id = ci.product_id
    WHERE ci.user_id = $1
    ORDER BY ci.updated_at DESC, ci.id DESC
    `,
    [userId]
  );

  return mapCartRows(rows);
};

export const addCartItem = async ({ userId, productId, quantity }) => {
  const { rows: productRows } = await pool.query(
    "SELECT id, stock FROM products WHERE id = $1",
    [productId]
  );
  const product = productRows[0];
  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  const { rows } = await pool.query(
    `
    INSERT INTO cart_items (user_id, product_id, quantity)
    VALUES ($1, $2, LEAST($3::int, $4::int))
    ON CONFLICT (user_id, product_id)
    DO UPDATE SET
      quantity = LEAST(cart_items.quantity + EXCLUDED.quantity, $4::int),
      updated_at = NOW()
    RETURNING id
    `,
    [userId, productId, quantity, product.stock]
  );

  return rows[0];
};

export const updateCartItemQuantity = async ({ userId, productId, quantity }) => {
  const { rows } = await pool.query(
    `
    UPDATE cart_items ci
    SET quantity = LEAST($3::int, p.stock), updated_at = NOW()
    FROM products p
    WHERE ci.product_id = p.id
      AND ci.user_id = $1
      AND ci.product_id = $2
    RETURNING ci.id
    `,
    [userId, productId, quantity]
  );

  return rows[0] || null;
};

export const removeCartItem = async ({ userId, productId }) => {
  const { rowCount } = await pool.query(
    "DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2",
    [userId, productId]
  );
  return rowCount > 0;
};

export const clearCartItems = async ({ userId, productIds }) => {
  if (Array.isArray(productIds) && productIds.length) {
    await pool.query(
      "DELETE FROM cart_items WHERE user_id = $1 AND product_id = ANY($2::int[])",
      [userId, productIds]
    );
    return;
  }

  await pool.query("DELETE FROM cart_items WHERE user_id = $1", [userId]);
};
