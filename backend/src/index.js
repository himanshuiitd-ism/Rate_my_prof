import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import { connect } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const app = express();

// ✅ Fix CORS - allow your Vercel domain
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4001",
      "https://rate-my-prof-mu.vercel.app",
      // add any other Vercel URLs you use
    ],
    credentials: true,
  }),
);
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

// Previously used real-time sockets; now using simple REST endpoints.
// socketHandler removed.

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

connectDb().then(() => {
  const port = Number(process.env.PORT) || 4000;
  app.listen(port, () => {
    console.log(`🚀 Server listening on port ${port}`);
  });
});
