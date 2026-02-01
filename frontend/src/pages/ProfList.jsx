import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../Appcontext.jsx";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #1a1a2e;
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
  }

  .prof-list-root {
    min-height: 100vh;
    background: #f5f7fa;
    padding: 0;
  }

  /* Hero / Header */
  .hero {
    position: relative;
    padding: 80px 40px 60px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    overflow: hidden;
  }
  
  .hero::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 500px;
    height: 500px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    animation: float 8s ease-in-out infinite;
  }
  
  .hero::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -5%;
    width: 400px;
    height: 400px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 50%;
    animation: float 10s ease-in-out infinite reverse;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-30px) scale(1.05); }
  }
  
  .hero-content {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .hero-title {
    font-size: 64px;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 12px;
    letter-spacing: -1px;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .hero-sub {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
    margin-bottom: 32px;
  }

  /* Search */
  .search-wrap {
    position: relative;
    max-width: 600px;
    margin-bottom: 20px;
  }
  
  .search-icon {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: #667eea;
    width: 22px;
    height: 22px;
    pointer-events: none;
  }
  
  .search-input {
    width: 100%;
    padding: 18px 24px 18px 56px;
    background: #ffffff;
    border: 2px solid transparent;
    border-radius: 16px;
    color: #1a1a2e;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 16px;
    font-weight: 500;
    outline: none;
    transition: all 0.3s;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  }
  
  .search-input::placeholder {
    color: #9ca3af;
  }
  
  .search-input:focus {
    border-color: #667eea;
    box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3), 0 0 0 4px rgba(102, 126, 234, 0.1);
    transform: translateY(-2px);
  }

  /* Count badge */
  .count-badge {
    font-size: 15px;
    color: rgba(255, 255, 255, 0.95);
    font-weight: 600;
  }
  
  .count-badge span {
    color: #fbbf24;
    font-weight: 800;
  }

  /* Grid */
  .prof-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 28px;
    padding: 50px 40px;
    max-width: 1400px;
    margin: 0 auto;
  }

  /* Card */
  .prof-card {
    background: #ffffff;
    border: 2px solid transparent;
    border-radius: 24px;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    position: relative;
  }
  
  .prof-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 24px;
    padding: 2px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s;
  }
  
  .prof-card:hover::before {
    opacity: 1;
  }
  
  .prof-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
  }

  .card-img-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  }
  
  .card-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .prof-card:hover .card-img-wrap img {
    transform: scale(1.1);
  }

  /* Placeholder avatar */
  .card-placeholder {
    width: 100%;
    aspect-ratio: 1/1;
    background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .card-placeholder svg {
    width: 72px;
    height: 72px;
    color: #667eea;
    opacity: 0.4;
  }

  /* Rating badge */
  .rating-badge {
    position: absolute;
    top: 16px;
    right: 16px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    border: 2px solid rgba(102, 126, 234, 0.3);
    border-radius: 30px;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 15px;
    font-weight: 700;
    color: #1a1a2e;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    transition: all 0.3s;
  }
  
  .prof-card:hover .rating-badge {
    transform: scale(1.05);
    border-color: #667eea;
  }
  
  .rating-badge .star {
    color: #fbbf24;
    font-size: 18px;
    filter: drop-shadow(0 2px 4px rgba(251, 191, 36, 0.4));
  }
  
  .rating-badge .no-rating {
    color: #6b7280;
    font-size: 12px;
    font-weight: 600;
  }

  /* Card body */
  .card-body {
    padding: 24px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .card-name {
    font-size: 18px;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.3s;
  }
  
  .prof-card:hover .card-name {
    color: #667eea;
  }
  
  .card-dept {
    font-size: 14px;
    color: #6b7280;
    font-weight: 500;
  }

  /* Empty state */
  .empty-state {
    text-align: center;
    padding: 120px 40px;
    color: #6b7280;
  }
  
  .empty-state h3 {
    font-size: 24px;
    color: #374151;
    margin-bottom: 12px;
    font-weight: 700;
  }
  
  .empty-state p {
    font-size: 16px;
    color: #6b7280;
  }

  /* Loading state */
  .loading-state {
    text-align: center;
    padding: 120px 40px;
  }
  
  .loader {
    width: 48px;
    height: 48px;
    border: 4px solid #e5e7eb;
    border-top-color: #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .loading-text {
    font-size: 16px;
    color: #6b7280;
    font-weight: 600;
  }
`;

export default function ProfList() {
  const { professors, loading, error, scrollPosition, setScrollPosition } =
    useAppContext();
  const [search, setSearch] = useState("");
  const containerRef = useRef(null);

  // Restore scroll position when component mounts
  useEffect(() => {
    if (scrollPosition && containerRef.current) {
      // Use setTimeout to ensure DOM is ready
      setTimeout(() => {
        window.scrollTo(0, scrollPosition);
      }, 0);
    }
  }, [scrollPosition]);

  // Save scroll position before navigating away
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setScrollPosition]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return professors;
    return professors.filter((p) => p.name.toLowerCase().includes(q));
  }, [professors, search]);

  return (
    <div className="prof-list-root" ref={containerRef}>
      <style>{styles}</style>

      {/* Header */}
      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Rate My Prof</h1>
          <p className="hero-sub">
            Anonymous ratings & reviews for IIT (ISM) Dhanbad faculty
          </p>

          <div className="search-wrap">
            <svg
              className="search-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              className="search-input"
              type="text"
              placeholder="Search professors by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="count-badge">
            Showing <span>{filtered.length}</span> of{" "}
            <span>{professors.length}</span> professors
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="loading-state">
          <div className="loader"></div>
          <div className="loading-text">Loading professors...</div>
        </div>
      ) : error ? (
        <div className="empty-state">
          <h3>Error loading professors</h3>
          <p>{error}</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <h3>
            {professors.length === 0
              ? "No professors loaded"
              : "No results found"}
          </h3>
          <p>
            {professors.length === 0
              ? "Run the scraper first: npm run scrape"
              : `No professor matching "${search}"`}
          </p>
        </div>
      ) : (
        <div className="prof-grid">
          {filtered.map((p) => {
            const avgRating = p.avgRating;
            const ratingCount = p.ratingCount || 0;

            return (
              <Link key={p._id} to={`/prof/${p._id}`} className="prof-card">
                <div className="card-img-wrap">
                  {p.photoUrl ? (
                    <img src={p.photoUrl} alt={p.name} />
                  ) : (
                    <div className="card-placeholder">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                      </svg>
                    </div>
                  )}

                  {/* Rating badge */}
                  <div className="rating-badge">
                    {avgRating != null && avgRating > 0 ? (
                      <>
                        <span className="star">★</span>
                        {avgRating.toFixed(1)}
                        <span
                          style={{
                            fontSize: 12,
                            color: "#9ca3af",
                            fontWeight: 600,
                          }}
                        >
                          /10
                        </span>
                      </>
                    ) : (
                      <span className="no-rating">No ratings</span>
                    )}
                  </div>
                </div>

                <div className="card-body">
                  <div className="card-name">{p.name}</div>
                  {p.department && (
                    <div className="card-dept">{p.department}</div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
