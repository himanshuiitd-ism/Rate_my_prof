import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProf, submitRating } from "../api";
import { socket, joinProf } from "../socket";

const MOODS = ["😭", "😠", "😟", "😕", "😐", "🙂", "😊", "😄", "😁", "🤩"];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  body {
    background: #f5f7fa;
    color: #1a1a2e;
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
  }

  .prof-page {
    min-height: 100vh;
    background: #f5f7fa;
  }

  /* Top nav */
  .top-nav {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px 40px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.2);
  }
  
  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #ffffff;
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    padding: 10px 20px;
    border-radius: 12px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: all 0.3s;
    backdrop-filter: blur(10px);
  }
  
  .back-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateX(-4px);
  }
  
  .back-btn svg {
    width: 18px;
    height: 18px;
  }

  /* Profile hero */
  .profile-hero {
    display: flex;
    gap: 40px;
    align-items: flex-start;
    padding: 60px 40px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    position: relative;
    overflow: hidden;
  }
  
  .profile-hero::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 600px;
    height: 600px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    animation: float 8s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-30px) rotate(10deg); }
  }
  
  .prof-photo-wrap {
    position: relative;
    flex-shrink: 0;
    width: 220px;
    height: 220px;
    border-radius: 28px;
    overflow: hidden;
    background: #ffffff;
    border: 4px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
  
  .prof-photo-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .prof-photo-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .prof-photo-placeholder svg {
    width: 80px;
    height: 80px;
    color: #667eea;
    opacity: 0.4;
  }

  .profile-info {
    flex: 1;
    position: relative;
    z-index: 1;
  }
  
  .profile-name {
    font-size: 44px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -1px;
    line-height: 1.2;
    margin-bottom: 8px;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .profile-dept {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 600;
    margin-bottom: 28px;
  }

  /* Average rating display */
  .avg-rating-row {
    display: flex;
    align-items: center;
    gap: 24px;
    flex-wrap: wrap;
  }
  
  .avg-box {
    background: rgba(255, 255, 255, 0.95);
    border: 3px solid rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    padding: 20px 28px;
    display: flex;
    align-items: center;
    gap: 20px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(10px);
  }
  
  .avg-number-wrap {
    text-align: center;
  }
  
  .avg-number {
    font-size: 48px;
    font-weight: 800;
    color: #667eea;
    line-height: 1;
  }
  
  .avg-label {
    font-size: 11px;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 6px;
    font-weight: 700;
  }
  
  .avg-stars-wrap {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .avg-stars {
    display: flex;
    gap: 4px;
  }
  
  .avg-stars span {
    font-size: 22px;
    transition: transform 0.2s;
  }
  
  .avg-stars span:hover {
    transform: scale(1.2);
  }
  
  .avg-count {
    font-size: 12px;
    color: #6b7280;
    text-align: center;
    font-weight: 600;
  }
  
  .avg-mood {
    font-size: 36px;
  }

  /* Content sections */
  .content-wrap {
    padding: 40px 40px 60px;
    display: flex;
    gap: 40px;
    flex-wrap: wrap;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .col-main {
    flex: 1;
    min-width: 360px;
  }
  
  .col-side {
    width: 420px;
    flex-shrink: 0;
  }
  
  @media(max-width: 1000px) {
    .col-side {
      width: 100%;
    }
  }

  /* Section headers */
  .section-head {
    font-size: 14px;
    font-weight: 700;
    color: #374151;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .section-head .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    box-shadow: 0 0 16px rgba(102, 126, 234, 0.6);
    animation: pulse-dot 2s ease-in-out infinite;
  }
  
  @keyframes pulse-dot {
    0%, 100% {
      box-shadow: 0 0 16px rgba(102, 126, 234, 0.6);
    }
    50% {
      box-shadow: 0 0 24px rgba(102, 126, 234, 1);
    }
  }

  /* Chat */
  .chat-box {
    background: #ffffff;
    border: 2px solid #e5e7eb;
    border-radius: 20px;
    overflow: hidden;
    height: 450px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  }
  
  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  
  .chat-msg {
    background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
    border: 2px solid #e5e7eb;
    border-radius: 14px;
    padding: 14px 18px;
    transition: all 0.3s;
  }
  
  .chat-msg:hover {
    background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
    border-color: #c7d2fe;
    transform: translateX(4px);
  }
  
  .chat-msg-time {
    font-size: 11px;
    color: #9ca3af;
    margin-bottom: 6px;
    font-weight: 600;
  }
  
  .chat-msg-text {
    font-size: 14px;
    color: #374151;
    line-height: 1.6;
    font-weight: 500;
  }
  
  .chat-empty {
    color: #9ca3af;
    font-size: 15px;
    text-align: center;
    padding: 80px 24px;
    font-weight: 600;
  }

  .chat-input-row {
    display: flex;
    gap: 12px;
    padding: 20px;
    border-top: 2px solid #e5e7eb;
    background: #f9fafb;
  }
  
  .chat-input {
    flex: 1;
    background: #ffffff;
    border: 2px solid #e5e7eb;
    border-radius: 14px;
    padding: 14px 18px;
    color: #1a1a2e;
    font-size: 14px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 500;
    outline: none;
    transition: all 0.3s;
  }
  
  .chat-input::placeholder {
    color: #9ca3af;
  }
  
  .chat-input:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  }
  
  .send-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 14px;
    padding: 14px 28px;
    color: #ffffff;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: all 0.3s;
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
  }
  
  .send-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(102, 126, 234, 0.5);
  }
  
  .send-btn:active {
    transform: translateY(0);
  }

  /* Rating panel */
  .rating-panel {
    background: #ffffff;
    border: 2px solid #e5e7eb;
    border-radius: 20px;
    padding: 32px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  }

  /* Star selector */
  .star-selector {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin: 18px 0 10px;
    flex-wrap: wrap;
  }
  
  .star-btn {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    border: 2px solid #e5e7eb;
    background: #f9fafb;
    color: #374151;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  
  .star-btn:hover {
    border-color: #667eea;
    background: #ede9fe;
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
  }
  
  .star-btn.active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-color: #667eea;
    color: #ffffff;
    box-shadow: 0 6px 24px rgba(102, 126, 234, 0.5);
    transform: scale(1.1);
  }
  
  .star-label-row {
    display: flex;
    justify-content: space-between;
    padding: 0 6px;
  }
  
  .star-label {
    font-size: 11px;
    color: #9ca3af;
    font-weight: 700;
  }

  /* Mood display */
  .mood-display {
    text-align: center;
    margin: 20px 0 12px;
    font-size: 56px;
    transition: transform 0.3s;
  }
  
  .mood-label {
    text-align: center;
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 8px;
    font-weight: 600;
  }
  
  .selected-score {
    text-align: center;
    font-size: 14px;
    color: #6b7280;
    margin-top: 8px;
    font-weight: 600;
  }
  
  .selected-score span {
    color: #667eea;
    font-weight: 800;
  }

  /* Submit button */
  .submit-btn {
    width: 100%;
    margin-top: 28px;
    padding: 16px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 14px;
    color: #ffffff;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: all 0.3s;
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
  }
  
  .submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(102, 126, 234, 0.5);
  }
  
  .submit-btn:active {
    transform: translateY(0);
  }
  
  .submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  /* Toast */
  .toast {
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%) translateY(0);
    background: #ffffff;
    border: 2px solid #667eea;
    color: #1a1a2e;
    padding: 16px 32px;
    border-radius: 14px;
    font-size: 15px;
    font-weight: 700;
    z-index: 100;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s;
    opacity: 1;
    box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4);
  }
  
  .toast.hidden {
    transform: translateX(-50%) translateY(100px);
    opacity: 0;
  }

  /* Loading */
  .loading-screen {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
  }
  
  .loader {
    width: 48px;
    height: 48px;
    border: 4px solid #e5e7eb;
    border-top-color: #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
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

export default function ProfPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prof, setProf] = useState(null);
  const [messages, setMessages] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    let mounted = true;

    fetchProf(id)
      .then((data) => {
        if (mounted) {
          setProf(data.prof || data);
          setMessages(data.messages || []);
        }
      })
      .catch(console.error);

    socket.connect();
    joinProf(id);
    socket.on("new_message", ({ profId, message, createdAt }) => {
      if (mounted && profId === id) {
        setMessages((m) => [...m, { message, createdAt }]);
      }
    });

    return () => {
      mounted = false;
      socket.off("new_message");
      socket.disconnect();
    };
  }, [id]);

  const sendMsg = () => {
    if (!comment.trim()) return;
    socket.emit("send_message", { profId: id, message: comment.trim() });
    setComment("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMsg();
    }
  };

  const rateNow = async () => {
    if (!rating) return;
    try {
      await submitRating(id, { categories: { score: rating }, comment: "" });
      setSubmitted(true);
      setToast(true);
      setTimeout(() => setToast(false), 3000);

      // Refresh professor data
      const data = await fetchProf(id);
      setProf(data.prof || data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!prof) {
    return (
      <div className="loading-screen">
        <style>{styles}</style>
        <div className="loader"></div>
        <div className="loading-text">Loading professor...</div>
      </div>
    );
  }

  const avgRating = prof.avgRating;
  const ratingCount = prof.ratingCount || 0;
  const mood = rating ? MOODS[rating - 1] : "🤔";
  const avgMood = avgRating ? MOODS[Math.round(avgRating) - 1] : null;
  const filledStars = avgRating ? Math.round(avgRating / 2) : 0;

  return (
    <div className="prof-page">
      <style>{styles}</style>

      {/* Toast */}
      <div className={`toast ${toast ? "" : "hidden"}`}>
        ✓ Thanks for your rating!
      </div>

      {/* Nav */}
      <div className="top-nav">
        <button className="back-btn" onClick={() => navigate("/")}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Professors
        </button>
      </div>

      {/* Profile hero */}
      <div className="profile-hero">
        <div className="prof-photo-wrap">
          {prof.photoUrl ? (
            <img src={prof.photoUrl} alt={prof.name} />
          ) : (
            <div className="prof-photo-placeholder">
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

        <div className="profile-info">
          <h1 className="profile-name">{prof.name}</h1>
          {prof.department && (
            <div className="profile-dept">{prof.department}</div>
          )}

          <div className="avg-rating-row">
            <div className="avg-box">
              <div className="avg-number-wrap">
                <div className="avg-number">
                  {avgRating != null ? avgRating.toFixed(1) : "—"}
                </div>
                <div className="avg-label">Average Rating</div>
              </div>

              <div className="avg-stars-wrap">
                <div className="avg-stars">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      style={{
                        color: i < filledStars ? "#fbbf24" : "#e5e7eb",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <div className="avg-count">
                  {ratingCount} rating{ratingCount !== 1 ? "s" : ""}
                </div>
              </div>

              {avgMood && <div className="avg-mood">{avgMood}</div>}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="content-wrap">
        {/* Chat column */}
        <div className="col-main">
          <div className="section-head">
            <span className="dot"></span>
            Anonymous Chat
          </div>

          <div className="chat-box">
            <div className="chat-messages">
              {messages.length === 0 ? (
                <div className="chat-empty">
                  No messages yet. Be the first to chat!
                </div>
              ) : (
                messages.map((m, i) => (
                  <div className="chat-msg" key={i}>
                    <div className="chat-msg-time">
                      {new Date(m.createdAt).toLocaleTimeString()}
                    </div>
                    <div className="chat-msg-text">{m.message}</div>
                  </div>
                ))
              )}
            </div>

            <div className="chat-input-row">
              <input
                className="chat-input"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message anonymously... (Enter to send)"
              />
              <button className="send-btn" onClick={sendMsg}>
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Rating column */}
        <div className="col-side">
          <div className="section-head">
            <span className="dot"></span>
            Rate This Professor
          </div>

          <div className="rating-panel">
            <div className="mood-label">
              How do you feel about this professor?
            </div>

            <div
              className="mood-display"
              style={{ transform: rating ? "scale(1.15)" : "scale(1)" }}
            >
              {mood}
            </div>

            <div className="star-selector">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <button
                  key={n}
                  className={`star-btn ${rating === n ? "active" : ""}`}
                  onClick={() => {
                    if (!submitted) setRating(n);
                  }}
                >
                  {n}
                </button>
              ))}
            </div>

            <div className="star-label-row">
              <span className="star-label">😭 Awful</span>
              <span className="star-label">🤩 Amazing</span>
            </div>

            {rating > 0 && (
              <div className="selected-score">
                You selected: <span>{rating}/10</span> — {MOODS[rating - 1]}
              </div>
            )}

            <button
              className="submit-btn"
              onClick={rateNow}
              disabled={!rating || submitted}
            >
              {submitted ? "Rating Submitted ✓" : "Submit Rating"}
            </button>

            {submitted && (
              <div
                style={{
                  textAlign: "center",
                  marginTop: 16,
                  fontSize: 13,
                  color: "#6b7280",
                  fontWeight: 600,
                }}
              >
                You've already rated this professor
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
