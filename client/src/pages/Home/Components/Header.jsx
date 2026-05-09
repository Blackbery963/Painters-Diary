// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link } from "react-router-dom";

// import logo from "../../../assets/Logo.jpeg";

// import {
//   Bell, Bookmark, Box, ChartColumnIncreasing, HelpCircle, LogIn, LogOut,
//   MessageSquareWarning, ShoppingCart, Plus, User,
//   SlidersHorizontal, X, ChevronRight, TextAlignEnd
// } from "lucide-react";

// // ─── LIQUID GLASS — Fixed layout and inverted highlights ───

// const LiquidGlass = ({ children, className = "" }) => (
//   <div
//     className={`
//       relative overflow-hidden
//       bg-white/15 dark:bg-black/25
//       backdrop-blur-[40px] backdrop-saturate-200
//       border border-white/50 dark:border-white/20
//       shadow-[0_8px_32px_0_rgba(31,38,135,0.2),inset_0_-1px_0_rgba(255,255,255,0.7)]
//       dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4),inset_0_-1px_0_rgba(255,255,255,0.15)]
//       ${className}
//     `}
//   >
//     {/* TOP LIGHT SHIMMER (stronger, short) */}
//     <div className="
//       absolute inset-x-0 bottom-0 h-1/2
//       bg-gradient-to-b to-white/20 dark:to-white/30 from-transparent
//       pointer-events-none z-0
//     " />

//     {/* BOTTOM DEPTH (darker, subtle) */}
//     <div className="
//       absolute inset-x-0 top-0 h-1/2
//       bg-gradient-to-t to-black/20 dark:to-black/30 from-transparent
//       pointer-events-none z-0
//     " />

//     <div className="relative z-10 w-full h-full">
//       {children}
//     </div>
//   </div>
// );



// // ─── ICON BUTTON ──────────────────────────────────────────────────────────────
// const IconButton = ({ icon: Icon, count = 0, onClick, active = false, hasDot = false }) => (
//   <motion.button
//     whileHover={{ scale: 1.1 }}
//     whileTap={{ scale: 0.9 }}
//     onClick={onClick}
//     className={`
//       relative p-2 rounded-2xl transition-all duration-200
//       ${active
//         ? "bg-white/60 dark:bg-white/10 text-black dark:text-white shadow-sm border border-white/50 dark:border-white/5"
//         : "text-gray-600 dark:text-gray-400 hover:bg-white/30 dark:hover:bg-white/5 hover:text-black dark:hover:text-white"
//       }
//     `}
//   >
//     <Icon size={19} strokeWidth={1.8} />
//     {count > 0 && (
//       <motion.span
//         initial={{ scale: 0 }} animate={{ scale: 1 }}
//         className="absolute top-1 right-1 w-[7px] h-[7px] bg-red-500 rounded-full border border-white dark:border-black"
//       />
//     )}
//     {hasDot && (
//       <motion.span
//         initial={{ scale: 0 }} animate={{ scale: 1 }}
//         className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-black animate-pulse"
//       />
//     )}
//   </motion.button>
// );

// // ─── HEADER ───────────────────────────────────────────────────────────────────
// const Header = () => {
//   const [profile] = useState({ username: "Demo User", email: "hello@example.com", profileImage: null });
//   const [isLoggedIn] = useState(true);
//   const [counts] = useState({ cart: 2, orders: 1, notifications: 3 });

//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const profileRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (profileRef.current && !profileRef.current.contains(e.target)) setIsProfileOpen(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const routes = [
//     { label: "Profile",   path: "/profile",            icon: User },
//     { label: "Dashboard", path: "/Account/Dashboard",  icon: ChartColumnIncreasing },
//     { label: "Studio",    path: "/studio-manager",     icon: SlidersHorizontal },
//     { label: "Saved",     path: "/Saved",              icon: Bookmark },
//     { label: "Help",      path: "/Resources/Help",     icon: HelpCircle },
//     { label: "Feedback",  path: "/Resources/feedback", icon: MessageSquareWarning },
//   ];

//   const totalAlerts = counts.cart + counts.notifications + counts.orders;

//   const dropdownVariants = {
//     closed: { opacity: 0, y: -8, scale: 0.96, transition: { duration: 0.15 } },
//     open:   { opacity: 1, y: 0,  scale: 1,    transition: { type: "spring", stiffness: 380, damping: 26 } },
//   };

//   const mobileVariants = {
//     closed: { opacity: 0, y: -10, scale: 0.97, transition: { duration: 0.15 } },
//     open:   { opacity: 1, y: 0,   scale: 1,    transition: { type: "spring", stiffness: 300, damping: 26 } },
//   };

//   return (
//     <div className="fixed top-2 left-0 right-0 z-[100] w-full flex justify-center pointer-events-none">
//       <motion.nav
//         initial={{ y: -80, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ type: "spring", stiffness: 280, damping: 24, delay: 0.1 }}
//         className="pointer-events-auto w-[94%] max-w-[420px] lg:max-w-none lg:w-[96%] relative"
//       >

//         {/* ── GLASS BAR ── */}
//         <LiquidGlass className="rounded-[22px] h-[60px]">
//           <div className="flex items-center justify-between h-full px-2 lg:px-4 w-full">

//             {/* Logo */}
//             <Link to="/" className="flex items-center gap-2 lg:gap-3 group select-none ml-1">
//               <div className="relative overflow-hidden rounded-xl w-9 h-9 lg:w-10 lg:h-10
//                               border border-white/40 dark:border-white/10
//                               shadow-sm group-hover:shadow-md transition-all duration-300 shrink-0">
//                 <img
//                   src={logo}
//                   alt="Painters' Diary"
//                   className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-500"
//                 />
//                 <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
//               </div>
//               <span className="font-bold text-lg lg:text-xl tracking-tight text-zinc-800 dark:text-zinc-100 font-Eagle truncate">
//                 Painters' Diary
//               </span>
//             </Link>

//             {/* Right Controls */}
//             <div className="flex items-center gap-1 lg:gap-2 mr-1">

//               {/* Desktop */}
//               <div className="hidden lg:flex items-center gap-2">
//                 <Link to="/upload">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
//                     className="
//                       flex items-center gap-2 px-4 py-2 rounded-2xl
//                       text-sm font-semibold text-gray-700 dark:text-gray-200
//                       bg-white/40 dark:bg-white/10
//                       hover:bg-white/60 dark:hover:bg-white/20
//                       border border-white/40 dark:border-white/5
//                       shadow-sm transition-all duration-200
//                     "
//                   >
//                     <Plus size={16} strokeWidth={2.2} />
//                     Post
//                   </motion.button>
//                 </Link>

//                 <div className="w-px h-5 bg-gray-300/50 dark:bg-white/10 mx-1" />

//                 <div className="flex items-center gap-0.5">
//                   <Link to="/settings/cart">
//                     <IconButton icon={ShoppingCart} count={counts.cart} />
//                   </Link>
//                   <Link to="/Settings/Notification">
//                     <IconButton icon={Bell} count={counts.notifications} />
//                   </Link>
//                   <Link to="/Settings/Order">
//                     <IconButton icon={Box} count={counts.orders} />
//                   </Link>
//                 </div>

//                 <div className="w-px h-5 bg-gray-300/50 dark:bg-white/10 mx-1" />

//                 {/* Profile Avatar */}
//                 <div className="relative" ref={profileRef}>
//                   <motion.button
//                     whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
//                     onClick={() => setIsProfileOpen(!isProfileOpen)}
//                     className="
//                       w-9 h-9 lg:w-10 lg:h-10 rounded-full overflow-hidden
//                       border-2 border-white/50 dark:border-white/10
//                       shadow-sm hover:shadow-md transition-all duration-200
//                     "
//                   >
//                     {profile.profileImage ? (
//                       <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
//                     ) : (
//                       <div className="w-full h-full bg-white/40 dark:bg-white/10 flex items-center justify-center">
//                         <User size={17} strokeWidth={1.8} className="text-gray-600 dark:text-gray-300" />
//                       </div>
//                     )}
//                   </motion.button>
//                 </div>
//               </div>

//               {/* Mobile */}
//               <div className="lg:hidden flex items-center gap-0.5">
//                 <Link to="/upload">
//                   <IconButton icon={Plus} />
//                 </Link>
//                 <IconButton
//                   icon={isMobileMenuOpen ? X : TextAlignEnd}
//                   onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                   active={isMobileMenuOpen}
//                   hasDot={totalAlerts > 0}
//                 />
//               </div>
//             </div>
//           </div>
//         </LiquidGlass>

//         {/* ── DESKTOP DROPDOWN ── */}
//         <AnimatePresence>
//           {isProfileOpen && (
//             <motion.div
//               variants={dropdownVariants}
//               initial="closed" animate="open" exit="closed"
//               className="absolute right-0 top-[4.5rem] w-[272px] z-[60] origin-top-right hidden lg:block"
//             >
//               <LiquidGlass className="rounded-[22px]">
//                 <div className="flex flex-col p-2">
//                   <div className="px-3 py-3 mb-1">
//                     <p className="font-bold text-[13px] text-gray-900 dark:text-gray-100 truncate">{profile.username}</p>
//                     <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">{profile.email}</p>
//                   </div>

//                   <div className="h-px mx-2 mb-1.5 bg-gradient-to-r from-transparent via-gray-400/30 dark:via-white/10 to-transparent" />

//                   <div className="space-y-0.5 px-1">
//                     {routes.map((route) => (
//                       <Link
//                         key={route.label}
//                         to={route.path}
//                         onClick={() => setIsProfileOpen(false)}
//                         className="
//                           flex items-center justify-between px-3 py-2.5 rounded-2xl
//                           text-[13px] font-semibold text-gray-600 dark:text-gray-400
//                           hover:bg-white/60 dark:hover:bg-white/5
//                           hover:text-gray-900 dark:hover:text-white
//                           transition-all duration-150 group
//                         "
//                       >
//                         <div className="flex items-center gap-3">
//                           <route.icon size={15} strokeWidth={1.8} />
//                           {route.label}
//                         </div>
//                         <ChevronRight size={12} className="text-gray-300 dark:text-gray-600 group-hover:text-gray-400 transition-colors" />
//                       </Link>
//                     ))}
//                   </div>

//                   <div className="h-px mx-2 my-1.5 bg-gradient-to-r from-transparent via-gray-400/30 dark:via-white/10 to-transparent" />

//                   {isLoggedIn ? (
//                     <button className="
//                       w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl
//                       text-[13px] font-semibold text-red-500
//                       hover:bg-red-50/60 dark:hover:bg-red-900/20
//                       transition-all duration-150
//                     ">
//                       <LogOut size={15} strokeWidth={1.8} /> Sign Out
//                     </button>
//                   ) : (
//                     <Link to="/signup" className="
//                       flex items-center gap-3 px-4 py-2.5 rounded-2xl
//                       text-[13px] font-semibold text-[#1f7d53]
//                       hover:bg-emerald-50/40 dark:hover:bg-emerald-900/20
//                       transition-all duration-150
//                     ">
//                       <LogIn size={15} strokeWidth={1.8} /> Sign In
//                     </Link>
//                   )}
//                   <div className="pb-1" />
//                 </div>
//               </LiquidGlass>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* ── MOBILE DRAWER ── */}
//         <AnimatePresence>
//           {isMobileMenuOpen && (
//             <motion.div
//               variants={mobileVariants}
//               initial="closed" animate="open" exit="closed"
//               className="absolute top-[4.5rem] left-0 w-full z-[60] lg:hidden"
//             >
//               <LiquidGlass className="rounded-[22px] p-4">
//                 <div className="
//                   flex items-center gap-3 p-3 mb-4 rounded-[18px]
//                   bg-white/40 dark:bg-white/5
//                   border border-white/40 dark:border-white/5
//                 ">
//                   <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white/50 dark:border-white/10 shrink-0">
//                     {profile.profileImage ? (
//                       <img src={profile.profileImage} alt="" className="w-full h-full object-cover" />
//                     ) : (
//                       <div className="w-full h-full bg-white/40 dark:bg-white/10 flex items-center justify-center">
//                         <User size={18} className="text-gray-500 dark:text-gray-400" />
//                       </div>
//                     )}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h3 className="font-bold text-[14px] text-gray-900 dark:text-gray-100 truncate">{profile.username}</h3>
//                     <p className="text-[11px] text-gray-400 truncate">{profile.email}</p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-3 gap-2 mb-4">
//                   {[
//                     { icon: ShoppingCart, label: "Cart",    count: counts.cart,          path: "/settings/cart" },
//                     { icon: Bell,         label: "Alerts",  count: counts.notifications, path: "/Settings/Notification" },
//                     { icon: Box,          label: "Orders",  count: counts.orders,        path: "/Settings/Order" },
//                   ].map((item, i) => (
//                     <Link to={item.path} key={i} onClick={() => setIsMobileMenuOpen(false)}>
//                       <div className="
//                         flex flex-col items-center gap-1.5 py-3 rounded-[18px] relative
//                         bg-white/40 dark:bg-white/5
//                         border border-white/40 dark:border-white/5
//                         hover:bg-white/60 dark:hover:bg-white/10
//                         active:scale-95 transition-all duration-150
//                       ">
//                         {item.count > 0 && (
//                           <div className="absolute top-2 right-2 w-[7px] h-[7px] bg-red-500 rounded-full border border-white dark:border-black" />
//                         )}
//                         <item.icon size={18} strokeWidth={1.7} className="text-gray-600 dark:text-gray-300" />
//                         <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400">{item.label}</span>
//                       </div>
//                     </Link>
//                   ))}
//                 </div>

//                 <div className="h-px mb-3 bg-gradient-to-r from-transparent via-gray-400/30 dark:via-white/10 to-transparent" />

//                 <div className="space-y-0.5">
//                   {routes.map((route) => (
//                     <Link
//                       key={route.label}
//                       to={route.path}
//                       onClick={() => setIsMobileMenuOpen(false)}
//                       className="
//                         flex items-center justify-between px-3 py-2.5 rounded-[18px]
//                         text-[13px] font-semibold text-gray-600 dark:text-gray-400
//                         hover:bg-white/40 dark:hover:bg-white/5
//                         hover:text-gray-900 dark:hover:text-white
//                         active:scale-[0.98] transition-all duration-150 group
//                       "
//                     >
//                       <div className="flex items-center gap-3.5">
//                         <route.icon size={16} strokeWidth={1.8} />
//                         {route.label}
//                       </div>
//                       <ChevronRight size={13} className="text-gray-300 dark:text-gray-600 group-hover:text-gray-400" />
//                     </Link>
//                   ))}
//                 </div>

//                 <div className="h-px my-3 bg-gradient-to-r from-transparent via-gray-400/30 dark:via-white/10 to-transparent" />

//                 {isLoggedIn ? (
//                   <button
//                     onClick={() => setIsMobileMenuOpen(false)}
//                     className="
//                       flex items-center justify-center gap-2.5 w-full py-3 rounded-[18px]
//                       text-[13px] font-bold text-red-500
//                       bg-red-50/40 dark:bg-red-900/10
//                       border border-red-100/40 dark:border-red-900/20
//                       hover:bg-red-50/70 active:scale-[0.98] transition-all duration-150
//                     "
//                   >
//                     <LogOut size={16} strokeWidth={1.8} /> Sign Out
//                   </button>
//                 ) : (
//                   <Link
//                     to="/signup"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                     className="
//                       flex items-center justify-center gap-2.5 w-full py-3 rounded-[18px]
//                       text-[13px] font-bold text-white
//                       bg-[#1f7d53] hover:bg-[#196644]
//                       shadow-[0_4px_14px_rgba(31,125,83,0.3)]
//                       active:scale-[0.98] transition-all duration-200
//                     "
//                   >
//                     <LogIn size={16} strokeWidth={1.8} /> Sign In
//                   </Link>
//                 )}
//               </LiquidGlass>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.nav>
//     </div>
//   );
// };

// export default Header;


import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Bell, Bookmark, Box, ChartColumnIncreasing, HelpCircle,
  LogIn, LogOut, MessageSquareWarning, ShoppingCart, Plus,
  User, SlidersHorizontal, X, ChevronRight, Menu,
  TextAlignEnd,
} from "lucide-react";

import logo from "../../../assets/Logo.jpeg";
import { getProfileInfo } from "../../../service/profile.service.js";
import {
  spring, glassShell, glassSurface, activeItem, hoverItem, divider,
} from "./Glass";

// ─── SHARED ICON BUTTON ───────────────────────────────────────────────────────
const IconBtn = ({ icon: Icon, badge = 0, onClick, isActive = false }) => (
  <motion.button
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.92 }}
    onClick={onClick}
    className={`
      relative w-9 h-9 flex items-center justify-center rounded-2xl
      transition-colors duration-200
      ${isActive
        ? `${glassSurface} text-zinc-900 dark:text-zinc-100`
        : "text-zinc-500 dark:text-zinc-400 hover:bg-white/40 dark:hover:bg-white/[0.05] hover:text-zinc-900 dark:hover:text-zinc-100"
      }
    `}
  >
    <Icon size={18} strokeWidth={1.7} />
    {badge > 0 && (
      <span className="absolute top-1.5 right-1.5 w-[6px] h-[6px] rounded-full bg-red-500 border border-white dark:border-zinc-950" />
    )}
  </motion.button>
);

// ─── HEADER ───────────────────────────────────────────────────────────────────
const Header = () => {
  const [profile]    = useState({ username: "Demo User", email: "hello@example.com", profileImage: null });
  const [isLoggedIn] = useState(true);
  const [counts]     = useState({ cart: 2, orders: 1, notifications: 3 });

  const [profileOpen,     setProfileOpen]     = useState(false);
  const [mobileMenuOpen,  setMobileMenuOpen]  = useState(false);
  //frofile info
  const [user, setUser] = useState(null)
  const profileRef = useRef(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const routes = [
    { label: "Profile",   path: "/profile",            icon: User },
    { label: "Dashboard", path: "/profile/dashboard",  icon: ChartColumnIncreasing },
    { label: "Studio",    path: "/profile/studio-manager",     icon: SlidersHorizontal },
    { label: "Help",      path: "/legal/help",     icon: HelpCircle },
    { label: "Feedback",  path: "/legal/feedback", icon: MessageSquareWarning },
  ];

  const dropdownVariants = {
    closed: { opacity: 0, y: -6, scale: 0.97 },
    open:   { opacity: 1, y: 0,  scale: 1, transition: spring.bounce },
  };

  useEffect(() =>{
    const getProfile = async () =>{
      try {
        const data = await getProfileInfo()
        setUser(data.user)
      } catch (error) {
        throw new Error ("Failed to fetch username and email. ")
      }
    }
    getProfile()
  })

  return (
    <div className="fixed top-3 inset-x-0 z-[100] flex justify-center pointer-events-none">
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ ...spring.entry, delay: 0.06 }}
        className="pointer-events-auto w-[94%] sm:w-[98%] max-w-full"
      >

        {/* ── GLASS BAR ─────────────────────────────────────────────────────── */}
        <div className={`${glassShell} rounded-[20px] h-[58px] flex items-center justify-between px-3 lg:px-4`}>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group select-none">
            <div className="
              relative w-9 h-9 rounded-[14px] overflow-hidden shrink-0
              border border-zinc-200/60 dark:border-white/[0.08]
              shadow-sm group-hover:shadow-md transition-shadow duration-300
            ">
              <img
                src={logo}
                alt="Painters' Diary"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <span className="font-bold text-[17px] tracking-tight text-zinc-900 dark:text-zinc-100 font-Eagle hidden sm:block">
              Painters' Diary
            </span>
          </Link>

          {/* ── DESKTOP RIGHT ─────────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-2">

            {/* Post button */}
            <Link to="/upload">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`
                  flex items-center gap-1.5 h-8 px-3.5 rounded-2xl
                  text-[12.5px] font-semibold text-zinc-700 dark:text-zinc-200
                  transition-colors duration-200
                  ${glassSurface}
                `}
              >
                <Plus size={14} strokeWidth={2.2} />
                Post
              </motion.button>
            </Link>

            {/* Divider */}
            <div className="w-px h-4 bg-zinc-200/70 dark:bg-white/[0.08] mx-1" />

            {/* Icon cluster */}
            <div className="flex items-center gap-0.5">
              <Link to="/settings/cart">
                <IconBtn icon={ShoppingCart} badge={counts.cart} />
              </Link>
              <Link to="/Settings/Notification">
                <IconBtn icon={Bell} badge={counts.notifications} />
              </Link>
              <Link to="/Settings/Order">
                <IconBtn icon={Box} badge={counts.orders} />
              </Link>
            </div>

            {/* Divider */}
            <div className="w-px h-4 bg-zinc-200/70 dark:bg-white/[0.08] mx-1" />

            {/* Avatar + dropdown */}
            <div className="relative" ref={profileRef}>
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => setProfileOpen((p) => !p)}
                className="
                  w-9 h-9 rounded-full overflow-hidden
                  border border-zinc-200/70 dark:border-white/[0.1]
                  shadow-sm hover:shadow-md transition-shadow duration-200
                "
              >
                {user?.avatar ? (
                  <img src={user?.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                    <User size={16} strokeWidth={1.7} className="text-zinc-500 dark:text-zinc-400" />
                  </div>
                )}
              </motion.button>

              {/* Dropdown */}
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="closed" animate="open" exit="closed"
                    className={`absolute right-0 top-12 w-[256px] origin-top-right ${glassShell} rounded-[18px] overflow-hidden`}
                  >
                    {/* User info */}
                    <div className="px-4 py-3.5">
                      <p className="text-[13px] font-bold text-zinc-900 dark:text-zinc-100 truncate">{user?.username}</p>
                      <p className="text-[11px] text-zinc-400 dark:text-zinc-500 truncate mt-0.5">{user?.email}</p>
                    </div>

                    <div className={`mx-3 mb-1 ${divider}`} />

                    {/* Nav routes */}
                    <div className="px-2 py-1 space-y-0.5">
                      {routes.map((r) => (
                        <Link
                          key={r.label}
                          to={r.path}
                          onClick={() => setProfileOpen(false)}
                          className={`
                            flex items-center justify-between px-3 py-2.5 rounded-[14px]
                            text-[12.5px] font-medium text-zinc-600 dark:text-zinc-400
                            ${hoverItem} transition-all duration-150 group
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <r.icon size={14} strokeWidth={1.7} />
                            {r.label}
                          </div>
                          <ChevronRight size={11} className="text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-500 transition-colors" />
                        </Link>
                      ))}
                    </div>

                    <div className={`mx-3 my-1.5 ${divider}`} />

                    {/* Sign out / in */}
                    <div className="px-2 pb-2">
                      {isLoggedIn ? (
                        <button className="
                          w-full flex items-center gap-3 px-3 py-2.5 rounded-[14px]
                          text-[12.5px] font-medium text-red-500
                          hover:bg-red-50/50 dark:hover:bg-red-950/30
                          transition-colors duration-150
                        ">
                          <LogOut size={14} strokeWidth={1.7} /> Sign Out
                        </button>
                      ) : (
                        <Link to="/signup" onClick={() => setProfileOpen(false)} className="
                          flex items-center gap-3 px-3 py-2.5 rounded-[14px]
                          text-[12.5px] font-medium text-emerald-600 dark:text-emerald-400
                          hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30
                          transition-colors duration-150
                        ">
                          <LogIn size={14} strokeWidth={1.7} /> Sign In
                        </Link>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── MOBILE RIGHT ─────────────────────────────────────────────── */}
          <div className="lg:hidden flex items-center gap-1">
            <Link to="/upload">
              <IconBtn icon={Plus} />
            </Link>
            <IconBtn
              icon={mobileMenuOpen ? X : TextAlignEnd}
              isActive={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((p) => !p)}
            />
          </div>
        </div>

        {/* ── MOBILE DROPDOWN ───────────────────────────────────────────────── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              variants={dropdownVariants}
              initial="closed" animate="open" exit="closed"
              className={`mt-2 ${glassShell} rounded-[18px] overflow-hidden lg:hidden`}
            >
              {/* Profile row */}
              <div className={`flex items-center gap-3 m-3 p-3 rounded-[14px] ${glassSurface}`}>
                <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-200/60 dark:border-white/[0.08] shrink-0">
                  {user?.avatar ? (
                    <img src={user?.avatar} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                      <User size={16} strokeWidth={1.7} className="text-zinc-500 dark:text-zinc-400" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-[13px] font-bold text-zinc-900 dark:text-zinc-100">{user?.username}</p>
                  <p className="text-[11px] text-zinc-400 dark:text-zinc-500">{user?.email}</p>
                </div>
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-3 gap-2 px-3 mb-3">
                {[
                  { icon: ShoppingCart, label: "Cart",    badge: counts.cart,          path: "/settings/cart" },
                  { icon: Bell,         label: "Alerts",  badge: counts.notifications, path: "/Settings/Notification" },
                  { icon: Box,          label: "Orders",  badge: counts.orders,        path: "/Settings/Order" },
                ].map((item) => (
                  <Link to={item.path} key={item.label} onClick={() => setMobileMenuOpen(false)}>
                    <div className={`
                      flex flex-col items-center gap-1.5 py-3 rounded-[14px]
                      relative ${glassSurface}
                      active:scale-95 transition-transform duration-150
                    `}>
                      {item.badge > 0 && (
                        <span className="absolute top-2 right-2 w-[6px] h-[6px] rounded-full bg-red-500 border border-white dark:border-zinc-950" />
                      )}
                      <item.icon size={17} strokeWidth={1.7} className="text-zinc-500 dark:text-zinc-400" />
                      <span className="text-[10.5px] font-semibold text-zinc-500 dark:text-zinc-400">{item.label}</span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className={`mx-3 mb-1 ${divider}`} />

              {/* Routes */}
              <div className="px-2 py-1 space-y-0.5">
                {routes.map((r) => (
                  <Link
                    key={r.label}
                    to={r.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      flex items-center justify-between px-3 py-2.5 rounded-[14px]
                      text-[12.5px] font-medium text-zinc-600 dark:text-zinc-400
                      ${hoverItem} transition-all duration-150 group
                    `}
                  >
                    <div className="flex items-center gap-3.5">
                      <r.icon size={15} strokeWidth={1.7} />
                      {r.label}
                    </div>
                    <ChevronRight size={11} className="text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-400 transition-colors" />
                  </Link>
                ))}
              </div>

              <div className={`mx-3 my-1.5 ${divider}`} />

              <div className="px-2 pb-3">
                {isLoggedIn ? (
                  <button className="
                    w-full flex items-center justify-center gap-2.5 py-2.5 rounded-[14px]
                    text-[12.5px] font-semibold text-red-500
                    bg-red-50/40 dark:bg-red-950/20
                    border border-red-100/40 dark:border-red-900/20
                    hover:bg-red-50/70 active:scale-[0.98] transition-all duration-150
                  ">
                    <LogOut size={15} strokeWidth={1.8} /> Sign Out
                  </button>
                ) : (
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="
                    flex items-center justify-center gap-2.5 py-2.5 rounded-[14px]
                    text-[12.5px] font-semibold text-white
                    bg-[#1f7d53] hover:bg-[#196644]
                    shadow-[0_4px_12px_rgba(31,125,83,0.25)]
                    active:scale-[0.98] transition-all duration-200
                  ">
                    <LogIn size={15} strokeWidth={1.8} /> Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Header;