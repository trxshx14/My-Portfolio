import { Link } from "react-router-dom";

/* ============================================================
   AttendMe Case Study — full-screen overlay
   Drop-in component for the trisha.dev portfolio.
   Matches the plum/pink glass design system.
   ============================================================ */

const PINK = "#E2A4C4";
const MAUVE = "#9A6B8A";
const TEXT = "#EDE8F5";
const MUTED = "#9A8DB0";

/* ---------- small building blocks ---------- */

function SectionLabel({ children }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: PINK, marginBottom: 10 }}>
      {children}
    </div>
  );
}

function H2({ children }) {
  return (
    <h2 style={{ fontSize: 26, fontWeight: 800, color: TEXT, letterSpacing: "-0.02em", marginBottom: 14, fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.15 }}>
      {children}
    </h2>
  );
}

function P({ children }) {
  return <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.8, marginBottom: 14 }}>{children}</p>;
}

function Bullets({ items }) {
  return (
    <ul style={{ margin: "0 0 16px 0", paddingLeft: 18, display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontSize: 13.5, color: MUTED, lineHeight: 1.7 }}>
          {item}
        </li>
      ))}
    </ul>
  );
}

function Highlight({ children }) {
  return <span style={{ color: PINK, fontWeight: 600 }}>{children}</span>;
}

/* Replace any of these with a real <img src="..." /> when screenshots are ready */
function ImageSlot({ label, height = 220 }) {
  return (
    <div
      style={{
        height,
        borderRadius: 14,
        border: `1.5px dashed rgba(226,164,196,0.25)`,
        background: "rgba(30,24,51,0.4)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        margin: "8px 0 22px",
      }}
    >
      <span style={{ fontSize: 22 }}>📸</span>
      <span style={{ fontSize: 12, color: MUTED, fontWeight: 500, textAlign: "center", padding: "0 24px" }}>{label}</span>
    </div>
  );
}

function ChallengeCard({ challenge, solution }) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, rgba(226,164,196,0.06), rgba(154,107,138,0.04))",
        border: "1px solid rgba(226,164,196,0.14)",
        borderRadius: 14,
        padding: "18px 20px",
        marginBottom: 14,
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 700, color: TEXT, marginBottom: 8 }}>
        <span style={{ color: "#FAC775" }}>⚡ Challenge · </span>
        {challenge}
      </div>
      <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.7 }}>
        <span style={{ color: "#5DCAA5", fontWeight: 600 }}>Solution · </span>
        {solution}
      </div>
    </div>
  );
}

function StatusPill({ color, children }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: 11,
        fontWeight: 600,
        color,
        background: `${color}14`,
        border: `1px solid ${color}33`,
        padding: "4px 12px",
        borderRadius: 100,
        marginRight: 8,
        marginBottom: 8,
      }}
    >
      {children}
    </span>
  );
}

function Section({ num, label, children }) {
  return (
    <section style={{ marginBottom: 52 }}>
      <SectionLabel>
        {String(num).padStart(2, "0")} · {label}
      </SectionLabel>
      {children}
    </section>
  );
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export default function AttendMeCaseStudy() {
  return (
    <div style={{ background: "#0F0C1B", minHeight: "100vh", fontFamily: "'Inter', 'Plus Jakarta Sans', system-ui, sans-serif" }}>
      {/* back bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 28px", background: "rgba(15,12,27,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(226,164,196,0.1)" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: TEXT }}>
          <span style={{ color: PINK }}>AttendMe</span>
          <span style={{ color: MUTED, fontWeight: 500 }}> · Case Study</span>
        </div>
        <Link to="/" style={{ background: "transparent", border: "1.5px solid #3D2F55", color: TEXT, borderRadius: 100, padding: "7px 18px", fontSize: 12.5, fontWeight: 500, textDecoration: "none" }}>
          ← Back
        </Link>
      </div>

      {/* existing content panel — keep everything from here down unchanged */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 28px 96px" }}></div>

      {/* content panel */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 28px 96px" }}>
        {/* ---------- hero ---------- */}
        <div style={{ marginBottom: 56 }}>
          <SectionLabel>Case Study</SectionLabel>
          <h1
            style={{
              fontSize: 42,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              marginBottom: 16,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: TEXT,
            }}
          >
            AttendMe —{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${PINK} 0%, #C8A0D8 40%, ${MAUVE} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Attendance, reimagined
            </span>{" "}
            for schools
          </h1>
          <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.75, marginBottom: 20, maxWidth: 600 }}>
            A web and mobile attendance management system that lets teachers record a full class in under a minute and gives
            administrators real-time, exportable visibility — built with React, Spring Boot, and MySQL.
          </p>
          <div style={{ marginBottom: 18 }}>
            <StatusPill color={PINK}>UI/UX Designer</StatusPill>
            <StatusPill color={PINK}>Frontend Developer</StatusPill>
            <StatusPill color={PINK}>Database Designer</StatusPill>
          </div>
          <div>
            <StatusPill color="#61DAFB">React</StatusPill>
            <StatusPill color="#5DCAA5">Spring Boot</StatusPill>
            <StatusPill color="#FAC775">MySQL · Supabase</StatusPill>
            <StatusPill color="#54C5F8">Android · Kotlin</StatusPill>
          </div>
          <ImageSlot label="Hero shot — admin dashboard on desktop with teacher roster on a phone beside it" height={300} />
        </div>

        {/* ---------- 1. overview ---------- */}
        <Section num={1} label="Project Overview">
          <H2>One platform, two roles, zero paper.</H2>
          <P>
            AttendMe replaces paper rosters and scattered spreadsheets with a centralized attendance platform for schools.
            Teachers record attendance from any device in seconds; administrators monitor school-wide trends, manage users, and
            export reports. The system supports two strictly separated roles — <Highlight>Teachers</Highlight> and{" "}
            <Highlight>Administrators</Highlight> — enforced through JWT authentication and role-based access control on both
            the client and the API.
          </P>
        </Section>

        {/* ---------- 2. problem ---------- */}
        <Section num={2} label="Problem Statement">
          <H2>Roll call wastes class time. Paper hides the truth.</H2>
          <P>
            Manual attendance tracking is slow, error-prone, and impossible to audit. Teachers lose the first minutes of every
            class to roll call; administrators only discover attendance problems weeks later when records are compiled; and
            handwritten marks can be lost or altered without a trace.
          </P>
          <P>
            <Highlight>The core question:</Highlight> how might we make recording attendance fast enough to happen mid-class,
            while giving administrators trustworthy, real-time data they can act on?
          </P>
        </Section>

        {/* ---------- 3. goals ---------- */}
        <Section num={3} label="Goals & Objectives">
          <H2>What success looks like.</H2>
          <Bullets
            items={[
              "Record attendance for a full class in under one minute.",
              "Give administrators real-time, school-wide attendance visibility.",
              "Support four attendance states — Present, Absent, Late, Excused — to match real classroom policy, not just a binary check.",
              "Maintain a complete, tamper-resistant attendance history per student.",
              "Enable one-click report export for parents, faculty meetings, and compliance.",
              "Enforce strict role separation so teachers and admins only see what they should.",
            ]}
          />
        </Section>

        {/* ---------- 4. users ---------- */}
        <Section num={4} label="Target Users">
          <H2>Two users, two very different contexts.</H2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 8 }}>
            <div style={{ background: "rgba(30,24,51,0.5)", border: "1px solid rgba(226,164,196,0.12)", borderRadius: 14, padding: 18 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 6 }}>👩‍🏫 Teachers</div>
              <div style={{ fontSize: 12.5, color: MUTED, lineHeight: 1.7 }}>
                Recording attendance at the start of class, often on a phone, under time pressure. They need speed, minimal
                taps, and quick corrections.
              </div>
            </div>
            <div style={{ background: "rgba(30,24,51,0.5)", border: "1px solid rgba(226,164,196,0.12)", borderRadius: 14, padding: 18 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 6 }}>🗂 Administrators</div>
              <div style={{ fontSize: 12.5, color: MUTED, lineHeight: 1.7 }}>
                Reviewing attendance across sections from a desktop. They need trends, exception flags, exportable reports,
                and user management.
              </div>
            </div>
          </div>
        </Section>

        {/* ---------- 5. pain points ---------- */}
        <Section num={5} label="User Pain Points">
          <H2>What's actually broken today.</H2>
          <P>
            <Highlight>Teachers:</Highlight>
          </P>
          <Bullets
            items={[
              "Calling roll wastes instructional time at the start of every class.",
              "Paper records are easy to lose and tedious to total at term's end.",
              "Correcting a mistake (a student arrived late, not absent) is messy on paper.",
            ]}
          />
          <P>
            <Highlight>Administrators:</Highlight>
          </P>
          <Bullets
            items={[
              "No real-time view — attendance problems surface weeks late.",
              "Compiling reports across sections means chasing teachers for records.",
              "No audit trail: handwritten records can be altered without trace.",
            ]}
          />
        </Section>

        {/* ---------- 6. research ---------- */}
        <Section num={6} label="Research & Analysis">
          <H2>Three findings that shaped everything.</H2>
          <Bullets
            items={[
              <span key="1">
                <Highlight>Speed beats features.</Highlight> Instructors said anything slower than calling roll would not be
                adopted. This drove the "default everyone to Present, mark only exceptions" interaction pattern.
              </span>,
              <span key="2">
                <Highlight>Late and Excused are policy-critical.</Highlight> Binary present/absent tools force teachers to keep
                side notes — four states had to be first-class in both the data model and the UI.
              </span>,
              <span key="3">
                <Highlight>Admins think in trends, not rows.</Highlight> Raw tables alone weren't useful; they wanted at-a-glance
                percentages, flagged students, and comparisons across sections.
              </span>,
            ]}
          />
          <P>
            A competitive scan showed most existing tools were either bloated school ERPs or overly simple binary check-in apps —
            confirming a gap for a focused, role-aware system.
          </P>
          <ImageSlot label="Research artifacts — interview notes, affinity map, or competitor comparison" height={180} />
        </Section>

        {/* ---------- 7. user flow ---------- */}
        <Section num={7} label="User Flow">
          <H2>One login. Two diverging paths.</H2>
          <P>
            <Highlight>Teacher (happy path):</Highlight> Login → Dashboard → Select class session → roster loads with everyone
            defaulted to <em>Present</em> → tap exceptions (Absent / Late / Excused) → Save → confirmation with summary count.
          </P>
          <P>
            <Highlight>Administrator:</Highlight> Login → Admin Dashboard → school-wide analytics → drill into a section or
            student → export report → manage users (create teacher accounts, assign sections).
          </P>
          <ImageSlot label="User flow diagram — one lane per role, showing the RBAC split after login" height={200} />
        </Section>

        {/* ---------- 8. design process ---------- */}
        <Section num={8} label="Design Process">
          <H2>Empathize → Define → Ideate → Prototype → Test → Iterate.</H2>
          <Bullets
            items={[
              "Lo-fi sketches explored roster layouts — list vs. grid vs. card-per-student. Paper testing showed a dense list with large tap targets won for speed.",
              "Mid-fi Figma wireframes locked the information architecture: teacher screens mobile-first for one-handed use; admin screens desktop-dense.",
              "The hi-fi prototype validated the exception-marking pattern — testers recorded a 30-student class in well under a minute.",
              "Each iteration was tested with users role-playing as teachers; friction points like accidental status toggles were fixed before development.",
            ]}
          />
        </Section>

        {/* ---------- 9. wireframes ---------- */}
        <Section num={9} label="Wireframes">
          <H2>Decisions made in greyscale.</H2>
          <Bullets
            items={[
              "Roster as the teacher's home — the most frequent task is zero navigation steps away after class selection.",
              "Status toggles as a color-coded segmented control per student instead of dropdowns: one tap, no menus.",
              "Admin dashboard leads with exceptions (\"students below 80% attendance\") instead of raw totals — matching how admins actually triage.",
            ]}
          />
          <ImageSlot label="Lo-fi sketches — roster layout explorations" height={170} />
          <ImageSlot label="Mid-fi Figma — teacher mobile flow: login, class select, roster, confirmation" height={220} />
          <ImageSlot label="Mid-fi Figma — admin desktop: dashboard, reports, user management" height={220} />
        </Section>

        {/* ---------- 10. visual design ---------- */}
        <Section num={10} label="Visual Design Decisions">
          <H2>Color as a status language.</H2>
          <div style={{ marginBottom: 14 }}>
            <StatusPill color="#5DCAA5">Present</StatusPill>
            <StatusPill color="#E07A7A">Absent</StatusPill>
            <StatusPill color="#FAC775">Late</StatusPill>
            <StatusPill color="#54C5F8">Excused</StatusPill>
          </div>
          <Bullets
            items={[
              "The four status colors are used consistently across roster toggles, history badges, and report charts — users learn the system once.",
              "High-contrast, minimum-44px touch targets on teacher screens, designed for use while standing in a classroom.",
              "A restrained, professional palette for admin views: data density with generous whitespace so charts stay scannable.",
              "A shared component system — buttons, badges, cards, tables — across web and mobile to cut cognitive load and dev time.",
              "Empty, loading, and error states designed deliberately: a roster that fails to load tells the teacher what to do next, not just a spinner.",
            ]}
          />
          <ImageSlot label="Style guide / component sheet from Figma" height={200} />
        </Section>

        {/* ---------- 11. key features ---------- */}
        <Section num={11} label="Key Features">
          <H2>Built for the classroom and the office.</H2>
          <Bullets
            items={[
              <span key="1"><Highlight>JWT Authentication</Highlight> — stateless, token-based sessions for both web and mobile clients.</span>,
              <span key="2"><Highlight>Role-Based Access Control</Highlight> — teachers see only their sections; admins manage users and view all data. Enforced at both the route and API level.</span>,
              <span key="3"><Highlight>Four-State Recording</Highlight> — Present, Absent, Late, Excused, with bulk "all present" defaulting and per-student exception toggles.</span>,
              <span key="4"><Highlight>Attendance History</Highlight> — complete per-student and per-section timelines with date filtering.</span>,
              <span key="5"><Highlight>Reports & Analytics</Highlight> — attendance percentages, trend charts, and exception flags per section and student.</span>,
              <span key="6"><Highlight>User Management</Highlight> — admin-controlled account creation, role assignment, and deactivation.</span>,
              <span key="7"><Highlight>Report Export</Highlight> — downloadable reports for offline distribution and record-keeping.</span>,
            ]}
          />
          <ImageSlot label="Feature screenshots — roster recording, history view, analytics dashboard, export dialog" height={260} />
        </Section>

        {/* ---------- 12. development ---------- */}
        <Section num={12} label="Development Process">
          <H2>API-first, component-driven.</H2>
          <Bullets
            items={[
              "The Spring Boot REST API contract was defined before UI implementation, letting frontend and backend proceed in parallel and keeping the web and Android clients consistent.",
              "Component-driven React frontend: roster rows, status badges, and report cards built as reusable components mirroring the Figma system one-to-one.",
              "I designed the MySQL schema around core entities — Users, Roles, Sections, Enrollments, Sessions, Attendance Records — with attendance as an append-only event log, preserving a full audit trail. The schema was later adapted for Supabase (PostgreSQL) hosting.",
              "Protected routing: role checks at the router level on the frontend, with the API as the source of truth — the UI hides what RBAC forbids; the server enforces it.",
            ]}
          />
        </Section>

        {/* ---------- 13. challenges ---------- */}
        <Section num={13} label="Technical Challenges & Solutions">
          <H2>Where it got hard — and how it got solved.</H2>
          <ChallengeCard
            challenge="Securing routes by role without duplicating logic."
            solution="JWT tokens carry the user's role claim. A single React route-guard reads the decoded role and redirects unauthorized access, while Spring Boot validates the same token server-side on every request. One source of truth, enforced twice."
          />
          <ChallengeCard
            challenge="Keeping the roster fast for large classes."
            solution="Defaulting all students to Present and submitting only a compact diff of exceptions on save reduced both interaction time and payload size — instead of posting the full roster state."
          />
          <ChallengeCard
            challenge="Attendance edits vs. data integrity."
            solution="Attendance records are append-only events rather than mutable rows. The history view shows current state, while the database retains who changed what and when — a full audit trail paper never had."
          />
          <ChallengeCard
            challenge="One design system across React web and Android."
            solution="A shared design-token approach — the same colors, spacing scale, and status semantics documented in Figma — kept both clients visually and behaviorally consistent despite different codebases."
          />
        </Section>

        {/* ---------- 14. responsive ---------- */}
        <Section num={14} label="Responsive Design Considerations">
          <H2>Designed at 360px first.</H2>
          <Bullets
            items={[
              "Mobile-first teacher experience: the roster — the most-used screen — was designed at 360px width first; desktop is the enhancement, not the baseline.",
              "The admin analytics dashboard reflows from a multi-column desktop grid to stacked cards on tablets and phones.",
              "Touch vs. pointer: larger hit areas and swipe-friendly lists on mobile; denser tables, hover states, and keyboard focus styles on desktop.",
              "Performance on school networks: lean payloads and skeleton loading states keep the app usable on slow campus Wi-Fi.",
            ]}
          />
          <ImageSlot label="Same screen at mobile / tablet / desktop breakpoints" height={190} />
        </Section>

        {/* ---------- 15. results ---------- */}
        <Section num={15} label="Results & Impact">
          <H2>From minutes of roll call to seconds of taps.</H2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 18 }}>
            {[
              ["<1 min", "to record a full class"],
              ["4 states", "matching real policy"],
              ["100%", "auditable history"],
            ].map(([n, l]) => (
              <div key={l} style={{ background: "rgba(30,24,51,0.5)", border: "1px solid rgba(226,164,196,0.12)", borderRadius: 14, padding: "18px 14px", textAlign: "center" }}>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 800,
                    background: `linear-gradient(135deg, ${PINK}, ${MAUVE})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    marginBottom: 4,
                  }}
                >
                  {n}
                </div>
                <div style={{ fontSize: 11, color: MUTED }}>{l}</div>
              </div>
            ))}
          </div>
          <Bullets
            items={[
              "Administrators gained real-time visibility they previously had only at term's end.",
              "The four-state model eliminated side-channel record-keeping for Late and Excused cases.",
              "Delivered as a working full-stack system: deployed React web app, Spring Boot API, and Android client.",
            ]}
          />
        </Section>

        {/* ---------- 16. lessons ---------- */}
        <Section num={16} label="Lessons Learned">
          <H2>What I'd carry into the next project.</H2>
          <Bullets
            items={[
              <span key="1"><Highlight>Design the API contract first.</Highlight> The few times we skipped this, frontend and backend assumptions drifted and cost debugging time.</span>,
              <span key="2"><Highlight>The fastest UI has the fewest decisions.</Highlight> Defaulting to Present and marking exceptions was the single highest-impact design choice in the project.</span>,
              <span key="3"><Highlight>RBAC must live on the server.</Highlight> Hiding buttons is UX; rejecting unauthorized requests is security. They're two different jobs.</span>,
              <span key="4"><Highlight>Database design is UX design.</Highlight> The append-only attendance model came from a user need — trustworthy records — not a technical preference. Schema decisions shaped what the interface could promise users.</span>,
            ]}
          />
        </Section>

        {/* ---------- 17. future ---------- */}
        <Section num={17} label="Future Improvements">
          <H2>The roadmap.</H2>
          <Bullets
            items={[
              "QR / geofenced check-in so students can self-record under teacher supervision.",
              "Automated absence notifications to parents or guardians via email/SMS.",
              "Offline-first mobile recording with background sync for classrooms with poor connectivity.",
              "Scheduled report delivery — weekly summaries emailed to admins automatically.",
              "Full WCAG 2.1 AA accessibility audit, including screen-reader flows for the roster.",
              "Predictive flags — surfacing students whose attendance trend indicates risk before they cross the threshold.",
            ]}
          />
        </Section>

        {/* ---------- footer CTA ---------- */}
        <div style={{ borderTop: "1px solid rgba(226,164,196,0.1)", paddingTop: 32, textAlign: "center" }}>
          <p style={{ fontSize: 14, color: MUTED, marginBottom: 20 }}>Thanks for reading! Explore the project:</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://attendme-frontend.onrender.com/login"
              target="_blank"
              rel="noreferrer"
              style={{
                background: `linear-gradient(135deg, ${PINK}, ${MAUVE})`,
                color: "white",
                padding: "11px 24px",
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 0 20px #E2A4C440",
              }}
            >
              Live Demo ↗
            </a>
            <a
              href="https://github.com/trxshx14/IT342-Cararag-AttendMe.git"
              target="_blank"
              rel="noreferrer"
              style={{
                background: "transparent",
                color: TEXT,
                border: "1.5px solid #3D2F55",
                padding: "11px 24px",
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              View Source ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
