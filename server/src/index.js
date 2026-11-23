import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import dns from "node:dns";
import menuRoutes from "./routes/menuRoutes.js";
import { testDatabase } from "./testDatabase.js";

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.disable("x-powered-by");
app.use(express.json({ limit: "100kb" }));


app.get("/api/health", (_req, res) => {
  const databaseConnected = mongoose.connection.readyState === 1;

  res.status(databaseConnected ? 200 : 503).json({
    status: databaseConnected ? "ok" : "degraded",
    service: "MenuPilot API",
    database: databaseConnected ? "connected" : "disconnected",
  });
});

app.use("/api/menu", menuRoutes);


app.use((_req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});



async function startServer() {
  if (!process.env.MONGODB_URI) {
    console.error("Missing MONGODB_URI. Check server/.env.");
    process.exit(1);
  }

 

  try {
     dns.setServers(["8.8.8.8"]);

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "menupilot",
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB connected to the menupilot database.");

    if (process.env.RUN_DB_TEST === "true") {
    await testDatabase();
    }

    app.listen(PORT, () => {
      console.log(`MenuPilot API running on http://localhost:${PORT}`);
    });
    } catch (error) {
    const safeMessage = String(error.message ?? "Unknown error")
      .replace(
        /mongodb(?:\+srv)?:\/\/[^\s"'<>]+/gi,
        "[REDACTED CONNECTION STRING]"
      );

    console.error("Database connection failed.");
    console.error("Error type:", error.name);
    console.error("Error code:", error.code ?? "Not provided");
    console.error("Details:", safeMessage);

    process.exit(1);
  }
}

startServer();