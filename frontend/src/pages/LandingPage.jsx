import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdSidebar from "./AdSidebar";
import "./LandingPage.css";

const COLLEGES = [
  { id: "iit-ism", name: "IIT (ISM) Dhanbad" },
  { id: "iit-madras", name: "IIT Madras" },
  // { id: "iit-delhi",  name: "IIT Delhi" },
  // { id: "iit-bombay", name: "IIT Bombay" },
  // { id: "nit-trichy", name: "NIT Trichy" },
  // { id: "bits-pilani",name: "BITS Pilani" },
];

// Maps college id → display name used in the backend / DB
export const COLLEGE_NAMES = {
  "iit-ism": "IIT ISM Dhanbad",
  "iit-madras": "IIT Madras",
  // "iit-delhi":  "IIT Delhi",
  // "iit-bombay": "IIT Bombay",
  // "nit-trichy": "NIT Trichy",
  // "bits-pilani":"BITS Pilani",
};
// "iit-bombay": "IIT Bombay",
// "nit-trichy": "NIT Trichy",
// "bits-pilani":"BITS Pilani",

export default function LandingPage() {
  const [selectedCollege, setSelectedCollege] = useState("");
  const navigate = useNavigate();

  const handleEnter = (e) => {
    e.preventDefault();
    if (selectedCollege) {
      navigate("/profs", {
        state: {
          collegeId: selectedCollege,
          collegeName: COLLEGE_NAMES[selectedCollege],
        },
      });
    }
  };

  return (
    <div className="landing-root">
      {/* ── Mobile Top Ads ── */}
      <div className="mobile-ads-top">
        {/* <AdSidebar page="home" position="left" horizontal /> */}
      </div>

      {/* ── Three-column layout ── */}
      <div className="landing-layout">
        {/* Left ads – desktop only */}
        <div className="landing-sidebar landing-sidebar--left">
          {/* <AdSidebar page="home" position="left" /> */}
        </div>

        {/* Centre content */}
        <div className="landing-content">
          <div className="logo-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
            </svg>
          </div>

          <h1>Rate My Prof</h1>
          <p className="subtitle">
            Real-time anonymous ratings, chat & reviews for India's top
            colleges.
          </p>

          <form className="selection-box" onSubmit={handleEnter}>
            <label htmlFor="college-select">Choose your institution</label>
            <div className="select-wrapper">
              <select
                id="college-select"
                className="college-select"
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select a college...
                </option>
                {COLLEGES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <svg
                className="select-arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>

            <button
              type="submit"
              className="enter-btn"
              disabled={!selectedCollege}
            >
              Enter Campus
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>

          <div className="stats">
            <div className="stat-item">
              <span className="stat-value">500+</span>
              <span className="stat-label">Faculty</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">10k+</span>
              <span className="stat-label">Ratings</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">50+</span>
              <span className="stat-label">Colleges</span>
            </div>
          </div>
        </div>

        {/* Right ads – desktop only */}
        <div className="landing-sidebar landing-sidebar--right">
          <AdSidebar page="home" position="right" />
        </div>
      </div>

      {/* ── Mobile Bottom Ads ── */}
      <div className="mobile-ads-bottom">
        {/* <AdSidebar page="home" position="right" horizontal /> */}
      </div>
    </div>
  );
}
