import React, { useEffect, useState } from "react";
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
});

function MobileAdBox({ ad, onAdClick, isPlaceholder = false }) {
  const handleClick = () => {
    if (!isPlaceholder) {
      onAdClick(ad._id);
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
    >
      {/* Logo */}
      {!isPlaceholder && ad.imageUrl ? (
        <img
          src={ad.imageUrl}
          alt={ad.title}
          className="w-5 h-5 object-contain flex-shrink-0"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      ) : (
        <div className="w-5 h-5 rounded bg-gray-300 flex-shrink-0 flex items-center justify-center text-xs">
          {isPlaceholder ? "+" : ad.title?.charAt(0)}
        </div>
      )}

      {/* Title */}
      <span className="text-xs font-semibold whitespace-nowrap truncate">
        {isPlaceholder ? "Your ad here" : ad.title}
      </span>
    </button>
  );
}

export default function MobileAdCarousel({ page = "home", position = "top" }) {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true);
        const res = await API.get("/ads", { params: { page } });
        const pageAds = res.data || [];

        // Get ads and ensure we have 10
        let displayAds = [...pageAds];

        // Add placeholder ads to reach 10
        while (displayAds.length < 10) {
          displayAds.push({
            _id: `placeholder-${displayAds.length}`,
            title: "Your Ad",
            description: "Your ad goes here",
            isPlaceholder: true,
          });
        }

        // Keep only first 10
        displayAds = displayAds.slice(0, 10);
        setAds(displayAds);
      } catch (err) {
        console.error("Failed to fetch ads:", err);

        // Create 10 placeholder ads on error
        const placeholders = Array.from({ length: 10 }, (_, i) => ({
          _id: `placeholder-${i}`,
          title: "Your Ad",
          description: "Your ad goes here",
          isPlaceholder: true,
        }));
        setAds(placeholders);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [page, position]);

  const handleAdClick = async (adId) => {
    try {
      await API.post(`/ads/${adId}/click`);
    } catch (err) {
      console.error("Failed to track ad click:", err);
    }
  };

  if (loading) {
    return null;
  }

  // Mobile layout - horizontal scrolling
  const scrollContainerStyle = {
    display: "flex",
    gap: "0.5rem",
    overflowX: "auto",
    overflowY: "hidden",
    scrollBehavior: "smooth",
    WebkitOverflowScrolling: "touch",
    paddingBottom: "0.25rem",
  };

  // Hide scrollbar but keep scroll functionality
  const scrollbarHideStyle = `
    #scroll-container-${position} {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    #scroll-container-${position}::-webkit-scrollbar {
      display: none;
    }
  `;

  return (
    <>
      <style>{scrollbarHideStyle}</style>
      <div
        className={`w-full bg-white border border-gray-200 px-3 py-2 ${
          position === "top" ? "sticky top-0 z-50" : ""
        }`}
      >
        <div
          id={`scroll-container-${position}`}
          style={scrollContainerStyle}
          className="flex gap-2"
        >
          {ads.map((ad) => (
            <MobileAdBox
              key={ad._id}
              ad={ad}
              onAdClick={handleAdClick}
              isPlaceholder={ad.isPlaceholder}
            />
          ))}
          {/* Duplicate ads at end for infinite scroll effect */}
          {ads.map((ad) => (
            <MobileAdBox
              key={`${ad._id}-duplicate`}
              ad={ad}
              onAdClick={handleAdClick}
              isPlaceholder={ad.isPlaceholder}
            />
          ))}
        </div>
      </div>
    </>
  );
}
