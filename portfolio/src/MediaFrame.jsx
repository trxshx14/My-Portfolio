// MediaFrame.jsx — every project visual gets the same treatment:
// a soft mauve mat + a minimal browser frame. Supports a looping
// video (w.video) with the screenshot (w.image) as poster/fallback.
import { useEffect, useRef, useState } from "react";

const hostOf = (url) => {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return "";
  }
};

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function MediaFrame({ work, eager = false, className = "" }) {
  const [failed, setFailed] = useState(false);
  const [inView, setInView] = useState(eager);
  const ref = useRef(null);
  const url = hostOf(work.demo);
  const canPlayVideo = work.video && !reducedMotion();

  // Only load/play video once the frame is near the viewport
  useEffect(() => {
    if (!canPlayVideo || inView || !ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [canPlayVideo, inView]);

  let screen;
  if (canPlayVideo && inView) {
    screen = (
      <video
        src={work.video}
        poster={work.image}
        autoPlay
        muted
        loop
        playsInline
        preload={eager ? "auto" : "metadata"}
        aria-label={`${work.title} in action`}
      />
    );
  } else if (work.image && !failed) {
    screen = (
      <img
        src={work.image}
        alt={`${work.title} interface`}
        width="1600"
        height="1000"
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onError={() => setFailed(true)}
      />
    );
  } else {
    screen = (
      <div className="frame-placeholder" aria-hidden="true">
        <span className="orb" />
        <span className="orb orb-2" />
        <span className="ph-title">{work.title}</span>
      </div>
    );
  }

  return (
    <div className={`media-mat ${className}`} ref={ref}>
      <div className="frame">
        <div className="frame-bar" aria-hidden="true">
          <span className="frame-dots">
            <i />
            <i />
            <i />
          </span>
          {url && <span className="frame-url">{url}</span>}
        </div>
        <div className="frame-screen">{screen}</div>
      </div>
    </div>
  );
}