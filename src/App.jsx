import { useEffect, useRef, useState, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const projects = [
  {
    title: "Student Bazaar",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS"],
    desc: "Developed Student Bazaar, a full-stack student marketplace platform using React, Node.js, Express.js, and MongoDB. Implemented JWT-based authentication and role-based access control with an admin approval/rejection workflow for content moderation. Built RESTful APIs and product lifecycle features including posting, updating, and deleting listings. Designed a responsive and user-friendly frontend enabling seamless buyer-seller communication through email and phone integration.",
    github: "https://github.com/santosh7273/Studentbazaar",
    live: "https://studentbazaar.vercel.app/",
    tag: "Full Stack",
    color: "#8b5cf6",
  },
  {
    title: "Hair & Scalp Disease Detection",
    tech: ["Angular", "Flask", "TensorFlow", "EfficientNetB0"],
    desc: "AI diagnostic platform using CNN with EfficientNetB0 — delivering real-time hair and scalp disease classification, confidence scoring, and personalized treatment recommendations.",
    github: "https://github.com/santosh7273/skFinalYearProject",
    live: "https://sk-final-year-project.vercel.app/",
    tag: "AI / ML",
    color: "#06b6d4",
  },
  {
    title: "Medical Image Analyzer",
    tech: ["React.js", "Tailwind CSS", "Gemini API", "Clerk Authentication"],
    desc: "Gemini-powered AI medical imaging tool delivering disease identification, prediction confidence, actionable precautions, and specialist referral recommendations and also progress tracking with historical data visualization and personalized health insights.",
    github: "https://github.com/santosh7273/hacktblkn",
    live: "https://hacktblkn.vercel.app/",
    tag: "AI / Health",
    color: "#10b981",
  },
  {
    title: "Quote Bucket",
    tech: ["HTML", "CSS", "JavaScript", "API Ninjas"],
    desc: "Dynamic quote engine with 30+ curated categories, real-time API integration, and one-click Twitter sharing — clean UI, instant inspiration.",
    github: "https://github.com/santosh7273/Quote-Bucket",
    live: "https://quotebucket.netlify.app/",
    tag: "Frontend/API",
    color: "#f59e0b",
  },
];

const education = [
  {
    year: "2022 – 2026",
    title: "Vignan's Institute of Information Technology",
    sub: "B.Tech — Computer Science & Engineering",
    score: "CGPA 8.9 / 10",
  },
  {
    year: "2020 – 2022",
    title: "Sri Chaitanya Junior College",
    sub: "Intermediate — MPC",
    score: "96.4%",
  },
  {
    year: "2020",
    title: "Secondary Education — SSC",
    sub: "State Board of Secondary Education",
    score: "97%",
  },
];

const skillCategories = [
  { title: "Frontend", skills: ["React.js", "Angular", "TypeScript", "Tailwind CSS", "JavaScript", "HTML5", "CSS3"] },
  { title: "Backend & APIs", skills: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "RBAC", "SSO"] },
  { title: "Databases", skills: ["MongoDB", "MySQL", "Schema Design",] },
  { title: "AI & ML", skills: ["TensorFlow", "EfficientNetB0", "CNN", "Gemini API", "Flask"] },
  { title: "Languages", skills: ["C","C++","Python","Java","SQL"] },
  { title: "DevOps & Tools", skills: ["Git", "GitHub", "Vercel", "Render", "VS Code"] },
];

const achievements = [
  { num: "01", title: "Top 6 / 120+ Teams", org: "Infosys Hackathon", desc: "Ranked Top 6 / 120+ participants in Infosys Hackathon focused on UI-to-code conversion and debugging challenges." },
  { num: "02", title: "Winner — WorthyHack Hackathon", org: "Cacheho", desc: "Winner of WorthyHack Hackathon conducted by Cacheho for an innovative full-stack solution." },
  { num: "03", title: "450+ Problems · Rating 1574", org: "LeetCode", desc: "Demonstrated strong problem-solving skills by completing over 450+ coding challenges on LeetCode." },
  { num: "04", title: "2-Star · CodeChef Rating (Peak: 1482)", org: "CodeChef", desc: "Recognized competitive programmer with strong performance in time-constrained contests." },
];

const certifications = [
  { name: "Full-Stack Web Development", issuer: "Udemy" },
  { name: "Python Essentials", issuer: "Cisco Networking Academy" },
  { name: "Relational Database Systems", issuer: "edX" },
  { name: "Git and GitHub Essentials", issuer: "Udemy" },
  { name: "AI Tools Workshop", issuer: "Be10x" },
];

const stats = [
  { count: 450, suffix: "+", label: "LeetCode" },
  { count: 4, suffix: "", label: "Live Projects" },
  { count: 6, suffix: "mo", label: "Infosys" },
  { count: 2, suffix: "", label: "Hackathon Wins" },
];

const phrases = ["Full Stack Developer", "MERN Stack Engineer", "MEAN Stack Engineer", "Competitive Programmer", "Problem Solver", "Tech Enthusiast", "AI Explorer"];
const navLinks = ["Home", "About", "Education", "Skills", "Projects", "Internship", "Achievements", "Contact"];

// ─── SVG ICONS ───────────────────────────────────────────────────────────────

const IconGithub = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const IconLinkedin = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const IconLeetcode = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
  </svg>
);

const IconCodechef = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    {/* Chef Hat - puff top */}
    <path d="M12 1.5c-1.2 0-2.2.6-2.8 1.5-.4-.2-.8-.3-1.2-.3-1.5 0-2.7 1.2-2.7 2.7 0 .5.1 1 .4 1.4C5 7.4 4.5 8.2 4.5 9c0 1.2.8 2.2 2 2.5V13h11v-1.5c1.2-.3 2-1.3 2-2.5 0-.8-.5-1.6-1.2-2.1.3-.4.4-.9.4-1.4 0-1.5-1.2-2.7-2.7-2.7-.4 0-.8.1-1.2.3C14.2 2.1 13.2 1.5 12 1.5z"/>
    {/* Hat band */}
    <rect x="5" y="12.5" width="14" height="1.5" rx="0.3"/>
    {/* Face */}
    <path d="M7 14v5.5c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V14H7z"/>
    {/* Left < bracket */}
    <path d="M6.5 16.5L4 18l2.5 1.5v-1.2L5.2 18l1.3-.8v-1.2z"/>
    {/* Right > bracket */}
    <path d="M17.5 16.5L20 18l-2.5 1.5v-1.2L18.8 18l-1.3-.8v-1.2z"/>
    {/* Left eye */}
    <circle cx="10" cy="16.5" r="0.8" fill="white"/>
    {/* Right eye */}
    <circle cx="14" cy="16.5" r="0.8" fill="white"/>
    {/* Mustache left */}
    <path d="M9.5 18.5c.5-.6 1.2-.5 2.5-.5" stroke="white" strokeWidth="0.7" fill="none" strokeLinecap="round"/>
    {/* Mustache right */}
    <path d="M12 18c1.3 0 2-.1 2.5.5" stroke="white" strokeWidth="0.7" fill="none" strokeLinecap="round"/>
  </svg>
);

const IconExternal = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const IconCheck = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const IconX = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const IconWarn = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <triangle points="10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const IconMail = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const IconPin = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconStatus = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useTyping(phrases) {
  const [text, setText] = useState("");
  const state = useRef({ phraseIdx: 0, charIdx: 0, deleting: false });
  useEffect(() => {
    const s = state.current;
    const phrase = phrases[s.phraseIdx];
    const delay = s.deleting ? 55 : s.charIdx === phrase.length ? 2000 : 100;
    const t = setTimeout(() => {
      if (!s.deleting) {
        setText(phrase.slice(0, s.charIdx + 1));
        if (s.charIdx + 1 === phrase.length) s.deleting = true;
        else s.charIdx++;
      } else {
        setText(phrase.slice(0, s.charIdx - 1));
        if (s.charIdx - 1 === 0) { s.deleting = false; s.phraseIdx = (s.phraseIdx + 1) % phrases.length; s.charIdx = 0; }
        else s.charIdx--;
      }
    }, delay);
    return () => clearTimeout(t);
  });
  return text;
}

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useCounter(target, active) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const dur = 1200; const start = Date.now();
    const tick = () => { const p = Math.min((Date.now() - start) / dur, 1); setVal(Math.round(p * target)); if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }, [active, target]);
  return val;
}

// ─── STYLES ──────────────────────────────────────────────────────────────────

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&family=Playfair+Display:wght@700;800;900&display=swap');

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; min-width: 0; }

:root {
  --bg: #080b10;
  --bg2: #0d1117;
  --line: rgba(255,255,255,0.07);
  --accent: #4fffb0;
  --accent2: #00b4ff;
  --text: #eceef3;
  --muted: #5a6070;
  --muted2: #9099aa;
  --card: rgba(255,255,255,0.025);
  --card-border: rgba(255,255,255,0.08);
  --display: 'Playfair Display', serif;
  --body: 'DM Sans', sans-serif;
  --r: 14px;
}

html { scroll-behavior: smooth; overflow-x: hidden; }
body { background: var(--bg); color: var(--text); font-family: var(--body); font-size: 15px; -webkit-font-smoothing: antialiased; overflow-x: hidden; }

/* SCROLL PROGRESS */
#scroll-bar { position: fixed; top: 0; left: 0; height: 2px; width: 0%; background: linear-gradient(90deg, var(--accent), var(--accent2)); z-index: 9999; transition: width 0.08s linear; }

/* ── NAV ── */
nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  padding: 0 clamp(1.25rem, 5vw, 4rem);
  display: flex; align-items: center; justify-content: space-between;
  height: 68px; transition: background 0.3s, border-color 0.3s;
}
nav.scrolled { background: rgba(8,11,16,0.93); backdrop-filter: blur(14px); border-bottom: 1px solid var(--line); }
.nav-logo { font-family: var(--display); font-weight: 900; font-size: 1.45rem; color: var(--text); letter-spacing: -0.02em; text-decoration: none; }
.nav-logo span { color: var(--accent); }
.nav-links { display: flex; gap: 2.25rem; }
.nav-links a { color: var(--muted); font-size: 0.79rem; font-weight: 500; letter-spacing: 0.07em; text-transform: uppercase; text-decoration: none; transition: color 0.2s; }
.nav-links a:hover { color: var(--text); }
.nav-hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 6px; background: none; border: none; }
.nav-hamburger span { display: block; width: 24px; height: 2px; background: var(--text); transition: all 0.28s; border-radius: 2px; }
.nav-hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
.nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.nav-hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
.nav-mobile { display: none; position: fixed; top: 68px; left: 0; right: 0; background: rgba(8,11,16,0.98); backdrop-filter: blur(18px); border-bottom: 1px solid var(--line); padding: 1.5rem clamp(1.25rem,5vw,4rem); flex-direction: column; gap: 0; z-index: 998; }
.nav-mobile.open { display: flex; }
.nav-mobile a { color: var(--muted2); font-size: 0.97rem; font-weight: 500; text-decoration: none; padding: 0.9rem 0; border-bottom: 1px solid var(--line); transition: color 0.2s; }
.nav-mobile a:last-child { border-bottom: none; }
.nav-mobile a:hover { color: var(--accent); }
@media (max-width: 820px) { .nav-links { display: none; } .nav-hamburger { display: flex; } }

/* ── SECTIONS ── */
.sec-wrap { position: relative; padding: 7rem clamp(1.25rem, 5vw, 4rem); max-width: 1160px; margin: 0 auto; }
.divider { width: 100%; height: 1px; background: var(--line); }

/* ── SECTION HEADER ── */
.sec-eyebrow { font-size: 0.76rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); margin-bottom: 0.9rem; display: block; }
.sec-title { font-family: var(--display); font-size: clamp(2rem, 4.5vw, 3.2rem); font-weight: 900; line-height: 1.08; letter-spacing: -0.025em; color: var(--text); margin-bottom: 1rem; }
.sec-sub { font-size: 1rem; color: var(--muted2); max-width: 520px; line-height: 1.72; }
.header-block { margin-bottom: 4rem; }

/* ── HERO ── */
#home {
  min-height: 100vh; display: flex; align-items: center;
  padding: 68px clamp(1.25rem,5vw,4rem) 4rem;
  max-width: 100%; overflow: hidden; position: relative;
}
.hero-bg { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.hero-orb { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.11; will-change: transform; }
.hero-orb-1 { width: 560px; height: 560px; background: var(--accent); top: 5%; left: -8%; animation: orbFloat 9s ease-in-out infinite; }
.hero-orb-2 { width: 400px; height: 400px; background: var(--accent2); top: 25%; right: -6%; animation: orbFloat 11s ease-in-out infinite reverse; }
@keyframes orbFloat { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-28px); } }

.hero-inner { max-width: 1160px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 5rem; align-items: center; }

/* ── CHANGE 1: Show code window on small screens (stacked below hero text) ── */
@media (max-width: 960px) { .hero-inner { grid-template-columns: 1fr; gap: 2.5rem; } .hero-right { display: block; } }

.hero-badge {
  display: inline-flex; align-items: center; gap: 0.55rem;
  border: 1px solid rgba(79,255,176,0.22); border-radius: 100px;
  padding: 0.45rem 1.1rem; font-size: 0.8rem; font-weight: 600;
  color: var(--accent); letter-spacing: 0.04em; margin-bottom: 2rem;
  background: rgba(79,255,176,0.04);
}
.hero-badge .dot { width: 7px; height: 7px; border-radius: 50%; background: #22c55e; animation: pulse 2s infinite; flex-shrink: 0; }
@keyframes pulse { 0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.5;transform:scale(1.35);} }

.hero-name { font-family: var(--display); font-size: clamp(2.6rem, 6.5vw, 5rem); font-weight: 900; line-height: 1.04; letter-spacing: -0.03em; color: var(--text); margin-bottom: 0.6rem; }
.hero-name em { font-style: normal; background: linear-gradient(130deg, var(--accent) 10%, var(--accent2) 90%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

.hero-typed { font-size: clamp(1rem, 2.2vw, 1.35rem); color: var(--muted2); font-weight: 400; min-height: 2rem; margin-bottom: 1.6rem; letter-spacing: -0.01em; }
.hero-typed .cursor { display: inline-block; width: 2px; height: 1.1em; background: var(--accent); margin-left: 3px; vertical-align: text-bottom; animation: blink 1s step-end infinite; }
@keyframes blink { 0%,100%{opacity:1;}50%{opacity:0;} }

.hero-desc { font-size: 1rem; color: var(--muted2); line-height: 1.76; max-width: 480px; margin-bottom: 2.25rem; }

.hero-actions { display: flex; gap: 0.85rem; flex-wrap: wrap; margin-bottom: 2.75rem; }
.btn-primary { background: var(--accent); color: #000; font-weight: 700; font-size: 0.9rem; letter-spacing: 0.04em; padding: 0.85rem 1.85rem; border-radius: 8px; text-decoration: none; transition: transform 0.2s, box-shadow 0.2s; display: inline-flex; align-items: center; gap: 0.45rem; white-space: nowrap; }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(79,255,176,0.28); }
.btn-ghost { border: 1px solid var(--card-border); color: var(--text); font-weight: 500; font-size: 0.9rem; letter-spacing: 0.02em; padding: 0.85rem 1.7rem; border-radius: 8px; text-decoration: none; transition: all 0.2s; background: transparent; display: inline-flex; align-items: center; gap: 0.45rem; white-space: nowrap; }
.btn-ghost:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.16); }

.hero-socials { display: flex; gap: 0.65rem; }
.social-link { width: 44px; height: 44px; border-radius: 10px; border: 1px solid var(--card-border); background: var(--card); display: flex; align-items: center; justify-content: center; color: var(--muted); text-decoration: none; transition: all 0.2s; }
.social-link:hover { color: var(--text); border-color: rgba(255,255,255,0.16); background: rgba(255,255,255,0.06); transform: translateY(-2px); }

/* Hero code window */
.hero-right { position: relative; }
.code-window { background: #0d1117; border: 1px solid var(--card-border); border-radius: 14px; overflow: hidden; font-family: 'Courier New', monospace; font-size: 0.86rem; box-shadow: 0 30px 90px rgba(0,0,0,0.55); }
.code-titlebar { background: #161b22; padding: 0.85rem 1.1rem; display: flex; align-items: center; gap: 0.55rem; border-bottom: 1px solid var(--card-border); }
.dot-r { width: 12px; height: 12px; border-radius: 50%; background: #ff5f57; }
.dot-y { width: 12px; height: 12px; border-radius: 50%; background: #febc2e; }
.dot-g { width: 12px; height: 12px; border-radius: 50%; background: #28c840; }
.code-fname { margin-left: auto; color: var(--muted); font-size: 0.76rem; }
.code-body { padding: 1.5rem; line-height: 1.9; color: #8b949e; }
.kw { color: #ff7b72; } .fn { color: #79c0ff; } .str { color: #a5d6ff; } .prop { color: #ffa657; } .cm { color: #484f58; } .num { color: #f2cc60; } .acc { color: #4fffb0; }

/* ── ABOUT ── */
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--line); border: 1px solid var(--line); border-radius: var(--r); overflow: hidden; margin-bottom: 1.5rem; }
@media (max-width: 680px) { .about-grid { grid-template-columns: 1fr; } }
.about-card { background: var(--bg2); padding: 2rem; transition: background 0.2s; }
.about-card:hover { background: #101520; }
.about-card-icon { font-size: 1.45rem; margin-bottom: 0.9rem; }
.about-card-title { font-weight: 700; font-size: 1rem; color: var(--text); margin-bottom: 0.55rem; }
.about-card-desc { font-size: 0.91rem; color: var(--muted2); line-height: 1.72; }

.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); border-radius: var(--r); overflow: hidden; }
@media (max-width: 560px) { .stats-row { grid-template-columns: repeat(2, 1fr); } }
.stat-cell { background: var(--bg2); padding: 1.75rem 1rem; text-align: center; }
.stat-num { font-family: var(--display); font-size: 2.5rem; font-weight: 900; background: linear-gradient(135deg, var(--accent), var(--accent2)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1; margin-bottom: 0.45rem; }
.stat-label { font-size: 0.78rem; color: var(--muted); font-weight: 500; letter-spacing: 0.07em; text-transform: uppercase; }

/* ── EDUCATION ── */
.timeline { position: relative; padding-left: 2.25rem; max-width: 680px; }
.timeline::before { content: ''; position: absolute; left: 0; top: 0.5rem; bottom: 0; width: 1px; background: linear-gradient(to bottom, var(--accent), var(--accent2), transparent); }
.t-item { position: relative; margin-bottom: 2rem; }
.t-item:last-child { margin-bottom: 0; }
.t-dot { position: absolute; left: -2.6rem; top: 0.4rem; width: 10px; height: 10px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 14px rgba(79,255,176,0.55); border: 2px solid var(--bg); }
.t-year { font-size: 0.76rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); margin-bottom: 0.45rem; }
.t-card { background: var(--card); border: 1px solid var(--card-border); border-radius: 12px; padding: 1.5rem 1.75rem; transition: border-color 0.2s; }
.t-card:hover { border-color: rgba(79,255,176,0.22); }
.t-title { font-weight: 700; font-size: 1rem; color: var(--text); margin-bottom: 0.3rem; }
.t-sub { font-size: 0.91rem; color: var(--muted2); margin-bottom: 0.9rem; }
.t-badge { display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.83rem; font-weight: 600; color: var(--accent); background: rgba(79,255,176,0.07); border: 1px solid rgba(79,255,176,0.18); border-radius: 5px; padding: 0.3rem 0.75rem; }

/* ── SKILLS ── */
.skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); border-radius: var(--r); overflow: hidden; }
@media (max-width: 860px) { .skills-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 520px) { .skills-grid { grid-template-columns: 1fr; } }
.skill-cell { background: var(--bg2); padding: 2rem; transition: background 0.2s; }
.skill-cell:hover { background: #101520; }
.skill-cat { font-size: 0.78rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); margin-bottom: 1.1rem; display: flex; align-items: center; gap: 0.6rem; }
.skill-cat::before { content: ''; display: block; width: 20px; height: 1px; background: var(--accent); flex-shrink: 0; }
.chips { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.chip { font-size: 0.83rem; font-weight: 500; color: var(--muted2); background: rgba(255,255,255,0.04); border: 1px solid var(--card-border); border-radius: 5px; padding: 0.3rem 0.75rem; transition: all 0.15s; cursor: default; }
.chip:hover { color: var(--text); background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.14); }

/* ── PROJECTS ── */
.projects-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
@media (max-width: 680px) { .projects-grid { grid-template-columns: 1fr; } }
.project-card { background: var(--card); border: 1px solid var(--card-border); border-radius: var(--r); overflow: hidden; transition: all 0.25s; display: flex; flex-direction: column; }
.project-card:hover { border-color: rgba(255,255,255,0.13); transform: translateY(-4px); box-shadow: 0 20px 56px rgba(0,0,0,0.45); }
.project-header { padding: 1.6rem 1.6rem 0; display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.9rem; }
.project-tag { font-size: 0.73rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.28rem 0.65rem; border-radius: 5px; }
.project-links { display: flex; gap: 0.5rem; }
.proj-link { width: 34px; height: 34px; border-radius: 7px; border: 1px solid var(--card-border); background: transparent; display: flex; align-items: center; justify-content: center; color: var(--muted); text-decoration: none; transition: all 0.15s; }
.proj-link:hover { color: var(--text); border-color: rgba(255,255,255,0.15); background: rgba(255,255,255,0.05); }
.project-body { padding: 0 1.6rem 1.6rem; flex: 1; }
.project-title { font-weight: 700; font-size: 1.03rem; color: var(--text); margin-bottom: 0.55rem; line-height: 1.35; }

/* ── CHANGE 2: Removed line-clamp — full description now shown ── */
.project-desc { font-size: 0.9rem; color: var(--muted2); line-height: 1.72; margin-bottom: 1.1rem; }

.project-tech { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.tech-tag { font-size: 0.76rem; font-weight: 500; color: var(--muted); background: rgba(255,255,255,0.04); border: 1px solid var(--card-border); border-radius: 4px; padding: 0.2rem 0.6rem; }

/* ── INTERNSHIP ── */
.intern-card { background: var(--card); border: 1px solid var(--card-border); border-radius: var(--r); padding: 2.25rem; }
.intern-header { display: flex; gap: 1.4rem; align-items: flex-start; margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 1px solid var(--line); }
@media (max-width: 480px) { .intern-header { flex-direction: column; } }
.intern-logo { width: 58px; height: 58px; border-radius: 12px; background: linear-gradient(135deg, #0052cc, #0078ff); display: flex; align-items: center; justify-content: center; font-family: var(--display); font-size: 0.7rem; font-weight: 900; color: #fff; line-height: 1.25; text-align: center; flex-shrink: 0; letter-spacing: 0.05em; }
.intern-role { font-size: 0.78rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); margin-bottom: 0.35rem; }
.intern-company { font-family: var(--display); font-size: 1.7rem; font-weight: 900; color: var(--text); margin-bottom: 0.35rem; }
.intern-meta { font-size: 0.88rem; color: var(--muted); }
.intern-points { display: flex; flex-direction: column; gap: 1rem; }
.intern-point { display: flex; gap: 0.85rem; font-size: 0.94rem; color: var(--muted2); line-height: 1.72; }
.intern-point::before { content: '→'; color: var(--accent); flex-shrink: 0; font-size: 0.95rem; margin-top: 0.05rem; }

/* ── ACHIEVEMENTS ── */
.ach-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
@media (max-width: 620px) { .ach-grid { grid-template-columns: 1fr; } }
.ach-card { background: var(--card); border: 1px solid var(--card-border); border-radius: var(--r); padding: 1.75rem; transition: all 0.2s; position: relative; overflow: hidden; }
.ach-card:hover { border-color: rgba(255,255,255,0.12); transform: translateY(-3px); }
.ach-num { font-family: var(--display); font-size: 3.5rem; font-weight: 900; color: rgba(255,255,255,0.04); position: absolute; top: -0.4rem; right: 1.1rem; line-height: 1; pointer-events: none; }
.ach-org { font-size: 0.76rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); margin-bottom: 0.5rem; }
.ach-title { font-weight: 700; font-size: 1rem; color: var(--text); margin-bottom: 0.55rem; line-height: 1.35; }
.ach-desc { font-size: 0.9rem; color: var(--muted2); line-height: 1.72; }

/* ── CERTIFICATIONS ── */
.cert-section-label { font-size: 0.78rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin-bottom: 1.4rem; margin-top: 3.5rem; display: block; }
.cert-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.85rem; }
@media (max-width: 860px) { .cert-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 520px) { .cert-grid { grid-template-columns: 1fr; } }
.cert-item { background: var(--card); border: 1px solid var(--card-border); border-radius: 10px; padding: 1.1rem 1.25rem; transition: all 0.2s; }
.cert-item:hover { border-color: rgba(255,255,255,0.12); background: rgba(255,255,255,0.04); }
.cert-name { font-weight: 600; font-size: 0.93rem; color: var(--text); margin-bottom: 0.3rem; line-height: 1.35; }
.cert-issuer { font-size: 0.8rem; color: var(--muted); }

/* ── CONTACT ── */
.contact-layout { display: grid; grid-template-columns: 1fr 1.15fr; gap: 3.5rem; align-items: start; }
@media (max-width: 780px) { .contact-layout { grid-template-columns: 1fr; gap: 2.25rem; } }
.contact-info-title { font-family: var(--display); font-size: 1.8rem; font-weight: 900; color: var(--text); margin-bottom: 0.85rem; line-height: 1.15; }
.contact-info-desc { font-size: 0.98rem; color: var(--muted2); line-height: 1.76; margin-bottom: 2rem; }
.contact-detail { display: flex; gap: 1rem; align-items: flex-start; margin-bottom: 1.15rem; }
.contact-detail-icon { width: 42px; height: 42px; border-radius: 10px; background: rgba(79,255,176,0.06); border: 1px solid rgba(79,255,176,0.14); display: flex; align-items: center; justify-content: center; color: var(--accent); flex-shrink: 0; }
.contact-detail-label { font-size: 0.74rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 0.18rem; }
.contact-detail-value { font-size: 0.94rem; color: var(--text); font-weight: 500; }

/* ── FORM ── */
.form-card { background: var(--card); border: 1px solid var(--card-border); border-radius: var(--r); padding: 2rem; }
.form-group { margin-bottom: 1.35rem; }
.form-label { display: block; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.09em; text-transform: uppercase; color: var(--muted2); margin-bottom: 0.55rem; }
.form-input { width: 100%; background: rgba(255,255,255,0.03); border: 1px solid var(--card-border); border-radius: 9px; padding: 0.9rem 1.1rem; color: var(--text); font-family: var(--body); font-size: 0.96rem; outline: none; transition: all 0.2s; resize: none; }
.form-input::placeholder { color: var(--muted); }
.form-input:focus { border-color: rgba(79,255,176,0.38); background: rgba(79,255,176,0.025); }
.btn-submit { width: 100%; background: var(--accent); color: #000; font-weight: 700; font-size: 0.94rem; letter-spacing: 0.04em; padding: 0.95rem 1.5rem; border-radius: 9px; border: none; cursor: pointer; transition: all 0.2s; font-family: var(--body); margin-top: 0.35rem; }
.btn-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(79,255,176,0.28); }
.btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }

/* ── TOAST ── */
.toast {
  position: fixed; bottom: 1.75rem; right: 1.75rem; z-index: 9999;
  padding: 1rem 1.4rem; border-radius: 12px; font-size: 0.97rem; font-weight: 600;
  transform: translateY(120px); opacity: 0; transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
  max-width: min(380px, calc(100vw - 3.5rem));
  display: flex; align-items: center; gap: 0.75rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  pointer-events: none;
}
.toast.show { transform: translateY(0); opacity: 1; }
.toast.success { background: rgba(22,163,74,0.14); border: 1px solid rgba(34,197,94,0.3); color: #4ade80; }
.toast.error   { background: rgba(220,38,38,0.12); border: 1px solid rgba(239,68,68,0.3); color: #f87171; }
.toast.warn    { background: rgba(217,119,6,0.12);  border: 1px solid rgba(251,191,36,0.3); color: #fbbf24; }
.toast-icon { flex-shrink: 0; display: flex; align-items: center; }
.toast-msg { line-height: 1.4; }

/* ── FOOTER ── */
footer { border-top: 1px solid var(--line); padding: 2.25rem clamp(1.25rem,5vw,4rem); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; }
.footer-logo { font-family: var(--display); font-weight: 900; font-size: 1.18rem; color: var(--text); }
.footer-copy { font-size: 0.86rem; color: var(--muted); }

/* ── ANIMATIONS ── */
.reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.6s ease, transform 0.6s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }
.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.18s; }
.reveal-delay-3 { transition-delay: 0.26s; }
.reveal-delay-4 { transition-delay: 0.34s; }
`;

// ─── STAT COUNTER ─────────────────────────────────────────────────────────────

function StatCell({ count, suffix, label }) {
  const [ref, inView] = useInView(0.3);
  const val = useCounter(count, inView);
  return (
    <div ref={ref} className="stat-cell">
      <div className="stat-num">{val}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

// ─── CODE WINDOW ──────────────────────────────────────────────────────────────

function CodeWindow() {
  return (
    <div className="code-window">
      <div className="code-titlebar">
        <div className="dot-r" /><div className="dot-y" /><div className="dot-g" />
        <span className="code-fname">portfolio.ts</span>
      </div>
      <div className="code-body">
        <div><span className="kw">const</span> <span className="fn">developer</span> = {"{"}</div>
        <div>&nbsp;&nbsp;<span className="prop">name</span>: <span className="str">"T. Santosh Kumar"</span>,</div>
        <div>&nbsp;&nbsp;<span className="prop">role</span>: <span className="str">"Full Stack Developer"</span>,</div>
        <div>&nbsp;&nbsp;<span className="prop">stack</span>: [<span className="str">"MERN"</span>, <span className="str">"MEAN"</span>],</div>
        <div>&nbsp;&nbsp;<span className="prop">Ai</span>: [<span className="str">"TensorFlow"</span>, <span className="str">"Gemini AI"</span>],</div>
        <div>&nbsp;&nbsp;<span className="prop">cgpa</span>: <span className="num">8.9</span>,</div>
        <div>&nbsp;&nbsp;<span className="prop">leetcode</span>: <span className="num">450</span><span className="acc">+ problems solved</span>,</div> 
        <div>&nbsp;&nbsp;<span className="prop">status</span>: <span className="acc">"available"</span>,</div>
        <div>{"}"}</div>
        <div style={{marginTop:"0.6rem"}}><span className="cm">// Infosys MEAN Stack Intern — Dec 2025</span></div>
        <div><span className="cm">// Building Reliable systems</span></div>
      </div>
    </div>
  );
}

// ─── TOAST ────────────────────────────────────────────────────────────────────

function Toast({ show, msg, type }) {
  const icon = type === "success" ? <IconCheck size={20} /> : type === "warn" ? <IconWarn size={20} /> : <IconX size={20} />;
  return (
    <div className={`toast ${type} ${show ? "show" : ""}`}>
      <span className="toast-icon">{icon}</span>
      <span className="toast-msg">{msg}</span>
    </div>
  );
}

// ─── SECTIONS ─────────────────────────────────────────────────────────────────

function Hero({ typed }) {
  return (
    <section id="home" style={{paddingTop:0,maxWidth:'100%',padding:0,position:'relative',overflow:'hidden',minHeight:'100vh',display:'flex',alignItems:'center'}}>
      <div className="hero-bg">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
      </div>
      <div className="hero-inner" style={{padding:'68px clamp(1.25rem,5vw,4rem) 4rem',maxWidth:'1160px',margin:'0 auto',width:'100%',display:'grid',alignItems:'center'}}>
        <div>
          <div className="hero-badge"><span className="dot" /> Available for opportunities</div>
          <h1 className="hero-name">Hi, I'm<br /><em>T. Santosh Kumar</em></h1>
          <div className="hero-typed">{typed}<span className="cursor" /></div>
          <p className="hero-desc">Full-Stack Engineer building reliable systems, AI-powered platforms, and scalable architectures — where precision meets great design.</p>
          <div className="hero-actions">
            <a href="#projects" className="btn-primary">⚡ View Projects</a>
            <a href="#contact" className="btn-ghost">Get In Touch</a>
            <a href="/santoshKumarFinalResume.pdf" download className="btn-ghost">↓ Resume</a>
          </div>
          <div className="hero-socials">
            <a href="https://github.com/santosh7273" target="_blank" rel="noreferrer" className="social-link" title="GitHub"><IconGithub size={19} /></a>
            <a href="https://www.linkedin.com/in/t-santosh-kumar-41b500270/" target="_blank" rel="noreferrer" className="social-link" title="LinkedIn"><IconLinkedin size={19} /></a>
            <a href="https://leetcode.com/u/santosh73/" target="_blank" rel="noreferrer" className="social-link" title="LeetCode"><IconLeetcode size={19} /></a>
            <a href="https://www.codechef.com/users/santosh72" target="_blank" rel="noreferrer" className="social-link" title="CodeChef"><IconCodechef size={19} /></a>
          </div>
        </div>
        <div className="hero-right"><CodeWindow /></div>
      </div>
    </section>
  );
}

function About() {
  const [ref, visible] = useInView();
  const cards = [
    { icon:"⚡", title:"Full-Stack Developer", desc:"B.Tech CSE Graduate at Vignan's Institute — architecting scalable full-stack systems with AI integrations, RESTful APIs, and enterprise auth flows." },
    { icon:"🧠", title:"Problem Solver", desc:"450+ LeetCode solutions and competitive programming background — turning algorithmic thinking into production-grade code that performs under pressure." },
    { icon:"🚀", title:"AI Builder", desc:"Shipped production AI systems — CNN disease detection, Gemini-powered medical analyzers — merging deep learning with intuitive frontends for real-world impact." },
    { icon:"🏆", title:"Enterprise Experience", desc:"Infosys MEAN Stack intern — built RBAC-secured modules, SSO authentication, and dashboards serving real enterprise workflows at scale." },
  ];
  return (
    <section id="about" className="sec-wrap">
      <div className={`header-block reveal ${visible ? "visible" : ""}`} ref={ref}>
        <span className="sec-eyebrow">01 — About</span>
        <h2 className="sec-title">The Engineer<br />Behind The Code</h2>
        <p className="sec-sub">Driven by curiosity, shaped by complexity — building systems that scale and experiences that resonate.</p>
      </div>
      <div className={`about-grid reveal ${visible ? "visible" : ""}`}>
        {cards.map((c, i) => (
          <div key={i} className="about-card">
            <div className="about-card-icon">{c.icon}</div>
            <div className="about-card-title">{c.title}</div>
            <div className="about-card-desc">{c.desc}</div>
          </div>
        ))}
      </div>
      <div className={`stats-row reveal reveal-delay-2 ${visible ? "visible" : ""}`}>
        {stats.map((s, i) => <StatCell key={i} {...s} />)}
      </div>
    </section>
  );
}

function Education() {
  const [ref, visible] = useInView();
  return (
    <section id="education" className="sec-wrap">
      <div className={`header-block reveal ${visible ? "visible" : ""}`} ref={ref}>
        <span className="sec-eyebrow">02 — Education</span>
        <h2 className="sec-title">Academic Journey</h2>
        <p className="sec-sub">Consistently top-tier performance, building the theoretical foundations that power real-world engineering.</p>
      </div>
      <div className="timeline">
        {education.map((e, i) => (
          <div key={i} className={`t-item reveal reveal-delay-${i + 1} ${visible ? "visible" : ""}`}>
            <div className="t-dot" />
            <div className="t-year">{e.year}</div>
            <div className="t-card">
              <div className="t-title">{e.title}</div>
              <div className="t-sub">{e.sub}</div>
              <span className="t-badge">★ {e.score}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  const [ref, visible] = useInView();
  return (
    <section id="skills" className="sec-wrap">
      <div className={`header-block reveal ${visible ? "visible" : ""}`} ref={ref}>
        <span className="sec-eyebrow">03 — Skills</span>
        <h2 className="sec-title">Technical Arsenal</h2>
        <p className="sec-sub">Full-spectrum toolkit — from pixel-perfect frontends to resilient backends and intelligent AI pipelines.</p>
      </div>
      <div className={`skills-grid reveal ${visible ? "visible" : ""}`}>
        {skillCategories.map((cat, i) => (
          <div key={i} className="skill-cell">
            <div className="skill-cat">{cat.title}</div>
            <div className="chips">
              {cat.skills.map((sk, j) => <span key={j} className="chip">{sk}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const [ref, visible] = useInView();
  return (
    <section id="projects" className="sec-wrap">
      <div className={`header-block reveal ${visible ? "visible" : ""}`} ref={ref}>
        <span className="sec-eyebrow">04 — Work</span>
        <h2 className="sec-title">Shipped Products</h2>
        <p className="sec-sub">Production-deployed applications serving real users — from AI diagnostics to enterprise marketplaces.</p>
      </div>
      <div className={`projects-grid reveal ${visible ? "visible" : ""}`}>
        {projects.map((p, i) => (
          <div key={i} className="project-card">
            <div className="project-header">
              <span className="project-tag" style={{ color: p.color, background: `${p.color}16`, border: `1px solid ${p.color}30` }}>{p.tag}</span>
              <div className="project-links">
                <a href={p.github} target="_blank" rel="noreferrer" className="proj-link" title="GitHub"><IconGithub size={15} /></a>
                <a href={p.live} target="_blank" rel="noreferrer" className="proj-link" title="Live Demo"><IconExternal size={14} /></a>
              </div>
            </div>
            <div className="project-body">
              <div className="project-title">{p.title}</div>
              <div className="project-desc">{p.desc}</div>
              <div className="project-tech">{p.tech.map((t, j) => <span key={j} className="tech-tag">{t}</span>)}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Internship() {
  const [ref, visible] = useInView();
  const points = [
    "Contributed to development of an internal intern workflow management system using the MEAN stack, focusing on modules such as leave requests, resignation managment, project progress tracking, daily Updates and profile management.",
    "Worked on both frontend (Angular) and backend (Node.js + Express.js) for building REST APIs and interactive dashboards for intern activity tracking.",
    "Been a part of implementing role-based access control (RBAC), SSO(Single Sign On)-based authentication, and MongoDB schema design for structured and secure data handling",
  ];
  return (
    <section id="internship" className="sec-wrap">
      <div className={`header-block reveal ${visible ? "visible" : ""}`} ref={ref}>
        <span className="sec-eyebrow">05 — Experience</span>
        <h2 className="sec-title">Internship Experience</h2>
      </div>
      <div className={`intern-card reveal reveal-delay-1 ${visible ? "visible" : ""}`}>
        <div className="intern-header">
          <div className="intern-logo">INF<br />SYS</div>
          <div>
            <div className="intern-role">MEAN Stack Developer Intern</div>
            <div className="intern-company">Infosys</div>
            <div className="intern-meta">Dec 2025 – May 2026 &nbsp;·&nbsp; Mysore, Karnataka, India</div>
          </div>
        </div>
        <div className="intern-points">
          {points.map((pt, i) => <div key={i} className="intern-point">{pt}</div>)}
        </div>
      </div>
    </section>
  );
}

function Achievements() {
  const [ref, visible] = useInView();
  return (
    <section id="achievements" className="sec-wrap">
      <div className={`header-block reveal ${visible ? "visible" : ""}`} ref={ref}>
        <span className="sec-eyebrow">06 — Wins</span>
        <h2 className="sec-title">Achievements &<br />Recognition</h2>
      </div>
      <div className={`ach-grid reveal ${visible ? "visible" : ""}`}>
        {achievements.map((a, i) => (
          <div key={i} className="ach-card">
            <div className="ach-num">{a.num}</div>
            <div className="ach-org">{a.org}</div>
            <div className="ach-title">{a.title}</div>
            <div className="ach-desc">{a.desc}</div>
          </div>
        ))}
      </div>
      <span className="cert-section-label">Certifications</span>
      <div className={`cert-grid reveal reveal-delay-1 ${visible ? "visible" : ""}`}>
        {certifications.map((c, i) => (
          <div key={i} className="cert-item">
            <div className="cert-name">{c.name}</div>
            <div className="cert-issuer">{c.issuer}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [ref, visible] = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  const showToast = (msg, type) => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast(t => ({ ...t, show: false })), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { showToast("Please fill all fields.", "error"); return; }
    setLoading(true);
    try {
      const r = await fetch("https://poba.onrender.com/submit_form", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (r.ok) { showToast("Message sent successfully!", "success"); setForm({ name: "", email: "", message: "" }); }
      else showToast("Something went wrong. Please try again.", "error");
    } catch { showToast("Server offline — email me directly.", "warn"); }
    finally { setLoading(false); }
  };

  return (
    <>
      <Toast {...toast} />
      <section id="contact" className="sec-wrap">
        <div className={`header-block reveal ${visible ? "visible" : ""}`} ref={ref}>
          <span className="sec-eyebrow">07 — Contact</span>
          <h2 className="sec-title">Let's Connect</h2>
          <p className="sec-sub">Open to full-time roles, freelance projects, and collaborations. I respond fast.</p>
        </div>
        <div className="contact-layout">
          <div className={`reveal ${visible ? "visible" : ""}`}>
            <div className="contact-info-title">Get in touch 👋</div>
            <p className="contact-info-desc">Whether you're building something ambitious or exploring a partnership — let's create something remarkable together.</p>
            <div className="contact-detail">
              <div className="contact-detail-icon"><IconMail size={19} /></div>
              <div><div className="contact-detail-label">Email</div><div className="contact-detail-value">ktsantosh5@gmail.com</div></div>
            </div>
            <div className="contact-detail">
              <div className="contact-detail-icon"><IconPin size={19} /></div>
              <div><div className="contact-detail-label">Location</div><div className="contact-detail-value">Visakhapatnam, Andhra Pradesh</div></div>
            </div>
            <div className="contact-detail">
              <div className="contact-detail-icon"><IconStatus size={19} /></div>
              <div><div className="contact-detail-label">Status</div><div className="contact-detail-value">Available for opportunities</div></div>
            </div>
          </div>
          <div className={`reveal reveal-delay-2 ${visible ? "visible" : ""}`}>
            <div className="form-card">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input className="form-input" type="text" placeholder="Enter your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input className="form-input" type="email" placeholder="Enter your email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-input" rows={5} placeholder="Tell me about your project..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
                </div>
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? "Sending..." : "Send Message →"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const typed = useTyping(phrases);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const el = document.getElementById("scroll-bar");
      if (el) el.style.width = (window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100) + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scroll = useCallback((e, id) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <div id="scroll-bar" />

      <nav className={scrolled ? "scrolled" : ""}>
        <a className="nav-logo" href="#home" onClick={e => scroll(e, "#home")}>SK<span>.</span></a>
        <div className="nav-links">
          {navLinks.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={e => scroll(e, `#${l.toLowerCase()}`)}>{l}</a>
          ))}
        </div>
        <button className={`nav-hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(m => !m)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
      <div className={`nav-mobile ${menuOpen ? "open" : ""}`}>
        {navLinks.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} onClick={e => scroll(e, `#${l.toLowerCase()}`)}>{l}</a>
        ))}
      </div>

      <main>
        <Hero typed={typed} />
        <div className="divider" />
        <About />
        <div className="divider" />
        <Education />
        <div className="divider" />
        <Skills />
        <div className="divider" />
        <Projects />
        <div className="divider" />
        <Internship />
        <div className="divider" />
        <Achievements />
        <div className="divider" />
        <Contact />
      </main>

      <footer>
        <div className="footer-logo">T. Santosh Kumar</div>
        <p className="footer-copy">© 2026 · Full Stack Developer</p>
      </footer>
    </>
  );
}