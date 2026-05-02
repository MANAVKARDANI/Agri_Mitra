import pool from "../config/db.js";

export const createUser = async ({ name, email, password, role, profileImage }) => {
  const query = `
    INSERT INTO users (name, email, password, role, profile_image)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, name, email, role, profile_image, created_at
  `;
  const { rows } = await pool.query(query, [name, email, password, role, profileImage || null]);
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
    "SELECT id, name, email, role, profile_image, created_at FROM users WHERE id = $1",
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
    "SELECT id, name, email, role, created_at FROM users ORDER BY id DESC"
  );
  return rows;
};

export const updateUserById = async (id, payload) => {
  const fields = [];
  const values = [];
  let index = 1;

  for (const [key, value] of Object.entries(payload)) {
    if (key === "profileImage") {
      fields.push(`profile_image = $${index}`);
    } else {
      fields.push(`${key} = $${index}`);
    }
    values.push(value);
    index += 1;
  }

  if (!fields.length) return null;

  values.push(id);
  const query = `
    UPDATE users
    SET ${fields.join(", ")}
    WHERE id = $${index}
    RETURNING id, name, email, role, profile_image, created_at
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
  expiresAt,
}) => {
  await pool.query(
    `
    UPDATE users
    SET reset_token_hash = $1, reset_token_expires_at = $2
    WHERE id = $3
    `,
    [tokenHash, expiresAt, userId]
  );
};

export const findUserByResetTokenHash = async (tokenHash) => {
  const { rows } = await pool.query(
    `
    SELECT * FROM users
    WHERE reset_token_hash = $1
      AND reset_token_expires_at IS NOT NULL
      AND reset_token_expires_at > NOW()
    `,
    [tokenHash]
  );
  return rows[0];
};

export const updatePasswordAndClearReset = async ({ userId, hashedPassword }) => {
  await pool.query(
    `
    UPDATE users
    SET password = $1,
        reset_token_hash = NULL,
        reset_token_expires_at = NULL
    WHERE id = $2
    `,
    [hashedPassword, userId]
  );
};
