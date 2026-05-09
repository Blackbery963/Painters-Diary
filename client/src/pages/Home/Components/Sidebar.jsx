import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  Grid, Users, ShoppingBag, ChevronLeft, ChevronRight,
  Settings, HelpCircle, UserPlus, Bookmark, Moon,
  Compass, LayoutGrid, Search, MoreVertical, Blocks, Album,
  Sparkles, MessageCircle, MessageSquareText,
  Send,
  Flame,
  HeartHandshake,
  Images,
} from "lucide-react";

import {
  spring, glassShell, glassSurface, activeItem, hoverItem, divider,
} from "./Glass";
import { useTheme } from "../../../context/Theme.context";

// ─── NAV ITEMS ────────────────────────────────────────────────────────────────
const mainNavItems = [
  { id: "explore",    label: "Explore",    icon: Compass,     path: "/" },
  { id: "search",     label: "Search",     icon: Search,      path: "/search" },
  { id: "artstore",   label: "Art Store",  icon: ShoppingBag, path: "/artstore" },
  { id: "artist",     label: "Artist",     icon: UserPlus,    path: "/discover-artist" },
  { id: "diary",      label: "Diary",      icon: Album,       path: "/journal" },
];
const featureItems = [
  { id: "gallery",    label: "Gallery",    icon: Images,        path: "/gallery" },
  { id: "community",  label: "Community",  icon: HeartHandshake,       path: "/community" },
  { id: "categories", label: "Categories", icon: LayoutGrid,  path: "/category" },
  { id: "resources",  label: "Resources",  icon: Blocks,      path: "/Community/Resources/Hub" },
  { id: "save",       label: "Saved",      icon: Bookmark,    path: "/saved" },
];
const bottomItems = [
  { id: "help",       label: "Help",       icon: HelpCircle,  path: "/Resources/Help" },
  { id: "settings",   label: "Settings",   icon: Settings,    path: "/Settings" },
];

// ─── NAV ITEM ─────────────────────────────────────────────────────────────────
const NavItem = ({ item, isActive, collapsed, onClick, small = false }) => {
  const size = small ? 14 : 16;

  return (
    <Link
      to={item.path}
      onClick={onClick}
      className={`
        group relative flex items-center cursor-pointer outline-none select-none
        transition-all duration-200
        ${collapsed
          ? "w-full h-10 justify-center rounded-2xl"
          : `w-full rounded-2xl px-3 ${small ? "h-8" : "h-10"}`}
        ${isActive ? activeItem : `text-zinc-500 dark:text-zinc-500 ${hoverItem}`}
      `}
    >
      <item.icon
        size={size}
        strokeWidth={isActive ? 2.1 : 1.6}
        className="shrink-0 transition-transform duration-200 group-hover:scale-110"
      />

      {!collapsed && (
        <span className={`
          ml-2.5 text-[12.5px] whitespace-nowrap leading-none
          ${isActive ? "font-semibold" : "font-medium"}
          transition-all duration-200
        `}>
          {item.label}
        </span>
      )}

      {collapsed && (
        <div className={`
          pointer-events-none absolute left-[calc(100%+10px)] z-50
          px-2.5 py-1.5 rounded-[10px] whitespace-nowrap
          text-[11.5px] font-semibold text-zinc-900 dark:text-zinc-100
          ${glassShell}
          opacity-0 invisible translate-x-1
          group-hover:opacity-100 group-hover:visible group-hover:translate-x-0
          transition-all duration-150
        `}>
          {item.label}
        </div>
      )}
    </Link>
  );
};

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
const Sidebar = () => {
  const location               = useLocation();
  const [activeId, setActiveId]         = useState("explore");
  const [collapsed, setCollapsed]       = useState(false);
  const [visible,   setVisible]         = useState(false);
  const [drawer,    setDrawer]          = useState(false);
  const drawerRef                       = useRef(null);

  //For theme context
  const [theme, setTheme] = useTheme()

  // Mock chat notification count
  const [chatCount] = useState(5);

  // Sticky: show after half a viewport scroll
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.45);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-collapse on smaller desktops
  useEffect(() => {
    const onResize = () => {
      setCollapsed(window.innerWidth < 1280);
      if (window.innerWidth >= 1024) setDrawer(false);
    };
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Sync active item with route
  useEffect(() => {
    const path = location.pathname.toLowerCase();
    const all  = [...mainNavItems, ...featureItems, ...bottomItems];
    const match = all.find((i) => path.includes(i.path.toLowerCase()) && i.path !== "/");
    setActiveId(match ? match.id : "explore");
  }, [location]);

  // Close drawer on outside click
  useEffect(() => {
    const handler = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) setDrawer(false);
    };
    if (drawer) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [drawer]);

  return (
    <>
      {/* ── DESKTOP SIDEBAR ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {visible && (
          <motion.aside
            initial={{ x: -16, opacity: 0 }}
            animate={{ x: 0,   opacity: 1 }}
            exit={{    x: -16, opacity: 0 }}
            transition={spring.entry}
            className={`
              hidden lg:flex fixed top-[80px] left-4 z-40
              flex-col
              ${collapsed ? "w-[60px]" : "w-[210px]"}
              transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
            `}
            style={{ height: "calc(100vh - 100px)" }}
          >
            <div className={`${glassShell} rounded-[22px] flex flex-col h-full overflow-hidden`}>

              {/* Collapse toggle */}
              <div className={`flex items-center h-12 px-3 shrink-0 ${collapsed ? "justify-center" : "justify-between"}`}>
                {!collapsed && (
                  <span className="text-[12px] font-black uppercase font-Quicksand tracking-[0.18em] text-zinc-400 dark:text-zinc-600 ml-1 select-none">
                  Features
                  </span>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCollapsed((c) => !c)}
                  className={`
                    w-7 h-7 flex items-center justify-center rounded-[10px]
                    text-zinc-500 dark:text-zinc-500
                    transition-colors duration-200
                    ${glassSurface}
                  `}
                >
                  {collapsed
                    ? <ChevronRight size={12} strokeWidth={2.2} />
                    : <ChevronLeft  size={12} strokeWidth={2.2} />
                  }
                </motion.button>
              </div>

              {/* Scrollable nav */}
              <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-0.5 scroll-none" style={{ scrollbarWidth: "none" }}>
                {mainNavItems.map((item) => (
                  <NavItem
                    key={item.id}
                    item={item}
                    isActive={activeId === item.id}
                    collapsed={collapsed}
                    onClick={() => setActiveId(item.id)}
                  />
                ))}

                <div className={`my-2 mx-1 ${divider}`} />

                {featureItems.map((item) => (
                  <NavItem
                    key={item.id}
                    item={item}
                    isActive={activeId === item.id}
                    collapsed={collapsed}
                    onClick={() => setActiveId(item.id)}
                  />
                ))}
              </div>

              {/* Bottom pinned */}
              <div className="shrink-0 p-2">
                <div className={`rounded-[16px] p-1 space-y-0.5 ${glassSurface}`}>
                  {bottomItems.map((item) => (
                    <NavItem
                      key={item.id}
                      item={item}
                      isActive={activeId === item.id}
                      collapsed={collapsed}
                      onClick={() => setActiveId(item.id)}
                      small
                    />
                  ))}
                </div>
              </div>

            </div>
          </motion.aside>
        )}
      </AnimatePresence>


      {/* ── MOBILE BOTTOM TAB BAR (with integrated Chat) ─────────────────────── */}
      <nav className="
        lg:hidden fixed bottom-2.5 inset-x-0 mx-auto z-50
        w-[92%] max-w-[400px] h-[58px]
        flex items-center justify-between px-2
        rounded-[20px]
      " style={{ background: "transparent" }}>
        <div className={`absolute inset-0 rounded-[20px] ${glassShell}`} />

        {/* First 3 main nav items */}
        {mainNavItems.slice(0, 3).map((item) => (
          <Link
            key={item.id}
            to={item.path}
            onClick={() => setActiveId(item.id)}
            className="relative z-10 flex-1 flex flex-col items-center justify-center h-full gap-0.5"
          >
            <item.icon
              size={18}
              strokeWidth={activeId === item.id ? 2.1 : 1.6}
              className={`transition-colors duration-200 ${
                activeId === item.id
                  ? "text-zinc-900 dark:text-zinc-100"
                  : "text-zinc-400 dark:text-zinc-600"
              }`}
            />
            <span className={`text-[10px] font-semibold tracking-tight  transition-colors duration-200 ${
              activeId === item.id
                ? "text-zinc-900 dark:text-zinc-100"
                : "text-zinc-400 dark:text-zinc-600"
            }`}>
              {item.label}
            </span>
          </Link>
        ))}

        {/* Chat button (replaces 4th nav item) */}
        {/* <Link
          to="/chat"
          onClick={() => setActiveId("chat")}
          className="relative z-10 flex-1 flex flex-col items-center justify-center h-full gap-0.5"
          >
          <div className="relative">
            <MessageCircle
              size={18}
              strokeWidth={activeId === "chat" ? 2.1 : 1.6}
              className={`transition-colors duration-200 ${
                activeId === "chat"
                  ? "text-zinc-900 dark:text-zinc-100"
                  : "text-zinc-400 dark:text-zinc-600"
              }`}
            />
            {chatCount > 0 && (
              <span className="absolute px-1.5 pt-0.5 -top-1.5 -right-1.5 w-4 h-4 bg-red-600 text-white text-[9px] font-bold rounded-2xl flex items-center justify-center border border-white dark:border-zinc-950">
                {chatCount}
              </span>
            )}
          </div>
          <span className={`text-[9px] font-semibold tracking-wide transition-colors duration-200 ${
            activeId === "chat"
              ? "text-zinc-900 dark:text-zinc-100"
              : "text-zinc-400 dark:text-zinc-600"
          }`}>
            Chat
          </span>
        </Link> */}


        <Link
  to="/chat"
  onClick={() => setActiveId("chat")}
  className="relative z-10 flex-1 flex flex-col items-center justify-center h-full gap-0.5"
>
  <div className="relative flex items-center justify-center">
    
    {/* Icon */}
    <MessageCircle
      size={19}
      strokeWidth={activeId === "chat" ? 2.2 : 1.7}
      className={`transition-all duration-200 ${
        activeId === "chat"
          ? "text-zinc-900 dark:text-zinc-100 scale-105"
          : "text-zinc-400 dark:text-zinc-600"
      }`}
    />

    {/* Notification Badge */}
    {chatCount > 0 && (
      <span
        className="
          absolute pt-1 -top-1.5 -right-2
          min-w-[16px] h-[16px]
          px-[4px]
          bg-red-500 text-white
          text-[9px] font-semibold
          rounded-full 
          flex items-center justify-center
          leading-none
          border border-white dark:border-zinc-950
        "
      >
        {chatCount > 99 ? "99+" : chatCount}
      </span>
    )}
  </div>

  {/* Label */}
  <span
    className={`text-[10px] font-semibold tracking-wide transition-colors duration-200 ${
      activeId === "chat"
        ? "text-zinc-900 dark:text-zinc-100"
        : "text-zinc-400 dark:text-zinc-600"
    }`}
  >
    Chat
  </span>
</Link>

        {/* More drawer button */}
        <button
          onClick={() => setDrawer(true)}
          className="relative z-10 flex-1 flex flex-col items-center justify-center h-full gap-0.5"
        >
          <MoreVertical
            size={18}
            strokeWidth={1.6}
            className={`transition-colors duration-200 ${drawer ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400 dark:text-zinc-600"}`}
          />
          <span className={`text-[10px] font-semibold tracking-wide ${drawer ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400 dark:text-zinc-600"}`}>
            More
          </span>
        </button>
      </nav>


      {/* ── MOBILE DRAWER BACKDROP ───────────────────────────────────────────── */}
      <AnimatePresence>
        {drawer && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 lg:hidden"
            onClick={() => setDrawer(false)}
          />
        )}
      </AnimatePresence>

      {/* ── MOBILE DRAWER SHEET ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {drawer && (
          <motion.div
            ref={drawerRef}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ ...spring.entry }}
            className={`
              fixed bottom-0 inset-x-0 z-50 lg:hidden
              max-h-[80vh] flex flex-col
              rounded-t-[28px]
              ${glassShell}
            `}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1 shrink-0" onClick={() => setDrawer(false)}>
              <div className="w-10 h-1 rounded-full bg-zinc-300/60 dark:bg-white/10" />
            </div>

            <div className="overflow-y-auto p-4 pb-10 space-y-4">
              {/* Section label */}
              <div className="text-[12px] font-black uppercase font-Quicksand tracking-[0.18em] text-zinc-400 dark:text-zinc-600 px-1 flex items-center gap-2">
                <Flame /> <span> All Features</span>
              </div>

              {/* Icon grid - now includes the 4th & 5th main nav items */}
              <div className="grid grid-cols-5 gap-3">
                {[...mainNavItems.slice(3), ...featureItems].map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => { setActiveId(item.id); setDrawer(false); }}
                    className="flex flex-col items-center gap-1.5 group"
                  >
                    <motion.div
                      whileTap={{ scale: 0.9 }}
                      className={`
                        w-11 h-11 rounded-[16px] flex items-center justify-center
                        transition-all duration-200
                        ${activeId === item.id ? activeItem : glassSurface}
                        group-hover:scale-105
                      `}
                    >
                      <item.icon
                        size={18}
                        strokeWidth={activeId === item.id ? 2.1 : 1.6}
                        className={activeId === item.id ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-500 dark:text-zinc-500"}
                      />
                    </motion.div>
                    <span className={`text-[12px] font-semibold text-center leading-relaxed font-Playfair ${
                      activeId === item.id ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-500 dark:text-zinc-500"
                    }`}>
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>

              <div className={divider} />

              {/* Bottom items as rows */}
              <div className={`rounded-[18px] overflow-hidden divide-y divide-zinc-200/40 dark:divide-white/[0.05] ${glassSurface}`}>
                {bottomItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setDrawer(false)}
                    className={`flex items-center justify-between px-4 py-3.5 ${hoverItem} transition-colors duration-150 group`}
                  >
                    <div className="flex items-center gap-3.5 text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
                      <item.icon size={15} strokeWidth={1.7} />
                      {item.label}
                    </div>
                    <ChevronRight size={12} className="text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-500 transition-colors" />
                  </Link>
                ))}

                {/* Dark mode toggle */}
                <div className="flex items-center justify-between px-4 py-3.5">
                  <div className="flex items-center gap-3.5 text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
                    <Moon size={15} strokeWidth={1.7} />
                    Dark Mode
                  </div>
                  <div className="w-10 h-5.5 bg-zinc-200/60 dark:bg-emerald-600/50 rounded-full relative p-0.5 cursor-pointer transition-colors duration-300"
                    style={{ height: 22 }}
                  >
                    <div className="w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-transform duration-300 dark:translate-x-[18px]" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
