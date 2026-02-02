import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MOODS = ["😭", "😠", "😟", "😕", "😐", "🙂", "😊", "😄", "😁", "🤩"];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  .leaderboard-container {
    padding: 30px 20px 40px;
    max-width: 1400px;
    margin: 0 auto;
  }

  @media (min-width: 768px) {
    .leaderboard-container {
      padding: 40px 40px 60px;
    }
  }

  .leaderboard-header {
    text-align: center;
    margin-bottom: 40px;
  }

  .leaderboard-title {
    font-size: 32px;
    font-weight: 800;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 12px;
    letter-spacing: -1px;
  }

  @media (min-width: 768px) {
    .leaderboard-title {
      font-size: 48px;
    }
  }

  .leaderboard-subtitle {
    font-size: 14px;
    color: #6b7280;
    font-weight: 600;
  }

  @media (min-width: 768px) {
    .leaderboard-subtitle {
      font-size: 16px;
    }
  }

  .leaderboard-tabs {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 32px;
  }

  .tab-btn {
    background: #ffffff;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    padding: 12px 24px;
    font-size: 14px;
    font-weight: 700;
    color: #374151;
    cursor: pointer;
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: all 0.3s;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  @media (min-width: 768px) {
    .tab-btn {
      padding: 14px 32px;
      font-size: 15px;
    }
  }

  .tab-btn:hover {
    border-color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.2);
  }

  .tab-btn.active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-color: #667eea;
    color: #ffffff;
    box-shadow: 0 6px 24px rgba(102, 126, 234, 0.4);
  }

  .leaderboard-list {
    background: #ffffff;
    border: 2px solid #e5e7eb;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  }

  @media (min-width: 768px) {
    .leaderboard-list {
      border-radius: 24px;
    }
  }

  .leaderboard-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 20px;
    border-bottom: 2px solid #f3f4f6;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    background: #ffffff;
  }

  @media (min-width: 768px) {
    .leaderboard-item {
      gap: 24px;
      padding: 20px 32px;
    }
  }

  .leaderboard-item:last-child {
    border-bottom: none;
  }

  .leaderboard-item:hover {
    background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
    transform: translateX(8px);
  }

  .leaderboard-item.moving-up {
    animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .leaderboard-item.moving-down {
    animation: slideDown 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .leaderboard-item.new-entry {
    animation: fadeInSlide 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes slideUp {
    0% {
      transform: translateY(50px);
      opacity: 0.5;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideDown {
    0% {
      transform: translateY(-50px);
      opacity: 0.5;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes fadeInSlide {
    0% {
      transform: translateX(-50px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .rank-badge {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 800;
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  @media (min-width: 768px) {
    .rank-badge {
      width: 48px;
      height: 48px;
      font-size: 18px;
    }
  }

  .rank-badge.rank-1 {
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    box-shadow: 0 4px 20px rgba(251, 191, 36, 0.5);
  }

  .rank-badge.rank-2 {
    background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
    box-shadow: 0 4px 20px rgba(148, 163, 184, 0.5);
  }

  .rank-badge.rank-3 {
    background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
    box-shadow: 0 4px 20px rgba(217, 119, 6, 0.5);
  }

  .rank-badge.rank-other {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  .prof-avatar {
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    border-radius: 12px;
    overflow: hidden;
    background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
    border: 2px solid #e5e7eb;
  }

  @media (min-width: 768px) {
    .prof-avatar {
      width: 60px;
      height: 60px;
    }
  }

  .prof-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .prof-avatar-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .prof-avatar-placeholder svg {
    width: 24px;
    height: 24px;
    color: #667eea;
    opacity: 0.4;
  }

  @media (min-width: 768px) {
    .prof-avatar-placeholder svg {
      width: 28px;
      height: 28px;
    }
  }

  .prof-info {
    flex: 1;
    min-width: 0;
  }

  .prof-name {
    font-size: 15px;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (min-width: 768px) {
    .prof-name {
      font-size: 17px;
    }
  }

  .prof-dept {
    font-size: 12px;
    color: #6b7280;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (min-width: 768px) {
    .prof-dept {
      font-size: 13px;
    }
  }

  .stat-display {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
  }

  .stat-value {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 18px;
    font-weight: 800;
    color: #667eea;
  }

  @media (min-width: 768px) {
    .stat-value {
      font-size: 22px;
    }
  }

  .stat-value .mood {
    font-size: 20px;
  }

  @media (min-width: 768px) {
    .stat-value .mood {
      font-size: 24px;
    }
  }

  .stat-label {
    font-size: 10px;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 700;
  }

  @media (min-width: 768px) {
    .stat-label {
      font-size: 11px;
    }
  }

  .empty-state {
    text-align: center;
    padding: 60px 20px;
    color: #6b7280;
  }

  @media (min-width: 768px) {
    .empty-state {
      padding: 80px 40px;
    }
  }

  .empty-state h3 {
    font-size: 18px;
    color: #374151;
    margin-bottom: 8px;
    font-weight: 700;
  }

  @media (min-width: 768px) {
    .empty-state h3 {
      font-size: 20px;
    }
  }

  .empty-state p {
    font-size: 13px;
    color: #6b7280;
  }

  @media (min-width: 768px) {
    .empty-state p {
      font-size: 14px;
    }
  }

  .movement-indicator {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
    animation: bounce 1s ease-in-out infinite;
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(-50%);
    }
    50% {
      transform: translateY(-60%);
    }
  }
`;

export default function Leaderboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("avgRating");
  const [animatingItems, setAnimatingItems] = useState({});

  const leaderboard = useSelector((state) => state.leaderboard);
  const professors = useSelector((state) => state.professors.list);

  const getCurrentList = () => {
    switch (activeTab) {
      case "avgRating":
        return leaderboard.byAvgRating;
      case "totalRatings":
        return leaderboard.byTotalRatings;
      case "comments":
        return leaderboard.byComments;
      default:
        return [];
    }
  };

  const getPreviousList = () => {
    switch (activeTab) {
      case "avgRating":
        return leaderboard.previousByAvgRating;
      case "totalRatings":
        return leaderboard.previousByTotalRatings;
      case "comments":
        return leaderboard.previousByComments;
      default:
        return [];
    }
  };

  // Detect position changes
  useEffect(() => {
    const currentList = getCurrentList();
    const previousList = getPreviousList();

    if (currentList.length === 0 || previousList.length === 0) return;

    const newAnimations = {};

    currentList.forEach((prof, currentIndex) => {
      const previousIndex = previousList.findIndex((p) => p._id === prof._id);

      if (previousIndex === -1) {
        // New entry
        newAnimations[prof._id] = "new-entry";
      } else if (previousIndex > currentIndex) {
        // Moved up
        newAnimations[prof._id] = "moving-up";
      } else if (previousIndex < currentIndex) {
        // Moved down
        newAnimations[prof._id] = "moving-down";
      }
    });

    setAnimatingItems(newAnimations);

    // Clear animations after they complete
    const timer = setTimeout(() => {
      setAnimatingItems({});
    }, 600);

    return () => clearTimeout(timer);
  }, [leaderboard, activeTab]);

  const handleProfClick = (profId) => {
    navigate(`/prof/${profId}`);
  };

  const renderStat = (prof) => {
    switch (activeTab) {
      case "avgRating":
        const mood = prof.avgRating
          ? MOODS[Math.round(prof.avgRating) - 1]
          : null;
        return (
          <div className="stat-display">
            <div className="stat-value">
              {prof.avgRating?.toFixed(1) || "—"}
              {mood && <span className="mood">{mood}</span>}
            </div>
            <div className="stat-label">Avg Rating</div>
          </div>
        );
      case "totalRatings":
        return (
          <div className="stat-display">
            <div className="stat-value">{prof.ratingCount || 0}</div>
            <div className="stat-label">Total Ratings</div>
          </div>
        );
      case "comments":
        return (
          <div className="stat-display">
            <div className="stat-value">{prof.commentCount || 0}</div>
            <div className="stat-label">Comments</div>
          </div>
        );
      default:
        return null;
    }
  };

  const currentList = getCurrentList();

  return (
    <div className="leaderboard-container">
      <style>{styles}</style>

      <div className="leaderboard-header">
        <h2 className="leaderboard-title">🏆 Leaderboard</h2>
        <p className="leaderboard-subtitle">
          Top professors ranked by ratings and engagement
        </p>
      </div>

      <div className="leaderboard-tabs">
        <button
          className={`tab-btn ${activeTab === "avgRating" ? "active" : ""}`}
          onClick={() => setActiveTab("avgRating")}
        >
          ⭐ Highest Rated
        </button>
        <button
          className={`tab-btn ${activeTab === "totalRatings" ? "active" : ""}`}
          onClick={() => setActiveTab("totalRatings")}
        >
          📊 Most Ratings
        </button>
        <button
          className={`tab-btn ${activeTab === "comments" ? "active" : ""}`}
          onClick={() => setActiveTab("comments")}
        >
          💬 Most Discussed
        </button>
      </div>

      <div className="leaderboard-list">
        {currentList.length === 0 ? (
          <div className="empty-state">
            <h3>No data yet</h3>
            <p>Be the first to rate professors!</p>
          </div>
        ) : (
          currentList.map((prof, index) => {
            const rankClass =
              index === 0
                ? "rank-1"
                : index === 1
                  ? "rank-2"
                  : index === 2
                    ? "rank-3"
                    : "rank-other";

            const animationClass = animatingItems[prof._id] || "";

            return (
              <div
                key={prof._id}
                className={`leaderboard-item ${animationClass}`}
                onClick={() => handleProfClick(prof._id)}
              >
                <div className={`rank-badge ${rankClass}`}>
                  {index === 0
                    ? "🥇"
                    : index === 1
                      ? "🥈"
                      : index === 2
                        ? "🥉"
                        : index + 1}
                </div>

                <div className="prof-avatar">
                  {prof.photoUrl ? (
                    <img src={prof.photoUrl} alt={prof.name} />
                  ) : (
                    <div className="prof-avatar-placeholder">
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
                </div>

                <div className="prof-info">
                  <div className="prof-name">{prof.name}</div>
                  {prof.department && (
                    <div className="prof-dept">{prof.department}</div>
                  )}
                </div>

                {renderStat(prof)}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
