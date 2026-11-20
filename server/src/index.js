import express from "express";

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.disable("x-powered-by");
app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "MenuPilot API",
  });
});

app.use((_req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`MenuPilot API running on http://localhost:${PORT}`);
});