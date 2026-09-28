// PortfolioChat.jsx — answers are built from projectsData.js, so they never go stale
import { useState, useRef, useEffect, useId } from "react";
import { PROFILE, WORKS, STACK, CERTS } from "./projectsData";

const workList = WORKS.map((w) => `${w.title} (${w.tagline.replace(/\.$/, "")})`).join("; ");
const stackList = STACK.map((g) => `${g.group}: ${g.items.map(([n]) => n).join(", ")}`).join(". ");

// Order matters: the first entry whose keywords match wins.
const KB = [
  {
    keys: ["available", "availability", "hire", "hiring", "internship", "intern", "freelance", "opportunity", "looking", "job", "role", "open"],
    reply: `Yes — she's ${PROFILE.availability.toLowerCase()}. She's based in ${PROFILE.location} (${PROFILE.timezone}) and works remotely.`,
  },
  {
    keys: ["location", "where", "based", "remote", "philippines", "cebu", "timezone", "time zone"],
    reply: `She's based in ${PROFILE.location} (${PROFILE.timezone}) and is open to remote work worldwide.`,
  },
  {
    keys: ["project", "projects", "work", "built", "portfolio", "aura", "attendme", "pomodoro", "nook", "app", "apps"],
    reply: `She has ${WORKS.length} live projects: ${workList}. Each one has a live demo and source code on the Work section.`,
  },
  {
    keys: ["skill", "skills", "tech", "stack", "language", "languages", "react", "next", "typescript", "spring", "kotlin", "mysql", "tailwind", "javascript", "android", "supabase", "three", "gsap"],
    reply: `Her stack — ${stackList}.`,
  },
  {
    keys: ["experience", "developer", "designer", "worked", "background"],
    reply: "She's a frontend developer and UX/UI designer who designs and builds directly in code, from first idea to production. On AttendMe she built the full stack — a Spring Boot REST API with JWT and role-based access, a MySQL schema, a React web app and an Android client.",
  },
  {
    keys: ["service", "services", "offer", "ux", "ui", "design", "frontend", "fullstack", "full-stack", "full stack"],
    reply: "She offers UI/UX design (user flows, layouts and interactions, designed directly in code), frontend development (responsive, accessible React), and full-stack development (Spring Boot APIs, MySQL, role-based access).",
  },
  {
    keys: ["education", "study", "studies", "school", "university", "degree", "college", "cit", "citu", "information technology"],
    reply: `She's studying ${PROFILE.education}.`,
  },
  {
    keys: ["certificate", "certificates", "certification", "certifications", "google", "kaggle", "asean", "java"],
    reply: `Certifications: ${CERTS.map((c) => `${c.name} (${c.issuer}, ${c.year})`).join(", ")}.`,
  },
  {
    keys: ["contact", "email", "reach", "linkedin", "github", "message", "connect"],
    reply: `Email ${PROFILE.email}, connect on LinkedIn at ${PROFILE.linkedinHandle}, or browse her code at ${PROFILE.githubHandle}. She replies within 24 hours.`,
  },
  {
    keys: ["resume", "cv"],
    reply: "You can open her resume from the Resume button in the navigation, the hero, or the Contact section.",
  },
  {
    keys: ["hello", "hi", "hey", "howdy", "good morning", "good afternoon", "good evening"],
    reply: `Hi there! I'm ${PROFILE.name.split(" ")[0]}'s assistant. Ask me about her projects, stack, availability or how to reach her.`,
  },
  {
    keys: ["who", "trisha", "about", "herself", "tell me"],
    reply: `${PROFILE.name} is a ${PROFILE.role.toLowerCase()} in ${PROFILE.location}. She designs directly in code and ships production apps with React, Spring Boot and Android.`,
  },
];

const FALLBACK = `I'm not sure about that one. You can ask ${PROFILE.name.split(" ")[0]} directly at ${PROFILE.email}.`;

const QUICK_CHIPS = [
  { label: "Projects", msg: "Tell me about her projects" },
  { label: "Stack", msg: "What is her tech stack?" },
  { label: "Available?", msg: "Is she available for hire?" },
  { label: "Contact", msg: "How can I contact her?" },
];

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const MATCHERS = KB.map((entry) => ({
  reply: entry.reply,
  // Whole-word matching, so "it" doesn't fire on "with" and "who" not on "whole"
  re: new RegExp(`\\b(?:${entry.keys.map(escapeRe).join("|")})\\b`, "i"),
}));

function getReply(text) {
  return MATCHERS.find((m) => m.re.test(text))?.reply ?? FALLBACK;
}

export default function PortfolioChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", text: `Hi! I'm ${PROFILE.name.split(" ")[0]}'s assistant. Ask me about her work, stack or availability before reaching out.` },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const toggleRef = useRef(null);
  const timerRef = useRef(null);
  const panelId = useId();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, typing]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const send = (text) => {
    const val = (text ?? input).trim();
    if (!val || typing) return;
    setInput("");
    setMessages((prev) => [...prev, { type: "user", text: val }]);
    setTyping(true);
    timerRef.current = setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { type: "bot", text: getReply(val) }]);
    }, 600 + Math.random() * 400);
  };

  return (
    <>
      <style>{CSS}</style>

      <button
        ref={toggleRef}
        type="button"
        className="chat-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        aria-expanded={open}
        aria-controls={panelId}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        )}
      </button>

      {open && (
        <div id={panelId} className="chat-panel" role="dialog" aria-label={`Chat with ${PROFILE.name.split(" ")[0]}'s assistant`}>
          <div className="chat-head">
            <span className="chat-avatar" aria-hidden="true">T</span>
            <div>
              <p className="chat-title">{PROFILE.name.split(" ")[0]}'s assistant</p>
              <p className="chat-sub">
                <span className="chat-dot" aria-hidden="true" /> Answers from her portfolio
              </p>
            </div>
          </div>

          <div className="chat-log" role="log" aria-live="polite" aria-relevant="additions">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg is-${m.type}`}>
                <span className="visually-hidden">{m.type === "bot" ? "Assistant:" : "You:"}</span>
                <p className="chat-bubble">{m.text}</p>
              </div>
            ))}
            {typing && (
              <div className="chat-msg is-bot" aria-label="Assistant is typing">
                <p className="chat-bubble chat-typing">
                  <span /> <span /> <span />
                </p>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="chat-chips">
            {QUICK_CHIPS.map((c) => (
              <button key={c.label} type="button" className="chat-chip" onClick={() => send(c.msg)}>
                {c.label}
              </button>
            ))}
          </div>

          <form
            className="chat-form"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <label htmlFor={`${panelId}-input`} className="visually-hidden">Ask a question</label>
            <input
              id={`${panelId}-input`}
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about her work…"
              autoComplete="off"
            />
            <button type="submit" className="chat-send" aria-label="Send message" disabled={!input.trim()}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}

const CSS = `
.chat-toggle {
  position: fixed; right: clamp(16px, 3vw, 28px); bottom: clamp(16px, 3vw, 28px); z-index: 200;
  width: 52px; height: 52px; border-radius: 50%; border: none;
  display: inline-flex; align-items: center; justify-content: center;
  background: var(--accent); color: var(--on-accent);
  box-shadow: 0 10px 30px -10px color-mix(in srgb, var(--plum) 70%, transparent);
  transition: transform .25s var(--ease), background-color .2s var(--ease);
}
.chat-toggle:hover { transform: translateY(-2px); background: var(--accent-hover); }

.chat-panel {
  position: fixed; z-index: 200;
  right: clamp(16px, 3vw, 28px); bottom: calc(clamp(16px, 3vw, 28px) + 64px);
  width: min(360px, calc(100vw - 32px));
  display: flex; flex-direction: column; overflow: hidden;
  border-radius: var(--radius-lg);
  background: var(--surface-1); border: 1px solid var(--line-strong);
  box-shadow: 0 30px 60px -24px rgba(0, 0, 0, .45);
  font-family: var(--sans);
  animation: rise .3s var(--ease) both;
}

.chat-head {
  display: flex; align-items: center; gap: var(--s-3);
  padding: var(--s-4) var(--s-5); border-bottom: 1px solid var(--line);
}
.chat-avatar {
  width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
  display: grid; place-items: center;
  font-family: var(--serif); font-style: italic; font-size: 1rem;
  background: var(--accent-tint); color: var(--accent); border: 1px solid var(--line-strong);
}
.chat-title { font-size: var(--fs-sm); font-weight: 500; color: var(--text); }
.chat-sub { display: flex; align-items: center; gap: 6px; font-size: var(--fs-label); color: var(--text-3); }
.chat-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--ok); }

.chat-log {
  height: min(320px, 45vh); overflow-y: auto; overscroll-behavior: contain;
  padding: var(--s-4); display: flex; flex-direction: column; gap: var(--s-3);
}
.chat-msg { display: flex; }
.chat-msg.is-user { justify-content: flex-end; }
.chat-bubble {
  max-width: 82%; padding: 10px 14px; border-radius: 16px;
  font-size: var(--fs-sm); line-height: 1.55;
}
.is-bot .chat-bubble { background: var(--surface-2); color: var(--text-2); border-bottom-left-radius: 6px; }
.is-user .chat-bubble { background: var(--accent); color: var(--on-accent); border-bottom-right-radius: 6px; }

.chat-typing { display: inline-flex; gap: 4px; align-items: center; }
.chat-typing span {
  width: 6px; height: 6px; border-radius: 50%; background: var(--text-3);
  animation: chat-bounce 1.2s ease-in-out infinite;
}
.chat-typing span:nth-child(2) { animation-delay: .2s; }
.chat-typing span:nth-child(3) { animation-delay: .4s; }
@keyframes chat-bounce { 0%, 60%, 100% { transform: none; opacity: .5; } 30% { transform: translateY(-4px); opacity: 1; } }

.chat-chips { display: flex; flex-wrap: wrap; gap: 6px; padding: 0 var(--s-4) var(--s-3); }
.chat-chip {
  padding: 6px 12px; border-radius: var(--radius-pill);
  font-size: var(--fs-label); font-weight: 500;
  background: transparent; color: var(--text-2); border: 1px solid var(--line-strong);
  transition: color .2s var(--ease), border-color .2s var(--ease), background-color .2s var(--ease);
}
.chat-chip:hover { color: var(--accent); border-color: var(--accent); background: var(--accent-tint); }

.chat-form {
  display: flex; gap: var(--s-2); align-items: center;
  padding: var(--s-3) var(--s-4); border-top: 1px solid var(--line);
}
.chat-form input {
  flex: 1; min-width: 0; height: 40px; padding: 0 var(--s-4);
  border-radius: var(--radius-pill); border: 1px solid var(--line-strong);
  background: var(--bg); color: var(--text); font-size: var(--fs-sm);
}
.chat-form input::placeholder { color: var(--text-3); }
.chat-form input:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
.chat-send {
  width: 40px; height: 40px; border-radius: 50%; border: none; flex-shrink: 0;
  display: grid; place-items: center;
  background: var(--accent); color: var(--on-accent);
  transition: opacity .2s var(--ease), background-color .2s var(--ease);
}
.chat-send:hover:not(:disabled) { background: var(--accent-hover); }
.chat-send:disabled { opacity: .45; cursor: default; }
`;