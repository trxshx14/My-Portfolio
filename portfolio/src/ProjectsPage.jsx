import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ThemeToggle, useTheme } from "./ThemeToggle";
import { usePageMeta } from "./usePageMeta";
import { MediaFrame } from "./MediaFrame";
import { TransitionLink } from "./TransitionLink";
import { PROFILE, WORKS } from "./projectsData";

export default function ProjectsPage() {
  const location = useLocation();
  const { theme, toggle } = useTheme();
  usePageMeta(
    `Projects — ${PROFILE.name}`,
    `${WORKS.length} live projects by ${PROFILE.name}: ${WORKS.map((w) => w.title).join(", ")}.`
  );

  // Scroll to the project targeted by the hash (e.g. /projects#aura-beauty)
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="pp">
      <style>{CSS}</style>

      <header className="pp-nav">
        <div className="container pp-nav-inner">
          <TransitionLink to="/" className="pp-logo">
            trisha<em>.dev</em>
          </TransitionLink>
          <div className="pp-nav-actions">
            <ThemeToggle theme={theme} toggle={toggle} />
            <a href={PROFILE.resume} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm pp-resume">
              Resume <span aria-hidden="true">↗</span>
            </a>
            <TransitionLink to="/" className="text-link">
              <span aria-hidden="true">←</span> Home
            </TransitionLink>
          </div>
        </div>
      </header>

      <main>
        <header className="pp-head">
          <div className="container rise">
            <p className="eyebrow">Projects</p>
            <h1 className="t-h1 pp-title">
              Every project, from <em>first idea</em> to final deploy.
            </h1>
            <p className="lead pp-lede">
              Each piece went through the full pipeline — designed and built directly in code, and
              shipped to production.
            </p>
            <nav className="pp-index" aria-label="Jump to project">
              {WORKS.map((w, i) => (
                <a key={w.slug} href={`#${w.slug}`}>
                  <span className="pp-index-num">{String(i + 1).padStart(2, "0")}</span>
                  {w.title}
                </a>
              ))}
            </nav>
          </div>
        </header>

        {WORKS.map((w, i) => (
          <article key={w.slug} id={w.slug} className="pp-project" aria-labelledby={`${w.slug}-title`} data-morph-scope>
            <div className="container">
              <div className="pp-top">
                <span className="eyebrow">
                  {String(i + 1).padStart(2, "0")} · {w.type}
                </span>
                <span className="pp-year">{w.year}</span>
              </div>
              <h2 id={`${w.slug}-title`} className="t-h2 pp-project-title" data-morph="">{w.title}</h2>
              <p className="pp-role">{w.role}</p>

              <div className="pp-grid">
                <div className="pp-main">
                  <MediaFrame work={w} eager={i === 0} className="pp-media" />

                  <h3 className="pp-k">Problem</h3>
                  <p className="pp-problem">{w.problem}</p>

                  <h3 className="pp-k">What I built</h3>
                  <p className="pp-desc">{w.desc}</p>

                  {w.highlights?.length > 0 && (
                    <>
                      <h3 className="pp-k">Engineering highlights</h3>
                      <ul className="pp-highlights">
                        {w.highlights.map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                <aside className="pp-side" aria-label={`${w.title} details`}>
                  <div>
                    <h3 className="pp-k">Pipeline</h3>
                    <p className="pp-pipeline">{w.pipeline}</p>
                  </div>
                  <div>
                    <h3 className="pp-k">Stack</h3>
                    <p className="pp-tags">{w.tags.join(" · ")}</p>
                  </div>
                  <div className="pp-links">
                    {w.demo && (
                      <a href={w.demo} target="_blank" rel="noreferrer" className="pp-link is-primary">
                        Live demo <span aria-hidden="true">↗</span>
                      </a>
                    )}
                    <a href={w.github} target="_blank" rel="noreferrer" className="pp-link">
                      Source code <span aria-hidden="true">↗</span>
                    </a>
                    {w.caseStudy && (
                      <TransitionLink to={w.caseStudy} morph className="pp-link">
                        Read the case study <span aria-hidden="true">→</span>
                      </TransitionLink>
                    )}
                    {w.apk && (
                      <a href={w.apk} download className="pp-link">
                        Download Android APK <span aria-hidden="true">↓</span>
                      </a>
                    )}
                  </div>
                </aside>
              </div>
            </div>
          </article>
        ))}
      </main>

      <footer className="pp-foot">
        <div className="container">
          <h2 className="t-h3">
            Like what you see? <em>Let's talk.</em>
          </h2>
          <p>{PROFILE.availability}. I reply within 24 hours.</p>
          <div className="pp-foot-actions">
            <a href={`mailto:${PROFILE.email}`} className="btn btn-primary">Email me</a>
            <a href={PROFILE.resume} target="_blank" rel="noreferrer" className="btn btn-ghost">
              Resume <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const CSS = `
.pp { min-height: 100vh; }

.pp-nav {
  position: sticky; top: 0; z-index: 100; height: var(--nav-h);
  display: flex; align-items: center;
  background: var(--nav-bg);
  -webkit-backdrop-filter: blur(16px) saturate(1.2);
  backdrop-filter: blur(16px) saturate(1.2);
  border-bottom: 1px solid var(--line);
}
.pp-nav-inner { display: flex; align-items: center; justify-content: space-between; gap: var(--s-4); }
.pp-logo { font: 500 var(--fs-sm)/1 var(--sans); color: var(--text); text-decoration: none; }
.pp-logo em {
  font-family: var(--serif); font-style: italic; font-size: 1.2em;
  font-variation-settings: "SOFT" 100, "WONK" 0; color: var(--accent);
}
.pp-nav-actions { display: flex; align-items: center; gap: var(--s-4); }

.pp-head { padding-block: var(--s-10) var(--s-8); border-bottom: 1px solid var(--line); }
.pp-head .eyebrow { margin-bottom: var(--s-5); }
.pp-title { max-width: 16ch; margin-bottom: var(--s-5); }
.pp-lede { max-width: 48ch; margin-bottom: var(--s-7); }
.pp-index { display: flex; flex-wrap: wrap; gap: var(--s-2); }
.pp-index a {
  display: inline-flex; align-items: center; gap: var(--s-2);
  padding: 8px 16px; border-radius: var(--radius-pill);
  border: 1px solid var(--line-strong);
  font-size: var(--fs-sm); color: var(--text-2); text-decoration: none;
  transition: color .2s var(--ease), border-color .2s var(--ease), background-color .2s var(--ease);
}
.pp-index a:hover { color: var(--accent); border-color: var(--accent); background: var(--accent-tint); }
.pp-index-num { font-family: var(--mono); font-size: var(--fs-label); color: var(--text-3); }

.pp-project {
  padding-block: var(--section-y);
  border-bottom: 1px solid var(--line);
  scroll-margin-top: var(--nav-h);
}
.pp-project:nth-of-type(even) { background: var(--surface-1); }
.pp-top { display: flex; justify-content: space-between; align-items: baseline; gap: var(--s-4); margin-bottom: var(--s-4); }
.pp-year { font-family: var(--mono); font-size: var(--fs-label); color: var(--text-3); }
.pp-project-title { margin-bottom: var(--s-2); }
.pp-role { font-size: var(--fs-sm); color: var(--text-3); margin-bottom: var(--s-7); }

.pp-grid { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: var(--s-8); align-items: start; }
.pp-media { margin-bottom: var(--s-7); }
.pp-k {
  font: 500 var(--fs-label)/1.2 var(--sans); letter-spacing: .08em; text-transform: uppercase;
  color: var(--text-3); margin-bottom: var(--s-3);
}
.pp-problem, .pp-desc { line-height: 1.75; margin-bottom: var(--s-6); }
.pp-desc { color: var(--text); }
.pp-highlights { display: grid; gap: var(--s-3); }
.pp-highlights li { position: relative; padding-left: var(--s-5); line-height: 1.6; }
.pp-highlights li::before {
  content: ''; position: absolute; left: 3px; top: .62em;
  width: 5px; height: 5px; border-radius: 50%; border: 1px solid var(--accent);
}

.pp-side { display: flex; flex-direction: column; gap: var(--s-6); position: sticky; top: calc(var(--nav-h) + var(--s-6)); }
.pp-pipeline {
  font-family: var(--mono); font-size: var(--fs-label); line-height: 1.7; color: var(--text-2);
  padding: var(--s-4); border-radius: var(--radius-sm);
  background: var(--accent-tint); border: 1px solid var(--line);
}
.pp-tags { font-family: var(--mono); font-size: var(--fs-label); line-height: 1.8; color: var(--text-3); }
.pp-links { display: flex; flex-direction: column; }
.pp-link {
  display: flex; justify-content: space-between; align-items: center;
  padding-block: var(--s-4); border-bottom: 1px solid var(--line);
  font-size: var(--fs-sm); font-weight: 500; color: var(--text); text-decoration: none;
  transition: color .2s var(--ease);
}
.pp-link:first-child { border-top: 1px solid var(--line); }
.pp-link.is-primary { color: var(--accent); }
.pp-link:hover { color: var(--accent); }
.pp-link > span { display: inline-block; transition: transform .3s var(--ease); }
@media (hover: hover) and (pointer: fine) {
  .pp-link { transition: color .2s var(--ease), transform .4s var(--ease); }
  .pp-link:hover { transform: translateX(6px); }
  .pp-link:hover > span { transform: translateX(3px); }
}

.pp-foot { padding-block: var(--s-9) var(--s-10); }
.pp-foot .t-h3 { margin-bottom: var(--s-3); }
.pp-foot p { margin-bottom: var(--s-6); }
.pp-foot-actions { display: flex; flex-wrap: wrap; gap: var(--s-3); }

@media (max-width: 860px) {
  .pp-grid { grid-template-columns: 1fr; gap: var(--s-7); }
  .pp-side { position: static; }
}
@media (max-width: 560px) {
  .pp-resume { display: none; }
}
`;