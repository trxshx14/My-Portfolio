// TransitionLink.jsx — a <Link> that animates page changes with the
// View Transitions API (Chrome, Edge, Safari 18+). Browsers without it,
// and visitors with reduced motion, get a normal instant navigation.
//
// morph: the clicked card's title (marked data-morph inside a
// data-morph-scope wrapper) flies into the next page's title.
import { flushSync } from "react-dom";
import { Link, useNavigate } from "react-router-dom";

export function TransitionLink({ to, morph = false, onClick, ...props }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    onClick?.(e);
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey || e.ctrlKey || e.shiftKey || e.altKey ||
      props.target === "_blank" ||
      typeof document.startViewTransition !== "function" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return; // let <Link> handle it normally
    }

    e.preventDefault();

    if (morph) {
      const scope = e.currentTarget.closest("[data-morph-scope]");
      const title = scope?.querySelector("[data-morph]");
      if (title) title.style.viewTransitionName = "page-title";
    }

    document.startViewTransition(() => {
      flushSync(() => navigate(to));
    });
  };

  return <Link to={to} onClick={handleClick} {...props} />;
}