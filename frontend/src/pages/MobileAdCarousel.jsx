import React, { useEffect, useState } from "react";
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
});

// Hardcoded sponsor ads (same as AdSidebar.jsx)
const SPONSOR_ADS = {
  home: [
    {
      _id: "1",
      title: "Chargeback.io",
      description: "Prevent chargebacks on autopilot",
      linkUrl: "https://www.chargeback.io/",
      position: "left",
      bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      imageUrl: "https://via.placeholder.com/40x40?text=C",
    },
    {
      _id: "2",
      title: "Devbox",
      description: "Instant dev environments with open source",
      linkUrl: "https://devbox.gg/ui/",
      position: "left",
      bgColor: "linear-gradient(135deg, #065f46 0%, #064e3b 100%)",
      imageUrl: "https://via.placeholder.com/40x40?text=D",
    },
    {
      _id: "3",
      title: "ZeroLeaks",
      description: "Red-team your AI agents for prompt injection",
      linkUrl: "https://zeroleaks.ai/",
      position: "right",
      bgColor: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
      imageUrl: "https://via.placeholder.com/40x40?text=Z",
    },
    {
      _id: "8",
      title: "himanshu.dev",
      description: "Join the entrepreneurship journey with me",
      linkUrl: "https://himanshuiid-ism.vercel.app/",
      position: "left",
      bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      imageUrl: null,
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
      imageUrl: "https://via.placeholder.com/40x40?text=C",
    },
    {
      _id: "5",
      title: "ZeroLeaks",
      description: "Red-team your AI agents for prompt injection",
      linkUrl: "https://zeroleaks.ai/",
      position: "right",
      bgColor: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
      imageUrl: "https://via.placeholder.com/40x40?text=Z",
    },
    {
      _id: "9",
      title: "himanshu.dev",
      description: "Join the entrepreneurship journey with me",
      linkUrl: "https://himanshuiid-ism.vercel.app/",
      position: "left",
      bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      imageUrl: null,
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
      imageUrl: "https://via.placeholder.com/40x40?text=G",
    },
    {
      _id: "7",
      title: "Devbox",
      description: "Instant dev environments with open source",
      linkUrl: "https://devbox.gg/ui/",
      position: "right",
      bgColor: "linear-gradient(135deg, #065f46 0%, #064e3b 100%)",
      imageUrl: "https://via.placeholder.com/40x40?text=D",
    },
    {
      _id: "10",
      title: "himanshu.dev",
      description: "Join the entrepreneurship journey with me",
      linkUrl: "https://himanshuiid-ism.vercel.app/",
      position: "left",
      bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      imageUrl: null,
    },
  ],
  "IIT (ISM) Dhanbad": [
    {
      _id: "4",
      title: "Chargeback.io",
      description: "Prevent chargebacks on autopilot",
      linkUrl: "https://www.chargeback.io/",
      position: "left",
      bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      imageUrl: "https://via.placeholder.com/40x40?text=C",
    },
    {
      _id: "5",
      title: "ZeroLeaks",
      description: "Red-team your AI agents for prompt injection",
      linkUrl: "https://zeroleaks.ai/",
      position: "right",
      bgColor: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
      imageUrl: "https://via.placeholder.com/40x40?text=Z",
    },
    {
      _id: "9",
      title: "himanshu.dev",
      description: "Join the entrepreneurship journey with me",
      linkUrl: "https://himanshuiid-ism.vercel.app/",
      position: "left",
      bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      imageUrl: null,
    },
  ],
  "IIT Guwahati": [],
  "IIT (BHU) Varanasi": [],
  NITTE: [],
};

function MobileAdBox({
  ad,
  onAdClick,
  isPlaceholder = false,
  showPlaceholderText = true,
  page,
  position,
  slotIndex,
}) {
  const handleClick = () => {
    if (!isPlaceholder) {
      const slotId = `${page}:${position}:${slotIndex}`;
      onAdClick(ad._id, slotId);
      if (ad.linkUrl && ad.linkUrl !== "#") {
        window.open(ad.linkUrl, "_blank");
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPlaceholder}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all flex-shrink-0 min-w-max ${
        isPlaceholder
          ? "border-gray-300 bg-gray-50 cursor-default"
          : "border-gray-200 bg-white hover:border-gray-400 cursor-pointer hover:shadow-md"
      }`}
      style={
        !isPlaceholder && ad.bgColor
          ? {
              background: ad.bgColor,
              borderColor: "rgba(255,255,255,0.3)",
              color: "#fff",
            }
          : {}
      }
      title={isPlaceholder ? "Available ad slot" : ad.title}
    >
      {/* Logo */}
      {!isPlaceholder && (ad.imageUrl || ad.logoUrl) ? (
        <img
          src={ad.imageUrl || ad.logoUrl}
          alt={ad.title}
          className="w-5 h-5 object-contain flex-shrink-0"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      ) : (
        <div className="w-5 h-5 rounded bg-gray-300 flex-shrink-0 flex items-center justify-center text-xs">
          {isPlaceholder
            ? showPlaceholderText
              ? "+"
              : ""
            : ad.title?.charAt(0)}
        </div>
      )}

      {/* Title */}
      {(!isPlaceholder || showPlaceholderText) && (
        <span className="text-xs font-semibold whitespace-nowrap truncate">
          {isPlaceholder ? "Your ad goes here" : ad.title}
        </span>
      )}
    </button>
  );
}

export default function MobileAdCarousel({ page = "home", position = "top" }) {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use hardcoded sponsor ads like desktop version
    const pageAds = SPONSOR_ADS[page] || [];

    // Filter ads by position: top = left ads, bottom = right ads
    const positionMap = { top: "left", bottom: "right" };
    const targetPosition = positionMap[position];

    let displayAds = pageAds.filter((ad) => ad.position === targetPosition);

    // Add placeholder ads to reach 5
    while (displayAds.length < 5) {
      displayAds.push({
        _id: `placeholder-${displayAds.length}`,
        title: "Your Ad",
        description: "Your ad goes here",
        isPlaceholder: true,
      });
    }

    setAds(displayAds);
    setLoading(false);
  }, [page, position]);

  const handleAdClick = async (adId, slotId) => {
    try {
      // Track click with proper slot structure
      await API.post("/ads/slots/click", {
        page,
        position,
        slotIndex: parseInt(slotId.split(":")[2]),
        adId,
        slotId,
      });
    } catch {}
  };

  if (loading) {
    return null;
  }

  const showPlaceholderText =
    ads.some((ad) => !ad.isPlaceholder) || page === "IIT (BHU) Varanasi";

  // CSS for auto-scroll animation (right-to-left)
  const scrollAnimationStyle = `
    @keyframes scroll-right-to-left {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }
    
    #scroll-container-${position} {
      animation: scroll-right-to-left 30s linear infinite;
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    
    #scroll-container-${position}::-webkit-scrollbar {
      display: none;
    }
    
    #scroll-container-${position}:hover {
      animation-play-state: paused;
    }
  `;

  const fixedClass =
    position === "top"
      ? "fixed top-0 left-0 right-0 z-40"
      : "fixed bottom-20 left-0 right-0 z-30";

  return (
    <>
      <style>{scrollAnimationStyle}</style>
      <div className={`w-full bg-white border border-gray-200 ${fixedClass}`}>
        <div
          id={`scroll-container-${position}`}
          style={{
            display: "flex",
            gap: "0.5rem",
            overflowX: "hidden",
            overflowY: "hidden",
            paddingLeft: "0.75rem",
            paddingRight: "0.75rem",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
            width: "max-content",
            whiteSpace: "nowrap",
          }}
          className="flex gap-2"
        >
          {ads.map((ad, idx) => (
            <MobileAdBox
              key={ad._id}
              ad={ad}
              onAdClick={handleAdClick}
              isPlaceholder={ad.isPlaceholder}
              page={page}
              position={position}
              slotIndex={idx}
              showPlaceholderText={showPlaceholderText}
            />
          ))}
          {/* Duplicate ads at end for infinite scroll effect */}
          {ads.map((ad, idx) => (
            <MobileAdBox
              key={`${ad._id}-duplicate`}
              ad={ad}
              onAdClick={handleAdClick}
              isPlaceholder={ad.isPlaceholder}
              page={page}
              position={position}
              slotIndex={idx + 5}
              showPlaceholderText={showPlaceholderText}
            />
          ))}
        </div>
      </div>
    </>
  );
}
