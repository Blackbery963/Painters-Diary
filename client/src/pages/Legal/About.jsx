

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, Image as ImageIcon, Palette, Globe, BookOpen, 
  Feather, Layers, Zap, ArrowRight, PenTool, History 
} from 'lucide-react';

function About() {
  
  // --- ANIMATIONS ---
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-200 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800 transition-colors duration-500">
      
      {/* --- HEADER (Clean & Minimal) --- */}
      <header className='fixed top-0 w-full bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-900 z-50'>
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to='/' className='flex items-center gap-2 group'>
            <div className="w-7 h-7 bg-black dark:bg-white rounded-md flex items-center justify-center text-white dark:text-black font-serif font-bold text-lg group-hover:rotate-3 transition-transform">P</div>
            <span className='text-lg font-bold font-Eagle tracking-tight text-black dark:text-white '>Painters' Diary</span>
          </Link>

          {/* Actions (Only Account & Gallery) */}
          <div className='flex items-center gap-3'>
            <Link to='/Landscape'>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                <ImageIcon size={14} />
                <span className="hidden sm:inline">Gallery</span>
              </button>
            </Link>
            <Link to='/Account'>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition-opacity">
                <User size={14} />
                <span className="hidden sm:inline">Account</span>
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-20 px-4">
        
        {/* --- HERO SECTION (Compact) --- */}
        <section className="max-w-4xl mx-auto text-center mb-20">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <h1 className="text-4xl md:text-6xl font-serif font-medium text-black dark:text-white mb-4 tracking-tight">
              Archive. Connect. <span className="italic text-zinc-400">Create.</span>
            </h1>
            <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Painters' Diary is a digital sanctuary for the modern artist. We strip away the noise of social media to focus on what matters: the integrity of your work and the depth of your process.
            </p>
          </motion.div>
        </section>

        {/* --- BENTO GRID (Rectangular & Dense) --- */}
        <section className="max-w-6xl mx-auto mb-20">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            
            {/* Card 1: Wide Introduction */}
            <motion.div variants={fadeIn} className="lg:col-span-2 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 flex flex-col justify-between min-h-[180px] group hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <div className="flex justify-between items-start">
                <Palette className="text-zinc-400 dark:text-zinc-600 mb-4 group-hover:text-black dark:group-hover:text-white transition-colors" size={24} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Core Vision</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-black dark:text-white mb-1">A Curated Ecosystem</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Designed for painters, illustrators, and digital artists. We prioritize high-resolution viewing and distraction-free layouts to honor your craft.
                </p>
              </div>
            </motion.div>

            {/* Card 2: Journaling */}
            <motion.div variants={fadeIn} className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 min-h-[180px] group hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <BookOpen className="text-zinc-400 dark:text-zinc-600 mb-8 group-hover:text-black dark:group-hover:text-white transition-colors" size={24} />
              <h3 className="text-sm font-bold text-black dark:text-white mb-1">The Journal</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Document the "why" behind the "what". A space for sketches and thoughts.
              </p>
            </motion.div>

            {/* Card 3: Global Reach */}
            <motion.div variants={fadeIn} className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 min-h-[180px] group hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <Globe className="text-zinc-400 dark:text-zinc-600 mb-8 group-hover:text-black dark:group-hover:text-white transition-colors" size={24} />
              <h3 className="text-sm font-bold text-black dark:text-white mb-1">Global Reach</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Connect with galleries and collectors from over 50 countries.
              </p>
            </motion.div>

            {/* Card 4: Tools (Tall/Wide) */}
            <motion.div variants={fadeIn} className="lg:col-span-2 bg-black dark:bg-white rounded-xl p-6 text-white dark:text-black flex flex-col justify-between min-h-[160px] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
                <PenTool size={64} />
              </div>
              <div className="relative z-10">
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-2 block">For Professionals</span>
                <h3 className="text-xl font-serif font-bold mb-2">Portfolio Management</h3>
                <p className="text-xs opacity-80 max-w-sm">
                  Generate professional CVs, track inventory, and manage commission requests directly from your dashboard.
                </p>
              </div>
            </motion.div>

            {/* Card 5: Community */}
            <motion.div variants={fadeIn} className="lg:col-span-2 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 flex items-center gap-6 group hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
               <div className="w-12 h-12 bg-white dark:bg-black rounded-full flex items-center justify-center shrink-0 border border-zinc-200 dark:border-zinc-700">
                 <Zap size={20} className="text-black dark:text-white" />
               </div>
               <div>
                 <h3 className="text-sm font-bold text-black dark:text-white mb-1">Critique & Connect</h3>
                 <p className="text-xs text-zinc-500 dark:text-zinc-400">
                   Get feedback from verified peers. Build a network based on skill, not algorithms.
                 </p>
               </div>
            </motion.div>

          </motion.div>
        </section>

        {/* --- INFO STRIP (Timeline/Stats) --- */}
        <section className="max-w-6xl mx-auto border-t border-b border-zinc-100 dark:border-zinc-900 py-12 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h4 className="text-2xl font-serif font-bold text-black dark:text-white mb-1">2025</h4>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500">Established</p>
            </div>
            <div>
              <h4 className="text-2xl font-serif font-bold text-black dark:text-white mb-1">10k+</h4>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500">Artworks</p>
            </div>
            <div>
              <h4 className="text-2xl font-serif font-bold text-black dark:text-white mb-1">2.5k</h4>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500">Artists</p>
            </div>
            <div>
              <h4 className="text-2xl font-serif font-bold text-black dark:text-white mb-1">100%</h4>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500">Independent</p>
            </div>
          </div>
        </section>

        {/* --- ROADMAP / FUTURE --- */}
        <section className="max-w-4xl mx-auto">
           <div className="flex items-center gap-2 mb-6">
             <Layers size={16} className="text-zinc-400"/>
             <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">The Roadmap</h3>
           </div>
           
           <div className="space-y-6">
             <div className="flex gap-4 items-start">
               <div className="w-16 pt-1 text-xs font-bold text-zinc-400 text-right">Q1 2025</div>
               <div className="flex-1 pb-6 border-b border-zinc-100 dark:border-zinc-900">
                 <h4 className="text-sm font-bold text-black dark:text-white mb-1">Platform Launch</h4>
                 <p className="text-xs text-zinc-500">Initial release of Gallery and Journal features. Beta access for founding members.</p>
               </div>
             </div>
             <div className="flex gap-4 items-start">
               <div className="w-16 pt-1 text-xs font-bold text-zinc-400 text-right">Q3 2025</div>
               <div className="flex-1 pb-6 border-b border-zinc-100 dark:border-zinc-900">
                 <h4 className="text-sm font-bold text-black dark:text-white mb-1">Marketplace Integration</h4>
                 <p className="text-xs text-zinc-500">Direct-to-collector sales with 0% commission for verified artists.</p>
               </div>
             </div>
             <div className="flex gap-4 items-start">
               <div className="w-16 pt-1 text-xs font-bold text-zinc-400 text-right">2026</div>
               <div className="flex-1">
                 <h4 className="text-sm font-bold text-black dark:text-white mb-1">Physical Exhibitions</h4>
                 <p className="text-xs text-zinc-500">Partnering with galleries in NY, London, and Tokyo for digital-physical hybrid shows.</p>
               </div>
             </div>
           </div>
        </section>

      </main>

      {/* --- FOOTER (Minimal) --- */}
      <footer className="border-t border-zinc-100 dark:border-zinc-900 py-8 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 opacity-50">
            <div className="w-4 h-4 bg-black dark:bg-white rounded-sm"></div>
            <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Painters' Diary © 2025</span>
          </div>
          <div className="flex gap-6">
             <Link to="/Legal/Privacy" className="text-[10px] uppercase font-bold text-zinc-400 hover:text-black dark:hover:text-white transition-colors">Privacy</Link>
             <Link to="/Legal/Terms" className="text-[10px] uppercase font-bold text-zinc-400 hover:text-black dark:hover:text-white transition-colors">Terms</Link>
             <Link to="/Legal/Contact" className="text-[10px] uppercase font-bold text-zinc-400 hover:text-black dark:hover:text-white transition-colors">Support</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default About;