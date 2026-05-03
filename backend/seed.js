import bcrypt from "bcryptjs";
import pool from "./config/db.js";

const PLACEHOLDER_PRODUCT =
  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&auto=format&fit=crop";
const PLACEHOLDER_SHOP =
  "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop";

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

  const { rows: supCount } = await pool.query("SELECT COUNT(*)::int AS c FROM suppliers");
  if (supCount[0].c === 0) {
    await pool.query(
      `
      INSERT INTO suppliers (
        name, contact, address, image, area_type, state, district, city, village, business_hours
      )
      VALUES
        (
          'Farma Fer Rajkot',
          '+91 99099 09090',
          '124 Agri Lane, University Road, Rajkot',
          $1,
          'city',
          'Gujarat',
          'Rajkot',
          'Rajkot',
          '',
          '9 AM - 8 PM'
        ),
        (
          'EcoCrop Anand Village',
          '+91 99099 09091',
          '45 Sustainable Way, Borsad Taluka',
          $2,
          'village',
          'Gujarat',
          'Anand',
          '',
          'Sarsa',
          '8 AM - 7 PM'
        ),
        (
          'Green Agro Pune',
          '+91 99099 09092',
          '88 Farm Road, Hinjewadi Phase 2',
          $3,
          'city',
          'Maharashtra',
          'Pune',
          'Pune',
          '',
          '10 AM - 9 PM'
        ),
        (
          'Valley Co-op Jalna',
          '+91 99099 09093',
          'Shop 12, Agricultural Market Yard',
          $4,
          'town',
          'Maharashtra',
          'Jalna',
          'Jalna',
          '',
          '9 AM - 6 PM'
        ),
        (
          'Nature Best Karnataka',
          '+91 99099 09094',
          'Near APMC, Hubli Road',
          $5,
          'city',
          'Karnataka',
          'Dharwad',
          'Hubli',
          '',
          '9 AM - 8 PM'
        )
      `,
      [
        PLACEHOLDER_SHOP,
        "https://images.unsplash.com/photo-1500937386664-56d1df385357?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&auto=format&fit=crop",
      ]
    );
  }

  const { rows: prodCount } = await pool.query("SELECT COUNT(*)::int AS c FROM products");
  if (prodCount[0].c === 0) {
    const { rows: suppliers } = await pool.query(
      "SELECT id, name FROM suppliers ORDER BY id ASC LIMIT 5"
    );
    const byName = (n) => suppliers.find((s) => s.name.includes(n))?.id ?? suppliers[0]?.id;

    const rows = [
      {
        name: "Urea Fertilizer (46% N)",
        description: "High nitrogen fertilizer for vegetative growth and yield.",
        price: 500,
        image:
          "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&auto=format&fit=crop",
        stock: 200,
        sid: byName("Farma"),
      },
      {
        name: "Organic Compost",
        description: "Improves soil structure, water retention, and microbial life.",
        price: 800,
        image: PLACEHOLDER_PRODUCT,
        stock: 150,
        sid: byName("EcoCrop"),
      },
      {
        name: "Potash (MOP)",
        description: "Boosts crop quality, strengthens roots, and improves stress tolerance.",
        price: 499,
        image:
          "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop",
        stock: 120,
        sid: byName("Green Agro"),
      },
      {
        name: "DAP Fertilizer",
        description: "Diammonium phosphate for strong root development.",
        price: 1350,
        image:
          "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&auto=format&fit=crop",
        stock: 90,
        sid: byName("Valley"),
      },
      {
        name: "Liquid Micronutrient Mix",
        description: "Zn, Fe, Mn blend for foliar and soil application.",
        price: 620,
        image:
          "https://images.unsplash.com/photo-1466692476869-aef1dfb1e735?w=400&auto=format&fit=crop",
        stock: 75,
        sid: byName("Nature"),
      },
      {
        name: "NPK 19:19:19",
        description: "Balanced water-soluble fertilizer for horticulture and field crops.",
        price: 890,
        image:
          "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=400&auto=format&fit=crop",
        stock: 110,
        sid: byName("Green Agro"),
      },
    ];

    for (const r of rows) {
      await pool.query(
        `
        INSERT INTO products (name, description, price, image, stock, supplier_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        `,
        [r.name, r.description, r.price, r.image, r.stock, r.sid ?? null]
      );
    }
  }
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
