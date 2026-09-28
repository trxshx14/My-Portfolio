// ThemeToggle.jsx — one theme hook + toggle shared by every page.
// Switching themes reveals the new palette in a circle that grows from
// the button (View Transitions API). Browsers without it, and visitors
// with reduced motion, get a soft cross-fade instead.
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

function getInitialTheme() {
  const current = document.documentElement.dataset.theme;
  if (current === "light" || current === "dark") return current;
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* storage blocked — fall through to system preference */
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const toggle = (event) => {
    const next = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    const canAnimate =
      typeof document.startViewTransition === "function" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canAnimate) {
      setTheme(next);
      return;
    }

    // Circle origin: the center of the button that was pressed
    const rect = event?.currentTarget?.getBoundingClientRect?.();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 40;
    const y = rect ? rect.top + rect.height / 2 : 40;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    root.classList.add("theme-vt"); // disables CSS transitions + default fades
    const transition = document.startViewTransition(() => {
      root.dataset.theme = next;
      flushSync(() => setTheme(next));
    });

    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          {
            duration: 650,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      })
      .catch(() => {});

    transition.finished.finally(() => root.classList.remove("theme-vt"));
  };

  return { theme, toggle };
}

export function ThemeToggle({ theme, toggle, className = "theme-btn" }) {
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      className={className}
      onClick={(e) => toggle(e)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      {theme === "dark" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      )}
    </button>
  );
}