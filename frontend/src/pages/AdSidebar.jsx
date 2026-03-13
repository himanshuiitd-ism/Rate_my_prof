import React from "react";

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

function AdCard({ ad, horizontal }) {
  const adCardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    background: "rgba(0, 0, 0, 0.05)",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
    padding: "12px",
    textDecoration: "none",
    color: "#1a1a2e",
    transition: "transform 0.18s ease",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    minHeight: "120px",
    ...(horizontal ? { minWidth: "140px", flexShrink: 0 } : {}),
    ...(ad.bgColor ? { background: ad.bgColor } : {}),
  };

  const adImgStyle = {
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    objectFit: "cover",
  };

  const adBodyStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    textAlign: "center",
  };

  const adTitleStyle = {
    fontSize: "13px",
    fontWeight: 700,
    color: "#1a1a2e",
    lineHeight: 1.3,
  };

  const adDescStyle = {
    fontSize: "11px",
    color: "rgba(26, 26, 46, 0.7)",
    lineHeight: 1.4,
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };

  console.log("Rendering ad:", ad);
  console.log("Ad card style:", adCardStyle);
  return (
    <a
      style={adCardStyle}
      href={ad.linkUrl || "#"}
      target={ad.linkUrl && ad.linkUrl !== "#" ? "_blank" : "_self"}
      rel="noopener noreferrer"
    >
      {ad.badge && <span className="ad-badge">{ad.badge}</span>}
      {ad.imageUrl && (
        <img
          src={ad.imageUrl}
          alt={ad.title}
          style={adImgStyle}
          loading="lazy"
        />
      )}
      <div style={adBodyStyle}>
        <div style={adTitleStyle}>{ad.title}</div>
        <div style={adDescStyle}>{ad.description}</div>
      </div>
    </a>
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

  const asideStyle = {
    display: "flex",
    gap: "10px",
    fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
    ...(horizontal
      ? {
          flexDirection: "row",
          flexWrap: "nowrap",
          overflowX: "auto",
          padding: "8px 0",
          width: "100%",
          scrollbarWidth: "none",
        }
      : {
          flexDirection: "column",
          width: "160px",
          minWidth: "160px",
          flexShrink: 0,
          gap: "8px",
        }),
  };

  const labelStyle = {
    fontSize: "10px",
    letterSpacing: "1.2px",
    textTransform: "uppercase",
    color: "rgba(0, 0, 0, 0.25)",
    fontWeight: 600,
    padding: "0 2px",
  };

  return (
    <aside style={asideStyle}>
      <div style={labelStyle}>Sponsored</div>
      {ads.map((ad) => (
        <AdCard key={ad._id} ad={ad} horizontal={horizontal} />
      ))}
    </aside>
  );
}
