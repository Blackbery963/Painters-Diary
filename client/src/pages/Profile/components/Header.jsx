import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogOut, ChevronDown, User, 
  UserPen, ChartColumnIncreasing, 
  SlidersHorizontalIcon 
} from 'lucide-react';
import Logo from '../../../assets/Logo.jpeg'
import { toast } from 'sonner';
import axios from 'axios';
import LogoutModel from '../../../components/models/model.logout';

// --- MOCK DATA ---
const MOCK_USER = {
  username: "Vincent van Gogh",
  email: "starrynight@art.com",
  profileImage: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80",
};

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Toggle dropdown
  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Logout Confirm Function (Improved)
  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);
    try {
      await axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      // Remove access token (if used)
      localStorage.removeItem("accessToken"); // or "token"

      toast.success("Logged out successfully 👋");

      // Smooth transition
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
        bg-white/80 dark:bg-zinc-950/80 
        backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800
        transition-all duration-300">

        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8  bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black font-bold text-sm">
              <img className='' src={Logo} alt="" />
            </div>
            <h1 className="font-bold text-xl text-zinc-900 dark:text-white font-Eagle leading-relaxed">
              Painters' Diary
            </h1>
          </Link>

          {/* PROFILE MENU */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className={`flex items-center gap-3 px-2 py-1.5 rounded-full transition ${
                isDropdownOpen
                  ? "bg-zinc-100 dark:bg-zinc-800"
                  : "hover:bg-zinc-50 dark:hover:bg-zinc-900"
              }`}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img src={MOCK_USER.profileImage} alt="User" />
              </div>
              <ChevronDown
                size={14}
                className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* DROPDOWN */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-64 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl"
                >
                  <div className="p-3 border-b">
                    <p className="font-bold">{MOCK_USER.username}</p>
                    <p className="text-xs text-zinc-500">{MOCK_USER.email}</p>
                  </div>

                  <DropdownItem to="/account/dashboard" icon={ChartColumnIncreasing} label="Dashboard" close={() => setIsDropdownOpen(false)} />
                  <DropdownItem to="/studio-manager" icon={SlidersHorizontalIcon} label="Studio Manager" close={() => setIsDropdownOpen(false)} />
                  <DropdownItem to="/account/edit_profile" icon={UserPen} label="Edit Profile" close={() => setIsDropdownOpen(false)} />

                  <div className="border-t my-1" />

                  {/* LOGOUT BUTTON */}
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setIsLogoutModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <LogOut size={16} />
                    Log Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* ✅ LOGOUT MODAL */}
      <LogoutModel
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
        isLoading={isLoggingOut}
      />
    </>
  );
};

// --- Dropdown Item ---
const DropdownItem = ({ to, icon: Icon, label, close }) => (
  <Link to={to} onClick={close}>
    <div className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800">
      <Icon size={16} />
      {label}
    </div>
  </Link>
);

export default Header;