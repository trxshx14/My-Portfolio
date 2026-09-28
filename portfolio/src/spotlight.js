// spotlight.js — a faint mauve glow follows the cursor across cards and
// media frames, like light moving over frosted glass. One delegated,
// rAF-throttled listener for the whole app; mouse/trackpad users only.

export const SPOTLIGHT_SELECTOR =
  ".media-mat, .service, .cs-duo-card, .cs-challenge, .cs-glance, .cs-figure";

export function initSpotlight() {
  if (typeof window === "undefined") return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let frame = 0;
  let lastEvent = null;

  const update = () => {
    frame = 0;
    const e = lastEvent;
    const el = e?.target instanceof Element ? e.target.closest(SPOTLIGHT_SELECTOR) : null;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  document.addEventListener(
    "pointermove",
    (e) => {
      lastEvent = e;
      if (!frame) frame = requestAnimationFrame(update);
    },
    { passive: true }
  );
}