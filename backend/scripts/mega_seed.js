import pool from "../config/db.js";

const FERTILIZERS = [
  "Urea (46% N)", "DAP (18:46:0)", "MOP (Potash)", "NPK (19:19:19)", "SSP", "Ammonium Sulphate",
  "Calcium Nitrate", "Magnesium Sulphate", "Zinc Sulphate", "Boron", "Organic Manure", "Bio-Fertilizer",
  "Neem Cake", "Liquid NPK", "Potassium Schoenite", "Sulphur 90%", "Prom (Organic Phosphate)",
  "Seaweed Extract", "Humic Acid", "Amino Acid"
];

const SHOP_PREFIXES = ["Agro", "Kisan", "Krishi", "Farmer", "Green", "Earth", "Agri", "Village", "Rural"];
const SHOP_SUFFIXES = ["Center", "Mart", "Hub", "Seva Kendra", "Suppliers", "Store", "Agency", "World"];

const STATES = [
  { name: "Gujarat", districts: ["Rajkot", "Anand", "Junagadh", "Mehsana", "Bhavnagar"] },
  { name: "Maharashtra", districts: ["Pune", "Nagpur", "Nashik", "Jalna", "Satara"] },
  { name: "Karnataka", districts: ["Dharwad", "Mysuru", "Belagavi", "Hassan", "Mandya"] }
];

async function megaSeed() {
  console.log("Starting Mega Seed (50 Shops, 100+ Fertilizers each)...");

  try {
    // 1. Get existing suppliers to avoid duplicates if needed, or just clear and seed
    // For this task, we will add TO the existing ones to reach 50+
    const { rows: currentSup } = await pool.query("SELECT COUNT(*) FROM suppliers");
    const existingCount = parseInt(currentSup[0].count);
    const shopsToCreate = Math.max(0, 50 - existingCount);

    console.log(`Creating ${shopsToCreate} new shops...`);

    for (let i = 0; i < shopsToCreate; i++) {
      const stateObj = STATES[i % STATES.length];
      const district = stateObj.districts[i % stateObj.districts.length];
      const name = `${SHOP_PREFIXES[Math.floor(Math.random() * SHOP_PREFIXES.length)]} ${SHOP_SUFFIXES[Math.floor(Math.random() * SHOP_SUFFIXES.length)]} ${i + 1}`;
      const contact = `+91 ${90000 + i} ${10000 + i}`;
      const address = `${100 + i} Main Market, near Station, ${district}`;
      const village = i % 2 === 0 ? `Village-${i}` : "";

      const { rows } = await pool.query(
        `INSERT INTO suppliers (name, contact, address, area_type, state, district, village, business_hours)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
        [name, contact, address, i % 2 === 0 ? "village" : "city", stateObj.name, district, village, "8 AM - 8 PM"]
      );

      const supplierId = rows[0].id;

      // 2. Add 100+ fertilizers for THIS shop
      const productsToCreate = 105; // 100+
      const values = [];
      for (let j = 0; j < productsToCreate; j++) {
        const prodName = `${FERTILIZERS[j % FERTILIZERS.length]} - Batch ${j + 1}`;
        const price = 200 + (Math.random() * 2000);
        const stock = Math.floor(Math.random() * 500);
        const desc = `High quality ${prodName} for optimized crop growth.`;
        values.push(`('${prodName}', '${desc}', ${price.toFixed(2)}, ${stock}, ${supplierId})`);
      }

      await pool.query(`
        INSERT INTO products (name, description, price, stock, supplier_id)
        VALUES ${values.join(", ")}
      `);

      if ((i + 1) % 5 === 0) console.log(`Created ${i + 1} shops...`);
    }

    console.log("Mega Seed Complete!");
    process.exit(0);
  } catch (err) {
    console.error("Mega Seed Failed:", err);
    process.exit(1);
  }
}

megaSeed();
