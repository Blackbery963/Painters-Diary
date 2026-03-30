import React, { useState } from 'react';
import Header from './components/Header';
import CoverSection from './components/CoverSection';
import ProfileInfo from './components/ProfileInfo';
import BentoGrid from './components/BentoGrid';

// --- MOCK DATA ---
const MOCK_USER = {
  username: "Swarnadip",
  nickname: "Black",
  isVerified: true,
  profession: "Hobbyist",
  bio: "Founder and CEO of Painters' Diary",
  stats: { following: 6, followers: 1, posts: 16 },
  location: "Siliguri, West Bengal, India",
  joined: "March 2026",
  portfolio: "https://paintersdiary.com",
  profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
  coverImage: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1600&q=80",
};

export default function Profile() {
  const [activeTab, setActiveTab] = useState('artworks');

  return (
    // Dynamic background and text colors for light/dark mode
    <div className="min-h-screen bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-300">
      
      <Header profileData={MOCK_USER} />

      <main className="pt-20 pb-20 max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
        
        {/* Cover Image */}
        <CoverSection coverImage={MOCK_USER.coverImage} />

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
          
          {/* LEFT: Sidebar Info */}
          <div className="lg:col-span-3">
            <ProfileInfo profileData={MOCK_USER} />
          </div>

          {/* RIGHT: Content & Bento Grid */}
          <div className="lg:col-span-9">
            {/* Custom Tabs */}
            <div className="flex items-center justify-center lg:justify-start gap-8 border-b border-zinc-200 dark:border-zinc-800 mb-6 transition-colors duration-300">
              {['Artworks', 'Videos', 'Store'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`py-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors duration-200 ${
                    activeTab === tab.toLowerCase()
                      ? 'border-zinc-900 text-zinc-900 dark:border-white dark:text-white'
                      : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Grid Area */}
            {activeTab === 'artworks' ? (
              <BentoGrid />
            ) : (
              <div className="text-center py-20 text-zinc-500 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-2xl transition-colors duration-300">
                No {activeTab} yet.
              </div>
            )}
          </div>
          
        </div>
      </main>
    </div>
  );
}