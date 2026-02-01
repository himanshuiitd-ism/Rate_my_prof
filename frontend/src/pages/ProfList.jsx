import React, { useEffect, useState } from "react";
import { fetchProfs } from "../api";
import { Link } from "react-router-dom";

export default function ProfList() {
  const [profs, setProfs] = useState([]);
  useEffect(() => {
    fetchProfs().then(setProfs).catch(console.error);
  }, []);
  return (
    <div style={{ padding: 20 }}>
      <h1>Professors</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 12,
        }}
      >
        {profs.map((p) => (
          <Link
            key={p._id}
            to={`/prof/${p._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{ border: "1px solid #ddd", padding: 12, borderRadius: 6 }}
            >
              {p.photoUrl ? (
                <img
                  src={p.photoUrl}
                  alt={p.name}
                  style={{ width: "100%", height: 160, objectFit: "cover" }}
                />
              ) : (
                <div style={{ height: 160, background: "#eee" }} />
              )}
              <h3>{p.name}</h3>
              <small>{p.department}</small>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
