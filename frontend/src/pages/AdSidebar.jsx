import React, { useEffect, useState } from "react";
import { fetchAds } from "../api";
import "./AdSidebar.css";

function AdCard({ ad }) {
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
export default function AdSidebar({ page = "home", position = "left", horizontal = false }) {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    let cancelled = false;
    fetchAds(page)
      .then((all) => {
        if (!cancelled)
          setAds(all.filter((a) => a.position === position));
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [page, position]);

  if (!ads.length) return null;

  return (
    <aside className={`ad-sidebar ${horizontal ? "ad-sidebar--h" : "ad-sidebar--v"}`}>
      <div className="ad-sidebar-label">Sponsored</div>
      {ads.slice(0, 5).map((ad) => (
        <AdCard key={ad._id} ad={ad} />
      ))}
      <div className="ad-spots-left">Advertise · {5 - ads.length} spots left</div>
    </aside>
  );
}
