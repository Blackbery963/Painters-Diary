import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Film, ShoppingBag, Play, Award, LayoutGrid } from 'lucide-react';
import Lightbox from './components/Lightbox';
import { accessTokenStore } from '../../utils/tokenStore.utils.js';

const TABS = [
  { id: 'all',      label: 'All',      icon: LayoutGrid  },
  { id: 'artworks', label: 'Artworks', icon: ImageIcon   },
  { id: 'videos',   label: 'Videos',   icon: Play        },
  { id: 'store',    label: 'Store',    icon: ShoppingBag },
];

const getSpanClass = (index) => {
  // Tweaked slightly so spans fit better on mobile screens
  if (index % 7 === 0) return 'col-span-2 row-span-2';
  if (index % 4 === 1) return 'row-span-2';
  if (index % 6 === 3) return 'col-span-2 md:col-span-1'; 
  return 'col-span-1 row-span-1';
};

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 16, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1,   transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:    { opacity: 0, y: -8, scale: 0.97, transition: { duration: 0.2 } },
};

export default function UserCollection() {
  const [activeTab,    setActiveTab]    = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [uploads,      setUploads]      = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = accessTokenStore.get();
      
      if (!token || accessTokenStore.isExpired()) {
        setError('Session expired. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/post/get-posts`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || `Server error: ${res.status}`);
        }

        let data = await res.json();

        // Unwrap envelope
        if (!Array.isArray(data)) {
          if (Array.isArray(data.posts))  data = data.posts;
          else if (Array.isArray(data.data))  data = data.data;
          else throw new Error('Unexpected response shape from server.');
        }

        const formatted = data.map((item) => {
          // Ensure media array exists
          const mediaArray = (item.mediaFiles && item.mediaFiles.length > 0) 
            ? item.mediaFiles 
            : [{ url: item.imageUrl || item.url || null, type: 'image' }];

          // Merge all tag arrays
          const mergedTags = [
            ...(item.categoryTags || []), 
            ...(item.styleTags || []), 
            ...(item.generalTags || [])
          ];

          // Determine category based on schema fields
          const firstMediaType = mediaArray[0]?.type || 'image';
          const hasPrice = item.price && item.price > 0;
          
          let category = 'artworks';
          if (item.forSale || hasPrice) {
            category = 'store';
          } else if (firstMediaType === 'video') {
            category = 'videos';
          }

          return {
            id:            item._id,
            category,      
            coverImage:    mediaArray[0]?.url,
            mediaFiles:    mediaArray,
            title:         item.title        || '',
            description:   item.description  || '',
            tags:          mergedTags,
            isVideo:       firstMediaType === 'video',
            price:         hasPrice ? `${item.currency || 'INR'} ${item.price}` : null,
            isAwardWinning: item.isAwardWinning || false,
            likesCount:    item.likesCount   || 0,
            viewsCount:    item.viewsCount   || 0,
            commentsCount: item.commentsCount|| 0,
            sharesCount:   item.sharesCount  || 0,
          };
        });

        setUploads(formatted);
      } catch (err) {
        console.error('fetchPosts failed:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); 

  const filtered = activeTab === 'all' 
    ? uploads 
    : uploads.filter((u) => u.category === activeTab);

  return (
    // Make sure the main wrapper doesn't force a maximum height that causes overflow
    <div className="lg:col-span-9 w-full min-h-0">

      {/* ── Tabs (Now horizontally scrollable on mobile) ── */}
      <div 
        className="flex items-center gap-1 border-b border-zinc-200 dark:border-zinc-800 mb-6 w-full overflow-x-auto whitespace-nowrap"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hides scrollbar on Firefox/IE
      >
        {/* Hide scrollbar on Chrome/Safari */}
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
        
        {TABS.map(({ id, label, icon: Icon }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`relative py-3 px-4 text-sm font-medium flex items-center gap-2 transition-colors duration-200 shrink-0 ${
                active ? 'text-zinc-900 dark:text-white' : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
              }`}
            >
              <Icon size={15} strokeWidth={active ? 2.2 : 1.8} />
              {label}
              
              {active && (
                <motion.span
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-900 dark:bg-white rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Loading / Error ── */}
      {loading && <div className="py-24 text-center text-zinc-400 text-sm">Loading…</div>}
      {!loading && error && <div className="py-24 text-center text-red-400 text-sm">{error}</div>}

      {/* ── Grid (Tweaked auto-rows for better responsiveness) ── */}
      {!loading && !error && (
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={activeTab}
              variants={gridVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="grid grid-cols-3 xl:grid-cols-4 gap-1.5 auto-rows-[140px] sm:auto-rows-[180px] lg:auto-rows-[210px] grid-flow-dense w-full"
            >
              {filtered.map((item, index) => (
                <motion.div
                  key={item.id}
                  layoutId={`card-${item.id}`}
                  variants={cardVariants}
                  onClick={() => setSelectedItem(item)}
                  className={`${getSpanClass(index)} relative overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-900 group cursor-pointer`}
                >
                  {/* Image */}
                  {item.coverImage ? (
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-300 dark:text-zinc-700">
                      <ImageIcon size={28} strokeWidth={1.4} />
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Title on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <p className="text-white text-xs font-medium leading-tight line-clamp-1 drop-shadow-sm">{item.title}</p>
                  </div>

                  {/* Multiple images indicator */}
                  {item.mediaFiles.length > 1 && (
                     <div className="absolute top-2.5 right-2.5 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-md text-[10px] font-bold">
                       1/{item.mediaFiles.length}
                     </div>
                  )}

                  {/* Video play icon */}
                  {item.isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-white/15 backdrop-blur-[2px] border border-white/20 p-3 rounded-full text-white opacity-80 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300">
                        <Play fill="currentColor" size={20} />
                      </div>
                    </div>
                  )}

                  {/* Price badge */}
                  {item.price && (
                    <div className="absolute top-2.5 left-2.5 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-[11px] font-semibold px-2.5 py-1 rounded-full border border-zinc-200 dark:border-zinc-700 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {item.price}
                    </div>
                  )}

                  {/* Award badge */}
                  {item.isAwardWinning && (
                    <div className="absolute top-2.5 right-2.5 bg-amber-400/90 text-amber-900 p-1.5 rounded-full shadow-sm">
                      <Award size={11} strokeWidth={2.5} />
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key={`empty-${activeTab}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 w-full text-zinc-300 dark:text-zinc-700 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-md"
            >
              {activeTab === 'all'      && <LayoutGrid  size={40} className="mb-3" />}
              {activeTab === 'artworks' && <ImageIcon   size={40} className="mb-3" />}
              {activeTab === 'videos'   && <Film        size={40} className="mb-3" />}
              {activeTab === 'store'    && <ShoppingBag size={40} className="mb-3" />}
              <p className="text-sm">No {activeTab === 'all' ? 'posts' : activeTab} published yet.</p>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {selectedItem && (
          <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}