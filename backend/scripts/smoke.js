import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

const port = process.env.PORT || "5099";
process.env.PORT = port;
process.env.NODE_ENV ||= "test";

const [{ default: pool }, { server }] = await Promise.all([
  import("../config/db.js"),
  import("../server.js"),
]);

const baseUrl = `http://localhost:${port}/api`;
const cleanup = {
  orderIds: [],
  productIds: [],
  supplierIds: [],
  userIds: [],
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const request = async (path, { method = "GET", token, body } = {}) => {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  const raw = await response.text();
  let parsed = raw;
  if (raw) {
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = raw;
    }
  }

  return {
    status: response.status,
    body: parsed,
  };
};

const expectStatus = (response, expectedStatus, context) => {
  assert(
    response.status === expectedStatus,
    `${context}: expected ${expectedStatus}, received ${response.status} with ${JSON.stringify(response.body)}`
  );
};

const waitForServer = async () => {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    try {
      const response = await fetch(`${baseUrl}/health`);
      if (response.status >= 200) {
        return;
      }
    } catch {
      // Keep polling until the server is ready.
    }
    await sleep(150);
  }

  throw new Error("Backend server did not become ready in time");
};

try {
  await waitForServer();

  const suffix = randomUUID().slice(0, 8);
  const adminEmail = `smoke-admin-${suffix}@example.com`;
  const adminPassword = "Admin123!";
  const userEmail = `smoke-user-${suffix}@example.com`;
  const productName = `Smoke Product ${suffix}`;

  const adminHash = await bcrypt.hash(adminPassword, 10);
  const adminInsert = await pool.query(
    `
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, 'admin')
      RETURNING id, email, role
    `,
    ["Smoke Admin", adminEmail, adminHash]
  );
  cleanup.userIds.push(adminInsert.rows[0].id);

  const productInsert = await pool.query(
    `
      INSERT INTO products (name, description, price, image, stock)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, price, stock
    `,
    [productName, "Temporary smoke-test product", 999, "", 5]
  );
  const smokeProduct = productInsert.rows[0];
  cleanup.productIds.push(smokeProduct.id);

  const supplierInsert = await pool.query(
    `
      INSERT INTO suppliers (name, contact, address)
      VALUES ($1, $2, $3)
      RETURNING id, name, contact, address
    `,
    [`Smoke Supplier ${suffix}`, "+91 99999 00000", "Temporary smoke-test address"]
  );
  const smokeSupplier = supplierInsert.rows[0];
  cleanup.supplierIds.push(smokeSupplier.id);

  const health = await request("/health");
  expectStatus(health, 200, "health check");
  assert(health.body.db === "connected", "health check should confirm database connectivity");

  const register = await request("/auth/register", {
    method: "POST",
    body: {
      name: "Smoke User",
      email: userEmail,
      password: "User123!",
      role: "admin",
    },
  });
  expectStatus(register, 201, "public register");
  assert(register.body.user.role === "user", "public register must not create admin users");
  cleanup.userIds.push(register.body.user.id);

  const login = await request("/auth/login", {
    method: "POST",
    body: {
      email: userEmail,
      password: "User123!",
    },
  });
  expectStatus(login, 200, "user login");
  assert(login.body.user.role === "user", "registered user should login as a standard user");
  const userToken = login.body.token;

  const suppliersWithoutToken = await request("/suppliers");
  expectStatus(suppliersWithoutToken, 401, "suppliers auth guard");

  const suppliersWithToken = await request("/suppliers", { token: userToken });
  expectStatus(suppliersWithToken, 200, "suppliers with user token");

  const selfRoleUpdate = await request(`/users/${register.body.user.id}`, {
    method: "PUT",
    token: userToken,
    body: { role: "admin" },
  });
  expectStatus(selfRoleUpdate, 403, "self role escalation");

  const emptyProfileUpdate = await request(`/users/${register.body.user.id}`, {
    method: "PUT",
    token: userToken,
    body: {},
  });
  expectStatus(emptyProfileUpdate, 400, "empty profile update");

  const previousNodeEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = "production";
  const forgotPassword = await request("/auth/forgot-password", {
    method: "POST",
    body: { email: userEmail },
  });
  process.env.NODE_ENV = previousNodeEnv;
  expectStatus(forgotPassword, 200, "forgot password");
  assert(
    !Object.prototype.hasOwnProperty.call(forgotPassword.body, "resetLink"),
    "production forgot password response must not leak resetLink"
  );
  assert(
    !Object.prototype.hasOwnProperty.call(forgotPassword.body, "preview"),
    "production forgot password response must not leak preview payload"
  );

  const adminLogin = await request("/auth/login", {
    method: "POST",
    body: {
      email: adminEmail,
      password: adminPassword,
    },
  });
  expectStatus(adminLogin, 200, "admin login");
  const adminToken = adminLogin.body.token;

  const emptyProductUpdate = await request(`/products/${smokeProduct.id}`, {
    method: "PUT",
    token: adminToken,
    body: {},
  });
  expectStatus(emptyProductUpdate, 400, "empty product update");

  const productUpdate = await request(`/products/${smokeProduct.id}`, {
    method: "PUT",
    token: adminToken,
    body: {
      price: 1200,
      stock: 4,
    },
  });
  expectStatus(productUpdate, 200, "product update");
  assert(Number(productUpdate.body.price) === 1200, "product update should persist new price");
  smokeProduct.price = productUpdate.body.price;

  const emptySupplierUpdate = await request(`/suppliers/${smokeSupplier.id}`, {
    method: "PUT",
    token: adminToken,
    body: {},
  });
  expectStatus(emptySupplierUpdate, 400, "empty supplier update");

  const supplierUpdate = await request(`/suppliers/${smokeSupplier.id}`, {
    method: "PUT",
    token: adminToken,
    body: {
      address: "Updated smoke-test supplier address",
    },
  });
  expectStatus(supplierUpdate, 200, "supplier update");
  assert(
    supplierUpdate.body.address === "Updated smoke-test supplier address",
    "supplier update should persist new address"
  );

  const managedUser = await request("/users", {
    method: "POST",
    token: adminToken,
    body: {
      name: "Managed Admin",
      email: `managed-${suffix}@example.com`,
      password: "Admin123!",
      role: "admin",
    },
  });
  expectStatus(managedUser, 201, "admin managed-user creation");
  assert(managedUser.body.role === "admin", "admin-created managed user should keep admin role");
  cleanup.userIds.push(managedUser.body.id);

  const duplicateEmailUpdate = await request(`/users/${register.body.user.id}`, {
    method: "PUT",
    token: userToken,
    body: { email: adminEmail },
  });
  expectStatus(duplicateEmailUpdate, 409, "duplicate email update");

  const createOrder = await request("/orders", {
    method: "POST",
    token: userToken,
    body: {
      status: "pending",
      items: [
        {
          product_id: smokeProduct.id,
          quantity: 1,
          price: 1,
        },
      ],
    },
  });
  expectStatus(createOrder, 201, "order creation");
  cleanup.orderIds.push(createOrder.body.id);
  assert(
    Number(createOrder.body.total_amount) === Number(smokeProduct.price),
    "order total should use the database product price"
  );

  const createInvalidOrder = await request("/orders", {
    method: "POST",
    token: userToken,
    body: {
      status: "pending",
      items: [
        {
          product_id: 2147483647,
          quantity: 1,
        },
      ],
    },
  });
  expectStatus(createInvalidOrder, 404, "missing product order");

  const orders = await request("/orders", { token: userToken });
  expectStatus(orders, 200, "orders list");
  const createdOrder = orders.body.find((order) => order.id === createOrder.body.id);
  assert(createdOrder, "created order should be visible in the order list");
  assert(
    Number(createdOrder.items[0].price) === Number(smokeProduct.price),
    "stored order item price should match the database product price"
  );

  console.log("Smoke tests passed");
} catch (error) {
  console.error("Smoke tests failed:", error.message);
  process.exitCode = 1;
} finally {
  try {
    if (cleanup.orderIds.length) {
      await pool.query("DELETE FROM order_items WHERE order_id = ANY($1::int[])", [cleanup.orderIds]);
      await pool.query("DELETE FROM orders WHERE id = ANY($1::int[])", [cleanup.orderIds]);
    }

    if (cleanup.productIds.length) {
      await pool.query("DELETE FROM products WHERE id = ANY($1::int[])", [cleanup.productIds]);
    }

    if (cleanup.supplierIds.length) {
      await pool.query("DELETE FROM suppliers WHERE id = ANY($1::int[])", [cleanup.supplierIds]);
    }

    if (cleanup.userIds.length) {
      await pool.query("DELETE FROM users WHERE id = ANY($1::int[])", [cleanup.userIds]);
    }
  } finally {
    await new Promise((resolve) => server.close(resolve));
    await pool.end();
  }
}
