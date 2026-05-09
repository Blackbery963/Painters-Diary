/**
 * Discover People Page - Premium Edition (Advanced)
 * Purpose: Smart discovery feed with random users and category-based sections
 * Features:
 * - Main feed with random users based on interests & following
 * - Horizontal scrolling category sections (Best of X, Top Artists, etc.)
 * - Popular creators by location
 * - Smart recommendations
 * - Follow/Message actions
 * - Infinite scroll effect
 * - Compact, beautiful UI with glassmorphism
 */

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MapPin, UserPlus, MessageCircle, X, 
  Sparkles, Filter, ChevronDown, Users, ChevronLeft, ChevronRight,
  Zap, Award, TrendingUp,
  User
} from 'lucide-react';
import Header from "../../components/common/Header.jsx"
import { Link } from 'react-router-dom';

// Mock comprehensive user data
const allUsers = [
  { id: 1, name: 'Alex Rivera', role: 'Digital Artist', location: 'New York, USA', interests: ['Illustration', 'UI Design', 'Character Design'], avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', bio: 'Creative explorer designing digital experiences', followers: 2400, specialty: 'UI Design', isPopular: true },
  { id: 2, name: 'Jordan Hayes', role: 'Photographer', location: 'California, USA', interests: ['Landscape Photography', 'Nature', 'Minimalism'], avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop', bio: 'Capturing stories through light and composition', followers: 3200, specialty: 'Landscape Photography', isPopular: true },
  { id: 3, name: 'Morgan Smith', role: 'Illustrator', location: 'Toronto, Canada', interests: ['Character Design', 'Concept Art', 'Animation'], avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop', bio: 'Digital illustrator telling stories through art', followers: 2800, specialty: 'Character Design', isPopular: false },
  { id: 4, name: 'Sam Chen', role: 'Motion Designer', location: 'San Francisco, USA', interests: ['Animation', '3D', 'VFX'], avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop', bio: 'Motion design enthusiast with 5+ years experience', followers: 1800, specialty: 'Animation', isPopular: false },
  { id: 5, name: 'Casey Lin', role: 'UI/UX Designer', location: 'Seattle, USA', interests: ['UI Design', 'Web Design', 'Prototyping'], avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop', bio: 'Designing intuitive interfaces for complex problems', followers: 1900, specialty: 'UI Design', isPopular: true },
  { id: 6, name: 'Alex Jordan', role: 'Concept Artist', location: 'Los Angeles, USA', interests: ['3D', 'Game Design', 'VFX'], avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', bio: 'Bringing imaginative worlds to life through digital art', followers: 3500, specialty: '3D Art', isPopular: true },
  { id: 7, name: 'Taylor Reed', role: 'Brand Designer', location: 'London, UK', interests: ['Branding', 'Typography', 'Identity Design'], avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop', bio: 'Creating meaningful brands and visual identities', followers: 2100, specialty: 'Branding', isPopular: false },
  { id: 8, name: 'Riley Park', role: 'Graphic Designer', location: 'Seoul, South Korea', interests: ['Typography', 'Print Design', 'Branding'], avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop', bio: 'Blending Korean aesthetics with modern design', followers: 2600, specialty: 'Typography', isPopular: false },
  { id: 9, name: 'Emma Davis', role: 'Illustrator', location: 'Berlin, Germany', interests: ['Character Design', 'Animation', 'Digital Art'], avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop', bio: 'Creating whimsical character designs and animations', followers: 2200, specialty: 'Animation', isPopular: true },
  { id: 10, name: 'Marcus Johnson', role: '3D Artist', location: 'Austin, USA', interests: ['3D Modeling', 'Game Design', 'VFX'], avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop', bio: '3D artist specializing in game character design', followers: 2900, specialty: '3D Art', isPopular: true },
  { id: 11, name: 'Sofia Rodriguez', role: 'Photographer', location: 'Mexico City, Mexico', interests: ['Landscape Photography', 'Portrait Photography', 'Travel'], avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop', bio: 'Travel photographer capturing beautiful landscapes', followers: 3800, specialty: 'Landscape Photography', isPopular: true },
  { id: 12, name: 'Chen Wei', role: 'Motion Designer', location: 'Shanghai, China', interests: ['Animation', 'Motion Graphics', '3D Animation'], avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop', bio: 'Specializing in cinematic motion graphics', followers: 2400, specialty: 'Animation', isPopular: true },
];

// Category sections configuration
const categoryCategories = [
  { id: 'landscape', name: 'Best of Landscape Photography', specialty: 'Landscape Photography', icon: '🏔️' },
  { id: '3d', name: 'Top 3D Artists', specialty: '3D Art', icon: '🎨' },
  { id: 'animation', name: 'Popular in Animation', specialty: 'Animation', icon: '🎬' },
  { id: 'ui', name: 'Master UI Designers', specialty: 'UI Design', icon: '💻' },
  { id: 'branding', name: 'Best Brand Designers', specialty: 'Branding', icon: '✨' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25 } }
};

// Horizontal scroll card component
const HorizontalCard = ({ user, onFollow, isFollowing, onMessage }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ y: -4 }}
    className="flex-shrink-0 w-80 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-2xl border border-white/40 dark:border-zinc-800/50 rounded-2xl shadow-lg hover:shadow-xl hover:border-white/60 dark:hover:border-zinc-700/60 transition-all duration-300 overflow-hidden group"
  >
    <div className="relative p-5">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative">
        {/* Avatar + Info */}
        <div className="flex items-start gap-3.5 mb-4">
          <motion.img
            whileHover={{ scale: 1.1 }}
            src={user.avatar}
            alt={user.name}
            className="h-12 w-12 rounded-full object-cover border-2 border-white/40 dark:border-white/10 shadow-md flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base truncate text-zinc-900 dark:text-white font-Quicksand">{user.name}</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm truncate">{user.role}</p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2 leading-relaxed">
          {user.bio}
        </p>

        {/* Location + Followers */}
        <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-500 mb-4 pb-4 border-b border-white/20 dark:border-white/10">
          <MapPin className="h-3 w-3 flex-shrink-0" />
          <span className="truncate">{user.location}</span>
          <span className="ml-auto whitespace-nowrap text-zinc-600 dark:text-zinc-400">
            {user.followers.toLocaleString()}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {user.interests.slice(0, 2).map((tag, idx) => (
            <span key={idx} className="px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/60 text-xs font-medium text-zinc-700 dark:text-zinc-300">
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onFollow(user.id)}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center font-Quicksand gap-1 ${
              isFollowing
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900'
                : 'bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/50 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800'
            }`}
          >
            <UserPlus className="h-3.5 w-3.5" />
            {isFollowing ? 'Following' : 'Follow'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onMessage(user.id)}
            className="px-3 py-2 rounded-lg text-xs font-semibold font-Quicksand bg-white/40 dark:bg-zinc-800/40 border border-white/40 dark:border-white/10 text-zinc-900 dark:text-white hover:bg-white/60 dark:hover:bg-zinc-800/60 transition-all flex items-center justify-center gap-1"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Chat
          </motion.button>
        </div>
      </div>
    </div>
  </motion.div>
);

// Grid card component
const GridCard = ({ user, onFollow, isFollowing, onMessage, onDetails }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ y: -3 }}
    onClick={onDetails}
    className="group relative overflow-hidden rounded-2xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-2xl border border-white/40 dark:border-zinc-800/50 shadow-lg hover:shadow-xl hover:border-white/60 dark:hover:border-zinc-700/60 transition-all duration-300 cursor-pointer flex flex-col"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    <div className="relative p-5 sm:p-6 flex flex-col h-full">
      {/* Avatar + Name + Role */}
      <div className="flex items-start gap-3.5 mb-4">
        <motion.img
          whileHover={{ scale: 1.08 }}
          src={user.avatar}
          alt={user.name}
          className="h-12 w-12 sm:h-14 sm:w-14 rounded-full object-cover border-2 border-white/40 dark:border-white/10 shadow-md flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base truncate text-zinc-900 dark:text-white font-Quicksand">{user.name}</h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm truncate">{user.role}</p>
        </div>
      </div>

      {/* Bio */}
      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2 leading-relaxed">
        {user.bio}
      </p>

      {/* Interests Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {user.interests.slice(0, 2).map((tag, idx) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.03 }}
            className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/60 text-xs font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50"
          >
            {tag}
          </motion.span>
        ))}
      </div>

      {/* Meta Info */}
      <div className="text-xs text-zinc-500 dark:text-zinc-500 mb-4 pb-4 border-b border-white/20 dark:border-white/10">
        <div className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          <span>{user.followers.toLocaleString()} followers</span>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2 mt-auto">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation();
            onFollow(user.id);
          }}
          className={`px-3 py-2.5 rounded-lg text-xs sm:text-sm font-semibold font-Quicksand transition-all flex items-center justify-center gap-1.5 ${
            isFollowing
              ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90'
              : 'bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/50 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800'
          }`}
        >
          <UserPlus className="h-3.5 w-3.5" />
          <span>{isFollowing ? 'Following' : 'Follow'}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation();
            onMessage(user.id);
          }}
          className="px-3 py-2.5 rounded-lg text-xs sm:text-sm font-semibold font-Quicksand bg-white/40 dark:bg-zinc-800/40 border border-white/40 dark:border-white/10 text-zinc-900 dark:text-white hover:bg-white/60 dark:hover:bg-zinc-800/60 transition-all flex items-center justify-center gap-1.5"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          <span>Message</span>
        </motion.button>
      </div>
    </div>
  </motion.div>
);

export default function DiscoverPeople() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [followingUsers, setFollowingUsers] = useState({});
  const scrollRefs = useRef({});

  // Get random users
  const randomUsers = useMemo(() => {
    const shuffled = [...allUsers].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 6);
  }, []);

  // Get users for each category
  const getCategoryUsers = (specialty) => {
    return allUsers
      .filter(u => u.specialty === specialty)
      .sort((a, b) => b.followers - a.followers);
  };

  const toggleFollow = (userId) => {
    setFollowingUsers(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const scrollHorizontal = (direction, refKey) => {
    const ref = scrollRefs.current[refKey];
    if (ref) {
      const scrollAmount = 400;
      ref.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300 overflow-x-hidden">
      {/* <Header/> */}
      {/* Ambient glow */}
      <div 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] pointer-events-none opacity-30 dark:opacity-10 z-0"
        style={{ background: "radial-gradient(ellipse, rgba(120,120,120,0.2) 0%, transparent 70%)" }}
      />

      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-40 backdrop-blur-2xl bg-white/40 dark:bg-zinc-950 border-b border-white/20 dark:border-zinc-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            {/* Logo and user button  */}
          <div className=' flex items-center justify-between '>
          <Link to={"/"}>
          <h1 className='text-xl font-bold tracking-tight leading-relaxed font-Eagle'> Painters' Diary</h1>
          </Link>
          <Link to={"/profile"}><User size={16}/></Link>
           </div>
              <hr className="border-zinc-100 dark:border-zinc-800/60 w-full mb-2 mt-2" />

            <div className="flex items-center justify-between gap-4 mb-6 pt-12">
              <div>
                <h1 className="text-3xl sm:text-4xl font-light tracking-tight font-Quicksand flex items-center gap-3">
                  <Sparkles className="h-8 w-8" />
                  Discover Creators
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Find amazing artists based on interests & who you follow</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400 dark:text-zinc-500" />
              <input
                type="text"
                placeholder="Search by name or specialty…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border border-white/40 dark:border-zinc-800/40 rounded-xl py-3 pl-12 pr-4 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white focus:border-white/60 dark:focus:border-white/30 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-500 shadow-lg hover:border-white/60 dark:hover:border-zinc-700/60"
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          {/* Random Users Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-8">
              <Zap className="h-5 w-5 text-amber-500" />
              <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-white font-Quicksand">Recommended For You</h2>
              <span className="text-sm text-zinc-500 dark:text-zinc-400 ml-auto">Random picks based on your interests</span>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {randomUsers.map(user => (
                <GridCard
                  key={user.id}
                  user={user}
                  isFollowing={followingUsers[user.id]}
                  onFollow={toggleFollow}
                  onMessage={() => setSelectedUser(user)}
                  onDetails={() => setSelectedUser(user)}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Category Sections */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-16"
          >
            {categoryCategories.map((category) => {
              const categoryUsers = getCategoryUsers(category.specialty);
              return categoryUsers.length > 0 ? (
                <motion.div key={category.id} variants={cardVariants}>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-white font-Quicksand">{category.name}</h3>
                    <Award className="h-5 w-5 text-amber-500 ml-auto" />
                  </div>

                  {/* Horizontal Scroll Container */}
                  <div className="relative group">
                    <div
                      ref={el => scrollRefs.current[category.id] = el}
                      className="flex gap-5 overflow-x-auto pb-4 scroll-smooth no-scrollbar"
                    >
                      {categoryUsers.map(user => (
                        <HorizontalCard
                          key={user.id}
                          user={user}
                          isFollowing={followingUsers[user.id]}
                          onFollow={toggleFollow}
                          onMessage={() => setSelectedUser(user)}
                        />
                      ))}
                    </div>

                    {/* Scroll Buttons */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scrollHorizontal('left', category.id)}
                      className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/60 dark:bg-zinc-800/60 backdrop-blur-xl border border-white/40 dark:border-white/10 hover:bg-white/80 dark:hover:bg-zinc-800/80 shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scrollHorizontal('right', category.id)}
                      className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/60 dark:bg-zinc-800/60 backdrop-blur-xl border border-white/40 dark:border-white/10 hover:bg-white/80 dark:hover:bg-zinc-800/80 shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </motion.button>
                  </div>
                </motion.div>
              ) : null;
            })}
          </motion.div>
        </main>
      </div>

      {/* User Detail Modal */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedUser(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl border border-white/40 dark:border-zinc-800/50 rounded-3xl shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedUser(null)}
                className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/60 dark:bg-zinc-800/60 hover:bg-white/80 dark:hover:bg-zinc-800/80 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.img
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                    className="h-24 w-24 rounded-full object-cover border-4 border-white/40 dark:border-white/10 shadow-lg mx-auto mb-4"
                  />
                  <h2 className="text-3xl font-semibold mb-1">{selectedUser.name}</h2>
                  <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-2">{selectedUser.role}</p>
                  
                  <div className="flex items-center justify-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                    <MapPin className="h-4 w-4" />
                    {selectedUser.location}
                  </div>

                  <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
                    {selectedUser.bio}
                  </p>

                  {/* Followers + Specialty */}
                  <div className="flex items-center justify-center gap-4 text-sm mb-8 pb-8 border-b border-white/20 dark:border-white/10">
                    <div className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
                      <Users className="h-4 w-4" />
                      <span>{selectedUser.followers.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                      <Award className="h-4 w-4" />
                      <span>{selectedUser.specialty}</span>
                    </div>
                  </div>

                  {/* Interests */}
                  <div className="text-left mb-8">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-3">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedUser.interests.map((tag, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          className="px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/60 text-sm font-medium text-zinc-700 dark:text-zinc-300"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleFollow(selectedUser.id)}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                        followingUsers[selectedUser.id]
                          ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90'
                          : 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90'
                      }`}
                    >
                      <UserPlus className="h-5 w-5" />
                      {followingUsers[selectedUser.id] ? 'Following' : 'Follow'}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 rounded-lg bg-white/40 dark:bg-zinc-800/40 border border-white/40 dark:border-white/10 text-zinc-900 dark:text-white font-semibold hover:bg-white/60 dark:hover:bg-zinc-800/60 transition-all flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Send Message
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

