import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/* ============================================================
   Case Study Kit — shared building blocks for all case studies.
   Matches the trisha.dev editorial design system (Fraunces /
   Outfit / JetBrains Mono) and supports light + dark themes.
   ============================================================ */

/* ---------- shell: back bar, theme, styles, content column ---------- */

export function CaseStudyShell({ title, children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cs">
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

        html { scroll-behavior: smooth; }
        html, body, #root { width: 100%; background: var(--ink); }

        .cs {
          font-family: var(--sans);
          font-size: 16px;
          background: var(--ink);
          color: var(--text);
          min-height: 100vh;
          line-height: 1.6;
        }
        .cs h1, .cs h2, .cs h3 { color: var(--text); }
        ::selection { background: var(--pink); color: var(--ink); }

        @media (prefers-reduced-motion: reduce) {
          .cs *, .cs *::before, .cs *::after { animation: none !important; transition: none !important; }
          html { scroll-behavior: auto; }
        }

        /* back bar */
        .cs-nav {
          position: sticky; top: 0; z-index: 10;
          height: 64px; display: flex; align-items: center;
          background: var(--nav-bg);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--line);
          padding: 0 28px;
        }
        .cs-nav-inner { display: flex; justify-content: space-between; align-items: center; width: 100%; max-width: 820px; margin: 0 auto; }
        .cs-nav-title { font-family: var(--mono); font-size: 13px; color: var(--muted); }
        .cs-nav-title strong { color: var(--pink); font-weight: 500; }
        .cs-nav-right { display: flex; align-items: center; gap: 16px; }
        .cs-back { font-family: var(--mono); font-size: 13px; color: var(--muted); text-decoration: none; transition: color 0.2s; }
        .cs-back:hover { color: var(--pink); }
        .cs-theme-btn {
          background: none; border: 1px solid var(--line-strong); border-radius: 4px;
          width: 34px; height: 34px; display: inline-flex; align-items: center; justify-content: center;
          cursor: pointer; color: var(--muted); transition: color 0.2s, border-color 0.2s;
        }
        .cs-theme-btn:hover { color: var(--pink); border-color: var(--pink); }

        /* content column */
        .cs-wrap { max-width: 760px; margin: 0 auto; padding: 72px 28px 96px; }

        /* hero */
        .cs-hero { margin-bottom: 72px; }
        .cs-hero h1 {
          font-family: var(--serif); font-weight: 380;
          font-size: clamp(34px, 5.4vw, 52px);
          line-height: 1.1; letter-spacing: -0.015em;
          margin: 14px 0 20px;
        }
        .cs-hero h1 em { font-style: italic; font-weight: 400; color: var(--pink); }
        .cs-lede { font-size: 16.5px; color: var(--muted); line-height: 1.75; margin-bottom: 24px; max-width: 620px; }
        .cs-roles { margin-bottom: 28px; }

        /* type */
        .cs-label {
          font-family: var(--mono); font-size: 12px; font-weight: 500;
          letter-spacing: 0.16em; text-transform: uppercase; color: var(--rose);
          display: flex; align-items: center; gap: 14px; margin-bottom: 18px;
        }
        .cs-label::after { content: ''; flex: 1; height: 1px; background: var(--line); }
        .cs section { margin-bottom: 72px; }
        .cs-h2 {
          font-family: var(--serif); font-weight: 420;
          font-size: clamp(24px, 3.4vw, 31px);
          line-height: 1.18; letter-spacing: -0.01em; margin-bottom: 16px;
        }
        .cs-p { font-size: 15px; color: var(--muted); line-height: 1.8; margin-bottom: 16px; }
        .cs-p em { color: var(--text); font-style: italic; font-family: var(--serif); }
        .cs-hl { color: var(--pink); font-weight: 550; }
        .cs-bullets { margin: 0 0 18px; padding-left: 0; list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .cs-bullets li {
          font-size: 14.5px; color: var(--muted); line-height: 1.75;
          padding-left: 22px; position: relative;
        }
        .cs-bullets li::before {
          content: '—'; position: absolute; left: 0;
          color: var(--rose); font-family: var(--mono); font-size: 13px;
        }

        /* images */
        .cs-img {
          width: 100%; display: block; border-radius: 6px;
          border: 1px solid var(--line-strong);
          margin: 12px 0 26px;
        }
        .cs-img-slot {
          border: 1px dashed var(--line-strong); border-radius: 6px;
          background: var(--ink-2);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--mono); font-size: 12px; color: var(--faint);
          text-align: center; padding: 0 24px; margin: 12px 0 26px;
        }

        /* pills */
        .cs-pill {
          display: inline-block;
          font-family: var(--mono); font-size: 11px; letter-spacing: 0.06em;
          padding: 5px 12px; border-radius: 3px;
          border: 1px solid var(--line-strong); color: var(--rose);
          margin: 0 8px 8px 0;
        }

        /* two-up cards (target users) */
        .cs-duo { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 8px; }
        .cs-duo-card { background: var(--ink-2); border: 1px solid var(--line); border-radius: 8px; padding: 20px; }
        .cs-duo-card h3 { font-family: var(--serif); font-size: 18px; font-weight: 450; margin-bottom: 8px; }
        .cs-duo-card p { font-size: 13.5px; color: var(--muted); line-height: 1.7; }

        /* challenge / solution */
        .cs-challenge {
          border: 1px solid var(--line); border-left: 2px solid var(--pink);
          border-radius: 0 8px 8px 0; background: var(--ink-2);
          padding: 18px 20px; margin-bottom: 14px;
        }
        .cs-challenge .k {
          font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.12em;
          text-transform: uppercase; display: block; margin-bottom: 5px;
        }
        .cs-challenge .k.challenge { color: var(--amber); }
        .cs-challenge .k.solution { color: var(--green); }
        .cs-challenge .body { font-size: 14px; line-height: 1.7; }
        .cs-challenge .body.q { color: var(--text); font-weight: 500; margin-bottom: 14px; }
        .cs-challenge .body.a { color: var(--muted); }

        /* stats */
        .cs-stats { display: flex; border-top: 1px solid var(--line); margin-bottom: 22px; flex-wrap: wrap; }
        .cs-stats > div { padding: 18px 28px 0 0; margin-right: 28px; border-right: 1px solid var(--line); }
        .cs-stats > div:last-child { border-right: none; margin-right: 0; }
        .cs-stats .num { font-family: var(--serif); font-size: 28px; color: var(--pink); line-height: 1.1; }
        .cs-stats .lbl { font-family: var(--mono); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--faint); margin-top: 4px; max-width: 150px; }

        /* footer cta */
        .cs-cta { border-top: 1px solid var(--line); padding-top: 40px; }
        .cs-cta p { font-size: 14.5px; color: var(--muted); margin-bottom: 20px; }
        .cs-cta-row { display: flex; gap: 12px; flex-wrap: wrap; }
        .cs-btn {
          font-family: var(--sans); font-size: 14px; font-weight: 550;
          padding: 11px 24px; border-radius: 4px; text-decoration: none;
          display: inline-flex; align-items: center; gap: 8px;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
          border: 1px solid transparent;
        }
        .cs-btn.solid { background: var(--pink); color: var(--ink); }
        .cs-btn.solid:hover { background: var(--text); }
        .cs-btn.ghost { background: transparent; color: var(--text); border-color: var(--line-strong); }
        .cs-btn.ghost:hover { border-color: var(--pink); color: var(--pink); }

        @media (max-width: 640px) {
          .cs-wrap { padding: 56px 20px 80px; }
          .cs-duo { grid-template-columns: 1fr; }
          .cs-stats > div { width: 100%; border-right: none; margin-right: 0; padding: 14px 0 0; }
        }
      `}</style>

      <div className="cs-nav">
        <div className="cs-nav-inner">
          <span className="cs-nav-title">
            <strong>{title}</strong> · Case Study
          </span>
          <span className="cs-nav-right">
            <button
              className="cs-theme-btn"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              )}
            </button>
            <Link to="/" className="cs-back">← Back</Link>
          </span>
        </div>
      </div>

      <div className="cs-wrap">{children}</div>
    </div>
  );
}

/* ---------- building blocks ---------- */

export function SectionLabel({ children }) {
  return <div className="cs-label">{children}</div>;
}

export function Section({ num, label, children }) {
  return (
    <section>
      <SectionLabel>
        {String(num).padStart(2, "0")} · {label}
      </SectionLabel>
      {children}
    </section>
  );
}

export function H2({ children }) {
  return <h2 className="cs-h2">{children}</h2>;
}

export function P({ children }) {
  return <p className="cs-p">{children}</p>;
}

export function Highlight({ children }) {
  return <span className="cs-hl">{children}</span>;
}

export function Bullets({ items }) {
  return (
    <ul className="cs-bullets">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function CSImage({ src, alt }) {
  return <img className="cs-img" src={src} alt={alt} loading="lazy" />;
}

export function ImageSlot({ label, height = 220 }) {
  return (
    <div className="cs-img-slot" style={{ height }}>
      {label}
    </div>
  );
}

export function StatusPill({ color, children }) {
  // With a color: tinted pill (status colors). Without: default rose pill (roles).
  const style = color
    ? { color, borderColor: `${color}55`, background: `${color}12` }
    : undefined;
  return (
    <span className="cs-pill" style={style}>
      {children}
    </span>
  );
}

export function ChallengeCard({ challenge, solution }) {
  return (
    <div className="cs-challenge">
      <span className="k challenge">Challenge</span>
      <div className="body q">{challenge}</div>
      <span className="k solution">Solution</span>
      <div className="body a">{solution}</div>
    </div>
  );
}

export function StatGrid({ stats }) {
  return (
    <div className="cs-stats">
      {stats.map(([n, l]) => (
        <div key={l}>
          <div className="num">{n}</div>
          <div className="lbl">{l}</div>
        </div>
      ))}
    </div>
  );
}

export function CTAFooter({ message, demo, source }) {
  return (
    <div className="cs-cta">
      <p>{message}</p>
      <div className="cs-cta-row">
        {demo && (
          <a href={demo} target="_blank" rel="noreferrer" className="cs-btn solid">
            Live demo ↗
          </a>
        )}
        {source && (
          <a href={source} target="_blank" rel="noreferrer" className="cs-btn ghost">
            View source ↗
          </a>
        )}
      </div>
    </div>
  );
}