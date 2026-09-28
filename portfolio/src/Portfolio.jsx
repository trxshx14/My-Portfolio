import { useState, useEffect, useRef } from "react";
import PortfolioChat from "./PortfolioChat";
import { ThemeToggle, useTheme } from "./ThemeToggle";
import { usePageMeta } from "./usePageMeta";
import { MediaFrame } from "./MediaFrame";
import { TransitionLink } from "./TransitionLink";
import { PROFILE, WORKS, STACK, CERTS } from "./projectsData";

// Decorative logo ribbon under the stack grid (the grid holds the real info)
const RIBBON = [
  { slug: "react", name: "React" },
  { slug: "nextdotjs", name: "Next.js" },
  { slug: "typescript", name: "TypeScript" },
  { slug: "javascript", name: "JavaScript" },
  { slug: "tailwindcss", name: "Tailwind CSS" },
  { slug: "threedotjs", name: "React Three Fiber" },
  { slug: "greensock", name: "GSAP" },
  { slug: "springboot", name: "Spring Boot" },
  { slug: "mysql", name: "MySQL" },
  { slug: "supabase", name: "Supabase" },
  { slug: "kotlin", name: "Kotlin" },
  { slug: "git", name: "Git" },
  { slug: "vercel", name: "Vercel" },
];

const NAV = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

const SERVICES = [
  {
    title: "UI/UX Design",
    desc: "User flows, layouts and interaction details designed directly in code — every decision grounded in usability, not just looks.",
  },
  {
    title: "Frontend Development",
    desc: "Responsive, accessible React interfaces that translate the design faithfully into clean, maintainable components.",
  },
  {
    title: "Full-Stack Development",
    desc: "Spring Boot REST APIs, MySQL and role-based access behind a React front end — dashboards and complete systems.",
  },
];

const PATH = [
  {
    when: "Since first year",
    role: "BS Information Technology",
    org: "Cebu Institute of Technology–University",
    text: "Turning OOP, data structures and database design into deployed, well-designed web apps.",
  },
  {
    when: "Two years shipping",
    role: "Frontend Developer & UX/UI Designer",
    org: "Personal & academic projects",
    text: "Designing directly in code: React and Tailwind on the web, Kotlin on Android, Spring Boot and MySQL behind AttendMe, and R3F + GSAP for Aura Beauty.",
  },
  {
    when: "Next",
    role: "Internship, entry-level role or freelance",
    org: "Available now · remote-ready",
    text: "Looking for a team where I can ship real features, learn from people better than me, and keep growing.",
  },
];

const LIVE_COUNT = WORKS.filter((w) => w.demo).length;

/* ---------------- small pieces ---------------- */

function WorkLinks({ w }) {
  return (
    <div className="work-links">
      {w.demo && (
        <a href={w.demo} target="_blank" rel="noreferrer" className="is-primary" aria-label={`${w.title} live demo (opens in new tab)`}>
          Live demo <span aria-hidden="true">↗</span>
        </a>
      )}
      {w.github && (
        <a href={w.github} target="_blank" rel="noreferrer" aria-label={`${w.title} source code on GitHub (opens in new tab)`}>
          Code <span aria-hidden="true">↗</span>
        </a>
      )}
      {w.caseStudy ? (
        <TransitionLink to={w.caseStudy} morph aria-label={`${w.title} case study`}>
          Case study <span aria-hidden="true">→</span>
        </TransitionLink>
      ) : (
        <TransitionLink to={`/projects#${w.slug}`} aria-label={`${w.title} project details`}>
          Details <span aria-hidden="true">→</span>
        </TransitionLink>
      )}
    </div>
  );
}

function WorkBody({ w, headingLevel = 3 }) {
  const H = `h${headingLevel}`;
  return (
    <div className="work-body">
      <div className="work-meta">
        <span>{w.type}</span>
        <span aria-hidden="true">·</span>
        <span>{w.year}</span>
      </div>
      <H className="work-title" data-morph="">
        <TransitionLink
          to={w.caseStudy ?? `/projects#${w.slug}`}
          morph={Boolean(w.caseStudy)}
        >
          {w.title}
        </TransitionLink>
      </H>
      <p className="work-tagline">{w.tagline}</p>
      {w.highlights?.length > 0 && (
        <ul className="work-highlights">
          {w.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}
      <p className="work-stack">
        {w.tags.join(" · ")}
        {w.deploy && <> · live on {w.deploy}</>}
      </p>
      <WorkLinks w={w} />
    </div>
  );
}

/* ---------------- page ---------------- */

export default function Portfolio() {
  const { theme, toggle } = useTheme();
  usePageMeta(
    `${PROFILE.name} — ${PROFILE.role}`,
    `${PROFILE.role} in ${PROFILE.location}. Designed and built directly in code: React, Next.js, Spring Boot and Android. ${PROFILE.availability}.`
  );
  const [active, setActive] = useState("");
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef(null);
  const iconColor = theme === "light" ? "8E4A78" : "D4A6C2";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };
  useEffect(() => () => clearTimeout(copyTimer.current), []);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const siteRef = useRef(null);
  const progressRef = useRef(null);
  const portraitRef = useRef(null);
  const menuBtnRef = useRef(null);

  // Mobile action bar: after the hero, hidden at Contact and while the menu is open
  const showBar = pastHero && active !== "contact" && !menuOpen;

  const featured = WORKS.find((w) => w.featured) ?? WORKS[0];
  const rest = WORKS.filter((w) => w !== featured);

  // Nav background + scroll progress (ref writes, no re-render per pixel)
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setPastHero(window.scrollY > window.innerHeight * 0.7);
      if (progressRef.current) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section in the nav
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["home", ...NAV.map((n) => n.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Scroll reveal — only enabled when JS runs and motion is allowed
  useEffect(() => {
    const site = siteRef.current;
    if (!site || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    site.classList.add("js-reveal");
    const els = site.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            observer.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Mobile menu: lock scroll, close on Escape, return focus
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // Portrait tilt — fine pointers only
  const onPortraitMove = (e) => {
    const el = portraitRef.current;
    if (
      !el ||
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
  };
  const onPortraitLeave = () => {
    if (portraitRef.current) portraitRef.current.style.transform = "";
  };

  // Glass orbs drift gently against the cursor across the whole hero
  const orbsRef = useRef(null);
  const onHeroMove = (e) => {
    const el = orbsRef.current;
    if (
      !el ||
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    el.style.setProperty("--ox", `${x * -28}px`);
    el.style.setProperty("--oy", `${y * -22}px`);
  };
  const onHeroLeave = () => {
    orbsRef.current?.style.setProperty("--ox", "0px");
    orbsRef.current?.style.setProperty("--oy", "0px");
  };

  return (
    <div className="site" ref={siteRef}>
      <style>{CSS}</style>

      <a className="skip-link" href="#work">Skip to work</a>
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />

      {/* ─── NAV ─── */}
      <header className={`nav${scrolled || menuOpen ? " is-scrolled" : ""}`}>
        <div className="container nav-inner">
          <a href="#home" className="logo" onClick={() => setMenuOpen(false)}>
            trisha<em>.dev</em>
          </a>

          <nav aria-label="Primary">
            <ul className="nav-links">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    className="nav-link"
                    aria-current={active === n.id ? "true" : undefined}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-actions">
            <ThemeToggle theme={theme} toggle={toggle} />
            <a href={PROFILE.resume} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm nav-resume">
              Resume <span aria-hidden="true">↗</span>
            </a>
            <a href="#contact" className="btn btn-primary btn-sm nav-cta">
              Let's talk
            </a>
            <button
              ref={menuBtnRef}
              type="button"
              className="menu-btn"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className={`menu-icon${menuOpen ? " is-open" : ""}`} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div id="mobile-menu" className="mobile-menu">
          <nav aria-label="Mobile">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="m-link" onClick={() => setMenuOpen(false)}>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="m-actions">
            <a href={PROFILE.resume} target="_blank" rel="noreferrer" className="btn btn-primary">
              Resume <span aria-hidden="true">↗</span>
            </a>
            <a href={`mailto:${PROFILE.email}`} className="btn btn-ghost">Email me</a>
          </div>
          <p className="m-note">{PROFILE.availabilityShort}</p>
        </div>
      )}

      <main>
        {/* ─── HERO ─── */}
        <section
          id="home"
          className="hero-section"
          aria-labelledby="hero-title"
          onMouseMove={onHeroMove}
          onMouseLeave={onHeroLeave}
        >
          <div className="container hero">
            <div className="hero-copy">
              <p className="eyebrow hero-role rise">{PROFILE.role}</p>
              <h1 id="hero-title" className="t-h1 rise d1">
                <span className="h1-line">A builder who <span className="it">designs.</span></span>{" "}
                <span className="h1-line">A designer who <em>ships.</em></span>
              </h1>
              <p className="hero-lede rise d2">
                I'm <strong>{PROFILE.name}</strong>. I design and build directly in code, from first
                idea to production.
              </p>
              <p className="status rise d2">
                <span className="status-dot" aria-hidden="true" />
                {PROFILE.availability} · Remote, {PROFILE.timezone}
              </p>
              <div className="hero-actions rise d3">
                <a href="#work" className="btn btn-primary">
                  See selected work <span aria-hidden="true">↓</span>
                </a>
                {/* Phones only: on desktop the Resume button is always in the nav */}
                <a href={PROFILE.resume} target="_blank" rel="noreferrer" className="btn btn-ghost hero-resume">
                  Resume <span aria-hidden="true">↗</span>
                </a>
                <span className="hero-social">
                  <a href={PROFILE.github} target="_blank" rel="noreferrer" className="text-link">
                    GitHub <span aria-hidden="true">↗</span>
                  </a>
                  <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="text-link">
                    LinkedIn <span aria-hidden="true">↗</span>
                  </a>
                </span>
              </div>
              <dl className="stats rise d4">
                <div className="stat">
                  <dt className="stat-label">Live deployments</dt>
                  <dd className="stat-num">{LIVE_COUNT}</dd>
                </div>
                <div className="stat">
                  <dt className="stat-label">Platforms shipped</dt>
                  <dd className="stat-num">Web + Android</dd>
                </div>
                <div className="stat">
                  <dt className="stat-label">Full-class attendance</dt>
                  <dd className="stat-num">&lt;1 min</dd>
                </div>
              </dl>
            </div>

            <figure
              className="portrait-frame rise d2"
              ref={portraitRef}
              onMouseMove={onPortraitMove}
              onMouseLeave={onPortraitLeave}
            >
              <div className="portrait-wrap">
                <img
                  className="portrait"
                  src="/Trisha-profile.jpg"
                  alt={`Portrait of ${PROFILE.name}`}
                  width="760"
                  height="950"
                  fetchPriority="high"
                />
              </div>
              <div className="hero-orbs" ref={orbsRef} aria-hidden="true">
                <span className="glass-orb glass-orb--lg" />
                <span className="glass-orb glass-orb--sm" />
              </div>
            </figure>
          </div>
        </section>

        {/* ─── ABOUT ─── */}
        <section id="about" className="section section--alt" aria-labelledby="about-title">
          <div className="container">
            <div className="about-grid">
              <div className="about-copy" data-reveal>
                <p className="eyebrow">About</p>
                <h2 id="about-title" className="t-h2">
                  Design and code aren't two jobs. <em>They're one craft.</em>
                </h2>
                <p>
                  I'm a frontend developer and UX/UI designer based in the Philippines, building
                  responsive web and mobile products. I care about <strong>clean code and
                  thoughtful UX</strong> in equal measure — the interface should feel obvious, and
                  the code behind it should be easy to trust.
                </p>
                <p>
                  Whether it's a Spring Boot REST API or a pixel-careful interface, I bring
                  the same intentionality to both. I'm currently looking for an{" "}
                  <strong>internship, entry-level role or freelance project</strong> where I can
                  contribute and grow.
                </p>
              </div>

              <dl className="facts" data-reveal>
                <div className="fact">
                  <dt>Role</dt>
                  <dd>{PROFILE.role}</dd>
                </div>
                <div className="fact">
                  <dt>Based in</dt>
                  <dd>{PROFILE.location} · {PROFILE.timezone}</dd>
                </div>
                <div className="fact">
                  <dt>Education</dt>
                  <dd>BS Information Technology · CIT-U</dd>
                </div>
                <div className="fact">
                  <dt>Open to</dt>
                  <dd>{PROFILE.availabilityShort}</dd>
                </div>
              </dl>
            </div>

            <h3 className="eyebrow sub-eyebrow" data-reveal>How I can help</h3>
            <div className="services">
              {SERVICES.map((s) => (
                <div key={s.title} className="service" data-reveal>
                  <h4 className="service-title">{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="about-lower">
              <div data-reveal>
                <h3 className="eyebrow sub-eyebrow">Path</h3>
                <ol className="timeline">
                  {PATH.map((p) => (
                    <li key={p.role}>
                      <p className="tl-when">{p.when}</p>
                      <p className="tl-role">{p.role}</p>
                      <p className="tl-org">{p.org}</p>
                      <p className="tl-text">{p.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
              <div data-reveal>
                <h3 className="eyebrow sub-eyebrow">Certifications</h3>
                <ul className="certs">
                  {CERTS.map((c) => (
                    <li key={c.name} className="cert">
                      <span>
                        <span className="cert-name">{c.name}</span>
                        <span className="cert-issuer">{c.issuer}</span>
                      </span>
                      <span className="cert-year">{c.year}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── WORK ─── */}
        <section id="work" className="section" aria-labelledby="work-title">
          <div className="container">
            <header className="section-head" data-reveal>
              <p className="eyebrow">Selected work</p>
              <h2 id="work-title" className="t-h2">
                Designed in code. <em>Shipped always.</em>
              </h2>
              <p className="section-intro">
                {LIVE_COUNT} live products, each designed and built straight in code, from first idea to deploy — design and
                engineering by the same hands.
              </p>
            </header>

            <article className="work-featured" data-reveal data-morph-scope>
              <MediaFrame work={featured} eager />
              <WorkBody w={featured} />
            </article>

            <div className="work-grid">
              {rest.map((w) => (
                <article key={w.slug} className="work-card" data-reveal data-morph-scope>
                  <MediaFrame work={w} />
                  <WorkBody w={w} />
                </article>
              ))}
            </div>

            <div className="section-foot" data-reveal>
              <TransitionLink to="/projects" className="btn btn-ghost">
                All project details <span aria-hidden="true">→</span>
              </TransitionLink>
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="text-link">
                More on GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* ─── EDITORIAL PAUSE ─── */}
        <section className="pause" aria-label="Design philosophy">
          <div className="container">
            <span className="pause-mark" aria-hidden="true" />
            <p className="pause-line">
              Every pixel considered. <em>Every line shipped.</em>
            </p>
          </div>
        </section>

        {/* ─── STACK ─── */}
        <section id="stack" className="section section--alt" aria-labelledby="stack-title">
          <div className="container">
            <header className="section-head" data-reveal>
              <p className="eyebrow">Stack</p>
              <h2 id="stack-title" className="t-h2">
                Tools I've <em>shipped with.</em>
              </h2>
              <p className="section-intro">Every skill below points to the project that proves it.</p>
            </header>

            <div className="stack-grid">
              {STACK.map((g) => (
                <div key={g.group} className="stack-col" data-reveal>
                  <h3 className="stack-group">{g.group}</h3>
                  <ul className="stack-list">
                    {g.items.map(([name, proof]) => (
                      <li key={name}>
                        <span className="stack-name">{name}</span>
                        <span className="stack-proof">{proof}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="ribbon" aria-hidden="true">
              <div className="ribbon-track">
                {[...RIBBON, ...RIBBON].map((t, i) => (
                  <span key={`${t.slug}-${i}`} className={`ribbon-item${i >= RIBBON.length ? " is-dup" : ""}`}>
                    <img
                      src={`https://cdn.simpleicons.org/${t.slug}/${iconColor}`}
                      alt=""
                      width="18"
                      height="18"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                    {t.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── CONTACT ─── */}
        <section id="contact" className="section" aria-labelledby="contact-title">
          <div className="container contact">
            <div data-reveal>
              <p className="eyebrow">Contact</p>
              <h2 id="contact-title" className="t-h2">
                Let's build something <em>together.</em>
              </h2>
              <p className="contact-lede">
                {PROFILE.availability}. Pick whatever works best for you — I reply within 24
                hours.
              </p>
              <div className="contact-actions">
                <a href={`mailto:${PROFILE.email}`} className="btn btn-primary">
                  Email me
                </a>
                <button type="button" className="btn btn-ghost" onClick={copyEmail}>
                  {copied ? "Copied ✓" : "Copy email"}
                </button>
                <span className="visually-hidden" role="status" aria-live="polite">
                  {copied ? "Email address copied to clipboard" : ""}
                </span>
              </div>
            </div>

            <ul className="contact-list" data-reveal>
              {[
                { ch: "Email", addr: PROFILE.email, href: `mailto:${PROFILE.email}` },
                { ch: "LinkedIn", addr: PROFILE.linkedinHandle, href: PROFILE.linkedin, ext: true },
                { ch: "GitHub", addr: PROFILE.githubHandle, href: PROFILE.github, ext: true },
                { ch: "Resume", addr: "Download PDF", href: PROFILE.resume, ext: true },
              ].map((c) => (
                <li key={c.ch}>
                  <a
                    href={c.href}
                    className="contact-row"
                    {...(c.ext ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    <span className="contact-ch">{c.ch}</span>
                    <span className="contact-addr">{c.addr}</span>
                    <span className="contact-arrow" aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="footer">
        <div className="container footer-inner">
          <span className="logo">
            trisha<em>.dev</em>
          </span>
          <span>© 2026 {PROFILE.name}</span>
          <a href="#home" className="text-link">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </footer>

      {/* ─── MOBILE ACTION BAR ─── */}
      <div className={`action-bar${showBar ? " is-visible" : ""}`} aria-hidden={!showBar}>
        <a
          href={PROFILE.resume}
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary btn-sm"
          tabIndex={showBar ? 0 : -1}
        >
          Resume <span aria-hidden="true">↗</span>
        </a>
        <a href={`mailto:${PROFILE.email}`} className="btn btn-ghost btn-sm" tabIndex={showBar ? 0 : -1}>
          Email me
        </a>
      </div>

      <PortfolioChat />
    </div>
  );
}

/* ---------------- page styles (tokens live in index.css) ---------------- */

const CSS = `
.site { position: relative; overflow-x: clip; }

.scroll-progress {
  position: fixed; top: 0; left: 0; right: 0; height: 2px; z-index: 101;
  background: var(--accent); opacity: 0.7;
  transform-origin: 0 50%; transform: scaleX(0);
}

/* ── nav ── */
.nav {
  position: fixed; inset: 0 0 auto; z-index: 100;
  height: var(--nav-h); display: flex; align-items: center;
  border-bottom: 1px solid transparent;
  transition: background-color .35s var(--ease), border-color .35s var(--ease);
}
.nav.is-scrolled {
  background: var(--nav-bg);
  -webkit-backdrop-filter: blur(16px) saturate(1.2);
  backdrop-filter: blur(16px) saturate(1.2);
  border-bottom-color: var(--line);
}
.nav-inner { display: flex; align-items: center; justify-content: space-between; gap: var(--s-5); }
.logo {
  font: 500 var(--fs-sm)/1 var(--sans); letter-spacing: .01em;
  color: var(--text); text-decoration: none;
}
.logo em {
  font-family: var(--serif); font-style: italic; font-size: 1.2em;
  font-variation-settings: "SOFT" 100, "WONK" 0; color: var(--accent);
}
.nav-links { display: flex; gap: var(--s-6); }
.nav-link {
  position: relative; display: inline-block; padding: var(--s-2) 0;
  font-size: var(--fs-sm); color: var(--text-2); text-decoration: none;
  transition: color .2s var(--ease);
}
.nav-link:hover, .nav-link[aria-current="true"] { color: var(--text); }
.nav-link[aria-current="true"]::after {
  content: ''; position: absolute; left: 50%; bottom: -2px;
  width: 4px; height: 4px; border-radius: 50%;
  background: var(--accent); transform: translateX(-50%);
}
.nav-actions { display: flex; align-items: center; gap: var(--s-3); }

.menu-btn {
  display: none; width: 40px; height: 40px; border-radius: 50%;
  border: 1px solid var(--line-strong); background: transparent;
  align-items: center; justify-content: center;
}
.menu-icon, .menu-icon::before, .menu-icon::after {
  display: block; width: 16px; height: 1.5px; border-radius: 2px;
  background: var(--text); transition: transform .3s var(--ease), background-color .2s;
}
.menu-icon { position: relative; }
.menu-icon::before, .menu-icon::after { content: ''; position: absolute; left: 0; }
.menu-icon::before { transform: translateY(-5px); }
.menu-icon::after { transform: translateY(5px); }
.menu-icon.is-open { background: transparent; }
.menu-icon.is-open::before { transform: rotate(45deg); }
.menu-icon.is-open::after { transform: rotate(-45deg); }

.mobile-menu {
  position: fixed; inset: 0; z-index: 99; overflow-y: auto;
  background: var(--bg);
  padding: calc(var(--nav-h) + var(--s-6)) var(--gutter) var(--s-7);
  display: flex; flex-direction: column;
  animation: rise .35s var(--ease) both;
}
.mobile-menu nav { display: flex; flex-direction: column; }
.m-link {
  font-family: var(--serif); font-size: 2rem; font-weight: 360;
  font-variation-settings: "SOFT" 50, "WONK" 0;
  color: var(--text); text-decoration: none;
  padding: var(--s-3) 0; border-bottom: 1px solid var(--line);
}
.m-actions { display: flex; flex-wrap: wrap; gap: var(--s-3); margin-top: var(--s-7); }
.m-note { margin-top: var(--s-5); font-size: var(--fs-sm); color: var(--text-3); }

/* ── hero ── */
.hero-section { position: relative; isolation: isolate; scroll-margin-top: 0; }
.hero-section::before {
  content: ''; position: absolute; z-index: -1; pointer-events: none;
  width: min(960px, 130vw); aspect-ratio: 1;
  right: -18%; top: -28%;
  background: radial-gradient(closest-side, var(--glow), transparent);
}
.hero {
  min-height: 100svh;
  display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, .7fr);
  gap: var(--s-8);
  align-content: center;   /* the whole composition sits centered in the viewport */
  align-items: start;      /* …but both columns share one top edge */
  padding-top: calc(var(--nav-h) + var(--s-6));
  padding-bottom: var(--s-7);
}
.hero-role { margin-bottom: var(--s-5); }
.hero .t-h1 {
  font-size: clamp(2.75rem, 1.2rem + 3.4vw, 4rem);
  text-wrap: wrap;
  margin-bottom: var(--s-6);
}
.hero .t-h1 .h1-line { display: block; }
@media (min-width: 1100px) {
  .hero .t-h1 .h1-line { white-space: nowrap; }  /* each sentence on one line */
}
.hero .t-h1 .it { color: var(--text); }
.hero-lede { font-size: var(--fs-lead); line-height: 1.6; max-width: 38ch; margin-bottom: var(--s-5); }
.hero-lede strong { color: var(--text); font-weight: 500; }
.status {
  display: flex; align-items: center; gap: var(--s-3);
  font-size: var(--fs-sm); color: var(--text-2); margin-bottom: var(--s-6);
}
.status-dot {
  --pulse: var(--ok);
  width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; background: var(--ok);
  animation: pulse-ring 2.6s var(--ease) infinite;
}
.hero-actions { display: flex; flex-wrap: wrap; align-items: center; gap: var(--s-3); margin-bottom: var(--s-7); }
.hero-social { display: inline-flex; gap: var(--s-5); margin-left: var(--s-3); }
@media (min-width: 761px) { .hero-resume { display: none; } }

.stats {
  display: grid; grid-template-columns: repeat(3, auto); justify-content: start;
  gap: var(--s-7); padding-top: var(--s-5); border-top: 1px solid var(--line);
}
.stat { display: flex; flex-direction: column-reverse; gap: var(--s-1); }
.stat-num {
  font-family: var(--serif); font-size: 1.625rem; font-weight: 380; line-height: 1.15;
  font-variation-settings: "SOFT" 50, "WONK" 0; color: var(--text);
}
.stat-label { font-size: var(--fs-label); color: var(--text-3); letter-spacing: .02em; }

.portrait-frame {
  position: relative; justify-self: end; width: min(360px, 100%);
  /* line the photo up with the top of the headline (skips the eyebrow above it) */
  margin-top: calc(var(--fs-label) * 1.2 + var(--s-5) + 0.35rem);
  transition: transform .6s var(--ease); will-change: transform;
}
.portrait-frame::before {
  content: ''; position: absolute; inset: 7% -6% -5% 9%; z-index: -1;
  border-radius: var(--radius-lg);
  background: var(--accent-tint); border: 1px solid var(--line-strong);
}
.portrait-wrap {
  position: relative; z-index: 1;
  border-radius: var(--radius-lg); overflow: hidden;
  background: var(--surface-1); box-shadow: var(--shadow);
}
.portrait { width: 100%; aspect-ratio: 4 / 5; object-fit: cover; object-position: center top; }
.portrait-caption { margin-top: var(--s-5); font-size: var(--fs-label); color: var(--text-3); letter-spacing: .02em; }

/* frosted-glass orbs: the hero's signature detail */
.hero-orbs {
  position: absolute; inset: 0; z-index: 2; pointer-events: none;
  transform: translate3d(var(--ox, 0px), var(--oy, 0px), 0);
  transition: transform 1.4s var(--ease);
}
.glass-orb {
  position: absolute; border-radius: 50%;
  background:
    /* main specular highlight: bright core, soft falloff */
    radial-gradient(circle at 31% 25%, rgba(255, 255, 255, .95) 0 3.5%, rgba(255, 255, 255, .45) 7%, rgba(255, 255, 255, 0) 19%),
    /* broad sheen across the upper half */
    radial-gradient(ellipse 70% 45% at 42% 22%, rgba(255, 255, 255, .22), transparent 70%),
    /* secondary reflection, lower right */
    radial-gradient(circle at 72% 80%, rgba(255, 255, 255, .3) 0 4%, transparent 14%),
    /* colored light passing through the glass */
    radial-gradient(circle at 68% 76%, color-mix(in srgb, var(--accent) 55%, transparent), transparent 52%),
    /* body: clear center, denser tinted edge */
    radial-gradient(circle at 50% 50%,
      color-mix(in srgb, var(--accent) 10%, transparent) 0%,
      color-mix(in srgb, var(--plum) 32%, transparent) 64%,
      color-mix(in srgb, var(--accent) 50%, transparent) 94%,
      color-mix(in srgb, var(--accent) 24%, transparent) 100%);
  border: 1px solid rgba(255, 255, 255, .16);
  -webkit-backdrop-filter: blur(12px) saturate(1.6) brightness(1.05);
  backdrop-filter: blur(12px) saturate(1.6) brightness(1.05);
  box-shadow:
    /* rim light */
    inset 0 1.5px 3px rgba(255, 255, 255, .45),
    inset 0 0 0 1px rgba(255, 255, 255, .06),
    /* depth */
    inset -12px -16px 30px color-mix(in srgb, var(--plum) 50%, transparent),
    inset 10px 12px 26px rgba(255, 255, 255, .14),
    /* soft glow + contact shadow */
    0 0 40px -8px color-mix(in srgb, var(--accent) 35%, transparent),
    0 26px 50px -24px color-mix(in srgb, var(--plum) 85%, transparent);
  animation: orb-float 7s ease-in-out infinite alternate;
}
.glass-orb--lg { width: clamp(84px, 11vw, 132px); aspect-ratio: 1; left: -14%; top: 9%; }
.glass-orb--sm { width: clamp(38px, 4.4vw, 54px); aspect-ratio: 1; right: -8%; bottom: 20%; animation-duration: 9s; animation-delay: -3s; }
@keyframes orb-float {
  from { transform: translateY(0) rotate(0deg); }
  to   { transform: translateY(-14px) rotate(10deg); }
}

/* ── sections ── */
.section { padding-block: var(--section-y); scroll-margin-top: calc(var(--nav-h) - 1px); }
.section--alt { background: var(--surface-1); }
.section-head { max-width: 720px; margin-bottom: var(--s-8); }
.section-head .eyebrow, .about-copy .eyebrow, .contact .eyebrow { margin-bottom: var(--s-4); }
.section-intro { margin-top: var(--s-4); max-width: 52ch; }
.section-foot { margin-top: var(--s-7); display: flex; flex-wrap: wrap; align-items: center; gap: var(--s-5); }

/* ── work ── */
/* media frames live in index.css (shared); these are the card-specific touches */
.work-featured:hover .frame-screen img, .work-featured:hover .frame-screen video,
.work-card:hover .frame-screen img, .work-card:hover .frame-screen video { transform: scale(1.025); }
.work-featured .media-mat { border-color: transparent; }

.work-featured {
  display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  gap: var(--s-7); align-items: center;
  padding: var(--s-4); margin-bottom: var(--s-8);
  border-radius: var(--radius-lg); background: var(--surface-1);
  border: 1px solid var(--line); box-shadow: var(--shadow);
}
.work-featured .work-body { padding: var(--s-5) var(--s-5) var(--s-5) 0; }
.work-featured .work-title { font-size: var(--fs-h2); }

.work-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--s-8) var(--s-6);
}
.work-card { display: flex; flex-direction: column; }
.work-card .media-mat { margin-bottom: var(--s-5); }
.work-card .work-body { display: flex; flex-direction: column; flex: 1; }
.work-card .work-links { margin-top: auto; }

.work-meta {
  display: flex; flex-wrap: wrap; gap: var(--s-2);
  font-size: var(--fs-label); font-weight: 500; letter-spacing: .08em; text-transform: uppercase;
  color: var(--text-3); margin-bottom: var(--s-3);
}
.work-title {
  font-family: var(--serif); font-size: var(--fs-h3); font-weight: 380;
  line-height: 1.1; letter-spacing: -.015em;
  font-variation-settings: "SOFT" 50, "WONK" 0; margin-bottom: var(--s-3);
}
.work-title a {
  color: inherit; text-decoration: none;
  background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat;
  transition: background-size .45s var(--ease);
}
.work-title a:hover { background-size: 100% 1px; }
.work-tagline { color: var(--text-2); margin-bottom: var(--s-5); max-width: 46ch; }
.work-highlights { display: grid; gap: var(--s-2); margin-bottom: var(--s-5); }
.work-highlights li {
  position: relative; padding-left: var(--s-5);
  font-size: var(--fs-sm); line-height: 1.55; color: var(--text-2);
}
.work-highlights li::before {
  content: ''; position: absolute; left: 3px; top: .6em;
  width: 5px; height: 5px; border-radius: 50%; border: 1px solid var(--text-3);
}
.work-stack {
  font-family: var(--mono); font-size: var(--fs-label); line-height: 1.7;
  color: var(--text-3); margin-bottom: var(--s-5);
}
.work-links { display: flex; flex-wrap: wrap; gap: var(--s-2) var(--s-5); }
.work-links a {
  display: inline-flex; gap: 6px; align-items: center; padding: 6px 0;
  font-size: var(--fs-sm); font-weight: 500; color: var(--text); text-decoration: none;
  border-bottom: 1px solid var(--line-strong);
  transition: color .2s var(--ease), border-color .2s var(--ease);
}
.work-links a.is-primary { color: var(--accent); }
.work-links a:hover { color: var(--accent); border-color: var(--accent); }

/* ── stack ── */
.stack-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: var(--s-7) var(--s-6); }
.stack-group {
  font: 500 var(--fs-label)/1.2 var(--sans); letter-spacing: .08em; text-transform: uppercase;
  color: var(--text-3); padding-bottom: var(--s-4); border-bottom: 1px solid var(--line);
}
.stack-list li { display: flex; flex-direction: column; padding-block: var(--s-3); border-bottom: 1px solid var(--line); }
.stack-name { color: var(--text); font-weight: 500; }
.stack-proof { font-size: var(--fs-sm); color: var(--text-3); }

/* ── about ── */
.about-grid {
  display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  gap: var(--s-8); align-items: end; margin-bottom: var(--s-9);
}
.about-copy .t-h2 { margin-bottom: var(--s-6); }
.about-copy p + p { margin-top: var(--s-4); }
.about-copy strong { color: var(--text); font-weight: 500; }
.fact {
  display: grid; grid-template-columns: 6.5rem 1fr; gap: var(--s-4);
  padding-block: var(--s-4); border-bottom: 1px solid var(--line);
}
.fact:first-child { border-top: 1px solid var(--line); }
.fact dt {
  font-size: var(--fs-label); font-weight: 500; letter-spacing: .08em; text-transform: uppercase;
  color: var(--text-3); padding-top: 3px;
}
.fact dd { font-size: .9375rem; color: var(--text); }

.sub-eyebrow { margin-bottom: var(--s-5); }
.section--alt { --card-bg: var(--bg); --dot-bg: var(--surface-1); }
.services { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--s-5); margin-bottom: var(--s-9); }
.service {
  padding: var(--s-6); border-radius: var(--radius-md);
  background: var(--card-bg, var(--surface-1)); border: 1px solid var(--line);
  transition: border-color .3s var(--ease), transform .3s var(--ease);
}
.service:hover { border-color: var(--line-strong); transform: translateY(-2px); }
.service-title {
  font-family: var(--serif); font-size: 1.375rem; font-weight: 400;
  font-variation-settings: "SOFT" 50, "WONK" 0; margin-bottom: var(--s-3);
}
.service p { font-size: var(--fs-sm); line-height: 1.65; }

.about-lower { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr); gap: var(--s-8); }
.timeline li { position: relative; padding: 0 0 var(--s-6) var(--s-6); }
.timeline li::before {
  content: ''; position: absolute; left: 0; top: 6px;
  width: 9px; height: 9px; border-radius: 50%;
  background: var(--dot-bg, var(--bg)); border: 1.5px solid var(--accent);
}
.timeline li::after {
  content: ''; position: absolute; left: 4px; top: 22px; bottom: 4px;
  width: 1px; background: var(--line);
}
.timeline li:last-child { padding-bottom: 0; }
.timeline li:last-child::after { display: none; }
/* "Next" — the one living dot in an otherwise still timeline */
.timeline li:last-child::before { background: var(--accent); animation: pulse-ring 2.6s var(--ease) infinite; }
.tl-when { font-size: var(--fs-label); font-weight: 500; letter-spacing: .08em; text-transform: uppercase; color: var(--text-3); }
.tl-role {
  font-family: var(--serif); font-size: 1.3rem; font-weight: 400; color: var(--text);
  font-variation-settings: "SOFT" 50, "WONK" 0; margin-top: var(--s-1);
}
.tl-org { font-size: var(--fs-sm); color: var(--text-3); }
.tl-text { font-size: var(--fs-sm); margin-top: var(--s-2); max-width: 54ch; }

.cert {
  display: flex; justify-content: space-between; align-items: baseline; gap: var(--s-4);
  padding-block: var(--s-4); border-bottom: 1px solid var(--line);
}
.cert:first-child { border-top: 1px solid var(--line); }
.cert-name { display: block; color: var(--text); font-weight: 500; font-size: .9375rem; }
.cert-issuer { display: block; font-size: var(--fs-sm); color: var(--text-3); }
.cert-year { font-family: var(--mono); font-size: var(--fs-label); color: var(--text-3); }

/* ── contact ── */
.contact { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); gap: var(--s-8); align-items: start; }
.contact .t-h2 { margin-bottom: var(--s-4); }
.contact-lede { margin-bottom: var(--s-6); max-width: 40ch; }
.contact-row {
  display: grid; grid-template-columns: 5.5rem minmax(0, 1fr) auto; gap: var(--s-4); align-items: center;
  padding-block: var(--s-5); border-bottom: 1px solid var(--line);
  color: inherit; text-decoration: none;
}
.contact-list li:first-child .contact-row { border-top: 1px solid var(--line); }
.contact-ch { font-size: var(--fs-label); font-weight: 500; letter-spacing: .08em; text-transform: uppercase; color: var(--text-3); }
.contact-addr {
  font-family: var(--serif); font-size: clamp(1.0625rem, 1rem + .5vw, 1.375rem); font-weight: 380;
  font-variation-settings: "SOFT" 50, "WONK" 0; color: var(--text);
  overflow-wrap: anywhere; transition: color .2s var(--ease);
}
.contact-arrow { color: var(--text-3); transition: transform .3s var(--ease), color .2s var(--ease); }
.contact-row:hover .contact-addr, .contact-row:hover .contact-arrow { color: var(--accent); }
.contact-row:hover .contact-arrow { transform: translate(3px, -3px); }

/* ── footer ── */
.footer { padding-block: var(--s-6); border-top: 1px solid var(--line); }
.footer-inner {
  display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center;
  gap: var(--s-4); font-size: var(--fs-sm); color: var(--text-3);
}

/* ── stack ribbon (decorative marquee) ── */
.ribbon {
  margin-top: var(--s-8); overflow: hidden; padding-block: var(--s-1);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}
.ribbon-track {
  display: flex; gap: var(--s-3); width: max-content;
  animation: ribbon 60s linear infinite;
}
.ribbon:hover .ribbon-track { animation-play-state: paused; }
@keyframes ribbon { to { transform: translateX(calc(-50% - var(--s-3) / 2)); } }
.ribbon-item {
  display: inline-flex; align-items: center; gap: var(--s-2);
  padding: 10px 18px; border-radius: var(--radius-pill);
  background: var(--bg); border: 1px solid var(--line);
  font-size: var(--fs-sm); color: var(--text-2); white-space: nowrap;
  transition: border-color .25s var(--ease), color .25s var(--ease);
}
.ribbon-item:hover { border-color: var(--line-strong); color: var(--text); }
.ribbon-item img { width: 18px; height: 18px; object-fit: contain; }

/* ── mobile action bar ── */
.action-bar { display: none; }
@media (max-width: 760px) {
  .action-bar {
    display: flex; gap: var(--s-2);
    position: fixed; z-index: 150;
    left: 16px; right: 80px;               /* leaves room for the chat button */
    bottom: calc(16px + env(safe-area-inset-bottom, 0px));
    padding: 6px; border-radius: var(--radius-pill);
    background: var(--nav-bg);
    -webkit-backdrop-filter: blur(16px) saturate(1.2);
    backdrop-filter: blur(16px) saturate(1.2);
    border: 1px solid var(--line-strong);
    box-shadow: 0 16px 40px -18px rgba(0, 0, 0, .5);
    transform: translateY(calc(100% + 32px)); opacity: 0; pointer-events: none;
    transition: transform .55s var(--ease), opacity .3s var(--ease);
  }
  .action-bar.is-visible { transform: none; opacity: 1; pointer-events: auto; }
  .action-bar .btn { flex: 1; min-height: 40px; }
  .footer { padding-bottom: calc(var(--s-6) + 72px); }
}

/* ── editorial pause ── */
.pause {
  position: relative; isolation: isolate; text-align: center;
  padding-block: clamp(80px, 12vw, 176px);
}
.pause::before {
  content: ''; position: absolute; z-index: -1; pointer-events: none;
  left: 50%; top: 50%; width: min(760px, 110vw); aspect-ratio: 2 / 1;
  transform: translate(-50%, -50%);
  background: radial-gradient(closest-side, color-mix(in srgb, var(--plum) 30%, transparent), transparent);
}
.pause-mark {
  display: block; width: 10px; height: 10px; margin: 0 auto var(--s-6); border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #fff 0 12%, var(--accent) 45%, var(--plum) 100%);
  box-shadow: 0 0 18px color-mix(in srgb, var(--accent) 50%, transparent);
}
.pause-line {
  margin-inline: auto; max-width: 18ch;
  font-family: var(--serif); font-weight: 340; font-optical-sizing: auto;
  font-variation-settings: "SOFT" 50, "WONK" 0;
  font-size: clamp(2rem, 1.1rem + 3.6vw, 4rem); line-height: 1.12; letter-spacing: -.02em;
  color: var(--text); text-wrap: balance;
}
.pause-line em { font-style: italic; font-variation-settings: "SOFT" 100, "WONK" 0; color: var(--accent); }
/* Browsers with scroll-driven animations: the line comes into focus as it scrolls in */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .pause-line {
      animation: pause-focus linear both;
      animation-timeline: view();
      animation-range: entry 5% cover 42%;
    }
    @keyframes pause-focus {
      from { opacity: .12; transform: translateY(28px); filter: blur(6px); }
      to   { opacity: 1; transform: none; filter: none; }
    }
  }
}

/* ── contact actions ── */
.contact-actions { display: flex; flex-wrap: wrap; gap: var(--s-3); }
.contact-actions .btn-ghost { min-width: 128px; }

/* ── hover slides (transform only — no layout work per frame) ── */
.work-featured, .work-card { transition: transform .5s var(--ease); }
.work-body { transition: transform .5s var(--ease); }
.work-links a span, .contact-arrow { display: inline-block; }
@media (hover: hover) and (pointer: fine) {
  .work-featured:hover .work-body,
  .work-card:hover .work-body { transform: translateX(10px); }
  .work-card:hover { transform: translateY(-4px); }
  .work-links a span { transition: transform .3s var(--ease); }
  .work-links a:hover span { transform: translate(3px, -2px); }

  .contact-addr { transition: color .2s var(--ease), transform .45s var(--ease); }
  .contact-row:hover .contact-addr { transform: translateX(12px); }

  .stack-list li { transition: transform .35s var(--ease); }
  .stack-list li:hover { transform: translateX(6px); }
  .stack-list li:hover .stack-name { color: var(--accent); }
  .stack-name { transition: color .2s var(--ease); }
}

@media (prefers-reduced-motion: reduce) {
  .ribbon { -webkit-mask-image: none; mask-image: none; }
  .ribbon-track { animation: none; flex-wrap: wrap; width: auto; }
  .ribbon-item.is-dup { display: none; }
}

/* ── responsive ── */
@media (max-width: 1000px) {
  .stack-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .work-featured { grid-template-columns: 1fr; gap: var(--s-5); }
  .work-featured .work-body { padding: 0 var(--s-3) var(--s-4); }
}
@media (max-width: 900px) {
  .hero { grid-template-columns: 1fr; min-height: 0; gap: var(--s-8); padding-top: calc(var(--nav-h) + var(--s-8)); }
  .portrait-frame { justify-self: start; width: min(320px, 82%); margin-top: 0; }
  .about-grid, .about-lower, .contact { grid-template-columns: 1fr; gap: var(--s-7); }
  .services { grid-template-columns: 1fr; }
}
@media (max-width: 760px) {
  .nav-links, .nav-resume, .nav-cta { display: none; }
  .menu-btn { display: inline-flex; }
  .stats { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--s-4); }
  .stat-num { font-size: 1.25rem; }
  .hero-social { margin-left: 0; width: 100%; }
  .stack-grid { grid-template-columns: 1fr; gap: var(--s-6); }
  .fact { grid-template-columns: 1fr; gap: var(--s-1); }
  .contact-row { grid-template-columns: minmax(0, 1fr) auto; }
  .contact-ch { display: none; }
  .footer-inner { flex-direction: column; align-items: flex-start; }
}
`;