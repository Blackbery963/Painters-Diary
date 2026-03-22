import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Grid,
  Users,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Settings,
  HelpCircle,
  UserPlus,
  Bookmark,
  Moon,
  Sparkles,
  Compass,
  LayoutGrid,
  Search,
  PlaySquare,
  MoreVertical,
  Blocks,
  Album,
  Play,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("explore");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const drawerRef = useRef(null);

  const SIDEBAR_EXPANDED_WIDTH = "w-[220px]";
  const SIDEBAR_COLLAPSED_WIDTH = "w-[68px]";

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > window.innerHeight * 0.5);
    const handleResize = () => {
      if (window.innerWidth < 1280) setIsCollapsed(true);
      else setIsCollapsed(false);
      if (window.innerWidth > 1024) setShowMobileDrawer(false);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const mainNavItems = [
    { id: "explore", label: "Explore", icon: Compass, path: "/" },
    { id: "search", label: "Search", icon: Search, path: "/search" },
    { id: "moments", label: "Moments", icon: Play, path: "/moments" },
    { id: "artist", label: "Artist", icon: UserPlus, path: "/Artists/DiscoverUsers" },
    { id: "diary", label: "Diary", icon: Album, path: "/journal" },
  ];
  const featureItems = [
    { id: "gallery", label: "Gallery", icon: Grid, path: "/gallery" },
    { id: "community", label: "Community", icon: Users, path: "/community" },
    { id: "categories", label: "Categories", icon: LayoutGrid, path: "/category" },
    { id: "artstore", label: "Art Store", icon: ShoppingBag, path: "/Arteva/Artstore" },
    { id: "resources", label: "Resources", icon: Blocks, path: "/Community/Resources/Hub" },
    { id: "save", label: "Saved", icon: Bookmark, path: "/saved" },
  ];
  const bottomItems = [
    { id: "help", label: "Help", icon: HelpCircle, path: "/Resources/Help" },
    { id: "settings", label: "Settings", icon: Settings, path: "/Settings/Settings" },
  ];

  useEffect(() => {
    const path = location.pathname.toLowerCase();
    const allItems = [...mainNavItems, ...featureItems, ...bottomItems];
    const match = allItems.find(
      (item) => path.includes(item.path.toLowerCase()) && item.path !== "/"
    );
    if (match) setActiveItem(match.id);
    else if (path === "/" || path === "") setActiveItem("explore");
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target))
        setShowMobileDrawer(false);
    };
    if (showMobileDrawer) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMobileDrawer]);

  return (
    <>
      {/* ── DESKTOP SIDEBAR ── */}
      <aside
        className={`
          hidden lg:flex fixed top-[85px] left-4 z-40 h-[calc(98vh-90px)]
          flex-col
          transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          ${isSticky ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0 pointer-events-none"}
          ${isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH}
        `}
      >
        {/* GLASS SHELL */}
        <div
          className="
            relative flex flex-col h-full w-full rounded-[28px] overflow-hidden
            bg-white/25 dark:bg-black/25
            backdrop-blur-[40px] backdrop-saturate-[180%]
            border border-white/50 dark:border-white/8
            shadow-[0_8px_40px_0_rgba(31,38,135,0.12),inset_0_1px_0_rgba(255,255,255,0.6)]
            dark:shadow-[0_8px_40px_0_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)]
          "
        >
          {/* Top shimmer */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/40 dark:from-white/30 to-transparent pointer-events-none z-0 rounded-t-[28px]" />
          {/* Bottom depth */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 dark:from-black/40 to-transparent pointer-events-none z-0 rounded-b-[28px]" />

          <div className="relative z-10 flex flex-col h-full">
            {/* Header */}
            <div className={`flex items-center shrink-0 h-14 px-3 ${isCollapsed ? "justify-center" : "justify-between"}`}>
              {!isCollapsed && (
                <span className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] ml-1 select-none">
                  Navigation
                </span>
              )}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="
                  w-8 h-8 flex items-center justify-center rounded-xl
                  bg-white/50 dark:bg-white/8
                  hover:bg-white/80 dark:hover:bg-white/15
                  border border-white/60 dark:border-white/10
                  text-gray-600 dark:text-gray-300
                  transition-all duration-300 shadow-sm
                  hover:shadow-md hover:scale-105 active:scale-95
                "
              >
                {isCollapsed ? <ChevronRight size={14} strokeWidth={2.5} /> : <ChevronLeft size={14} strokeWidth={2.5} />}
              </button>
            </div>

            {/* Scrollable Nav */}
            <div className="flex-1 overflow-y-auto px-2.5 py-1 space-y-0.5 hide-scrollbar">
              {mainNavItems.map((item) => (
                <GlassNavItem
                  key={item.id}
                  item={item}
                  isActive={activeItem === item.id}
                  isCollapsed={isCollapsed}
                  onClick={() => setActiveItem(item.id)}
                />
              ))}

              {/* Divider */}
              <div className="py-2 px-1">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-400/25 dark:via-white/10 to-transparent" />
              </div>

              {featureItems.map((item) => (
                <GlassNavItem
                  key={item.id}
                  item={item}
                  isActive={activeItem === item.id}
                  isCollapsed={isCollapsed}
                  onClick={() => setActiveItem(item.id)}
                />
              ))}
            </div>

            {/* Bottom Section */}
            <div className="p-2.5 mt-auto">
              <div
                className="
                  rounded-[20px] p-1.5
                  bg-black/5 dark:bg-white/4
                  border border-white/30 dark:border-white/5
                  space-y-0.5
                "
              >
                {bottomItems.map((item) => (
                  <GlassNavItem
                    key={item.id}
                    item={item}
                    isActive={activeItem === item.id}
                    isCollapsed={isCollapsed}
                    onClick={() => setActiveItem(item.id)}
                    isSmall
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MOBILE BOTTOM NAV ── */}
      <nav
        className="
          lg:hidden fixed bottom-2 inset-x-0 mx-auto w-[94%] max-w-[420px] h-[60px] z-50
          bg-white/35 dark:bg-black/45
          backdrop-blur-[40px] backdrop-saturate-200
          border border-white/50 dark:border-white/10
          rounded-[22px]
          shadow-[0_8px_32px_0_rgba(31,38,135,0.2),inset_0_1px_0_rgba(255,255,255,0.5)]
          flex justify-between px-1.5 items-center overflow-hidden
        "
      >
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent pointer-events-none rounded-t-[22px]" />

        {mainNavItems.slice(0, 4).map((item) => (
          <Link
            key={item.id}
            to={item.path}
            onClick={() => setActiveItem(item.id)}
            className="relative z-10 flex-1 flex flex-col items-center justify-center h-full group"
          >
            <div
              className={`
                relative flex flex-col items-center justify-center gap-0.5 px-2 py-1 rounded-[10px] transition-all duration-300
                
              `}
            >
              <item.icon
                className={`transition-all duration-300 ${
                  activeItem === item.id
                    ? "text-black dark:text-white"
                    : "text-gray-500 dark:text-gray-400"
                }`}
                size={18}
                strokeWidth={activeItem === item.id ? 2.2 : 1.6}
              />
              <span
                className={`text-[9px] font-bold tracking-wide transition-all duration-300 ${
                  activeItem === item.id
                    ? "text-black dark:text-white"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {item.label}
              </span>
            </div>
          </Link>
        ))}

        <button
          onClick={() => setShowMobileDrawer(true)}
          className="relative z-10 flex-1 flex flex-col items-center justify-center h-full group"
        >
          <div
            className={`
              relative flex flex-col items-center justify-center gap-0.5 px-2 py-1 rounded-[14px] transition-all duration-300
              ${showMobileDrawer ? "bg-white/40 dark:bg-white/10" : "hover:bg-white/20"}
            `}
          >
            <MoreVertical
              className={`transition-all duration-300 ${showMobileDrawer ? "rotate-90" : ""} text-gray-500 dark:text-gray-400`}
              size={18}
            />
            <span className="text-[9px] font-bold text-gray-500 dark:text-gray-400">More</span>
          </div>
        </button>
      </nav>

      {/* ── MOBILE DRAWER BACKDROP ── */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-[6px] z-50 transition-all duration-400 lg:hidden ${
          showMobileDrawer ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setShowMobileDrawer(false)}
      />

      {/* ── MOBILE DRAWER SHEET ── */}
      <div
        ref={drawerRef}
        className={`
          fixed bottom-0 left-0 right-0 z-50 rounded-t-[36px]
          bg-white/75 dark:bg-black/75
          backdrop-blur-[50px] backdrop-saturate-200
          border-t border-white/60 dark:border-white/10
          shadow-[0_-20px_60px_-10px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.6)]
          transform transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]
          lg:hidden max-h-[85vh] flex flex-col
          ${showMobileDrawer ? "translate-y-0" : "translate-y-full"}
        `}
      >
        <div
          className="shrink-0 flex justify-center pt-4 pb-2 w-full cursor-pointer"
          onClick={() => setShowMobileDrawer(false)}
        >
          <div className="w-12 h-1 rounded-full bg-black/15 dark:bg-white/20" />
        </div>

        <div className="overflow-y-auto p-5 pb-14 space-y-5">
          <div>
            <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-3 flex items-center gap-2 px-1">
              <Sparkles size={10} className="text-violet-400" /> All Features
            </h3>
            <div className="grid grid-cols-5 gap-y-3 gap-x-2">
              {[...mainNavItems, ...featureItems].map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => {
                    setActiveItem(item.id);
                    setShowMobileDrawer(false);
                  }}
                  className="flex flex-col items-center gap-1.5 group"
                >
                  <div
                    className={`
                      w-11 h-11 rounded-[16px] flex items-center justify-center relative overflow-hidden transition-all duration-300
                      ${activeItem === item.id
                        ? "bg-white dark:bg-zinc-800 shadow-md scale-105 border border-white/80 dark:border-zinc-600"
                        : "bg-white/30 dark:bg-white/6 border border-white/40 dark:border-white/8 hover:scale-105 hover:bg-white/50"}
                    `}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />
                    <item.icon
                      size={18}
                      strokeWidth={activeItem === item.id ? 2.2 : 1.6}
                      className={activeItem === item.id ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-400"}
                    />
                  </div>
                  <span
                    className={`text-[10px] font-semibold text-center leading-tight ${
                      activeItem === item.id ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div
            className="
              rounded-[24px] overflow-hidden
              bg-white/40 dark:bg-white/5
              border border-white/50 dark:border-white/8
              backdrop-blur-md
              divide-y divide-black/5 dark:divide-white/5
            "
          >
            {bottomItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className="flex items-center justify-between px-4 py-3.5 hover:bg-white/50 dark:hover:bg-white/8 transition-all group"
                onClick={() => setShowMobileDrawer(false)}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-[12px] flex items-center justify-center bg-white/60 dark:bg-black/40 border border-white/50 dark:border-white/8 shadow-sm">
                    <item.icon size={15} className="text-gray-600 dark:text-gray-300" />
                  </div>
                  <span className="font-semibold text-sm text-gray-800 dark:text-white">{item.label}</span>
                </div>
                <ChevronRight size={14} className="text-gray-400" />
              </Link>
            ))}
            <div className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3.5">
                <div className="w-8 h-8 rounded-[12px] flex items-center justify-center bg-white/60 dark:bg-black/40 border border-white/50 dark:border-white/8 shadow-sm">
                  <Moon size={15} className="text-gray-600 dark:text-gray-300" />
                </div>
                <span className="font-semibold text-sm text-gray-800 dark:text-white">Dark Mode</span>
              </div>
              <div className="w-11 h-6 bg-black/10 dark:bg-emerald-500/60 rounded-full relative p-0.5 transition-all duration-300 cursor-pointer">
                <div className="w-5 h-5 bg-white rounded-full shadow transition-transform dark:translate-x-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/* ── GLASS NAV ITEM ── */
const GlassNavItem = ({ item, isActive, isCollapsed, onClick, isSmall = false }) => {
  return (
    <Link
      to={item.path}
      onClick={onClick}
      className={`
        group relative flex items-center cursor-pointer outline-none
        transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        ${isCollapsed
          ? "w-full justify-center rounded-full h-11 overflow-hidden"
          : `w-full rounded-full ${isSmall ? "h-8" : "h-10"} px-3`
        }
        // ${isActive
        //   ? "bg-white/65 dark:bg-white/12 text-gray-900 dark:text-white shadow-[0_2px_12px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.06)] border border-white/70 dark:border-white/10"
        //   : "text-gray-500 dark:text-gray-400 hover:bg-white/35 dark:hover:bg-white/6 hover:text-gray-900 dark:hover:text-white"
        }
      `}
    >
      {/* Active inner glow */}
      {isActive && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/50 via-white/20 to-transparent dark:from-white/8 dark:to-transparent pointer-events-none" />
      )}

      {/* Collapsed: centered icon */}
      {isCollapsed ? (
        <div className="relative z-10 flex items-center justify-center w-full">
          <item.icon
            size={isSmall ? 16 : 19}
            strokeWidth={isActive ? 2.2 : 1.6}
            className="transition-transform duration-200 group-hover:scale-110"
          />
          {/* Tooltip */}
          <div
            className="
              fixed left-20 z-50 px-3 py-1.5
              bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl
              text-gray-900 dark:text-white font-semibold text-xs
              border border-white/60 dark:border-white/10
              rounded-2xl shadow-xl
              opacity-0 invisible
              group-hover:opacity-100 group-hover:visible
              transition-all duration-200
              translate-x-2 group-hover:translate-x-0
              pointer-events-none whitespace-nowrap
            "
          >
            {item.label}
          </div>
        </div>
      ) : (
        /* Expanded: icon + label */
        <>
          <div className="relative z-10 flex items-center justify-center shrink-0">
            <item.icon
              size={isSmall ? 15 : 17}
              strokeWidth={isActive ? 2.2 : 1.6}
              className="transition-transform duration-200 group-hover:scale-110"
            />
          </div>
          <span
            className={`
              ml-2.5 relative z-10 whitespace-nowrap select-none
              transition-all duration-200
              ${isSmall ? "text-[11px] font-semibold" : "text-[13px] font-semibold"}
              ${isActive ? "font-bold" : ""}
            `}
          >
            {item.label}
          </span>
        </>
      )}
    </Link>
  );
};

export default Sidebar;

