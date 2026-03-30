import React from "react";
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
});

const duplicateCardsForScroll = (cards, suffix) => [
  ...cards,
  ...cards.map((card, idx) =>
    React.cloneElement(card, { key: `${suffix}-${idx}` }),
  ),
];

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
    {
      _id: "8",
      title: "himanshu.dev",
      description: "Join the entrepreneurship journey with me",
      linkUrl: "https://himanshuiid-ism.vercel.app/",
      position: "left",
      bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      logoUrl: null,
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
    {
      _id: "9",
      title: "himanshu.dev",
      description: "Join the entrepreneurship journey with me",
      linkUrl: "https://himanshuiid-ism.vercel.app/",
      position: "left",
      bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      logoUrl: null,
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
    {
      _id: "10",
      title: "himanshu.dev",
      description: "Join the entrepreneurship journey with me",
      linkUrl: "https://himanshuiid-ism.vercel.app/",
      position: "left",
      bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      logoUrl: null,
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
    {
      _id: "9",
      title: "himanshu.dev",
      description: "Join the entrepreneurship journey with me",
      linkUrl: "https://himanshuiid-ism.vercel.app/",
      position: "left",
      bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      logoUrl: null,
    },
  ],
  "IIT Guwahati": [],
  "IIT (BHU) Varanasi": [],
  NITTE: [],
};

function AdCard({
  ad,
  isPlaceholder = false,
  placeholderColor = "#ccc",
  showPlaceholderText = true,
  isHorizontal = false,
  slotId = "",
  slotPosition = "left",
  slotIndex = 0,
  page = "home",
  onSlotClick = null,
}) {
  // Handle click on any slot (filled or empty)
  const handleSlotClick = async () => {
    if (onSlotClick && slotId) {
      await onSlotClick({
        slotId,
        page,
        position: slotPosition,
        slotIndex,
        adId: ad?._id || null,
      });
    }
    // If this is a real ad, open the link
    if (!isPlaceholder && ad?.linkUrl && ad.linkUrl !== "#") {
      window.open(ad.linkUrl, "_blank");
    }
  };

  const cardStyle = {
    display: "flex",
    flexDirection: isHorizontal ? "row" : "column",
    alignItems: "center",
    justifyContent: "center",
    padding: isHorizontal ? "0.25rem 0.5rem" : "0.5rem",
    borderRadius: isHorizontal ? "999px" : "0.5rem",
    textDecoration: "none",
    minHeight: isHorizontal ? "32px" : "120px",
    width: isHorizontal ? "120px" : "140px",
    flex: isHorizontal ? "0 0 auto" : "none",
    color: "#fff",
    transition: "transform 0.15s ease",
    boxShadow: isHorizontal
      ? "0 3px 8px rgba(0,0,0,0.15)"
      : "0 10px 15px rgba(0, 0, 0, 0.1)",
    border: isPlaceholder ? `1px dashed ${placeholderColor}` : "none",
    background: isPlaceholder
      ? "rgba(248, 250, 252, 0.65)"
      : ad.bgColor || "rgba(0,0,0,0.05)",
    position: "relative",
    scrollSnapAlign: isHorizontal ? "start" : "auto",
  };

  if (isPlaceholder) {
    return (
      <div
        style={{ ...cardStyle, cursor: "pointer" }}
        onClick={handleSlotClick}
      >
        {/* <div
          style={{
            position: "absolute",
            top: "6px",
            left: "6px",
            zIndex: 2,
            fontSize: "10px",
            padding: "2px 6px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.2)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.4)",
          }}
        >
          {slotId}
        </div> */}
        {showPlaceholderText && (
          <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <div
              style={{
                fontSize: "0.8rem",
                fontWeight: "600",
                marginBottom: "0.25rem",
                color: "#64748b",
              }}
            >
              Your ad goes here
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <a
      href={ad.linkUrl || "#"}
      target={ad.linkUrl && ad.linkUrl !== "#" ? "_blank" : "_self"}
      rel="noopener noreferrer"
      data-slot-id={slotId}
      style={{ ...cardStyle, cursor: "pointer" }}
      onClick={(e) => {
        e.preventDefault();
        handleSlotClick();
      }}
    >
      {/* <div
        style={{
          position: "absolute",
          top: "6px",
          left: "6px",
          zIndex: 2,
          fontSize: "10px",
          padding: "2px 6px",
          borderRadius: "999px",
          background: "rgba(255,255,255,0.2)",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.4)",
        }}
      >
        {slotId}
      </div> */}
      {ad.logoUrl ? (
        <img
          src={ad.logoUrl}
          alt={ad.title}
          style={{
            width: isHorizontal ? "24px" : "30px",
            height: isHorizontal ? "24px" : "30px",
            borderRadius: "6px",
            marginRight: isHorizontal ? "0.5rem" : "0",
            marginBottom: isHorizontal ? "0" : "0.5rem",
          }}
        />
      ) : (
        <div
          style={{
            width: isHorizontal ? "24px" : "30px",
            height: isHorizontal ? "24px" : "30px",
            borderRadius: "6px",
            marginRight: isHorizontal ? "0.5rem" : "0",
            marginBottom: isHorizontal ? "0" : "0.5rem",
            background: "rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: isHorizontal ? "13px" : "15px",
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          {ad.title.charAt(0).toUpperCase()}
        </div>
      )}
      <div style={{ textAlign: isHorizontal ? "left" : "center" }}>
        <div
          style={{
            fontSize: isHorizontal ? "0.75rem" : "0.875rem",
            fontWeight: "bold",
            marginBottom: isHorizontal ? "0" : "0.25rem",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {ad.title}
        </div>
        {!isHorizontal && (
          <div style={{ fontSize: "0.75rem", opacity: 0.9 }}>
            {ad.description}
          </div>
        )}
      </div>
    </a>
  );
}

function AutoScrollRow({ children, style, className }) {
  const ref = React.useRef(null);
  const pauseRef = React.useRef(false);
  const timeoutRef = React.useRef();

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // When scroll reaches halfway (duplicate content), reset seamlessly.
    const resetThreshold = () => el.scrollWidth / 2;

    let raf = 0;
    let lastTime = performance.now();

    const step = (time) => {
      const dt = time - lastTime;
      lastTime = time;

      if (!pauseRef.current) {
        const speed = 0.04; // px per ms
        el.scrollLeft += dt * speed;

        const threshold = resetThreshold();
        if (el.scrollLeft >= threshold) {
          el.scrollLeft -= threshold;
        }
      }

      raf = requestAnimationFrame(step);
    };

    const handleUserScroll = () => {
      pauseRef.current = true;
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        pauseRef.current = false;
      }, 1200);
    };

    el.addEventListener("scroll", handleUserScroll, { passive: true });
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", handleUserScroll);
      window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        overflowX: "auto",
        overflowY: "hidden",
        scrollBehavior: "smooth",
      }}
    >
      {children}
    </div>
  );
}

export default function AdSidebar({
  page = "home",
  position = "left",
  horizontal = false,
}) {
  // Handle slot click and track it
  const handleSlotClick = async ({
    slotId,
    page,
    position,
    slotIndex,
    adId,
  }) => {
    try {
      await API.post("/ads/slots/click", {
        page,
        position,
        slotIndex,
        slotId,
        adId: adId || null,
      });
    } catch {}
  };

  // Get ads for this page
  const pageAds = SPONSOR_ADS[page] || [];
  const ads = horizontal
    ? pageAds
    : pageAds.filter((ad) => ad.position === position);
  const showPlaceholderText =
    pageAds.length > 0 || page === "IIT (BHU) Varanasi";

  const buildCardsForLane = (lanePosition, isHorizontalLane) => {
    if (isHorizontalLane) {
      return ads.map((ad, idx) => (
        <AdCard
          key={`${lanePosition}-${ad._id}-${idx}`}
          ad={ad}
          isHorizontal
          slotId={`${page}:${lanePosition}:${idx}`}
          slotPosition={lanePosition}
          slotIndex={idx}
          page={page}
          onSlotClick={handleSlotClick}
        />
      ));
    }

    return (() => {
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
          cards.push(
            <AdCard
              key={`${lanePosition}-${ads[i]._id}`}
              ad={ads[i]}
              isHorizontal={false}
              slotId={`${page}:${lanePosition}:${i}`}
              slotPosition={lanePosition}
              slotIndex={i}
              page={page}
              onSlotClick={handleSlotClick}
            />,
          );
        } else {
          cards.push(
            <AdCard
              key={`${lanePosition}-placeholder-${i}`}
              isPlaceholder
              placeholderColor={placeholderColors[i - ads.length]}
              showPlaceholderText={showPlaceholderText}
              isHorizontal={false}
              slotId={`${page}:${lanePosition}:${i}`}
              slotPosition={lanePosition}
              slotIndex={i}
              page={page}
              onSlotClick={handleSlotClick}
            />,
          );
        }
      }
      return cards;
    })();
  };

  // For desktop, create slots with placeholders; for mobile, use unique lanes for top and bottom bars
  const allCards = horizontal
    ? buildCardsForLane("top", true)
    : buildCardsForLane(position, false);

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

  if (horizontal) {
    const rowStyle = {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "0 10px",
      width: "max-content",
      whiteSpace: "nowrap",
    };

    const barStyle = {
      position: "fixed",
      left: 0,
      right: 0,
      zIndex: 9999,
      background: "rgba(15, 23, 42, 0.75)",
      backdropFilter: "blur(12px)",
      padding: "6px 0",
      border: "1px solid rgba(255, 255, 255, 0.25)",
      borderRadius: "999px",
    };

    const topCards = buildCardsForLane("top", true);
    const bottomCards = buildCardsForLane("bottom", true);
    const scrollingTopAds = duplicateCardsForScroll(topCards, "top-dup");
    const scrollingBottomAds = duplicateCardsForScroll(
      bottomCards,
      "bottom-dup",
    );

    return (
      <>
        <aside style={{ ...barStyle, top: 0 }}>
          <AutoScrollRow className="ad-scroll" style={rowStyle}>
            {scrollingTopAds}
          </AutoScrollRow>
        </aside>
        <aside style={{ ...barStyle, bottom: 0 }}>
          <AutoScrollRow className="ad-scroll" style={rowStyle}>
            {scrollingBottomAds}
          </AutoScrollRow>
        </aside>
      </>
    );
  }

  return (
    <aside style={asideStyle} className="bg-transparent">
      <div
        className="text-xs uppercase tracking-wider text-gray-200 mb-2 whitespace-nowrap"
        style={{ color: "rgba(203, 213, 225, 0.9)" }}
      >
        Sponsored
      </div>
      {allCards}
    </aside>
  );
}
