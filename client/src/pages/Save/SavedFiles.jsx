import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, LayoutGrid, Trash2, Play, Search, Grid3X3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../components/common/Header";

// --- Mock Data (Images & Videos) ---
const DUMMY_MEDIA = [
  { type: "image", src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1000&auto=format&fit=crop" },
  { type: "video", src: "https://assets.mixkit.co/videos/preview/mixkit-white-paint-on-black-surface-331-large.mp4" },
  { type: "image", src: "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?q=80&w=1000&auto=format&fit=crop" },
  { type: "image", src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop" },
  { type: "image", src: "https://images.unsplash.com/photo-1515462277126-2dd0c162007a?q=80&w=1000&auto=format&fit=crop" },
  { type: "video", src: "https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-326-large.mp4" },
  { type: "image", src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=1000&auto=format&fit=crop" },
];

const Saved = () => {
  const [mediaItems, setMediaItems] = useState([]);

  useEffect(() => {
    // 1. Load LocalStorage
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteImages")) || [];
    // 2. Format LocalStorage strings to objects
    const formattedStored = storedFavorites.map(src => ({ type: "image", src }));
    // 3. Merge with Dummy Data for UI demo
    setMediaItems([...formattedStored, ...DUMMY_MEDIA]);
  }, []);

  const removeItem = (srcToRemove) => {
    setMediaItems(prev => prev.filter(item => item.src !== srcToRemove));
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteImages")) || [];
    const newLocalStorage = storedFavorites.filter(img => img !== srcToRemove);
    localStorage.setItem("favoriteImages", JSON.stringify(newLocalStorage));
  };

  return (
    <div className="min-h-screen w-full bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 transition-colors duration-300 font-sans">
      
      {/* --- Header: Clean, Glass, Monochromatic --- */}
      <Header/>

      {/* --- Main Content --- */}
      <main className="pt-24 px-4 md:px-8 pb-12 max-w-7xl mx-auto">
        
        {/* Title Section */}
        <div className="flex items-end justify-between mb-8 px-1">
          <div>
            <h2 className="text-3xl font-light tracking-tight text-zinc-900 dark:text-white">Saved</h2>
            <p className="text-xs font-mono text-zinc-500 mt-1 uppercase tracking-widest">
              {mediaItems.length} Collections
            </p>
          </div>
          {/* Optional Search Icon trigger */}
          <button className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-900 transition-colors">
            <Search className="w-4 h-4 text-zinc-500" />
          </button>
        </div>

        {/* Empty State */}
        {mediaItems.length === 0 ? (
          <div className="h-[60vh] flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-600">
            <LayoutGrid className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-sm tracking-wide">Your canvas is blank.</p>
          </div>
        ) : (
          /* --- Masonry Grid --- */
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            <AnimatePresence mode="popLayout">
              {mediaItems.map((item, index) => (
                <MediaCard key={item.src + index} item={item} onRemove={removeItem} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
};

// --- Minimalist Media Card ---
const MediaCard = ({ item, onRemove }) => {
  const isVideo = item.type === "video";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3 }}
      className="relative group break-inside-avoid overflow-hidden rounded-lg bg-zinc-200 dark:bg-zinc-900"
    >
      {/* Media Content */}
      {isVideo ? (
        <div className="relative">
             <video
              src={item.src}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
            />
            {/* Tiny video indicator */}
            <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm p-1.5 rounded-full">
                <Play className="w-3 h-3 text-white fill-current" />
            </div>
        </div>
      ) : (
        <img
          src={item.src}
          alt="Saved Content"
          className="w-full h-auto object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
          loading="lazy"
        />
      )}

      {/* Hover Overlay - Minimalist Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
        <span className="text-[10px] text-zinc-300 font-mono uppercase tracking-wider">
            {isVideo ? '00:15' : 'IMG'}
        </span>
        
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
             e.preventDefault();
             onRemove(item.src);
          }}
          className="text-white hover:text-red-400 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Saved;