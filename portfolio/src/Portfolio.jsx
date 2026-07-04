import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PortfolioChat from "./PortfolioChat";
import { WORKS } from "./projectsData";

const NAV_LINKS = ["Home", "About", "Works", "Experience", "Services", "Contact"];

const STACK = [
  {
    cat: "Frontend",
    items: [
      { name: "React", level: "Shipped" },
      { name: "Next.js", level: "Shipped" },
      { name: "TypeScript", level: "Shipped" },
      { name: "JavaScript", level: "Shipped" },
      { name: "Tailwind CSS", level: "Shipped" },
    ],
  },
  {
    cat: "Motion & 3D",
    items: [
      { name: "React Three Fiber", level: "Shipped" },
      { name: "GSAP + ScrollTrigger", level: "Shipped" },
      { name: "Three.js Shaders", level: "Shipped" },
    ],
  },
  {
    cat: "Backend",
    items: [
      { name: "Spring Boot", level: "Shipped" },
      { name: "REST API", level: "Shipped" },
      { name: "MySQL", level: "Shipped" },
      { name: "Supabase", level: "Shipped" },
    ],
  },
  {
    cat: "Mobile",
    items: [
      { name: "Kotlin", level: "Shipped" },
      { name: "Android Studio", level: "Shipped" },
      { name: "Firebase", level: "Shipped" },
    ],
  },
  {
    cat: "Design",
    items: [
      { name: "Figma", level: "Shipped" },
      { name: "Prototyping", level: "Shipped" },
      { name: "Design Systems", level: "Shipped" },
    ],
  },
];

const EXPERIENCE = [
  {
    year: "2026",
    role: "Frontend Engineer & Designer",
    org: "Aura Beauty · Portfolio Project",
    desc: "Built an immersive 3D product showcase with Next.js, TypeScript, React Three Fiber, and GSAP ScrollTrigger — scroll-synced WebGL, custom physical materials, and a decoupled scrollytelling architecture.",
    type: "project",
  },
  {
    year: "2026 — Present",
    role: "Full-Stack Developer",
    org: "AttendMe · Academic Project",
    desc: "Architected REST APIs with Spring Boot and MySQL for a role-based attendance management system.",
    type: "project",
  },
  {
    year: "2024 — 2026",
    role: "BS Information Technology · 4th Year",
    org: "Cebu Institute of Technology University · Cebu, Philippines",
    desc: "Studying full-stack development, UI/UX design, and software engineering principles.",
    type: "edu",
  },
  {
    year: "2021 — 2023",
    role: "Senior High School",
    org: "Colegio de la Inmaculada Concepcion · Cebu",
    desc: "Completed Senior High School at CIC Cebu.",
    type: "edu",
  },
  {
    year: "2014 — 2020",
    role: "Junior High School",
    org: "Colegio de la Inmaculada Concepcion · Cebu",
    desc: "Completed Junior High School at CIC Cebu.",
    type: "edu",
  },
];

const SERVICES = [
  {
    title: "UI/UX Design",
    sub: "Interfaces that make sense",
    desc: "Clean, user-centered interfaces in Figma — from wireframes and user flows to polished high-fidelity mockups. Every layout decision is grounded in usability, not just aesthetics.",
    bullets: ["Wireframes", "User flows", "Figma prototypes", "Case studies"],
  },
  {
    title: "Frontend Development",
    sub: "Designs turned into real code",
    desc: "Responsive, accessible interfaces in React, JavaScript, HTML, and CSS. Clean, maintainable code that translates design faithfully into working components.",
    bullets: ["React components", "Responsive layouts", "CSS animation", "Accessibility"],
  },
  {
    title: "Full-Stack Development",
    sub: "End-to-end web solutions",
    desc: "Complete web applications: Spring Boot REST APIs and MySQL on the backend, React on the frontend — role-based systems, dashboards, and more.",
    bullets: ["Spring Boot APIs", "MySQL databases", "REST architecture", "Role-based access"],
  },
];

const CERTS = [
  { name: "AI Ready ASEAN", issuer: "ASEAN Foundation & Google.org", year: "2025" },
  { name: "Data Visualization", issuer: "Kaggle", year: "2025" },
  { name: "Java OOP Certification", issuer: "CodeChum · CITU", year: "2025" },
  { name: "ICT Congress", issuer: "PSITE Cebu", year: "2026" },
];

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });
  const progressRef = useRef(null);
  const portraitRef = useRef(null);

  // Apply + persist theme
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Nav background + scroll progress bar (ref-based: no re-renders per pixel)
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      if (progressRef.current) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        progressRef.current.style.transform = `scaleX(${p})`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-reveal: fade content blocks up as they enter the viewport
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const groups = [
      ".site section:not(#home) .wrap > *:not(.works-list):not(.timeline)",
      ".works-list .work-row",
      ".timeline .tl-item",
      ".services-grid .service-card",
    ];
    const els = document.querySelectorAll(groups.join(", "));
    els.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.transitionDelay = `${(i % 3) * 0.07}s`;
    });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Portrait tilt — desktop pointers only, direct style writes (no re-renders)
  const tiltEnabled = () =>
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onPortraitMove = (e) => {
    const el = portraitRef.current;
    if (!el || !tiltEnabled()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  };
  const onPortraitLeave = () => {
    if (portraitRef.current) portraitRef.current.style.transform = "";
  };

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.toLowerCase());
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = NAV_LINKS.find((l) => l.toLowerCase() === entry.target.id);
            if (match) setActiveNav(match);
          }
        });
      },
      { root: null, rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
    setMenuOpen(false);
  };

  return (
    <div className="site">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Outfit:wght@300..700&family=JetBrains+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --ink: #14101F;
          --ink-2: #1A1428;
          --pink: #E2A4C4;
          --rose: #B36B93;
          --lavender: #C8B8D8;
          --text: #F0EAF7;
          --muted: #A99DBE;
          --faint: #7E7194;
          --line: rgba(226, 164, 196, 0.14);
          --line-strong: rgba(226, 164, 196, 0.32);
          --nav-bg: rgba(20, 16, 31, 0.9);
          --green: #5DCAA5;
          --amber: #FAC775;
          --serif: 'Fraunces', Georgia, serif;
          --sans: 'Outfit', system-ui, sans-serif;
          --mono: 'JetBrains Mono', ui-monospace, monospace;
        }

        /* Light theme — warm cream palette borrowed from Aura Beauty */
        :root[data-theme="light"] {
          --ink: #FBF7F4;
          --ink-2: #F3E7E1;
          --pink: #B3547F;
          --rose: #99416B;
          --lavender: #7A5E86;
          --text: #2B2927;
          --muted: #6E6259;
          --faint: #85756B;
          --line: rgba(43, 41, 39, 0.12);
          --line-strong: rgba(179, 84, 127, 0.35);
          --nav-bg: rgba(251, 247, 244, 0.9);
          --green: #1F8A66;
          --amber: #A8730F;
        }

        /* ── scroll reveal ── */
        .reveal {
          opacity: 0;
          transform: translateY(26px);
          transition: opacity 0.7s cubic-bezier(0.2, 0.7, 0.2, 1), transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .reveal.in { opacity: 1; transform: none; }

        /* ── scroll progress ── */
        .scroll-progress {
          position: fixed; top: 0; left: 0; right: 0; height: 2px; z-index: 101;
          background: linear-gradient(90deg, var(--pink), var(--rose));
          transform-origin: 0 50%;
          transform: scaleX(0);
        }

        /* ── theme toggle ── */
        .theme-btn {
          background: none; border: 1px solid var(--line-strong); border-radius: 4px;
          width: 38px; height: 38px; flex-shrink: 0;
          display: inline-flex; align-items: center; justify-content: center;
          cursor: pointer; color: var(--muted);
          transition: color 0.2s, border-color 0.2s;
        }
        .theme-btn:hover { color: var(--pink); border-color: var(--pink); }

        html { scroll-behavior: smooth; }
        html, body, #root { width: 100%; background: var(--ink); }

        .site {
          font-family: var(--sans);
          font-size: 16px;
          background: var(--ink);
          color: var(--text);
          min-height: 100vh;
          overflow-x: hidden;
          line-height: 1.6;
        }

        /* Defensive: beat any global h1/h2 color rules leaking from other components */
        .site h1, .site h2, .site h3, .site h4 { color: var(--text); }

        ::selection { background: var(--pink); color: var(--ink); }

        .wrap { max-width: 1080px; margin: 0 auto; padding: 0 32px; }

        /* ── voices ── */
        .v-design { font-family: var(--serif); font-style: italic; font-weight: 400; color: var(--pink); }
        .v-build { font-family: var(--mono); font-weight: 500; font-size: 0.82em; letter-spacing: -0.01em; color: var(--lavender); }

        .eyebrow {
          font-family: var(--mono);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--rose);
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 28px;
        }
        .eyebrow::after { content: ''; flex: 1; height: 1px; background: var(--line); }

        .h2 {
          font-family: var(--serif);
          font-weight: 420;
          font-size: clamp(30px, 4.4vw, 44px);
          line-height: 1.12;
          letter-spacing: -0.01em;
          margin-bottom: 20px;
        }

        section { padding: 104px 0; border-top: 1px solid var(--line); }
        section#home { border-top: none; padding: 0; }

        /* ── animation ── */
        @keyframes rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
        .rise { animation: rise 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
        .d1 { animation-delay: 0.08s; } .d2 { animation-delay: 0.16s; }
        .d3 { animation-delay: 0.24s; } .d4 { animation-delay: 0.32s; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation: none !important; transition: none !important; }
          html { scroll-behavior: auto; }
        }

        /* ── nav ── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          height: 68px;
          display: flex; align-items: center;
          border-bottom: 1px solid transparent;
          transition: background 0.3s, border-color 0.3s;
        }
        .nav.scrolled {
          background: var(--nav-bg);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom-color: var(--line);
        }
        .nav-inner { display: flex; align-items: center; justify-content: space-between; width: 100%; }
        .logo { font-family: var(--mono); font-size: 14px; font-weight: 500; color: var(--text); }
        .logo em { font-family: var(--serif); font-style: italic; color: var(--pink); font-size: 16px; }
        .nav-links { display: flex; gap: 28px; }
        .nav-link {
          background: none; border: none; cursor: pointer;
          font-family: var(--sans); font-size: 14px; font-weight: 450;
          color: var(--muted); padding: 6px 0; position: relative;
          transition: color 0.2s;
        }
        .nav-link:hover { color: var(--text); }
        .nav-link.active { color: var(--text); }
        .nav-link.active::after {
          content: ''; position: absolute; left: 0; right: 0; bottom: 0;
          height: 1.5px; background: var(--pink);
        }
        .nav-cta { display: flex; gap: 10px; align-items: center; }

        .btn {
          font-family: var(--sans); font-size: 14px; font-weight: 550;
          padding: 10px 22px; border-radius: 4px; cursor: pointer;
          text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
          border: 1px solid transparent;
        }
        .btn-solid { background: var(--pink); color: var(--ink); }
        .btn-solid:hover { background: var(--text); }
        .btn-ghost { background: transparent; color: var(--text); border-color: var(--line-strong); }
        .btn-ghost:hover { border-color: var(--pink); color: var(--pink); }

        .menu-btn {
          display: none; background: none; border: 1px solid var(--line-strong);
          border-radius: 4px; width: 40px; height: 40px; cursor: pointer;
          color: var(--text); font-size: 18px; line-height: 1;
        }
        .mobile-menu {
          position: fixed; inset: 0; z-index: 99;
          background: var(--ink);
          display: flex; flex-direction: column; justify-content: center;
          padding: 0 32px; gap: 8px;
        }
        .mobile-menu .nav-link {
          font-family: var(--serif); font-size: 34px; font-weight: 400;
          text-align: left; padding: 10px 0;
          border-bottom: 1px solid var(--line);
        }

        /* ── hero ── */
        .hero {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 64px;
          align-items: center;
          padding-top: 68px;
        }
        .hero-kicker {
          font-family: var(--mono); font-size: 13px; color: var(--muted);
          display: flex; align-items: center; gap: 10px; margin-bottom: 28px;
        }
        .hero-kicker .dot {
          width: 7px; height: 7px; border-radius: 50%; background: var(--green);
          box-shadow: 0 0 10px rgba(93, 202, 165, 0.6);
        }
        .hero h1 {
          font-family: var(--serif);
          font-weight: 380;
          font-size: clamp(42px, 6.4vw, 72px);
          line-height: 1.06;
          letter-spacing: -0.015em;
          margin-bottom: 30px;
        }
        .hero h1 .v-build { font-size: 0.72em; }
        .hero-lede {
          font-size: 17px; color: var(--muted); line-height: 1.7;
          max-width: 460px; margin-bottom: 36px;
        }
        .hero-lede strong { color: var(--text); font-weight: 500; }
        .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 56px; }
        .hero-meta {
          display: flex; gap: 0; border-top: 1px solid var(--line);
        }
        .hero-meta > div {
          padding: 18px 28px 0 0; margin-right: 28px;
          border-right: 1px solid var(--line);
        }
        .hero-meta > div:last-child { border-right: none; margin-right: 0; }
        .hero-meta .num { font-family: var(--serif); font-size: 30px; color: var(--pink); line-height: 1.1; }
        .hero-meta .lbl { font-family: var(--mono); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--faint); margin-top: 4px; }

        .portrait-frame {
          position: relative; justify-self: end;
          transition: transform 0.45s cubic-bezier(0.2, 0.7, 0.2, 1);
          will-change: transform;
        }
        .portrait {
          width: min(360px, 100%);
          aspect-ratio: 4 / 5;
          object-fit: cover;
          object-position: center top;
          border-radius: 6px;
          display: block;
          position: relative;
          z-index: 1;
          filter: saturate(0.92);
        }
        .portrait-frame::before {
          content: '';
          position: absolute; inset: 0;
          transform: translate(16px, 16px);
          border: 1px solid var(--line-strong);
          border-radius: 6px;
        }
        .portrait-caption {
          font-family: var(--mono); font-size: 11.5px; color: var(--faint);
          margin-top: 26px; letter-spacing: 0.04em;
        }

        /* ── about ── */
        .about-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 64px; align-items: start; }
        .about-copy p { color: var(--muted); margin-bottom: 18px; max-width: 540px; }
        .about-copy p strong { color: var(--text); font-weight: 500; }
        .about-facts { display: flex; flex-direction: column; }
        .fact {
          display: flex; justify-content: space-between; align-items: baseline; gap: 20px;
          padding: 16px 0; border-bottom: 1px solid var(--line);
        }
        .fact:first-child { border-top: 1px solid var(--line); }
        .fact .k { font-family: var(--mono); font-size: 11.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--faint); white-space: nowrap; }
        .fact .v { font-size: 14.5px; color: var(--text); text-align: right; }

        /* ── works ── */
        .works-head { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 56px; gap: 20px; flex-wrap: wrap; }
        .works-list { border-top: 1px solid var(--line); }
        .work-row {
          display: grid;
          grid-template-columns: 150px 1fr auto;
          gap: 40px;
          align-items: center;
          padding: 44px 0;
          border-bottom: 1px solid var(--line);
          text-decoration: none;
          transition: padding-left 0.3s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .work-row:hover { padding-left: 18px; }
        .work-meta { display: flex; flex-direction: column; gap: 6px; }
        .work-year { font-family: var(--mono); font-size: 12.5px; color: var(--faint); }
        .work-type { font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--rose); line-height: 1.5; }
        .work-title {
          font-family: var(--serif); font-weight: 420;
          font-size: clamp(28px, 3.6vw, 40px);
          letter-spacing: -0.01em; line-height: 1.1;
          color: var(--text); margin-bottom: 8px;
          transition: color 0.2s;
        }
        .work-row:hover .work-title { color: var(--pink); }
        .work-tagline { font-size: 15px; color: var(--muted); margin-bottom: 10px; max-width: 520px; }
        .work-tags { font-family: var(--mono); font-size: 11.5px; color: var(--faint); }
        .work-arrow {
          font-family: var(--serif);
          font-size: 34px;
          color: var(--faint);
          transition: color 0.2s, transform 0.3s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .work-row:hover .work-arrow { color: var(--pink); transform: translateX(8px); }
        .works-foot { margin-top: 40px; }

        /* ── experience ── */
        .timeline { border-left: 1px solid var(--line); margin-left: 5px; }
        .tl-item { position: relative; padding: 0 0 40px 36px; }
        .tl-item:last-child { padding-bottom: 0; }
        .tl-item::before {
          content: ''; position: absolute; left: -5px; top: 7px;
          width: 9px; height: 9px; border-radius: 50%;
          background: var(--ink); border: 1.5px solid var(--rose);
        }
        .tl-item.project::before { background: var(--pink); border-color: var(--pink); }
        .tl-year { font-family: var(--mono); font-size: 12px; color: var(--faint); margin-bottom: 6px; letter-spacing: 0.04em; }
        .tl-role { font-family: var(--serif); font-size: 21px; font-weight: 450; margin-bottom: 3px; }
        .tl-org { font-size: 13.5px; color: var(--pink); margin-bottom: 8px; }
        .tl-desc { font-size: 14px; color: var(--muted); max-width: 560px; }

        /* ── services ── */
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); margin-bottom: 72px; }
        .service-card { background: var(--ink); padding: 32px 28px; transition: background 0.25s; }
        .service-card:hover { background: var(--ink-2); }
        .service-title { font-family: var(--serif); font-size: 23px; font-weight: 450; margin-bottom: 4px; }
        .service-sub { font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--rose); margin-bottom: 18px; }
        .service-desc { font-size: 13.5px; color: var(--muted); line-height: 1.7; margin-bottom: 20px; }
        .service-bullets { font-family: var(--mono); font-size: 11.5px; color: var(--faint); line-height: 2; }

        .stack-note { font-size: 13.5px; color: var(--muted); margin-bottom: 32px; }
        .badge-shipped, .badge-learning {
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase;
          padding: 2px 8px; border-radius: 3px;
        }
        .badge-shipped { color: var(--green); border: 1px solid rgba(93, 202, 165, 0.3); }
        .badge-learning { color: var(--amber); border: 1px solid rgba(250, 199, 117, 0.3); }
        .stack-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 36px; }
        .stack-cat { font-family: var(--mono); font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--pink); padding-bottom: 12px; border-bottom: 1px solid var(--line-strong); margin-bottom: 4px; }
        .stack-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 10px 0; border-bottom: 1px solid var(--line);
          font-size: 14px; color: var(--text);
        }

        /* ── certifications ── */
        .cert-row {
          display: grid; grid-template-columns: 70px 1fr auto; gap: 24px; align-items: baseline;
          padding: 18px 0; border-bottom: 1px solid var(--line);
        }
        .cert-row:first-of-type { border-top: 1px solid var(--line); }
        .cert-year { font-family: var(--mono); font-size: 12.5px; color: var(--faint); }
        .cert-name { font-size: 15.5px; font-weight: 500; }
        .cert-issuer { font-size: 13px; color: var(--muted); text-align: right; }

        /* ── contact ── */
        .contact-head { max-width: 620px; margin-bottom: 56px; }
        .contact-head p { color: var(--muted); }
        .contact-list { display: flex; flex-direction: column; }
        .contact-row {
          display: grid; grid-template-columns: 130px 1fr auto; gap: 24px; align-items: center;
          padding: 26px 0; border-bottom: 1px solid var(--line);
          text-decoration: none; transition: padding-left 0.25s;
        }
        .contact-row:first-child { border-top: 1px solid var(--line); }
        .contact-row:hover { padding-left: 12px; }
        .contact-row .ch { font-family: var(--mono); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--faint); }
        .contact-row .addr { font-family: var(--serif); font-size: clamp(18px, 3vw, 26px); font-weight: 420; color: var(--text); transition: color 0.2s; word-break: break-word; }
        .contact-row:hover .addr { color: var(--pink); }
        .contact-row .arrow { font-size: 20px; color: var(--rose); }

        /* ── footer ── */
        .footer {
          border-top: 1px solid var(--line);
          padding: 28px 0;
        }
        .footer-inner { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }
        .footer-inner, .footer a { font-size: 13px; color: var(--faint); text-decoration: none; }
        .footer a:hover { color: var(--pink); }
        .footer-links { display: flex; gap: 20px; }

        /* ── responsive ── */
        @media (max-width: 900px) {
          .services-grid { grid-template-columns: 1fr; }
          .work-row { grid-template-columns: 1fr auto; }
          .work-meta { flex-direction: row; gap: 14px; align-items: baseline; grid-column: 1; margin-bottom: 2px; }
          .work-row > div:nth-child(2) { grid-column: 1; }
          .work-arrow { grid-column: 2; grid-row: 1 / span 2; align-self: center; }
          .stack-grid { grid-template-columns: repeat(2, 1fr); }
          .hero { grid-template-columns: 1fr; gap: 48px; padding-top: 110px; min-height: 0; padding-bottom: 80px; }
          .portrait-frame { justify-self: start; }
        }
        @media (max-width: 700px) {
          .wrap { padding: 0 20px; }
          section { padding: 72px 0; }
          .nav-links, .nav-cta .btn-ghost { display: none; }
          .menu-btn { display: block; }
          .about-grid { grid-template-columns: 1fr; gap: 40px; }
          .stack-grid { grid-template-columns: 1fr; gap: 28px; }
          .hero-meta { flex-wrap: wrap; }
          .hero-meta > div { border-right: none; margin-right: 0; padding-right: 0; width: 50%; }
          .cert-row { grid-template-columns: 60px 1fr; }
          .cert-issuer { grid-column: 2; text-align: left; }
          .contact-row { grid-template-columns: 1fr auto; }
          .contact-row .ch { display: none; }
        }
      `}</style>

      {/* ─── SCROLL PROGRESS ─── */}
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />

      {/* ─── NAV ─── */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="wrap nav-inner">
          <div className="logo">
            trisha<em>.dev</em>
          </div>
          <div className="nav-links">
            {NAV_LINKS.map((l) => (
              <button
                key={l}
                className={`nav-link${activeNav === l ? " active" : ""}`}
                onClick={() => scrollToSection(l)}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="nav-cta">
            <button
              className="theme-btn"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              )}
            </button>
            <a href="/Cararag_Resume_IT.pdf" target="_blank" rel="noreferrer" className="btn btn-ghost">
              Resume
            </a>
            <button className="btn btn-solid" onClick={() => scrollToSection("Contact")}>
              Let's work
            </button>
            <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              className={`nav-link${activeNav === l ? " active" : ""}`}
              onClick={() => scrollToSection(l)}
            >
              {l}
            </button>
          ))}
        </div>
      )}

      {/* ─── HERO ─── */}
      <section id="home">
        <div className="wrap hero">
          <div>
            <div className="hero-kicker rise">
              <span className="dot" />
              Available for freelance & remote work · Philippines
            </div>
            <h1 className="rise d1">
              A builder who <span className="v-design">designs.</span>
              <br />
              A designer who <span className="v-build">ships();</span>
            </h1>
            <p className="hero-lede rise d2">
              I'm <strong>Trisha Raye Cararag</strong> — frontend developer and UX/UI
              designer. I take products from <strong>Figma prototype to deployed
              code</strong>, with the same intentionality at every step.
            </p>
            <div className="hero-actions rise d3">
              <button className="btn btn-solid" onClick={() => scrollToSection("Works")}>
                View my work ↓
              </button>
              <a href="mailto:cararagtrisharaye@gmail.com" className="btn btn-ghost">
                Get in touch
              </a>
            </div>
            <div className="hero-meta rise d4">
              <div>
                <div className="num">3</div>
                <div className="lbl">Projects shipped</div>
              </div>
              <div>
                <div className="num">2</div>
                <div className="lbl">Years designing</div>
              </div>
              <div>
                <div className="num">∞</div>
                <div className="lbl">Iterations</div>
              </div>
            </div>
          </div>

          <div
            className="portrait-frame rise d2"
            ref={portraitRef}
            onMouseMove={onPortraitMove}
            onMouseLeave={onPortraitLeave}
          >
            <img className="portrait" src="/Trisha-profile.jpg" alt="Trisha Raye Cararag" />
            <div className="portrait-caption">Cebu, Philippines · GMT+8 · she/her</div>
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about">
        <div className="wrap">
          <div className="eyebrow">About</div>
          <div className="about-grid">
            <div className="about-copy">
              <h2 className="h2">
                Design and code aren't two jobs.
                <br />
                <span className="v-design">They're one craft.</span>
              </h2>
              <p>
                I'm a frontend developer and UX/UI designer based in the Philippines,
                specializing in responsive web and mobile applications. I care about
                both <strong>clean code and thoughtful UX</strong> — blending visual design
                with engineering to build products that feel intuitive.
              </p>
              <p>
                Whether it's architecting a Spring Boot REST API or crafting
                pixel-perfect Figma prototypes, I bring the same level of intentionality
                to both. Currently looking for <strong>freelance opportunities</strong> where I
                can contribute and grow.
              </p>
            </div>
            <div className="about-facts">
              <div className="fact">
                <span className="k">Focus</span>
                <span className="v">Freelance · Side projects</span>
              </div>
              <div className="fact">
                <span className="k">Location</span>
                <span className="v">Philippines · Open to remote</span>
              </div>
              <div className="fact">
                <span className="k">Education</span>
                <span className="v">BS Information Technology · CIT-U</span>
              </div>
              <div className="fact">
                <span className="k">Availability</span>
                <span className="v">Immediate · Part-time or full-time</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WORKS ─── */}
      <section id="works">
        <div className="wrap">
          <div className="eyebrow">Selected work</div>
          <div className="works-head">
            <h2 className="h2" style={{ marginBottom: 0 }}>
              Figma first. <span className="v-design">Shipped always.</span>
            </h2>
            <a href="https://github.com/trxshx14" target="_blank" rel="noreferrer" className="btn btn-ghost">
              GitHub profile ↗
            </a>
          </div>

          <div className="works-list">
            {WORKS.map((w) => (
              <Link key={w.slug} to={`/projects#${w.slug}`} className="work-row" aria-label={`View ${w.title} project details`}>
                <div className="work-meta">
                  <span className="work-year">{w.year}</span>
                  <span className="work-type">{w.type}</span>
                </div>
                <div>
                  <h3 className="work-title">{w.title}</h3>
                  <p className="work-tagline">{w.tagline}</p>
                  <div className="work-tags">{w.tags.join(" · ")}</div>
                </div>
                <span className="work-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
          <div className="works-foot">
            <Link to="/projects" className="btn btn-ghost">
              View all projects →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCE ─── */}
      <section id="experience">
        <div className="wrap">
          <div className="eyebrow">Experience & education</div>
          <h2 className="h2">
            The <span className="v-design">journey</span> so far
          </h2>
          <div style={{ height: 28 }} />
          <div className="timeline">
            {EXPERIENCE.map((e) => (
              <div key={e.year + e.role} className={`tl-item${e.type === "project" ? " project" : ""}`}>
                <div className="tl-year">{e.year}</div>
                <div className="tl-role">{e.role}</div>
                <div className="tl-org">{e.org}</div>
                <p className="tl-desc">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES + STACK ─── */}
      <section id="services">
        <div className="wrap">
          <div className="eyebrow">Services & stack</div>
          <h2 className="h2">
            What I can <span className="v-design">do for you</span>
          </h2>
          <p className="stack-note" style={{ maxWidth: 520 }}>
            Student-built, seriously considered. Every service reflects real skills
            practiced through shipped projects and coursework.
          </p>

          <div className="services-grid">
            {SERVICES.map((s) => (
              <div key={s.title} className="service-card">
                <h3 className="service-title">{s.title}</h3>
                <div className="service-sub">{s.sub}</div>
                <p className="service-desc">{s.desc}</p>
                <div className="service-bullets">
                  {s.bullets.map((b) => (
                    <div key={b}>— {b}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="stack-note">
            <span className="badge-shipped">Shipped</span> &nbsp;used in deployed projects
            &nbsp;·&nbsp; <span className="badge-learning">Learning</span> &nbsp;actively studying
          </p>
          <div className="stack-grid">
            {STACK.map((s) => (
              <div key={s.cat}>
                <div className="stack-cat">{s.cat}</div>
                {s.items.map((item) => (
                  <div key={item.name} className="stack-row">
                    <span>{item.name}</span>
                    <span className={item.level === "Shipped" ? "badge-shipped" : "badge-learning"}>
                      {item.level}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CERTIFICATIONS ─── */}
      <section id="certifications">
        <div className="wrap">
          <div className="eyebrow">Certifications</div>
          <div>
            {CERTS.map((c) => (
              <div key={c.name} className="cert-row">
                <span className="cert-year">{c.year}</span>
                <span className="cert-name">{c.name}</span>
                <span className="cert-issuer">{c.issuer}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact">
        <div className="wrap">
          <div className="eyebrow">Contact</div>
          <div className="contact-head">
            <h2 className="h2">
              Let's build something <span className="v-design">together</span>
            </h2>
            <p>
              Open for freelance projects and collaborations. Pick whatever works
              best for you — I respond within 24 hours.
            </p>
          </div>
          <div className="contact-list">
            <a href="mailto:cararagtrisharaye@gmail.com" className="contact-row">
              <span className="ch">Email</span>
              <span className="addr">cararagtrisharaye@gmail.com</span>
              <span className="arrow">↗</span>
            </a>
            <a href="https://www.linkedin.com/in/trisha-raye-cararag/" target="_blank" rel="noreferrer" className="contact-row">
              <span className="ch">LinkedIn</span>
              <span className="addr">in/trisha-raye-cararag</span>
              <span className="arrow">↗</span>
            </a>
            <a href="https://github.com/trxshx14" target="_blank" rel="noreferrer" className="contact-row">
              <span className="ch">GitHub</span>
              <span className="addr">github.com/trxshx14</span>
              <span className="arrow">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="footer">
        <div className="wrap footer-inner">
          <span>
            trisha<em style={{ fontFamily: "var(--serif)", color: "var(--pink)" }}>.dev</em>
          </span>
          <span>Designed & built by Trisha Raye Cararag · 2026</span>
          <div className="footer-links">
            <a href="https://github.com/trxshx14" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/trisha-raye-cararag/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="mailto:cararagtrisharaye@gmail.com">Email</a>
          </div>
        </div>
      </footer>

      <PortfolioChat />
    </div>
  );
}