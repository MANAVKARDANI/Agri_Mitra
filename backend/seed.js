import bcrypt from "bcryptjs";
import pool from "./config/db.js";

async function seed() {
  const isProduction = process.env.NODE_ENV === "production";
  const adminEmail = process.env.SEED_ADMIN_EMAIL || (!isProduction ? "admin@gmail.com" : null);
  const userEmail = process.env.SEED_USER_EMAIL || (!isProduction ? "user@gmail.com" : null);
  const adminPass = process.env.SEED_ADMIN_PASSWORD || (!isProduction ? "admin123" : null);
  const userPass = process.env.SEED_USER_PASSWORD || (!isProduction ? "user1234" : null);

  if (!adminEmail || !userEmail || !adminPass || !userPass) {
    throw new Error(
      "Seed credentials are required in production. Set SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD, SEED_USER_EMAIL, and SEED_USER_PASSWORD."
    );
  }

  const adminHash = await bcrypt.hash(adminPass, 10);
  const userHash = await bcrypt.hash(userPass, 10);

  await pool.query(
    `
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, 'admin')
    ON CONFLICT (email) DO NOTHING
    `,
    ["Admin", adminEmail, adminHash]
  );

  await pool.query(
    `
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, 'user')
    ON CONFLICT (email) DO NOTHING
    `,
    ["User", userEmail, userHash]
  );

  await pool.query(
    `
    INSERT INTO suppliers (name, contact, address)
    SELECT * FROM (
      VALUES
        ('Farma Fer', '+91 99099 09090', '124 Agri Lane, West Valley District'),
        ('EcoCrop Solutions', '+91 99099 09091', '45 Sustainable Way, North Zone'),
        ('Green Agro', '+91 99099 09092', '88 Farm Road, East District')
    ) AS seed(name, contact, address)
    WHERE NOT EXISTS (
      SELECT 1 FROM suppliers s WHERE s.name = seed.name
    )
    `
  );

  await pool.query(
    `
    INSERT INTO products (name, description, price, image, stock)
    SELECT * FROM (
      VALUES
        ('Urea Fertilizer', 'High nitrogen fertilizer', 500, '', 200),
        ('Organic Compost', 'Improves soil structure', 800, '', 150),
        ('Potash', 'Boosts crop quality and roots', 499, '', 23)
    ) AS seed(name, description, price, image, stock)
    WHERE NOT EXISTS (
      SELECT 1 FROM products p WHERE p.name = seed.name
    )
    `
  );
}

seed()
  .then(async () => {
    // eslint-disable-next-line no-console
    console.log("Seed complete");
    await pool.end();
    process.exit(0);
  })
  .catch(async (err) => {
    // eslint-disable-next-line no-console
    console.error("Seed failed:", err);
    await pool.end();
    process.exit(1);
  });
