import { Router } from "express";
import Ad from "../models/Ad.js";

const router = Router();

// GET /api/ads?page=home   – returns all active ads for a page (incl. "all" fallback)
router.get("/", async (req, res) => {
  try {
    const page = req.query.page || "all";
    const ads = await Ad.find({
      isActive: true,
      page: { $in: [page, "all"] },
    }).sort({ position: 1, order: 1 });
    res.json(ads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/ads  – create a new ad (admin)
router.post("/", async (req, res) => {
  try {
    const ad = await Ad.create(req.body);
    res.status(201).json(ad);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/ads/:id  – update an ad
router.put("/:id", async (req, res) => {
  try {
    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ad) return res.status(404).json({ error: "Ad not found" });
    res.json(ad);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/ads/:id
router.delete("/:id", async (req, res) => {
  try {
    await Ad.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/ads/seed  – seed sample ads (dev only)
router.post("/seed", async (req, res) => {
  try {
    await Ad.deleteMany({});
    const samples = [
      // ── HOME PAGE ads ──────────────────────────────
      { title: "StudyBuddy AI", description: "AI-powered study plans for JEE & GATE. 10k+ students trust it.", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=studybuddy", linkUrl: "#", page: "home", position: "left", order: 1, badge: "FREE", bgColor: "#1e3a5f" },
      { title: "Hostel Finder", description: "Best PG & hostels near your campus. Book in 2 minutes.", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=hostel", linkUrl: "#", page: "home", position: "left", order: 2, badge: "NEW", bgColor: "#1e1b4b" },
      { title: "InternHub", description: "500+ internships from IIT/NIT alumni startups. Apply free.", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=intern", linkUrl: "#", page: "home", position: "left", order: 3, bgColor: "#162032" },
      { title: "GradeBoost", description: "Past papers, notes & solutions for 200+ IIT courses.", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=grade", linkUrl: "#", page: "home", position: "left", order: 4, badge: "HOT", bgColor: "#1a1a2e" },
      { title: "Campus Meals", description: "Order mess food & snacks delivered to your dorm.", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=meal", linkUrl: "#", page: "home", position: "left", order: 5, bgColor: "#0f172a" },

      { title: "TripiiTrip", description: "Plan trips & split expenses with friends. Built for students.", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=trip", linkUrl: "https://tripii-trip-psi.vercel.app/", page: "home", position: "right", order: 1, badge: "TRY IT", bgColor: "#0d3349" },
      { title: "CodeFast", description: "Learn to code in days, not years. Free DSA roadmap.", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=code", linkUrl: "#", page: "home", position: "right", order: 2, bgColor: "#1c1a36" },
      { title: "PrepElite", description: "GATE 2025 mock tests with AI analysis. Top rankers use it.", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=prep", linkUrl: "#", page: "home", position: "right", order: 3, badge: "EXAM", bgColor: "#1b2838" },
      { title: "Scholarly", description: "Research paper summaries in plain English. 1M+ papers.", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=scholar", linkUrl: "#", page: "home", position: "right", order: 4, bgColor: "#16213e" },
      { title: "SkillSprint", description: "Weekend workshops: ML, Web Dev, Robotics — ₹0 to join.", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=skill", linkUrl: "#", page: "home", position: "right", order: 5, badge: "FREE", bgColor: "#1a2744" },

      // ── IIT (ISM) Dhanbad page ads ─────────────────
      { title: "ISM Alumni Network", description: "Connect with 15,000+ ISM alumni for jobs & mentoring.", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=ismnet", linkUrl: "#", page: "IIT (ISM) Dhanbad", position: "left", order: 1, badge: "ALUMNI", bgColor: "#1e3a5f" },
      { title: "Dhanbad Eats", description: "Best dhabas & cafes near ISM campus. Reviews & hours.", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=dhan", linkUrl: "#", page: "IIT (ISM) Dhanbad", position: "left", order: 2, bgColor: "#162032" },
      { title: "Mining Careers", description: "Core mining, oil & gas PSU jobs — ISM student special.", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=mine", linkUrl: "#", page: "IIT (ISM) Dhanbad", position: "left", order: 3, bgColor: "#1a1a2e" },
      { title: "ISM Fest", description: "Conclave 2025 ticket booking open. Get early bird pricing.", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=fest", linkUrl: "#", page: "IIT (ISM) Dhanbad", position: "left", order: 4, badge: "LIVE", bgColor: "#1b2838" },
      { title: "Project Lab", description: "Rent PCB tools, Raspberry Pis & sensors for your projects.", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=lab", linkUrl: "#", page: "IIT (ISM) Dhanbad", position: "left", order: 5, bgColor: "#0f172a" },

      { title: "TripiiTrip", description: "Plan trips & split expenses with friends. Built for students.", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=trip2", linkUrl: "https://tripii-trip-psi.vercel.app/", page: "IIT (ISM) Dhanbad", position: "right", order: 1, badge: "TRY IT", bgColor: "#0d3349" },
      { title: "GFG Campus", description: "GeeksForGeeks for ISM: DSA bootcamp + placement prep.", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=gfg", linkUrl: "#", page: "IIT (ISM) Dhanbad", position: "right", order: 2, bgColor: "#1c1a36" },
      { title: "Jharkhand Stay", description: "PGs & rooms near ISM with verified reviews.", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=jhar", linkUrl: "#", page: "IIT (ISM) Dhanbad", position: "right", order: 3, bgColor: "#162032" },
      { title: "ScoreUp", description: "Previous year ISM question banks for every semester.", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=score", linkUrl: "#", page: "IIT (ISM) Dhanbad", position: "right", order: 4, bgColor: "#1b2838" },
      { title: "Startup Cell ISM", description: "Funding & mentorship for student startups. Apply now.", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=startup", linkUrl: "#", page: "IIT (ISM) Dhanbad", position: "right", order: 5, badge: "APPLY", bgColor: "#16213e" },

      // ── IIT Madras page ads ─────────────────────────
      { title: "Shaastra 2025", description: "India's largest student-run tech fest. Register now!", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=shaastra", linkUrl: "#", page: "IIT Madras", position: "left", order: 1, badge: "UPCOMING", bgColor: "#1e3a5f" },
      { title: "IITM Research Park", description: "Internships & PPOs from 50+ IITM Research Park startups.", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=iitmrp", linkUrl: "#", page: "IIT Madras", position: "left", order: 2, bgColor: "#162032" },
      { title: "Chennai PGs", description: "Verified PGs near IITM Taramani & Adyar gates.", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=chennaipg", linkUrl: "#", page: "IIT Madras", position: "left", order: 3, bgColor: "#1a1a2e" },
      { title: "Saarang Tickets", description: "IITM's cultural fest tickets — early bird 40% off.", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=saarang", linkUrl: "#", page: "IIT Madras", position: "left", order: 4, badge: "FEST", bgColor: "#1b2838" },
      { title: "DeepLearn IITM", description: "AI/ML course by IITM profs. Certificate included.", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=deeplearn", linkUrl: "#", page: "IIT Madras", position: "left", order: 5, bgColor: "#0f172a" },

      { title: "TripiiTrip", description: "Plan trips & split expenses with friends. Built for students.", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=trip3", linkUrl: "https://tripii-trip-psi.vercel.app/", page: "IIT Madras", position: "right", order: 1, badge: "TRY IT", bgColor: "#0d3349" },
      { title: "IITM Notes Hub", description: "Crowd-sourced notes for every IITM course. 100% free.", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=notes", linkUrl: "#", page: "IIT Madras", position: "right", order: 2, bgColor: "#1c1a36" },
      { title: "Velachery Bites", description: "Top-rated restaurants near IITM campus delivery.", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=velacha", linkUrl: "#", page: "IIT Madras", position: "right", order: 3, bgColor: "#162032" },
      { title: "IITM Y!ES Connect", description: "Student entrepreneurship cell — jobs & funding.", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=yes", linkUrl: "#", page: "IIT Madras", position: "right", order: 4, bgColor: "#1b2838" },
      { title: "SciPy India", description: "Annual scientific Python conference hosted at IITM.", imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=scipy", linkUrl: "#", page: "IIT Madras", position: "right", order: 5, badge: "CONF", bgColor: "#16213e" },
    ];
    await Ad.insertMany(samples);
    res.json({ success: true, count: samples.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
