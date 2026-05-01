import bcrypt from "bcryptjs";
import pool from "./config/db.js";

async function seed() {
  const adminEmail = "admin@gmail.com";
  const userEmail = "user@gmail.com";
  const adminPass = "admin123";
  const userPass = "user1234";

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
    VALUES
      ('Farma Fer', '+91 99099 09090', '124 Agri Lane, West Valley District'),
      ('EcoCrop Solutions', '+91 99099 09091', '45 Sustainable Way, North Zone'),
      ('Green Agro', '+91 99099 09092', '88 Farm Road, East District')
    ON CONFLICT DO NOTHING
    `
  );

  await pool.query(
    `
    INSERT INTO products (name, description, price, image, stock)
    VALUES
      ('Urea Fertilizer', 'High nitrogen fertilizer', 500, '', 200),
      ('Organic Compost', 'Improves soil structure', 800, '', 150),
      ('Potash', 'Boosts crop quality and roots', 499, '', 23)
    ON CONFLICT DO NOTHING
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

