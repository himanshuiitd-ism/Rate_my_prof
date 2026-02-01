import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProf, submitRating } from "../api";
import { socket, joinProf } from "../socket";

export default function ProfPage() {
  const { id } = useParams();
  const [prof, setProf] = useState(null);
  const [messages, setMessages] = useState([]);
  const [comment, setComment] = useState("");
  const [categories, setCategories] = useState({ funny: 3, respectful: 3 });

  useEffect(() => {
    fetchProf(id)
      .then((data) => {
        setProf(data.prof);
        setMessages(data.messages || []);
      })
      .catch(console.error);
    socket.connect();
    joinProf(id);
    socket.on("new_message", ({ profId, message, createdAt }) => {
      if (profId === id) setMessages((m) => [...m, { message, createdAt }]);
    });
    socket.on("prof_update", (payload) => {
      // optional: refetch aggregated ratings
    });
    return () => {
      socket.off("new_message");
      socket.disconnect();
    };
  }, [id]);

  const sendMsg = () => {
    if (!comment) return;
    socket.emit("send_message", { profId: id, message: comment });
    setComment("");
  };

  const rateNow = async () => {
    await submitRating(id, { categories, comment: "Rating from UI" });
    alert("Thanks for rating!");
  };

  if (!prof) return <div style={{ padding: 20 }}>Loading...</div>;
  return (
    <div style={{ padding: 20 }}>
      <h1>{prof.name}</h1>
      {prof.photoUrl && (
        <img src={prof.photoUrl} alt={prof.name} style={{ width: 240 }} />
      )}
      <h3>Chat 🔊</h3>
      <div
        style={{
          border: "1px solid #ddd",
          padding: 12,
          height: 300,
          overflow: "auto",
        }}
      >
        {messages.map((m, i) => (
          <div key={i}>
            <small>{new Date(m.createdAt).toLocaleTimeString()}</small>{" "}
            <div>{m.message}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 8 }}>
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Message anonymously..."
        />
        <button onClick={sendMsg}>Send</button>
      </div>

      <h3 style={{ marginTop: 24 }}>Rate 🎯</h3>
      <div>
        <label>
          Funny:{" "}
          <input
            type="range"
            min="1"
            max="5"
            value={categories.funny}
            onChange={(e) =>
              setCategories((c) => ({ ...c, funny: +e.target.value }))
            }
          />
        </label>
        <label>
          Respectful:{" "}
          <input
            type="range"
            min="1"
            max="5"
            value={categories.respectful}
            onChange={(e) =>
              setCategories((c) => ({ ...c, respectful: +e.target.value }))
            }
          />
        </label>
      </div>
      <div style={{ marginTop: 8 }}>
        <button onClick={rateNow}>Submit Rating</button>
      </div>
    </div>
  );
}
