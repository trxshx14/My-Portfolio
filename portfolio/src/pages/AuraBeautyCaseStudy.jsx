import { WORKS } from "../projectsData";
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

/* ============================================================
   Aura Beauty — short, engineering-led case study (6 sections).

   DRAFT: written from the project description in projectsData.js.
   Lines marked  VERIFY  describe HOW something was built — check
   each one against your real code and reword anything that isn't
   exactly what you did. Interviewers will ask about these.
   ============================================================ */

const aura = WORKS.find((w) => w.slug === "aura-beauty");

export default function AuraBeautyCaseStudy() {
  return (
    <CaseStudyShell title="Aura Beauty">
      {/* ---------- hero ---------- */}
      <div className="cs-hero">
        <SectionLabel>Case Study</SectionLabel>
        <h1>
          Aura Beauty — <em>texture you can feel</em> through a screen
        </h1>
        <p className="cs-lede">
          A scroll-driven 3D showcase for a premium cosmetics brand. As you scroll, the product
          rotates and morphs through the story in real time — built with Next.js, React Three
          Fiber and GSAP, and held at 60 FPS.
        </p>
        <div className="cs-roles">
          <StatusPill>Frontend Engineer</StatusPill>
          <StatusPill>Designer</StatusPill>
          <StatusPill>3D / WebGL</StatusPill>
          <StatusPill>Motion</StatusPill>
        </div>
        {aura?.image && <CSImage src={aura.image} alt="Aura Beauty 3D product showcase" />}
      </div>

      {/* ---------- 1. problem ---------- */}
      <Section num={1} label="The Problem">
        <H2>Product photos can't show how a product feels.</H2>
        <P>
          Cosmetics are chosen by texture, finish and shade — exactly the qualities a flat product
          photo loses. Online, a premium formula looks the same as a cheap one.
        </P>
        <P>
          <Highlight>The core question:</Highlight> How might a web page make a product feel
          tangible, without a store shelf or a tester?
        </P>
      </Section>

      {/* ---------- 2. approach ---------- */}
      <Section num={2} label="The Approach">
        <H2>Let the scroll tell the story.</H2>
        <Bullets
          items={[
            "The product is a live 3D model, not a video: it rotates and morphs as the visitor scrolls, so they set the pace of the story.",
            "Designed directly in code — the scene, lighting, motion and type were tuned in the browser, where they would actually be seen.",
            "Every effect has to serve the product: frosted glass for the packaging, live shade tinting for the formula, and nothing purely decorative.",
          ]}
        />
      </Section>

      {/* ---------- 3. what I built ---------- */}
      <Section num={3} label="What I Built">
        <H2>One page, one product, fully interactive.</H2>
        <Bullets
          items={[
            <span key="1">
              <Highlight>Scroll-synced 3D product</Highlight> — rotates and morphs through each
              chapter of the story as the visitor scrolls, forwards and backwards.
            </span>,
            <span key="2">
              <Highlight>Frosted-glass shader materials</Highlight> — custom materials that give the
              packaging a soft, premium glass finish.
            </span>,
            <span key="3">
              <Highlight>Real-time shade tinting</Highlight> — the product's color changes live, so
              visitors can see each shade on the model itself.
            </span>,
            <span key="4">
              <Highlight>Cursor-tracking physics</Highlight> — the product responds gently to the
              pointer, so it feels like an object rather than an image.
            </span>,
            <span key="5">
              <Highlight>Production front end</Highlight> — Next.js, TypeScript and Tailwind CSS,
              deployed on Vercel.
            </span>,
          ]}
        />
      </Section>

      {/* ---------- 4. hard parts ---------- */}
      <Section num={4} label="Technical Challenges & Solutions">
        <H2>Where it got hard — and how it got solved.</H2>
        {/* VERIFY: is scroll → progress → scene how your ScrollTrigger setup actually works? */}
        <ChallengeCard
          challenge="Keeping the scroll and the 3D model perfectly in sync."
          solution="GSAP ScrollTrigger maps the scroll position to a single progress value that the React Three Fiber scene reads every frame, so the model's rotation and morph follow the scrollbar exactly — in both directions — without re-rendering React on every scroll event."
        />
        {/* VERIFY: describe your actual shader/material approach */}
        <ChallengeCard
          challenge="Frosted glass that still reads as a product."
          solution="Custom shader materials blur and tint what sits behind the glass surface, tuned so the packaging looks premium without the product disappearing into its own effect."
        />
        {/* VERIFY: what did you actually do to keep 60 FPS? */}
        <ChallengeCard
          challenge="Holding 60 FPS with shaders, physics and scrolling at once."
          solution="Per-frame work runs inside the render loop instead of React state, and effects are kept to what the scene actually needs — so the animation stays smooth while the page scrolls."
        />
        {/* VERIFY: how is shade tinting implemented? */}
        <ChallengeCard
          challenge="Shade changes that feel instant."
          solution="Switching shades updates the material's color directly, so the change appears in the same frame instead of rebuilding the material or reloading anything."
        />
      </Section>

      {/* ---------- 5. results ---------- */}
      <Section num={5} label="Results">
        <H2>A product page people play with.</H2>
        <StatGrid
          stats={[
            ["60 FPS", "scroll, shaders and physics together"],
            ["1 page", "a complete scroll-told product story"],
            ["Live", "deployed on Vercel"],
          ]}
        />
        <Bullets
          items={[
            "Turns a static product page into an interactive experience that shows texture, finish and shade.",
            "Covers the full frontend range in one piece: 3D, motion, shaders, and a production Next.js deploy.",
          ]}
        />
      </Section>

      {/* ---------- 6. lessons ---------- */}
      <Section num={6} label="Lessons Learned">
        <H2>What I'd carry into the next project.</H2>
        {/* VERIFY: make these your own — swap in what you actually learned */}
        <Bullets
          items={[
            <span key="1">
              <Highlight>Performance is a design decision.</Highlight> A beautiful effect that drops
              frames feels worse than a simpler one that stays smooth.
            </span>,
            <span key="2">
              <Highlight>Motion should follow the user.</Highlight> Tying the story to the scroll
              lets visitors move at their own pace instead of waiting for an animation.
            </span>,
            <span key="3">
              <Highlight>Effects must serve the product.</Highlight> Every shader and animation had
              to make the product clearer, not just the page flashier.
            </span>,
          ]}
        />
      </Section>

      <CTAFooter
        message="Thanks for reading! Try it yourself:"
        demo={aura?.demo}
        source={aura?.github}
      />
    </CaseStudyShell>
  );
}