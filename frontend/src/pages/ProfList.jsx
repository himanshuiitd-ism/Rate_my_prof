import React, { useState, useMemo, useEffect, useRef, memo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadProfessors, setScrollPosition } from "../redux/ProfessorSlice.js";
import {
  loadLeaderboard,
  updateLeaderboardFromProfessors,
} from "../redux/leaderboardSlice.js";
import Leaderboard from "./Leaderboard.jsx";
import AdSidebar from "./AdSidebar.jsx";
import "./ProfList.css";

/* ── Prof Card ─────────────────────────────────────────── */
const ProfCard = memo(({ p }) => {
  const avg = p.avgRating;
  const ratingColor = avg >= 8 ? "#22c55e" : avg >= 5 ? "#f59e0b" : avg > 0 ? "#ef4444" : null;
  return (
    <Link to={`/prof/${p._id}`} className="prof-card">
      <div className="card-img-wrap">
        {p.photoUrl ? (
          <img src={p.photoUrl} alt={p.name} loading="lazy" />
        ) : (
          <div className="card-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
            </svg>
          </div>
        )}
        <div className="rating-badge" style={ratingColor ? { background: ratingColor + "22", borderColor: ratingColor + "55" } : {}}>
          {avg != null && avg > 0 ? (
            <>
              <span className="star" style={ratingColor ? { color: ratingColor } : {}}>★</span>
              <span style={ratingColor ? { color: ratingColor } : {}}>{avg.toFixed(1)}</span>
              <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600 }}>/10</span>
            </>
          ) : (
            <span className="no-rating">No ratings</span>
          )}
        </div>
      </div>
      <div className="card-body">
        <div className="card-name">{p.name}</div>
        {p.department && <div className="card-dept">{p.department}</div>}
      </div>
    </Link>
  );
});

/* ── Main Component ────────────────────────────────────── */
export default function ProfList() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const collegeId   = location.state?.collegeId   || "iit-ism";
  const collegeName = location.state?.collegeName  || "IIT (ISM) Dhanbad";

  const { list: professors, loading, error, scrollPosition } =
    useSelector((state) => state.professors);

  const [search,       setSearch]       = useState("");
  const [activeDept,   setActiveDept]   = useState("All");
  const [visibleCount, setVisibleCount] = useState(40);
  const containerRef = useRef(null);

  /* ── Load data ── */
  useEffect(() => {
    dispatch(loadProfessors());
    dispatch(loadLeaderboard());
  }, [dispatch]);

  useEffect(() => {
    if (professors.length > 0) dispatch(updateLeaderboardFromProfessors(professors));
  }, [professors, dispatch]);

  /* ── Scroll restore ── */
  useEffect(() => {
    if (scrollPosition && containerRef.current) {
      setTimeout(() => window.scrollTo(0, scrollPosition), 0);
    }
  }, [scrollPosition]);

  useEffect(() => {
    const h = () => dispatch(setScrollPosition(window.scrollY));
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, [dispatch]);

  /* ── Departments derived from data ── */
  const departments = useMemo(() => {
    const set = new Set(professors.map((p) => p.department).filter(Boolean));
    return ["All", ...Array.from(set).sort()];
  }, [professors]);

  /* ── Filter chain ── */
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return professors.filter((p) => {
      const matchSearch = !q || p.name.toLowerCase().includes(q);
      const matchDept   = activeDept === "All" || p.department === activeDept;
      return matchSearch && matchDept;
    });
  }, [professors, search, activeDept]);

  /* ── Group by department for display ── */
  const grouped = useMemo(() => {
    if (activeDept !== "All") {
      return [{ dept: activeDept, profs: filtered.slice(0, visibleCount) }];
    }
    // Group
    const map = {};
    filtered.forEach((p) => {
      const d = p.department || "Other";
      if (!map[d]) map[d] = [];
      map[d].push(p);
    });
    return Object.keys(map).sort().map((dept) => ({ dept, profs: map[dept] }));
  }, [filtered, activeDept, visibleCount]);

  const totalVisible = grouped.reduce((s, g) => s + g.profs.length, 0);

  return (
    <div className="prof-list-root" ref={containerRef}>
      {/* ─── Mobile top ads ─── */}
      <div className="mobile-ads-top">
        <AdSidebar page={collegeName} position="left" horizontal />
      </div>

      {/* ─── Page layout: sidebar | main | sidebar ─── */}
      <div className="prof-list-layout">
        {/* Left ad sidebar */}
        <div className="prof-sidebar prof-sidebar--left">
          <AdSidebar page={collegeName} position="left" />
        </div>

        {/* ─── Main content ─── */}
        <div className="prof-main">
          {/* Header */}
          <div className="hero">
            <div className="hero-content">
              <button className="back-link" onClick={() => navigate("/")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Change College
              </button>

              <div className="hero-title-row">
                <h1 className="hero-title">Rate My Prof</h1>
                <span className="college-badge">{collegeName}</span>
              </div>
              <p className="hero-sub">Anonymous ratings &amp; reviews for {collegeName} faculty</p>

              {/* Search */}
              <div className="search-wrap">
                <svg className="search-icon" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search professors by name…"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setVisibleCount(40); }}
                />
              </div>

              <div className="count-badge">
                Showing <span>{totalVisible}</span> of <span>{filtered.length}</span> professors
              </div>
            </div>
          </div>

          {/* Department filter pills */}
          {departments.length > 1 && (
            <div className="dept-filter-wrap">
              <div className="dept-filter">
                {departments.map((d) => (
                  <button
                    key={d}
                    className={`dept-pill${activeDept === d ? " dept-pill--active" : ""}`}
                    onClick={() => { setActiveDept(d); setVisibleCount(40); }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Promo banner */}
          <div className="promo-banner">
            <p className="promo-text">
              Planning trips with friends? We built TripiiTrip to split expenses,
              plan routes &amp; travel together 👀{" "}
              <a href="https://tripii-trip-psi.vercel.app/" target="_blank"
                 rel="noopener noreferrer" className="promo-link">
                tripiitrip.com →
              </a>
            </p>
          </div>

          {/* Leaderboard */}
          <Leaderboard />

          {/* Content */}
          {loading ? (
            <div className="loading-state">
              <div className="loader" />
              <div className="loading-text">Loading professors…</div>
            </div>
          ) : error ? (
            <div className="empty-state"><h3>Error</h3><p>{error}</p></div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <h3>{professors.length === 0 ? "No professors loaded" : "No results found"}</h3>
              <p>{professors.length === 0 ? "Run the scraper first." : `No professor matching "${search}"`}</p>
            </div>
          ) : (
            <>
              {grouped.map(({ dept, profs }) => (
                <div key={dept} className="dept-section">
                  <div className="dept-heading">
                    <span className="dept-name">{dept}</span>
                    <span className="dept-count">{profs.length} prof{profs.length !== 1 ? "s" : ""}</span>
                  </div>
                  <div className="prof-grid">
                    {profs.map((p) => <ProfCard key={p._id} p={p} />)}
                  </div>
                </div>
              ))}

              {activeDept === "All" && totalVisible < filtered.length && (
                <div className="load-more-wrap">
                  <button className="load-more-btn" onClick={() => setVisibleCount((v) => v + 40)}>
                    Load More Professors
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right ad sidebar */}
        <div className="prof-sidebar prof-sidebar--right">
          <AdSidebar page={collegeName} position="right" />
        </div>
      </div>

      {/* ─── Mobile bottom ads ─── */}
      <div className="mobile-ads-bottom">
        <AdSidebar page={collegeName} position="right" horizontal />
      </div>
    </div>
  );
}
