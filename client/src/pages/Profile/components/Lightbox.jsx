import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, Trophy, Tag, DollarSign, Heart, MessageCircle, Share2, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

const fmt = (n) => n ? Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(n) : '0';

const STATS = [
  { key: 'likesCount',    icon: Heart,         hoverColor: 'hover:text-rose-500'    },
  { key: 'commentsCount', icon: MessageCircle, hoverColor: 'hover:text-blue-500'    },
  { key: 'sharesCount',   icon: Share2,        hoverColor: 'hover:text-emerald-500' },
  { key: 'viewsCount',    icon: Eye,           hoverColor: 'hover:text-zinc-500'    },
];

export default function Lightbox({ item, onClose }) {
  const [showInfo, setShowInfo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // Slider state

  // Reset index when a new item is opened
  useEffect(() => {
    setCurrentIndex(0);
  }, [item]);

  // Responsive check
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Keyboard navigation & close
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { 
        if (showInfo) setShowInfo(false); else onClose(); 
      }
      if (e.key === 'ArrowRight' && item?.mediaFiles?.length > 1) {
        setCurrentIndex((prev) => (prev + 1) % item.mediaFiles.length);
      }
      if (e.key === 'ArrowLeft' && item?.mediaFiles?.length > 1) {
        setCurrentIndex((prev) => (prev - 1 + item.mediaFiles.length) % item.mediaFiles.length);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showInfo, onClose, item]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (!item) return null;

  const hasMultiple = item.mediaFiles && item.mediaFiles.length > 1;
  const currentMedia = item.mediaFiles[currentIndex];

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % item.mediaFiles.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + item.mediaFiles.length) % item.mediaFiles.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.25 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="fixed inset-0 z-[100] flex overflow-hidden bg-black/95"
    >
      {/* ── Media area ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.35, delay: 0.05 } }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="flex-1 flex items-center justify-center p-6 md:p-14 min-w-0 relative group"
        onClick={() => showInfo && setShowInfo(false)}
      >
        {/* Render Current Media */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center w-full h-full"
          >
            {currentMedia?.type === 'video' ? (
              <video
                src={currentMedia.url}
                controls autoPlay
                className="max-w-full max-h-full rounded-sm object-contain"
                style={{ maxHeight: 'calc(100vh - 80px)' }}
              />
            ) : (
              <img
                src={currentMedia?.url}
                alt={item.title}
                className="max-w-full max-h-full rounded-sm object-contain select-none"
                style={{ maxHeight: 'calc(100vh - 80px)' }}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Slider Controls ── */}
        {hasMultiple && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 w-12 h-12 flex items-center justify-center bg-black/40 hover:bg-black/80 text-white rounded-full backdrop-blur-md border border-white/10 transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 w-12 h-12 flex items-center justify-center bg-black/40 hover:bg-black/80 text-white rounded-full backdrop-blur-md border border-white/10 transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight size={28} />
            </button>
            
            {/* Dots Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {item.mediaFiles.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white w-4' : 'bg-white/40'}`} 
                />
              ))}
            </div>
          </>
        )}

        {/* Top Controls */}
        <div className="absolute top-5 md:left-1/2 right-2 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 text-white border border-white/15 hover:bg-red-500/70 hover:border-transparent transition-all"
          >
            <X size={16} />
          </button>
          <AnimatePresence>
            {!showInfo && (
              <motion.button
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                onClick={() => setShowInfo(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 text-white border border-white/15 hover:bg-white/20 transition-all text-sm font-medium"
              >
                <Info size={15} /> Details
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ── Info Panel ── */}
      <AnimatePresence>
        {showInfo && (
          <>
            <motion.div
              className="md:hidden absolute inset-0 z-[109]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowInfo(false)}
            />
            <motion.aside
              initial={isMobile ? { y: '100%', opacity: 0 } : { x: '100%', opacity: 0 }}
              animate={isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
              exit={isMobile ? { y: '100%', opacity: 0 } : { x: '100%', opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed z-[110] bg-white dark:bg-zinc-950 flex flex-col bottom-0 left-0 right-0 h-[72vh] rounded-t-2xl md:static md:h-full md:rounded-none md:w-[380px] md:border-l md:border-zinc-800/60"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800/60">
                <span className="text-xs font-semibold text-zinc-500 uppercase">Details</span>
                <button onClick={() => setShowInfo(false)} className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200">
                  <ChevronLeft size={13} /> Close
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2 font-Quicksand">{item.title}</h2>
                  <p className="text-sm text-zinc-400">{item.description || 'No description provided.'}</p>
                </div>

                <div className="grid grid-cols-4 gap-3 py-4 border-y border-zinc-800/60">
                  {STATS.map(({ key, icon: Icon, hoverColor }) => (
                    <div key={key} className={`flex flex-col items-center gap-1 text-zinc-500 ${hoverColor}`}>
                      <Icon size={17} />
                      <span className="text-xs font-semibold text-zinc-200">{fmt(item[key])}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="flex items-center gap-2 text-xs font-semibold text-zinc-500 uppercase mb-3">
                    <Tag size={12} /> Tags
                  </h3>
                  {item.tags?.length ? (
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag, i) => (
                        <span key={i} className="px-2.5 py-1 bg-zinc-800/70 text-zinc-300 text-xs rounded-full border border-zinc-700/60">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-zinc-500 italic">No tags added.</p>
                  )}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}