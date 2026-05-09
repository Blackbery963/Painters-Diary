import React, { useState, useEffect, useRef } from "react";
import {
  Search, X, Clock, Cloud, Calendar,
  Sparkles, Palette, BookOpen, ShoppingBag, 
  Video, Play, MapPin, ArrowUpRight, Users,
  FileText, Layers, Image as ImageIcon,
  Album,
  SquarePlay,
  Blocks
} from "lucide-react";
import { Link } from "react-router-dom";

// --- CONFIG ---
const SUGGESTIONS = ["Oil Painting", "Abstract", "Sketching", "Digital Art", "Photography", "Sculpture"];

// --- UPDATED CATEGORIES ---
const CATEGORIES = [
  { id: "all", label: "All", icon: Sparkles },
  { id: "Arts", label: "Arts", icon: Palette },
  {id: "Diary" , label: "Diary", icon: Album}, // Personal Stories
  { id: "Communities", label: "Communities", icon: Users },
  { id: "Shop", label: "Shop", icon: ShoppingBag },
  { id: "Resources", label: "Resources", icon: Blocks }, // Articles, Guides, Papers
];

// --- MOCK DATA ---
const MOCK_DATA = [
  {
    id: 'w1', type: "weather", 
    city: "Kolkata", temp: "28°", condition: "Haze",
    span: "col-span-1 row-span-1"
  },
  {
    id: 1, type: "image", category: "Arts", title: "Silent Portraits", author: "Elena R.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
    span: "col-span-1 row-span-2" 
  },
  {
    id: 'h1', type: "history", 
    year: "1889", event: "Van Gogh paints Starry Night.",
    span: "col-span-1 row-span-1"
  },
  {
    id: 5, type: "resource", subType: "Guide", category: "Resources", title: "Oil Mastery: Step by Step", author: "ArtDaily",
    image: "https://images.unsplash.com/photo-1599818676574-d4f82637293e?w=600",
    span: "col-span-2 row-span-2" 
  },
  {
    id: 2, type: "image", category: "Moments", title: "Studio Morning", author: "Sarah J.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600",
    span: "col-span-1 row-span-1"
  },
  {
    id: 8, type: "resource", subType: "Paper", category: "Resources", title: "Color Theory Research", author: "Uni of Arts",
    image: "https://images.unsplash.com/photo-1507697364665-69eec30ea71e?w=600",
    span: "col-span-1 row-span-1"
  },
  {
    id: 3, type: "image", category: "Shop", title: "Matte Acrylics", author: "Supply Co.",
    image: "https://images.unsplash.com/photo-1586075010999-9bc9e4c17613?w=600",
    span: "col-span-1 row-span-1"
  },
  {
    id: 4, type: "image", category: "Arts", title: "Abstract Blue", author: "Mia T.",
    image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&q=80",
    span: "col-span-1 row-span-1"
  },
  {
    id: 9, type: "image", category: "Communities", title: "Urban Sketchers", author: "24k Members",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600",
    span: "col-span-1 row-span-1"
  },
];

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isFocused, setIsFocused] = useState(false);
  const [history, setHistory] = useState(["Watercolor", "Digital"]);
  
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current && !inputRef.current.contains(event.target) &&
        dropdownRef.current && !dropdownRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredData = MOCK_DATA.filter((item) => {
    if (activeCategory !== "all") {
       if (item.type === 'weather' || item.type === 'history') return true; 
       if (item.category !== activeCategory) return false;
    }
    if (query) return (item.title || "").toLowerCase().includes(query.toLowerCase());
    return true;
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-rose-500 selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <div className="relative w-full h-[380px] flex flex-col items-center justify-center px-4">
        
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/3109168/pexels-photo-3109168.jpeg" 
            alt="Artistic Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 dark:from-zinc-950 to-transparent" />
        </div>

        {/* Top Navigation */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
            <Link to="/" className="text-xl font-bold tracking-tight text-white drop-shadow-md font-Eagle">
              Painters' Diary
            </Link>
            <Link to="/account">
               <div className="w-9 h-9 rounded-full border-2 border-white/30 overflow-hidden hover:border-white transition-colors">
                 <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200" className="w-full h-full object-cover" />
               </div>
            </Link>
        </div>

        {/* Search Container */}
        <div className="relative z-10 w-full max-w-lg space-y-3">
            <div className="text-center mb-6">
               <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg tracking-tight">
                 Explore the Canvas
               </h1>
            </div>

            <div className="relative">
              <div className={`
                  flex items-center w-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur rounded-xl shadow-xl px-4 py-3.5
                  transition-all duration-300 transform 
                  ${isFocused ? 'scale-105 ring-4 ring-white/20' : 'hover:scale-[1.01]'}
                `}
              >
                <Search size={18} className="text-zinc-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onFocus={() => setIsFocused(true)}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search masterpieces, stories, tools..."
                  className="flex-1 bg-transparent px-3 outline-none text-sm font-medium text-zinc-900 dark:text-white placeholder:text-zinc-400"
                />
                {query && <button onClick={() => setQuery("")}><X size={16} className="text-zinc-400" /></button>}
              </div>

              {/* DROPDOWN */}
              {isFocused && (
                <div ref={dropdownRef} className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-zinc-900 rounded-xl shadow-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden z-50 py-1 animation-fade-in-up">
                  <div className="px-2 py-2">
                    <p className="px-2 pb-2 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Trending</p>
                    <div className="flex flex-wrap gap-2 px-2">
                      {SUGGESTIONS.map(s => (
                        <button key={s} onClick={() => {setQuery(s); setIsFocused(false)}} className="text-xs px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-zinc-700 dark:text-zinc-300">
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  {history.length > 0 && (
                    <div className="border-t border-zinc-100 dark:border-zinc-800 mt-1">
                      {history.map((term, i) => (
                        <div key={i} onClick={() => {setQuery(term); setIsFocused(false)}} className="flex items-center justify-between px-4 py-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer group">
                           <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400 text-sm">
                             <Clock size={14} />
                             <span>{term}</span>
                           </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-2 md:px-4 pb-20 -mt-6 relative z-0">
        
        {/* Category Pills */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur rounded-xl border border-white/20 dark:border-zinc-800 shadow-sm hide-scrollbar">
             {CATEGORIES.map((cat) => (
               <button
                 key={cat.id}
                 onClick={() => setActiveCategory(cat.id)}
                 className={`
                   flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap
                   ${activeCategory === cat.id 
                     ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-sm" 
                     : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"}
                 `}
               >
                 <cat.icon size={12} />
                 {cat.label}
               </button>
             ))}
          </div>
        </div>

        {/* --- TALLER BENTO GRID (200px rows) --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-2 grid-flow-dense">
          
          {filteredData.map((item) => {
             
             // --- WIDGET: WEATHER ---
             if (item.type === "weather") {
                return (
                  <div key={item.id} className={`${item.span} bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-100 dark:border-zinc-800 flex flex-col justify-between`}>
                      <div className="flex justify-between items-start">
                         <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md text-blue-500">
                           <Cloud size={16} />
                         </div>
                         <span className="text-[10px] font-bold text-zinc-400">NOW</span>
                      </div>
                      <div>
                         <div className="text-3xl font-bold text-zinc-900 dark:text-white">{item.temp}</div>
                         <div className="text-[10px] text-zinc-500 font-medium flex items-center gap-1 mt-1">
                           <MapPin size={10} /> {item.city}
                         </div>
                      </div>
                  </div>
                );
             }

             // --- WIDGET: HISTORY ---
             if (item.type === "history") {
                return (
                  <div key={item.id} className={`${item.span} bg-amber-50 dark:bg-amber-950/20 rounded-xl p-5 border border-amber-100 dark:border-amber-900/30 flex flex-col justify-between`}>
                      <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-500">
                         <Calendar size={14} />
                         <span className="text-[10px] font-bold uppercase">Today</span>
                      </div>
                      <div>
                         <div className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-2">{item.year}</div>
                         <p className="text-[11px] text-amber-800 dark:text-amber-200 leading-snug line-clamp-3 opacity-80">
                           {item.event}
                         </p>
                      </div>
                  </div>
                );
             }

             // --- MEDIA CARDS ---
             const isResource = item.category === "Resources";
             
             return (
               <div 
                 key={item.id} 
                 className={`${item.span} relative group rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 cursor-pointer`}
               >
                 <img 
                   src={item.image} 
                   alt={item.title} 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                 />

                 {/* Resource Type Tag */}
                 {isResource && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 backdrop-blur rounded-md flex items-center gap-1.5 border border-white/10">
                      {item.subType === "Guide" ? <BookOpen size={10} className="text-white"/> : <FileText size={10} className="text-white"/>}
                      <span className="text-[9px] font-bold text-white uppercase tracking-wide">{item.subType}</span>
                    </div>
                 )}

                 {/* --- DESKTOP OVERLAY: BOTTOM LEFT + ICON BUTTON --- */}
                 <div className="absolute inset-0 bg-black/60 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300">
                      
                      <div className="flex items-end justify-between">
                        {/* Text Metadata */}
                        <div>
                          <p className="text-[10px] font-bold text-white/70 uppercase tracking-wider mb-1">{item.category}</p>
                          <h3 className="text-white font-bold text-sm leading-tight mb-1">{item.title}</h3>
                          <p className="text-zinc-300 text-xs">{item.author}</p>
                        </div>

                        {/* Icon Button */}
                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-colors text-white">
                          <ArrowUpRight size={14} />
                        </div>
                      </div>

                    </div>
                 </div>
                 
                 {/* --- MOBILE OVERLAY (Static Gradient) --- */}
                 <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/20 to-transparent md:hidden pointer-events-none" />
                 <div className="absolute bottom-3 left-3 right-3 md:hidden pointer-events-none flex justify-between items-end">
                     <div>
                       <span className="text-[9px] font-bold uppercase text-white/70 tracking-wider mb-1 block">{item.category}</span>
                       <h3 className="text-xs font-bold text-white leading-tight">{item.title}</h3>
                     </div>
                     <ArrowUpRight size={14} className="text-white/80" />
                 </div>

               </div>
             );
          })}
        </div>

      </main>
    </div>
  );
};

export default SearchPage;