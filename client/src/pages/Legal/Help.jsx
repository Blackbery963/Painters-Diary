// This page is dedicated to send a mail directly to the main company's email of any problem about the site ....
import { useState } from 'react';
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import { User } from 'lucide-react';
import { Link } from 'react-router-dom';

function Help() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
        setFormStatus('Message sent successfully.');
        setIsSubmitting(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setFormStatus(''), 4000);
    }, 1500);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 transition-colors duration-300 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800">
      <nav className=' w-full border-b py-4 lg:px-12 px-4 border-zinc-800 dark:border-zinc-500'>
        <div className=' flex items-center justify-between '>
        <Link to={"/"}>
       <h1 className=' font-semibold text-xl font-Eagle tracking-tight'>
        Painters' Diary
       </h1>
       </Link>
       <Link to={"/account"}>
       <div className=' dark:text-zinc-400 text-zinc-800'>
        <User/>
       </div>
       </Link>
      </div>
       
      </nav>
      {/* 1. Minimal Header */}
      <div className="w-full py-20 px-6 border-b border-zinc-100 dark:border-zinc-900">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            initial="hidden" animate="visible" variants={fadeInUp}
            className="text-4xl font-bold tracking-tight mb-4 text-black dark:text-white"
          >
            Contact & Support
          </motion.h1>
          <motion.p 
            initial="hidden" animate="visible" variants={fadeInUp}
            className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto text-lg font-light"
          >
            We are here to help. Reach out to us for inquiries, support, or just to say hello.
          </motion.p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-16">
        
        {/* 2. Info Grid - Clean Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <InfoCard 
                icon={<FaEnvelope />} 
                title="Email Us" 
                content="support@paintersdiary.com" 
                subContent="Response within 24h"
            />
            <InfoCard 
                icon={<FaPhoneAlt />} 
                title="Call Us" 
                content="+1 (555) 000-0000" 
                subContent="Mon-Fri, 9am - 6pm"
            />
            <InfoCard 
                icon={<FaMapMarkerAlt />} 
                title="Visit Us" 
                content="94 Broadway St, SoHo" 
                subContent="New York, NY 10001"
            />
        </div>

        {/* 3. Split Layout: Form & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left: Contact Form */}
          <div className="lg:col-span-7">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                Send a Message
                <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800"></span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                      placeholder="How can we help?"
                    />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="6"
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors resize-none"
                    placeholder="Write your message here..."
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                    {formStatus ? (
                        <p className="text-sm text-green-600 dark:text-green-400 font-medium animate-pulse">{formStatus}</p>
                    ) : (
                        <span></span>
                    )}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 text-sm font-bold tracking-wide uppercase hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50"
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Right: Sidebar / FAQ / Hours */}
          <div className="lg:col-span-5 space-y-12">
            
            {/* Hours */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
               <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                 <FaClock className="text-zinc-400" size={16} /> Opening Hours
               </h3>
               <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
                  <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-900 pb-2">
                    <span>Monday - Friday</span>
                    <span className="text-zinc-900 dark:text-white font-medium">09:00 — 18:00</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-900 pb-2">
                    <span>Saturday</span>
                    <span className="text-zinc-900 dark:text-white font-medium">10:00 — 16:00</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-900 pb-2">
                    <span>Sunday</span>
                    <span className="text-zinc-400">Closed</span>
                  </div>
               </div>
            </motion.div>

            {/* FAQ Mini */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.1 }}>
               <h3 className="text-lg font-bold mb-6">Common Questions</h3>
               <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-white mb-1">How is shipping handled?</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">As a direct-to-artist marketplace, shipping is coordinated directly between you and the seller. Please contact the artist for delivery estimates and international shipping options.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-white mb-1">What is the return policy?</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">Return policies vary by artist. We do not enforce a platform-wide return policy; please clarify terms with the seller prior to purchase to ensure a smooth transaction.</p>
                  </div>
               </div>
            </motion.div>

          </div>
        </div>
      </main>
    </div>
  );
}

// Sub-component for the top grid
const InfoCard = ({ icon, title, content, subContent }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex flex-col items-center text-center p-8 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-sm"
  >
    <div className="mb-4 text-zinc-400 dark:text-zinc-500 text-2xl">
      {icon}
    </div>
    <h3 className="font-bold text-lg mb-1 text-zinc-900 dark:text-white">{title}</h3>
    <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{content}</p>
    <p className="text-xs text-zinc-500 mt-1">{subContent}</p>
  </motion.div>
);

export default Help;