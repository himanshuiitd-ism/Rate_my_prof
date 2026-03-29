import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { connect } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { clerkMiddleware } from "@clerk/express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.disable("x-powered-by");

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX) || 900,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    error: "Too many requests",
    message: "Please try again in a few minutes.",
  },
});

const writeLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: Number(process.env.WRITE_RATE_LIMIT_MAX) || 120,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    error: "Too many write requests",
    message: "Please slow down and try again shortly.",
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Global database readiness flag
let dbReady = false;
export { dbReady };

// ✅ Fix CORS - allow your Vercel domain
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ratemyprof.dev",
      "https://www.ratemyprof.dev",
      "https://rate-my-prof-mu.vercel.app",
      // add any other Vercel URLs you use
    ],
    credentials: true,
  }),
);
app.use(json({ limit: "100kb" }));

// Clerk auth middleware – attaches req.auth when a valid Clerk session is present
// Requires CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY in backend .env
app.use(clerkMiddleware());

// Basic route
app.get("/", (req, res) => {
  res.send("rate_my_prof backend running");
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    mongoUri: process.env.MONGO_URI ? "✅ set" : "❌ NOT SET",
    port: process.env.PORT || 4000,
    dbReady,
  });
});

// 🛡️ Database readiness middleware – guard all /api routes
app.use("/api", apiLimiter);

app.use("/api", (req, res, next) => {
  if (!dbReady) {
    console.warn(`⚠️ DB not ready, blocking ${req.method} ${req.url}`);
    return res.status(503).json({
      error: "Database service unavailable",
      message: "Backend is initializing. Please try again in a few seconds.",
      status: "initializing",
    });
  }
  next();
});

app.use(
  [
    "/api/professors/:id/rate",
    "/api/professors/:id/message",
    "/api/communities/:id/messages",
    "/api/feature-suggestions",
    "/api/ads/slots/click",
  ],
  writeLimiter,
);

// Routes
import profRoutes from "./routes/professors.js";
app.use("/api/professors", profRoutes);

import adRoutes from "./routes/ads.js";
app.use("/api/ads", adRoutes);

import communityRoutes from "./routes/communities.js";
app.use("/api/communities", communityRoutes);

import featureSuggestionRoutes from "./routes/featureSuggestions.js";
app.use("/api/feature-suggestions", featureSuggestionRoutes);

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Previously used real-time sockets; now using simple REST endpoints.
// socketHandler removed.

async function seedAds() {
  try {
    const Ad = (await import("./models/Ad.js")).default;
    const count = await Ad.countDocuments();
    if (count === 0) {
      console.log("📌 Seeding ads...");
      const samples = [
        // ── HOME PAGE ads ──────────────────────────────
        {
          title: "StudyBuddy AI",
          description:
            "AI-powered study plans for JEE & GATE. 10k+ students trust it.",
          imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=studybuddy",
          linkUrl: "#",
          page: "home",
          position: "left",
          order: 1,
          badge: "FREE",
          bgColor: "#1e3a5f",
        },
        {
          title: "Hostel Finder",
          description: "Best PG & hostels near your campus. Book in 2 minutes.",
          imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=hostel",
          linkUrl: "#",
          page: "home",
          position: "left",
          order: 2,
          badge: "NEW",
          bgColor: "#1e1b4b",
        },
        {
          title: "InternHub",
          description:
            "500+ internships from IIT/NIT alumni startups. Apply free.",
          imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=intern",
          linkUrl: "#",
          page: "home",
          position: "left",
          order: 3,
          bgColor: "#162032",
        },
        {
          title: "GradeBoost",
          description: "Past papers, notes & solutions for 200+ IIT courses.",
          imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=grade",
          linkUrl: "#",
          page: "home",
          position: "left",
          order: 4,
          badge: "HOT",
          bgColor: "#1a1a2e",
        },
        {
          title: "Campus Meals",
          description: "Order mess food & snacks delivered to your dorm.",
          imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=meal",
          linkUrl: "#",
          page: "home",
          position: "left",
          order: 5,
          bgColor: "#0f172a",
        },

        {
          title: "build_in_public",
          description:
            "Join community for founders, creators and startups related query.",
          imageUrl:
            "https://api.dicebear.com/7.x/shapes/svg?seed=build-in-public-home",
          linkUrl: "https://himanshuiid-ism.vercel.app",
          page: "home",
          position: "right",
          order: 1,
          badge: "JOIN",
          bgColor: "#0d3349",
        },
        {
          title: "CodeFast",
          description: "Learn to code in days, not years. Free DSA roadmap.",
          imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=code",
          linkUrl: "#",
          page: "home",
          position: "right",
          order: 2,
          bgColor: "#1c1a36",
        },
        {
          title: "PrepElite",
          description:
            "GATE 2025 mock tests with AI analysis. Top rankers use it.",
          imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=prep",
          linkUrl: "#",
          page: "home",
          position: "right",
          order: 3,
          badge: "EXAM",
          bgColor: "#1b2838",
        },
        {
          title: "Scholarly",
          description: "Research paper summaries in plain English. 1M+ papers.",
          imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=scholar",
          linkUrl: "#",
          page: "home",
          position: "right",
          order: 4,
          bgColor: "#16213e",
        },
        {
          title: "SkillSprint",
          description: "Weekend workshops: ML, Web Dev, Robotics — ₹0 to join.",
          imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=skill",
          linkUrl: "#",
          page: "home",
          position: "right",
          order: 5,
          badge: "FREE",
          bgColor: "#1a2744",
        },

        // ── IIT (ISM) Dhanbad page ads ─────────────────
        {
          title: "ISM Alumni Network",
          description: "Connect with 15,000+ ISM alumni for jobs & mentoring.",
          imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=ismnet",
          linkUrl: "#",
          page: "IIT (ISM) Dhanbad",
          position: "left",
          order: 1,
          badge: "ALUMNI",
          bgColor: "#1e3a5f",
        },
        {
          title: "Dhanbad Eats",
          description: "Best dhabas & cafes near ISM campus. Reviews & hours.",
          imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=dhan",
          linkUrl: "#",
          page: "IIT (ISM) Dhanbad",
          position: "left",
          order: 2,
          bgColor: "#162032",
        },
        {
          title: "Mining Careers",
          description: "Core mining, oil & gas PSU jobs — ISM student special.",
          imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=mine",
          linkUrl: "#",
          page: "IIT (ISM) Dhanbad",
          position: "left",
          order: 3,
          bgColor: "#1a1a2e",
        },
        {
          title: "ISM Fest",
          description:
            "Conclave 2025 ticket booking open. Get early bird pricing.",
          imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=fest",
          linkUrl: "#",
          page: "IIT (ISM) Dhanbad",
          position: "left",
          order: 4,
          badge: "LIVE",
          bgColor: "#1b2838",
        },
        {
          title: "Project Lab",
          description:
            "Rent PCB tools, Raspberry Pis & sensors for your projects.",
          imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=lab",
          linkUrl: "#",
          page: "IIT (ISM) Dhanbad",
          position: "left",
          order: 5,
          bgColor: "#0f172a",
        },

        {
          title: "build_in_public",
          description:
            "Join community for founders, creators and startups related query.",
          imageUrl:
            "https://api.dicebear.com/7.x/shapes/svg?seed=build-in-public-ism",
          linkUrl: "https://himanshuiid-ism.vercel.app",
          page: "IIT (ISM) Dhanbad",
          position: "right",
          order: 1,
          badge: "JOIN",
          bgColor: "#0d3349",
        },
        {
          title: "GFG Campus",
          description: "GeeksForGeeks for ISM: DSA bootcamp + placement prep.",
          imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=gfg",
          linkUrl: "#",
          page: "IIT (ISM) Dhanbad",
          position: "right",
          order: 2,
          bgColor: "#1c1a36",
        },
        {
          title: "Jharkhand Stay",
          description: "PGs & rooms near ISM with verified reviews.",
          imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=jhar",
          linkUrl: "#",
          page: "IIT (ISM) Dhanbad",
          position: "right",
          order: 3,
          bgColor: "#162032",
        },
        {
          title: "ScoreUp",
          description: "Previous year ISM question banks for every semester.",
          imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=score",
          linkUrl: "#",
          page: "IIT (ISM) Dhanbad",
          position: "right",
          order: 4,
          bgColor: "#1b2838",
        },
        {
          title: "Startup Cell ISM",
          description: "Funding & mentorship for student startups. Apply now.",
          imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=startup",
          linkUrl: "#",
          page: "IIT (ISM) Dhanbad",
          position: "right",
          order: 5,
          badge: "APPLY",
          bgColor: "#16213e",
        },

        // ── IIT Madras page ads ─────────────────────────
        {
          title: "Shaastra 2025",
          description: "India's largest student-run tech fest. Register now!",
          imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=shaastra",
          linkUrl: "#",
          page: "IIT Madras",
          position: "left",
          order: 1,
          badge: "UPCOMING",
          bgColor: "#1e3a5f",
        },
        {
          title: "IITM Research Park",
          description:
            "Internships & PPOs from 50+ IITM Research Park startups.",
          imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=iitmrp",
          linkUrl: "#",
          page: "IIT Madras",
          position: "left",
          order: 2,
          bgColor: "#162032",
        },
        {
          title: "Chennai PGs",
          description: "Verified PGs near IITM Taramani & Adyar gates.",
          imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=chennaipg",
          linkUrl: "#",
          page: "IIT Madras",
          position: "left",
          order: 3,
          bgColor: "#1a1a2e",
        },
        {
          title: "Saarang Tickets",
          description: "IITM's cultural fest tickets — early bird 40% off.",
          imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=saarang",
          linkUrl: "#",
          page: "IIT Madras",
          position: "left",
          order: 4,
          badge: "FEST",
          bgColor: "#1b2838",
        },
        {
          title: "DeepLearn IITM",
          description: "AI/ML course by IITM profs. Certificate included.",
          imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=deeplearn",
          linkUrl: "#",
          page: "IIT Madras",
          position: "left",
          order: 5,
          bgColor: "#0f172a",
        },

        {
          title: "build_in_public",
          description:
            "Join community for founders, creators and startups related query.",
          imageUrl:
            "https://api.dicebear.com/7.x/shapes/svg?seed=build-in-public-madras",
          linkUrl: "https://himanshuiid-ism.vercel.app",
          page: "IIT Madras",
          position: "right",
          order: 1,
          badge: "JOIN",
          bgColor: "#0d3349",
        },
        {
          title: "IITM Notes Hub",
          description: "Crowd-sourced notes for every IITM course. 100% free.",
          imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=notes",
          linkUrl: "#",
          page: "IIT Madras",
          position: "right",
          order: 2,
          bgColor: "#1c1a36",
        },
        {
          title: "Velachery Bites",
          description: "Top-rated restaurants near IITM campus delivery.",
          imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=velacha",
          linkUrl: "#",
          page: "IIT Madras",
          position: "right",
          order: 3,
          bgColor: "#162032",
        },
        {
          title: "IITM Y!ES Connect",
          description: "Student entrepreneurship cell — jobs & funding.",
          imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=yes",
          linkUrl: "#",
          page: "IIT Madras",
          position: "right",
          order: 4,
          bgColor: "#1b2838",
        },
        {
          title: "SciPy India",
          description: "Annual scientific Python conference hosted at IITM.",
          imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=scipy",
          linkUrl: "#",
          page: "IIT Madras",
          position: "right",
          order: 5,
          badge: "CONF",
          bgColor: "#16213e",
        },
      ];
      await Ad.insertMany(samples);
      console.log(`✅ Seeded ${samples.length} ads`);
    }
  } catch (err) {
    console.error("❌ Error seeding ads:", err);
  }
}

async function connectDb() {
  const mongoUri = process.env.MONGO_URI;
  if (mongoUri) {
    try {
      await connect(mongoUri);
      console.log("✅ Connected to MongoDB");
      dbReady = true;
      return;
    } catch (err) {
      console.error("❌ MongoDB connection failed:", err.message);
      console.error(
        "Make sure MONGO_URI is set correctly in environment variables",
      );
      process.exit(1);
    }
  } else {
    console.log(
      "No MONGO_URI provided — spinning up in-memory MongoDB for dev",
    );
    try {
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      await connect(uri);
      console.log("✅ Connected to in-memory MongoDB");
      dbReady = true;
    } catch (err) {
      console.error("❌ In-memory MongoDB connection failed:", err.message);
      process.exit(1);
    }
  }

  // Seed ads if database is empty
  await seedAds();
}

connectDb().then(() => {
  const port = Number(process.env.PORT) || 4000;
  app.listen(port, () => {
    console.log(`🚀 Server listening on port ${port}`);
  });
});
