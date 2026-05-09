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