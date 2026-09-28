import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { initSpotlight } from "./spotlight";

initSpotlight();

// Apply the saved/system theme before React renders, so there is no
// flash of the wrong theme. (For zero flash, also add the inline
// script from the notes to index.html.)
try {
  const saved = localStorage.getItem("theme");
  const theme =
    saved === "light" || saved === "dark"
      ? saved
      : window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
  document.documentElement.dataset.theme = theme;
} catch {
  document.documentElement.dataset.theme = "dark";
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);