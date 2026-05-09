import React, { useState, useEffect } from 'react';
import { 
  Search, Plus, Map, Edit3, Compass, Book, ChevronRight, Menu,
  ArrowUpRight, X, ChevronDown, Sparkles, MapPin, Calendar, LayoutGrid,
  TextAlignStart, MapPinned, Bookmark, Heart, Share2, Image, Loader2,
  LibraryBig, ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo.jpeg'; 
import { getUserDiaries } from '../../service/diary.service';
import { toast, Toaster } from 'sonner';

const JournalPage = () => {
  const [diaries, setDiaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState('all'); 
  const [activeTab, setActiveTab] = useState('explore'); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // NEW: Track if a specific entry was clicked from the sidebar
  const [selectedSidebarId, setSelectedSidebarId] = useState(null);

  // Lightbox States
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [isLightboxVisible, setIsLightboxVisible] = useState(false);

  // Fetch from Backend
  useEffect(() => {
    const fetchDiaries = async () => {
     try {
      setIsLoading(true); 
      const res = await getUserDiaries();
      const diaryData = res.diaries || res || [];
      setDiaries(diaryData);
     } catch (error) {
      console.error("Failed to load diaries", error);
      toast.error("Failed to load diaries. Please try again later");
     } finally {
      setIsLoading(false);
     }
    };
    fetchDiaries();
  }, []);

  // UPDATED: Filter the REAL backend data
  const currentCards = diaries.filter(diary => {
    // 1. If a specific sidebar entry is clicked, show ONLY that card
    if (selectedSidebarId) {
      return diary._id === selectedSidebarId;
    }

    // 2. Otherwise, use standard category filtering
    if (category === 'all') return true;
    if (category === 'travel') return diary.diaryType === 'Travel_Log';
    if (category === 'creative') return diary.diaryType === 'Creative_Blog';
    return true;
  });

  const myEntryTitles = diaries.slice(0, 5); // Just show the 5 most recent

  const handleCardClick = (card) => {
    setSelectedEntry(card);
    setActiveImage(card.sketches && card.sketches.length > 0 ? card.sketches[0] : '');
    setIsLightboxVisible(true);
    document.body.style.overflow = 'hidden'; 
  };

  const closeLightbox = () => {
    setIsLightboxVisible(false);
    setTimeout(() => setSelectedEntry(null), 300); 
    document.body.style.overflow = 'auto'; 
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white dark:bg-black">
        <Loader2 className="animate-spin text-zinc-400" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300 font-sans selection:bg-zinc-300 dark:selection:bg-zinc-700 flex flex-col">
      <Toaster position='top-center' richColors theme='system'/>
      {/* --- HEADER --- */}
      <header className="sticky top-0 z-40 max-w-7xl mx-auto w-full bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl border-b border-zinc-200/60 dark:border-zinc-800/60">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-1.5 -ml-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-300"
              >
                <TextAlignStart className="h-5 w-5" />
              </button>

              <Link to={'/'} className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg overflow-hidden bg-zinc-900 dark:bg-white flex items-center justify-center shadow-sm hidden sm:block">
                  <img src={Logo} alt="Logo" className="w-full h-full object-cover" />
                </div>
                <h1 className="text-lg font-semibold tracking-tight font-Eagle">
                  Painters' Diary
                </h1>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400 h-3.5 w-3.5" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-56 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50 py-1.5 pl-8 pr-3 text-xs outline-none focus:border-zinc-300 dark:focus:border-zinc-700 transition-all placeholder:text-zinc-400"
                />
              </div>

              <Link to={'/journal/create'} className="flex items-center gap-1.5 rounded-md bg-zinc-900 dark:bg-zinc-100 px-3 py-1.5 text-xs font-medium text-white dark:text-zinc-900 hover:opacity-90 transition-opacity shadow-sm">
                <Plus className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Create</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* --- MAIN LAYOUT --- */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto relative overflow-hidden">
        
        {/* --- MOBILE OVERLAY --- */}
        <div 
          className={`lg:hidden fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* --- GLASSY SIDEBAR --- */}
        <aside className={`
          fixed lg:sticky top-14 z-50 lg:z-0
          w-64 h-[calc(100vh-56px)] shrink-0
          border-r border-zinc-200/60 dark:border-zinc-800/60 
          bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl
          transform transition-transform duration-300 ease-in-out
          lg:transform-none lg:translate-x-0 shadow-2xl lg:shadow-none
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          flex flex-col
        `}>
          <div className="flex items-center justify-between p-4 lg:hidden border-b border-zinc-200/60 dark:border-zinc-800/60">
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Navigation</span>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 rounded-full bg-zinc-200/50 hover:bg-zinc-300/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-700/50 text-zinc-600 dark:text-zinc-300 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-4 overflow-y-auto flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <nav className="space-y-1 lg:mt-2">
              <button 
                onClick={() => {
                  setActiveTab('explore');
                  setSelectedSidebarId(null); // Reset single entry view
                  setCategory('all');
                  setIsMobileMenuOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'explore' 
                    ? 'bg-zinc-200/60 dark:bg-zinc-800/60 text-zinc-900 dark:text-white' 
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50'
                }`}>
                <Compass className="h-4 w-4" />
                Explore Diaries
              </button>

              <div>
                <button 
                  onClick={() => setActiveTab(activeTab === 'my-entries' ? 'explore' : 'my-entries')}
                  className={`flex w-full items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'my-entries' 
                      ? 'bg-zinc-200/60 dark:bg-zinc-800/60 text-zinc-900 dark:text-white' 
                      : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <LibraryBig className="h-4 w-4" />
                    My Entries
                  </div>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${activeTab === 'my-entries' ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`
                  mt-1 ml-3.5 space-y-0.5 border-l border-zinc-300 dark:border-zinc-700
                  transition-all duration-300 overflow-hidden
                  ${activeTab === 'my-entries' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                `}>
                  
                  {/* UPDATED: Sidebar buttons now filter the feed to show just this card */}
                  {myEntryTitles.map((entry) => (
                    <button 
                      key={entry._id} 
                      onClick={() => {
                        setSelectedSidebarId(entry._id); // Sets the feed to show ONLY this card
                        setIsMobileMenuOpen(false); // Close menu on mobile
                      }}
                      className={`flex w-full items-center justify-between pl-4 pr-2 py-1.5 rounded-md text-xs font-medium transition-colors group ${
                        selectedSidebarId === entry._id
                          ? 'bg-zinc-200/50 dark:bg-zinc-800/50 text-zinc-900 dark:text-white'
                          : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                      }`}
                    >
                      <span className="truncate w-full text-left">{entry.title}</span>
                      <LibraryBig className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => {
                  setActiveTab('saved');
                  setSelectedSidebarId(null);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 px-3 py-2 mt-1 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'saved' 
                    ? 'bg-zinc-200/60 dark:bg-zinc-800/60 text-zinc-900 dark:text-white' 
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50'
                }`}
              >
                <Bookmark className="h-4 w-4" />
                Saved Entries
              </button>
            </nav>
          </div>
        </aside>

        {/* --- MAIN CONTENT FEED --- */}
        <main className="flex-1 min-w-0 mx-auto flex flex-col items-center py-4 sm:py-10 h-[calc(100vh-56px)] max-w-4xl overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          <div className="w-full max-w-2xl px-1 mb-8 flex flex-col items-center relative">
            
            {/* Show a "Clear" button if a specific entry is being viewed */}
            {selectedSidebarId && (
               <button 
                 onClick={() => setSelectedSidebarId(null)}
                 className="absolute left-0 top-1.5 flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors bg-zinc-100 dark:bg-zinc-900 px-3 py-1.5 rounded-full"
               >
                 <ArrowLeft size={12} /> Back to all
               </button>
            )}

            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-zinc-900 dark:text-zinc-100 mb-6">
              {selectedSidebarId ? 'Viewing Entry' : 'Latest Field Notes'}
            </h2>

            {/* Category Pills (These also reset the specific entry view) */}
            {!selectedSidebarId && (
              <div className="inline-flex rounded-lg bg-zinc-200/50 dark:bg-zinc-800/50 p-1">
                <button 
                  onClick={() => { setCategory('all'); setSelectedSidebarId(null); }}
                  className={`flex items-center gap-1.5 rounded-md px-4 py-1.5 text-xs font-semibold transition-all ${
                    category === 'all' 
                      ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm' 
                      : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" /> All
                </button>
                <button 
                  onClick={() => { setCategory('travel'); setSelectedSidebarId(null); }}
                  className={`flex items-center gap-1.5 rounded-md px-4 py-1.5 text-xs font-semibold transition-all ${
                    category === 'travel' 
                      ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm' 
                      : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                  }`}
                >
                  <MapPinned className="h-3.5 w-3.5" /> Travel Log
                </button>
                <button 
                  onClick={() => { setCategory('creative'); setSelectedSidebarId(null); }}
                  className={`flex items-center gap-1.5 rounded-md px-4 py-1.5 text-xs font-semibold transition-all ${
                    category === 'creative' 
                      ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm' 
                      : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                  }`}
                >
                  <Image className="h-3.5 w-3.5" /> Creative Blog
                </button>
              </div>
            )}
          </div>

          <div className="w-full px-4 pb-12 flex flex-col items-center gap-6 sm:gap-10">
            {currentCards.map((card) => {
              const isCreative = card.diaryType === 'Creative_Blog';
              const isTravel = card.diaryType === 'Travel_Log';
              const mainImage = card.sketches && card.sketches.length > 0 ? card.sketches[0] : '';
              const dateString = new Date(card.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

              return (
                <article 
                  key={card._id} 
                  onClick={() => handleCardClick(card)}
                  className="group relative overflow-hidden w-full max-w-[420px] h-[520px] sm:h-[600px] rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  {mainImage && (
                    <img src={mainImage} alt={card.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-t ${isCreative ? 'from-zinc-900 via-zinc-900/40 to-transparent' : 'from-zinc-950 via-zinc-900/50 to-transparent'} z-10`} />

                  <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
                    
                    {isCreative && (
                      <>
                        <div className="absolute top-5 right-5 px-3 py-1.5 rounded bg-white/10 backdrop-blur-md border border-white/10 text-[9px] font-semibold text-white tracking-wider uppercase">
                          {card.vibe || 'Reflection'}
                        </div>
                        
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                          <div className="flex items-center gap-1.5 text-zinc-300/90 text-xs tracking-wider mb-3">
                            <Calendar className="h-3.5 w-3.5"/> {dateString}
                          </div>
                          
                          <h3 className="text-2xl sm:text-3xl font-serif text-amber-50/90 leading-tight mb-3 group-hover:text-white transition-colors">
                            {card.title}
                          </h3>

                          <p className="text-sm text-zinc-300/80 font-light leading-relaxed mb-6 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                            {card.description}
                          </p>
                          
                          <div className="flex items-center gap-1.5 text-white/90 text-sm font-medium group-hover:gap-2 transition-all">
                            Open Entry
                            <ArrowUpRight className="h-4 w-4" />
                          </div>
                        </div>
                      </>
                    )}

                    {isTravel && (
                      <>
                        <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded bg-black/40 backdrop-blur-md border border-white/10 text-xs font-medium text-white">
                          <MapPin className="h-3.5 w-3.5 text-amber-500" /> {card.location || 'Unknown Location'}
                        </div>

                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                          <div className="w-8 h-0.5 bg-amber-500 rounded-full mb-4"></div>
                          
                          <h3 className="text-xl sm:text-2xl font-bold text-white font-sans leading-tight mb-2">
                            {card.title}
                          </h3>

                          <p className="text-sm text-zinc-200/90 font-medium leading-relaxed mb-4 line-clamp-2">
                            {card.description}
                          </p>
                          
                          <div className="flex items-center justify-between mt-6">
                            <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
                              <Calendar className="h-3.5 w-3.5"/> {dateString}
                            </div>
                            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/20">
                               <ChevronRight className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {currentCards.length === 0 && (
            <div className="text-center py-24">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-200/50 dark:bg-zinc-800/50 mb-4">
                <Sparkles className="h-6 w-6 text-zinc-400" />
              </div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">No entries found</h3>
              <p className="text-sm text-zinc-500 mt-1">Start writing your first log in this category.</p>
            </div>
          )}
        </main>
      </div>

      {/* --- LIGHTBOX MODAL --- */}
      {selectedEntry && (
        <div className={`fixed inset-0 z-[100] flex flex-col lg:flex-row bg-zinc-950/95 backdrop-blur-xl transition-opacity duration-300 ${isLightboxVisible ? 'opacity-100' : 'opacity-0'}`}>
          
          <button 
            onClick={closeLightbox}
            className="absolute top-4 left-4 lg:left-auto lg:right-6 lg:top-6 z-[110] p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md border border-white/10"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex-1 flex flex-col relative h-[50vh] lg:h-screen pt-16 pb-4 lg:pt-6 lg:pb-8 px-4 lg:px-12">
            
            <div className="flex-1 w-full flex items-center justify-center min-h-0 mb-4 lg:mb-8">
              {activeImage && (
                <img 
                  src={activeImage} 
                  alt="Enlarged view" 
                  className="max-h-full max-w-full object-contain rounded-lg shadow-2xl transition-opacity duration-300"
                />
              )}
            </div>

            <div className="shrink-0 flex items-center justify-center gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {selectedEntry.sketches && selectedEntry.sketches.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative shrink-0 h-16 w-16 lg:h-20 lg:w-20 rounded-md overflow-hidden transition-all duration-200 border-2 ${activeImage === img ? 'border-amber-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className={`
            w-full lg:w-[420px] bg-white dark:bg-zinc-950 border-t lg:border-t-0 lg:border-l border-zinc-200 dark:border-zinc-800/60 
            h-[50vh] lg:h-screen overflow-y-auto transform transition-transform duration-500 ease-out
            rounded-t-3xl lg:rounded-none shadow-[-10px_0_30px_rgba(0,0,0,0.5)]
            ${isLightboxVisible ? 'translate-y-0 lg:translate-x-0' : 'translate-y-full lg:translate-y-0 lg:translate-x-full'}
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
          `}>
            
            <div className="w-full flex justify-center py-3 lg:hidden">
              <div className="w-12 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-800"></div>
            </div>

            <div className="p-6 lg:p-10 lg:pt-20 flex flex-col h-full">
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                <span className="text-zinc-500 dark:text-zinc-400 text-xs font-medium uppercase tracking-widest">
                  {selectedEntry.diaryType === 'Travel_Log' ? 'Travel Log' : 'Creative Blog'}
                </span>
                <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
              </div>

              {selectedEntry.diaryType === 'Travel_Log' && selectedEntry.location && (
                <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-500 text-xs font-medium mb-4">
                  <MapPin className="h-3.5 w-3.5" /> {selectedEntry.location}
                </div>
              )}

              <h2 className="text-2xl lg:text-3xl font-serif text-zinc-900 dark:text-zinc-100 leading-tight mb-2">
                {selectedEntry.title}
              </h2>
              <hr className="border-zinc-100 dark:border-zinc-800/60 w-full mt-4 mb-2" />

              <div>
                <p className="text-sm font-normal font-Quicksand text-zinc-900 dark:text-zinc-100 mb-2">
                  {selectedEntry.author?.username || selectedEntry.author?.name || selectedEntry.author || "Unknown Artist"}
                </p>
              </div>

              <hr className="border-zinc-100 dark:border-zinc-800/60 w-full mb-4" />

              <div className="text-zinc-700 dark:text-zinc-300 text-sm leading-loose flex-1 font-light whitespace-pre-wrap">
                <p>{selectedEntry.description}</p>

                <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 pt-4 text-xs font-medium">
                  <Calendar className="h-3.5 w-3.5" /> 
                  {new Date(selectedEntry.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                <hr className="border-zinc-100 dark:border-zinc-800/60 w-full mt-6 mb-4" />

                <div className="flex items-center gap-3 mb-4">
                  <button className="flex items-center justify-center p-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors">
                    <Heart className="h-4 w-4" />
                  </button>
                  <button className="flex items-center justify-center p-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors">
                    <Bookmark className="h-4 w-4" />
                  </button>
                  <button className="flex items-center justify-center p-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default JournalPage;