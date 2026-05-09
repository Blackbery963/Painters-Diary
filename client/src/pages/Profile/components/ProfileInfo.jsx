import React, { useEffect, useState } from 'react';
import { Camera, MoreVertical, CheckCircle2, MapPin, Calendar, Link2, X, UserPen, Plus, Search, Scan, Instagram, Twitch, Linkedin, Youtube, Twitter, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { accessTokenStore } from '../../../utils/tokenStore.utils';
import { getProfileInfo } from '../../../service/profile.service';

export default function SidebarProfile({ profileData }) {
  const [showModal, setShowModal] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false); // ✅ Added Lightbox State
  const [postCount, setPostCount] = useState(0);
  const [user, setUser] = useState(null);

  // const Social = [
  //   {name: "Instagram", icon: Instagram, url: `https://instagram.com/${user?.instagram}`},
  //   {name: "Twitter", icon: Twitter, url: `https://x.com/${user?.twitter}`},
  //   {name: "LinkdIn", icon: Linkedin, url: `https://linkdin.com/${user?.linkdin}`},
  //   {name: "YouTube", icon: Youtube, url: `https://youtube.in/${user?.youtube}`}
  // ]
  const Social = [
      {
    name: "Faceebook",
    icon: Facebook,
    url: user?.facebook
      ? user.faceboook.startsWith("http")
        ? user.facebook
        : `https://facebook.com/${user.facebook}`
      : null
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: user?.instagram
      ? user.instagram.startsWith("http")
        ? user.instagram
        : `https://instagram.com/${user.instagram}`
      : null
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: user?.twitter
      ? user.twitter.startsWith("http")
        ? user.twitter
        : `https://x.com/${user.twitter}`
      : null
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: user?.linkedin
      ? user.linkedin.startsWith("http")
        ? user.linkedin
        : `https://linkedin.com/in/${user.linkedin}`
      : null
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: user?.youtube
      ? user.youtube.startsWith("http")
        ? user.youtube
        : `https://youtube.com/@${user.youtube}`
      : null
  }
];

  // Fetching user id to get user info 
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfileInfo();
        setUser(data.user); 
      } catch (error) {
        console.log("Failed to load profile info", error);
      }
    }
    loadProfile();
  }, []);

  useEffect(() => {
    const fetchPostCount = async () => { 
      const token = accessTokenStore.get();
      if (!token) return;

      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/post/get-posts`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.ok) {
          const data = await res.json();
          
          if (Array.isArray(data)) {
            setPostCount(data.length);
          } else if (data.posts && Array.isArray(data.posts)) {
            setPostCount(data.posts.length);
          } else if (data.data && Array.isArray(data.data)) {
            setPostCount(data.data.length);
          } else if (typeof data.totalPosts === 'number') {
             setPostCount(data.totalPosts);
          }
        }
      } catch (error) {
        console.error("Failed to load stats", error);
      }
    };
    
    fetchPostCount();
  }, []);

  // Safe fallback for the avatar to ensure it always renders something clean
  const displayAvatar = user?.avatar || `https://ui-avatars.com/api/?name=${user?.username || 'A'}&background=random&size=512`;

  return (
    <div className="relative flex flex-col items-start text-center lg:text-left px-2">
      
      {/* Avatar Container with Hover Effect */}
      <div 
        className="relative -mt-16 md:-mt-20 mb-4 group cursor-pointer"
        onClick={() => setShowLightbox(true)}
      >
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-[#09090b] bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative z-10 transition-transform duration-300 shadow-sm group-hover:scale-105">
          <img 
            src={displayAvatar} 
            alt={user?.username} 
            className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
            // Adding a high-res fetch priority helps if images load blurry initially
            fetchPriority="high" 
          />
          {/* Subtle overlay icon on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <Scan size={28} className="text-white drop-shadow-lg" strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Header Info */}
      <div className="flex items-start justify-between w-full">
        <div>
          <h1 className="text-2xl font-bold flex items-center font-Quicksand justify-start gap-2 text-zinc-900 dark:text-white transition-colors duration-300">
            {user?.username || "Loading..."}
            {profileData?.isVerified && <CheckCircle2 size={18} className="text-blue-500 fill-blue-100 dark:fill-blue-500/20" />}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-0.5 text-start">@{user?.nickname || "artist"}</p>
        </div>
        
        {/* Three Dots Button */}
        <button 
          onClick={() => setShowModal(true)}
          className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors duration-200"
        >
          <MoreVertical size={18} />
        </button>
      </div>

      {/* Badge & Bio */}
      <div className="mt-2 flex items-center justify-center">
        <span className="px-1 pt-1 rounded text-[12px] tracking-wider border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 transition-colors duration-300">
          {user?.profession || "Artist"}
        </span>
      </div>
      <p className="mt-4 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed transition-colors duration-300">
        {user?.bio || "No bio available."}
      </p>

      {/* Stats Line */}
      <div className="flex items-center justify-start gap-4 mt-6 py-2 border-y border-zinc-200 dark:border-zinc-800/50 w-full transition-colors duration-300">
        <Stat value={profileData?.stats?.following || 0} label="Following" />
        <Stat value={profileData?.stats?.followers || 0} label="Followers" />
        <Stat value={postCount} label="Posts" />
      </div>

      {/* Action Buttons */}
      <div className="w-full flex gap-3 mt-6">
        <Link
         to={'/profile/edit'}
         className='flex-1 bg-zinc-900 px-2 text-white dark:bg-white dark:text-black font-semibold py-1.5 rounded-lg text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2'>
          <UserPen size={18} />
          Edit Profile
        </Link>
        
        <Link to={'/upload'}
        className='flex-1 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white font-semibold py-1.5 rounded-lg text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2'>
          <Plus size={18} />
          Post
        </Link>
      </div>

      {/* ✅ HIGH-END GLASSY LIGHTBOX MODAL */}
      <AnimatePresence>
        {showLightbox && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            {/* Blurry Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-zinc-900/80 dark:bg-black/80 backdrop-blur-xl"
              onClick={() => setShowLightbox(false)}
            />
            
            {/* Image Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl flex items-center justify-center z-10"
            >
              <img 
                src={displayAvatar} 
                alt={`${user?.username} large`} 
                className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/10 dark:border-zinc-700/50"
              />
              
              {/* Floating Close Button */}
              <button 
                onClick={() => setShowLightbox(false)} 
                className="absolute -top-12 right-0 md:-right-12 md:-top-0 p-2 text-zinc-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all border border-white/10"
              >
                <X size={24} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MORE INFO MODAL */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 dark:bg-black/80 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-10 transition-colors duration-300"
            >
              <div className="flex justify-between items-center p-4 border-b border-zinc-100 dark:border-zinc-800">
                <h3 className="font-bold text-zinc-900 dark:text-white">About</h3>
                <button onClick={() => setShowModal(false)} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className=' text-start'>Social</h3>
                  <div className=' flex items-center justify-start gap-2'>
                    {Social.map((item, index) => {
                      if(!item.url) return null;
                      const Icon = item.icon;
                      return (
                        <a
                        key={index}
                        href={item.url}
                        target= "_blank"
                        rel='noreferrer'
                        title= {item.name}
                        className=' p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors'
                        >
                          <Icon size={18}/>
                         </a>
                      )
                    })}
                  </div>
                </div>
                <InfoRow icon={MapPin} text={user?.location || "Not specified"} />
                <InfoRow icon={Calendar} text={`Joined ${user?.createdAt ? new Date(user.createdAt).getFullYear() : 'recently'}`} />
                {user?.portfolio && (
                  <a href={user.portfolio} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    <Link2 size={18} /> 
                    {(() => {
                      try { return new URL(user.portfolio).hostname; } 
                      catch { return user.portfolio; }
                    })()}
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const Stat = ({ value, label }) => (
  <div className="flex items-center gap-1.5 text-sm">
    <span className="font-bold text-zinc-900 dark:text-white">{value}</span>
    <span className="text-zinc-500 dark:text-zinc-400 ">{label}</span>
  </div>
);

const InfoRow = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300">
    <Icon size={18} className="text-zinc-400 dark:text-zinc-500" />
    <span>{text}</span>
  </div>
);