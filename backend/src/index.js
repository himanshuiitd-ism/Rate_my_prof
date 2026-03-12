import "dotenv/config";
import express, { json } from "express";
import { createServer } from "http";
import cors from "cors";
import { connect, disconnect } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Server } from "socket.io";
import fs from "fs";
import path from "path";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://rate-my-prof-mu.vercel.app/"],
  },
});

app.use(cors());
app.use(json());

// Add logging middleware to see ALL requests
app.use((req, res, next) => {
  console.log(
    `📥 ${req.method} ${req.url} - ${new Date().toLocaleTimeString()}`,
  );
  next();
});

// Basic route
app.get("/", (req, res) => {
  console.log("🏠 Root route hit");
  res.send("rate_my_prof backend running");
});

// Routes
import profRoutes from "./routes/professors.js";
app.use("/api/professors", profRoutes);

import adRoutes from "./routes/ads.js";
app.use("/api/ads", adRoutes);

// serve frontend build if deployed together (optional)
const buildDir = path.join(process.cwd(), "frontend", "dist");
if (fs.existsSync(buildDir)) {
  app.use(express.static(buildDir));
}

// Socket handlers (will attach io to app)
import socketHandler from "./socket.js";
socketHandler(io);
app.set("io", io);

async function connectDb() {
  const mongoUri = process.env.MONGO_URI;
  if (mongoUri) {
    await connect(mongoUri).catch((err) => {
      console.error(err);
      process.exit(1);
    });
    console.log("✅ Connected to MongoDB");
  } else {
    console.log(
      "No MONGO_URI provided — spinning up in-memory MongoDB for dev",
    );
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await connect(uri);
    console.log("Connected to in-memory MongoDB");
  }
}

// catch-all for client-side routing (SPA) - prevents 404 on refresh
app.get("*", (req, res) => {
  if (!req.path.startsWith("/api")) {
    const indexFile = path.join(buildDir, "index.html");
    if (require("fs").existsSync(indexFile)) {
      res.sendFile(indexFile);
    } else {
      res.status(404).send("Not found");
    }
  } else {
    res.status(404).send("API route not found");
  }
});

connectDb().then(() => {
  const DEFAULT_PORT = Number(process.env.PORT) || 4000;
  const MAX_TRIES = 10;
  let port = DEFAULT_PORT;

  const startServer = (triesLeft = MAX_TRIES) => {
    if (triesLeft <= 0) {
      console.error("Could not start server: no available ports");
      process.exit(1);
    }

    const onError = (err) => {
      if (err && err.code === "EADDRINUSE") {
        console.warn(`Port ${port} in use, trying ${port + 1}`);
        server.removeListener("error", onError);
        port += 1;
        startServer(triesLeft - 1);
      } else {
        console.error("Server error:", err);
        process.exit(1);
      }
    };

    server.once("error", onError);
    server.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
      console.log(
        `📍 API available at http://localhost:${port}/api/professors`,
      );
      console.log(`🏠 Root available at http://localhost:${port}/`);
    });
  };

  startServer();
});

async function shutdown(code = 0) {
  console.log("Shutting down server...");
  try {
    server.close(() => console.log("HTTP server closed"));
    await disconnect();
    process.exit(code);
  } catch (err) {
    console.error("Error during shutdown", err);
    process.exit(1);
  }
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));
process.on("unhandledRejection", (reason) =>
  console.error("Unhandled Rejection:", reason),
);
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  shutdown(1);
});
