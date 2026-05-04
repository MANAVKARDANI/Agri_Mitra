import pool from "../config/db.js";

const USER_PUBLIC_FIELDS = "id, name, email, role, avatar, created_at";

export const createUser = async ({ name, email, password, role, avatar = "" }) => {
  const query = `
    INSERT INTO users (name, email, password, role, avatar)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING ${USER_PUBLIC_FIELDS}
  `;
  const { rows } = await pool.query(query, [name, email, password, role, avatar]);
  return rows[0];
};

export const findUserByEmail = async (email) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows[0];
};

export const findUserById = async (id) => {
  const { rows } = await pool.query(
    `SELECT ${USER_PUBLIC_FIELDS} FROM users WHERE id = $1`,
    [id]
  );
  return rows[0];
};

export const findUserWithPasswordById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
};

export const listUsers = async () => {
  const { rows } = await pool.query(
    `SELECT ${USER_PUBLIC_FIELDS} FROM users ORDER BY id DESC`
  );
  return rows;
};

export const updateUserById = async (id, payload) => {
  const allowed = new Set(["name", "email", "role", "password", "avatar"]);
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
  const query = `
    UPDATE users
    SET ${fields.join(", ")}
    WHERE id = $${index}
    RETURNING ${USER_PUBLIC_FIELDS}
  `;
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const deleteUserById = async (id) => {
  const { rowCount } = await pool.query("DELETE FROM users WHERE id = $1", [id]);
  return rowCount > 0;
};

export const setPasswordResetToken = async ({
  userId,
  tokenHash,
  expiresAtMs,
}) => {
  await pool.query(
    `
    UPDATE users
    SET reset_token = $1,
        reset_token_expiry = $2::BIGINT,
        reset_token_hash = $1,
        reset_token_expires_at = TO_TIMESTAMP($2::DOUBLE PRECISION / 1000.0)
    WHERE id = $3
    `,
    [tokenHash, expiresAtMs, userId]
  );
};

export const findUserByResetTokenHash = async (tokenHash) => {
  const { rows } = await pool.query(
    `
    SELECT * FROM users
    WHERE reset_token = $1
      AND reset_token_expiry IS NOT NULL
      AND reset_token_expiry > $2
    `,
    [tokenHash, Date.now()]
  );
  return rows[0];
};

export const updatePasswordAndClearReset = async ({ userId, hashedPassword }) => {
  await pool.query(
    `
    UPDATE users
    SET password = $1,
        reset_token = NULL,
        reset_token_expiry = NULL,
        reset_token_hash = NULL,
        reset_token_expires_at = NULL
    WHERE id = $2
    `,
    [hashedPassword, userId]
  );
};
