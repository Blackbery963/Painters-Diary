import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

// --- STATIC DATA ---
// Replaced Pexels API with high-quality static fallbacks
const FALLBACK_IMAGES = [
  "https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1143754/pexels-photo-1143754.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1570779/pexels-photo-1570779.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/2123337/pexels-photo-2123337.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=800",
];

// --- MOCK STATE ---
// Change these to test different UI states
const IS_AUTHENTICATED = false; 
const MOCK_USER_NAME = "Artist"; 

// --- LOGIC: Dynamic Greetings ---
const getGreeting = (name) => {
  const hour = new Date().getHours();
  let timeMsg = "Good morning";
  if (hour >= 12 && hour < 17) timeMsg = "Good afternoon";
  else if (hour >= 17) timeMsg = "Good evening";

  const templates = [
    `${timeMsg}, ${name}`,
    `Welcome back, ${name}`,
    `Ready to create, ${name}?`,
    `Great to see you, ${name}`,
    `${timeMsg}, let's design something new`,
  ];

  const randomIndex = Math.floor(Math.random() * templates.length);
  return templates[randomIndex];
};

// --- COMPONENTS ---
const InfiniteMarquee = ({ images, direction = "left", speed = 40 }) => {
  const marqueeContent = useMemo(() => [...images, ...images, ...images, ...images], [images]);

  return (
    <div className="flex w-full overflow-hidden select-none pointer-events-none">
      <motion.div
        className="flex gap-4 min-w-full shrink-0" 
        initial={{ x: direction === "left" ? "0%" : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : "0%" }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }} 
      >
        {marqueeContent.map((src, i) => (
          <div
            key={i}
            className="relative w-64 h-40 md:w-80 md:h-52 rounded-xl overflow-hidden shrink-0 shadow-lg"
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover transform scale-105" 
            />
            <div className="absolute inset-0 bg-white/10 dark:bg-transparent" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const [greetingText, setGreetingText] = useState("Where Creativity Thrives");
  const [isGridReady, setIsGridReady] = useState(false);

  // User Name & Greeting Logic
  useEffect(() => {
    if (IS_AUTHENTICATED && MOCK_USER_NAME) {
      const formattedName = MOCK_USER_NAME.charAt(0).toUpperCase() + MOCK_USER_NAME.slice(1);
      setGreetingText(getGreeting(formattedName));
    } else {
      setGreetingText("Where Creativity Thrives");
    }
    
    // Slight delay to trigger the fade-in animation for the grid
    const timer = setTimeout(() => setIsGridReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full min-h-[58vh] md:min-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-gray-50 dark:bg-black transition-colors duration-300">
      
      {/* --- BACKGROUND ART GRID --- */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${isGridReady ? 'opacity-100' : 'opacity-0'}`}
      >
        <div
          className="flex flex-col gap-6 items-center justify-center opacity-30 dark:opacity-50 blur-[0.5px]"
          style={{
            transform: "rotate(-12deg) scale(1.25)", 
            width: "200vw", 
            height: "200vh" 
          }}
        >
          <InfiniteMarquee images={FALLBACK_IMAGES} speed={140} />
          <InfiniteMarquee images={FALLBACK_IMAGES} direction="right" speed={160} />
          <InfiniteMarquee images={FALLBACK_IMAGES} speed={120} />
          <InfiniteMarquee images={FALLBACK_IMAGES} direction="right" speed={180} />
          <InfiniteMarquee images={FALLBACK_IMAGES} speed={130} />
        </div>
      </div>

      {/* --- VISIBILITY FIX: GRADIENTS --- */}
      
      {/* Top fade */}
      <div className="pointer-events-none absolute top-0 w-full h-32 bg-gradient-to-b from-gray-50 via-transparent to-transparent dark:from-black" />
      
      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 w-full h-32 bg-gradient-to-t from-gray-50 via-transparent to-transparent dark:from-black" />

      {/* Side fades (Subtle vignette) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-gray-50/80 via-transparent to-gray-50/80 dark:from-black/80 dark:via-transparent dark:to-black/80" />

      {/* Text readability layer */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
         <div className="w-full max-w-4xl h-96 bg-gray-50/60 dark:bg-black/60 blur-3xl rounded-full" />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 text-center ">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-4"
        >
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
          <span className="text-sm font-medium tracking-wider text-gray-600 dark:text-gray-400 uppercase">
            {IS_AUTHENTICATED ? "Creator Studio" : "Creative Space"}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-gray-900 dark:text-white mb-6 drop-shadow-sm">
            {greetingText}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            {IS_AUTHENTICATED
              ? "Your digital canvas awaits. Explore, collect, and design."
              : "A minimalist space designed for creative minds to explore, share, and inspire."
            }
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default Hero;