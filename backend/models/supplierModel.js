import pool from "../config/db.js";

export const listSuppliers = async () => {
  const { rows } = await pool.query("SELECT * FROM suppliers ORDER BY id DESC");
  return rows;
};

export const createSupplier = async ({ name, contact, address }) => {
  const { rows } = await pool.query(
    `
      INSERT INTO suppliers (name, contact, address)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
    [name, contact, address]
  );
  return rows[0];
};

export const updateSupplierById = async (id, payload) => {
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
  const { rows } = await pool.query(
    `
      UPDATE suppliers
      SET ${fields.join(", ")}
      WHERE id = $${index}
      RETURNING *
    `,
    values
  );
  return rows[0];
};

export const deleteSupplierById = async (id) => {
  const { rowCount } = await pool.query("DELETE FROM suppliers WHERE id = $1", [id]);
  return rowCount > 0;
};
