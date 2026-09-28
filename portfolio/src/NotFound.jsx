import { TransitionLink as Link } from "./TransitionLink";
import { ThemeToggle, useTheme } from "./ThemeToggle";
import { usePageMeta } from "./usePageMeta";
import { PROFILE } from "./projectsData";

export default function NotFound() {
  const { theme, toggle } = useTheme();
  usePageMeta(`Page not found — ${PROFILE.name}`);

  return (
    <div className="nf">
      <style>{CSS}</style>
      <div className="nf-top">
        <Link to="/" className="nf-logo">
          trisha<em>.dev</em>
        </Link>
        <ThemeToggle theme={theme} toggle={toggle} />
      </div>
      <main className="nf-main rise">
        <p className="eyebrow">404</p>
        <h1 className="t-h1">
          This page <em>wandered off.</em>
        </h1>
        <p className="lead">The link may be old, or the page may have moved. The work is still right here.</p>
        <div className="nf-actions">
          <Link to="/" className="btn btn-primary">Back home</Link>
          <Link to="/projects" className="btn btn-ghost">
            See projects <span aria-hidden="true">→</span>
          </Link>
        </div>
      </main>
    </div>
  );
}

const CSS = `
.nf { min-height: 100svh; display: flex; flex-direction: column; position: relative; isolation: isolate; overflow: hidden; }
.nf::before {
  content: ''; position: absolute; z-index: -1; pointer-events: none;
  width: min(900px, 130vw); aspect-ratio: 1; right: -20%; top: -30%;
  background: radial-gradient(closest-side, var(--glow), transparent);
}
.nf-top {
  display: flex; justify-content: space-between; align-items: center;
  height: var(--nav-h); padding-inline: var(--gutter);
}
.nf-logo { font: 500 var(--fs-sm)/1 var(--sans); color: var(--text); text-decoration: none; }
.nf-logo em {
  font-family: var(--serif); font-style: italic; font-size: 1.2em;
  font-variation-settings: "SOFT" 100, "WONK" 0; color: var(--accent);
}
.nf-main {
  flex: 1; display: flex; flex-direction: column; justify-content: center;
  width: 100%; max-width: calc(var(--container) + var(--gutter) * 2);
  margin-inline: auto; padding: var(--s-8) var(--gutter) var(--s-10);
}
.nf-main .eyebrow { margin-bottom: var(--s-4); }
.nf-main .t-h1 { max-width: 14ch; margin-bottom: var(--s-5); }
.nf-main .lead { max-width: 44ch; margin-bottom: var(--s-7); }
.nf-actions { display: flex; flex-wrap: wrap; gap: var(--s-3); }
`;