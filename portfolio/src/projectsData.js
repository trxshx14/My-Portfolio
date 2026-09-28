// projectsData.js — single source of truth for the homepage, /projects,
// and the chat assistant. Update facts here once; every page follows.

export const PROFILE = {
  name: "Trisha Raye Cararag",
  role: "Frontend Developer & UX/UI Designer",
  location: "Cebu, Philippines",
  timezone: "GMT+8",
  availability: "Open to internships, entry-level roles & freelance",
  availabilityShort: "Internships, entry-level & freelance · Remote",
  education: "BS Information Technology · Cebu Institute of Technology–University",
  email: "cararagtrisharaye@gmail.com",
  github: "https://github.com/trxshx14",
  githubHandle: "github.com/trxshx14",
  linkedin: "https://www.linkedin.com/in/trisha-raye-cararag/",
  linkedinHandle: "in/trisha-raye-cararag",
  resume: "/Cararag_Resume_IT.pdf",
};

export const WORKS = [
  {
    slug: "aura-beauty",
    featured: true,
    title: "Aura Beauty",
    type: "3D Web Experience",
    role: "Frontend Engineer & Designer",
    year: "2026",
    pipeline: "Concept → Next.js + R3F + GSAP → Vercel",
    deploy: "Vercel",
    problem:
      "Static product photos can't convey a cosmetic product's texture, formulation, or feel online.",
    desc: "Immersive scrollytelling showcase for a premium cosmetics brand — a scroll-synced WebGL product that rotates and morphs through the story, with custom frosted-glass shader materials, cursor-tracking physics, and real-time shade tinting at 60 FPS.",
    tagline: "Scroll-synced WebGL storytelling for a premium cosmetics brand.",
    highlights: [
      "Scroll-synced 3D product driven by GSAP ScrollTrigger in React Three Fiber",
      "Custom frosted-glass shader materials with real-time shade tinting",
      "Cursor-tracking physics held at 60 FPS",
    ],
    tags: ["Next.js", "TypeScript", "React Three Fiber", "GSAP", "Tailwind CSS"],
    image: "/images/aura-cover.png",
    github: "https://github.com/trxshx14/aura-beauty",
    demo: "https://aura-beauty-glow.vercel.app/",
    caseStudy: "/aura-beauty-case-study",
  },
  {
    slug: "attendme",
    title: "AttendMe",
    type: "Full-Stack · Web + Android",
    role: "Full-Stack Developer",
    year: "2026",
    pipeline: "Concept → React + Spring Boot → Render",
    deploy: "Render",
    problem:
      "Manual attendance tracking is error-prone and time-consuming for instructors.",
    desc: "Attendance management system with REST API architecture and role-based access control for school admins and teachers — secure authentication, real-time recording, and a clean dashboard.",
    tagline: "Role-based attendance management, from REST API to dashboard.",
    highlights: [
      "JWT auth with role-based access, enforced on routes and on the API",
      "Spring Boot REST API over a relational MySQL schema",
      "React web app plus an Android client",
    ],
    tags: ["React", "Spring Boot", "MySQL", "Android"],
    image: "/images/attendme-dashboard.png",
    github: "https://github.com/trxshx14/IT342-Cararag-AttendMe",
    demo: "https://attendme-frontend.onrender.com/login",
    apk: "/AttendMe.apk",
    caseStudy: "/attendme-case-study",
  },
  {
    slug: "cozy-pomodoro",
    title: "Cozy Pomodoro",
    type: "Frontend App",
    role: "Frontend Developer & Designer",
    year: "2025",
    pipeline: "Concept → React + Tailwind → Vercel",
    deploy: "Vercel",
    problem:
      "Students and professionals struggle with distraction and burnout during long study or work sessions.",
    desc: "Productivity-focused Pomodoro timer with a soft, lofi-inspired interface designed for focused work and mindful breaks.",
    tagline: "A calm, lofi-inspired Pomodoro timer for focused work.",
    highlights: [
      "Ambient audio synthesized with the Web Audio API",
      "Hand-authored SVG pixel art animated with CSS",
      "No account needed — state persists locally",
    ],
    tags: ["React", "Tailwind CSS"],
    image: "/images/cozy-dashboard.png",
    github: "https://github.com/trxshx14/CozyPomodoro",
    demo: "https://cozypomodoro-by-trishadev.vercel.app/",
    caseStudy: "/cozy-pomodoro-case-study",
  },
  {
    slug: "nook",
    title: "Nook",
    type: "3D Product Design",
    role: "Solo build — concept, 3D interaction design, engineering",
    year: "2026",
    pipeline: "Concept → UX flow → R3F prototype → interaction polish → Vercel",
    deploy: "Vercel",
    problem:
      "3D spatial manipulation is naturally clunky for a casual user — dragging objects in a scene, avoiding the camera fighting back, snapping things into place without pixel-perfect fiddling. Most browser-based 3D tools feel like engineering demos, not products.",
    desc: "A cozy 3D room arranger: pick from pastel furniture pieces across 6 categories, drag them into a room that snaps to a grid, rotate and recolor them, then re-skin the whole space with one-click aesthetic themes — Cozy Cottage, Retro 70s, Space Minimalist. A resident pathfinding cat wanders the floor and sits down in protest if your furniture blocks her path. One Zustand store is the single source of truth — the same placedItems array drives the 3D scene, the UI panels, persistence, and the cat's pathing logic.",
    tagline: "A cozy 3D room arranger with grid snapping and a pathfinding cat.",
    highlights: [
      "One Zustand store drives the scene, UI, persistence and cat pathfinding",
      "Grid-snapped drag, rotate and recolor in React Three Fiber",
      "One-click themes re-skin the whole room",
    ],
    tags: ["React 18", "TypeScript", "React Three Fiber", "drei", "Zustand", "Vite"],
    image: "/images/nook-cover.png",
    github: "https://github.com/trxshx14/Nook",
    demo: "https://nook-trc.vercel.app/",
  },
];

// Every skill points to the work that proves it. If a row can't name
// real proof, it doesn't belong here yet.
export const STACK = [
  {
    group: "Frontend",
    items: [
      ["React", "AttendMe · Cozy Pomodoro · Nook"],
      ["Next.js", "Aura Beauty"],
      ["TypeScript", "Aura Beauty · Nook"],
      ["JavaScript", "Every project"],
      ["Tailwind CSS", "Aura Beauty · Cozy Pomodoro"],
    ],
  },
  {
    group: "3D, Motion & State",
    items: [
      ["React Three Fiber", "Aura Beauty · Nook"],
      ["GSAP ScrollTrigger", "Aura Beauty"],
      ["Zustand", "Nook"],
      ["Web Audio API", "Cozy Pomodoro"],
    ],
  },
  {
    group: "Backend & Mobile",
    items: [
      ["Spring Boot", "AttendMe"],
      ["REST APIs · JWT", "AttendMe"],
      ["MySQL", "AttendMe"],
      ["Supabase", "AttendMe (Postgres hosting)"],
      ["Kotlin · Android", "AttendMe Android app"],
    ],
  },
  {
    group: "Design & Workflow",
    items: [
      ["Git · GitHub", "Every project"],
      ["Vercel · Render", "All four live deployments"],
    ],
  },
];

export const CERTS = [
  { name: "AI Ready ASEAN", issuer: "ASEAN Foundation & Google.org", year: "2025" },
  { name: "Data Visualization", issuer: "Kaggle", year: "2025" },
  { name: "Java OOP Certification", issuer: "CodeChum · CITU", year: "2025" },
  { name: "ICT Congress", issuer: "PSITE Cebu", year: "2026" },
];