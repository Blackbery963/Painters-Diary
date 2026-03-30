import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Image as ImageIcon, 
  ArrowRight, 
  PenTool, 
  Users, 
  BookOpen,
  Sparkles
} from 'lucide-react';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import Hero from './Components/Hero';

export default function LandingPage() {
  // Reusable animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-black overflow-x-hidden transition-colors duration-300">
      <Header />
      {/* Hero Section */}
      <section className="relative  pb-20 lg:pt-56 lg:pb-32 px-6 lg:px-12 flex flex-col items-center text-center">
        <Sidebar/>
        <Hero/>
        {/* <motion.div 
          initial="hidden" animate="visible" variants={fadeUp}
          className="max-w-4xl mx-auto z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200/50 dark:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-800 text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 mb-8 backdrop-blur-sm">
            <Sparkles className="w-3 h-3" />
            <span>The Canvas Awaits</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white mb-8 leading-[1.1]">
            Document your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500">
              creative journey.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            A minimalist sanctuary for artists to share their work, maintain a visual diary, and connect with a global community of creators. No distractions, just art.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth/signup" className="w-full sm:w-auto px-8 py-4 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2 group">
              Start Your Diary
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/explore" className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-zinc-200 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-white text-zinc-900 dark:text-white font-bold rounded-xl transition-all flex items-center justify-center">
              Explore Gallery
            </Link>
          </div>
        </motion.div> */}

        {/* Hero Background Image - Grayscaled */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 dark:opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-linear-to-b from-zinc-50 via-zinc-50/80 to-zinc-50 dark:from-black dark:via-black/80 dark:to-black z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2000&auto=format&fit=crop" 
            alt="Abstract art background" 
            className="w-full h-full object-cover grayscale blur-[2px]"
          />
        </div>
      </section>
        

      {/* Bento Grid Features Section */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          className="mb-16 text-center sm:text-left"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Everything an artist needs.
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Purpose-built tools designed to showcase your process and final pieces.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]"
        >
          {/* Feature 1: Large Card */}
          <motion.div variants={fadeUp} className="md:col-span-2 bg-zinc-100 dark:bg-zinc-900/50 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between group overflow-hidden relative">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white dark:bg-zinc-950 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                <BookOpen className="w-6 h-6 text-zinc-900 dark:text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Visual Journaling</h3>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-md">
                Document your works in progress, share your thoughts, and keep a timeline of your artistic evolution.
              </p>
            </div>
            {/* Decorative background element */}
            <div className="absolute right-0 bottom-0 w-2/3 h-2/3 bg-linear-to-tl from-zinc-300/50 dark:from-zinc-800/50 to-transparent rounded-tl-[100px] z-0 group-hover:scale-105 transition-transform duration-700"></div>
          </motion.div>

          {/* Feature 2: Tall Card */}
          <motion.div variants={fadeUp} className="md:row-span-2 bg-zinc-900 dark:bg-zinc-950 rounded-3xl p-8 border border-zinc-800 dark:border-zinc-800 flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?q=80&w=800&auto=format&fit=crop" 
              alt="Artist workspace" 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-zinc-900/80 to-transparent dark:from-black dark:via-black/80"></div>
            
            <div className="relative z-10 mt-auto">
              <div className="w-12 h-12 bg-zinc-800 dark:bg-zinc-900 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Community</h3>
              <p className="text-zinc-400">
                Connect with artists worldwide. Collaborate on projects and find your creative tribe.
              </p>
            </div>
          </motion.div>

          {/* Feature 3: Small Card */}
          <motion.div variants={fadeUp} className="bg-white dark:bg-zinc-900/50 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-950 rounded-xl flex items-center justify-center mb-6">
                <PenTool className="w-6 h-6 text-zinc-900 dark:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Portfolio Ready</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                High-resolution image support with an undistracted, minimalist viewing experience.
              </p>
            </div>
          </motion.div>

          {/* Feature 4: Small Card */}
          <motion.div variants={fadeUp} className="bg-white dark:bg-zinc-900/50 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-center items-center text-center">
             <h3 className="text-4xl font-black mb-2">100%</h3>
             <p className="text-zinc-600 dark:text-zinc-400 font-medium uppercase tracking-widest text-sm">Focus on Art</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6 lg:px-12 border-t border-zinc-200 dark:border-zinc-900">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-8">
            Ready to show your work?
          </h2>
          <Link to="/signup" className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black font-bold rounded-xl transition-all">
            Create Free Account
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      {/* Simple Footer */}
      <footer className="py-8 text-center border-t border-zinc-200 dark:border-zinc-900 text-sm text-zinc-500 font-medium">
        <p>© {new Date().getFullYear()} Painters' Diary. All rights reserved.</p>
      </footer>
    </div>
  );
}




