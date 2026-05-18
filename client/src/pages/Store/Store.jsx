import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, ShoppingCart, X, ArrowRight, Menu, 
  Heart, Share2, Bookmark, Eye, Send, MoreVertical, ChevronLeft, ChevronRight, Trash2
} from 'lucide-react';
import { toast, Toaster } from 'sonner';
import Logo from '../../assets/Logo.jpeg';

// ─── Smooth Animation Styles ───────────────────────────────────────────────
const animationStyles = `
  @supports (animation: smooth) {
    * {
      scroll-behavior: smooth;
    }
  }
  
  .will-change-opacity {
    will-change: opacity;
  }
  
  .will-change-transform {
    will-change: transform;
  }

  /* GPU acceleration for smooth transitions */
  .hero-image-layer {
    transition: opacity 1000ms cubic-bezier(0.4, 0, 0.2, 1) !important;
  }

  /* Indicator button smooth transitions */
  .indicator-dot {
    transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1) !important;
  }

  /* Smooth hero content fade */
  .hero-content {
    animation: fadeIn 800ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0.95;
    }
    to {
      opacity: 1;
    }
  }
`;

export default function StorePage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedArt, setSelectedArt] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('painters-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart:', e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('painters-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (window.innerWidth >= 1024) setIsCartOpen(true);
  }, []);

  // Hero slides data
  const heroSlides = [
    {
      title: "Monochrome Mastery",
      description: "Explore the latest collection of exclusive black, white, and zinc artworks.",
      image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=1200&grayscale"
    },
    {
      title: "Charcoal Dreams",
      description: "Deep shadows and stark contrasts captured in timeless pieces.",
      image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=1200&grayscale"
    },
    {
      title: "Digital Elegance",
      description: "Where technology meets traditional artistry.",
      image: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&q=80&w=1200&grayscale"
    }
  ];

  const glassPanel = "bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200/70 dark:border-zinc-700/60 shadow-sm";

  const artworks = [
    { 
      id: 1, title: "Charcoal Study I", price: "₹4,500", size: "col-span-2 row-span-2", 
      image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=800&grayscale",
      artist: "Aarav K.", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop&q=60",
      medium: "Charcoal on Canvas", description: "An exploration of deep shadows and stark contrasts, created during a late-night studio session.",
      likes: 1240, views: 5400, tags: ["charcoal", "abstract", "monochrome"]
    },
    { 
      id: 2, title: "Zinc Abstract", price: "₹3,200", size: "col-span-1 row-span-1", 
      image: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&q=80&w=400&grayscale",
      artist: "Elena R.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
      medium: "Digital & Zinc Textures", description: "Fluid dynamics captured in purely metallic shades.",
      likes: 892, views: 3100, tags: ["digital", "zinc", "fluid"]
    },
    { 
      id: 3, title: "Graphite Dreams", price: "₹6,000", size: "col-span-1 row-span-2", 
      image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=400&grayscale",
      artist: "Marcus T.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
      medium: "Graphite Pencil", description: "Intricate line work detailing architectural impossibilities.",
      likes: 2100, views: 8900, tags: ["graphite", "architecture", "lines"]
    },
    { 
      id: 4, title: "Urban Silhouette", price: "₹2,800", size: "col-span-1 row-span-1", 
      image: "https://images.unsplash.com/photo-1511800453077-8c0afa94175f?auto=format&fit=crop&q=80&w=400&grayscale",
      artist: "Elena R.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
      medium: "Photography", description: "Cityscapes reduced to their rawest geometric forms.",
      likes: 530, views: 1200, tags: ["photo", "urban", "noir"]
    },
    { 
      id: 5, title: "Noir Portrait", price: "₹5,500", size: "col-span-2 lg:col-span-2 row-span-1", 
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800&grayscale",
      artist: "Aarav K.", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop&q=60",
      medium: "Oil & Ink", description: "A study of human expression shrouded in darkness.",
      likes: 3400, views: 12050, tags: ["portrait", "oil", "ink"]
    },
    { 
      id: 6, title: "Monochrome Minimal", price: "₹1,900", size: "col-span-1 lg:col-span-1 row-span-1", 
      image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=400&grayscale",
      artist: "Marcus T.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
      medium: "Mixed Media", description: "The essence of less is more.",
      likes: 420, views: 980, tags: ["minimal", "mixedmedia"]
    },
  ];

  // Add item to cart
  const addToCart = (art) => {
    const existingItem = cartItems.find(item => item.id === art.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === art.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
      toast.success("Quantity updated");
    } else {
      setCartItems([...cartItems, { ...art, quantity: 1 }]);
      toast.success("Added to cart");
    }
  };

  // Remove item from cart
  const removeFromCart = (artId) => {
    setCartItems(cartItems.filter(item => item.id !== artId));
    toast("Item removed from cart");
  };

  // Update quantity
  const updateQuantity = (artId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(artId);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === artId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  // Calculate total
  const total = cartItems.reduce((sum, item) => {
    const price = parseInt(item.price.replace('₹', '').replace(',', ''));
    return sum + (price * item.quantity);
  }, 0);

  // Navigate hero slider
  const nextSlide = () => setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans overflow-x-hidden transition-colors duration-300">
      <Toaster position="top-center" richColors theme="system"/>
      
      {/* Smooth Animation Styles */}
      <style>{animationStyles}</style>

      {/* Navigation Bar */}
      <nav className="fixed top-0 z-40 w-full backdrop-blur-xl bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800 px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          <Link to={'/'} className="flex items-center gap-3">
            <div className="w-8 h-8 bg-zinc-900 dark:bg-zinc-100 rounded-lg overflow-hidden flex items-center justify-center">
              <img src={Logo} alt="" />
            </div>
            <span className="font-extrabold text-lg tracking-tight hidden sm:block font-Eagle">
              Painters' Diary
            </span>
          </Link>
          
          <div className="flex items-center gap-4 md:gap-6">
            <button className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <Search size={20} strokeWidth={2} />
            </button>
            <button 
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors relative"
            >
              <ShoppingCart size={20} strokeWidth={2} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <div 
        className={`fixed inset-y-0 right-0 z-40 w-full sm:w-80 backdrop-blur-2xl bg-white/90 dark:bg-zinc-950/90 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col pt-16 md:pt-20 px-5 pb-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Your Cart</h2>
            <button onClick={() => setIsCartOpen(false)} className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
              <X size={20} />
            </button>
          </div>
          
          {cartItems.length === 0 ? (
            // Empty Cart State
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-4">
                <ShoppingCart size={32} className="text-zinc-400" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Your cart is empty</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">Add some artwork to get started</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="px-5 py-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg group">
                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <span className="text-sm font-semibold text-zinc-900 dark:text-white truncate block" style={{ fontFamily: "'Quicksand', sans-serif" }}>{item.title}</span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">{item.price}</span>
                      </div>
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-md bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center text-xs font-bold hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
                        >
                          −
                        </button>
                        <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-md bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center text-xs font-bold hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex-shrink-0 p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                      title="Remove from cart"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400">Subtotal</span>
                    <span className="font-semibold text-zinc-900 dark:text-white">₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400">Shipping</span>
                    <span className="font-semibold text-zinc-900 dark:text-white">₹200</span>
                  </div>
                  <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-2" />
                  <div className="flex justify-between">
                    <span className="font-bold text-zinc-900 dark:text-white">Total</span>
                    <span className="font-bold text-zinc-900 dark:text-white">₹{(total + 200).toLocaleString()}</span>
                  </div>
                </div>
                <button className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-3 rounded-lg text-sm font-bold shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2">
                  Checkout <ArrowRight size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <main className={`transition-all duration-300 ease-in-out ${isCartOpen ? 'lg:pr-80' : ''}`}>
        <div className="max-w-7xl mx-auto px-1 sm:px-6 py-6 mt-12">
          
          {/* Hero Slider Section */}
          <div className="relative h-48 md:h-64 w-full bg-zinc-900 rounded-lg mb-8 overflow-hidden flex items-center shadow-lg group">
            
            {/* Slider Images - Optimized with will-change */}
            {heroSlides.map((slide, idx) => (
              <div
                key={idx}
                className={`hero-image-layer absolute inset-0 will-change-opacity ${
                  idx === currentHeroSlide ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
              >
                <img 
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-40 dark:opacity-30 mix-blend-overlay"
                />
              </div>
            ))}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/95 to-transparent dark:from-zinc-950/95 pointer-events-none"></div>

            {/* Content with Smooth Fade */}
            <div className="relative z-10 px-4 sm:px-6 md:px-10 max-w-lg w-full">
              <div className="hero-content space-y-2 md:space-y-3 will-change-transform">
                <h1 
                  className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight" 
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                  key={`title-${currentHeroSlide}`}
                >
                  {heroSlides[currentHeroSlide].title}
                </h1>
                <p 
                  className="text-zinc-300 text-xs sm:text-sm md:text-base font-medium leading-relaxed" 
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  key={`desc-${currentHeroSlide}`}
                >
                  {heroSlides[currentHeroSlide].description}
                </p>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="p-1 rounded-full bg-white/20 hover:bg-white/40 active:scale-95 text-white backdrop-blur-md transition-all duration-200"
                aria-label="Previous slide"
              >
                <ChevronLeft size={18} strokeWidth={2.5} />
              </button>
              <button
                onClick={nextSlide}
                className="p-1 rounded-full bg-white/20 hover:bg-white/40 active:scale-95 text-white backdrop-blur-md transition-all duration-200"
                aria-label="Next slide"
              >
                <ChevronRight size={18} strokeWidth={2.5} />
              </button>
            </div>

            {/* Slide Indicators - Mobile Visible */}
            <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-6 z-30 flex items-center gap-1.5">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentHeroSlide(idx)}
                  className={`indicator-dot rounded-full will-change-transform ${
                    idx === currentHeroSlide
                      ? 'bg-white h-1.5 w-6 md:w-7'
                      : 'bg-white/50 h-1.5 w-1.5 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-current={idx === currentHeroSlide}
                />
              ))}
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 auto-rows-[180px] md:auto-rows-[240px]">
            {artworks.map((art) => (
              <div key={art.id} className={`flex flex-col gap-2.5 ${art.size}`}>
                
                {/* Image Block */}
                <div 
                  onClick={() => setSelectedArt(art)}
                  className="group relative flex-1 w-full bg-zinc-100 dark:bg-zinc-900 rounded-md overflow-hidden cursor-pointer border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
                >
                  <img 
                    src={art.image} 
                    alt={art.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-300"></div>
                  
                  {/* Artist Info */}
                  <div className={`absolute top-2.5 left-2.5 z-10 px-2 py-1.5 rounded-md flex items-center gap-2 ${glassPanel}`}>
                    <img src={art.avatar} className="w-5 h-5 rounded-full object-cover border border-zinc-200 dark:border-zinc-600" alt={art.artist} />
                    <span className="text-[11px] font-bold tracking-tight text-zinc-900 dark:text-zinc-100 pr-1" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                      {art.artist}
                    </span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="flex justify-between items-start px-1">
                  <div className="min-w-0 pr-3">
                    <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-[13px] md:text-sm truncate leading-tight" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                      {art.title}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-[11px] md:text-xs font-semibold mt-0.5">
                      {art.price}
                    </p>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); addToCart(art); }}
                    className="w-8 h-8 shrink-0 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:scale-105 active:scale-95 rounded-md flex items-center justify-center transition-transform shadow-sm"
                  >
                    <ShoppingCart size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      {/* Lightbox Modal */}
      {selectedArt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          <div 
            className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedArt(null)}
          ></div>
          
          <div className="relative z-10 w-full max-w-5xl bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row h-[90vh] md:h-[80vh] max-h-[850px]">
            
            <button 
              onClick={() => setSelectedArt(null)}
              className="md:hidden absolute top-3 right-3 z-50 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Left: Image Viewer */}
            <div className="relative w-full md:w-3/5 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 h-[45%] md:h-full overflow-hidden">
              <img 
                src={selectedArt.image} 
                alt={selectedArt.title} 
                className="w-full h-full object-cover md:object-contain" 
              />
            </div>

            {/* Right: Details */}
            <div className="w-full md:w-2/5 flex flex-col bg-white dark:bg-zinc-950 h-[55%] md:h-full">
              
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-zinc-100 dark:border-zinc-800/60 shrink-0">
                <div className="flex items-center gap-3">
                  <img src={selectedArt.avatar} alt={selectedArt.artist} className="w-9 h-9 rounded-full object-cover border border-zinc-200 dark:border-zinc-700" />
                  <div className="flex flex-col leading-tight">
                    <span className="text-[13.5px] font-bold text-zinc-900 dark:text-zinc-100" style={{ fontFamily: "'Quicksand', sans-serif" }}>{selectedArt.artist}</span>
                    <span className="text-[11px] italic text-zinc-500 font-Playfair">{selectedArt.medium}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="text-[12.5px] font-bold text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors" style={{ fontFamily: "'Quicksand', sans-serif" }}>Follow</button>
                  <span className="w-px h-3 bg-zinc-200 dark:bg-zinc-700" />
                  <button onClick={() => setSelectedArt(null)} className="hidden md:flex text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                    <X size={20} strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-5 no-scrollbar">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-snug tracking-tight" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                      {selectedArt.title}
                    </h2>
                    <p className="text-lg font-bold text-zinc-500 dark:text-zinc-400 mt-0.5">{selectedArt.price}</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button className="flex items-center gap-1.5 p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors group">
                      <Heart size={18} strokeWidth={1.5} className="text-zinc-400 group-hover:text-[#b06060]" />
                    </button>
                    <button className="p-2 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 dark:hover:text-white dark:hover:bg-zinc-900 transition-colors">
                      <Share2 size={18} strokeWidth={1.5} />
                    </button>
                    <button className="p-2 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 dark:hover:text-white dark:hover:bg-zinc-900 transition-colors">
                      <Bookmark size={18} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 text-[13.5px] leading-relaxed mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {selectedArt.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex flex-wrap gap-1.5">
                    {selectedArt.tags.map((tag) => (
                      <span key={tag} className="text-zinc-400 dark:text-zinc-500 text-[11px] font-bold tracking-wide" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <Eye size={14} strokeWidth={1.5} />
                    <span className="text-xs font-bold" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                      {selectedArt.views.toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider" style={{ fontFamily: "'Quicksand', sans-serif" }}>Comments</span>
                  <div className="flex-1 h-px bg-zinc-100 dark:bg-zinc-800/60"></div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60" className="w-7 h-7 rounded-full object-cover" alt="User" />
                    <div>
                      <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mr-2" style={{ fontFamily: "'Quicksand', sans-serif" }}>Sarah L.</span>
                      <span className="text-xs text-zinc-500" style={{ fontFamily: "'Playfair Display', serif" }}>The textures here are absolutely incredible.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-zinc-100 dark:border-zinc-800/60 shrink-0 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2.5 bg-zinc-50 dark:bg-zinc-900/50 px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60" className="w-6 h-6 rounded-full object-cover" alt="You" />
                    <input
                      type="text"
                      placeholder="Leave a quiet thought…"
                      className="flex-1 bg-transparent border-none outline-none text-[13px] italic text-zinc-600 dark:text-zinc-300 placeholder:text-zinc-400"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    />
                    <button className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                      <Send size={14} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => { addToCart(selectedArt); setSelectedArt(null); }}
                    className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-3 rounded-lg text-sm font-bold shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    Add to Cart <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}