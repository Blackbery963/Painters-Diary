// // glass.js — shared design tokens for the Painters' Diary glass system
// // Import this in both Header.jsx and Sidebar.jsx

// // ─── The one shell class used by every floating panel ────────────────────────
// // Light:  white/20 base · white/60 border · soft blue-tinted shadow
// // Dark:   black/30 base · white/10 border · deep black shadow
// // Both:   backdrop-blur-[36px] saturate-[160%]
// // Inset:  top shimmer (from-white/50) always points DOWN — one consistent grammar
// export const GLASS_SHELL = `
//   bg-white/20 dark:bg-black/30
//   backdrop-blur-[36px] backdrop-saturate-[160%]
//   border border-white/60 dark:border-white/10
//   shadow-[0_4px_24px_rgba(0,0,0,0.07),inset_0_1px_0_rgba(255,255,255,0.55)]
//   dark:shadow-[0_4px_24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)]
// `.trim();

// // Slightly more opaque pill for active nav items — reads clearly without breaking glass feel
// export const GLASS_ACTIVE = `
//   bg-white/55 dark:bg-white/10
//   border border-white/70 dark:border-white/10
//   shadow-[0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.7)]
//   dark:shadow-[0_2px_8px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.06)]
// `.trim();

// // Hover state
// export const GLASS_HOVER = `hover:bg-white/30 dark:hover:bg-white/6`;

// // Section divider
// export const GLASS_DIVIDER = `h-px bg-gradient-to-r from-transparent via-zinc-300/40 dark:via-white/8 to-transparent`;



// glass.js — single source of truth for the shared glass design system
// Import this in both Header.jsx and Sidebar.jsx

// ─── MOTION PRESETS ───────────────────────────────────────────────────────────
export const spring = {
  entry:   { type: "spring", stiffness: 300, damping: 28, mass: 0.8 },
  bounce:  { type: "spring", stiffness: 360, damping: 24, mass: 0.7 },
  snap:    { type: "spring", stiffness: 420, damping: 32, mass: 0.6 },
  subtle:  { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
};

// ─── GLASS SHELL CLASSNAMES ───────────────────────────────────────────────────
// One recipe — used identically for both Header and Sidebar shells
export const glassShell = [
  // fill
  "bg-white/[0.72] dark:bg-zinc-950/[0.68]",
  // blur + saturation
  "backdrop-blur-2xl backdrop-saturate-[160%]",
  // border — single consistent weight
  "border border-zinc-200/60 dark:border-white/[0.07]",
  // shadow — soft outer + inner top shimmer
  "shadow-[0_4px_24px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.75)]",
  "dark:shadow-[0_4px_24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.05)]",
].join(" ");

// ─── GLASS SURFACE (nested panels, dropdown rows) ─────────────────────────────
export const glassSurface = [
  "bg-white/50 dark:bg-white/[0.04]",
  "border border-zinc-200/50 dark:border-white/[0.06]",
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
].join(" ");

// ─── ACTIVE NAV ITEM ──────────────────────────────────────────────────────────
export const activeItem = [
  "bg-white/70 dark:bg-white/[0.08]",
  "border border-zinc-200/70 dark:border-white/[0.09]",
  "shadow-[0_1px_8px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)]",
  "dark:shadow-[0_1px_8px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.05)]",
  "text-zinc-900 dark:text-zinc-100",
].join(" ");

// ─── HOVER STATE ──────────────────────────────────────────────────────────────
export const hoverItem =
  "hover:bg-white/40 dark:hover:bg-white/[0.05] hover:text-zinc-900 dark:hover:text-zinc-100";

// ─── DIVIDER ──────────────────────────────────────────────────────────────────
export const divider =
  "h-px bg-gradient-to-r from-transparent via-zinc-300/50 dark:via-white/[0.08] to-transparent";