import { useState } from "react";
import { Heart, Share2, Download, MoreVertical, Send, Eye, Bookmark, ChevronLeft, ChevronRight } from "lucide-react";
import { toast, Toaster } from "sonner"; 

const FeedCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.liked || false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [isSaved, setIsSaved] = useState(post.saved || false);
  const [comment, setComment] = useState("");
  
  // Image carousel state
  const [currentIdx, setCurrentIdx] = useState(0);
  const hasMultipleImages = post.images && post.images.length > 1;

  const handleLike = () => {
    setIsLiked((prev) => {
      const newState = !prev;
      if (newState) toast.success("Added to favorites");
      else toast("Removed from favorites");
      return newState;
    });
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleSave = () => {
    setIsSaved((prev) => {
      const newState = !prev;
      if (newState) toast.success("Saved to bookmarks");
      else toast("Removed from bookmarks");
      return newState;
    });
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    if (currentIdx > 0) setCurrentIdx((prev) => prev - 1);
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    if (currentIdx < post.images.length - 1) setCurrentIdx((prev) => prev + 1);
  };

  // ── shared glass panel style ──────────────────────────────────────────────
  const glassPanel =
    "bg-white/80 dark:bg-zinc-900/70 " +
    "backdrop-blur-md " +
    "border border-zinc-200/70 dark:border-zinc-700/40 " +
    "shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)]";

  return (
    <div className="w-full max-w-lg mx-auto mb-10 flex flex-col gap-[6px] transition-all duration-300 hover:-translate-y-0.5">
        <Toaster position="top-center" richColors theme="system"/>

      {/* ══ PART 1 — HEADER ══════════════════════════════════════════════════ */}
      <div className={`flex items-center justify-between px-4 rounded-xl ${glassPanel}`} style={{ height: 58 }}>
        <div className="flex items-center gap-3">
          <img src={post.avatar} alt={post.artist} className="w-9 h-9 rounded-full object-cover border border-zinc-200/80 dark:border-zinc-700/50 flex-shrink-0" />
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="text-[13.5px] text-start font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 font-Quicksand">
              {post.artist}
            </span>
            <span className="text-[11px] italic text-zinc-400 text-start mt-1 dark:text-zinc-500 font-Playfair">
              {post.medium}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-[12.5px] font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" style={{ fontFamily: "'Quicksand', sans-serif" }}>
            Follow
          </button>
          <span className="inline-block w-px h-[14px] bg-zinc-200/80 dark:bg-zinc-700/50" />
          <button className="text-zinc-400 dark:text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
            <MoreVertical size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* ══ PART 2 — IMAGE CAROUSEL ═════════════════════════════════════════ */}
      <div className="relative w-full overflow-hidden rounded-lg border border-zinc-100/80 dark:border-zinc-800/60 group" style={{ aspectRatio: "4/3" }}>
        
        {/* Main Image */}
        <img
          src={post.images[currentIdx]}
          alt={`${post.title} - Image ${currentIdx + 1}`}
          className="w-full h-full object-cover block transition-opacity duration-300"
        />

        {/* Carousel Controls Overlay */}
        {hasMultipleImages && (
          <div className="absolute bottom-0 left-0 right-0 p-3 pt-12 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end justify-between">
            
            {/* Empty space on the left to perfectly center the dots */}
            <div className="flex-1" />

            {/* Middle: Dot Indicators */}
            <div className="flex-1 flex justify-center items-center gap-1.5 pb-1">
              {post.images.map((_, index) => (
                <div 
                  key={index} 
                  className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${index === currentIdx ? "w-4 bg-white" : "w-1.5 bg-white/50"}`}
                />
              ))}
            </div>

            {/* Bottom Right: Prev / Next Buttons */}
            <div className="flex-1 flex justify-end items-center gap-2">
              <button 
                onClick={handlePrevImage} 
                disabled={currentIdx === 0}
                className="p-1 rounded-full bg-black/40 backdrop-blur-md text-white transition-all hover:bg-black/60 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} strokeWidth={2.5} />
              </button>
              <button 
                onClick={handleNextImage} 
                disabled={currentIdx === post.images.length - 1}
                className="p-1 rounded-full bg-black/40 backdrop-blur-md text-white transition-all hover:bg-black/60 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ══ PART 3 — METADATA ════════════════════════════════════════════════ */}
      <div className={`flex flex-col rounded-xl ${glassPanel}`} style={{ padding: "14px 16px 16px", gap: 10 }}>
        
        {/* Title + action icons */}
        <div className="flex items-start justify-between gap-3">
          <h2 className="flex-1 text-zinc-900 dark:text-zinc-100 leading-snug text-start" style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 16.5, fontWeight: 700, letterSpacing: "-0.01em" }}>
            {post.title}
          </h2>

          <div className="flex items-center flex-shrink-0 mt-0.5 -mr-1 gap-2"> 
            <button onClick={handleLike} className="flex items-center gap-1.5 transition-all active:scale-95 group">
              <Heart size={13} strokeWidth={1.5} className={isLiked ? "text-[#b06060]" : "text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors"} style={{ fill: isLiked ? "#b06060" : "none" }} />
              <span className={`text-[11.5px] tabular-nums ${isLiked ? "text-[#b06060]" : "text-zinc-400 dark:text-zinc-600"}`} style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 600 }}>
                {likeCount.toLocaleString()}
              </span>
            </button>

            <button className="p-1.5 rounded-lg text-zinc-400 dark:text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60 transition-colors">
              <Share2 size={15} strokeWidth={1.6} />
            </button>
            <button onClick={handleSave} className="p-1.5 rounded-lg text-zinc-400 dark:text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60 transition-colors active:scale-95">
              <Bookmark size={15} strokeWidth={1.6} className={isSaved ? "text-zinc-800 dark:text-zinc-200" : ""} style={{ fill: isSaved ? "currentColor" : "none" }} />
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-start" style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, lineHeight: 1.75 }}>
          {post.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-zinc-400 dark:text-zinc-600" style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.04em" }}>
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <Eye size={13} strokeWidth={1.5} className="text-zinc-300 dark:text-zinc-700" />
            <span className="text-[11.5px] tabular-nums text-zinc-400 dark:text-zinc-600" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 600 }}>
              {post.views.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-zinc-200/60 dark:bg-zinc-700/40" />

        {/* Comment row */}
        <div className="flex items-center gap-2.5">
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=60&q=80" alt="You" className="w-6 h-6 rounded-full object-cover border border-zinc-200/80 dark:border-zinc-700/50 flex-shrink-0" />
          <input type="text" placeholder="Leave a quiet thought…" value={comment} onChange={(e) => setComment(e.target.value)} className="flex-1 bg-transparent border-none outline-none text-[13px] italic text-zinc-500 dark:text-zinc-400 placeholder:text-zinc-300 dark:placeholder:text-zinc-600" style={{ fontFamily: "'Playfair Display', serif" }} />
          {comment && (
            <button className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors">
              <Send size={13} strokeWidth={1.6} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedCard;


// import { useState, useEffect } from "react";
// import { Heart, Share2, MoreVertical, Send, Eye, Bookmark, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
// import { toast, Toaster } from "sonner";

// // Added `isLoading` prop to conditionally render the skeleton
// const FeedCard = ({ post, isLoading = false }) => {
//   // Post data states
//   const [isLiked, setIsLiked] = useState(post?.liked || false);
//   const [likeCount, setLikeCount] = useState(post?.likes || 0);
//   const [isSaved, setIsSaved] = useState(post?.saved || false);
//   const [comment, setComment] = useState("");
  
//   // Image carousel & loading states
//   const [currentIdx, setCurrentIdx] = useState(0);
//   const [isImageLoading, setIsImageLoading] = useState(true);
  
//   const hasMultipleImages = post?.images && post.images.length > 1;

//   // Reset image loading state when the index changes
//   useEffect(() => {
//     setIsImageLoading(true);
//   }, [currentIdx]);

//   const handleLike = () => {
//     setIsLiked((prev) => {
//       const newState = !prev;
//       if (newState) toast.success("Added to favorites");
//       else toast("Removed from favorites");
//       return newState;
//     });
//     setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
//   };

//   const handleSave = () => {
//     setIsSaved((prev) => {
//       const newState = !prev;
//       if (newState) toast.success("Saved to bookmarks");
//       else toast("Removed from bookmarks");
//       return newState;
//     });
//   };

//   const handlePrevImage = (e) => {
//     e.stopPropagation();
//     if (currentIdx > 0) setCurrentIdx((prev) => prev - 1);
//   };

//   const handleNextImage = (e) => {
//     e.stopPropagation();
//     if (currentIdx < post.images.length - 1) setCurrentIdx((prev) => prev + 1);
//   };

//   const glassPanel =
//     "bg-white/80 dark:bg-zinc-900/70 backdrop-blur-md border border-zinc-200/70 dark:border-zinc-700/40 shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)]";

//   // ── SKELETON LOADER ─────────────────────────────────────────────────────────
//   if (isLoading) {
//     return (
//       <div className="w-full max-w-lg mx-auto mb-10 flex flex-col gap-1.5">
//         {/* Header Skeleton */}
//         <div className={`flex items-center px-4 rounded-xl gap-3 ${glassPanel}`} style={{ height: 58 }}>
//           <div className="w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse shrink-0" />
//           <div className="flex flex-col gap-1.5 flex-1">
//             <div className="h-3.5 w-24 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
//             <div className="h-2.5 w-16 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
//           </div>
//         </div>

//         {/* Image Skeleton */}
//         <div className="w-full rounded-lg bg-zinc-200 dark:bg-zinc-800 animate-pulse border border-zinc-100/80 dark:border-zinc-800/60" style={{ aspectRatio: "4/3" }} />

//         {/* Metadata Skeleton */}
//         <div className={`flex flex-col rounded-xl p-4 gap-3.5 ${glassPanel}`}>
//           <div className="h-5 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
//           <div className="space-y-2">
//             <div className="h-3 w-full bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
//             <div className="h-3 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
//             <div className="h-3 w-4/6 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
//           </div>
//           <div className="flex gap-2 pt-2">
//             <div className="h-5 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-full animate-pulse" />
//             <div className="h-5 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-full animate-pulse" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ── MAIN RENDER ─────────────────────────────────────────────────────────────
//   return (
//     <div className="w-full max-w-lg mx-auto mb-10 flex flex-col gap-[6px] transition-all duration-300 hover:-translate-y-0.5">
//       <Toaster position="top-center" richColors theme="system" />

//       {/* HEADER */}
//       <div className={`flex items-center justify-between px-4 rounded-xl ${glassPanel}`} style={{ height: 58 }}>
//         <div className="flex items-center gap-3">
//           <img src={post.avatar} alt={post.artist} className="w-9 h-9 rounded-full object-cover border border-zinc-200/80 dark:border-zinc-700/50 flex-shrink-0 cursor-pointer" />
//           <div className="flex flex-col gap-0.5 leading-none">
//             <span className="text-[13.5px] text-start font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 font-Quicksand hover:underline cursor-pointer">
//               {post.artist}
//             </span>
//             <span className="text-[11px] italic text-zinc-400 text-start mt-1 dark:text-zinc-500 font-Playfair">
//               {post.medium}
//             </span>
//           </div>
//         </div>

//         <div className="flex items-center gap-3">
//           <button className="text-[12.5px] font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" style={{ fontFamily: "'Quicksand', sans-serif" }}>
//             Follow
//           </button>
//           <span className="inline-block w-px h-[14px] bg-zinc-200/80 dark:bg-zinc-700/50" />
//           <button className="text-zinc-400 dark:text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
//             <MoreVertical size={16} strokeWidth={1.5} />
//           </button>
//         </div>
//       </div>

//       {/* IMAGE CAROUSEL WITH LOADING STATE */}
//       <div className="relative w-full bg-zinc-100 dark:bg-zinc-900 overflow-hidden rounded-lg border border-zinc-100/80 dark:border-zinc-800/60 group" style={{ aspectRatio: "4/3" }}>
        
//         {/* Network Loading Spinner */}
//         {isImageLoading && (
//           <div className="absolute inset-0 flex items-center justify-center z-10 bg-zinc-100/50 dark:bg-zinc-900/50 animate-pulse backdrop-blur-sm">
//             <Loader2 className="animate-spin text-zinc-400 dark:text-zinc-500" size={24} />
//           </div>
//         )}

//         {/* Main Image */}
//         <img
//           src={post.images[currentIdx]}
//           alt={`${post.title} - Image ${currentIdx + 1}`}
//           onLoad={() => setIsImageLoading(false)}
//           className={`w-full h-full object-cover block transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
//         />

//         {/* Carousel Controls Overlay */}
//         {hasMultipleImages && (
//           <div className="absolute bottom-0 left-0 right-0 p-3 pt-12 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end justify-between z-20">
//             <div className="flex-1" />
//             {/* Middle: Dot Indicators */}
//             <div className="flex-1 flex justify-center items-center gap-1.5 pb-1">
//               {post.images.map((_, index) => (
//                 <div key={index} className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${index === currentIdx ? "w-4 bg-white" : "w-1.5 bg-white/50"}`} />
//               ))}
//             </div>
//             {/* Bottom Right: Prev / Next Buttons */}
//             <div className="flex-1 flex justify-end items-center gap-2">
//               <button 
//                 onClick={handlePrevImage} disabled={currentIdx === 0}
//                 className="p-1.5 rounded-full bg-black/40 backdrop-blur-md text-white transition-all hover:bg-black/60 disabled:opacity-30 disabled:cursor-not-allowed"
//               >
//                 <ChevronLeft size={16} strokeWidth={2.5} />
//               </button>
//               <button 
//                 onClick={handleNextImage} disabled={currentIdx === post.images.length - 1}
//                 className="p-1.5 rounded-full bg-black/40 backdrop-blur-md text-white transition-all hover:bg-black/60 disabled:opacity-30 disabled:cursor-not-allowed"
//               >
//                 <ChevronRight size={16} strokeWidth={2.5} />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* METADATA */}
//       <div className={`flex flex-col rounded-xl ${glassPanel}`} style={{ padding: "14px 16px 16px", gap: 10 }}>
//         <div className="flex items-start justify-between gap-3">
//           <h2 className="flex-1 text-zinc-900 dark:text-zinc-100 leading-snug text-start" style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 16.5, fontWeight: 700, letterSpacing: "-0.01em" }}>
//             {post.title}
//           </h2>
//           <div className="flex items-center flex-shrink-0 mt-0.5 -mr-1 gap-2"> 
//             <button onClick={handleLike} className="flex items-center gap-1.5 transition-all active:scale-95 group cursor-pointer">
//               <Heart size={13} strokeWidth={1.5} className={isLiked ? "text-[#b06060]" : "text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors"} style={{ fill: isLiked ? "#b06060" : "none" }} />
//               <span className={`text-[11.5px] tabular-nums ${isLiked ? "text-[#b06060]" : "text-zinc-400 dark:text-zinc-600"}`} style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 600 }}>
//                 {likeCount.toLocaleString()}
//               </span>
//             </button>
//             <button className="p-1.5 cursor-pointer rounded-lg text-zinc-400 dark:text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60 transition-colors">
//               <Share2 size={15} strokeWidth={1.6} />
//             </button>
//             <button onClick={handleSave} className="p-1.5 cursor-pointer rounded-lg text-zinc-400 dark:text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60 transition-colors active:scale-95">
//               <Bookmark size={15} strokeWidth={1.6} className={isSaved ? "text-zinc-800 dark:text-zinc-200" : ""} style={{ fill: isSaved ? "currentColor" : "none" }} />
//             </button>
//           </div>
//         </div>

//         <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-start" style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, lineHeight: 1.75 }}>
//           {post.description}
//         </p>

//         <div className="flex flex-wrap items-center justify-between gap-2">
//           <div className="flex flex-wrap gap-2">
//             {post.tags.map((tag) => (
//               <span key={tag} className="text-zinc-400 dark:text-zinc-600" style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.04em" }}>
//                 #{tag}
//               </span>
//             ))}
//           </div>
//           <div className="flex items-center gap-1.5">
//             <Eye size={13} strokeWidth={1.5} className="text-zinc-300 dark:text-zinc-700" />
//             <span className="text-[11.5px] tabular-nums text-zinc-400 dark:text-zinc-600" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 600 }}>
//               {post.views.toLocaleString()}
//             </span>
//           </div>
//         </div>

//         <div className="h-px bg-zinc-200/60 dark:bg-zinc-700/40" />

//         <div className="flex items-center gap-2.5">
//           <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=60&q=80" alt="You" className="w-6 h-6 rounded-full object-cover border border-zinc-200/80 dark:border-zinc-700/50 flex-shrink-0" />
//           <input type="text" placeholder="Leave a quiet thought…" value={comment} onChange={(e) => setComment(e.target.value)} className="flex-1 bg-transparent border-none outline-none text-[13px] italic text-zinc-500 dark:text-zinc-400 placeholder:text-zinc-300 dark:placeholder:text-zinc-600" style={{ fontFamily: "'Playfair Display', serif" }} />
//           {comment && (
//             <button className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors">
//               <Send size={13} strokeWidth={1.6} />
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeedCard;