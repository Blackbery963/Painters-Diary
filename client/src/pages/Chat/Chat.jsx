import React, { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { 
  Send, Paperclip, Mic, Smile, X, Image as ImageIcon, 
  FileText, ChevronLeft, ChevronRight, Settings,
  Check, CheckCheck, PanelRight,
  Phone, Video
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from "../../assets/Logo.jpeg"

// --- Click Outside Hook ---
function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

// --- Data ---
const CONTACTS = [
  { id: 1, name: 'Sarah Wilson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', status: 'online', role: 'Art Director', bio: 'Capturing moments 📸 | Design enthusiast', lastMsg: 'Sent the assets!', unread: 2 },
  { id: 2, name: 'Alex Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop', status: 'away', role: 'Lead Dev', bio: 'Full stack overflow.', lastMsg: 'Deploying now...', unread: 0 },
  { id: 3, name: 'Emily Davis', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop', status: 'online', role: 'Product Owner', bio: 'Coffee first, roadmap second.', lastMsg: 'Meeting at 3?', unread: 0 },
  { id: 4, name: 'James Rod', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop', status: 'offline', role: 'Manager', bio: 'Approved.', lastMsg: 'Approved.', unread: 0 },
  { id: 5, name: 'Lisa Ray', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop', status: 'online', role: 'Marketing', bio: 'Check email.', lastMsg: 'Check email.', unread: 1 },
  { id: 6, name: 'Tom Baker', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop', status: 'online', role: 'Sales', bio: 'Call me.', lastMsg: 'Call me.', unread: 0 },
];

const WALLPAPERS = [
  { id: 'light-clean', name: 'Light Clean', value: 'linear-gradient(to bottom right, #ffffff 0%, #f5f5f5 100%)' }, 
  { id: 'dark-minimal', name: 'Dark Minimal', value: 'linear-gradient(to bottom right, #09090b 0%, #18181b 100%)' },
  { id: 'zinc-subtle', name: 'Zinc Subtle', value: 'linear-gradient(to bottom right, #fafafa 0%, #f4f4f5 100%)' },
  { id: 'slate-dark', name: 'Slate Dark', value: 'linear-gradient(to bottom right, #0f172a 0%, #1e293b 100%)' },
  { id: 'neutral', name: 'Neutral Gray', value: 'linear-gradient(to bottom right, #7f8c8d 0%, #95a5a6 100%)' },
];

const INITIAL_MESSAGES = [
  { id: 1, senderId: 2, text: 'Hey! Did you see the new design concepts?', time: '10:30 AM', type: 'text', reactions: [], status: 'read' },
  { id: 2, senderId: 0, text: 'Yes, looking sharp! ✨', time: '10:32 AM', type: 'text', reactions: ['❤️'], status: 'read' },
  { id: 3, senderId: 2, text: 'Here is the revised background.', time: '10:35 AM', type: 'text', reactions: [], status: 'read' },
  { id: 4, senderId: 2, url: 'https://images.unsplash.com/photo-1614850523060-8da1d56ae167?w=600', text: 'design_v2.jpg', time: '10:35 AM', type: 'image', reactions: [], status: 'read' },
];

const ChatApp = () => {
  // --- State ---
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(false);
  const [galleryTab, setGalleryTab] = useState('media');
  const [selectedContact, setSelectedContact] = useState(CONTACTS[0]);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  
  // --- Wallpaper with localStorage ---
  const [currentWallpaper, setCurrentWallpaper] = useState(() => {
    const saved = localStorage.getItem('chatWallpaper');
    return saved ? JSON.parse(saved) : WALLPAPERS[1];
  });

  // --- Popups ---
  const [showEmoji, setShowEmoji] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showWallpaperMenu, setShowWallpaperMenu] = useState(false);

  // --- Refs ---
  const scrollRef = useRef(null);
  const fileInputRef = useRef(null);
  const emojiRef = useRef(null);
  const attachRef = useRef(null);
  const wpMenuRef = useRef(null);

  useClickOutside(emojiRef, () => setShowEmoji(false));
  useClickOutside(attachRef, () => setShowAttachMenu(false));
  useClickOutside(wpMenuRef, () => setShowWallpaperMenu(false));

  // --- Effects ---
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('chatWallpaper', JSON.stringify(currentWallpaper));
  }, [currentWallpaper]);

  // --- Handlers ---
  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      senderId: 0,
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
      reactions: [],
      status: 'sent'
    };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    setShowEmoji(false);
  };

  const handleDoubleTap = (msgId) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === msgId) {
        const hasLiked = msg.reactions.includes('❤️');
        return { ...msg, reactions: hasLiked ? msg.reactions.filter(r => r !== '❤️') : [...msg.reactions, '❤️'] };
      }
      return msg;
    }));
  };

  const handleFileUpload = () => {
    if(fileInputRef.current) {
      fileInputRef.current.click();
      setShowAttachMenu(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans overflow-hidden flex flex-col md:flex-row p-0 md:p-4 md:gap-4 gap-0 transition-all duration-500">
      
      {/* --- BACKGROUND WALLPAPER --- */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 transition-all duration-1000 ease-in-out"
          style={{ background: currentWallpaper.value }}
        />
        <div className="absolute inset-0 bg-white/40 dark:bg-black/60 backdrop-blur-sm" />
      </div>

      {/* --- SIDEBAR --- */}
      <div className={`
        relative z-20 flex transition-all duration-300 ease-out
        bg-white/30 dark:bg-zinc-900/40 backdrop-blur-2xl 
        border border-white/20 dark:border-zinc-800/50
        shadow-xl
        ${isSidebarExpanded ? 'md:w-80' : 'md:w-20'}
        w-full h-[70px] md:h-auto md:rounded-2xl
        flex-row md:flex-col items-center md:items-stretch
      `}>
        
        {/* Logo Section */}
        <div className={`
          flex items-center lg:justify-start justify-center px-2 shrink-0 z-20
          h-full md:h-20 w-[70px] md:w-auto
          border-r border-white/10 md:border-none md:border-b md:border-white/10
          transition-all duration-300
        `}>
          <Link to="/" className="group flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-800 dark:from-white dark:to-zinc-100 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <img src={Logo} alt="Logo" className="w-full h-full object-cover" />
            </div>
            {isSidebarExpanded && (
              <h1 className="hidden md:block font-medium text-base tracking-tight font-Eagle text-zinc-900 dark:text-white">
                Painters' Diary
              </h1>
            )}
          </Link>
        </div>

        {/* Contacts List */}
        <div className="
          flex-1 min-w-0
          flex md:flex-col 
          overflow-x-auto md:overflow-x-hidden md:overflow-y-auto 
          no-scrollbar
          p-2 gap-2
        ">
          {CONTACTS.map((contact, idx) => (
            <button
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`
                group relative flex items-center gap-3 p-2 rounded-xl transition-all duration-200 shrink-0
                hover:bg-white/40 dark:hover:bg-white/5
                ${selectedContact.id === contact.id 
                  ? 'bg-white/50 dark:bg-white/10 border border-white/40 dark:border-white/10 shadow-md' 
                  : 'border border-transparent'}
              `}
              style={{ animationDelay: `${idx * 30}ms` }}
            >
              <div className="relative">
                <img 
                  src={contact.avatar} 
                  className="w-10 h-10 md:w-11 md:h-11 rounded-lg object-cover shadow-sm group-hover:scale-105 transition-transform duration-200" 
                  alt={contact.name} 
                />
                <span className={`
                  absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-zinc-900 transition-colors duration-200
                  ${contact.status === 'online' ? 'bg-emerald-500' : contact.status === 'away' ? 'bg-amber-500' : 'bg-zinc-400'}
                `} />
              </div>
              
              {isSidebarExpanded && (
                <div className="text-left hidden md:block">
                  <h3 className="font-medium text-sm text-zinc-900 dark:text-white truncate max-w-[140px]">{contact.name}</h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 truncate max-w-[140px]">{contact.lastMsg}</p>
                </div>
              )}

              {contact.unread > 0 && (
                <div className="absolute top-0 right-0 md:top-auto md:bottom-auto md:static w-4 h-4 md:w-5 md:h-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full text-[10px] flex items-center justify-center shadow-lg font-semibold">
                  {contact.unread}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Sidebar Toggle */}
        <div className="hidden md:flex p-4 justify-center border-t border-white/10 shrink-0">
          <button 
            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
            className="p-2 rounded-lg hover:bg-white/20 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-400 transition-all duration-200"
          >
            {isSidebarExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
      </div>

      {/* --- CENTER CHAT --- */}
      <div className={`
        relative z-10 flex-1 flex flex-col 
        bg-white/30 dark:bg-zinc-900/40 backdrop-blur-2xl
        border border-white/20 dark:border-zinc-800/50
        shadow-xl
        md:rounded-2xl overflow-hidden
        transition-all duration-300
      `}>
        
        {/* Chat Header */}
        <div className="h-16 px-4 md:px-6 flex items-center justify-between border-b border-white/10 bg-white/20 dark:bg-black/20">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <h2 className="text-base md:text-lg font-semibold text-zinc-900 dark:text-white leading-tight">{selectedContact.name}</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`
                  w-2 h-2 rounded-full 
                  ${selectedContact.status === 'online' ? 'bg-emerald-500' : selectedContact.status === 'away' ? 'bg-amber-500' : 'bg-zinc-400'}
                  animate-pulse
                `}/>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium capitalize">{selectedContact.status}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <button className="p-2 rounded-lg hover:bg-white/30 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-400 transition-all duration-200 hover:scale-110">
              <Phone size={18}/>
            </button>
            <button className="p-2 rounded-lg hover:bg-white/30 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-400 transition-all duration-200 hover:scale-110">
              <Video size={18}/>
            </button>
            
            <div className="relative" ref={wpMenuRef}>
              <button 
                onClick={() => setShowWallpaperMenu(!showWallpaperMenu)}
                className="p-2 rounded-lg hover:bg-white/30 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-400 transition-all duration-200 hover:scale-110"
              >
                <Settings size={18}/>
              </button>
              
              {showWallpaperMenu && (
                <div className="absolute top-12 right-0 w-72 p-4 bg-white/80 dark:bg-zinc-900/90 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-3">Theme</p>
                  <div className="grid grid-cols-2 gap-2">
                    {WALLPAPERS.map(wp => (
                      <button
                        key={wp.id}
                        onClick={() => { setCurrentWallpaper(wp); setShowWallpaperMenu(false); }}
                        className={`
                          relative h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105
                          ${currentWallpaper.id === wp.id 
                            ? 'border-zinc-900 dark:border-white shadow-lg' 
                            : 'border-transparent hover:border-zinc-300 dark:hover:border-zinc-700'}
                        `}
                      >
                        <div className="absolute inset-0" style={{ background: wp.value }}/>
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 dark:hover:bg-white/5 transition-colors"/>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={() => setShowRightPanel(!showRightPanel)} 
              className={`
                p-2 rounded-lg transition-all duration-200 hover:scale-110
                ${showRightPanel 
                  ? 'bg-white/40 dark:bg-white/10 text-zinc-900 dark:text-white' 
                  : 'hover:bg-white/30 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-400'}
              `}
            >
              <PanelRight size={18}/>
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5 scroll-smooth">
          {messages.map((msg, idx) => {
            const isMe = msg.senderId === 0;
            return (
              <div 
                key={msg.id} 
                className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className={`flex flex-col max-w-[85%] md:max-w-[65%] ${isMe ? 'items-end' : 'items-start'}`}>
                  
                  <div 
                    onDoubleClick={() => handleDoubleTap(msg.id)}
                    className={`
                      relative px-4 py-3 rounded-2xl cursor-pointer select-none transition-all duration-200 active:scale-95 group shadow-md hover:shadow-lg
                      ${isMe 
                        ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-br-none border border-zinc-800/50 dark:border-white/20' 
                        : 'bg-white/60 dark:bg-zinc-800/60 backdrop-blur-lg text-zinc-900 dark:text-white border border-white/40 dark:border-white/10 rounded-bl-none'
                      }
                    `}
                  >
                    {msg.type === 'image' && (
                      <div className="mb-2 rounded-lg overflow-hidden shadow-md">
                        <img src={msg.url} alt="attachment" className="max-w-full h-auto object-cover max-h-64"/>
                      </div>
                    )}
                    
                    <p className="text-[15px] leading-relaxed whitespace-pre-wrap font-medium">{msg.text}</p>
                    
                    {msg.reactions.length > 0 && (
                      <div className={`
                        absolute -bottom-2.5 ${isMe ? '-left-3' : '-right-3'} 
                        bg-white dark:bg-zinc-800 backdrop-blur-xl px-2 py-0.5 rounded-full shadow-lg 
                        text-[12px] border border-white/40 dark:border-white/10
                        transition-all duration-200 group-hover:scale-110
                      `}>
                        {msg.reactions.join('')}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1.5 mt-1.5 px-2 opacity-70">
                    <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">{msg.time}</span>
                    {isMe && (
                      msg.status === 'read' 
                        ? <CheckCheck size={13} className="text-zinc-600 dark:text-zinc-400"/> 
                        : <Check size={13} className="text-zinc-500 dark:text-zinc-500"/>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 border-t border-white/10">
          <form 
            onSubmit={handleSend}
            className="
              relative flex items-end gap-2 
              bg-white/40 dark:bg-zinc-800/40 backdrop-blur-2xl 
              border border-white/30 dark:border-white/10 
              p-3 rounded-2xl shadow-lg
              transition-all duration-200
              focus-within:bg-white/50 dark:focus-within:bg-zinc-800/60
              focus-within:border-white/40 dark:focus-within:border-white/20
            "
          >
            <input type="file" ref={fileInputRef} className="hidden" />

            <div className="relative" ref={attachRef}>
              <button 
                type="button" 
                onClick={() => setShowAttachMenu(!showAttachMenu)}
                className={`
                  p-2.5 rounded-lg transition-all duration-200 hover:scale-110
                  ${showAttachMenu 
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rotate-45' 
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-white/30 dark:hover:bg-white/10'}
                `}
              >
                <Paperclip size={20} />
              </button>
              
              {showAttachMenu && (
                <div className="
                  absolute bottom-14 left-0 flex flex-col gap-1 p-2 
                  bg-white/80 dark:bg-zinc-900/90 backdrop-blur-2xl 
                  border border-white/40 dark:border-white/10 
                  rounded-xl shadow-xl w-48 
                  animate-in fade-in slide-in-from-bottom-2 duration-200
                ">
                  <button 
                    type="button" 
                    onClick={handleFileUpload} 
                    className="flex items-center gap-3 p-2.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-200 transition-all duration-200"
                  >
                    <div className="p-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-md">
                      <ImageIcon size={16}/>
                    </div> 
                    Photos
                  </button>
                  <button 
                    type="button" 
                    onClick={handleFileUpload}
                    className="flex items-center gap-3 p-2.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-200 transition-all duration-200"
                  >
                    <div className="p-1.5 bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 rounded-md">
                      <Video size={16}/>
                    </div> 
                    Video
                  </button>
                  <button 
                    type="button" 
                    onClick={handleFileUpload}
                    className="flex items-center gap-3 p-2.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-200 transition-all duration-200"
                  >
                    <div className="p-1.5 bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 rounded-md">
                      <FileText size={16}/>
                    </div> 
                    File
                  </button>
                </div>
              )}
            </div>

            <div className="flex-1 relative">
              {showEmoji && (
                <div 
                  ref={emojiRef} 
                  className="absolute bottom-14 left-0 shadow-2xl rounded-2xl overflow-hidden border border-white/20 dark:border-white/10 animate-in fade-in scale-95 duration-200"
                >
                  <EmojiPicker theme="auto" onEmojiClick={(e) => setInputText(prev => prev + e.emoji)} width={300} height={350}/>
                </div>
              )}
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend(e)}
                placeholder="Type something..."
                rows={1}
                className="
                  w-full bg-transparent max-h-32 py-2.5 px-2 
                  text-[15px] text-zinc-900 dark:text-white 
                  placeholder-zinc-500 dark:placeholder-zinc-500
                  focus:outline-none resize-none no-scrollbar
                  font-medium
                "
              />
            </div>
            
            <div className="flex items-center gap-1">
              <button 
                type="button" 
                onClick={() => setShowEmoji(!showEmoji)} 
                className="p-2.5 text-zinc-600 dark:text-zinc-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-200 hover:scale-110"
              >
                <Smile size={20}/>
              </button>
              
              {inputText.trim() ? (
                <button 
                  type="submit" 
                  className="p-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 font-semibold"
                >
                  <Send size={18} fill="currentColor"/>
                </button>
              ) : (
                <button 
                  type="button" 
                  className="p-2.5 text-zinc-600 dark:text-zinc-400 hover:scale-110 transition-all duration-200"
                >
                  <Mic size={20}/>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* --- RIGHT PANEL (Profile) --- */}
      {showRightPanel && (
        <div className={`
          fixed inset-y-0 right-0 z-50 w-full md:w-80 md:relative md:rounded-2xl 
          flex flex-col overflow-hidden 
          bg-white/30 dark:bg-zinc-900/40 backdrop-blur-2xl
          border border-white/20 dark:border-zinc-800/50
          shadow-xl
          animate-in slide-in-from-right-full duration-300
          md:animate-in md:fade-in md:duration-200
        `}>
          <div className="h-16 px-6 flex items-center justify-between border-b border-white/10">
            <h3 className="font-semibold text-zinc-900 dark:text-white">Profile</h3>
            <button 
              onClick={() => setShowRightPanel(false)} 
              className="p-2 hover:bg-white/20 dark:hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              <X size={20} className="text-zinc-600 dark:text-zinc-400"/>
            </button>
          </div>

          <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar">
            <div className="flex flex-col items-center p-6 border-b border-white/10">
              <div className="relative mb-4 group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 dark:from-white dark:to-zinc-100 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300"/>
                <img 
                  src={selectedContact.avatar} 
                  className="relative w-24 h-24 rounded-full object-cover border-3 border-white/40 dark:border-white/10 group-hover:scale-105 transition-transform duration-300" 
                  alt="profile" 
                />
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">{selectedContact.name}</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium mb-4">{selectedContact.role}</p>
              
              <p className="text-center text-sm text-zinc-700 dark:text-zinc-300 bg-white/40 dark:bg-black/20 p-3 rounded-xl backdrop-blur-lg border border-white/20 dark:border-white/5">
                "{selectedContact.bio}"
              </p>

              <div className="flex gap-3 mt-6 w-full">
                <button className="flex-1 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg text-sm font-semibold shadow-lg hover:opacity-90 transition-opacity duration-200">
                  Message
                </button>
                <button className="flex-1 py-2.5 bg-white/40 dark:bg-white/10 border border-white/40 dark:border-white/10 rounded-lg text-sm font-semibold hover:bg-white/50 dark:hover:bg-white/15 transition-all duration-200 text-zinc-900 dark:text-white">
                  Call
                </button>
              </div>
            </div>

            <div className="p-4 space-y-4 flex-1">
              <div className="flex gap-1 rounded-lg">
                {['media', 'files', 'links'].map(tab => (
                  <button 
                    key={tab} 
                    onClick={() => setGalleryTab(tab)}
                    className={`
                      flex-1 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all duration-200
                      ${galleryTab === tab 
                        ? 'bg-white/50 dark:bg-zinc-800/60 text-zinc-900 dark:text-white shadow-md' 
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-white/30 dark:hover:bg-white/10'}
                    `}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[1,2,3,4,5,6].map((item) => (
                  <div 
                    key={item} 
                    className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity duration-200 border border-white/20 dark:border-white/10"
                  >
                    <img 
                      src={`https://images.unsplash.com/photo-${1600000000000 + item}?w=200&fit=crop`} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                      alt="media"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes slide-in-from-bottom-2 {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in {
          animation: slide-in-from-bottom-2 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ChatApp;