import React, { useState } from 'react';
import { Camera, MoreVertical, CheckCircle2, MapPin, Calendar, Link2, X, UserPen, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SidebarProfile({ profileData }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative flex flex-col items-start text-center lg:text-left px-2">
      
      {/* Avatar */}
      <div className="relative -mt-16 md:-mt-20 mb-4 group cursor-pointer">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-[#09090b] bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative z-10 transition-colors duration-300 shadow-sm">
          <img 
            src={profileData.profileImage} 
            alt={profileData.username} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-1 right-1 z-20 bg-white text-black border border-zinc-200 dark:border-transparent p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
          <Camera size={14} />
        </div>
      </div>

      {/* Header Info */}
      <div className="flex items-start justify-between w-full">
        <div>
          <h1 className="text-2xl font-bold flex items-center justify-start gap-2 text-zinc-900 dark:text-white transition-colors duration-300">
            {profileData.username}
            {profileData.isVerified && <CheckCircle2 size={18} className="text-blue-500 fill-blue-100 dark:fill-blue-500/20" />}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-0.5">@{profileData.nickname}</p>
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
      <div className="mt-3">
        <span className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 transition-colors duration-300">
          {profileData.profession}
        </span>
      </div>
      <p className="mt-4 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed transition-colors duration-300">
        {profileData.bio}
      </p>

      {/* Stats Line */}
      <div className="flex items-center justify-start gap-4 mt-6 py-2 border-y border-zinc-200 dark:border-zinc-800/50 w-full transition-colors duration-300">
        <Stat value={profileData.stats.following} label="Following" />
        <Stat value={profileData.stats.followers} label="Followers" />
        <Stat value={profileData.stats.posts} label="Posts" />
      </div>

      {/* Action Buttons */}
      <div className="w-full flex gap-3 mt-6">
        <button className="flex-1 bg-zinc-900 px-2 text-white dark:bg-white dark:text-black font-semibold py-2.5 rounded-lg text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
          <UserPen/>
          Edit Profile
        </button>
        <button className="flex-1 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white font-semibold py-2.5 rounded-lg text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2">
          <Plus/>
          Post
        </button>
      </div>

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
                <InfoRow icon={MapPin} text={profileData.location} />
                <InfoRow icon={Calendar} text={`Joined ${profileData.joined}`} />
                <a href={profileData.portfolio} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  <Link2 size={18} /> {new URL(profileData.portfolio).hostname}
                </a>
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
    <span className="text-zinc-500 dark:text-zinc-400">{label}</span>
  </div>
);

const InfoRow = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300">
    <Icon size={18} className="text-zinc-400 dark:text-zinc-500" />
    <span>{text}</span>
  </div>
);