import React from "react";
import { Link } from "react-router-dom";
import "./IechmBannerPage.css";

export default function IechmBannerPage() {
  return (
    <main className="iechm-page">
      <div className="iechm-card">
        <img
          src="/IECHM%20banner.jpeg"
          alt="IECHM banner"
          className="iechm-banner"
        />

        <div className="iechm-actions">
          <a
            href="https://www.instagram.com/iechms/"
            target="_blank"
            rel="noopener noreferrer"
            className="iechm-btn iechm-btn--primary"
          >
            Visit IECHM Instagram
          </a>

          <Link to="/" className="iechm-btn iechm-btn--secondary">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
