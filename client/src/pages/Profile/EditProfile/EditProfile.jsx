// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   User, MapPin, Globe, Briefcase, Palette, 
//   ChevronLeft, Search, X, Facebook, Instagram, Twitter, Linkedin,
//   LayoutGrid, Link2, UserCheck, UserCircle
// } from 'lucide-react';
// import Logo from '../../../assets/Logo.jpeg'

// // --- Toast Notification Component ---
// const Toast = ({ message, type, onClose }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 50 }}
//     animate={{ opacity: 1, y: 0 }}
//     exit={{ opacity: 0, y: 20 }}
//     className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-xl backdrop-blur-md border ${
//       type === 'success' 
//         ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
//         : 'bg-red-500/10 border-red-500/20 text-red-500'
//     } flex items-center gap-3 z-50`}
//   >
//     <div className={`w-2 h-2 rounded-full ${type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`} />
//     <span className="font-medium">{message}</span>
//     <button onClick={onClose} className="ml-4 opacity-50 hover:opacity-100">
//       <X size={14} />
//     </button>
//   </motion.div>
// );

// // --- Helper Components ---
// const SectionTitle = ({ icon: Icon, title, subtitle }) => (
//   <div className="flex items-start gap-3 mb-6">
//     <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400">
//       <Icon size={20} />
//     </div>
//     <div>
//       <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
//       <p className="text-sm text-zinc-500 dark:text-zinc-400">{subtitle}</p>
//     </div>
//   </div>
// );

// const InputField = ({ label, name, value, onChange, placeholder, prefix, type = "text" }) => (
//   <div className="group">
//     <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1.5 ml-1">
//       {label}
//     </label>
//     <div className="relative flex items-center">
//       {prefix && (
//         <span className="absolute left-3 text-zinc-400 select-none pointer-events-none">
//           {prefix}
//         </span>
//       )}
//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         className={`w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-transparent transition-all ${prefix ? 'pl-8' : ''}`}
//       />
//     </div>
//   </div>
// );

// const SocialInput = ({ icon: Icon, name, placeholder, value, onChange }) => (
//   <div className="relative group">
//     <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-800 dark:group-focus-within:text-zinc-200 transition-colors">
//       <Icon size={18} />
//     </div>
//     <input
//       type="text"
//       name={name}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
//     />
//   </div>
// );

// // --- Main Header Component ---
// const TopHeader = () => (
//   <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
//     <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
//       <Link to="/" className="flex items-center gap-2.5 text-zinc-900 dark:text-white group">
//         <div className="h-8 w-8 overflow-hidden bg-zinc-900 dark:bg-white rounded-lg text-white dark:text-zinc-900 group-hover:scale-105 transition-transform">
//           <img src={Logo} alt="" />
//         </div>
//         <span className="font-bold text-xl tracking-tight leading-relaxed font-Eagle">Painters' Diary</span>
//       </Link>
//       <Link 
//         to="/profile" 
//         className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
//       >
//         <User size={18} />
//       </Link>
//     </div>
//   </header>
// );

// // --- Main Profile Component ---
// export default function EditProfile() {
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [toast, setToast] = useState(null);
  
//   // Profile State
//   const [profile, setProfile] = useState({
//     nickname: '',
//     bio: '',
//     location: '',
//     website: '',
//     artStyle: '',
//     profession: '',
//     facebook: '',
//     instagram: '',
//     twitter: '',
//     linkedin: '',
//     portfolio: ''
//   });
  
//   const [selectedInterests, setSelectedInterests] = useState([]);
//   const [activeCategory, setActiveCategory] = useState('Painting');
//   const [searchTerm, setSearchTerm] = useState('');

//   // --- Data Constants ---
//   const artStyles = [
//     'Abstract', 'Realism', 'Impressionism', 'Surrealism', 'Minimalism', 
//     'Pop Art', 'Digital', 'Cyberpunk', 'Traditional', 'Watercolor', 'Oil'
//   ];

//   const professions = [
//     'Professional Artist', 'Hobbyist', 'Student', 'Instructor', 
//     'Illustrator', 'Designer', 'Curator', 'Concept Artist'
//   ];

//   const interestCategories = {
//     'Painting': ["Oil", "Acrylic", "Watercolor", "Gouache", "Ink", "Fresoc", "Encaustic"],
//     'Drawing': ["Charcoal", "Graphite", "Pastel", "Colored Pencil", "Digital Sketching"],
//     'Digital': ["3D Modeling", "Vector", "Pixel Art", "VFX", "Generative", "NFT"],
//     'Photo': ["Portrait", "Landscape", "Street", "Analog", "Macro", "Editorial"],
//     'Design': ["Graphic", "UI/UX", "Product", "Fashion", "Interior", "Motion"],
//     'Craft': ["Ceramics", "Textiles", "Woodworking", "Sculpture", "Printmaking"]
//   };

//   // =========================================================================
//   // MERN INTEGRATION: Fetch Data on Component Mount
//   // =========================================================================
//   useEffect(() => {
//     const loadProfile = async () => {
//       try {
//         // --- TODO: MERN FETCH LOGIC ---
//         // 1. Get the auth token from localStorage, cookies, or Context
//         // const token = localStorage.getItem('token');
//         //
//         // 2. Make a GET request to your Express API route
//         // const response = await fetch('/api/users/profile', {
//         //   method: 'GET',
//         //   headers: {
//         //     'Authorization': `Bearer ${token}`
//         //   }
//         // });
//         // const data = await response.json();
//         //
//         // 3. Set the state with the returned data
//         // if (response.ok && data) {
//         //   setProfile({
//         //     nickname: data.nickname || '',
//         //     bio: data.bio || '',
//         //     location: data.location || '',
//         //     // ... map the rest of your MongoDB fields
//         //   });
//         //   setSelectedInterests(data.interests || []);
//         // }

//         // MOCK DELAY (Remove this when backend is connected)
//         setTimeout(() => {
//           setLoading(false);
//         }, 1000);

//       } catch (error) {
//         console.error("Failed to load profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadProfile();
//   }, []);

//   // --- Input Handlers ---
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfile(prev => ({ ...prev, [name]: value }));
//   };

//   const handleNicknameChange = (e) => {
//     let value = e.target.value.replace(/\s/g, '');
//     if (value && !value.startsWith('@')) value = `@${value}`;
//     if (value === '@') value = '';
//     setProfile(prev => ({ ...prev, nickname: value }));
//   };

//   const toggleInterest = (interest) => {
//     setSelectedInterests(prev =>
//       prev.includes(interest)
//         ? prev.filter(i => i !== interest)
//         : [...prev, interest]
//     );
//   };

//   // =========================================================================
//   // MERN INTEGRATION: Save Data to Backend
//   // =========================================================================
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);

//     const profilePayload = {
//       nickname: profile.nickname.startsWith('@') ? profile.nickname : `@${profile.nickname}`,
//       bio: profile.bio,
//       location: profile.location,
//       profession: profile.profession,
//       artStyle: profile.artStyle,
//       interests: selectedInterests,
//       portfolio: profile.portfolio,
//       facebook: profile.facebook,
//       instagram: profile.instagram,
//       twitter: profile.twitter,
//       linkedin: profile.linkedin,
//     };

//     try {
//       // --- TODO: MERN SAVE LOGIC ---
//       // 1. Get the auth token
//       // const token = localStorage.getItem('token');
//       //
//       // 2. Make a PUT or POST request to your Express API route
//       // const response = await fetch('/api/users/profile', {
//       //   method: 'PUT',
//       //   headers: {
//       //     'Content-Type': 'application/json',
//       //     'Authorization': `Bearer ${token}`
//       //   },
//       //   body: JSON.stringify(profilePayload)
//       // });
//       //
//       // 3. Handle the response
//       // if (!response.ok) throw new Error('Failed to update profile');

//       // MOCK SAVE DELAY (Remove this when backend is connected)
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       setToast({ message: "Profile saved successfully", type: "success" });
//       setTimeout(() => setToast(null), 3000);
//     } catch (error) {
//       console.error("Save error:", error);
//       setToast({ message: "Failed to save profile", type: "error" });
//       setTimeout(() => setToast(null), 3000);
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900 dark:border-white"></div>
//         <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 font-medium">Loading profile...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-zinc-200 dark:selection:bg-zinc-800">
//       <AnimatePresence>
//         {toast && (
//           <Toast 
//             message={toast.message} 
//             type={toast.type} 
//             onClose={() => setToast(null)} 
//           />
//         )}
//       </AnimatePresence>

//       <TopHeader />

//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <header className="flex items-center justify-between mb-10">
//           <div className="flex items-center gap-4">
//             <Link to="/proflie">
//               <button className="p-2 -ml-2 rounded-full hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 transition-colors text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
//                 <ChevronLeft size={20} />
//               </button>
//             </Link>
//             <div>
//               <h1 className="text-3xl font-bold tracking-tight">Edit Profile</h1>
//               <p className="text-zinc-500 dark:text-zinc-400 mt-1">Manage your public artist persona</p>
//             </div>
//           </div>
//           <button 
//             onClick={handleSubmit}
//             disabled={saving}
//             className="hidden sm:flex items-center gap-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-6 py-2.5 rounded-full font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
//           >
//             {saving ? (
//               <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
//             ) : (
//               <UserCheck size={18} />
//             )}
//             Save Changes
//           </button>
//         </header>

//         <form onSubmit={handleSubmit} className="space-y-8">
          
//           {/* Section 1: Identity */}
//           <section className="bg-white dark:bg-zinc-900/30 rounded-2xl p-6 sm:p-8 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm">
//             <SectionTitle icon={User} title="Identity" subtitle="How you appear to others" />
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <InputField 
//                 label="Nickname" 
//                 name="nickname"
//                 value={profile.nickname}
//                 onChange={handleNicknameChange}
//                 placeholder="@username"
//               />
              
//               <div className="group">
//                 <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1.5 ml-1">
//                   Profession
//                 </label>
//                 <div className="relative">
//                   <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
//                   <select
//                     name="profession"
//                     value={profile.profession}
//                     onChange={handleInputChange}
//                     className="w-full appearance-none bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all cursor-pointer"
//                   >
//                     <option value="">Select Profession</option>
//                     {professions.map(p => <option key={p} value={p}>{p}</option>)}
//                   </select>
//                 </div>
//               </div>

//               <InputField 
//                 label="Location"
//                 name="location"
//                 value={profile.location}
//                 onChange={handleInputChange}
//                 placeholder="City, Country"
//                 prefix={<MapPin size={16} />}
//               />

//               <div className="group">
//                 <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1.5 ml-1">
//                   Primary Style
//                 </label>
//                 <div className="relative">
//                   <Palette className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
//                   <select
//                     name="artStyle"
//                     value={profile.artStyle}
//                     onChange={handleInputChange}
//                     className="w-full appearance-none bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all cursor-pointer"
//                   >
//                     <option value="">Select Style</option>
//                     {artStyles.map(s => <option key={s} value={s}>{s}</option>)}
//                   </select>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-6">
//               <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1.5 ml-1">
//                 Artist Bio
//               </label>
//               <textarea
//                 name="bio"
//                 value={profile.bio}
//                 onChange={handleInputChange}
//                 rows={4}
//                 className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all resize-none"
//                 placeholder="Tell your story..."
//               />
//             </div>
//           </section>

//           {/* Section 2: Interests */}
//           <section className="bg-white dark:bg-zinc-900/30 rounded-2xl p-6 sm:p-8 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm">
//             <SectionTitle icon={LayoutGrid} title="Interests" subtitle="Select topics you follow" />

//             <div className="flex flex-wrap gap-2 mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-4">
//               {Object.keys(interestCategories).map(category => (
//                 <button
//                   key={category}
//                   type="button"
//                   onClick={() => setActiveCategory(category)}
//                   className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
//                     activeCategory === category
//                       ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-md transform scale-105'
//                       : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
//                   }`}
//                 >
//                   {category}
//                 </button>
//               ))}
//             </div>

//             <div className="relative mb-6">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
//               <input
//                 type="text"
//                 placeholder={`Search ${activeCategory} tags...`}
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800 py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-zinc-500 transition-colors"
//               />
//             </div>

//             <div className="flex flex-wrap gap-2">
//               {interestCategories[activeCategory]
//                 .filter(i => i.toLowerCase().includes(searchTerm.toLowerCase()))
//                 .map(interest => (
//                 <button
//                   key={interest}
//                   type="button"
//                   onClick={() => toggleInterest(interest)}
//                   className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm transition-all ${
//                     selectedInterests.includes(interest)
//                       ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-300'
//                       : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600'
//                   }`}
//                 >
//                   <span>{interest}</span>
//                   {selectedInterests.includes(interest) && <X size={12} />}
//                 </button>
//               ))}
//             </div>
            
//             {selectedInterests.length > 0 && (
//               <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
//                 <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Active Tags</span>
//                 <div className="flex flex-wrap gap-2 mt-3">
//                   {selectedInterests.map(interest => (
//                     <span key={interest} className="inline-flex items-center gap-1 px-2 py-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs rounded-md">
//                       {interest}
//                       <button type="button" onClick={() => toggleInterest(interest)}>
//                         <X size={10} />
//                       </button>
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </section>

//           {/* Section 3: Digital Presence */}
//           <section className="bg-white dark:bg-zinc-900/30 rounded-2xl p-6 sm:p-8 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm pb-24 sm:pb-8">
//             <SectionTitle icon={Globe} title="Digital Presence" subtitle="Where can people find you?" />

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <div className="sm:col-span-2">
//                 <InputField 
//                   label="Portfolio Website"
//                   name="portfolio"
//                   value={profile.portfolio}
//                   onChange={handleInputChange}
//                   placeholder="https://your-portfolio.com"
//                   prefix={<Link2 size={16} />}
//                 />
//               </div>

//               <SocialInput 
//                 icon={Twitter} 
//                 name="twitter" 
//                 placeholder="Twitter handle"
//                 value={profile.twitter} 
//                 onChange={handleInputChange} 
//               />
//               <SocialInput 
//                 icon={Instagram} 
//                 name="instagram" 
//                 placeholder="Instagram username"
//                 value={profile.instagram} 
//                 onChange={handleInputChange} 
//               />
//               <SocialInput 
//                 icon={Facebook} 
//                 name="facebook" 
//                 placeholder="Facebook username"
//                 value={profile.facebook} 
//                 onChange={handleInputChange} 
//               />
//               <SocialInput 
//                 icon={Linkedin} 
//                 name="linkedin" 
//                 placeholder="LinkedIn profile"
//                 value={profile.linkedin} 
//                 onChange={handleInputChange} 
//               />
//             </div>
//           </section>

//           {/* Mobile Sticky Save */}
//           <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 sm:hidden z-40">
//             <button
//               type="submit"
//               disabled={saving}
//               className="w-full flex items-center justify-center gap-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-3 rounded-xl font-medium"
//             >
//               {saving ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <UserCheck size={18} />}
//               Save Profile
//             </button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, MapPin, Globe, Briefcase, Palette,
  ChevronLeft, Search, X, Instagram, Twitter, Linkedin,
  LayoutGrid, Link2, UserCheck, Camera, Check,
  Youtube, Hash, Sparkles, AtSign,
} from "lucide-react";
import Logo from "../../../assets/Logo.jpeg";

// ─── Toast ────────────────────────────────────────────────────────────────────
const Toast = ({ message, type, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 60, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 20, scale: 0.95 }}
    className={`fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50 flex items-center justify-between gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-xl font-['Quicksand'] font-semibold text-sm ${
      type === "success"
        ? "bg-zinc-900 border-zinc-800 text-white dark:bg-white dark:border-gray-200 dark:text-zinc-900"
        : "bg-red-500/10 border-red-400/25 text-red-600 dark:text-red-400"
    }`}
  >
    <div className="flex items-center gap-3">
      <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${type === "success" ? "bg-white dark:bg-zinc-900" : "bg-red-500"}`} />
      <span className="truncate">{message}</span>
    </div>
    <button onClick={onClose} className="opacity-50 hover:opacity-100 transition-opacity p-1">
      <X size={16} />
    </button>
  </motion.div>
);

// ─── Field wrapper ────────────────────────────────────────────────────────────
const Field = ({ label, children, hint }) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-xs font-bold uppercase tracking-[0.1em] text-gray-500 dark:text-white/40 font-['Quicksand'] pl-1">
      {label}
    </label>
    {children}
    {hint && <p className="text-xs text-gray-400 dark:text-white/30 font-['Quicksand'] pl-1">{hint}</p>}
  </div>
);

// ─── Styled input ─────────────────────────────────────────────────────────────
const Input = ({ icon: Icon, prefix, ...props }) => (
  <div className="relative flex items-center group w-full">
    {Icon && (
      <div className="absolute left-4 text-gray-400 dark:text-white/30 group-focus-within:text-zinc-900 dark:group-focus-within:text-white transition-colors">
        <Icon size={16} />
      </div>
    )}
    {prefix && (
      <span className="absolute left-4 text-gray-400 dark:text-white/30 text-sm font-semibold select-none pointer-events-none font-['Quicksand']">
        {prefix}
      </span>
    )}
    <input
      {...props}
      className={`w-full bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 rounded-xl py-3 text-sm sm:text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/20 focus:outline-none focus:border-zinc-900 dark:focus:border-white focus:ring-1 focus:ring-zinc-900/10 dark:focus:ring-white/10 transition-all font-['Quicksand'] ${
        Icon || prefix ? "pl-10 pr-4" : "px-4"
      }`}
    />
  </div>
);

// ─── Styled select ────────────────────────────────────────────────────────────
const Select = ({ icon: Icon, options, placeholder, ...props }) => (
  <div className="relative group w-full">
    {Icon && (
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/30 group-focus-within:text-zinc-900 dark:group-focus-within:text-white transition-colors z-10 pointer-events-none">
        <Icon size={16} />
      </div>
    )}
    <select
      {...props}
      className="w-full appearance-none bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-10 py-3 text-sm sm:text-base text-gray-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white focus:ring-1 focus:ring-zinc-900/10 dark:focus:ring-white/10 transition-all cursor-pointer font-['Quicksand']"
    >
      <option value="">{placeholder}</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
      <ChevronLeft size={16} className="-rotate-90" />
    </div>
  </div>
);

// ─── Card wrapper ─────────────────────────────────────────────────────────────
const Card = ({ children, className = "" }) => (
  <div className={`bg-white dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/[0.07] rounded-2xl relative overflow-hidden ${className}`}>
    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-300/60 dark:via-white/10 to-transparent" />
    {children}
  </div>
);

// ─── Section header ───────────────────────────────────────────────────────────
const SectionHeader = ({ icon: Icon, title, desc }) => (
  <div className="flex items-start gap-4 mb-6">
    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/5">
      <Icon size={18} className="text-zinc-900 dark:text-white" />
    </div>
    <div>
      <h3 className="text-base font-bold text-gray-900 dark:text-white font-['Quicksand']">{title}</h3>
      <p className="text-xs sm:text-sm text-gray-500 dark:text-white/40 mt-0.5 font-['Quicksand'] leading-snug">{desc}</p>
    </div>
  </div>
);

// ─── Avatar uploader ──────────────────────────────────────────────────────────
const AvatarUploader = ({ preview, onFileChange }) => {
  const ref = useRef();
  return (
    <div className="flex flex-col items-center gap-3 flex-shrink-0 w-full sm:w-auto">
      <div className="relative group cursor-pointer" onClick={() => ref.current?.click()}>
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-2 border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 shadow-sm">
          {preview
            ? <img src={preview} alt="avatar" className="w-full h-full object-cover" />
            : <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-white/20"><User size={40} strokeWidth={1.5} /></div>
          }
        </div>
        <div className="absolute inset-0 rounded-3xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Camera size={24} className="text-white" />
        </div>
        <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-zinc-900 dark:bg-white border-[3px] border-white dark:border-[#0a0a0a] flex items-center justify-center shadow-md">
          <Camera size={14} className="text-white dark:text-zinc-900" />
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-white/40 font-['Quicksand'] font-medium">Change Photo</p>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
    </div>
  );
};

// ─── Social row ───────────────────────────────────────────────────────────────
const SocialRow = ({ icon: Icon, name, placeholder, value, onChange }) => (
  <div className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] group focus-within:border-zinc-900 dark:focus-within:border-white/50 transition-all w-full">
    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-white">
      <Icon size={16} />
    </div>
    <input
      type="text" name={name} value={value} onChange={onChange}
      placeholder={placeholder}
      className="flex-1 min-w-0 bg-transparent text-sm sm:text-base text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/25 focus:outline-none font-['Quicksand']"
    />
  </div>
);

// ─── Char counter textarea ─────────────────────────────────────────────────────
const BioTextarea = ({ value, onChange }) => {
  const max = 200;
  const pct = Math.min((value.length / max) * 100, 100);
  const over = value.length > max;
  return (
    <div className="relative w-full">
      <textarea
        name="bio" value={value} onChange={onChange} rows={4}
        maxLength={max + 20}
        placeholder="Tell the world about your artistic journey…"
        className="w-full bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm sm:text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/20 focus:outline-none focus:border-zinc-900 dark:focus:border-white focus:ring-1 focus:ring-zinc-900/10 dark:focus:ring-white/10 transition-all resize-none font-['Quicksand'] leading-relaxed"
      />
      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        <div className="w-16 h-1.5 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${over ? "bg-red-500" : pct > 80 ? "bg-amber-500" : "bg-zinc-900 dark:bg-white"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className={`text-xs font-bold font-['Quicksand'] ${over ? "text-red-500" : "text-gray-400 dark:text-white/30"}`}>
          {max - value.length}
        </span>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
const STEPS = ["Identity", "Interests", "Web Presence"];
const artStyles   = ["Abstract","Realism","Impressionism","Surrealism","Minimalism","Pop Art","Digital","Cyberpunk","Traditional","Watercolor","Oil Paint"];
const professions = ["Professional Artist","Hobbyist","Student","Instructor","Illustrator","Designer","Curator","Concept Artist"];
const interestCategories = {
  Painting: ["Oil","Acrylic","Watercolor","Gouache","Ink","Encaustic","Fresco"],
  Drawing:  ["Charcoal","Graphite","Pastel","Colored Pencil","Digital Sketch"],
  Digital:  ["3D Modeling","Vector","Pixel Art","VFX","Generative","NFT","Motion"],
  Photo:    ["Portrait","Landscape","Street","Analog","Macro","Editorial","Aerial"],
  Design:   ["Graphic","UI/UX","Product","Fashion","Interior","Typography"],
  Craft:    ["Ceramics","Textiles","Woodworking","Sculpture","Printmaking","Jewelry"],
};

export default function EditProfile() {
  const [loading,   setLoading]   = useState(true);
  const [saving,    setSaving]    = useState(false);
  const [toast,     setToast]     = useState(null);
  const [step,      setStep]      = useState(0);            
  const [activeTab, setActiveTab] = useState("Painting");
  const [search,    setSearch]    = useState("");
  const [saved,     setSaved]     = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [selectedInterests, setSelectedInterests] = useState([]);

  const [profile, setProfile] = useState({
    nickname: "", bio: "", location: "", website: "",
    artStyle: "", profession: "", twitter: "", instagram: "", linkedin: "", youtube: "", portfolio: "",
  });

  // ── Load profile ──────────────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        // ── BACKEND INTEGRATION ─────────────────────────────────────────
        // const token = localStorage.getItem("accessToken");
        // const res   = await axios.get("/api/users/profile", { headers: { Authorization: `Bearer ${token}` } });
        // const d = res.data;
        // setProfile({ ... });
        // setSelectedInterests(d.interests || []);
        // if (d.avatar) setAvatarPreview(d.avatar);
        // ───────────────────────────────────────────────────────────────
        await new Promise(r => setTimeout(r, 800)); // Mock delay
      } catch (err) {
        console.error("Load error:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleChange = (e) => setProfile(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleNickname = (e) => {
    let v = e.target.value.replace(/\s/g, "");
    if (v && !v.startsWith("@")) v = `@${v}`;
    if (v === "@") v = "";
    setProfile(p => ({ ...p, nickname: v }));
  };
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
    // ── BACKEND: upload file logic here
  };
  const toggleInterest = (tag) => setSelectedInterests(p => p.includes(tag) ? p.filter(t => t !== tag) : [...p, tag]);

  // ── Save ──────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    setSaving(true);
    try {
      // ── BACKEND INTEGRATION (Put Payload here) ────────────────────────
      await new Promise(r => setTimeout(r, 1000)); // Mock save

      setSaved(true);
      setToast({ message: "Profile updated successfully", type: "success" });
      setTimeout(() => { setToast(null); setSaved(false); }, 3000);
    } catch (err) {
      setToast({ message: "Failed to save profile", type: "error" });
      setTimeout(() => setToast(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  // ── Loading screen ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex flex-col items-center justify-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-[3px] border-zinc-200 dark:border-white/10" />
          <div className="absolute inset-0 rounded-full border-[3px] border-zinc-900 dark:border-white border-t-transparent animate-spin" />
        </div>
      </div>
    );
  }

  const filteredTags = (interestCategories[activeTab] || []).filter(t => t.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Main Container - Prevent X Overflow */}
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] font-['Quicksand'] text-gray-900 dark:text-white transition-colors duration-300 relative overflow-x-hidden">

        <AnimatePresence>
          {toast && <Toast {...toast} onClose={() => setToast(null)} />}
        </AnimatePresence>

        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[400px] pointer-events-none opacity-40 dark:opacity-20"
          style={{ background: "radial-gradient(ellipse, rgba(150,150,150,0.15) 0%, transparent 70%)" }} />

        {/* ══════════════════════════════════════════════════════════════════
            HEADER (Mobile Optimized)
        ══════════════════════════════════════════════════════════════════ */}
        <header className="sticky top-0 z-40 w-full border-b border-gray-200/80 dark:border-white/[0.07] bg-white/75 dark:bg-[#0a0a0a]/80 backdrop-blur-xl">
          <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
            
            {/* Left: Back & Logo */}
            <div className="flex items-center gap-3 min-w-0">
              <Link to="/profile" className="flex-shrink-0 p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-white/70">
                <ChevronLeft size={22} />
              </Link>
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-900 dark:bg-white border border-gray-200 dark:border-white/10 shadow-sm">
                  <img src={Logo} alt="logo" className="w-full h-full object-cover" />
                </div>
                <h1 className="text-base sm:text-lg font-bold truncate">Edit Profile</h1>
              </div>
            </div>

            {/* Right: Save Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={saving}
              className={`flex-shrink-0 flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl text-sm font-bold transition-all ${
                saved
                  ? "bg-gray-100 text-zinc-900 border border-gray-200 dark:bg-white/10 dark:text-white dark:border-white/20"
                  : saving
                  ? "bg-zinc-900/60 dark:bg-white/60 text-white dark:text-zinc-900 cursor-not-allowed"
                  : "bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-gray-200 shadow-sm"
              }`}
            >
              {saving ? (
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : saved ? (
                <Check size={16} />
              ) : (
                <UserCheck size={16} />
              )}
              {/* Hide text on very small screens, show on sm+ */}
              <span className="hidden sm:inline">
                {saving ? "Saving…" : saved ? "Saved" : "Save Changes"}
              </span>
            </motion.button>
          </div>
        </header>

        {/* ══════════════════════════════════════════════════════════════════
            PAGE BODY
        ══════════════════════════════════════════════════════════════════ */}
        <div className="max-w-3xl mx-auto px-4 py-6 pb-20 relative z-10">

          {/* ── Step Nav Tabs (Scrollable on small devices) ── */}
          <div className="flex gap-1 p-1 bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.07] rounded-2xl mb-8 shadow-sm overflow-x-auto no-scrollbar snap-x">
            {STEPS.map((s, i) => (
              <button
                key={s} onClick={() => setStep(i)}
                className={`flex-1 min-w-[100px] whitespace-nowrap snap-center py-3 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 ${
                  step === i
                    ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md"
                    : "text-gray-500 dark:text-white/40 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white/90"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            
            {/* ── STEP 0: Identity ── */}
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <Card className="p-5 sm:p-8">
                  <SectionHeader icon={User} title="Public Identity" desc="How you appear to other artists" />
                  
                  <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
                    <AvatarUploader preview={avatarPreview} onFileChange={handleAvatarChange} />
                    
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label="Nickname">
                        <Input icon={AtSign} name="nickname" value={profile.nickname} onChange={handleNickname} placeholder="@yourname" />
                      </Field>
                      <Field label="Profession">
                        <Select icon={Briefcase} name="profession" value={profile.profession} onChange={handleChange} placeholder="Select role" options={professions} />
                      </Field>
                      <Field label="Location">
                        <Input icon={MapPin} name="location" value={profile.location} onChange={handleChange} placeholder="City, Country" />
                      </Field>
                      <Field label="Primary Style">
                        <Select icon={Palette} name="artStyle" value={profile.artStyle} onChange={handleChange} placeholder="Select style" options={artStyles} />
                      </Field>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 sm:p-8">
                  <SectionHeader icon={Sparkles} title="Artist Bio" desc="Your story in 200 characters" />
                  <BioTextarea value={profile.bio} onChange={handleChange} />
                </Card>

                <div className="flex justify-end pt-2">
                  <button onClick={() => setStep(1)} className="w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-gray-200 text-sm font-bold rounded-xl transition-colors shadow-sm">
                    Next: Interests <ChevronLeft size={16} className="rotate-180" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 1: Interests ── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <Card className="p-5 sm:p-8">
                  <SectionHeader icon={LayoutGrid} title="Art Interests" desc="Select topics to personalize your feed" />

                  {/* Horizontal scrollable categories */}
                  <div className="flex overflow-x-auto no-scrollbar gap-2 pb-4 mb-4 border-b border-gray-100 dark:border-white/[0.06] snap-x">
                    {Object.keys(interestCategories).map((cat) => (
                      <button
                        key={cat} onClick={() => { setActiveTab(cat); setSearch(""); }}
                        className={`snap-start whitespace-nowrap px-4 py-2 rounded-xl text-[13px] font-bold transition-all ${
                          activeTab === cat
                            ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md"
                            : "bg-gray-100 dark:bg-white/[0.06] text-gray-600 dark:text-white/50 hover:bg-gray-200 dark:hover:bg-white/10"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="relative mb-6">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/30" />
                    <input
                      type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={`Search in ${activeTab}…`}
                      className="w-full bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-10 py-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/25 focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all"
                    />
                    {search && (
                      <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white/60 p-1">
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    <AnimatePresence>
                      {filteredTags.map((tag) => {
                        const on = selectedInterests.includes(tag);
                        return (
                          <motion.button
                            key={tag} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.15 }} onClick={() => toggleInterest(tag)} type="button"
                            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-[13px] font-bold transition-all ${
                              on
                                ? "bg-zinc-900 border-zinc-900 text-white dark:bg-white dark:border-white dark:text-zinc-900 shadow-sm"
                                : "bg-gray-50 dark:bg-white/[0.04] border-gray-200 dark:border-white/[0.07] text-gray-600 dark:text-white/60 hover:border-gray-300 dark:hover:border-white/15"
                            }`}
                          >
                            {on && <Check size={12} strokeWidth={3} />}
                            {tag}
                          </motion.button>
                        );
                      })}
                    </AnimatePresence>
                  </div>

                  {selectedInterests.length > 0 && (
                    <div className="mt-8 pt-5 border-t border-gray-100 dark:border-white/[0.06]">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-white/40">
                          Selected ({selectedInterests.length})
                        </span>
                        <button onClick={() => setSelectedInterests([])} className="text-xs text-zinc-900 dark:text-white hover:opacity-70 font-bold transition-colors">
                          Clear all
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedInterests.map((tag) => (
                          <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold rounded-lg">
                            {tag}
                            <button onClick={() => toggleInterest(tag)} type="button" className="opacity-60 hover:opacity-100"><X size={12} strokeWidth={3}/></button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>

                <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-2">
                  <button onClick={() => setStep(0)} className="w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-3.5 text-sm font-bold text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-white/5 sm:bg-transparent sm:dark:bg-transparent rounded-xl transition-colors">
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button onClick={() => setStep(2)} className="w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-gray-200 text-sm font-bold rounded-xl transition-colors shadow-sm">
                    Next: Web Presence <ChevronLeft size={16} className="rotate-180" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: Web Presence ── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <Card className="p-5 sm:p-8">
                  <SectionHeader icon={Globe} title="Web Presence" desc="Where can people find your work?" />
                  <div className="space-y-5">
                    <Field label="Portfolio Website" hint="Your primary art portfolio or personal site">
                      <Input icon={Link2} name="portfolio" value={profile.portfolio} onChange={handleChange} placeholder="https://yourportfolio.com" />
                    </Field>
                    <Field label="Personal Website">
                      <Input icon={Globe} name="website" value={profile.website} onChange={handleChange} placeholder="https://yoursite.com" />
                    </Field>
                  </div>
                </Card>

                <Card className="p-5 sm:p-8">
                  <SectionHeader icon={Hash} title="Social Profiles" desc="Connect your social accounts" />
                  <div className="space-y-4">
                    <SocialRow icon={Twitter} name="twitter" value={profile.twitter} onChange={handleChange} placeholder="twitter.com/yourhandle" />
                    <SocialRow icon={Instagram} name="instagram" value={profile.instagram} onChange={handleChange} placeholder="instagram.com/yourprofile" />
                    <SocialRow icon={Linkedin} name="linkedin" value={profile.linkedin} onChange={handleChange} placeholder="linkedin.com/in/yourprofile" />
                    <SocialRow icon={Youtube} name="youtube" value={profile.youtube} onChange={handleChange} placeholder="youtube.com/@yourchannel" />
                  </div>
                </Card>

                <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-2">
                  <button onClick={() => setStep(1)} className="w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-3.5 text-sm font-bold text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-white/5 sm:bg-transparent sm:dark:bg-transparent rounded-xl transition-colors">
                    <ChevronLeft size={16} /> Back
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    disabled={saving}
                    className={`w-full sm:w-auto flex justify-center items-center gap-2 px-8 py-3.5 text-sm font-bold rounded-xl transition-all shadow-sm ${
                      saving
                        ? "bg-zinc-900/60 dark:bg-white/60 text-white dark:text-zinc-900 cursor-not-allowed"
                        : "bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-gray-200"
                    }`}
                  >
                    {saving
                      ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      : <UserCheck size={18} />
                    }
                    {saving ? "Saving…" : "Save Profile"}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}