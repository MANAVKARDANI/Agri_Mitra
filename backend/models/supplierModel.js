import pool from "../config/db.js";

export const listSuppliers = async () => {
  const { rows } = await pool.query("SELECT * FROM suppliers ORDER BY id DESC");
  return rows;
};

export const createSupplier = async ({
  name,
  contact,
  address,
  image = "",
  area_type = "city",
  state = "",
  district = "",
  city = "",
  village = "",
  business_hours = "",
}) => {
  const { rows } = await pool.query(
    `
      INSERT INTO suppliers (
        name, contact, address, image, area_type, state, district, city, village, business_hours
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `,
    [name, contact, address, image, area_type, state, district, city, village, business_hours]
  );
  return rows[0];
};

export const updateSupplierById = async (id, payload) => {
  const allowed = new Set([
    "name",
    "contact",
    "address",
    "image",
    "area_type",
    "state",
    "district",
    "city",
    "village",
    "business_hours",
  ]);
  const fields = [];
  const values = [];
  let index = 1;

  for (const [key, value] of Object.entries(payload)) {
    if (!allowed.has(key)) continue;
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
