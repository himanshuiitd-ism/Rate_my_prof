import React, { useMemo } from "react";
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
  if (ad.placeholder) {
    return (
      <div
        className="ad-card ad-placeholder"
        style={{ cursor: "default", background: "rgba(255,255,255,0.08)" }}
      >
        <div className="ad-body">
          <div className="ad-title">Your ad here</div>
        </div>
      </div>
    );
  }

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
  );
}

/**
 * AdSidebar
 * @param {string}  page       - "home" | college name
 * @param {"left"|"right"|"top"|"bottom"} position
 * @param {boolean} horizontal - render ads horizontally (for top/bottom mobile)
 */
export default function AdSidebar({
  page = "home",
  position = "left",
  horizontal = false,
}) {
  // compute list with placeholders
  const ads = useMemo(() => {
    const pageAds = SPONSOR_ADS[page] || [];
    const filtered = pageAds.filter((a) => a.position === position);
    const result = filtered.slice(0, 5);
    while (result.length < 5) {
      result.push({ _id: `ph-${result.length}`, placeholder: true });
    }
    return result;
  }, [page, position]);

  // duplicate for continuous scroll
  const trackAds = useMemo(() => [...ads, ...ads], [ads]);

  // Always render; placeholders ensure 5 slots
  if (!ads) {
    return null;
  }

  return (
    <aside
      className={`ad-sidebar ${horizontal ? "ad-sidebar--h" : "ad-sidebar--v"}`}
    >
      {ads.length > 0 && <div className="ad-sidebar-label">Sponsored</div>}
      <div className="ad-track">
        {trackAds.map((ad, idx) => (
          <AdCard key={ad._id + "-" + idx} ad={ad} />
        ))}
      </div>
    </aside>
  );
}
