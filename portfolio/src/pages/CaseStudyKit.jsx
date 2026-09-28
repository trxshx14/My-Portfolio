import { Children, useEffect, useRef, useState } from "react";
import { ThemeToggle, useTheme } from "../ThemeToggle";
import { usePageMeta } from "../usePageMeta";
import { TransitionLink } from "../TransitionLink";
import { PROFILE, WORKS } from "../projectsData";

/* ============================================================
   Case Study Kit — shared building blocks for all case studies.
   Uses the tokens in index.css, so light + dark come for free.
   Class names are unchanged, so existing case study pages work
   as-is. The shell adds, automatically:
   - an "At a glance" block after the hero (from projectsData.js)
   - a sticky "On this page" index on wide screens
   - a reading progress bar and linkable section anchors
   ============================================================ */

const slugify = (s) =>
  String(s).toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function AtAGlance({ work }) {
  return (
    <aside className="cs-glance" aria-label={`${work.title} at a glance`}>
      <p className="cs-glance-title">At a glance</p>
      <dl className="cs-glance-facts">
        <div>
          <dt>Role</dt>
          <dd>{work.role}</dd>
        </div>
        <div>
          <dt>Stack</dt>
          <dd>{work.tags.join(" · ")}</dd>
        </div>
        <div>
          <dt>Shipped</dt>
          <dd>
            {work.year}
            {work.deploy && <> · live on {work.deploy}</>}
          </dd>
        </div>
      </dl>
      {work.highlights?.length > 0 && (
        <ul className="cs-glance-list">
          {work.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}
      <div className="cs-glance-links">
        {work.demo && (
          <a href={work.demo} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
            Live demo <span aria-hidden="true">↗</span>
          </a>
        )}
        {work.github && (
          <a href={work.github} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
            Code <span aria-hidden="true">↗</span>
          </a>
        )}
        {work.apk && (
          <a href={work.apk} download className="btn btn-ghost btn-sm">
            Android APK <span aria-hidden="true">↓</span>
          </a>
        )}
      </div>
    </aside>
  );
}

export function CaseStudyShell({ title, children }) {
  const { theme, toggle } = useTheme();
  const work = WORKS.find((w) => w.title === title);
  const progressRef = useRef(null);
  const wrapRef = useRef(null);
  const [toc, setToc] = useState([]);
  const [activeId, setActiveId] = useState("");

  usePageMeta(
    `${title} case study — ${PROFILE.name}`,
    work ? `${work.tagline} Case study by ${PROFILE.name}.` : undefined
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Reading progress
  useEffect(() => {
    const onScroll = () => {
      if (!progressRef.current) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Build the "On this page" index from the rendered sections + track the active one
  useEffect(() => {
    const sections = [...(wrapRef.current?.querySelectorAll(".cs-section[id]") ?? [])];
    setToc(sections.map((s) => ({ id: s.id, num: s.dataset.num, label: s.dataset.label })));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Place "At a glance" right after the hero, in DOM order (good for screen readers too)
  const [hero, ...rest] = Children.toArray(children);

  return (
    <div className="cs">
      <style>{CSS}</style>
      <div className="cs-progress" ref={progressRef} aria-hidden="true" />

      <header className="cs-nav">
        <div className="cs-nav-inner">
          <TransitionLink to="/" className="cs-logo">
            trisha<em>.dev</em>
          </TransitionLink>
          <span className="cs-nav-title" aria-hidden="true">
            {title} · Case study
          </span>
          <span className="cs-nav-right">
            <ThemeToggle theme={theme} toggle={toggle} />
            <TransitionLink to="/projects" className="text-link">
              <span aria-hidden="true">←</span> All projects
            </TransitionLink>
          </span>
        </div>
      </header>

      {toc.length > 0 && (
        <nav className="cs-toc" aria-label="On this page">
          <p className="cs-toc-title">On this page</p>
          <ol>
            {toc.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`} aria-current={activeId === t.id ? "true" : undefined}>
                  <span className="cs-toc-num">{t.num}</span>
                  {t.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <main className="cs-wrap" ref={wrapRef}>
        {hero}
        {work && <AtAGlance work={work} />}
        {rest}
      </main>
    </div>
  );
}

/* ---------- building blocks ---------- */

export function SectionLabel({ children }) {
  return <div className="cs-label">{children}</div>;
}

export function Section({ num, label, children }) {
  const n = String(num).padStart(2, "0");
  const id = slugify(label);
  return (
    <section className="cs-section" id={id} data-num={n} data-label={label}>
      <SectionLabel>
        <a href={`#${id}`} className="cs-anchor" aria-label={`Link to section: ${label}`}>
          <span className="cs-num">{n}</span>
        </a>{" "}
        {label}
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
  return <strong className="cs-hl">{children}</strong>;
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
  // Every case study image sits on the same soft mauve mat
  return (
    <figure className="cs-figure">
      <img
        className="cs-img"
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={(e) => { e.currentTarget.closest("figure").style.display = "none"; }}
      />
    </figure>
  );
}

export function ImageSlot({ label, height = 220 }) {
  return (
    <div className="cs-img-slot" style={{ height }}>
      {label}
    </div>
  );
}

export function StatusPill({ color, children }) {
  // With a color: tinted status pill, text mixed toward the theme's text
  // color so it stays readable in both light and dark. Without: neutral role pill.
  const style = color
    ? {
        color: `color-mix(in srgb, ${color} 62%, var(--text))`,
        borderColor: `color-mix(in srgb, ${color} 45%, transparent)`,
        background: `color-mix(in srgb, ${color} 10%, transparent)`,
      }
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
    <dl className="cs-stats">
      {stats.map(([n, l]) => (
        <div key={l}>
          <dt className="lbl">{l}</dt>
          <dd className="num">{n}</dd>
        </div>
      ))}
    </dl>
  );
}

export function CTAFooter({ message, demo, source }) {
  return (
    <div className="cs-cta">
      <p>{message}</p>
      <div className="cs-cta-row">
        {demo && (
          <a href={demo} target="_blank" rel="noreferrer" className="btn btn-primary">
            Live demo <span aria-hidden="true">↗</span>
          </a>
        )}
        {source && (
          <a href={source} target="_blank" rel="noreferrer" className="btn btn-ghost">
            View source <span aria-hidden="true">↗</span>
          </a>
        )}
        <TransitionLink to="/projects" className="btn btn-ghost">
          All projects <span aria-hidden="true">→</span>
        </TransitionLink>
      </div>
    </div>
  );
}

const CSS = `
.cs { min-height: 100vh; }

/* nav */
.cs-nav {
  position: sticky; top: 0; z-index: 10; height: var(--nav-h);
  display: flex; align-items: center; padding-inline: var(--gutter);
  background: var(--nav-bg);
  -webkit-backdrop-filter: blur(16px) saturate(1.2);
  backdrop-filter: blur(16px) saturate(1.2);
  border-bottom: 1px solid var(--line);
}
.cs-nav-inner {
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: var(--s-4);
  width: 100%; max-width: var(--container); margin: 0 auto;
}
.cs-logo { font: 500 var(--fs-sm)/1 var(--sans); color: var(--text); text-decoration: none; }
.cs-logo em {
  font-family: var(--serif); font-style: italic; font-size: 1.2em;
  font-variation-settings: "SOFT" 100, "WONK" 0; color: var(--accent);
}
.cs-nav-title { font-size: var(--fs-sm); color: var(--text-3); white-space: nowrap; }
.cs-nav-right { display: flex; align-items: center; justify-content: flex-end; gap: var(--s-4); }

/* content column */
.cs-wrap { max-width: calc(720px + var(--gutter) * 2); margin: 0 auto; padding: var(--s-9) var(--gutter) var(--s-10); }

/* hero */
.cs-hero { margin-bottom: var(--s-9); }
.cs-hero h1 {
  font-family: var(--serif); font-weight: 340; font-optical-sizing: auto;
  font-variation-settings: "SOFT" 50, "WONK" 0;
  font-size: clamp(2.25rem, 1.5rem + 3.2vw, 3.75rem);
  line-height: 1.06; letter-spacing: -0.022em;
  margin: var(--s-4) 0 var(--s-5);
}
.cs-hero h1 { view-transition-name: page-title; }
.cs-hero h1 em { font-style: italic; font-variation-settings: "SOFT" 100, "WONK" 0; color: var(--accent); }
.cs-lede { font-size: var(--fs-lead); line-height: 1.65; margin-bottom: var(--s-6); max-width: 60ch; }
.cs-roles { display: flex; flex-wrap: wrap; gap: var(--s-2); margin-bottom: var(--s-7); }

/* type */
.cs-label {
  display: flex; align-items: center; gap: var(--s-3); margin-bottom: var(--s-4);
  font: 500 var(--fs-label)/1.2 var(--sans); letter-spacing: .08em; text-transform: uppercase;
  color: var(--text-3);
}
.cs-label::after { content: ''; flex: 1; height: 1px; background: var(--line); }
.cs-num { font-family: var(--mono); color: var(--accent); letter-spacing: 0; }
.cs-section { margin-bottom: var(--s-9); scroll-margin-top: calc(var(--nav-h) + var(--s-5)); }
.cs-h2 {
  font-family: var(--serif); font-weight: 380; font-optical-sizing: auto;
  font-variation-settings: "SOFT" 50, "WONK" 0;
  font-size: clamp(1.5rem, 1.2rem + 1.4vw, 2.125rem);
  line-height: 1.15; letter-spacing: -0.014em; margin-bottom: var(--s-5);
}
.cs-p { line-height: 1.8; margin-bottom: var(--s-4); }
.cs-p em { color: var(--text); font-style: italic; font-family: var(--serif); }
.cs-hl { color: var(--text); font-weight: 550; }
.cs-bullets { display: flex; flex-direction: column; gap: var(--s-3); margin: 0 0 var(--s-5); }
.cs-bullets li { position: relative; padding-left: var(--s-5); line-height: 1.75; max-width: 64ch; }
.cs-bullets li::before {
  content: ''; position: absolute; left: 3px; top: .72em;
  width: 5px; height: 5px; border-radius: 50%; border: 1px solid var(--text-3);
}

/* images */
.cs-figure {
  margin: var(--s-4) 0 var(--s-6);
  padding: clamp(12px, 2.4vw, 24px);
  border-radius: var(--radius-lg);
  background:
    radial-gradient(120% 90% at 0% 0%, color-mix(in srgb, var(--plum) 34%, transparent), transparent 60%),
    radial-gradient(90% 80% at 100% 100%, var(--accent-tint), transparent 70%),
    var(--surface-2);
  border: 1px solid var(--line);
}
.cs-img {
  width: 100%; border-radius: var(--radius-sm);
  border: 1px solid var(--line-strong);
  box-shadow: 0 24px 50px -28px rgba(0, 0, 0, .45);
}
.cs-img-slot {
  display: flex; align-items: center; justify-content: center; text-align: center;
  padding: 0 var(--s-5); margin: var(--s-4) 0 var(--s-6);
  border: 1px dashed var(--line-strong); border-radius: var(--radius-md);
  background: var(--surface-1); font-size: var(--fs-sm); color: var(--text-3);
}

/* pills */
.cs-pill {
  display: inline-block; padding: 6px 14px; border-radius: var(--radius-pill);
  font-size: var(--fs-label); font-weight: 500; letter-spacing: .02em;
  color: var(--text-2); border: 1px solid var(--line-strong); background: transparent;
  margin: 0 var(--s-2) var(--s-2) 0;
}
.cs-roles .cs-pill { margin: 0; }

/* two-up cards */
.cs-duo { display: grid; grid-template-columns: 1fr 1fr; gap: var(--s-4); margin-bottom: var(--s-2); }
.cs-duo-card { padding: var(--s-5); border-radius: var(--radius-md); background: var(--surface-1); border: 1px solid var(--line); }
.cs-duo-card h3 {
  font-family: var(--serif); font-size: 1.25rem; font-weight: 400;
  font-variation-settings: "SOFT" 50, "WONK" 0; margin-bottom: var(--s-2);
}
.cs-duo-card p { font-size: var(--fs-sm); line-height: 1.7; }

/* challenge / solution */
.cs-challenge {
  padding: var(--s-5); margin-bottom: var(--s-4);
  border-radius: var(--radius-md); background: var(--surface-1); border: 1px solid var(--line);
}
.cs-challenge .k {
  display: block; margin-bottom: var(--s-1);
  font-size: var(--fs-label); font-weight: 500; letter-spacing: .08em; text-transform: uppercase;
}
.cs-challenge .k.challenge { color: var(--text-3); }
.cs-challenge .k.solution { color: var(--accent); }
.cs-challenge .body { font-size: .9375rem; line-height: 1.7; }
.cs-challenge .body.q { color: var(--text); font-weight: 500; margin-bottom: var(--s-4); }
.cs-challenge .body.a { color: var(--text-2); }

/* stats */
.cs-stats {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: var(--s-5);
  padding-top: var(--s-5); margin-bottom: var(--s-6); border-top: 1px solid var(--line);
}
.cs-stats > div { display: flex; flex-direction: column-reverse; gap: var(--s-1); }
.cs-stats .num {
  font-family: var(--serif); font-size: 1.875rem; font-weight: 380; line-height: 1.1;
  font-variation-settings: "SOFT" 50, "WONK" 0; color: var(--text);
}
.cs-stats .lbl { font-size: var(--fs-label); color: var(--text-3); max-width: 18ch; }

/* footer cta */
.cs-cta { padding-top: var(--s-7); border-top: 1px solid var(--line); }
.cs-cta p { margin-bottom: var(--s-5); }
.cs-cta-row { display: flex; flex-wrap: wrap; gap: var(--s-3); }

/* reading progress */
.cs-progress {
  position: fixed; top: 0; left: 0; right: 0; height: 2px; z-index: 11;
  background: var(--accent); opacity: .7;
  transform-origin: 0 50%; transform: scaleX(0);
}

/* section anchors */
.cs-anchor { text-decoration: none; border-radius: 4px; }
.cs-anchor:hover .cs-num { text-decoration: underline; text-underline-offset: 3px; }

/* at a glance */
.cs-glance {
  margin: calc(var(--s-9) * -0.5) 0 var(--s-9);
  padding: var(--s-6);
  border-radius: var(--radius-lg);
  background: var(--surface-1); border: 1px solid var(--line-strong);
  box-shadow: var(--shadow);
}
.cs-glance-title {
  font: 500 var(--fs-label)/1.2 var(--sans); letter-spacing: .08em; text-transform: uppercase;
  color: var(--accent); margin-bottom: var(--s-4);
}
.cs-glance-facts { display: grid; gap: var(--s-3); margin-bottom: var(--s-5); }
.cs-glance-facts > div { display: grid; grid-template-columns: 5.5rem 1fr; gap: var(--s-4); }
.cs-glance-facts dt {
  font-size: var(--fs-label); font-weight: 500; letter-spacing: .08em; text-transform: uppercase;
  color: var(--text-3); padding-top: 3px;
}
.cs-glance-facts dd { font-size: .9375rem; color: var(--text); }
.cs-glance-list {
  display: grid; gap: var(--s-2);
  padding-top: var(--s-5); margin-bottom: var(--s-5); border-top: 1px solid var(--line);
}
.cs-glance-list li { position: relative; padding-left: var(--s-5); font-size: var(--fs-sm); line-height: 1.6; }
.cs-glance-list li::before {
  content: ''; position: absolute; left: 3px; top: .6em;
  width: 5px; height: 5px; border-radius: 50%; border: 1px solid var(--accent);
}
.cs-glance-links { display: flex; flex-wrap: wrap; gap: var(--s-2); }

/* on this page (wide screens only) */
.cs-toc { display: none; }
@media (min-width: 1280px) {
  .cs-toc {
    display: block; position: fixed; z-index: 5;
    top: calc(var(--nav-h) + var(--s-7));
    left: max(var(--s-5), calc(50% - 360px - 300px));
    width: 220px; max-height: calc(100vh - var(--nav-h) - var(--s-9)); overflow-y: auto;
  }
  .cs-toc-title {
    font: 500 var(--fs-label)/1.2 var(--sans); letter-spacing: .08em; text-transform: uppercase;
    color: var(--text-3); margin-bottom: var(--s-3);
  }
  .cs-toc ol { display: grid; gap: 2px; border-left: 1px solid var(--line); }
  .cs-toc a {
    display: flex; gap: var(--s-2); align-items: baseline;
    padding: 5px 0 5px var(--s-4); margin-left: -1px;
    border-left: 1px solid transparent;
    font-size: 0.8125rem; line-height: 1.4; color: var(--text-3); text-decoration: none;
    transition: color .2s var(--ease), border-color .2s var(--ease), transform .3s var(--ease);
  }
  .cs-toc a:hover { color: var(--text); transform: translateX(3px); }
  .cs-toc a[aria-current="true"] { color: var(--text); border-left-color: var(--accent); }
  .cs-toc-num { font-family: var(--mono); font-size: 0.6875rem; color: var(--text-3); }
}

@media (max-width: 720px) {
  .cs-nav-inner { grid-template-columns: 1fr auto; }
  .cs-nav-title { display: none; }
  .cs-duo { grid-template-columns: 1fr; }
}
`;