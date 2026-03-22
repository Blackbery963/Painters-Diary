import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Home, 
  BookOpen, 
  Image as ImageIcon, 
  Info,
  User
} from 'lucide-react';

// Your existing FAQ data
const faqSections = [
  {
    title: "Getting to Know Painters' Diary",
    questions: [
      { q: "What is Painters' Diary?", a: "Painters' Diary is an art-focused platform for artists to share their work, maintain a visual diary, and collaborate with other creatives. It's designed to foster a supportive community where artists can showcase their portfolios, document their creative process, and connect with like-minded individuals." },
      { q: "Who can join Painters' Diary?", a: "Any artist from anywhere in the world can join, whether you’re a painter, illustrator, digital artist, sculptor, photographer, or creator of any kind. We welcome beginners, hobbyists, and professionals alike." },
      { q: "Do I need to be a professional artist to join?", a: "No, absolutely not! Painters' Diary is open to artists at all levels, from beginners exploring their creativity to seasoned professionals. Our goal is to create an inclusive space for everyone passionate about art." },
      { q: "How do I sign up for Painters' Diary?", a: "Signing up is easy! Click on the 'Sign Up' button on our homepage, provide your email address, create a username and password, and verify your email. You can also sign up using Google or Apple accounts for quicker access." },
      { q: "Is Painters' Diary free to use?", a: "Yes, all core features of Painters' Diary are free, including uploading artwork, maintaining a diary, and basic collaborations. We may introduce premium features in the future for enhanced tools, but the essentials will always remain free." },
      { q: "Can I follow other artists?", a: "Yes, following artists is a great way to stay inspired and engaged. Follow your favorite creators and receive updates on their latest works, diary entries, and collaborations directly in your feed." }
    ]
  },
  {
    title: "Share Your Art with the World",
    questions: [
      { q: "How do I upload my artwork?", a: "Once registered, navigate to the 'Upload' page from your dashboard. Select your file, add details like title, description, tags, medium, and dimensions, then click 'Publish'. Your artwork will appear in your profile and the community feed." },
      { q: "What types of files are supported?", a: "We support JPEG, PNG, GIF, and limited video formats like MP4 for short clips (up to 30 seconds). Files are automatically optimized for web display while preserving quality." },
      { q: "Is there a size limit for uploads?", a: "Yes, individual files should be under 50MB. For larger works, we recommend compressing your images or splitting into multiple uploads. Premium users (coming soon) may have higher limits." },
      { q: "How do I tag mature or sensitive content?", a: "When uploading, you can select a 'Mature Content' flag. This ensures the artwork is only visible to users who have opted in to view such content, helping maintain a safe community environment." },
      { q: "Can I edit or delete my uploads?", a: "Yes, you have full control. From your profile dashboard, select the artwork and choose to edit details or delete it permanently. Note that deletions are irreversible." },
      { q: "Can I sell my artwork?", a: "This feature is in development and expected to launch in early 2026! In the meantime, you can link to external shops like Etsy in your artwork descriptions." }
    ]
  },
  {
    title: "Your Artistic Diary",
    questions: [
      { q: "What is a Diary entry?", a: "A Diary entry is a personal visual journal where you can share ideas, progress sketches, thoughts, inspirations, or behind-the-scenes stories. It's like a digital sketchbook combined with a blog." },
      { q: "How often can I post diary entries?", a: "There's no limit—post as often as you like! Many artists use it daily for reflections, weekly for progress updates, or sporadically for major milestones." },
      { q: "Are diary entries public?", a: "By default, they are public to inspire others, but you can set entries to private (visible only to you) or share with specific followers for more controlled visibility." },
      { q: "Can I add sketches, photos, or multiple images to my diary?", a: "Yes! Each entry supports multiple images, text, embeds (like videos), and tags for organization. You can even create series of entries for ongoing projects." },
      { q: "How can I organize my diary entries?", a: "Use tags, categories, or create collections. Search functionality in your profile allows quick access to past entries by date, tag, or keyword." }
    ]
  },

  {
    title: "Collaborate and Connect",
    questions: [
      { q: "How can I find collaborators?", a: "Browse the 'Collaborate' section to view artist profiles, post requests in the collaboration forum, or search by skills, location, or medium. Join community events for networking opportunities." },
      { q: "Can we work on shared projects?", a: "Yes! Start or join collaborative projects where multiple artists can contribute artwork, diary entries, and comments in a shared space. Version history tracks changes." },
      { q: "Is there a limit to the number of collaborators on a project?", a: "Currently, up to 10 collaborators per project to keep things manageable, but this can be expanded for larger initiatives upon request." },
      { q: "Is there a messaging feature?", a: "Direct messaging is coming soon in our next update. For now, use profile contact links or comment on posts to connect." },
      { q: "Can I collaborate across countries?", a: "Absolutely! Our platform supports global collaboration with features like time zone awareness and multilingual tags." }
    ]
  },

  {
    title: "Account and Profile Management",
    questions: [
      { q: "How do I customize my profile?", a: "From your account settings, upload a profile picture, banner, bio, and links to social media or websites. You can also set themes and privacy preferences." },
      { q: "Can I change my username?", a: "Yes, once every 6 months. Go to account settings and request a change—availability is checked automatically." },
      { q: "How do I reset my password?", a: "Click 'Forgot Password' on the login page, enter your email, and follow the reset link sent to you." },
      { q: "Can I make my profile private?", a: "Profiles are public by default, but you can set certain sections (like diary or uploads) to private or followers-only." },
      { q: "How do I delete my account?", a: "From account settings, select 'Delete Account'. This permanently removes all data after a 30-day grace period for recovery." }
    ]
  },
  {
    title: "Policies and Guidelines",
    questions: [
      { q: "What content is allowed on Painters' Diary?", a: "We allow original artwork, sketches, and creative content. Prohibited: Hate speech, explicit violence, or non-artistic spam. All uploads must comply with copyright laws." },
      { q: "How does Painters' Diary handle copyright issues?", a: "Users must upload only their own work or with permission. We use automated tools to detect infringements and respond to DMCA notices promptly." },
      { q: "What happens if my content is reported?", a: "Reports are reviewed by moderators. If violated, content may be removed, and repeated offenses could lead to account suspension." }
    ]
  },
  {
    title: "Technical Support",
    questions: [
      { q: "What browsers are supported?", a: "We recommend the latest versions of Chrome, Firefox, Safari, or Edge for the best experience." },
      { q: "Is there a mobile app?", a: "Our mobile app is in beta for iOS and Android. Download from the App Store or Google Play, or use our responsive web version." },
      { q: "What if I encounter a bug?", a: "Report it via the 'Help' section or email support@paintersdiary.com. Include screenshots and details for faster resolution." },
      { q: "How secure is my data?", a: "We use industry-standard encryption, regular backups, and comply with GDPR for data protection." }
    ]
  }
];

export default function FAQs() {
  const [openQuestions, setOpenQuestions] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleQuestion = (sectionIdx, qIdx) => {
    const key = `${sectionIdx}-${qIdx}`;
    setOpenQuestions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  // Animation variants for smoother transitions
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className='min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-300 overflow-x-hidden'>
      
      {/* Sleek Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-900 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-zinc-900 dark:bg-white p-1.5 rounded-md transition-transform group-hover:scale-105">
                <ImageIcon className="w-5 h-5 text-white dark:text-black" />
              </div>
              <span className="text-xl font-black tracking-tight text-zinc-900 dark:text-white font-Eagle">
                Painters' Diary
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className='hidden md:flex items-center gap-8'>
        
              <Link to="/About" className='text-sm font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors'>
                <Info className="w-5 h-5" />
              </Link>
              <Link to="/Account" className='text-sm font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors'>
                <User className="w-5 h-5" />
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button className='md:hidden p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white' onClick={toggleMenu}>
              {isMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className='md:hidden bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-900 overflow-hidden'
            >
              <div className='flex flex-col items-center gap-6 py-6'>
                <Link to="/" className='flex items-center gap-2 text-zinc-600 dark:text-zinc-300' onClick={toggleMenu}>
                  <Home className="w-5 h-5" /> <span>Home</span>
                </Link>
                <Link to="/Journal" className='flex items-center gap-2 text-zinc-600 dark:text-zinc-300' onClick={toggleMenu}>
                  <BookOpen className="w-5 h-5" /> <span>Diary</span>
                </Link>
                <Link to="/About" className='text-sm font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-300' onClick={toggleMenu}>
                  About
                </Link>
                <Link to="/Account" className='text-sm font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-300' onClick={toggleMenu}>
                  Account
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Simplified Minimalist Hero Section */}
      <section className='pt-32 pb-16 px-4 md:pt-40 md:pb-24 flex flex-col justify-center items-center text-center'>
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="max-w-2xl"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4 block">
            Support Center
          </span>
          <h1 className='text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6'>
            Frequently Asked Questions
          </h1>
          <p className='text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed'>
            Everything you need to know about navigating and making the most out of your Painters' Diary experience.
          </p>
        </motion.div>
      </section>

      {/* FAQ Sections */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {faqSections.map((section, sectionIdx) => (
          <motion.section 
            key={sectionIdx} 
            className='mb-16'
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <h2 className='text-2xl font-bold text-zinc-900 dark:text-white mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4'>
              {section.title}
            </h2>
            <div className='space-y-4'>
              {section.questions.map((item, qIdx) => {
                const key = `${sectionIdx}-${qIdx}`;
                const isOpen = openQuestions[key];
                
                return (
                  <div 
                    key={qIdx} 
                    className='bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700'
                  >
                    <button 
                      onClick={() => toggleQuestion(sectionIdx, qIdx)}
                      className='w-full p-6 flex justify-between items-center text-left text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100 focus:outline-none'
                    >
                      <span className="pr-4">{item.q}</span>
                      <ChevronDown 
                        className={`w-5 h-5 shrink-0 text-zinc-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-zinc-900 dark:text-white' : ''}`} 
                      />
                    </button>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className='px-6 pb-6 text-zinc-600 dark:text-zinc-400 leading-relaxed'>
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.section>
        ))}

        {/* Footer / CTA */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
          className="text-center pt-8 border-t border-zinc-200 dark:border-zinc-800"
        >
          <p className='text-zinc-600 dark:text-zinc-400'>
            Still have questions?{' '}
            <Link to="/Contact" className='font-semibold text-zinc-900 dark:text-white underline underline-offset-4 hover:text-zinc-500 dark:hover:text-zinc-300 transition-colors'>
              Contact support
            </Link>
          </p>
        </motion.section>
      </div>
    </div>
  );
}