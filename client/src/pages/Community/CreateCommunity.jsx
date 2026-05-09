// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useNavigate, Link } from 'react-router-dom';
// import { 
//   ArrowRight, 
//   ArrowLeft, 
//   Image as ImageIcon, 
//   Upload, 
//   Plus, 
//   X, 
//   Shield, 
//   CheckCircle2,
//   Globe,
//   Lock,
//   Camera,
//   User,
//   HeartHandshake
// } from 'lucide-react';
// import Logo from '../../assets/Logo.jpeg';
// import { Toaster, toast } from 'sonner';

// const CreateCommunityPage = () => {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     cover: null,      
//     coverPreview: '', 
//     avatar: null,     
//     avatarPreview: '', 
//     privacy: 'public',
//     rules: ['Be respectful to fellow artists', 'No AI-generated content without tags'],
//   });

//   // --- Handlers ---

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e, field) => {
//     const file = e.target.files[0];
//     if (file) {
//       const previewUrl = URL.createObjectURL(file);
//       setFormData((prev) => ({
//         ...prev,
//         [field]: file,
//         [`${field}Preview`]: previewUrl
//       }));
//     }
//   };

//   const handleRuleChange = (index, value) => {
//     const newRules = [...formData.rules];
//     newRules[index] = value;
//     setFormData((prev) => ({ ...prev, rules: newRules }));
//   };

//   const addRule = () => {
//     setFormData((prev) => ({ ...prev, rules: [...prev.rules, ''] }));
//   };

//   const removeRule = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       rules: prev.rules.filter((_, i) => i !== index),
//     }));
//   };

//   // --- Validation & Navigation ---

//   const validateStep = () => {
//     if (step === 1) {
//       if (!formData.name.trim()) {
//         toast.error('Community name is required');
//         return false;
//       }
//       if (!formData.description.trim()) {
//         toast.error('Community description is required');
//         return false;
//       }
//       if (!formData.coverPreview) {
//         toast.info('Adding a cover image is recommended!');
//       }
//     }
//     if (step === 2) {
//       const validRules = formData.rules.filter(rule => rule.trim() !== '');
//       if (validRules.length === 0) {
//         toast.error('Please add at least one community rule');
//         return false;
//       }
//     }
//     return true;
//   };

//   const nextStep = () => {
//     if (validateStep()) setStep((prev) => prev + 1);
//   };

//   const prevStep = () => setStep((prev) => prev - 1);

//   // --- Simulated Submission ---

//   const handleSubmit = async () => {
//     if (!validateStep()) return; // Extra check just in case

//     setIsSubmitting(true);
//     const toastId = toast.loading('Launching your community...');

//     try {
//       // Simulate an API call / Backend processing time
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       toast.success('Community published successfully!', { id: toastId });
//       const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
//       navigate(`/community/${slug}`);
      
//     } catch (error) {
//       console.error('Error creating community:', error);
//       toast.error('Failed to create community. Please try again.', { id: toastId });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800">
//       <Toaster position="top-center" richColors theme="system" />
      
//       {/* Navbar with Logo and Icons */}
//       <header>
//         <nav className="fixed top-0 h-16 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-md z-50 flex items-center justify-between px-6">
//           <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
//             <Link to="/" className="flex items-center gap-3 font-bold tracking-tight text-lg">
//               <div className="w-8 h-8 bg-zinc-900 dark:bg-white rounded-lg flex items-center justify-center overflow-hidden">
//                 <img src={Logo} alt="Logo" className="w-full h-full object-cover" />
//               </div>
//               <span className="font-Eagle">Painters' Diary</span>
//             </Link>
            
//             <div className="flex items-center gap-5 text-zinc-500">
//               <Link to="/community" className="hover:text-black dark:hover:text-white transition-colors" title="Communities">
//                 <HeartHandshake size={20} />
//               </Link>
//               <Link to="/profile" className="hover:text-black dark:hover:text-white transition-colors" title="Account">
//                 <User size={20} />
//               </Link>
//             </div>
//           </div>
//         </nav>
//       </header>

//       <div className="max-w-2xl mx-auto pt-32 pb-20 px-6">
        
//         {/* Progress Indicator */}
//         <div className="flex gap-2 mb-12">
//           {[1, 2, 3].map((i) => (
//             <div 
//               key={i} 
//               className={`h-1 flex-1 rounded-full transition-all duration-500 ${
//                 step >= i ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-200 dark:bg-zinc-800'
//               }`} 
//             />
//           ))}
//         </div>

//         {/* Removed <form> wrapper to prevent accidental "Enter" key submissions */}
//         <div>
//           <AnimatePresence mode="wait">
            
//             {/* --- STEP 1: IDENTITY --- */}
//             {step === 1 && (
//               <motion.div
//                 key="step1"
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 className="space-y-8"
//               >
//                 <div>
//                   <h1 className="text-3xl font-bold tracking-tight mb-2">Community Identity</h1>
//                   <p className="text-zinc-500">Define the visual look and feel of your new space.</p>
//                 </div>

//                 {/* Cover Image Upload */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Cover Image</label>
//                   <div className="relative group h-48 w-full bg-zinc-100 dark:bg-zinc-900 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl overflow-hidden transition-colors hover:border-zinc-400 dark:hover:border-zinc-500">
//                     {formData.coverPreview ? (
//                       <div className="w-full h-full relative">
//                         <img src={formData.coverPreview} alt="Cover" className="w-full h-full object-cover" />
//                         <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
//                           <p className="text-white font-medium flex items-center gap-2"><Camera size={20}/> Change Cover</p>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="flex flex-col items-center justify-center h-full text-zinc-400 pointer-events-none">
//                         <ImageIcon size={32} className="mb-2" />
//                         <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">Click to upload cover</span>
//                         <span className="text-xs mt-1">1200 x 400 recommended</span>
//                       </div>
//                     )}
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => handleFileChange(e, 'cover')} 
//                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
//                     />
//                   </div>
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-6 items-start">
//                   {/* Logo/Avatar Upload */}
//                   <div className="space-y-2 shrink-0">
//                     <label className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Logo</label>
//                     <div className="relative group w-24 h-24 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center overflow-hidden">
//                       {formData.avatarPreview ? (
//                         <div className="w-full h-full relative">
//                           <img src={formData.avatarPreview} alt="Logo" className="w-full h-full object-cover" />
//                           <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
//                             <Upload size={16} className="text-white" />
//                           </div>
//                         </div>
//                       ) : (
//                         <div className="pointer-events-none">
//                           <Upload size={24} className="text-zinc-400" />
//                         </div>
//                       )}
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={(e) => handleFileChange(e, 'avatar')}
//                         className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
//                       />
//                     </div>
//                   </div>

//                   <div className="flex-1 space-y-6 w-full">
//                     <div className="space-y-2">
//                       <label className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Name</label>
//                       <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         placeholder="e.g. Minimalist Designers"
//                         className="w-full text-2xl font-bold bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-2 focus:outline-none focus:border-black dark:focus:border-white placeholder:text-zinc-300 dark:placeholder:text-zinc-700 transition-colors"
//                         onKeyDown={(e) => { if (e.key === 'Enter') nextStep(); }}
//                       />
//                     </div>

//                     <div className="space-y-2">
//                       <label className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Description</label>
//                       <textarea
//                         name="description"
//                         value={formData.description}
//                         onChange={handleChange}
//                         rows={3}
//                         placeholder="What is this community about?"
//                         className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all resize-none"
//                       />
//                     </div>
                    
//                   </div>
//                 </div>
//               </motion.div>
//             )}

//             {/* --- STEP 2: GUIDELINES --- */}
//             {step === 2 && (
//               <motion.div
//                 key="step2"
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 className="space-y-8"
//               >
//                 <div>
//                   <h1 className="text-3xl font-bold tracking-tight mb-2">Guidelines & Privacy</h1>
//                   <p className="text-zinc-500">Set the rules and visibility of your space.</p>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <button
//                     type="button"
//                     onClick={() => setFormData(prev => ({ ...prev, privacy: 'public' }))}
//                     className={`p-4 rounded-xl border flex flex-col items-center text-center gap-2 transition-all ${
//                       formData.privacy === 'public' 
//                         ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black' 
//                         : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-zinc-400'
//                     }`}
//                   >
//                     <Globe size={24} />
//                     <span className="font-medium">Public</span>
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setFormData(prev => ({ ...prev, privacy: 'private' }))}
//                     className={`p-4 rounded-xl border flex flex-col items-center text-center gap-2 transition-all ${
//                       formData.privacy === 'private' 
//                         ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black' 
//                         : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-zinc-400'
//                     }`}
//                   >
//                     <Lock size={24} />
//                     <span className="font-medium">Private</span>
//                   </button>
//                 </div>

//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center">
//                     <label className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Community Rules</label>
//                   </div>
                  
//                   {formData.rules.map((rule, index) => (
//                     <motion.div 
//                       key={index}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="flex gap-2"
//                     >
//                       <div className="flex items-center justify-center w-8 h-10 text-zinc-400 font-mono text-sm">
//                         {index + 1}.
//                       </div>
//                       <input
//                         type="text"
//                         value={rule}
//                         onChange={(e) => handleRuleChange(index, e.target.value)}
//                         placeholder="Enter a rule..."
//                         className="flex-1 bg-transparent border-b border-zinc-200 dark:border-zinc-800 py-2 focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-colors"
//                         onKeyDown={(e) => { 
//                           if (e.key === 'Enter') {
//                             e.preventDefault();
//                             addRule();
//                           }
//                         }}
//                       />
//                       <button 
//                         type="button"
//                         onClick={() => removeRule(index)}
//                         className="text-zinc-400 hover:text-red-500 transition-colors px-2"
//                       >
//                         <X size={18} />
//                       </button>
//                     </motion.div>
//                   ))}
                  
//                   <button
//                     type="button"
//                     onClick={addRule}
//                     className="flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-white hover:opacity-70 transition-opacity mt-4 pl-10"
//                   >
//                     <Plus size={16} /> Add Rule
//                   </button>
//                 </div>
//               </motion.div>
//             )}

//             {/* --- STEP 3: REVIEW --- */}
//             {step === 3 && (
//               <motion.div
//                 key="step3"
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 className="space-y-8"
//               >
//                 <div>
//                   <h1 className="text-3xl font-bold tracking-tight mb-2">Review & Publish</h1>
//                   <p className="text-zinc-500">Take a final look before launching your community.</p>
//                 </div>

//                 <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-black shadow-lg">
//                   <div className="h-48 w-full bg-zinc-100 dark:bg-zinc-900 relative">
//                      {formData.coverPreview && <img src={formData.coverPreview} className="w-full h-full object-cover" alt="Cover" />}
//                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
//                   </div>
                  
//                   <div className="px-6 pb-6 -mt-10 relative">
//                     <div className="flex justify-between items-end">
//                       <div className="flex gap-4 items-end">
//                         <div className="w-24 h-24 rounded-xl bg-white dark:bg-zinc-900 p-1 shadow-md">
//                           {formData.avatarPreview ? (
//                             <img src={formData.avatarPreview} className="w-full h-full rounded-lg object-cover bg-zinc-200" alt="Avatar" />
//                           ) : (
//                             <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-2xl">🎨</div>
//                           )}
//                         </div>
//                         <div className="mb-2">
//                            <h2 className="text-2xl font-bold text-white drop-shadow-md font-Quicksand">{formData.name}</h2>
//                            <div className="text-zinc-200 text-sm drop-shadow-md flex items-center justify-center gap-1">
//                              {formData.privacy === 'public' ? <Globe size={12}/> : <Lock size={12}/>} 
//                              {formData.privacy.charAt(0).toUpperCase() + formData.privacy.slice(1)} Group
//                            </div>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="mt-6 space-y-4">
//                       <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
//                         {formData.description}
//                       </p>
                      
//                       <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-lg border border-zinc-100 dark:border-zinc-800">
//                         <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-2">
//                           <Shield size={12} /> Community Rules
//                         </h3>
//                         <ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
//                           {formData.rules.filter(r => r.trim()).map((r, i) => (
//                             <li key={i}>{r}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}

//           </AnimatePresence>
          
//           {/* Form Actions */}
//           <div className="mt-12 flex justify-between items-center gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
//              {/* Back Button */}
//              {step > 1 && (
//                <button 
//                 type="button" 
//                 onClick={prevStep}
//                 disabled={isSubmitting}
//                 className="px-6 py-2 rounded-lg font-medium border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-300 transition-colors flex items-center gap-2 disabled:opacity-50"
//                >
//                  <ArrowLeft size={18} /> Back
//                </button>
//              )}

//              {/* Continue Button (Steps 1 & 2) vs Submit Button (Step 3) */}
//              {step < 3 ? (
//                <button 
//                 type="button" 
//                 onClick={nextStep}
//                 className="bg-zinc-900 dark:bg-white text-white dark:text-black px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
//                >
//                  Continue <ArrowRight size={18} />
//                </button>
//              ) : (
//                <button 
//                 type="button" 
//                 onClick={handleSubmit}
//                 disabled={isSubmitting}
//                 className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
//                >
//                  {isSubmitting ? 'Creating...' : 'Create Community'} 
//                  {!isSubmitting && <CheckCircle2 size={18} />}
//                </button>
//              )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateCommunityPage;


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowLeft, 
  Image as ImageIcon, 
  Upload, 
  Plus, 
  X, 
  Shield, 
  CheckCircle2,
  Globe,
  Lock,
  Camera,
  User,
  HeartHandshake,
  Tag
} from 'lucide-react';
import Logo from '../../assets/Logo.jpeg';
import { Toaster, toast } from 'sonner';

const CreateCommunityPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New state specifically for the tag input field
  const [tagInput, setTagInput] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tags: [], // Added tags array
    cover: null,      
    coverPreview: '', 
    avatar: null,     
    avatarPreview: '', 
    privacy: 'public',
    rules: ['Be respectful to fellow artists', 'No AI-generated content without tags'],
  });

  // --- Handlers ---

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        [field]: file,
        [`${field}Preview`]: previewUrl
      }));
    }
  };

  // --- Tag Handlers ---
  const handleTagAdd = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newTag = tagInput.trim().toLowerCase();
      
      if (newTag && formData.tags.length < 5) {
        if (!formData.tags.includes(newTag)) {
          setFormData((prev) => ({ ...prev, tags: [...prev.tags, newTag] }));
        } else {
          toast.info('Tag already added');
        }
        setTagInput(''); // Clear input after adding
      } else if (formData.tags.length >= 5) {
        toast.warning('Maximum of 5 tags allowed');
      }
    }
  };

  const removeTag = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, index) => index !== indexToRemove)
    }));
  };

  // --- Rule Handlers ---
  const handleRuleChange = (index, value) => {
    const newRules = [...formData.rules];
    newRules[index] = value;
    setFormData((prev) => ({ ...prev, rules: newRules }));
  };

  const addRule = () => {
    setFormData((prev) => ({ ...prev, rules: [...prev.rules, ''] }));
  };

  const removeRule = (index) => {
    setFormData((prev) => ({
      ...prev,
      rules: prev.rules.filter((_, i) => i !== index),
    }));
  };

  // --- Validation & Navigation ---

  const validateStep = () => {
    if (step === 1) {
      if (!formData.name.trim()) {
        toast.error('Community name is required');
        return false;
      }
      if (!formData.description.trim()) {
        toast.error('Community description is required');
        return false;
      }
      if (!formData.coverPreview) {
        toast.info('Adding a cover image is recommended!');
      }
    }
    if (step === 2) {
      const validRules = formData.rules.filter(rule => rule.trim() !== '');
      if (validRules.length === 0) {
        toast.error('Please add at least one community rule');
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  // --- Simulated Submission ---

  const handleSubmit = async () => {
    if (!validateStep()) return; 

    setIsSubmitting(true);
    const toastId = toast.loading('Launching your community...');

    try {
      // Simulate an API call / Backend processing time
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success('Community published successfully!', { id: toastId });
      const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      navigate(`/community/${slug}`);
      
    } catch (error) {
      console.error('Error creating community:', error);
      toast.error('Failed to create community. Please try again.', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800">
      <Toaster position="top-center" richColors theme="system" />
      
      {/* Navbar with Logo and Icons */}
      <header>
        <nav className="fixed top-0 h-16 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-md z-50 flex items-center justify-between px-6">
          <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 font-bold tracking-tight text-lg">
              <div className="w-8 h-8 bg-zinc-900 dark:bg-white rounded-lg flex items-center justify-center overflow-hidden">
                <img src={Logo} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-Eagle">Painters' Diary</span>
            </Link>
            
            <div className="flex items-center gap-5 text-zinc-500">
              <Link to="/community" className="hover:text-black dark:hover:text-white transition-colors" title="Communities">
                <HeartHandshake size={20} />
              </Link>
              <Link to="/profile" className="hover:text-black dark:hover:text-white transition-colors" title="Account">
                <User size={20} />
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <div className="max-w-2xl mx-auto pt-32 pb-20 px-6">
        
        {/* Progress Indicator */}
        <div className="flex gap-2 mb-12">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                step >= i ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-200 dark:bg-zinc-800'
              }`} 
            />
          ))}
        </div>

        <div>
          <AnimatePresence mode="wait">
            
            {/* --- STEP 1: IDENTITY --- */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-3xl font-bold tracking-tight mb-2">Community Identity</h1>
                  <p className="text-zinc-500">Define the visual look and feel of your new space.</p>
                </div>

                {/* Cover Image Upload */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Cover Image</label>
                  <div className="relative group h-48 w-full bg-zinc-100 dark:bg-zinc-900 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl overflow-hidden transition-colors hover:border-zinc-400 dark:hover:border-zinc-500">
                    {formData.coverPreview ? (
                      <div className="w-full h-full relative">
                        <img src={formData.coverPreview} alt="Cover" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          <p className="text-white font-medium flex items-center gap-2"><Camera size={20}/> Change Cover</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-zinc-400 pointer-events-none">
                        <ImageIcon size={32} className="mb-2" />
                        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">Click to upload cover</span>
                        <span className="text-xs mt-1">1200 x 400 recommended</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'cover')} 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  {/* Logo/Avatar Upload */}
                  <div className="space-y-2 shrink-0">
                    <label className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Logo</label>
                    <div className="relative group w-24 h-24 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center overflow-hidden">
                      {formData.avatarPreview ? (
                        <div className="w-full h-full relative">
                          <img src={formData.avatarPreview} alt="Logo" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                            <Upload size={16} className="text-white" />
                          </div>
                        </div>
                      ) : (
                        <div className="pointer-events-none">
                          <Upload size={24} className="text-zinc-400" />
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'avatar')}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                      />
                    </div>
                  </div>

                  <div className="flex-1 space-y-6 w-full">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Minimalist Designers"
                        className="w-full text-2xl font-bold bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-2 focus:outline-none focus:border-black dark:focus:border-white placeholder:text-zinc-300 dark:placeholder:text-zinc-700 transition-colors"
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); nextStep(); } }}
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        placeholder="What is this community about?"
                        className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all resize-none"
                      />
                    </div>

                    {/* Tags Section */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Tags</label>
                        <span className="text-xs text-zinc-400">{formData.tags.length}/5</span>
                      </div>
                      
                      {/* Display added tags */}
                      {formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {formData.tags.map((tag, index) => (
                            <span 
                              key={index} 
                              className="bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-3 py-1 rounded-md text-sm flex items-center gap-1.5 transition-colors"
                            >
                              #{tag}
                              <button 
                                type="button" 
                                onClick={() => removeTag(index)}
                                className="hover:text-red-500 focus:outline-none"
                              >
                                <X size={14} />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Tag Input */}
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagAdd}
                        disabled={formData.tags.length >= 5}
                        placeholder={formData.tags.length >= 5 ? "Maximum tags reached" : "Press Enter to add tags (e.g. painting, modern)"}
                        className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-2 text-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors disabled:opacity-50"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* --- STEP 2: GUIDELINES --- */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-3xl font-bold tracking-tight mb-2">Guidelines & Privacy</h1>
                  <p className="text-zinc-500">Set the rules and visibility of your space.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, privacy: 'public' }))}
                    className={`p-4 rounded-xl border flex flex-col items-center text-center gap-2 transition-all ${
                      formData.privacy === 'public' 
                        ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black' 
                        : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-zinc-400'
                    }`}
                  >
                    <Globe size={24} />
                    <span className="font-medium">Public</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, privacy: 'private' }))}
                    className={`p-4 rounded-xl border flex flex-col items-center text-center gap-2 transition-all ${
                      formData.privacy === 'private' 
                        ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black' 
                        : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-zinc-400'
                    }`}
                  >
                    <Lock size={24} />
                    <span className="font-medium">Private</span>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Community Rules</label>
                  </div>
                  
                  {formData.rules.map((rule, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-2"
                    >
                      <div className="flex items-center justify-center w-8 h-10 text-zinc-400 font-mono text-sm">
                        {index + 1}.
                      </div>
                      <input
                        type="text"
                        value={rule}
                        onChange={(e) => handleRuleChange(index, e.target.value)}
                        placeholder="Enter a rule..."
                        className="flex-1 bg-transparent border-b border-zinc-200 dark:border-zinc-800 py-2 focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-colors"
                        onKeyDown={(e) => { 
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addRule();
                          }
                        }}
                      />
                      <button 
                        type="button"
                        onClick={() => removeRule(index)}
                        className="text-zinc-400 hover:text-red-500 transition-colors px-2"
                      >
                        <X size={18} />
                      </button>
                    </motion.div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={addRule}
                    className="flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-white hover:opacity-70 transition-opacity mt-4 pl-10"
                  >
                    <Plus size={16} /> Add Rule
                  </button>
                </div>
              </motion.div>
            )}

            {/* --- STEP 3: REVIEW --- */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-3xl font-bold tracking-tight mb-2">Review & Publish</h1>
                  <p className="text-zinc-500">Take a final look before launching your community.</p>
                </div>

                <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-black shadow-lg">
                  <div className="h-48 w-full bg-zinc-100 dark:bg-zinc-900 relative">
                     {formData.coverPreview && <img src={formData.coverPreview} className="w-full h-full object-cover" alt="Cover" />}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  
                  <div className="px-6 pb-6 -mt-10 relative">
                    <div className="flex justify-between items-end">
                      <div className="flex gap-4 items-end">
                        <div className="w-24 h-24 rounded-xl bg-white dark:bg-zinc-900 p-1 shadow-md">
                          {formData.avatarPreview ? (
                            <img src={formData.avatarPreview} className="w-full h-full rounded-lg object-cover bg-zinc-200" alt="Avatar" />
                          ) : (
                            <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-2xl">🎨</div>
                          )}
                        </div>
                        <div className="mb-2">
                           <h2 className="text-2xl font-bold text-white drop-shadow-md font-Quicksand">{formData.name}</h2>
                           <div className="text-zinc-200 text-sm drop-shadow-md flex items-center justify-start gap-3 mt-1">
                             <span className="flex items-center gap-1">
                               {formData.privacy === 'public' ? <Globe size={12}/> : <Lock size={12}/>} 
                               {formData.privacy.charAt(0).toUpperCase() + formData.privacy.slice(1)} Group
                             </span>
                           </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 space-y-4">
                      <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
                        {formData.description}
                      </p>

                      {/* Display Tags in Preview */}
                      {formData.tags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                          <Tag size={16} className="text-zinc-400 mr-1" />
                          {formData.tags.map((tag, index) => (
                            <span 
                              key={index} 
                              className="bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 px-2.5 py-1 rounded-md text-xs font-medium"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-lg border border-zinc-100 dark:border-zinc-800 mt-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-2">
                          <Shield size={12} /> Community Rules
                        </h3>
                        <ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                          {formData.rules.filter(r => r.trim()).map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
          
          {/* Form Actions */}
          <div className="mt-12 flex justify-between items-center gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
             {/* Back Button */}
             {step > 1 && (
               <button 
                type="button" 
                onClick={prevStep}
                disabled={isSubmitting}
                className="px-6 py-2 rounded-lg font-medium border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-300 transition-colors flex items-center gap-2 disabled:opacity-50"
               >
                 <ArrowLeft size={18} /> Back
               </button>
             )}

             {/* Dynamic spacing to keep Next button on the right if Back is missing */}
             {step === 1 && <div />}

             {/* Continue Button (Steps 1 & 2) vs Submit Button (Step 3) */}
             {step < 3 ? (
               <button 
                type="button" 
                onClick={nextStep}
                className="bg-zinc-900 dark:bg-white text-white dark:text-black px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
               >
                 Continue <ArrowRight size={18} />
               </button>
             ) : (
               <button 
                type="button" 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
               >
                 {isSubmitting ? 'Creating...' : 'Create Community'} 
                 {!isSubmitting && <CheckCircle2 size={18} />}
               </button>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCommunityPage;