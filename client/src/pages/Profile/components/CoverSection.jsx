import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SquarePen, ImagePlus, X, Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner'; 
import { coverImages } from './coverImages'; // Ensure this path is correct
import { getProfileInfo, updateCover } from '../../../service/profile.service';

export default function CoverSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  
  // States
  const [currentCover, setCurrentCover] = useState(null); // The actual saved cover
  const [previewCover, setPreviewCover] = useState(null); // The temp cover in the modal
  const [selectedFile, setSelectedFile] = useState(null); // The physical file if uploaded
  const [selectionType, setSelectionType] = useState('url'); // 'url' or 'file'
  const [isSaving, setIsSaving] = useState(false);

  // 1. Fetch initial cover on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfileInfo();
        if (data?.user?.coverImage) {
          setCurrentCover(data.user.coverImage);
        }
      } catch (error) {
        console.error("Failed to fetch profile info:", error);
      }
    };
    fetchProfile();
  }, []); // <-- Added empty array to prevent infinite loop

  // 2. Handle opening the modal
  const handleOpenModal = () => {
    setPreviewCover(currentCover); // Reset preview to current saved cover
    setSelectedFile(null);
    setSelectionType('url');
    setIsModalOpen(true);
  };

  // 3. Handle choosing a default image
  const handleDefaultSelect = (url) => {
    setPreviewCover(url);
    setSelectionType('url');
    setSelectedFile(null);
  };

  // 4. Handle uploading a custom file
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB.");
      return;
    }

    // Create a local URL just for previewing
    setPreviewCover(URL.createObjectURL(file));
    setSelectedFile(file);
    setSelectionType('file');
  };

  // 5. Handle the actual SAVE action
  const handleSaveCover = async () => {
    // If they haven't changed anything, just close the modal
    if (previewCover === currentCover) {
      setIsModalOpen(false);
      return;
    }

    setIsSaving(true);
    const toastId = toast.loading("Saving cover photo...");

    try {
      const formData = new FormData();

      if (selectionType === 'file' && selectedFile) {
        // Appending the actual file object
        formData.append('coverImage', selectedFile); 
      } else if (selectionType === 'url' && previewCover) {
        // Appending the string URL (Database will save this string)
        formData.append('coverImageUrl', previewCover);
      }

      // Call your API service
      const response = await updateCover(formData);
      
      // Update the main UI with the finalized URL from the database
      setCurrentCover(response.user.coverImage);
      toast.success("Cover updated successfully!", { id: toastId });
      setIsModalOpen(false);

    } catch (error) {
      console.error("Failed to upload cover:", error);
      toast.error("Failed to update cover. Please try again.", { id: toastId });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {/* --- MAIN DISPLAY --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full h-48 md:h-64 lg:h-72 rounded-lg overflow-hidden relative bg-zinc-100 dark:bg-zinc-900 transition-colors duration-300 group"
      >
        {currentCover ? (
          <img 
            src={currentCover} 
            alt="Cover" 
            className="w-full h-full object-cover transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
            <span className="text-zinc-400 dark:text-zinc-600 font-medium tracking-wide">No Cover Set</span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80 dark:from-[#09090b] dark:opacity-60 transition-colors duration-300 pointer-events-none" />
        
        <div 
          onClick={handleOpenModal}
          className="absolute bottom-4 right-4 p-2.5 border border-zinc-200/50 dark:border-zinc-700/50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-lg shadow-lg hover:scale-105 hover:bg-white dark:hover:bg-zinc-800 transition-all cursor-pointer z-10"
        >
          <SquarePen size={18} className="text-zinc-800 dark:text-zinc-200" />
        </div>
      </motion.div>

      {/* --- EDIT MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSaving && setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 dark:bg-black/80 backdrop-blur-sm"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-zinc-100 dark:border-zinc-800">
                <h3 className="font-bold text-lg text-zinc-900 dark:text-white">Update Cover</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSaving}
                  className="p-1 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-4 sm:p-5 overflow-y-auto custom-scrollbar">
                
                {/* Live Preview of Selection */}
                {previewCover && (
                  <div className="w-full h-32 sm:h-40 mb-6 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 relative">
                    <img src={previewCover} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] uppercase font-bold text-white tracking-wider">
                      Preview
                    </div>
                  </div>
                )}

                {/* Custom Upload Box */}
                <div className="mb-6">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex flex-col items-center justify-center py-6 border-2 border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 cursor-pointer transition-all"
                  >
                    <ImagePlus size={28} className="text-zinc-400 dark:text-zinc-500 mb-2" />
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">Upload from device</p>
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileSelect}
                  />
                </div>

                <div className="relative flex items-center py-2 mb-4">
                  <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
                  <span className="flex-shrink-0 mx-4 text-xs font-medium uppercase tracking-wider text-zinc-500">Or choose a default</span>
                  <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
                </div>

                {/* Default Images Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {coverImages.map((url, index) => {
                    const isSelected = previewCover === url;
                    return (
                      <div 
                        key={index}
                        onClick={() => handleDefaultSelect(url)}
                        className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer border-2 transition-all group ${
                          isSelected 
                            ? "border-zinc-900 dark:border-white shadow-md" 
                            : "border-transparent hover:border-zinc-300 dark:hover:border-zinc-700"
                        }`}
                      >
                        <img src={url} alt={`Default ${index + 1}`} className="w-full h-full object-cover" loading="lazy" />
                        
                        {isSelected ? (
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center shadow-lg">
                              <Check size={16} strokeWidth={3} />
                            </div>
                          </div>
                        ) : (
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sticky Footer with Save Button */}
              <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] flex justify-end gap-3">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSaving}
                  className="px-5 py-2 rounded-lg text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveCover}
                  disabled={isSaving || !previewCover}
                  className="px-6 py-2 rounded-lg text-sm font-semibold bg-zinc-900 text-white dark:bg-white dark:text-black hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
                >
                  {isSaving && <Loader2 size={16} className="animate-spin" />}
                  {isSaving ? "Saving..." : "Save Cover"}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}



// /**
//  * CoverSection Component - Premium Edition
//  * Purpose: Allow users to update their profile cover image with smooth animations
//  * Features:
//  * - Glassmorphic modal design
//  * - Smooth staggered animations
//  * - Enhanced mobile experience
//  * - Better drag-and-drop UX
//  * - Loading states with premium spinners
//  * - Default image suggestions with badges
//  * - Optimized image previews
//  */

// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { SquarePen, ImagePlus, X, Check, Loader2, Upload, Sparkles, Cloud } from 'lucide-react';
// import { toast } from 'sonner'; 
// import { coverImages } from './coverImages';
// import { getProfileInfo, updateCover } from '../../../service/profile.service';

// // Animation variants
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.05, delayChildren: 0.1 }
//   }
// };

// const itemVariants = {
//   hidden: { opacity: 0, scale: 0.9 },
//   visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } }
// };

// export default function CoverSection() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isDragActive, setIsDragActive] = useState(false);
//   const fileInputRef = useRef(null);
  
//   // States
//   const [currentCover, setCurrentCover] = useState(null);
//   const [previewCover, setPreviewCover] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [selectionType, setSelectionType] = useState('url');
//   const [isSaving, setIsSaving] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [imageLoadedPreview, setImageLoadedPreview] = useState(false);

//   // Fetch initial cover
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setIsLoading(true);
//         const data = await getProfileInfo();
//         if (data?.user?.coverImage) {
//           setCurrentCover(data.user.coverImage);
//         }
//       } catch (error) {
//         console.error("Failed to fetch profile info:", error);
//         toast.error("Failed to load cover image");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);

//   // Handle modal open
//   const handleOpenModal = () => {
//     setPreviewCover(currentCover);
//     setSelectedFile(null);
//     setSelectionType('url');
//     setImageLoadedPreview(false);
//     setIsModalOpen(true);
//   };

//   // Handle default image selection
//   const handleDefaultSelect = (url) => {
//     setPreviewCover(url);
//     setSelectionType('url');
//     setSelectedFile(null);
//     setImageLoadedPreview(false);
//   };

//   // Handle file selection
//   const handleFileSelect = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     processFile(file);
//   };

//   // Process file (used for both click and drag)
//   const processFile = (file) => {
//     if (!file.type.startsWith('image/')) {
//       toast.error("Please select a valid image file.", {
//         icon: '🖼️'
//       });
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       toast.error("Image must be smaller than 5MB.", {
//         icon: '📦'
//       });
//       return;
//     }

//     const objectUrl = URL.createObjectURL(file);
//     setPreviewCover(objectUrl);
//     setSelectedFile(file);
//     setSelectionType('file');
//     setImageLoadedPreview(false);
//     toast.success("Image selected! Ready to save.", {
//       icon: '✨'
//     });
//   };

//   // Drag and drop handlers
//   const handleDragEnter = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragActive(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.currentTarget === e.target) {
//       setIsDragActive(false);
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragActive(false);

//     const files = e.dataTransfer.files;
//     if (files && files[0]) {
//       processFile(files[0]);
//     }
//   };

//   // Save cover
//   const handleSaveCover = async () => {
//     if (previewCover === currentCover) {
//       setIsModalOpen(false);
//       return;
//     }

//     setIsSaving(true);
//     const toastId = toast.loading("Uploading your cover...", {
//       icon: <Cloud className="animate-bounce" size={20} />
//     });

//     try {
//       const formData = new FormData();

//       if (selectionType === 'file' && selectedFile) {
//         formData.append('coverImage', selectedFile);
//       } else if (selectionType === 'url' && previewCover) {
//         formData.append('coverImageUrl', previewCover);
//       }

//       const response = await updateCover(formData);
//       setCurrentCover(response.user.coverImage);
      
//       toast.dismiss(toastId);
//       toast.success("Cover updated beautifully!", {
//         icon: '🎉',
//         duration: 3000
//       });
      
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Failed to upload cover:", error);
//       toast.dismiss(toastId);
//       toast.error("Failed to update cover. Please try again.", {
//         icon: '❌',
//         duration: 4000
//       });
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <>
//       {/* MAIN DISPLAY */}
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, ease: "easeOut" }}
//         className="w-full h-48 md:h-64 lg:h-72 rounded-2xl overflow-hidden relative bg-gradient-to-br from-zinc-100 via-zinc-50 to-zinc-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 transition-colors duration-300 group shadow-lg"
//       >
//         {/* Loading skeleton */}
//         {isLoading && (
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="absolute inset-0 bg-gradient-to-r from-zinc-200 via-zinc-100 to-zinc-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800 animate-pulse flex items-center justify-center z-10"
//           >
//             <div className="flex flex-col items-center gap-2">
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//                 className="text-zinc-400 dark:text-zinc-500"
//               >
//                 <Cloud size={32} />
//               </motion.div>
//               <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Loading...</span>
//             </div>
//           </motion.div>
//         )}

//         {/* Cover Image */}
//         {currentCover && !isLoading && (
//           <motion.img 
//             initial={{ opacity: 0, scale: 1.02 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.7, ease: "easeOut" }}
//             src={currentCover} 
//             alt="Cover" 
//             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//           />
//         )}

//         {/* Empty State */}
//         {!currentCover && !isLoading && (
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="w-full h-full bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900 flex flex-col items-center justify-center gap-2"
//           >
//             <motion.div
//               animate={{ y: [0, -8, 0] }}
//               transition={{ duration: 2, repeat: Infinity }}
//               className="text-zinc-400 dark:text-zinc-600"
//             >
//               <ImagePlus size={40} strokeWidth={1.5} />
//             </motion.div>
//             <span className="text-zinc-500 dark:text-zinc-400 font-medium text-sm">Add a cover photo</span>
//           </motion.div>
//         )}
        
//         {/* Gradient Overlay */}
//         <motion.div 
//           initial={{ opacity: 0.7 }}
//           whileHover={{ opacity: 0.85 }}
//           transition={{ duration: 0.3 }}
//           className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent dark:from-black/60 pointer-events-none" 
//         />
        
//         {/* Edit Button */}
//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleOpenModal}
//           disabled={isLoading}
//           className="absolute bottom-4 right-4 p-3 border border-white/40 bg-white/20 dark:bg-black/40 backdrop-blur-xl rounded-xl shadow-xl hover:bg-white/30 dark:hover:bg-black/50 active:scale-95 transition-all duration-200 z-10 disabled:opacity-50"
//         >
//           <motion.div
//             whileHover={{ rotate: 20 }}
//             transition={{ duration: 0.2 }}
//           >
//             <SquarePen size={20} className="text-white drop-shadow-lg" />
//           </motion.div>
//         </motion.button>
//       </motion.div>

//       {/* MODAL */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
//             {/* Backdrop */}
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.2 }}
//               onClick={() => !isSaving && setIsModalOpen(false)}
//               className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-md"
//             />

//             {/* Modal Content */}
//             <motion.div 
//               initial={{ opacity: 0, scale: 0.9, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9, y: 20 }}
//               transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.3 }}
//               className="relative w-full max-w-2xl bg-white dark:bg-zinc-950/95 border border-white/40 dark:border-zinc-800/50 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh] backdrop-blur-xl"
//             >
//               {/* Header */}
//               <motion.div 
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.1 }}
//                 className="flex items-center justify-between p-4 sm:p-6 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-gradient-to-r from-white/50 to-transparent dark:from-zinc-900/50 dark:to-transparent"
//               >
//                 <div className="flex items-center gap-3">
//                   <motion.div
//                     animate={{ rotate: [0, 10, -10, 0] }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                     className="text-zinc-900 dark:text-white"
//                   >
//                     <Sparkles size={24} />
//                   </motion.div>
//                   <div>
//                     <h3 className="font-bold text-lg sm:text-xl text-zinc-900 dark:text-white">Update Cover</h3>
//                     <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Choose from defaults or upload</p>
//                   </div>
//                 </div>
                
//                 <motion.button 
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setIsModalOpen(false)}
//                   disabled={isSaving}
//                   className="p-2 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors disabled:opacity-50"
//                 >
//                   <X size={22} />
//                 </motion.button>
//               </motion.div>

//               {/* Content */}
//               <motion.div 
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.15 }}
//                 className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6"
//               >
                
//                 {/* Live Preview */}
//                 {previewCover && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.4 }}
//                     className="w-full h-32 sm:h-48 rounded-2xl overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 relative shadow-lg"
//                   >
//                     <motion.img 
//                       src={previewCover} 
//                       alt="Preview" 
//                       className="w-full h-full object-cover"
//                       initial={{ opacity: 0, scale: 1.05 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       onLoad={() => setImageLoadedPreview(true)}
//                     />
                    
//                     {/* Preview Badge */}
//                     <motion.div 
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       className="absolute top-3 left-3 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-lg text-[11px] uppercase font-bold text-white tracking-wider flex items-center gap-1.5"
//                     >
//                       <Check size={12} />
//                       Preview
//                     </motion.div>

//                     {/* Loading indicator for preview */}
//                     {!imageLoadedPreview && (
//                       <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         className="absolute inset-0 bg-black/20 flex items-center justify-center backdrop-blur-sm"
//                       >
//                         <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
//                           <Loader2 size={24} className="text-white" />
//                         </motion.div>
//                       </motion.div>
//                     )}
//                   </motion.div>
//                 )}

//                 {/* Upload Box */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.2 }}
//                   onDragEnter={handleDragEnter}
//                   onDragLeave={handleDragLeave}
//                   onDragOver={handleDragOver}
//                   onDrop={handleDrop}
//                   onClick={() => fileInputRef.current?.click()}
//                   className={`w-full flex flex-col items-center justify-center py-8 sm:py-10 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
//                     isDragActive
//                       ? 'border-zinc-400 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-900/60 scale-105'
//                       : 'border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/30 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
//                   }`}
//                 >
//                   <motion.div
//                     animate={{ y: isDragActive ? -8 : 0 }}
//                     transition={{ duration: 0.2 }}
//                     className="text-zinc-400 dark:text-zinc-500 mb-3"
//                   >
//                     <Upload size={32} />
//                   </motion.div>
//                   <p className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white text-center">
//                     {isDragActive ? 'Drop your image here' : 'Upload from device'}
//                   </p>
//                   <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5">
//                     or drag and drop • Max 5MB
//                   </p>
//                 </motion.div>

//                 <input 
//                   type="file" 
//                   ref={fileInputRef} 
//                   className="hidden" 
//                   accept="image/*"
//                   onChange={handleFileSelect}
//                 />

//                 {/* Divider */}
//                 <motion.div
//                   initial={{ opacity: 0, scaleX: 0 }}
//                   animate={{ opacity: 1, scaleX: 1 }}
//                   transition={{ delay: 0.25 }}
//                   className="relative flex items-center py-2"
//                 >
//                   <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
//                   <span className="flex-shrink-0 mx-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
//                     Or choose a default
//                   </span>
//                   <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
//                 </motion.div>

//                 {/* Default Images Grid */}
//                 <motion.div
//                   variants={containerVariants}
//                   initial="hidden"
//                   animate="visible"
//                   className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3"
//                 >
//                   {coverImages.map((url, index) => {
//                     const isSelected = previewCover === url;
//                     return (
//                       <motion.div
//                         key={index}
//                         variants={itemVariants}
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={() => handleDefaultSelect(url)}
//                         className={`relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer border-3 transition-all duration-300 shadow-sm hover:shadow-lg group ${
//                           isSelected 
//                             ? "border-zinc-900 dark:border-white shadow-xl" 
//                             : "border-transparent hover:border-zinc-300 dark:hover:border-zinc-600"
//                         }`}
//                       >
//                         <motion.img 
//                           src={url} 
//                           alt={`Cover ${index + 1}`} 
//                           className="w-full h-full object-cover"
//                           loading="lazy"
//                           whileHover={{ scale: 1.1 }}
//                           transition={{ duration: 0.4 }}
//                         />
                        
//                         {/* Overlay */}
//                         <motion.div
//                           initial={{ opacity: 0 }}
//                           whileHover={{ opacity: 1 }}
//                           transition={{ duration: 0.2 }}
//                           className={`absolute inset-0 transition-colors duration-300 ${
//                             isSelected ? 'bg-black/30' : 'bg-black/10 group-hover:bg-black/20'
//                           }`}
//                         />

//                         {/* Selection Check */}
//                         {isSelected && (
//                           <motion.div
//                             initial={{ scale: 0 }}
//                             animate={{ scale: 1 }}
//                             transition={{ type: 'spring', stiffness: 300, damping: 20 }}
//                             className="absolute inset-0 flex items-center justify-center pointer-events-none"
//                           >
//                             <motion.div
//                               animate={{ scale: [1, 1.1, 1] }}
//                               transition={{ duration: 0.6, repeat: Infinity }}
//                               className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white flex items-center justify-center shadow-xl"
//                             >
//                               <Check size={18} strokeWidth={3} />
//                             </motion.div>
//                           </motion.div>
//                         )}
//                       </motion.div>
//                     );
//                   })}
//                 </motion.div>
//               </motion.div>

//               {/* Footer */}
//               <motion.div 
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3 }}
//                 className="p-4 sm:p-6 border-t border-zinc-200/50 dark:border-zinc-800/50 bg-gradient-to-r from-white/40 to-transparent dark:from-zinc-900/40 dark:to-transparent flex justify-end gap-3"
//               >
//                 <motion.button 
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => setIsModalOpen(false)}
//                   disabled={isSaving}
//                   className="px-5 sm:px-6 py-2.5 rounded-lg text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all duration-200 disabled:opacity-50"
//                 >
//                   Cancel
//                 </motion.button>
//                 <motion.button 
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={handleSaveCover}
//                   disabled={isSaving || !previewCover}
//                   className="px-6 sm:px-8 py-2.5 rounded-lg text-sm font-bold bg-gradient-to-r from-zinc-900 to-zinc-800 dark:from-white dark:to-zinc-100 text-white dark:text-black hover:shadow-lg transition-all duration-200 disabled:opacity-50 flex items-center gap-2"
//                 >
//                   {isSaving && (
//                     <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
//                       <Loader2 size={16} />
//                     </motion.div>
//                   )}
//                   <span>{isSaving ? 'Saving...' : 'Save Cover'}</span>
//                 </motion.button>
//               </motion.div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//       {/* Custom Scrollbar Styles */}
//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: transparent;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: rgba(168, 162, 158, 0.4);
//           border-radius: 3px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: rgba(168, 162, 158, 0.6);
//         }
//         .dark .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: rgba(113, 113, 122, 0.4);
//         }
//         .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: rgba(113, 113, 122, 0.6);
//         }
//       `}</style>
//     </>
//   );
// }