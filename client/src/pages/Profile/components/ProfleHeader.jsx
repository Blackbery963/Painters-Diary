import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogOut, ChevronDown, 
  UserPen, ChartColumnIncreasing, 
  SlidersHorizontalIcon 
} from 'lucide-react';
import Logo from '../../../assets/Logo.jpeg';
import { toast } from 'sonner';
import axios from 'axios';
import LogoutModel from '../../../components/models/model.logout';
import { getProfileInfo } from '../../../service/profile.service';

// --- MOCK DATA ---
const MOCK_USER = {
  username: "Vincent van Gogh",
  email: "starrynight@art.com",
  profileImage: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80",
};

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const profileHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [user, setUser]  = useState(null)

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

  //getting email and username 
  useEffect (() => {
    const getProfile = async () => {
      try {
        const profile = await getProfileInfo()
      setUser(profile.user)
      } catch (error) {
        throw new Error ("Failed to load profile info.")
      }
    }
    getProfile()
  })

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);
    try {
      await axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      localStorage.removeItem("accessToken");
      toast.success("Logged out successfully 👋");

      setTimeout(() => {
        setIsLogoutModalOpen(false);
        navigate("/auth/login");
      }, 600);

    } catch (error) {
      toast.error("Failed to log out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 
        bg-white/70 dark:bg-zinc-950/70 
        backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50
        transition-all duration-300">

        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-black dark:bg-white overflow-hidden rounded-lg flex items-center justify-center text-white dark:text-black font-bold text-sm shadow-md transition-transform group-hover:scale-105">
              <img src={Logo} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="font-bold text-xl text-zinc-900 dark:text-white font-Eagle leading-relaxed tracking-wide">
              Painters' Diary
            </h1>
          </Link>

          {/* PROFILE MENU */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className={`flex items-center gap-2 p-1 pr-3 rounded-full border transition-all duration-300 ${
                isDropdownOpen
                  ? "bg-white/50 dark:bg-zinc-800/50 border-zinc-300/50 dark:border-zinc-700/50 shadow-inner"
                  : "bg-transparent border-transparent hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50"
              }`}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-sm">
                <img src={user?.avatar} alt="User" className="w-full h-full object-cover" />
              </div>
              <ChevronDown
                size={16}
                className={`text-zinc-600 dark:text-zinc-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* GLASSY DROPDOWN */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(5px)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="absolute right-0 mt-3 w-64 rounded-2xl overflow-hidden
                    bg-white/60 dark:bg-zinc-900/60 
                    backdrop-blur-2xl 
                    border border-white/40 dark:border-zinc-700/50 
                    shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)]"
                >
                  {/* User Info Section */}
                  <div className="p-4 border-b border-zinc-200/50 dark:border-zinc-700/50 bg-white/40 dark:bg-zinc-800/40">
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">{user?.username}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">{user?.email}</p>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2 space-y-1">
                    <DropdownItem to="/feature/dashboard" icon={ChartColumnIncreasing} label="Dashboard" close={() => setIsDropdownOpen(false)} />
                    <DropdownItem to="/feature/studio-manager" icon={SlidersHorizontalIcon} label="Studio Manager" close={() => setIsDropdownOpen(false)} />
                    <DropdownItem to="/profile/edit_profile" icon={UserPen} label="Edit Profile" close={() => setIsDropdownOpen(false)} />
                  </div>

                  {/* Logout Section */}
                  <div className="p-2 border-t border-zinc-200/50 dark:border-zinc-700/50 bg-zinc-50/30 dark:bg-zinc-950/30">
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setIsLogoutModalOpen(true);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50/80 dark:hover:bg-red-900/20 transition-all duration-200 group"
                    >
                      <LogOut size={16} className="transition-transform group-hover:-translate-x-1" />
                      Log Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <LogoutModel
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
        isLoading={isLoggingOut}
      />
    </>
  );
};

// --- Refined Dropdown Item ---
const DropdownItem = ({ to, icon: Icon, label, close }) => (
  <Link to={to} onClick={close} className="block">
    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-zinc-800/60 transition-all duration-200 group hover:translate-x-1">
      <Icon size={16} className="text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors" />
      {label}
    </div>
  </Link>
);

export default profileHeader;