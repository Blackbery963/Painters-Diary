import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogOut, ChevronDown, User, 
  UserPen, ChartColumnIncreasing, 
  SlidersHorizontalIcon 
} from 'lucide-react';

// --- MOCK DATA ---
const MOCK_USER = {
  username: "Vincent van Gogh",
  email: "starrynight@art.com",
  profileImage: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80", // Using a placeholder image
};

const Header = () => {
  // --- INTERNAL STATE (Replacing Props) ---
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle function
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Demo logout function
  const handleLogout = () => {
    alert("Logged out (Demo Only)");
    setIsDropdownOpen(false);
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 h-16 
                 bg-white/80 dark:bg-zinc-950/80 
                 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800
                 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        
        {/* --- LEFT: LOGO --- */}
        <Link to={'/'} className="group flex items-center gap-2 select-none">
            <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black font-bold font-serif text-lg overflow-hidden">
                {/* Fallback for the local logo file */}
                <span className="text-xs">PD</span>
            </div>
            <h1 className="font-bold text-xl tracking-tight text-zinc-900 dark:text-white">
              Painters'Diary
            </h1>
        </Link>

        {/* --- RIGHT: PROFILE MENU --- */}
        <div className="relative" ref={dropdownRef}>
          <button
            className={`
              flex items-center gap-3 pl-1.5 pr-3 py-1.5 rounded-full border transition-all duration-200
              ${isDropdownOpen 
                ? "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700" 
                : "bg-transparent border-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900"
              }
            `}
            onClick={toggleDropdown}
          >
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-zinc-900 overflow-hidden shadow-sm">
              {MOCK_USER.profileImage ? (
                 <img src={MOCK_USER.profileImage} alt="User" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                  <User size={14} className="text-zinc-400"/>
                </div>
              )}
            </div>

            {/* Name & Icon */}
            <div className="flex items-center gap-2">
              {/* <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 max-w-[120px] truncate md:block hidden">
                {MOCK_USER.username}
              </span> */}
              <ChevronDown size={14} className={`text-zinc-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>

          {/* Dropdown Panel */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="absolute top-full right-0 mt-2 w-64 p-1.5
                           bg-white dark:bg-zinc-900 
                           border border-zinc-200 dark:border-zinc-800 
                           rounded-2xl shadow-xl shadow-zinc-200/50 dark:shadow-black/50 overflow-hidden origin-top-right"
              >
                <div className="px-3 py-3 mb-1 border-b border-zinc-100 dark:border-zinc-800">
                  <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                    {MOCK_USER.username}
                  </p>
                  <p className="text-xs text-zinc-500 truncate mt-0.5">
                    {MOCK_USER.email}
                  </p>
                </div>

                <div className="space-y-0.5">
                  <DropdownItem to="/account/dashboard" icon={ChartColumnIncreasing} label="Dashboard" onClick={() => setIsDropdownOpen(false)} />
                  <DropdownItem to="/studio-manager" icon={SlidersHorizontalIcon} label="Studio Manager" onClick={() => setIsDropdownOpen(false)} />
                  <DropdownItem to="/account/edit_profile" icon={UserPen} label="Edit Profile" onClick={() => setIsDropdownOpen(false)} />
                  
                  <div className="my-1.5 h-px bg-zinc-100 dark:bg-zinc-800 mx-2" />
                  
                  <button
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                    Log Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

// --- SUB-COMPONENT ---
const DropdownItem = ({ to, icon: Icon, label, onClick }) => (
  <Link to={to} onClick={onClick}>
    <div className="group w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors">
      <Icon size={16} className="text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200 transition-colors" />
      {label}
    </div>
  </Link>
);

export default Header;