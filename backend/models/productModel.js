import pool from "../config/db.js";

export const listProducts = async () => {
  const { rows } = await pool.query("SELECT * FROM products ORDER BY id DESC");
  return rows;
};

export const findProductById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
  return rows[0];
};

export const createProduct = async ({
  name,
  description,
  price,
  image,
  stock,
}) => {
  const query = `
    INSERT INTO products (name, description, price, image, stock)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const { rows } = await pool.query(query, [name, description, price, image, stock]);
  return rows[0];
};

export const updateProductById = async (id, payload) => {
  const fields = [];
  const values = [];
  let index = 1;

  for (const [key, value] of Object.entries(payload)) {
    fields.push(`${key} = $${index}`);
    values.push(value);
    index += 1;
  }

  if (!fields.length) return null;

  values.push(id);
  const query = `
    UPDATE products
    SET ${fields.join(", ")}
    WHERE id = $${index}
    RETURNING *
  `;
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const deleteProductById = async (id) => {
  const { rowCount } = await pool.query("DELETE FROM products WHERE id = $1", [id]);
  return rowCount > 0;
};
