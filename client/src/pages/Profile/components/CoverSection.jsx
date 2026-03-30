import React from 'react';
import { motion } from 'framer-motion';

export default function CoverSection({ coverImage }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full h-48 md:h-64 lg:h-72 rounded-2xl overflow-hidden relative bg-zinc-100 dark:bg-zinc-900 transition-colors duration-300"
    >
      <img 
        src={coverImage} 
        alt="Cover" 
        className="w-full h-full object-cover"
      />
      {/* Gradient overlay adapting to light/dark mode */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80 dark:from-[#09090b] dark:opacity-60 transition-colors duration-300" />
    </motion.div>
  );
}