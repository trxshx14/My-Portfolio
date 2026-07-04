import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { WORKS } from "./projectsData";

export default function ProjectsPage() {
  const location = useLocation();
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Scroll to the project targeted by the hash (e.g. /projects#aura-beauty)
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        // Wait a tick so layout (fonts/images) settles before scrolling
        requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="projects-page">
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
          --serif: 'Fraunces', Georgia, serif;
          --sans: 'Outfit', system-ui, sans-serif;
          --mono: 'JetBrains Mono', ui-monospace, monospace;
        }

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
        }

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

        .projects-page {
          font-family: var(--sans);
          font-size: 16px;
          background: var(--ink);
          color: var(--text);
          min-height: 100vh;
          line-height: 1.6;
        }

        .projects-page h1, .projects-page h2, .projects-page h3 { color: var(--text); }

        ::selection { background: var(--pink); color: var(--ink); }

        .pp-wrap { max-width: 1080px; margin: 0 auto; padding: 0 32px; }

        @keyframes rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
        .rise { animation: rise 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation: none !important; transition: none !important; }
          html { scroll-behavior: auto; }
        }

        /* ── header ── */
        .pp-nav {
          position: sticky; top: 0; z-index: 100;
          height: 68px; display: flex; align-items: center;
          background: var(--nav-bg);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--line);
        }
        .pp-nav-inner { display: flex; align-items: center; justify-content: space-between; width: 100%; }
        .pp-logo { font-family: var(--mono); font-size: 14px; font-weight: 500; color: var(--text); text-decoration: none; }
        .pp-logo em { font-family: var(--serif); font-style: italic; color: var(--pink); font-size: 16px; }
        .pp-back {
          font-family: var(--mono); font-size: 13px; color: var(--muted);
          text-decoration: none; transition: color 0.2s;
        }
        .pp-back:hover { color: var(--pink); }

        /* ── page head ── */
        .pp-head { padding: 88px 0 64px; border-bottom: 1px solid var(--line); }
        .pp-eyebrow {
          font-family: var(--mono); font-size: 12px; font-weight: 500;
          letter-spacing: 0.16em; text-transform: uppercase; color: var(--rose);
          margin-bottom: 20px;
        }
        .pp-head h1 {
          font-family: var(--serif); font-weight: 380;
          font-size: clamp(38px, 5.6vw, 60px);
          line-height: 1.08; letter-spacing: -0.015em; margin-bottom: 18px;
        }
        .pp-head h1 em { font-style: italic; color: var(--pink); font-weight: 400; }
        .pp-head p { color: var(--muted); max-width: 540px; }

        /* ── project blocks ── */
        .project {
          padding: 88px 0;
          border-bottom: 1px solid var(--line);
          scroll-margin-top: 88px;
        }
        .project-top { display: flex; justify-content: space-between; align-items: baseline; gap: 20px; margin-bottom: 10px; }
        .project-type { font-family: var(--mono); font-size: 11.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--rose); }
        .project-year { font-family: var(--mono); font-size: 12.5px; color: var(--faint); }
        .project h2 {
          font-family: var(--serif); font-weight: 420;
          font-size: clamp(32px, 4.6vw, 48px);
          letter-spacing: -0.012em; line-height: 1.08; margin-bottom: 6px;
        }
        .project-role { font-size: 14.5px; color: var(--muted); margin-bottom: 36px; }

        .project-grid { display: grid; grid-template-columns: 1fr 320px; gap: 56px; align-items: start; }

        .project-image {
          width: 100%; border-radius: 6px; display: block;
          border: 1px solid var(--line-strong);
          margin-bottom: 32px;
        }
        .project-k {
          font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--rose);
          display: block; margin-bottom: 8px;
        }
        .project-problem, .project-desc { color: var(--muted); line-height: 1.75; margin-bottom: 28px; max-width: 580px; }
        .project-desc { color: var(--text); }

        .project-side { display: flex; flex-direction: column; gap: 28px; position: sticky; top: 100px; }
        .project-pipeline {
          font-family: var(--mono); font-size: 12px; color: var(--lavender);
          background: rgba(226, 164, 196, 0.06);
          border-left: 2px solid var(--pink);
          padding: 12px 14px; line-height: 1.6;
        }
        .project-tags { font-family: var(--mono); font-size: 12px; color: var(--faint); line-height: 2; }
        .project-links { display: flex; flex-direction: column; }
        .project-link {
          display: flex; justify-content: space-between; align-items: center;
          font-family: var(--mono); font-size: 13px; color: var(--text);
          text-decoration: none; padding: 14px 2px;
          border-bottom: 1px solid var(--line);
          transition: color 0.2s, padding-left 0.25s;
        }
        .project-link:first-child { border-top: 1px solid var(--line); }
        .project-link:hover { color: var(--pink); padding-left: 8px; }
        .project-link .arr { color: var(--rose); }

        /* ── footer ── */
        .pp-foot { padding: 64px 0 80px; text-align: left; }
        .pp-foot p { color: var(--muted); margin-bottom: 24px; max-width: 480px; }
        .pp-foot .btn {
          font-family: var(--sans); font-size: 14px; font-weight: 550;
          padding: 12px 26px; border-radius: 4px; cursor: pointer;
          text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
          background: var(--pink); color: var(--ink); border: 1px solid transparent;
          transition: background 0.2s;
        }
        .pp-foot .btn:hover { background: var(--text); }

        @media (max-width: 820px) {
          .pp-wrap { padding: 0 20px; }
          .project { padding: 64px 0; }
          .project-grid { grid-template-columns: 1fr; gap: 36px; }
          .project-side { position: static; }
        }
      `}</style>

      {/* ─── HEADER ─── */}
      <nav className="pp-nav">
        <div className="pp-wrap pp-nav-inner">
          <Link to="/" className="pp-logo">
            trisha<em>.dev</em>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <button
              className="theme-btn"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
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
            <Link to="/" className="pp-back">← Back to home</Link>
          </div>
        </div>
      </nav>

      {/* ─── PAGE HEAD ─── */}
      <header className="pp-head">
        <div className="pp-wrap rise">
          <div className="pp-eyebrow">Projects</div>
          <h1>
            Every project, from <em>first wireframe</em>
            <br />
            to final deploy.
          </h1>
          <p>
            Each piece here went through the full pipeline — designed in Figma,
            built by hand, and shipped to production.
          </p>
        </div>
      </header>

      {/* ─── PROJECTS ─── */}
      <main>
        {WORKS.map((w) => (
          <article key={w.slug} id={w.slug} className="project">
            <div className="pp-wrap">
              <div className="project-top">
                <span className="project-type">{w.type}</span>
                <span className="project-year">{w.year}</span>
              </div>
              <h2>{w.title}</h2>
              <div className="project-role">{w.role}</div>

              <div className="project-grid">
                <div>
                  {w.image && (
                    <img
                      className="project-image"
                      src={w.image}
                      alt={`${w.title} interface preview`}
                      loading="lazy"
                    />
                  )}
                  <span className="project-k">Problem</span>
                  <p className="project-problem">{w.problem}</p>
                  <span className="project-k">What I built</span>
                  <p className="project-desc">{w.desc}</p>
                </div>

                <aside className="project-side">
                  <div>
                    <span className="project-k">Pipeline</span>
                    <div className="project-pipeline">{w.pipeline}</div>
                  </div>
                  <div>
                    <span className="project-k">Stack</span>
                    <div className="project-tags">{w.tags.join(" · ")}</div>
                  </div>
                  <div className="project-links">
                    {w.demo && (
                      <a href={w.demo} target="_blank" rel="noreferrer" className="project-link">
                        Live demo <span className="arr">↗</span>
                      </a>
                    )}
                    <a href={w.github} target="_blank" rel="noreferrer" className="project-link">
                      GitHub <span className="arr">↗</span>
                    </a>
                    {w.caseStudy && (
                      <Link to={w.caseStudy} className="project-link">
                        Case study <span className="arr">→</span>
                      </Link>
                    )}
                    {w.apk && (
                      <a href={w.apk} download className="project-link">
                        Download APK <span className="arr">↓</span>
                      </a>
                    )}
                  </div>
                </aside>
              </div>
            </div>
          </article>
        ))}
      </main>

      {/* ─── FOOTER CTA ─── */}
      <footer className="pp-foot">
        <div className="pp-wrap">
          <p>
            Like what you see? I'm open for freelance projects and collaborations —
            I respond within 24 hours.
          </p>
          <a href="mailto:cararagtrisharaye@gmail.com" className="btn">
            Get in touch
          </a>
        </div>
      </footer>
    </div>
  );
}