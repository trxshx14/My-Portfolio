// usePageMeta.js — per-route <title> and meta description (what shows in
// browser tabs, bookmarks, and search/link previews)
import { useEffect } from "react";

export function usePageMeta(title, description) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    let tag = null;
    let prevDesc = null;
    if (description) {
      tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      prevDesc = tag.getAttribute("content");
      tag.setAttribute("content", description);
    }

    return () => {
      document.title = prevTitle;
      if (tag && prevDesc !== null) tag.setAttribute("content", prevDesc);
    };
  }, [title, description]);
}