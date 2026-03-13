import React from "react";
import "./AdSidebar.css";

// Hardcoded sponsor ads
const SPONSOR_ADS = {
  home: [
    {
      _id: "1",
      title: "Chargeback.io",
      description: "Prevent chargebacks on autopilot",
      linkUrl: "https://www.chargeback.io/",
      position: "left",
      bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      _id: "2",
      title: "Devbox",
      description: "Instant dev environments with open source",
      linkUrl: "https://devbox.gg/ui/",
      position: "left",
      bgColor: "linear-gradient(135deg, #065f46 0%, #064e3b 100%)",
    },
    {
      _id: "3",
      title: "ZeroLeaks",
      description: "Red-team your AI agents for prompt injection",
      linkUrl: "https://zeroleaks.ai/",
      position: "right",
      bgColor: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
    },
  ],
  "IIT ISM Dhanbad": [
    {
      _id: "4",
      title: "Chargeback.io",
      description: "Prevent chargebacks on autopilot",
      linkUrl: "https://www.chargeback.io/",
      position: "left",
      bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      _id: "5",
      title: "ZeroLeaks",
      description: "Red-team your AI agents for prompt injection",
      linkUrl: "https://zeroleaks.ai/",
      position: "right",
      bgColor: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
    },
  ],
  "IIT Madras": [
    {
      _id: "6",
      title: "GetLate.dev",
      description: "Find warm leads and book sales calls automatically",
      linkUrl: "https://getlate.dev/",
      position: "left",
      bgColor: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
    },
    {
      _id: "7",
      title: "Devbox",
      description: "Instant dev environments with open source",
      linkUrl: "https://devbox.gg/ui/",
      position: "right",
      bgColor: "linear-gradient(135deg, #065f46 0%, #064e3b 100%)",
    },
  ],
};

function AdCard({ ad }) {
  console.log("Rendering ad:", ad);
  return (
    <a
      className="ad-card"
      href={ad.linkUrl || "#"}
      target={ad.linkUrl && ad.linkUrl !== "#" ? "_blank" : "_self"}
      rel="noopener noreferrer"
      style={ad.bgColor ? { background: ad.bgColor } : {}}
    >
      {ad.badge && <span className="ad-badge">{ad.badge}</span>}
      {ad.imageUrl && (
        <img
          src={ad.imageUrl}
          alt={ad.title}
          className="ad-img"
          loading="lazy"
        />
      )}
      <div className="ad-body">
        <div className="ad-title">{ad.title}</div>
        <div className="ad-desc">{ad.description}</div>
      </div>
    </a>
    // <p>Hi man</p>
  );
}

export default function AdSidebar({
  page = "home",
  position = "left",
  horizontal = false,
}) {
  // Get ads for this page and position
  const pageAds = SPONSOR_ADS[page] || SPONSOR_ADS["home"] || [];
  const ads = pageAds.filter((ad) => ad.position === position);

  // Don't render if no ads
  if (ads.length === 0) {
    return null;
  }

  return (
    <aside className={`ad-sidebar`}>
      <div className="ad-sidebar-label">Sponsored</div>
      {ads.map((ad) => (
        <AdCard key={ad._id} ad={ad} />
      ))}
    </aside>
  );
}
