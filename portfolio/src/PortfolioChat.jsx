// PortfolioChat.jsx
import { useState, useRef, useEffect } from "react";

const KB = [
  {
    keys: ["skill","tech","stack","know","language","react","spring","kotlin","figma","mysql","tailwind","javascript","css","html","android","supabase","firebase"],
    reply: "Trisha's core stack includes React, JavaScript, HTML/CSS, and Tailwind CSS on the frontend. For backend she uses Spring Boot, REST APIs, and MySQL. On mobile she builds with Kotlin and Android Studio. She also designs in Figma and has used Supabase and Firebase.",
  },
  {
    keys: ["project","work","built","portfolio","attendme","pomodoro","app"],
    reply: "She has two featured projects: AttendMe — a full-stack attendance management system built with React, Spring Boot, MySQL, and a Kotlin Android app. And Cozy Pomodoro — a lofi productivity timer built with React and Tailwind. Both are live on GitHub!",
  },
  {
    keys: ["available","hire","open","internship","freelance","opportunity","looking","job"],
    reply: "Yes! Trisha is actively open to internships and freelance — immediately, part-time or full-time. She's based in the Philippines and open to remote opportunities.",
  },
  {
    keys: ["education","study","school","university","degree","cit","cebu","it","information technology"],
    reply: "She's a 4th-year BS Information Technology student at Cebu Institute of Technology University (2024–2027). She completed Senior High at Colegio de la Inmaculada Concepcion – Cebu.",
  },
  {
    keys: ["contact","email","reach","linkedin","github","message","connect"],
    reply: "You can reach Trisha at cararagtrisharaye@gmail.com, connect on LinkedIn at linkedin.com/in/trisha-raye-cararag, or see her code at github.com/trxshx14. She replies within 24 hours!",
  },
  {
    keys: ["experience","role","developer","designer","worked"],
    reply: "Trisha worked as Full-Stack Developer on AttendMe, architecting REST APIs with Spring Boot and MySQL for a role-based attendance system. She's T-shaped — equally fluent in Figma design and production engineering.",
  },
  {
    keys: ["service","offer","ux","ui","design","frontend","fullstack","full-stack","full stack"],
    reply: "She offers three services: UI/UX Design (wireframes, Figma prototypes), Frontend Development (React, responsive layouts), and Full-Stack Development (Spring Boot APIs, MySQL, role-based access).",
  },
  {
    keys: ["certificate","certification","google","kaggle","asean","java"],
    reply: "Certifications: AI Ready ASEAN (Google.org, 2025), Data Visualization (Kaggle, 2025), Java OOP (CodeChum · CITU, 2025), and ICT Congress (PSITE Cebu, 2026).",
  },
  {
    keys: ["location","where","based","remote","philippines"],
    reply: "Trisha is based in Cebu, Philippines and is fully open to remote work worldwide.",
  },
  {
    keys: ["resume","cv","download"],
    reply: "You can download her resume directly from the portfolio — there's a Resume button in the top navigation bar.",
  },
  {
    keys: ["hello","hi","hey","howdy","greet","good morning","good afternoon"],
    reply: "Hi there! I'm Trisha's assistant. Ask me about her skills, projects, availability, or experience!",
  },
  {
    keys: ["who","trisha","about","herself","tell me"],
    reply: "Trisha Raye Cararag is a 4th-year IT student in the Philippines who builds full-stack web and mobile apps. She designs in Figma AND ships production code with Spring Boot and React. Currently looking for internships and freelance work.",
  },
];

const FALLBACK = "I'm not sure about that one! You can reach Trisha directly at cararagtrisharaye@gmail.com for anything specific.";

const QUICK_CHIPS = [
  { label: "Skills", msg: "What are her skills?" },
  { label: "Projects", msg: "Tell me about her projects" },
  { label: "Available?", msg: "Is she available for hire?" },
  { label: "Education", msg: "What is her education?" },
  { label: "Contact", msg: "How can I contact her?" },
];

function getReply(text) {
  const lower = text.toLowerCase();
  for (const entry of KB) {
    if (entry.keys.some((k) => lower.includes(k))) return entry.reply;
  }
  return FALLBACK;
}

export default function PortfolioChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi! I'm Trisha's assistant. Ask me about her skills, projects, availability, or anything before reaching out." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text) => {
    const val = text || input.trim();
    if (!val) return;
    setInput("");
    setMessages((prev) => [...prev, { type: "user", text: val }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { type: "bot", text: getReply(val) }]);
    }, 700 + Math.random() * 400);
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 200,
          width: 54, height: 54, borderRadius: "50%",
          background: "linear-gradient(135deg, #E2A4C4, #9A6B8A)",
          border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 24px rgba(226,164,196,0.4)",
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        aria-label="Open chat"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div style={{
          position: "fixed", bottom: 92, right: 28, zIndex: 200,
          width: 360, borderRadius: 20, overflow: "hidden",
          background: "#0F0C1B",
          border: "1px solid rgba(226,164,196,0.18)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          fontFamily: "'Inter', system-ui, sans-serif",
          animation: "fadeUp 0.25s ease",
        }}>

          {/* Header */}
          <div style={{ background: "#17122A", padding: "14px 18px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid rgba(226,164,196,0.1)" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #E2A4C4, #9A6B8A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "white", flexShrink: 0 }}>T</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#EDE8F5" }}>Trisha's Assistant</div>
              <div style={{ fontSize: 11, color: "#5DCAA5", display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#5DCAA5", display: "inline-block" }} />
                Online · Ask me anything
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ height: 300, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-end", flexDirection: m.type === "user" ? "row-reverse" : "row" }}>
                {m.type === "bot" && (
                  <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg, #E2A4C4, #9A6B8A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "white", flexShrink: 0 }}>T</div>
                )}
                <div style={{
                  maxWidth: "78%", padding: "9px 13px", borderRadius: 14, fontSize: 12.5, lineHeight: 1.55,
                  background: m.type === "bot" ? "#1E1833" : "linear-gradient(135deg, #E2A4C4, #9A6B8A)",
                  border: m.type === "bot" ? "1px solid rgba(226,164,196,0.12)" : "none",
                  color: m.type === "bot" ? "#C8B8D8" : "white",
                  borderBottomLeftRadius: m.type === "bot" ? 4 : 14,
                  borderBottomRightRadius: m.type === "user" ? 4 : 14,
                }}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg, #E2A4C4, #9A6B8A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "white", flexShrink: 0 }}>T</div>
                <div style={{ background: "#1E1833", border: "1px solid rgba(226,164,196,0.12)", borderRadius: 14, borderBottomLeftRadius: 4, padding: "10px 14px", display: "flex", gap: 4 }}>
                  {[0, 0.2, 0.4].map((d, i) => (
                    <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#9A6B8A", display: "inline-block", animation: `bounce 1.2s ease-in-out ${d}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick chips */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", padding: "0 14px 10px" }}>
            {QUICK_CHIPS.map((c) => (
              <button key={c.label} onClick={() => send(c.msg)} style={{
                background: "rgba(226,164,196,0.08)", border: "1px solid rgba(226,164,196,0.2)",
                color: "#E2A4C4", borderRadius: 100, padding: "5px 12px", fontSize: 11.5,
                fontWeight: 500, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(226,164,196,0.18)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(226,164,196,0.08)"; }}
              >{c.label}</button>
            ))}
          </div>

          {/* Input */}
          <div style={{ display: "flex", gap: 8, padding: "12px 14px", borderTop: "1px solid rgba(226,164,196,0.08)", background: "#17122A", alignItems: "center" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask me about Trisha..."
              style={{
                flex: 1, background: "#0F0C1B", border: "1px solid rgba(226,164,196,0.2)",
                borderRadius: 100, padding: "8px 14px", fontSize: 12.5,
                color: "#EDE8F5", fontFamily: "inherit", outline: "none",
              }}
            />
            <button onClick={() => send()} style={{
              width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
              background: "linear-gradient(135deg, #E2A4C4, #9A6B8A)",
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}