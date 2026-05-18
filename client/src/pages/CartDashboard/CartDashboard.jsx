import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Bell, Trash2, ArrowLeft, 
  MessageSquare, Send, ShieldCheck, Info, User
} from 'lucide-react';
import { toast, Toaster } from 'sonner';

export default function MultiArtistInquiryPage() {
  // Mock Cart Data - Notice two items are from Aarav, one from Elena
  const [cartItems, setCartItems] = useState([
    { 
      id: 1, title: "Charcoal Study I", artist: "Aarav K.", price: 4500, 
      image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=200&grayscale" 
    },
    { 
      id: 2, title: "Noir Portrait", artist: "Aarav K.", price: 5500, 
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=200&grayscale" 
    },
    { 
      id: 3, title: "Zinc Abstract", artist: "Elena R.", price: 3200, 
      image: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&q=80&w=200&grayscale" 
    }
  ]);

  // Form State
  const [buyerInfo, setBuyerInfo] = useState({ name: '', email: '', phone: '' });
  const [artistMessages, setArtistMessages] = useState({}); // Stores messages per artist
  const [isProcessing, setIsProcessing] = useState(false);

  // Group cart items by Artist
  const groupedCart = cartItems.reduce((acc, item) => {
    if (!acc[item.artist]) {
      acc[item.artist] = [];
    }
    acc[item.artist].push(item);
    return acc;
  }, {});

  const estimatedTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleRemove = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast.success("Item removed");
  };

  const handleMessageChange = (artist, text) => {
    setArtistMessages(prev => ({ ...prev, [artist]: text }));
  };

  const handleSendRequest = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return toast.error("Your cart is empty!");
    
    setIsProcessing(true);
    // Simulate API routing messages to different artists
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Requests sent! The artists will contact you shortly.");
      setCartItems([]);
      setBuyerInfo({ name: '', email: '', phone: '' });
      setArtistMessages({});
    }, 1500);
  };

  const cardStyle = "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm p-6";
  const inputStyle = "w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-zinc-900 dark:focus:border-white transition-colors";

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans transition-colors duration-300 pb-12">
      <Toaster position="top-center" richColors theme="system" />

      {/* Navbar */}
      <nav className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800 px-4 md:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-zinc-900 dark:bg-zinc-100 rounded-lg flex items-center justify-center">
            <span className="text-white dark:text-zinc-900 font-bold text-lg">P</span>
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:block" style={{ fontFamily: "'Quicksand', sans-serif" }}>
            Painters' Diary
          </span>
        </Link>
        
        <div className="flex items-center gap-4">
          <button className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"><Search size={20} /></button>
          <button className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"><Bell size={20} /></button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-4">
            <ArrowLeft size={16} /> Back to Gallery
          </Link>
          <h1 className="text-3xl font-black" style={{ fontFamily: "'Quicksand', sans-serif" }}>Review & Request</h1>
          <p className="text-zinc-500 text-sm mt-2 font-medium">Message the producers directly to arrange payment and delivery details.</p>
        </div>

        <form onSubmit={handleSendRequest} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ══ LEFT COLUMN (Buyer Info & Grouped Artists) ══ */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Buyer Contact Info */}
            <div className={cardStyle}>
              <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "'Quicksand', sans-serif" }}>Your Contact Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-zinc-500 mb-1.5">Full Name</label>
                  <input type="text" required placeholder="e.g. Sarah Jenkins" value={buyerInfo.name} onChange={e => setBuyerInfo({...buyerInfo, name: e.target.value})} className={inputStyle} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-1.5">Email Address</label>
                  <input type="email" required placeholder="sarah@example.com" value={buyerInfo.email} onChange={e => setBuyerInfo({...buyerInfo, email: e.target.value})} className={inputStyle} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-1.5">Phone Number</label>
                  <input type="tel" required placeholder="+91 98765 43210" value={buyerInfo.phone} onChange={e => setBuyerInfo({...buyerInfo, phone: e.target.value})} className={inputStyle} />
                </div>
              </div>
            </div>

            {/* 2. Grouped Artworks & Messages */}
            {Object.keys(groupedCart).length === 0 ? (
              <div className={`${cardStyle} text-center py-8 text-zinc-500`}>
                <p className="font-bold mb-2">No artworks selected.</p>
                <Link to="/" className="text-sm underline decoration-zinc-400 hover:text-zinc-900 dark:hover:text-white">Explore gallery</Link>
              </div>
            ) : (
              Object.entries(groupedCart).map(([artistName, items]) => (
                <div key={artistName} className={`${cardStyle} border-l-4 border-l-zinc-900 dark:border-l-zinc-100`}>
                  
                  {/* Producer Header */}
                  <div className="flex items-center gap-3 mb-5 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                    <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                      <User size={18} className="text-zinc-600 dark:text-zinc-400" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Producer / Artist</p>
                      <h3 className="text-lg font-bold" style={{ fontFamily: "'Quicksand', sans-serif" }}>{artistName}</h3>
                    </div>
                  </div>

                  {/* Producer's Items */}
                  <div className="space-y-3 mb-5">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 p-3 bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800/60 rounded-lg">
                        <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md border border-zinc-200 dark:border-zinc-800" />
                        <div className="flex-1 flex flex-col justify-between py-0.5">
                          <div>
                            <h4 className="font-bold text-sm">{item.title}</h4>
                            <p className="font-semibold text-xs text-zinc-500 mt-1">₹{item.price.toLocaleString()}</p>
                          </div>
                        </div>
                        <button type="button" onClick={() => handleRemove(item.id)} className="text-zinc-400 hover:text-red-500 self-start p-1"><Trash2 size={16} /></button>
                      </div>
                    ))}
                  </div>

                  {/* Message specifically to this Producer */}
                  <div>
                    <label className="flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-white mb-2">
                      <MessageSquare size={14} /> Message to {artistName}
                    </label>
                    <textarea 
                      required 
                      rows={3}
                      placeholder={`Hello ${artistName}, I want to buy these artworks. Can you ship to Kolkata?`} 
                      value={artistMessages[artistName] || ''} 
                      onChange={e => handleMessageChange(artistName, e.target.value)}
                      className={`${inputStyle} resize-none`} 
                    />
                  </div>

                </div>
              ))
            )}
          </div>

          {/* ══ RIGHT COLUMN (Summary & Workflow Details) ══ */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 3. Request Summary */}
            <div className={cardStyle}>
              <h2 className="text-lg font-bold mb-5" style={{ fontFamily: "'Quicksand', sans-serif" }}>Estimated Total</h2>
              
              <div className="space-y-3 text-sm mb-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>Selected Artworks ({cartItems.length})</span>
                  <span className="font-semibold text-zinc-900 dark:text-white">₹{estimatedTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>Producers Contacted</span>
                  <span className="font-semibold text-zinc-900 dark:text-white">{Object.keys(groupedCart).length}</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-2">
                <span className="font-bold">Total Value</span>
                <span className="text-2xl font-black tracking-tight" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                  ₹{estimatedTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* 4. How it Works */}
            <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4 text-zinc-900 dark:text-white">
                <Info size={18} />
                <h3 className="font-bold text-sm">What happens next?</h3>
              </div>
              
              <ul className="space-y-4 relative before:absolute before:inset-y-0 before:left-3 before:w-px before:bg-zinc-300 dark:before:bg-zinc-700 ml-1">
                <li className="relative pl-8">
                  <span className="absolute left-1.5 top-1 w-3 h-3 rounded-full bg-zinc-900 dark:bg-zinc-100 border-4 border-zinc-100 dark:border-zinc-900"></span>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white mb-0.5">1. Send Inquiries</h4>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">Your message and contact details are sent directly to each respective producer.</p>
                </li>
                <li className="relative pl-8">
                  <span className="absolute left-1.5 top-1 w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700 border-4 border-zinc-100 dark:border-zinc-900"></span>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white mb-0.5">2. Discuss & Confirm</h4>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">The producer will reply to confirm availability, shipping details to your location, and the final price.</p>
                </li>
                <li className="relative pl-8">
                  <span className="absolute left-1.5 top-1 w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700 border-4 border-zinc-100 dark:border-zinc-900"></span>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white mb-0.5">3. Secure Delivery</h4>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">You arrange payment privately with the producer, and they dispatch your order securely.</p>
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isProcessing || cartItems.length === 0}
              className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-3.5 rounded-xl text-sm font-bold shadow-md hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <span className="animate-pulse flex items-center gap-2">Sending Inquiries...</span>
              ) : (
                <>Send {Object.keys(groupedCart).length} Requests <Send size={16} /></>
              )}
            </button>
            
            <p className="text-center text-[11px] font-medium text-zinc-500 mt-4 flex items-center justify-center gap-1.5">
              <ShieldCheck size={14} /> No payment required at this step.
            </p>

          </div>
        </form>

      </main>
    </div>
  );
}