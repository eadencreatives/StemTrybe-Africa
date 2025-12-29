import React from "react";

export default function Blog() {
  return (
    <div style={{ padding: "4rem 5%", maxWidth: 1100, margin: "0 auto" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Blog</h1>
      <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
        Welcome to the STEMTRIBE Africa blog — here you'll find updates,
        learning tips, and stories highlighting our community and impact.
      </p>

      <div style={{ display: "grid", gap: "1.5rem" }}>
        <article style={{ background: "#fff", padding: "1.5rem", borderRadius: 10, boxShadow: "0 6px 18px rgba(0,0,0,0.06)" }}>
          <h2 style={{ margin: 0 }}>Launching New Course Builder</h2>
          <p style={{ color: "#6b7280" }}>A short intro to our new drag-and-drop course builder.</p>
        </article>

        <article style={{ background: "#fff", padding: "1.5rem", borderRadius: 10, boxShadow: "0 6px 18px rgba(0,0,0,0.06)" }}>
          <h2 style={{ margin: 0 }}>How to Improve Learner Engagement</h2>
          <p style={{ color: "#6b7280" }}>Practical tips for designing engaging learning experiences.</p>
        </article>
      </div>
    </div>
  );
}
