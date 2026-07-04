import {
  CaseStudyShell,
  SectionLabel,
  Section,
  H2,
  P,
  Highlight,
  Bullets,
  CSImage,
  StatusPill,
  ChallengeCard,
  StatGrid,
  CTAFooter,
} from "./CaseStudyKit";

export default function CozyPomodoroStudy() {
  return (
    <CaseStudyShell title="Cozy Pomodoro">
      {/* ---------- hero ---------- */}
      <div className="cs-hero">
        <SectionLabel>Case Study</SectionLabel>
        <h1>
          Cozy Pomodoro — <em>calm focus, zero anxiety</em> for burnt-out minds
        </h1>
        <p className="cs-lede">
          An ambient pomodoro timer that transforms productivity into a calming ritual, featuring a
          pixel cat companion, lo-fi ambient audio, soft pastel themes, and a session tracker that
          rewards consistency without pressure. Built with React and the Web Audio API.
        </p>
        <div className="cs-roles">
          <StatusPill>UI/UX Designer</StatusPill>
          <StatusPill>Frontend Developer</StatusPill>
          <StatusPill>Interaction Designer</StatusPill>
          <StatusPill>Motion Designer</StatusPill>
          <StatusPill>Audio Systems</StatusPill>
        </div>
        <CSImage src="/images/cozy-dashboard.png" alt="Cozy Pomodoro main timer interface" />
      </div>

      {/* ---------- 1. overview ---------- */}
      <Section num={1} label="Project Overview">
        <H2>One timer. Three themes. Zero burnout.</H2>
        <P>
          Cozy Pomodoro reimagines the traditional pomodoro method as a gentle, ambient experience
          rather than a rigid countdown clock. A pixel cat companion keeps you company through
          focus sessions and naps through breaks; a bubble tea fills as you work; and a
          context-aware window shows you whether it's sunrise, golden hour, or a cozy night
          outside. The app supports three modes — <Highlight>Focus</Highlight>,{" "}
          <Highlight>Short Break</Highlight>, and <Highlight>Long Break</Highlight> — each with its
          own colour palette, ambient soundscape, and animated scene, so switching modes feels
          like a mood shift, not an alarm.
        </P>
      </Section>

      {/* ---------- 2. problem ---------- */}
      <Section num={2} label="Problem Statement">
        <H2>Harsh timers create the anxiety they're meant to solve.</H2>
        <P>
          Traditional productivity timers are built around urgency: loud alarms, stark interfaces,
          relentless countdowns. For students and remote workers already prone to digital fatigue,
          these apps amplify the very stress they promise to manage. The result is timer anxiety —
          users avoid starting sessions because the act of starting feels punishing.
        </P>
        <P>
          <Highlight>The core question:</Highlight> How might we design a pomodoro timer that
          motivates focus through comfort rather than pressure, while still keeping users honest
          about how they're spending their time?
        </P>
      </Section>

      {/* ---------- 3. goals ---------- */}
      <Section num={3} label="Goals & Objectives">
        <H2>What a calmer kind of productivity looks like.</H2>
        <Bullets
          items={[
            "Replace harsh countdowns with a gentle, ambient interface that feels safe to start.",
            "Give users sensory delight — soft colour, motion, and sound — so focus sessions become something to look forward to.",
            "Support the full pomodoro rhythm: focus, short break, and long break, all with distinct moods.",
            "Let users personalise their environment: timer lengths, ambient sounds, cat accessory, bubble tea flavour.",
            "Track sessions lightly — paw-print streaks instead of dashboards — so progress feels rewarding, not surveilled.",
            "Work entirely in-browser with no account required: zero friction to start, zero data anxiety.",
          ]}
        />
      </Section>

      {/* ---------- 4. users ---------- */}
      <Section num={4} label="Target Users">
        <H2>Two moods, one very tired person.</H2>
        <div className="cs-duo">
          <div className="cs-duo-card">
            <h3>Students</h3>
            <p>
              Studying for exams or working through coursework, often late at night. They need
              something cozy enough to keep them at their desk without tipping into dread. The
              pixel cat is their study buddy.
            </p>
          </div>
          <div className="cs-duo-card">
            <h3>Remote Workers</h3>
            <p>
              Context-switching all day across Slack, Notion, and video calls. They need a ritual
              that signals "deep work starts now" without adding cognitive overhead. The ambient
              audio and mood shift do the signalling.
            </p>
          </div>
        </div>
      </Section>

      {/* ---------- 5. pain points ---------- */}
      <Section num={5} label="User Pain Points">
        <H2>What's actually broken about existing timers.</H2>
        <P>
          <Highlight>Students:</Highlight>
        </P>
        <Bullets
          items={[
            "Alarm sounds interrupt flow and cause a jolt of stress at the exact moment they should feel accomplished.",
            "Plain, utilitarian interfaces offer no atmosphere — working in them feels as dull as it sounds.",
            "No built-in break experience: a tab with a ticking clock doesn't actually help you decompress in five minutes.",
          ]}
        />
        <P>
          <Highlight>Remote Workers:</Highlight>
        </P>
        <Bullets
          items={[
            "Rigid 25-minute defaults don't fit real workflows — deep work sessions need to flex.",
            "No ambient audio means they're tab-switching to Spotify, breaking focus before it even starts.",
            "Session tracking tools feel like surveillance rather than self-care, so they stop using them.",
          ]}
        />
      </Section>

      {/* ---------- 6. research ---------- */}
      <Section num={6} label="Research & Analysis">
        <H2>Three findings that shaped the whole vibe.</H2>
        <Bullets
          items={[
            <span key="1">
              <Highlight>Ritual matters more than rigidity.</Highlight> Users who stuck with
              pomodoro long-term described it as a habit with texture — a specific playlist, a
              specific drink, a specific spot. Cozy Pomodoro builds that texture into the interface
              itself.
            </span>,
            <span key="2">
              <Highlight>Breaks need to feel different, not just shorter.</Highlight> A timer that
              looks identical in focus and break mode gives the brain no signal to actually rest.
              Distinct colour palettes and the cat switching from studying to napping create a
              genuine mode shift.
            </span>,
            <span key="3">
              <Highlight>Gentle progress beats aggressive gamification.</Highlight> Streaks and
              badges create anxiety when broken. Paw-print session counters that fill quietly, with
              no reset penalty, keep motivation intrinsic rather than performative.
            </span>,
          ]}
        />
        <P>
          A scan of existing tools (Forest, Be Focused, Pomofocus, Tide) confirmed a gap: apps are
          either feature-dense and clinical, or minimal to the point of offering no atmosphere.
          None offered a cohesive ambient experience with personalisation that didn't require a
          subscription.
        </P>
        <CSImage src="/images/cozy-research.png" alt="Research findings and competitive analysis" />
      </Section>

      {/* ---------- 7. user flow ---------- */}
      <Section num={7} label="User Flow">
        <H2>Open the app. Feel different. Get to work.</H2>
        <P>
          <Highlight>Starting a session:</Highlight> Land on the timer → ambient audio
          auto-suggests based on time of day → select a focus goal from the scratchpad → press
          Start → cat shifts from idle to studying → bubble tea begins to fill → timer ends with a
          soft chime → cat rewards itself with a sip.
        </P>
        <P>
          <Highlight>Customising the environment:</Highlight> Open Settings drawer → adjust
          session/break durations → pick a tea flavour → dress the cat from the wardrobe → dial
          ambient sound levels → close drawer and the change is immediate — no reload.
        </P>
        <CSImage src="/images/cozy-user-flow.png" alt="Cozy Pomodoro user flow diagram" />
      </Section>

      {/* ---------- 8. design process ---------- */}
      <Section num={8} label="Design Process">
        <H2>Empathize → Define → Ideate → Prototype → Test → Iterate.</H2>
        <Bullets
          items={[
            "Early concept sketches explored the relationship between timer state and character state — when should the cat nap? when does it wake up? These micro-narrative decisions drove the interaction model.",
            "Figma wireframes established the split layout: timer card on the left, contextual content (window, goals) on the right. The hierarchy kept the clock primary without making it oppressive.",
            "The prototype validated that theme colour transitions at mode-switch were the single most-impactful change — users described it as the app 'breathing' with them.",
            "Pixel art iteration for the cat companion went through six rounds: the final version communicates studying, napping, and celebrating purely through posture and animation, with no text labels needed.",
          ]}
        />
      </Section>

      {/* ---------- 9. wireframes ---------- */}
      <Section num={9} label="Wireframes">
        <H2>Decisions made in greyscale.</H2>
        <Bullets
          items={[
            "Timer as the anchor: always visible at comfortable reading size, never competing with decorative elements for attention.",
            "Cat companion placed at eye level relative to the clock so glancing at remaining time and glancing at the cat are the same gesture.",
            "Settings as a sliding drawer rather than a page: customisation is an aside, not a destination, keeping the ambient experience uninterrupted.",
          ]}
        />
        <CSImage src="/images/cozy-dashboard.png" alt="Cozy Pomodoro mid-fidelity wireframes" />
        <CSImage src="/images/cozy-hifi.png" alt="Cozy Pomodoro high-fidelity screens" />
      </Section>

      {/* ---------- 10. visual design ---------- */}
      <Section num={10} label="Visual Design Decisions">
        <H2>Colour as a mood language.</H2>
        <div style={{ marginBottom: 16 }}>
          <StatusPill color="#F4A7B9">Focus — Blush Pink</StatusPill>
          <StatusPill color="#7FC8B8">Short Break — Sage</StatusPill>
          <StatusPill color="#B49AD6">Long Break — Lavender</StatusPill>
        </div>
        <Bullets
          items={[
            "Each mode has a complete colour system — container, sky, ground, progress bar — so the entire screen shifts at once, not just the timer badge.",
            "Pixel art rendered in SVG at sub-pixel precision: the cat's expressions read clearly at small sizes without losing the handcrafted feel.",
            "The outside window is time-of-day aware: sunrise pastels, midday blue, golden twilight, deep indigo at night — matching the real world creates a sense of presence.",
            "Typography uses rounded, friendly system fonts (ui-rounded, Quicksand, Nunito) to soften the interface without sacrificing readability.",
            "All interactive elements meet minimum 44px touch targets; animations respect the prefers-reduced-motion system preference.",
          ]}
        />
      </Section>

      {/* ---------- 11. key features ---------- */}
      <Section num={11} label="Key Features">
        <H2>Built for the couch, the café, and 2 a.m. study sessions.</H2>
        <Bullets
          items={[
            <span key="1">
              <Highlight>Pixel Cat Companion</Highlight> — studies during focus, naps on a pillow
              during breaks, and wakes up with a full animation sequence when the break ends.
              Dressable via the wardrobe (glasses, cozy hat, pink bow).
            </span>,
            <span key="2">
              <Highlight>Three Ambient Modes</Highlight> — Focus (blush), Short Break (sage), and
              Long Break (lavender), each with distinct colour systems, pixel scenes, and character
              states that transition smoothly.
            </span>,
            <span key="3">
              <Highlight>Bubble Tea Progress Indicator</Highlight> — fills as you focus, reveals
              boba pearls at 50% completion, pops a straw when the session ends. Three flavours:
              strawberry, matcha, taro.
            </span>,
            <span key="4">
              <Highlight>Ambient Audio Engine</Highlight> — Web Audio API synthesised rain, café
              murmur, and lo-fi chord drone, each independently volume-controlled in the settings
              drawer.
            </span>,
            <span key="5">
              <Highlight>Context-Aware Window</Highlight> — a painted scene outside your virtual
              window that reads the system clock and renders sunrise, midday, twilight, or night
              with corresponding sky gradients, hills, and stars.
            </span>,
            <span key="6">
              <Highlight>Focus Goals Scratchpad</Highlight> — lightweight task list with
              sparkle-burst completion animations; no sync, no account, no pressure.
            </span>,
            <span key="7">
              <Highlight>Breathing Guide</Highlight> — a full-screen pulsing orb with particle ring
              for between-session resets; dismissible with Escape.
            </span>,
          ]}
        />
        <CSImage src="/images/cozy-features.png" alt="Cozy Pomodoro feature overview" />
      </Section>

      {/* ---------- 12. development ---------- */}
      <Section num={12} label="Development Process">
        <H2>Animation-first, component-driven.</H2>
        <Bullets
          items={[
            "All pixel art is hand-authored SVG with integer viewport coordinates, keeping file size near zero while allowing CSS animation on individual elements — the pencil in the cat's paw animates independently from the head bob.",
            "The Web Audio API audio engine is lazily instantiated on first user interaction (browser autoplay policy) and uses gain node ramps instead of hard cuts, so volume changes feel organic rather than clipped.",
            "Theme switching is a React state change that propagates via props: no CSS classes toggled, no context re-renders — the entire colour tree updates in a single pass with CSS transitions handling the visual blend.",
            "The settings drawer is a fixed-position panel with a transform translateX transition, preserving the ambient scene behind it at all times so the mood never breaks.",
            "localStorage persists session count, last-used mode, and custom durations — enough to restore context on reload without requiring an account.",
          ]}
        />
      </Section>

      {/* ---------- 13. challenges ---------- */}
      <Section num={13} label="Technical Challenges & Solutions">
        <H2>Where it got hard — and how it got soft again.</H2>
        <ChallengeCard
          challenge="Keeping animations smooth while the 1-second interval fires continuously."
          solution="Timer state lives in a single useRef-backed interval; all visual state (colour theme, cat expression, progress bar) derives from props, not the interval itself. CSS transitions handle the visual easing so React re-renders stay lean."
        />
        <ChallengeCard
          challenge="Synthesising ambient audio that doesn't loop with an obvious cut."
          solution="All three audio sources use looping Web Audio API BufferSourceNodes filled with filtered white noise or sustained oscillators — there's no audio file to loop and therefore no audible seam. Volume fades use exponential ramps for natural decay."
        />
        <ChallengeCard
          challenge="The wake-up animation sequence on break end needs precise multi-step timing."
          solution="A useEffect inside DeskCompanion watches the state prop and schedules four setTimeout calls (mask slide, eye flutter, wide-awake bounce, sit-up spring) stored in a ref for cleanup. The parent component never knows about sub-phases — the sequence is fully self-contained."
        />
        <ChallengeCard
          challenge="Making the outside window feel alive without a canvas or WebGL."
          solution="CSS keyframe animations on absolutely-positioned divs — drifting cloud layers, a twinkling star field, a blinking cottage window — all composited with GPU-accelerated transform and opacity. Zero canvas, zero libraries, runs at 60 fps."
        />
      </Section>

      {/* ---------- 14. responsive ---------- */}
      <Section num={14} label="Responsive Design Considerations">
        <H2>Designed at 375px first, beautiful at 1440px.</H2>
        <Bullets
          items={[
            "Two-column grid: timer card sits left, window scene and task panel sit right. Below the lg breakpoint the columns stack — timer on top, goals below.",
            "The pixel cat SVG uses relative sizing (width/height in ems mapped to viewport) so it scales gracefully from a phone to a widescreen without repainting.",
            "The settings drawer is fixed 340px on desktop; the same slide-in animation works at both widths.",
            "Touch-friendly: all interactive elements are minimum 44px, status pills are large enough to tap without a stylus, and the task checkbox has an extended hit area.",
            "The ambient pixel scene at the footer clips cleanly on narrow viewports — overflow hidden on the container ensures no horizontal scroll artifacts.",
          ]}
        />
      </Section>

      {/* ---------- 15. results ---------- */}
      <Section num={15} label="Results & Impact">
        <H2>From timer dread to a ritual worth returning to.</H2>
        <StatGrid
          stats={[
            ["3 modes", "one cohesive mood system"],
            ["4 steps", "wake-up animation sequence"],
            ["0 accounts", "zero friction to start"],
          ]}
        />
        <Bullets
          items={[
            "Users described the break-end wake-up sequence as the moment the app felt 'alive' — turning a mechanical alarm into a micro-narrative reward.",
            "The ambient audio engine replaced the Spotify tab-switch for remote workers during testing, reducing context breaks.",
            "Delivered as a fully client-side React app with no backend dependency: load it, use it, come back to it.",
          ]}
        />
      </Section>

      {/* ---------- 16. lessons ---------- */}
      <Section num={16} label="Lessons Learned">
        <H2>What I'd carry into the next project.</H2>
        <Bullets
          items={[
            <span key="1">
              <Highlight>Micro-narrative is UX.</Highlight> The cat drinking bubble tea at session
              end is functionally identical to a green checkmark — but one creates a moment worth
              waiting for. Delight is a retention strategy.
            </span>,
            <span key="2">
              <Highlight>Animation state machines beat ad-hoc booleans.</Highlight> The wake-up
              sequence taught me to model multi-step animations as a named phase string (mask →
              eyes → wide → sitting) rather than stacking isXDone flags that interact
              unpredictably.
            </span>,
            <span key="3">
              <Highlight>Audio is a first-class design material.</Highlight> The ambient engine was
              scoped in late and took proportionally longer to integrate cleanly than any visual
              feature. Next time it goes in the architecture from day one.
            </span>,
            <span key="4">
              <Highlight>No-account apps require deliberate state design.</Highlight> When
              localStorage is your only persistence layer, every piece of state that survives a
              reload must be a conscious choice — not an afterthought when users complain about
              losing streaks.
            </span>,
          ]}
        />
      </Section>

      {/* ---------- 17. future ---------- */}
      <Section num={17} label="Future Improvements">
        <H2>The roadmap.</H2>
        <Bullets
          items={[
            "Cloud sync via Supabase so streaks and preferences persist across devices — opt-in, privacy-first.",
            "Expanded cat wardrobe and seasonal accessories (cherry blossom headband, winter scarf) updated on a content calendar.",
            "Custom audio upload: let users drop in their own lo-fi playlist or rain recording to use alongside the synthesised layers.",
            "A gentle weekly review screen — not a dashboard, just a soft summary card: 'You focused for 6 hours this week. The cat is proud.'",
            "Full WCAG 2.1 AA pass including reduced-motion alternatives for every keyframe animation.",
            "Collaborative mode: share a virtual study room link so two users can focus together with synchronised timers and a shared cat companion.",
          ]}
        />
      </Section>

      <CTAFooter
        message="Thanks for reading! Try it yourself:"
        demo="https://cozypomodoro-by-trishadev.vercel.app/"
        source="https://github.com/trxshx14/CozyPomodoro"
      />
    </CaseStudyShell>
  );
}