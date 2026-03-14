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
      logoUrl: "https://via.placeholder.com/40x40?text=C",
    },
    {
      _id: "2",
      title: "Devbox",
      description: "Instant dev environments with open source",
      linkUrl: "https://devbox.gg/ui/",
      position: "left",
      bgColor: "linear-gradient(135deg, #065f46 0%, #064e3b 100%)",
      logoUrl: "https://via.placeholder.com/40x40?text=D",
    },
    {
      _id: "3",
      title: "ZeroLeaks",
      description: "Red-team your AI agents for prompt injection",
      linkUrl: "https://zeroleaks.ai/",
      position: "right",
      bgColor: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
      logoUrl: "https://via.placeholder.com/40x40?text=Z",
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
      logoUrl: "https://via.placeholder.com/40x40?text=C",
    },
    {
      _id: "5",
      title: "ZeroLeaks",
      description: "Red-team your AI agents for prompt injection",
      linkUrl: "https://zeroleaks.ai/",
      position: "right",
      bgColor: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
      logoUrl: "https://via.placeholder.com/40x40?text=Z",
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
      logoUrl: "https://via.placeholder.com/40x40?text=G",
    },
    {
      _id: "7",
      title: "Devbox",
      description: "Instant dev environments with open source",
      linkUrl: "https://devbox.gg/ui/",
      position: "right",
      bgColor: "linear-gradient(135deg, #065f46 0%, #064e3b 100%)",
      logoUrl: "https://via.placeholder.com/40x40?text=D",
    },
  ],
};

function AdCard({ ad, isPlaceholder = false, placeholderColor = "#ccc" }) {
  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    textDecoration: "none",
    minHeight: "120px",
    width: "120px", // Decreased width
    color: "#fff",
    transition: "transform 0.15s ease",
    boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
    border: isPlaceholder ? `2px dashed ${placeholderColor}` : "none",
    background: isPlaceholder
      ? "rgba(0, 0, 0, 0.5)"
      : ad.bgColor || "rgba(0,0,0,0.05)",
    position: "relative",
  };

  if (isPlaceholder) {
    return (
      <div style={cardStyle}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            borderRadius: "0.5rem",
          }}
        ></div>
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div
            style={{
              fontSize: "0.875rem",
              fontWeight: "bold",
              marginBottom: "0.25rem",
              color: "#fff",
            }}
          >
            Your ad goes here
          </div>
        </div>
      </div>
    );
  }

  return (
    <a
      href={ad.linkUrl || "#"}
      target={ad.linkUrl && ad.linkUrl !== "#" ? "_blank" : "_self"}
      rel="noopener noreferrer"
      style={cardStyle}
    >
      {ad.logoUrl && (
        <img
          src={ad.logoUrl}
          alt={ad.title}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            marginBottom: "0.5rem",
          }}
        />
      )}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: "0.875rem",
            fontWeight: "bold",
            marginBottom: "0.25rem",
          }}
        >
          {ad.title}
        </div>
        <div style={{ fontSize: "0.75rem", opacity: 0.9 }}>
          {ad.description}
        </div>
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

  // Create 5 slots: fill with actual ads, rest placeholders with different colors
  const totalSlots = 5;
  const placeholderColors = [
    "#ff6b6b",
    "#4ecdc4",
    "#45b7d1",
    "#f9ca24",
    "#f0932b",
  ];
  const cards = [];
  for (let i = 0; i < totalSlots; i++) {
    if (i < ads.length) {
      cards.push(<AdCard key={ads[i]._id} ad={ads[i]} />);
    } else {
      cards.push(
        <AdCard
          key={`placeholder-${i}`}
          isPlaceholder
          placeholderColor={placeholderColors[i - ads.length]}
        />,
      );
    }
  }

  const isLeft = position === "left";

  const asideStyle = {
    position: "fixed",
    zIndex: 9999,
    display: "flex",
    gap: "0.75rem",
    padding: "0.5rem",
    maxWidth: "100%",
    ...(horizontal
      ? {
          bottom: 0,
          left: 0,
          right: 0,
          flexDirection: "row",
          overflowX: "auto",
        }
      : {
          top: "50%",
          transform: "translateY(-50%)",
          flexDirection: "column",
          left: isLeft ? "20px" : "auto",
          right: isLeft ? "auto" : "20px",
        }),
  };

  return (
    <aside style={asideStyle} className="bg-transparent">
      <div
        className="text-xs uppercase tracking-wider text-gray-200 mb-2 whitespace-nowrap"
        style={{ color: "rgba(203, 213, 225, 0.9)" }}
      >
        Sponsored
      </div>
      {cards}
    </aside>
  );
}
