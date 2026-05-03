import express from "express";

const app = express();
const router = express.Router();

router.put("/:id", (req, res) => {
  res.json({ id: req.params.id });
});

app.use("/api/orders", router);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found", url: req.url, method: req.method });
});

const server = app.listen(5002, () => {
  console.log("Test server on 5002");
});
