import { useState, useEffect, useRef } from "react";


const NAV_LINKS = ["Home", "About", "Works", "Experience", "Tech Stack", "Contact"];

const TECH_NODES = [
  { label: "React", x: 72, y: 18, size: 38, color: "#61DAFB", glow: "#61DAFB40" },
  { label: "Figma", x: 20, y: 42, size: 34, color: "#E2A4C4", glow: "#E2A4C440" },
  { label: "Spring", x: 68, y: 62, size: 30, color: "#9A6B8A", glow: "#9A6B8A50" },
  { label: "Next.js", x: 38, y: 75, size: 28, color: "#C8B8D8", glow: "#C8B8D840" },
  { label: "TS", x: 15, y: 20, size: 26, color: "#3178C6", glow: "#3178C640" },
  { label: "Kotlin", x: 82, y: 40, size: 24, color: "#54C5F8", glow: "#54C5F840" },
];

const WORKS = [
  {
    title: "AttendMe",
    type: "Full-Stack App",
    icon: (color) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
    role: "Full-Stack Developer",
    problem: "Manual attendance tracking is error-prone and time-consuming for instructors.",
    desc: "Attendance management system with REST API architecture and role-based access control for school admins and teachers.",
    tags: ["React", "Spring Boot", "MySQL", "Android"],
    accent: "#E2A4C4",
    github: "https://github.com/trxshx14/IT342-Cararag-AttendMe.git",
    demo: "https://attendme-frontend.onrender.com/login",
    apk: "/AttendMe.apk",
  },
  {
    title: "Cozy Pomodoro",
    type: "Full-Stack App",
    icon: (color) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="13" r="8"/>
    <path d="M12 9v4l2.5 2.5"/>
    <path d="M9 3h6"/>
    <path d="M12 3v2"/>
  </svg>
),
    role: "Frontend Developer",
    problem: "Many students and professionals struggle with distractions, poor time management, and burnout during study or work sessions.",
    desc: "Cozy productivity-focused Pomodoro timer built with React, Tailwind CSS, and Lucide React icons, featuring a soft pastel lofi-inspired interface for focused work and mindful breaks.",
    tags: ["React", "Tailwind CSS",],
    accent: "#E2A4C4",
    github: "https://github.com/trxshx14/CozyPomodoro.git",
    demo: "https://cozypomodoro-by-trishadev.vercel.app/",
  },
];

const STACK = [
  {
    cat: "Frontend",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E2A4C4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    ),
    items: [
      { name: "React", level: "Shipped" },
      { name: "HTML + CSS", level: "Shipped" },
      { name: "JavaScript", level: "Shipped" },
      { name: "Tailwind CSS", level: "Shipped" },
    ],
  },
  {
    cat: "Backend",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E2A4C4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
    ),
    items: [
      { name: "Spring Boot", level: "Shipped" },
      { name: "Supabase", level: "Shipped" },
      { name: "REST API", level: "Shipped" },
      { name: "MySQL", level: "Shipped" },
    ],
  },
  {
    cat: "Mobile",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E2A4C4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    items: [
      { name: "Kotlin", level: "Shipped" },
      { name: "Android Studio", level: "Shipped" },
      { name: "Firebase", level: "Shipped" },
    ],
  },
  {
    cat: "Design",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E2A4C4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    items: [
      { name: "Figma", level: "Shipped" },
      { name: "Prototyping", level: "Shipped" },
      { name: "Design Systems", level: "Shipped" },
    ],
  },
];

const EXPERIENCE = [
  {
    year: "2026 - Present",
    role: "Full-Stack Developer",
    org: "AttendMe · Academic Project",
    desc: "Architected REST APIs with Spring Boot and MySQL for a role-based attendance management system.",
    type: "project",
  },
  {
    year: "2024 - 2027",
    role: "BS Information Technology",
    org: "Cebu Institute of Technology University · Cebu, Philippines · 4th Year",
    desc: "Studying full-stack development, UI/UX design, and software engineering principles.",
    type: "edu",
  },
  {
    year: "2021 – 2023",
    role: "Senior High School Graduate",
    org: "Colegio de la Inmaculada Concepcion – Cebu",
    desc: "Completed Senior High School at CIC Cebu.",
    type: "edu",
  },
  {
    year: "2014 – 2020",
    role: "High School Graduate",
    org: "Colegio de la Inmaculada Concepcion – Cebu",
    desc: "Completed Junior High School at CIC Cebu.",
    type: "edu",
  },
];

function FloatingNode({ node, index }) {
  const style = {
    position: "absolute",
    left: `${node.x}%`,
    top: `${node.y}%`,
    width: node.size,
    height: node.size,
    borderRadius: "50%",
    background: `radial-gradient(circle at 35% 35%, ${node.color}33, ${node.color}11)`,
    border: `1px solid ${node.color}55`,
    boxShadow: `0 0 ${node.size * 0.6}px ${node.glow}, inset 0 0 ${node.size * 0.3}px ${node.color}22`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: node.size < 30 ? 8 : 9,
    fontWeight: 600,
    color: node.color,
    letterSpacing: "0.04em",
    animation: `floatNode${index % 3} ${3.5 + index * 0.4}s ease-in-out infinite`,
    cursor: "default",
    transition: "transform 0.3s ease",
    zIndex: 2,
  };
  return <div style={style}>{node.label}</div>;
}

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const heroRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map(link => link.toLowerCase());
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px",
      threshold: 0,
    };
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const matchingLink = NAV_LINKS.find(
            (link) => link.toLowerCase() === entry.target.id
          );
          if (matchingLink) setActiveNav(matchingLink);
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
  };

  return (
    <div style={{ fontFamily: "'Inter', 'Plus Jakarta Sans', system-ui, sans-serif", background: "#0F0C1B", color: "#EDE8F5", minHeight: "100vh", overflowX: "hidden", width: "100%" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html, body, #root {
          width: 100%;
          margin: 0;
          padding: 0;
          background: #0F0C1B;
        }

        :root {
          --plum: #0F0C1B;
          --plum2: #17122A;
          --plum3: #1E1833;
          --pink: #E2A4C4;
          --mauve: #9A6B8A;
          --lavender: #C8B8D8;
          --text: #EDE8F5;
          --muted: #8B7FA0;
        }

        @keyframes floatNode0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes floatNode1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(-2deg); }
        }
        @keyframes floatNode2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(4deg); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes statusPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
        @keyframes cursorGlow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.18; }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.28; }
        }

        .nav-link {
          color: var(--muted);
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 500;
          letter-spacing: 0.02em;
          padding: 6px 2px;
          transition: color 0.2s;
          cursor: pointer;
          position: relative;
        }
        .nav-link:hover, .nav-link.active { color: var(--text); }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1.5px;
          background: linear-gradient(90deg, var(--pink), var(--mauve));
          border-radius: 2px;
        }

        .pill-btn {
          background: linear-gradient(135deg, var(--pink), var(--mauve));
          color: white;
          border: none;
          padding: 10px 22px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s;
          box-shadow: 0 0 20px #E2A4C440;
          letter-spacing: 0.02em;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .pill-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 28px #E2A4C460; }

        .pill-outline {
          background: transparent;
          color: var(--text);
          border: 1.5px solid #3D2F55;
          padding: 10px 22px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.25s;
          letter-spacing: 0.02em;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .pill-outline:hover { border-color: var(--pink); color: var(--pink); }

        .tag-pill {
          background: #1E1833;
          border: 1px solid #3D2F55;
          color: var(--lavender);
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 500;
          display: inline-block;
          transition: all 0.2s;
        }
        .tag-pill:hover { border-color: var(--pink); color: var(--pink); background: #271C3C; }

        .glass-card {
          background: linear-gradient(135deg, rgba(30,24,51,0.7), rgba(23,18,42,0.5));
          border: 1px solid rgba(226,164,196,0.12);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 20px;
          transition: all 0.3s;
        }
        .glass-card:hover {
          border-color: rgba(226,164,196,0.28);
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(154,107,138,0.2);
        }

        .gradient-text {
          background: linear-gradient(135deg, #E2A4C4 0%, #C8A0D8 40%, #9A6B8A 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .section-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--pink);
          margin-bottom: 12px;
          display: block;
        }

        .work-card { animation: fadeUp 0.6s ease both; }
        .work-card:nth-child(2) { animation-delay: 0.1s; }
        .work-card:nth-child(3) { animation-delay: 0.2s; }

        .stack-item {
          padding: 9px 14px;
          background: rgba(30,24,51,0.6);
          border: 1px solid #2D2245;
          border-radius: 8px;
          font-size: 12.5px;
          color: var(--lavender);
          font-weight: 500;
          transition: all 0.2s;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .stack-item:hover { border-color: var(--mauve); color: var(--text); background: rgba(154,107,138,0.12); }

        .stack-badge-shipped {
          font-size: 9px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
          color: #5DCAA5; background: rgba(93,202,165,0.1); border: 1px solid rgba(93,202,165,0.25);
          padding: 2px 7px; border-radius: 100px;
        }
        .stack-badge-learning {
          font-size: 9px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
          color: #FAC775; background: rgba(250,199,117,0.1); border: 1px solid rgba(250,199,117,0.25);
          padding: 2px 7px; border-radius: 100px;
        }

        .cursor-aura {
          position: fixed; width: 280px; height: 280px; border-radius: 50%;
          background: radial-gradient(circle, #E2A4C418 0%, transparent 70%);
          pointer-events: none; z-index: 0;
          animation: cursorGlow 3s ease-in-out infinite;
          transition: left 0.12s ease-out, top 0.12s ease-out;
        }

        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(226,164,196,0.08); border: 1px solid rgba(226,164,196,0.2);
          border-radius: 100px; padding: 6px 14px; font-size: 12px; font-weight: 500;
          color: var(--pink); margin-bottom: 28px; animation: slideIn 0.6s ease both;
        }

        .stat-block { display: flex; flex-direction: column; gap: 2px; }
        .stat-num {
          font-size: 28px; font-weight: 700;
          background: linear-gradient(135deg, var(--pink), var(--mauve));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; line-height: 1;
        }
        .stat-label { font-size: 11px; color: var(--muted); font-weight: 400; }

        .orbit-ring {
          position: absolute; border-radius: 50%;
          border: 1px dashed rgba(226,164,196,0.1);
          top: 50%; left: 50%; transform: translate(-50%, -50%);
        }

        .contact-card-link {
          text-decoration: none; display: block;
        }
        .contact-channel {
          padding: 22px 28px;
          display: flex; align-items: center; gap: 20;
          text-align: left; cursor: pointer;
        }

        .timeline-dot {
          width: 10px; height: 10px; border-radius: 50%;
          flex-shrink: 0; margin-top: 5px;
        }

        .social-link {
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(226,164,196,0.06); border: 1px solid rgba(226,164,196,0.15);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 13px; color: var(--muted);
          text-decoration: none; transition: all 0.2s;
        }
        .social-link:hover { border-color: var(--pink); color: var(--pink); background: rgba(226,164,196,0.1); }

        .availability-badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(93,202,165,0.08); border: 1px solid rgba(93,202,165,0.25);
          border-radius: 100px; padding: 6px 14px; font-size: 12px; font-weight: 500;
          color: #5DCAA5; margin-bottom: 16px; animation: slideIn 0.5s ease both;
        }

        .card-link-btn {
          background: none; border: none; font-size: 12px; cursor: pointer;
          display: inline-flex; align-items: center; gap: 4px;
          padding: 0; transition: color 0.2s; text-decoration: none; font-family: inherit;
        }

        .about-card {
          background: linear-gradient(135deg, rgba(226,164,196,0.06), rgba(154,107,138,0.04));
          border: 1px solid rgba(226,164,196,0.12); border-radius: 16px; padding: 24px;
        }
        .about-card-label {
          font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; color: #9A7BB0; margin-bottom: 3px;
        }
        .about-card-value { font-size: 13.5px; font-weight: 500; color: #EDE8F5; }

        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .nav-links-mid { display: none !important; }
          .works-grid { grid-template-columns: 1fr !important; }
          .stack-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Cursor aura */}
      <div className="cursor-aura" style={{ left: cursorPos.x, top: cursorPos.y }} />

      {/* Background */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(226,164,196,0.04) 1px, transparent 0)", backgroundSize: "40px 40px", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", top: 0, left: "30%", width: 600, height: 600, background: "radial-gradient(ellipse, rgba(154,107,138,0.12) 0%, transparent 65%)", pointerEvents: "none", zIndex: 0 }} />

      {/* ─── NAV ─── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 60px", height: 64,
        background: scrolled ? "rgba(15,12,27,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(226,164,196,0.08)" : "none",
        transition: "all 0.3s",
      }}>
        <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "0.02em" }}>
          <span style={{ color: "#E2A4C4" }}>&lt;</span>
          <span style={{ color: "#EDE8F5" }}>trisha</span>
          <span style={{ color: "#9A6B8A" }}>.dev</span>
          <span style={{ color: "#E2A4C4" }}> /&gt;</span>
        </div>

        <div className="nav-links-mid" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV_LINKS.map(l => (
            <span key={l} className={`nav-link${activeNav === l ? " active" : ""}`} onClick={() => scrollToSection(l)}>{l}</span>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
  <a href="/Cararag_Resume_IT.pdf" target="_blank" rel="noreferrer" download className="pill-outline" style={{ padding: "8px 18px", fontSize: 13, height: 38, lineHeight: "1" }}>↓ Resume</a>
<button className="pill-btn" onClick={() => scrollToSection("Contact")} style={{ padding: "8px 18px", fontSize: 13, height: 38, lineHeight: "1" }}>Let's Work</button>
</div>
      </nav>

      {/* ─── HERO ─── */}
      <section id="home" ref={heroRef} style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "100px 60px 60px", position: "relative", zIndex: 1 }}>
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", width: "100%", maxWidth: 1200, margin: "0 auto" }}>

          <div style={{ animation: "fadeUp 0.7s ease both" }}>
            <div className="availability-badge">
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#5DCAA5", display: "inline-block", animation: "statusPulse 2s ease-in-out infinite" }} />
              Open to internships & freelance · 2026
            </div>

            <div className="hero-eyebrow">
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#E2A4C4", display: "inline-block", boxShadow: "0 0 8px #E2A4C4" }} />
              IT Student · UX/UI Designer · Builder
            </div>

            <h1 style={{ fontSize: 58, fontWeight: 800, lineHeight: 1.05, marginBottom: 18, letterSpacing: "-0.02em", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <span style={{ color: "#EDE8F5" }}>Hi, I am </span>
              <span className="gradient-text">Trisha</span>
            </h1>

            <p style={{ fontSize: 17, fontWeight: 500, color: "#C8B8D8", lineHeight: 1.65, marginBottom: 10, maxWidth: 440 }}>
              Frontend Developer & UX/UI Designer
            </p>
            <p style={{ fontSize: 13.5, color: "#9A8DB0", lineHeight: 1.75, marginBottom: 32, maxWidth: 420 }}>
              Building beautiful, scalable, and high-quality digital products — faster with AI, smarter with experience. Based in the Philippines.
            </p>

            <div style={{ display: "flex", gap: 10, marginBottom: 32, flexWrap: "wrap" }}>
              {["Web", "Mobile", "UI/UX"].map(t => (
                <span key={t} className="tag-pill">{t}</span>
              ))}
            </div>

            <div style={{ display: "flex", gap: 14, marginBottom: 48, flexWrap: "wrap" }}>
              <button className="pill-btn" style={{ padding: "12px 28px", fontSize: 14 }} onClick={() => scrollToSection("Works")}>View My Work ↓</button>
              <a href="mailto:cararagtrisharaye@gmail.com" className="pill-outline" style={{ padding: "12px 28px", fontSize: 14 }}>Let's Create Something</a>
            </div>

            <div style={{ display: "flex", gap: 40 }}>
              {[["3+", "Projects Shipped"], ["2", "Years Designing"], ["∞", "Iterations"]].map(([n, l]) => (
                <div key={l} className="stat-block">
                  <span className="stat-num">{n}</span>
                  <span className="stat-label">{l}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: "relative", height: 460, animation: "fadeUp 0.9s ease 0.15s both" }}>
            <div className="orbit-ring" style={{ width: 280, height: 280 }} />
            <div className="orbit-ring" style={{ width: 380, height: 380 }} />

            <div className="glass-card" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 200, height: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, zIndex: 3 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #E2A4C4, #9A6B8A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, color: "white", marginBottom: 4 }}>TR</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#9A6B8A", letterSpacing: "0.12em", textTransform: "uppercase" }}>Trisha Raye</div>
              <div style={{ width: 40, height: 1, background: "linear-gradient(90deg, transparent, #E2A4C460, transparent)" }} />
              <div style={{ fontSize: 10, color: "#9A8DB0" }}>Full-Stack · UI/UX</div>
            </div>

            {TECH_NODES.map((node, i) => (
              <FloatingNode key={node.label} node={node} index={i} />
            ))}

            <div style={{ position: "absolute", bottom: 20, right: 20, background: "rgba(226,164,196,0.08)", border: "1px solid rgba(226,164,196,0.15)", borderRadius: 12, padding: "10px 16px", display: "flex", alignItems: "center", gap: 10, backdropFilter: "blur(8px)" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #5DCAA5, #0F6E56)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#EDE8F5" }}>Available Now</div>
                <div style={{ fontSize: 10, color: "#9A8DB0" }}>Open to Opportunities</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "#6B5F80", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Scroll to explore
          <div style={{ width: 1, height: 36, background: "linear-gradient(to bottom, #E2A4C440, transparent)", animation: "glowPulse 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" style={{ padding: "80px 60px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span className="section-label">About Me</span>
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
            <div>
              <h2 style={{ fontSize: 38, fontWeight: 800, color: "#EDE8F5", letterSpacing: "-0.02em", marginBottom: 20, fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.1 }}>
                A builder who <span className="gradient-text">designs</span> and a designer who <span className="gradient-text">ships.</span>
              </h2>
              <p style={{ fontSize: 14, color: "#9A8DB0", lineHeight: 1.8, marginBottom: 16 }}>
                I'm a 4th-year IT student in the Philippines, specializing in building full-stack web and mobile applications. I care deeply about both clean code and thoughtful UX — the rare T-shaped skillset that bridges design and engineering.
              </p>
              <p style={{ fontSize: 14, color: "#9A8DB0", lineHeight: 1.8, marginBottom: 28 }}>
                Whether it's architecting a Spring Boot REST API or crafting pixel-perfect Figma prototypes, I bring the same level of intentionality to both. Currently looking for internship opportunities where I can contribute and grow.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="mailto:cararagtrisharaye@gmail.com" className="pill-btn" style={{ padding: "10px 20px", fontSize: 13 }}>✉ Email Me</a>
                <a href="https://github.com/trxshx14" target="_blank" rel="noreferrer" className="pill-outline" style={{ padding: "10px 20px", fontSize: 13 }}>GitHub ↗</a>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                {
                  label: "Current Focus", value: "Internship · Freelance · Side Projects",
                  iconSvg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E2A4C4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
                },
                {
                  label: "Location", value: "Philippines · Open to Remote",
                  iconSvg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E2A4C4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                },
                {
                  label: "Education", value: "BS Information Technology · 4th Year",
                  iconSvg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E2A4C4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                },
                {
                  label: "Availability", value: "Immediate · Part-time or Full-time",
                  iconSvg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E2A4C4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                },
              ].map(item => (
                <div key={item.label} className="about-card" style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <span style={{ flexShrink: 0 }}>{item.iconSvg}</span>
                  <div>
                    <div className="about-card-label">{item.label}</div>
                    <div className="about-card-value">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── WORKS ─── */}
<section id="works" style={{ padding: "80px 60px", position: "relative", zIndex: 1 }}>
  <div style={{ maxWidth: 1200, margin: "0 auto" }}>
    <span className="section-label">Selected Work</span>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 44 }}>
      <h2 style={{ fontSize: 40, fontWeight: 800, color: "#EDE8F5", letterSpacing: "-0.02em", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Things I've <span className="gradient-text">Built</span></h2>
      <a href="https://github.com/trxshx14" target="_blank" rel="noreferrer" className="pill-outline" style={{ fontSize: 12 }}>GitHub Profile ↗</a>
    </div>

    <div className="works-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
      {WORKS.map((w) => (
        <div key={w.title} className="glass-card work-card" style={{ padding: 28, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${w.accent}18`, border: `1px solid ${w.accent}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {w.icon(w.accent)}
            </div>
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: w.accent, background: `${w.accent}12`, padding: "4px 10px", borderRadius: 100 }}>{w.type}</span>
          </div>

          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6, letterSpacing: "-0.01em", color: "#EDE8F5" }}>{w.title}</h3>

          <div style={{ fontSize: 11, color: w.accent, fontWeight: 600, marginBottom: 10, letterSpacing: "0.04em" }}>
            ↳ {w.role}
          </div>

          <div style={{ background: `${w.accent}08`, border: `1px solid ${w.accent}18`, borderRadius: 8, padding: "8px 12px", marginBottom: 12 }}>
            <span style={{ fontSize: 10, fontWeight: 600, color: w.accent, letterSpacing: "0.08em", textTransform: "uppercase" }}>Problem · </span>
            <span style={{ fontSize: 11.5, color: "#9A8DB0", lineHeight: 1.5 }}>{w.problem}</span>
          </div>

          <p style={{ fontSize: 13, color: "#9A8DB0", lineHeight: 1.65, marginBottom: 16, flex: 1 }}>{w.desc}</p>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
            {w.tags.map(t => (
              <span key={t} style={{ fontSize: 11, fontWeight: 500, color: w.accent, background: `${w.accent}12`, padding: "4px 10px", borderRadius: 100, border: `1px solid ${w.accent}22` }}>{t}</span>
            ))}
          </div>

          <div style={{ display: "flex", gap: 16, borderTop: "1px solid rgba(226,164,196,0.08)", paddingTop: 16 }}>
            <a href={w.github} target="_blank" rel="noreferrer" className="card-link-btn" style={{ color: "#9A8DB0" }} onMouseEnter={e => e.currentTarget.style.color = w.accent} onMouseLeave={e => e.currentTarget.style.color = "#9A8DB0"}>
              GitHub ↗
            </a>
            {w.demo ? (
              <a href={w.demo} target="_blank" rel="noreferrer" className="card-link-btn" style={{ color: "#9A8DB0" }} onMouseEnter={e => e.currentTarget.style.color = w.accent} onMouseLeave={e => e.currentTarget.style.color = "#9A8DB0"}>
                Live Demo ↗
              </a>
            ) : (
              <span style={{ fontSize: 12, color: "#6B5F80", display: "flex", alignItems: "center", gap: 6 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6B5F80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                Private Repo
              </span>
            )}
            {w.apk && (
              <a href={w.apk} download className="card-link-btn" style={{ color: "#9A8DB0" }} onMouseEnter={e => e.currentTarget.style.color = w.accent} onMouseLeave={e => e.currentTarget.style.color = "#9A8DB0"}>
                ↓ APK
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* ─── EXPERIENCE ─── */}
      <section id="experience" style={{ padding: "60px 60px 80px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span className="section-label">Experience & Education</span>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: "#EDE8F5", letterSpacing: "-0.02em", marginBottom: 44, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            My <span className="gradient-text">Journey</span>
          </h2>

          <div style={{ position: "relative", paddingLeft: 28 }}>
            <div style={{ position: "absolute", left: 4, top: 8, bottom: 8, width: 1, background: "linear-gradient(to bottom, #E2A4C440, #9A6B8A40, transparent)" }} />
            {EXPERIENCE.map((e, i) => (
              <div key={i} style={{ position: "relative", display: "flex", gap: 20, marginBottom: 32, animation: `fadeUp 0.6s ease ${i * 0.1}s both` }}>
                <div className="timeline-dot" style={{ background: e.type === "edu" ? "#9A6B8A" : "#E2A4C4", boxShadow: `0 0 8px ${e.type === "edu" ? "#9A6B8A" : "#E2A4C4"}60`, position: "absolute", left: -24, top: 6 }} />
                <div className="glass-card" style={{ padding: "20px 24px", flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, gap: 12 }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#EDE8F5", marginBottom: 2 }}>{e.role}</div>
                      <div style={{ fontSize: 12, color: "#E2A4C4", fontWeight: 500 }}>{e.org}</div>
                    </div>
                    <span style={{ fontSize: 11, color: "#9A8DB0", fontWeight: 500, whiteSpace: "nowrap", background: "rgba(226,164,196,0.06)", border: "1px solid rgba(226,164,196,0.12)", padding: "4px 10px", borderRadius: 100 }}>{e.year}</span>
                  </div>
                  <p style={{ fontSize: 13, color: "#9A8DB0", lineHeight: 1.65 }}>{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TECH STACK ─── */}
      <section id="tech stack" style={{ padding: "60px 60px 80px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span className="section-label">Tech Stack</span>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: "#EDE8F5", letterSpacing: "-0.02em", marginBottom: 8, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Tools I <span className="gradient-text">Work With</span>
          </h2>
          <p style={{ fontSize: 13, color: "#9A8DB0", marginBottom: 40 }}>
            <span style={{ color: "#5DCAA5" }}>● Shipped</span> = used in production projects &nbsp;·&nbsp; <span style={{ color: "#FAC775" }}>● Learning</span> = actively studying
          </p>

          <div className="stack-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {STACK.map(s => (
              <div key={s.cat} className="glass-card" style={{ padding: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  {s.icon}
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#E2A4C4" }}>{s.cat}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {s.items.map(item => (
                    <div key={item.name} className="stack-item">
                      <span>{item.name}</span>
                      <span className={item.level === "Shipped" ? "stack-badge-shipped" : "stack-badge-learning"}>{item.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CERTIFICATIONS ─── */}
<section id="certifications" style={{ padding: "0 60px 80px", position: "relative", zIndex: 1 }}>
  <div style={{ maxWidth: 1200, margin: "0 auto" }}>
    <div style={{ borderTop: "1px solid rgba(226,164,196,0.08)", paddingTop: 48 }}>
      <span className="section-label">Certifications</span>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {[
          { name: "AI Ready ASEAN", issuer: "ASEAN Foundation & Google.org", year: "2025" },
          { name: "Data Visualization", issuer: "Kaggle", year: "2025" },
          { name: "Java OOP Certification", issuer: "CodeChum · CITU", year: "2025" },
          { name: "ICT Congress", issuer: "PSITE Cebu", year: "2026" },
        ].map((cert) => (
          <div key={cert.name} style={{
            display: "flex", alignItems: "center", gap: 14,
            background: "linear-gradient(135deg, rgba(30,24,51,0.7), rgba(23,18,42,0.5))",
            border: "1px solid rgba(226,164,196,0.12)",
            borderRadius: 12, padding: "14px 20px",
            transition: "border-color 0.2s",
            cursor: "default",
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(226,164,196,0.3)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(226,164,196,0.12)"}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "linear-gradient(135deg, #E2A4C4, #9A6B8A)", flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#EDE8F5", marginBottom: 2 }}>{cert.name}</div>
              <div style={{ fontSize: 11, color: "#9A8DB0" }}>{cert.issuer} · {cert.year}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* ─── CONTACT ─── */}
      <section id="contact" style={{ padding: "80px 60px 100px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <span className="section-label">Contact</span>
          <h2 style={{ fontSize: 44, fontWeight: 800, color: "#EDE8F5", letterSpacing: "-0.02em", marginBottom: 14, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Let's build something <span className="gradient-text">together</span>
          </h2>
          <p style={{ fontSize: 14, color: "#9A8DB0", marginBottom: 48, lineHeight: 1.7 }}>
            Open for internships, freelance projects, and collaborations. Pick whatever works best for you — I respond within 24 hours.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 40 }}>

            {/* Email */}
            <a href="mailto:cararagtrisharaye@gmail.com" style={{ textDecoration: "none" }}>
              <div className="glass-card" style={{ padding: "22px 28px", display: "flex", alignItems: "center", gap: 20, textAlign: "left" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(226,164,196,0.1)", border: "1px solid rgba(226,164,196,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E2A4C4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#EDE8F5", marginBottom: 3 }}>Send Me an Email</div>
                  <div style={{ fontSize: 13, color: "#9A8DB0" }}>cararagtrisharaye@gmail.com</div>
                </div>
                <div style={{ fontSize: 20, color: "#E2A4C4" }}>↗</div>
              </div>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/trisha-raye-cararag/" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
              <div className="glass-card" style={{ padding: "22px 28px", display: "flex", alignItems: "center", gap: 20, textAlign: "left" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(154,107,138,0.1)", border: "1px solid rgba(154,107,138,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9A6B8A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
                    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#EDE8F5", marginBottom: 3 }}>Connect on LinkedIn</div>
                  <div style={{ fontSize: 13, color: "#9A8DB0" }}>linkedin.com/in/trisha-raye-cararag</div>
                </div>
                <div style={{ fontSize: 20, color: "#9A6B8A" }}>↗</div>
              </div>
            </a>

            {/* GitHub */}
            <a href="https://github.com/trxshx14" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
              <div className="glass-card" style={{ padding: "22px 28px", display: "flex", alignItems: "center", gap: 20, textAlign: "left" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(200,184,216,0.08)", border: "1px solid rgba(200,184,216,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8B8D8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#EDE8F5", marginBottom: 3 }}>See My Work on GitHub</div>
                  <div style={{ fontSize: 13, color: "#9A8DB0" }}>github.com/trxshx14</div>
                </div>
                <div style={{ fontSize: 20, color: "#C8B8D8" }}>↗</div>
              </div>
            </a>

          </div>

          {/* Availability pill */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(93,202,165,0.06)", border: "1px solid rgba(93,202,165,0.2)", borderRadius: 100, padding: "8px 18px", fontSize: 12, color: "#5DCAA5", fontWeight: 500 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#5DCAA5", display: "inline-block", animation: "statusPulse 2s ease-in-out infinite" }} />
            Available for internships & freelance · 2026
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ borderTop: "1px solid rgba(226,164,196,0.08)", padding: "24px 60px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 13, color: "#6B5F80" }}>
          <span style={{ color: "#E2A4C4" }}>&lt;</span>trisha.dev<span style={{ color: "#E2A4C4" }}> /&gt;</span>
        </div>
        <div style={{ fontSize: 12, color: "#6B5F80" }}>Designed & Built by Trisha Raye Cararag · 2026</div>
        <div style={{ display: "flex", gap: 20 }}>
          {[
            { label: "GitHub", href: "https://github.com/trxshx14" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/trisha-raye-cararag/" },
            { label: "Email", href: "mailto:cararagtrisharaye@gmail.com" },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: "#6B5F80", cursor: "pointer", transition: "color 0.2s", textDecoration: "none" }} onMouseEnter={e => e.target.style.color = "#E2A4C4"} onMouseLeave={e => e.target.style.color = "#6B5F80"}>{s.label}</a>
          ))}
        </div>
      </footer>
    </div>
    
  );
}