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

function AdCard({
  ad,
  isPlaceholder = false,
  placeholderColor = "#ccc",
  isHorizontal = false,
}) {
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
    border: isPlaceholder ? `1px solid ${placeholderColor}` : "none",
    background: isPlaceholder
      ? "rgba(0, 0, 0, 0.5)"
      : ad.bgColor || "rgba(0,0,0,0.05)",
    position: "relative",
    scrollSnapAlign: isHorizontal ? "start" : "auto",
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
      ;{children}
    </div>
  );
}

export default function AdSidebar({
  page = "home",
  position = "left",
  horizontal = false,
}) {
  // Get ads for this page
  const pageAds = SPONSOR_ADS[page] || SPONSOR_ADS["home"] || [];
  const ads = horizontal
    ? pageAds
    : pageAds.filter((ad) => ad.position === position);

  // For desktop, create slots with placeholders; for mobile, just the ads
  const allCards = horizontal
    ? ads.map((ad) => <AdCard key={ad._id} ad={ad} isHorizontal={horizontal} />)
    : (() => {
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
              <AdCard key={ads[i]._id} ad={ads[i]} isHorizontal={horizontal} />,
            );
          } else {
            cards.push(
              <AdCard
                key={`placeholder-${i}`}
                isPlaceholder
                placeholderColor={placeholderColors[i - ads.length]}
                isHorizontal={horizontal}
              />,
            );
          }
        }
        return cards;
      })();

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

    const scrollingAds = [...allCards, ...allCards];

    return (
      <>
        <aside style={{ ...barStyle, top: 0 }}>
          <AutoScrollRow className="ad-scroll" style={rowStyle}>
            {scrollingAds}
          </AutoScrollRow>
        </aside>
        <aside style={{ ...barStyle, bottom: 0 }}>
          <AutoScrollRow className="ad-scroll" style={rowStyle}>
            {scrollingAds}
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
