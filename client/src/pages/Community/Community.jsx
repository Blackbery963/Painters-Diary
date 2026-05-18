import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Users, Medal, Blocks, Star, Calendar, Menu, X,
  ChevronRight, Trophy, Clock, ArrowRight, Heart, BookOpen,
  Lightbulb, Zap, FileText, Users2, Search,
  Plus
} from 'lucide-react';
import Logo from "../../assets/Logo.jpeg";
import ArticlesFeed from '../../components/communityComponents/article';
import GuidesFeed from '../../components/communityComponents/guide';
import ResearchFeed from '../../components/communityComponents/research';

// === MOCK DATA ===
const featuredCommunities = [
  { id: 1, name: "Digital Painters", members: "12.5k", image: "https://images.pexels.com/photos/1988686/pexels-photo-1988686.jpeg", desc: "Contemporary digital illustration" },
  { id: 2, name: "3D Sculpture", members: "8.2k", image: "https://images.pexels.com/photos/2528118/pexels-photo-2528118.jpeg", desc: "3D modeling & hard surface design" },
  { id: 3, name: "Conceptual Art", members: "6.8k", image: "https://images.pexels.com/photos/3354675/pexels-photo-3354675.jpeg", desc: "World building & concept exploration" },
  { id: 4, name: "Traditional Media", members: "4.1k", image: "https://images.pexels.com/photos/1054289/pexels-photo-1054289.jpeg", desc: "Oil, acrylic & classical techniques" },
];

const activeChallenge = {
  title: "Neon Nights",
  type: "Weekly Challenge",
  timeLeft: "2 Days Remaining",
  participants: 142,
  image: "https://images.pexels.com/photos/3094215/pexels-photo-3094215.jpeg"
};

const spotlightData = {
  name: "Elena Vosh",
  handle: "@elena_v",
  bio: "Digital Impressionist | 3D Sculptor",
  image: "https://images.pexels.com/photos/3094215/pexels-photo-3094215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  work1: "https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  work2: "https://images.pexels.com/photos/1988686/pexels-photo-1988686.jpeg"
};

const researchPapers = [
  {
    id: 1,
    title: "The Science of Color Theory in Digital Art",
    author: "Dr. Marcus Chen",
    readTime: "12 min",
    category: "Theory",
    excerpt: "Exploring how color psychology impacts visual hierarchy and emotional resonance in digital compositions.",
    image: "https://images.pexels.com/photos/2537090/pexels-photo-2537090.jpeg",
    date: "Oct 15, 2026"
  },
  {
    id: 2,
    title: "Neural Networks & Creative AI Systems",
    author: "Prof. Sarah Nakamura",
    readTime: "18 min",
    category: "Technology",
    excerpt: "Deep dive into how AI is revolutionizing the creative process and shaping future artistic workflows.",
    image: "https://images.pexels.com/photos/3862633/pexels-photo-3862633.jpeg",
    date: "Oct 12, 2026"
  },
  {
    id: 3,
    title: "Composition Dynamics: A Mathematical Approach",
    author: "James Wilson",
    readTime: "14 min",
    category: "Technique",
    excerpt: "Understanding the geometric principles that make compositions visually compelling and balanced.",
    image: "https://images.pexels.com/photos/3097427/pexels-photo-3097427.jpeg",
    date: "Oct 8, 2026"
  }
];

const guides = [
  {
    id: 1,
    title: "Mastering Professional Lighting Techniques",
    author: "Alex Rivera",
    readTime: "18 min",
    category: "Technique",
    excerpt: "Step-by-step breakdown of professional lighting techniques used in AAA game development and film.",
    image: "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg",
    date: "Oct 14, 2026"
  },
  {
    id: 2,
    title: "Building Your Creative Portfolio: Complete Guide",
    author: "Sophie Laurent",
    readTime: "22 min",
    category: "Career",
    excerpt: "Strategies for curating, presenting, and marketing your artwork to industry professionals.",
    image: "https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg",
    date: "Oct 10, 2026"
  },
  {
    id: 3,
    title: "Digital Painting Workflow Optimization",
    author: "Marcus Rodriguez",
    readTime: "16 min",
    category: "Workflow",
    excerpt: "Proven techniques to streamline your painting process and increase productivity without sacrificing quality.",
    image: "https://images.pexels.com/photos/2693857/pexels-photo-2693857.jpeg",
    date: "Oct 6, 2026"
  }
];

const articles = [
  {
    id: 1,
    title: "The Evolution of Digital Illustration Trends in 2026",
    author: "Luna Wei",
    readTime: "8 min",
    category: "Trends",
    excerpt: "Analysis of emerging styles and techniques shaping the future of digital art in the current creative landscape.",
    image: "https://images.pexels.com/photos/3587620/pexels-photo-3587620.jpeg",
    date: "Oct 16, 2026"
  },
  {
    id: 2,
    title: "Community Spotlight: Female Digital Artists Making Waves",
    author: "David Chen",
    readTime: "10 min",
    category: "Community",
    excerpt: "Celebrating the remarkable achievements and contributions of women artists in the digital space.",
    image: "https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg",
    date: "Oct 13, 2026"
  },
  {
    id: 3,
    title: "From Traditional to Digital: A Career Transition Guide",
    author: "Elena Volkova",
    readTime: "11 min",
    category: "Career",
    excerpt: "Insights from artists who successfully transitioned from traditional mediums to digital platforms.",
    image: "https://images.pexels.com/photos/2696299/pexels-photo-2696299.jpeg",
    date: "Oct 9, 2026"
  }
];

const eventsData = [
  { date: "24", month: "OCT", title: "Global Sketch Meet", time: "18:00 GMT • Live" },
  { date: "02", month: "NOV", title: "Concept Art Workshop", time: "14:00 GMT • Zoom" },
];

// === MOBILE SIDEBAR COMPONENT ===
const MobileSidebar = ({ isOpen, setIsOpen }) => {
  const navItems = [
    { icon: Home, label: "Home", to: "/", active: true },
    { icon: Users, label: "Communities", to: "/Community/Hub" },
    { icon: Medal, label: "Challenges", to: "/Community/Challenges/Hub" },
    { icon: Blocks, label: "Resources", to: "/Community/Resources/Hub" },
  ];

  const secondaryItems = [
    { icon: Star, label: "Spotlight", to: "#" },
    { icon: Users2, label: "Collaborations", to: "#" },
    { icon: Calendar, label: "Events", to: "#" },
  ];

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Panel */}
      <motion.div
        initial={{ x: -320 }}
        animate={{ x: isOpen ? 0 : -320 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed left-0 top-0 h-screen w-80 bg-white dark:bg-black border-r border-zinc-200 dark:border-zinc-800 z-50 overflow-y-auto"
      >
        <div className="p-6 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
                <img src={Logo} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-lg tracking-tight font-serif">Painters' Diary</span>
            </Link>
            <motion.button
              whileHover={{ rotate: 90 }}
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors"
            >
              <X size={20} />
            </motion.button>
          </div>

          {/* Primary Navigation */}
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link key={item.label} to={item.to} onClick={() => setIsOpen(false)}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    item.active
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-black'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                  }`}
                >
                  <item.icon size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

          {/* Secondary Navigation */}
          <div className="space-y-2">
            {secondaryItems.map((item) => (
              <Link key={item.label} to={item.to} onClick={() => setIsOpen(false)}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
                >
                  <item.icon size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Create Button */}
          <div className="pt-4">
            <Link to="/community/create">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-black py-3 rounded-xl font-semibold text-sm"
              >
                <Plus/> <span>Create Community</span>
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};

// === DESKTOP SIDEBAR COMPONENT ===
const DesktopSidebar = () => {
  const navItems = [
    { icon: Home, label: "Home", to: "/", active: true },
    { icon: Users, label: "Communities", to: "/Community/Hub" },
    { icon: Medal, label: "Challenges", to: "/Community/Challenges/Hub" },
    { icon: Blocks, label: "Resources", to: "/Community/Resources/Hub" },
  ];

  const secondaryItems = [
    { icon: Star, label: "Spotlight", to: "#" },
    { icon: Users2, label: "Collaborations", to: "#" },
    { icon: Calendar, label: "Events", to: "#" },
  ];

  return (
    <div className="hidden md:block md:col-span-3 lg:col-span-2 relative">
      <div className="sticky top-24 flex flex-col gap-1">
        {navItems.map((item) => (
          <Link key={item.label} to={item.to}>
            <motion.div
              whileHover={{ x: 4 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                item.active
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-black'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'
              }`}
            >
              <item.icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </motion.div>
          </Link>
        ))}

        <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-4 mx-2" />

        {secondaryItems.map((item) => (
          <Link key={item.label} to={item.to}>
            <motion.div
              whileHover={{ x: 4 }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
            >
              <item.icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </motion.div>
          </Link>
        ))}

        {/* CREATE COMMUNITY BUTTON */}
        <div className="mt-6 px-2">
          <Link to="/community/create">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 hover:pointer-events-auto bg-zinc-900 dark:bg-white text-white dark:text-black py-3 rounded-xl font-bold text-sm shadow-lg shadow-zinc-200 dark:shadow-zinc-900/20"
            >
              <Plus/> <span>Create Community</span>
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// === CONTENT CARD COMPONENT ===
const ContentCard = ({ item }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all cursor-pointer shadow-sm hover:shadow-md"
    >
      {/* Image */}
      <div className="h-40 overflow-hidden relative bg-zinc-100 dark:bg-zinc-800">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-zinc-600 dark:text-zinc-400">
            {item.category}
          </span>
          <span className="text-[10px] text-zinc-500 font-medium">{item.date}</span>
        </div>

        <h3 className="font-bold text-sm text-zinc-900 dark:text-white mb-2 line-clamp-2 group-hover:text-zinc-700 dark:group-hover:text-zinc-100 transition-colors">
          {item.title}
        </h3>

        <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-3">
          {item.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-xs text-zinc-500">
            <p className="font-medium text-zinc-700 dark:text-zinc-300">{item.author}</p>
            <p className="flex items-center gap-1 mt-0.5">
              <FileText size={12} /> {item.readTime}
            </p>
          </div>
          <motion.div
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight size={18} className="text-zinc-400" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// === MAIN COMPONENT ===
const Community = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100">
      
      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 z-40 w-full bg-white/50 dark:bg-black/50 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors"
          >
            <Menu size={20} />
          </motion.button>

          {/* Logo (Desktop) */}
          <Link to="/" className="hidden md:flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
              <img src={Logo} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-lg tracking-tight font-serif">Painters' Diary</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden sm:block">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search articles, guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all"
              />
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center cursor-pointer hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
            >
              <span className="text-sm font-semibold">AV</span>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={mobileMenuOpen} setIsOpen={setMobileMenuOpen} />

      {/* ================= MAIN CONTENT ================= */}
      <main className="pt-20 pb-12 max-w-[1600px] mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* LEFT SIDEBAR - DESKTOP */}
          <DesktopSidebar />

          {/* CENTER COLUMN */}
          <div className="col-span-1 md:col-span-9 lg:col-span-7 space-y-12">
            
            {/* HERO SECTION */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 dark:from-white dark:to-zinc-100 rounded-2xl p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-zinc-700 to-transparent dark:from-zinc-200 dark:to-transparent opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative z-10">
                  <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-black mb-4 tracking-tight">
                    Welcome to the Gallery
                  </h1>
                  <p className="text-lg text-zinc-300 dark:text-zinc-700 max-w-2xl mb-6">
                    Connect with world-class artists, explore cutting-edge techniques, and join vibrant creative communities.
                  </p>
                  <motion.button
                    whileHover={{ x: 6 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 bg-white dark:bg-black text-black dark:text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all"
                  >
                    Explore Communities <ArrowRight size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.section>

            {/* TRENDING COMMUNITIES */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Users size={20} /> Trending Communities
                </h2>
                <Link to="/Community/Hub" className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 transition-colors">
                  View All <ChevronRight size={14} />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featuredCommunities.map((comm, idx) => (
                  <motion.div
                    key={comm.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all">
                      <div className="h-32 overflow-hidden relative">
                        <img
                          src={comm.image}
                          alt={comm.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>

                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">{comm.name}</h3>
                            <p className="text-xs text-zinc-500 mt-1">{comm.members}</p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-[10px] font-bold bg-zinc-900 dark:bg-white text-white dark:text-black px-3 py-1.5 rounded-full"
                          >
                            Join
                          </motion.button>
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-1">{comm.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* ACTIVE CHALLENGE */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Trophy size={20} /> Challenge of the Week
                </h2>
              </div>
              
              <Link to="/Community/Challenges/Hub">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="relative h-72 rounded-2xl overflow-hidden group cursor-pointer border border-zinc-200 dark:border-zinc-800"
                >
                  <img
                    src={activeChallenge.image}
                    alt="Challenge"
                    className="w-full h-full object-cover brightness-50 group-hover:brightness-40 transition-all duration-500 group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center gap-2 mb-4">
                      <motion.span
                        animate={{ opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="bg-white text-black text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                      >
                        Live Now
                      </motion.span>
                      <span className="text-xs font-medium text-zinc-300 flex items-center gap-1">
                        <Clock size={12} /> {activeChallenge.timeLeft}
                      </span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{activeChallenge.title}</h3>

                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-zinc-600" />
                        ))}
                        <div className="w-8 h-8 rounded-full border-2 border-black bg-zinc-700 flex items-center justify-center text-[10px] text-white font-bold">
                          +{activeChallenge.participants}
                        </div>
                      </div>
                      <span className="flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
                        Enter Challenge <ArrowRight size={18} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.section>

            {/* RESEARCH PAPERS SECTION */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Lightbulb size={20} /> Research Papers
                </h2>
                <Link to="#" className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 transition-colors">
                  View All <ChevronRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* {researchPapers.map((paper, idx) => (
                  <motion.div
                    key={paper.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                  >
                    <ContentCard item={paper} />
                  </motion.div>
                ))} */}<ResearchFeed/>
              </div>
            </motion.section>

            {/* GUIDES SECTION */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <BookOpen size={20} /> Guides & Tutorials
                </h2>
                <Link to="#" className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 transition-colors">
                  View All <ChevronRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* {guides.map((guide, idx) => (
                  <motion.div
                    key={guide.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + idx * 0.05 }}
                  >
                    <ContentCard item={guide} />
                  </motion.div>
                ))} */}<GuidesFeed/>
              </div>
            </motion.section>

            {/* ARTICLES SECTION */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Zap size={20} /> Latest Articles
                </h2>
                <Link to="#" className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 transition-colors">
                  View All <ChevronRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* {articles.map((article, idx) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.05 }}
                  >
                    <ContentCard item={article} />
                  </motion.div>
                ))} */}<ArticlesFeed/>
              </div>
            </motion.section>

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            
            {/* ARTIST SPOTLIGHT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="sticky top-24 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden"
            >
              <div className="h-24 bg-gradient-to-r from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 relative">
                <div className="absolute -bottom-8 left-4">
                  <img
                    src={spotlightData.image}
                    alt={spotlightData.name}
                    className="w-16 h-16 rounded-lg border-2 border-white dark:border-black object-cover"
                  />
                </div>
              </div>

              <div className="p-4 pt-10">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-sm text-zinc-900 dark:text-white">{spotlightData.name}</h3>
                    <p className="text-xs text-zinc-500">{spotlightData.handle}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-xs font-bold px-2.5 py-1 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black"
                  >
                    Follow
                  </motion.button>
                </div>
                
                <p className="text-xs text-zinc-600 dark:text-zinc-400 italic mb-3">{spotlightData.bio}</p>
                
                <div className="grid grid-cols-2 gap-2">
                  <img src={spotlightData.work1} alt="Work" className="h-14 w-full object-cover rounded" />
                  <img src={spotlightData.work2} alt="Work" className="h-14 w-full object-cover rounded" />
                </div>
              </div>
            </motion.div>

            {/* UPCOMING EVENTS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-80 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4"
            >
              <h3 className="font-bold text-sm text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                <Calendar size={16} /> Upcoming Events
              </h3>
              
              <div className="space-y-3">
                {eventsData.map((event, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                    className="flex gap-3 pb-3 border-b border-zinc-100 dark:border-zinc-800 last:border-0 last:pb-0"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded bg-zinc-100 dark:bg-zinc-800 flex flex-col items-center justify-center text-center">
                      <span className="text-[10px] font-semibold text-zinc-500">{event.month}</span>
                      <span className="text-sm font-bold text-zinc-900 dark:text-white">{event.date}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-zinc-900 dark:text-white hover:underline cursor-pointer">
                        {event.title}
                      </p>
                      <p className="text-xs text-zinc-500 mt-0.5">{event.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* FOOTER */}
            <div className="text-xs text-zinc-500 space-y-2">
              <p className="font-medium">© 2026 Painters' Diary</p>
              <p className="flex items-center gap-1">
                Crafted with <Heart size={12} className="text-red-500 fill-current" /> for Creative Minds
              </p>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
};

export default Community;

