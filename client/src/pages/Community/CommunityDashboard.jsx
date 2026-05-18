

// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import { 
// // //   Users, Settings, Calendar, Image as ImageIcon, Search, Menu, X, Heart, MessageCircle, MapPin, Send, 
// // //   Paperclip, Smile, MoreVertical, Shield, Globe, Lock, Edit3, Check, XCircle, FileText, Video, Map, Palette, Camera
// // // } from 'lucide-react';

// // // // --- MOCK DATA ---
// // // const COMMUNITY = {
// // //   name: "Nomad Creatives",
// // //   privacy: "restricted", // public, restricted, private
// // //   description: "A sanctuary for traveling artists and writers to share their journeys, sketches, and stories from the road.",
// // //   cover: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=60",
// // //   logo: "NC",
// // //   rules: [
// // //     "Be respectful to fellow travelers and artists.",
// // //     "Constructive critique only.",
// // //     "Tag AI-generated content appropriately."
// // //   ],
// // //   members: [
// // //     { id: 1, name: "Sarah Chen", role: "admin", status: "online", avatar: "SC" },
// // //     { id: 2, name: "Mike Ross", role: "member", status: "offline", avatar: "MR" },
// // //     { id: 3, name: "Elena H.", role: "member", status: "online", avatar: "EH" },
// // //   ],
// // //   requests: [
// // //     { id: 101, name: "David Kim", message: "Love watercolor landscapes!", time: "2h ago", avatar: "DK" },
// // //     { id: 102, name: "Anna Bell", message: "Digital artist from Berlin.", time: "1d ago", avatar: "AB" },
// // //   ]
// // // };

// // // const CHAT_FEED = [
// // //   { 
// // //     id: 1, type: 'art', author: "Sarah Chen", avatar: "SC", time: "2:30 PM",
// // //     content: "Just finished this piece in Kyoto. The neon lights reflecting on the wet pavement were incredible.",
// // //     attachment: { title: "Kyoto Streets at Night", url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=60" },
// // //     likes: 42, replies: 5
// // //   },
// // //   { 
// // //     id: 2, type: 'text', author: "Mike Ross", avatar: "MR", time: "3:15 PM",
// // //     content: "Does anyone have recommendations for good travel watercolor palettes? Mine keeps leaking in my backpack.",
// // //     likes: 12, replies: 8
// // //   },
// // //   { 
// // //     id: 3, type: 'log', author: "Elena H.", avatar: "EH", time: "5:00 PM",
// // //     content: "Shared a new Travel Log!",
// // //     attachment: { title: "The Solitude of the Alps", type: "Travel Log", location: "Swiss Alps" },
// // //     likes: 89, replies: 12
// // //   },
// // // ];

// // // // --- MAIN COMPONENT ---
// // // const CommunityDashboard = () => {
// // //   const [activeTab, setActiveTab] = useState('chat'); // 'chat', 'members', 'overview'
// // //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
// // //   // Chat Input States
// // //   const [chatMessage, setChatMessage] = useState("");
// // //   const [showAttachments, setShowAttachments] = useState(false);
// // //   const [showEmojis, setShowEmojis] = useState(false);
  
// // //   const mainScrollRef = useRef(null);

// // //   useEffect(() => {
// // //     const handleResize = () => window.innerWidth >= 768 && setIsMobileMenuOpen(false);
// // //     window.addEventListener('resize', handleResize);
// // //     return () => window.removeEventListener('resize', handleResize);
// // //   }, []);

// // //   return (
// // //     <div className="h-screen w-full  bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans flex overflow-hidden selection:bg-zinc-200 dark:selection:bg-zinc-800">
      
// // //       {/* --- SIDEBAR (Desktop) --- */}
// // //       <aside className="hidden md:flex flex-col w-64 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
// // //         <div className="h-16 flex items-center px-6 border-b border-zinc-200 dark:border-zinc-800">
// // //            <div className="w-6 h-6 bg-zinc-900 dark:bg-white rounded flex items-center justify-center text-white dark:text-black text-xs font-bold mr-2">{COMMUNITY.logo}</div>
// // //            <span className="font-semibold tracking-tight truncate">{COMMUNITY.name}</span>
// // //         </div>
        
// // //         <div className="p-4 space-y-6 overflow-y-auto flex-1">
// // //           <div className="space-y-1">
// // //             <SidebarItem icon={<MessageCircle size={18} />} label="Community Chat" active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} />
// // //             <SidebarItem icon={<Users size={18} />} label="Members & Requests" active={activeTab === 'members'} onClick={() => setActiveTab('members')} badge={COMMUNITY.requests.length} />
// // //             <SidebarItem icon={<Settings size={18} />} label="Admin Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
// // //           </div>
// // //         </div>
// // //       </aside>

// // //       {/* --- MOBILE MENU OVERLAY --- */}
// // //       <AnimatePresence>
// // //         {isMobileMenuOpen && (
// // //           <>
// // //             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/60 z-50 md:hidden backdrop-blur-sm" />
// // //             <motion.aside initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed inset-y-0 left-0 w-[280px] bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 z-50 md:hidden flex flex-col p-4 shadow-2xl">
// // //               <div className="flex justify-between items-center mb-6">
// // //                 <span className="font-bold text-lg">{COMMUNITY.name}</span>
// // //                 <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md"><X size={20} /></button>
// // //               </div>
// // //               <SidebarItem icon={<MessageCircle size={18} />} label="Community Chat" active={activeTab === 'chat'} onClick={() => { setActiveTab('chat'); setIsMobileMenuOpen(false); }} />
// // //               <SidebarItem icon={<Users size={18} />} label="Members & Requests" active={activeTab === 'members'} onClick={() => { setActiveTab('members'); setIsMobileMenuOpen(false); }} badge={COMMUNITY.requests.length} />
// // //               <SidebarItem icon={<Settings size={18} />} label="Admin Overview" active={activeTab === 'overview'} onClick={() => { setActiveTab('overview'); setIsMobileMenuOpen(false); }} />
// // //             </motion.aside>
// // //           </>
// // //         )}
// // //       </AnimatePresence>

// // //       {/* --- CENTER AREA --- */}
// // //       <main className="flex-1 flex flex-col min-w-0 relative ">
        
// // //         {/* HEADER */}
// // //         <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-md z-10 shrink-0">
// // //           <div className="flex items-center gap-3">
// // //             <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors">
// // //               <Menu size={20} />
// // //             </button>
// // //             <h1 className="font-semibold text-lg capitalize">{activeTab.replace('-', ' ')}</h1>
// // //           </div>
// // //           <div className="flex items-center gap-4">
// // //              <button className="text-zinc-500 hover:text-black dark:hover:text-white transition-colors"><Search size={20} /></button>
// // //              <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 overflow-hidden"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="user"/></div>
// // //           </div>
// // //         </header>

// // //         {/* SCROLLABLE CONTENT */}
// // //         <div ref={mainScrollRef} className={`flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 scroll-smooth hide-scrollbar ${activeTab === 'chat' ? 'pb-24' : ''}`}>
// // //           <div className="max-w-4xl mx-auto">
// // //             <AnimatePresence mode="wait">
// // //               {activeTab === 'chat' && <ChatFeedView key="chat" feed={CHAT_FEED} />}
// // //               {activeTab === 'members' && <MembersView key="members" data={COMMUNITY} />}
// // //               {activeTab === 'overview' && <OverviewView key="overview" data={COMMUNITY} />}
// // //             </AnimatePresence>
// // //           </div>
// // //         </div>

// // //         {/* --- BOTTOM CHAT INPUT (Only visible on chat tab) --- */}
// // //         <AnimatePresence>
// // //           {activeTab === 'chat' && (
// // //             <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="absolute bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800 p-2 md:p-4 z-20">
// // //               <div className="max-w-4xl mx-auto flex items-end gap-2 md:gap-4 relative">
                
// // //                 {/* Attachment Menu Popover */}
// // //                 <AnimatePresence>
// // //                   {showAttachments && (
// // //                     <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute bottom-14 left-0 w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-50">
// // //                       <div className="p-2 space-y-1">
// // //                         <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-3 py-2 block">Upload Media</span>
// // //                         <PopoverItem icon={<ImageIcon size={16}/>} label="Image or Video" />
// // //                         <PopoverItem icon={<FileText size={16}/>} label="Document or PDF" />
// // //                         <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-1 mx-2" />
// // //                         <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-3 py-2 block">Painters' Diary Creations</span>
// // //                         <PopoverItem icon={<Palette size={16}/>} label="Share Artwork" color="text-purple-500" />
// // //                         <PopoverItem icon={<Map size={16}/>} label="Share Travel Log" color="text-green-500" />
// // //                       </div>
// // //                     </motion.div>
// // //                   )}
// // //                 </AnimatePresence>

// // //                 <button onClick={() => { setShowAttachments(!showAttachments); setShowEmojis(false); }} className={`p-2.5 rounded-full bg-black transition-colors ${showAttachments ? 'bg-zinc-900 text-white dark:bg-white dark:text-black' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
// // //                   <Paperclip size={20} />
// // //                 </button>
                
// // //                 <div className="flex-1 bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex items-center px-4 py-2.5 border border-transparent focus-within:border-zinc-300 dark:focus-within:border-zinc-700 transition-colors">
// // //                   <input 
// // //                     type="text" value={chatMessage} onChange={(e) => setChatMessage(e.target.value)}
// // //                     placeholder="Message the community..." 
// // //                     className="bg-transparent w-full text-sm md:text-base outline-none text-zinc-900 dark:text-white placeholder:text-zinc-500"
// // //                     onKeyDown={(e) => e.key === 'Enter' && setChatMessage('')}
// // //                   />
                  
// // //                   {/* Emoji Button */}
// // //                   <div className="relative">
// // //                     <button onClick={() => { setShowEmojis(!showEmojis); setShowAttachments(false); }} className={`ml-2 p-1.5 rounded-full transition-colors ${showEmojis ? 'bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'}`}>
// // //                       <Smile size={20} />
// // //                     </button>
// // //                     {/* Fake Emoji Picker Popover */}
// // //                     <AnimatePresence>
// // //                       {showEmojis && (
// // //                         <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute bottom-12 right-0 w-64 h-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-4 flex items-center justify-center z-50">
// // //                           <span className="text-zinc-400 text-sm">Emoji Picker Library Here</span>
// // //                         </motion.div>
// // //                       )}
// // //                     </AnimatePresence>
// // //                   </div>
// // //                 </div>

// // //                 <motion.button whileTap={{ scale: 0.95 }} onClick={() => setChatMessage('')} className={`p-3 rounded-full shadow-lg transition-all ${chatMessage.trim() ? 'bg-black dark:bg-white text-white dark:text-black hover:opacity-90' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'}`}>
// // //                   <Send size={18} className="ml-0.5" />
// // //                 </motion.button>
// // //               </div>
// // //             </motion.div>
// // //           )}
// // //         </AnimatePresence>

// // //       </main>
// // //     </div>
// // //   );
// // // };

// // // // --- VIEWS ---

// // // const ChatFeedView = ({ feed }) => (
// // //   <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
// // //     <div className="text-center py-8">
// // //       <h3 className="text-2xl font-bold mb-2">Welcome to the Chat</h3>
// // //       <p className="text-zinc-500 text-sm">This is the beginning of the community history.</p>
// // //     </div>
    
// // //     {feed.map((msg) => (
// // //       <div key={msg.id} className="flex gap-4 group">
// // //         <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-sm shrink-0 border border-zinc-200 dark:border-zinc-700">{msg.avatar}</div>
// // //         <div className="flex-1 min-w-0">
// // //           <div className="flex items-baseline gap-2 mb-1">
// // //             <span className="font-bold text-[15px]">{msg.author}</span>
// // //             <span className="text-xs text-zinc-500">{msg.time}</span>
// // //           </div>
// // //           <p className="text-[15px] text-zinc-800 dark:text-zinc-200 leading-relaxed mb-2">{msg.content}</p>
          
// // //           {/* Attachment Rendering */}
// // //           {msg.attachment && msg.type === 'art' && (
// // //             <div className="mt-2 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 max-w-sm">
// // //               <img src={msg.attachment.url} alt={msg.attachment.title} className="w-full h-auto object-cover max-h-64" />
// // //             </div>
// // //           )}
          
// // //           {msg.attachment && msg.type === 'log' && (
// // //             <div className="mt-2 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 max-w-sm flex items-start gap-3 cursor-pointer hover:border-zinc-400 transition-colors">
// // //               <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg text-green-600 dark:text-green-400"><Map size={20}/></div>
// // //               <div>
// // //                 <p className="font-bold text-sm mb-0.5">{msg.attachment.title}</p>
// // //                 <p className="text-xs text-zinc-500">{msg.attachment.type} • {msg.attachment.location}</p>
// // //               </div>
// // //             </div>
// // //           )}

// // //           <div className="flex items-center gap-4 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
// // //             <ActionButton icon={<Heart size={16} />} count={msg.likes} />
// // //             <ActionButton icon={<MessageCircle size={16} />} count={msg.replies} />
// // //           </div>
// // //         </div>
// // //       </div>
// // //     ))}
// // //   </motion.div>
// // // );

// // // const OverviewView = ({ data }) => (
// // //   <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8 pb-10">
    
// // //     {/* Admin Banner & Settings */}
// // //     <div className="border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden bg-white dark:bg-black shadow-lg">
// // //       <div className="h-48 w-full bg-zinc-100 dark:bg-zinc-900 relative group">
// // //          <img src={data.cover} className="w-full h-full object-cover" alt="Cover" />
// // //          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
// // //             <button className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2"><Camera size={16}/> Edit Cover</button>
// // //          </div>
// // //       </div>
      
// // //       <div className="px-6 pb-8 -mt-12 relative">
// // //         <div className="flex justify-between items-end mb-4">
// // //           <div className="w-24 h-24 rounded-2xl bg-white dark:bg-black p-1 shadow-lg border border-zinc-100 dark:border-zinc-800 relative group cursor-pointer">
// // //             <div className="w-full h-full bg-zinc-100 dark:bg-zinc-900 rounded-xl flex items-center justify-center text-3xl font-bold">{data.logo}</div>
// // //             <div className="absolute inset-1 bg-black/50 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Camera size={20} className="text-white"/></div>
// // //           </div>
// // //           <button className="bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-colors mb-2 border border-zinc-200 dark:border-zinc-800">
// // //              <Edit3 size={16}/> Edit Details
// // //           </button>
// // //         </div>
        
// // //         <div>
// // //             <div className="flex items-center gap-3 mb-1">
// // //               <h2 className="text-2xl font-bold tracking-tight">{data.name}</h2>
// // //               <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-500">
// // //                  <Lock size={12}/> {data.privacy}
// // //               </div>
// // //             </div>
// // //             <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm mb-6 mt-4 max-w-2xl">{data.description}</p>
// // //         </div>
// // //       </div>
// // //     </div>

// // //     {/* Rules & Guidelines Admin */}
// // //     <div className="bg-zinc-50 dark:bg-zinc-900/30 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800">
// // //       <div className="flex justify-between items-center mb-6">
// // //         <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2"><Shield size={16} /> Community Guidelines</h3>
// // //         <button className="text-xs font-bold text-zinc-900 dark:text-white hover:underline">Edit Rules</button>
// // //       </div>
// // //       <ul className="space-y-4">
// // //         {data.rules.map((r, i) => (
// // //           <li key={i} className="bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl text-sm text-zinc-700 dark:text-zinc-300 flex items-start gap-3">
// // //              <span className="bg-zinc-100 dark:bg-zinc-900 text-zinc-500 font-mono text-xs w-6 h-6 rounded flex items-center justify-center shrink-0">{i+1}</span>
// // //              <span className="pt-0.5">{r}</span>
// // //           </li>
// // //         ))}
// // //       </ul>
// // //     </div>
// // //   </motion.div>
// // // );

// // // const MembersView = ({ data }) => {
// // //   const [memberTab, setMemberTab] = useState('directory'); // 'directory', 'requests'
  
// // //   return (
// // //     <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
      
// // //       {/* View Switcher */}
// // //       <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl w-fit">
// // //         <button onClick={() => setMemberTab('directory')} className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${memberTab === 'directory' ? 'bg-white dark:bg-black shadow-sm text-black dark:text-white' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'}`}>
// // //           Directory ({data.members.length})
// // //         </button>
// // //         <button onClick={() => setMemberTab('requests')} className={`px-5 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${memberTab === 'requests' ? 'bg-white dark:bg-black shadow-sm text-black dark:text-white' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'}`}>
// // //           Requests {data.requests.length > 0 && <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{data.requests.length}</span>}
// // //         </button>
// // //       </div>

// // //       {/* Directory List */}
// // //       {memberTab === 'directory' && (
// // //         <div className="bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
// // //           {data.members.map((member, i) => (
// // //             <div key={member.id} className={`p-4 flex items-center justify-between ${i !== data.members.length - 1 ? 'border-b border-zinc-100 dark:border-zinc-900' : ''}`}>
// // //               <div className="flex items-center gap-3">
// // //                 <div className="relative">
// // //                   <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-sm border border-zinc-200 dark:border-zinc-700">{member.avatar}</div>
// // //                   <div className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white dark:border-black rounded-full ${member.status === 'online' ? 'bg-green-500' : 'bg-zinc-400'}`} />
// // //                 </div>
// // //                 <div>
// // //                   <p className="font-bold text-sm flex items-center gap-2">
// // //                     {member.name} 
// // //                     {member.role === 'admin' && <Shield size={12} className="text-blue-500" />}
// // //                   </p>
// // //                   <p className="text-xs text-zinc-500 capitalize">{member.role}</p>
// // //                 </div>
// // //               </div>
// // //               <button className="p-2 text-zinc-400 hover:text-black dark:hover:text-white transition-colors"><MoreVertical size={16} /></button>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       )}

// // //       {/* Requests List */}
// // //       {memberTab === 'requests' && (
// // //         <div className="space-y-4">
// // //           {data.requests.length === 0 ? (
// // //             <div className="text-center py-12 text-zinc-500">No pending requests.</div>
// // //           ) : (
// // //             data.requests.map((req) => (
// // //               <div key={req.id} className="bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
// // //                 <div className="flex items-start gap-3">
// // //                   <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-sm border border-zinc-200 dark:border-zinc-700 shrink-0">{req.avatar}</div>
// // //                   <div>
// // //                     <p className="font-bold text-sm">{req.name}</p>
// // //                     <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">"{req.message}"</p>
// // //                     <p className="text-xs text-zinc-500 mt-2">{req.time}</p>
// // //                   </div>
// // //                 </div>
// // //                 <div className="flex gap-2 w-full sm:w-auto">
// // //                   <button className="flex-1 sm:flex-none px-4 py-2 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2">
// // //                     <XCircle size={16}/> Deny
// // //                   </button>
// // //                   <button className="flex-1 sm:flex-none px-4 py-2 bg-black dark:bg-white text-white dark:text-black hover:opacity-90 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2">
// // //                     <Check size={16}/> Accept
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             ))
// // //           )}
// // //         </div>
// // //       )}
// // //     </motion.div>
// // //   );
// // // };

// // // // --- UTILS ---
// // // const SidebarItem = ({ icon, label, active, onClick, badge }) => (
// // //   <button onClick={onClick} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${active ? 'bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-black dark:hover:text-zinc-200'}`}>
// // //     <div className="flex items-center gap-3">{icon}<span>{label}</span></div>
// // //     {badge > 0 && <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">{badge}</span>}
// // //   </button>
// // // );

// // // const ActionButton = ({ icon, count }) => (
// // //   <button className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors group">
// // //     {React.cloneElement(icon, { className: "group-hover:scale-110 transition-transform" })}
// // //     <span className="text-xs font-bold">{count}</span>
// // //   </button>
// // // );

// // // const PopoverItem = ({ icon, label, color = "text-zinc-900 dark:text-white" }) => (
// // //   <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 rounded-lg transition-colors text-sm font-medium">
// // //     <div className={color}>{icon}</div>
// // //     <span className="text-zinc-700 dark:text-zinc-300">{label}</span>
// // //   </button>
// // // );

// // // export default CommunityDashboard;


import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Settings, Image as ImageIcon, Search, Menu, X, Heart, MessageCircle, MapPin, Send, 
  Paperclip, Smile, MoreVertical, Shield, Globe, Lock, Edit3, Check, XCircle, FileText, Map, Palette, Camera,
  MoreHorizontal, Reply, Info,
  TextAlignStart
} from 'lucide-react';

// --- MOCK DATA ---
const COMMUNITY = {
  name: "Nomad Creatives",
  privacy: "Private", 
  description: "A sanctuary for traveling artists and writers to share their journeys, sketches, and stories from the road. Join us in documenting the world through creative lenses.",
  cover: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop&q=80",
  logo: "NC",
  rules: [
    "Be respectful to fellow travelers and artists.",
    "Constructive critique only.",
    "Tag AI-generated content appropriately."
  ],
  members: [
    { id: 1, name: "Sarah Chen", role: "admin", status: "online", avatar: "SC", location: "Kyoto, JP" },
    { id: 2, name: "Mike Ross", role: "member", status: "offline", avatar: "MR", location: "New York, US" },
    { id: 3, name: "Elena H.", role: "member", status: "online", avatar: "EH", location: "Swiss Alps" },
    { id: 4, name: "David Kim", role: "member", status: "online", avatar: "DK", location: "Seoul, KR" },
  ],
  requests: [
    { id: 101, name: "Anna Bell", message: "Digital artist from Berlin. Would love to join!", time: "1d ago", avatar: "AB" },
  ]
};

const CHAT_FEED = [
  { 
    id: 1, type: 'art', author: "Sarah Chen", avatar: "SC", time: "Today at 2:30 PM",
    content: "Just finished this piece in Kyoto. The neon lights reflecting on the wet pavement were incredible.",
    attachment: { title: "Kyoto Streets at Night", url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=80" },
    likes: 42, replies: 5
  },
  { 
    id: 2, type: 'text', author: "Mike Ross", avatar: "MR", time: "Today at 3:15 PM",
    content: "Does anyone have recommendations for good travel watercolor palettes? Mine keeps leaking in my backpack.",
    likes: 12, replies: 8
  },
  { 
    id: 3, type: 'log', author: "Elena H.", avatar: "EH", time: "Today at 5:00 PM",
    content: "Shared a new Travel Log!",
    attachment: { title: "The Solitude of the Alps", type: "Travel Log", location: "Swiss Alps" },
    likes: 89, replies: 12
  },
];

export default function CommunityDashboard() {
  const [activeTab, setActiveTab] = useState('chat');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(true);
  
  // Chat Input States
  const [chatMessage, setChatMessage] = useState("");
  const [showAttachments, setShowAttachments] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  
  const mainScrollRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
      if (window.innerWidth < 1280) setShowRightSidebar(false);
      else setShowRightSidebar(true);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Init
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="h-screen w-full bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans flex flex-col selection:bg-zinc-200 dark:selection:bg-zinc-800 overflow-hidden">
      
      {/* --- TOP HEADER (FULL 100VW WIDTH BORDER) --- */}
      <header className="w-full h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-xl z-30 shrink-0 flex justify-center">
        <div className="w-full max-w-400 h-full flex">
          
          {/* Header Left (Matches Left Sidebar Width) */}
          <div className="hidden md:flex items-center px-6 w-65 border-r border-zinc-200 dark:border-zinc-800 shrink-0 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer">
            <div className="w-8 h-8 bg-zinc-900 dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black text-sm font-bold mr-3 shadow-sm">{COMMUNITY.logo}</div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold tracking-tight truncate text-sm font-Quicksand">{COMMUNITY.name}</span>
              <div className="text-[10px] text-zinc-500 capitalize flex items-center gap-1 font-medium mt-0.5"> {COMMUNITY.privacy}</div>
            </div>
          </div>
          
          {/* Header Main Area */}
          <div className="flex-1 flex items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 -ml-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors text-zinc-600 dark:text-zinc-300">
                <TextAlignStart size={20} />
              </button>
              <h1 className="font-bold text-lg capitalize flex items-center gap-2">
                {activeTab === 'chat' && <span className="text-zinc-400">#</span>}
                {activeTab.replace('-', ' ')}
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
                <button className="p-2 text-zinc-500 hover:text-black dark:hover:text-white bg-zinc-50 dark:bg-zinc-900 rounded-full transition-colors"><Search size={18} /></button>
                {activeTab === 'chat' && (
                  <button onClick={() => setShowRightSidebar(!showRightSidebar)} className={`hidden xl:flex p-2 rounded-full transition-colors ${showRightSidebar ? 'bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white' : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-500 hover:text-black dark:hover:text-white'}`}>
                    <Info size={18} />
                  </button>
                )}
            </div>
          </div>
          
        </div>
      </header>

      {/* --- MAIN LAYOUT (1600px Max, NO OUTER BORDERS) --- */}
      <div className="flex-1 w-full flex justify-center overflow-hidden">
        <div className="w-full max-w-[1600px] h-full flex bg-white dark:bg-black relative">
          
          {/* Left Sidebar */}
          <aside className="hidden md:flex flex-col w-[260px] border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 shrink-0">
            <div className="p-4 space-y-8 overflow-y-auto flex-1 hide-scrollbar">
              <div className="space-y-1">
                <p className="px-3 text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Platform</p>
                <SidebarItem icon={<MessageCircle size={18} />} label="Community Chat" active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} />
                <SidebarItem icon={<Users size={18} />} label="Directory" active={activeTab === 'members'} onClick={() => setActiveTab('members')} badge={COMMUNITY.requests.length} />
                <SidebarItem icon={<Settings size={18} />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
              </div>
            </div>
            
            {/* User Profile Mini */}
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden shrink-0"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="user"/></div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold truncate">Current User</span>
                  <span className="text-xs text-zinc-500">View Profile</span>
                </div>
              </div>
            </div>
          </aside>

          {/* --- MOBILE MENU OVERLAY --- */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/60 z-50 md:hidden backdrop-blur-sm" />
                <motion.aside initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed inset-y-0 left-0 w-[280px] bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 z-50 md:hidden flex flex-col p-4 shadow-2xl">
                  <div className="flex justify-between items-center mb-8 px-2 mt-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-zinc-900 dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black font-bold text-sm">{COMMUNITY.logo}</div>
                      <span className="font-bold text-lg">{COMMUNITY.name}</span>
                    </div>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full bg-zinc-50 dark:bg-zinc-800"><X size={20} /></button>
                  </div>
                  <div className="space-y-1">
                    <SidebarItem icon={<MessageCircle size={18} />} label="Community Chat" active={activeTab === 'chat'} onClick={() => { setActiveTab('chat'); setIsMobileMenuOpen(false); }} />
                    <SidebarItem icon={<Users size={18} />} label="Directory" active={activeTab === 'members'} onClick={() => { setActiveTab('members'); setIsMobileMenuOpen(false); }} badge={COMMUNITY.requests.length} />
                    <SidebarItem icon={<Settings size={18} />} label="Overview" active={activeTab === 'overview'} onClick={() => { setActiveTab('overview'); setIsMobileMenuOpen(false); }} />
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          {/* Center Main Area */}
          <main className="flex-1 flex flex-col min-w-0 relative bg-white dark:bg-black">
            
            {/* SCROLLABLE CONTENT */}
            <div ref={mainScrollRef} className={`flex-1 overflow-y-auto overflow-x-hidden scroll-smooth hide-scrollbar ${activeTab === 'chat' ? 'pb-28' : 'p-4 md:p-8'}`}>
              <AnimatePresence mode="wait">
                {activeTab === 'chat' && <ChatFeedView key="chat" feed={CHAT_FEED} community={COMMUNITY} />}
                {activeTab === 'members' && <MembersView key="members" data={COMMUNITY} />}
                {activeTab === 'overview' && <OverviewView key="overview" data={COMMUNITY} />}
              </AnimatePresence>
            </div>

            {/* --- CHAT INPUT BLOCK --- */}
            <AnimatePresence>
              {activeTab === 'chat' && (
                <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-white via-white to-transparent dark:from-black dark:via-black pb-6 pt-10">
                  <div className="max-w-5xl mx-auto flex items-end gap-2 relative bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 p-2 rounded-2xl shadow-lg">
                    
                    {/* Attachment Popover */}
                    <AnimatePresence>
                      {showAttachments && (
                        <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute bottom-16 left-0 w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-2xl overflow-hidden z-50">
                          <div className="p-2 space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-3 py-2 block">Upload Media</span>
                            <PopoverItem icon={<ImageIcon size={16}/>} label="Image or Video" />
                            <PopoverItem icon={<FileText size={16}/>} label="Document or PDF" />
                            <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-1 mx-2" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-3 py-2 block">Painters' Diary Tools</span>
                            <PopoverItem icon={<Palette size={16}/>} label="Share Artwork" color="text-purple-500" />
                            <PopoverItem icon={<Map size={16}/>} label="Share Travel Log" color="text-green-500" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button onClick={() => { setShowAttachments(!showAttachments); setShowEmojis(false); }} className={`p-2.5 rounded-xl transition-colors shrink-0 ${showAttachments ? 'bg-zinc-900 text-white dark:bg-white dark:text-black' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
                      <Paperclip size={20} />
                    </button>
                    
                    <div className="flex-1 flex items-center bg-transparent py-1 px-2">
                      <input 
                        type="text" value={chatMessage} onChange={(e) => setChatMessage(e.target.value)}
                        placeholder="Message #community-chat..." 
                        className="bg-transparent w-full text-sm md:text-[15px] outline-none text-zinc-900 dark:text-white placeholder:text-zinc-400"
                        onKeyDown={(e) => e.key === 'Enter' && setChatMessage('')}
                      />
                    </div>
                    
                    <div className="flex items-center gap-1 shrink-0">
                      <div className="relative">
                        <button onClick={() => { setShowEmojis(!showEmojis); setShowAttachments(false); }} className={`p-2.5 rounded-xl transition-colors ${showEmojis ? 'bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
                          <Smile size={20} />
                        </button>
                      </div>
                      <motion.button whileTap={{ scale: 0.95 }} onClick={() => setChatMessage('')} className={`p-2.5 rounded-xl shadow-sm transition-all flex items-center justify-center ${chatMessage.trim() ? 'bg-black dark:bg-white text-white dark:text-black hover:opacity-90' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'}`}>
                        <Send size={18} className="ml-0.5" />
                      </motion.button>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Right Sidebar (Desktop Chat Info) */}
          <AnimatePresence>
            {activeTab === 'chat' && showRightSidebar && (
              <motion.aside initial={{ width: 0, opacity: 0 }} animate={{ width: 280, opacity: 1 }} exit={{ width: 0, opacity: 0 }} className="hidden xl:flex flex-col border-l border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 overflow-hidden shrink-0">
                <div className="p-5 overflow-y-auto hide-scrollbar w-[280px]">
                  
                  {/* About Widget */}
                  <div className="mb-8">
                    <h3 className="text-sm font-bold mb-3 flex items-center gap-2"><Globe size={16}/> About</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">{COMMUNITY.description}</p>
                    <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                      <Users size={14}/> {COMMUNITY.members.length} Members
                    </div>
                  </div>

                  {/* Online Members */}
                  <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4">Online — {COMMUNITY.members.filter(m => m.status === 'online').length}</h3>
                      <div className="space-y-3">
                        {COMMUNITY.members.filter(m => m.status === 'online').map(m => (
                          <div key={m.id} className="flex items-center gap-3 group cursor-pointer">
                            <div className="relative">
                              <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold border border-zinc-300 dark:border-zinc-700">{m.avatar}</div>
                              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-zinc-50 dark:border-zinc-900 rounded-full bg-green-500" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium group-hover:underline">{m.name}</span>
                              <span className="text-[10px] text-zinc-500">{m.location}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}

// --- VIEWS ---

const ChatFeedView = ({ feed, community }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-5xl mx-auto py-6 px-4 md:px-8 space-y-2">
    
    {/* Upgraded Cover Image Welcome Banner */}
    <div className="relative rounded-3xl overflow-hidden mb-10 shadow-md border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center text-center py-16 px-6">
      <img src={community.cover} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      
      <div className="relative z-10 text-white">
        <div className="w-20 h-20 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-5 shadow-xl">
          {community.logo}
        </div>
        <h3 className="text-3xl font-bold mb-3 tracking-tight drop-shadow-md">Welcome to {community.name}</h3>
        <p className="text-zinc-200 text-[15px] max-w-xl mx-auto drop-shadow-md leading-relaxed">
          This is the beginning of the community history. {community.description}
        </p>
      </div>
    </div>
    
    {/* Chat Messages */}
    {feed.map((msg) => (
      <div key={msg.id} className="group relative flex gap-4 p-2 md:p-3 -mx-2 md:-mx-3 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
        
        {/* Floating Actions (Appears on hover) */}
        <div className="absolute top-2 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm rounded-lg flex items-center overflow-hidden z-10">
           <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-500 transition-colors" title="React"><Smile size={16}/></button>
           <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-500 transition-colors" title="Reply"><Reply size={16}/></button>
           <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-500 transition-colors" title="More"><MoreHorizontal size={16}/></button>
        </div>

        <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">{msg.avatar}</div>
        
        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-bold text-[15px] hover:underline cursor-pointer">{msg.author}</span>
            <span className="text-[11px] font-medium text-zinc-400">{msg.time}</span>
          </div>
          
          <p className="text-[15px] text-zinc-800 dark:text-zinc-200 leading-relaxed mb-2 whitespace-pre-wrap">{msg.content}</p>
          
          {/* Attachment Rendering */}
          {msg.attachment && msg.type === 'art' && (
            <div className="mt-3 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 max-w-sm cursor-pointer group/img relative">
              <img src={msg.attachment.url} alt={msg.attachment.title} className="w-full h-auto object-cover max-h-72 transition-transform duration-500 group-hover/img:scale-105" />
            </div>
          )}
          
          {msg.attachment && msg.type === 'log' && (
            <div className="mt-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 max-w-sm flex items-start gap-3 cursor-pointer hover:border-zinc-400 transition-colors shadow-sm">
              <div className="bg-green-100 dark:bg-green-900/30 p-2.5 rounded-lg text-green-600 dark:text-green-400"><Map size={20}/></div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm mb-0.5 truncate">{msg.attachment.title}</p>
                <p className="text-xs text-zinc-500 truncate">{msg.attachment.type} • {msg.attachment.location}</p>
              </div>
            </div>
          )}

          {/* Inline Reactions */}
          <div className="flex items-center gap-2 mt-2">
             <button className="flex items-center gap-1.5 px-2 py-1 bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md text-xs font-bold transition-colors">
               <Heart size={12} className="text-red-500" /> {msg.likes}
             </button>
             {msg.replies > 0 && (
               <button className="flex items-center gap-1.5 px-2 py-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-white rounded-md text-xs font-bold transition-colors">
                 <Reply size={12} /> {msg.replies} Replies
               </button>
             )}
          </div>
        </div>
      </div>
    ))}
  </motion.div>
);

const OverviewView = ({ data }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-6xl mx-auto space-y-6">
    
    {/* Bento Grid Layout */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Col 1 & 2: Banner & Details */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 shadow-sm relative group h-64 md:h-80">
           <img src={data.cover} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
           
           <button className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded text-sm font-bold flex items-center gap-2 transition-colors">
             <Camera size={16}/> Edit
           </button>

           <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
             <div className="flex items-end gap-5">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white dark:bg-black p-1 shadow-2xl relative">
                  <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-3xl font-bold text-black dark:text-white">{data.logo}</div>
                </div>
                <div className="mb-1 text-white">
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight drop-shadow-md font-Quicksand">{data.name}</h2>
                  <div className="flex items-center gap-2 mt-2 opacity-90 text-sm font-medium">
                    <div className="flex items-center gap-1"><Lock size={14}/> {data.privacy}</div>
                    <span>•</span>
                    <div className="flex items-center gap-1"><Users size={14}/> {data.members.length} Members</div>
                  </div>
                </div>
             </div>
           </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 md:p-8 rounded-3xl shadow-sm">
           <div className="flex justify-between items-start mb-4">
             <h3 className="font-bold text-lg">About Community</h3>
             <button className="text-zinc-500 hover:text-black dark:hover:text-white p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full transition-colors"><Edit3 size={16}/></button>
           </div>
           <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-[15px]">{data.description}</p>
        </div>
      </div>

      {/* Col 3: Rules & Actions */}
      <div className="flex flex-col gap-6">
        <div className="bg-zinc-50 dark:bg-zinc-900 p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 h-full shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-white flex items-center gap-2"><Shield size={16} /> Guidelines</h3>
          </div>
          <ul className="space-y-4">
            {data.rules.map((r, i) => (
              <li key={i} className="bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl text-sm text-zinc-700 dark:text-zinc-300 flex items-start gap-3 shadow-sm">
                 <span className="bg-zinc-100 dark:bg-zinc-900 text-zinc-500 font-bold text-xs w-6 h-6 rounded-lg flex items-center justify-center shrink-0">{i+1}</span>
                 <span className="pt-0.5 leading-relaxed">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  </motion.div>
);

const MembersView = ({ data }) => {
  const [memberTab, setMemberTab] = useState('directory'); 
  
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-6xl mx-auto space-y-6">
      
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Community Directory</h2>
          <p className="text-zinc-500 text-sm mt-1">Manage members and incoming requests.</p>
        </div>

        <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl w-fit shrink-0">
          <button onClick={() => setMemberTab('directory')} className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${memberTab === 'directory' ? 'bg-white dark:bg-black shadow-sm text-black dark:text-white border border-zinc-200 dark:border-zinc-800' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'}`}>
            Members ({data.members.length})
          </button>
          <button onClick={() => setMemberTab('requests')} className={`px-5 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${memberTab === 'requests' ? 'bg-white dark:bg-black shadow-sm text-black dark:text-white border border-zinc-200 dark:border-zinc-800' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'}`}>
            Requests {data.requests.length > 0 && <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{data.requests.length}</span>}
          </button>
        </div>
      </div>

      {/* Directory Grid */}
      {memberTab === 'directory' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data.members.map((member) => (
            <div key={member.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 flex flex-col items-center text-center hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors shadow-sm group">
              <div className="relative mb-3">
                <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-black flex items-center justify-center font-bold text-xl border border-zinc-200 dark:border-zinc-800">{member.avatar}</div>
                <div className={`absolute bottom-0 right-1 w-4 h-4 border-[3px] border-white dark:border-zinc-900 rounded-full ${member.status === 'online' ? 'bg-green-500' : 'bg-zinc-400'}`} />
              </div>
              
              <h3 className="font-bold flex items-center justify-center gap-1.5 text-[15px]">
                {member.name} 
                {member.role === 'admin' && <Shield size={14} className="text-blue-500" title="Admin" />}
              </h3>
              
              <div className="flex items-center justify-center gap-1 text-xs text-zinc-500 mt-1 mb-4">
                <MapPin size={12}/> {member.location}
              </div>

              <div className="w-full grid grid-cols-2 gap-2 mt-auto">
                <button className="py-2 bg-zinc-100 dark:bg-black hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg text-xs font-bold transition-colors">Profile</button>
                <button className="py-2 bg-zinc-100 dark:bg-black hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg text-xs font-bold transition-colors">Message</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Requests List */}
      {memberTab === 'requests' && (
        <div className="space-y-4 max-w-3xl">
          {data.requests.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl">
              <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-3 text-zinc-400"><Check size={24}/></div>
              <p className="font-bold">All caught up!</p>
              <p className="text-sm text-zinc-500 mt-1">No pending join requests.</p>
            </div>
          ) : (
            data.requests.map((req) => (
              <div key={req.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-black flex items-center justify-center font-bold text-sm border border-zinc-200 dark:border-zinc-800 shrink-0">{req.avatar}</div>
                  <div>
                    <p className="font-bold">{req.name}</p>
                    <p className="text-[15px] text-zinc-600 dark:text-zinc-400 mt-1">"{req.message}"</p>
                    <p className="text-xs text-zinc-500 mt-2 font-medium">{req.time}</p>
                  </div>
                </div>
                <div className="flex gap-2 w-full md:w-auto mt-2 md:mt-0">
                  <button className="flex-1 md:flex-none px-6 py-2.5 bg-zinc-100 dark:bg-black hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2">
                    Deny
                  </button>
                  <button className="flex-1 md:flex-none px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black hover:opacity-90 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-lg">
                    Approve
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </motion.div>
  );
};

// --- UTILS ---
const SidebarItem = ({ icon, label, active, onClick, badge }) => (
  <button onClick={onClick} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${active ? 'bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white shadow-sm' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-black dark:hover:text-zinc-200'}`}>
    <div className="flex items-center gap-3">{icon}<span>{label}</span></div>
    {badge > 0 && <span className="bg-black dark:bg-white text-white dark:text-black text-[10px] px-2 py-0.5 rounded-full font-bold">{badge}</span>}
  </button>
);

const PopoverItem = ({ icon, label, color = "text-zinc-900 dark:text-white" }) => (
  <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 rounded-lg transition-colors text-sm font-medium">
    <div className={color}>{icon}</div>
    <span className="text-zinc-700 dark:text-zinc-300">{label}</span>
  </button>
);