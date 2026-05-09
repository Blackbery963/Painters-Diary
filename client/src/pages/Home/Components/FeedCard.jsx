// import { useState } from "react";
// import { Heart, Share2, Download, MoreVertical, Send, Eye, Bookmark } from "lucide-react";

// // ─── Font import — add to your index.html <head> ─────────────────────────────
// // <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700
// //   &family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&display=swap" rel="stylesheet" />

// const FeedCard = ({ post }) => {
//   const [isLiked, setIsLiked]   = useState(post.liked || false);
//   const [likeCount, setLikeCount] = useState(post.likes || 0);
//   const [comment, setComment]   = useState("");

//   const handleLike = () => {
//     setIsLiked((prev) => !prev);
//     setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
//   };

//   // ── shared glass panel style ──────────────────────────────────────────────
//   // Light: white/80 backdrop blur + zinc-200/60 border
//   // Dark:  zinc-900/70 backdrop blur + zinc-700/40 border
//   const glassPanel =
//     "bg-white/80 dark:bg-zinc-900/70 " +
//     "backdrop-blur-md " +
//     "border border-zinc-200/70 dark:border-zinc-700/40 " +
//     "shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)]";

//   return (
//     <div className="w-full max-w-lg mx-auto mb-10 flex flex-col gap-[6px] transition-all duration-300 hover:-translate-y-0.5">

//       {/* ══ PART 1 — HEADER ══════════════════════════════════════════════════ */}
//       <div
//         className={`flex items-center justify-between px-4 rounded-xl ${glassPanel}`}
//         style={{ height: 58 }}
//       >
//         {/* Avatar + name + medium */}
//         <div className="flex items-center gap-3">
//           <img
//             src={post.avatar}
//             alt={post.artist}
//             className="w-9 h-9 rounded-full object-cover border border-zinc-200/80 dark:border-zinc-700/50 flex-shrink-0"
//           />
//           <div className="flex flex-col gap-0.5 leading-none">
//             <span
//               className="text-[13.5px] text-start font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 font-Quicksand"
//             >
//               {post.artist}
//             </span>
//             <span
//               className="text-[11px] italic text-zinc-400 text-start mt-1 dark:text-zinc-500 font-Playfair"
//             >
//               {post.medium}
//             </span>
//           </div>
//         </div>

//         {/* Follow · ··· */}
//         <div className="flex items-center gap-3">
//           <button
//             className="text-[12.5px] font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
//             style={{ fontFamily: "'Quicksand', sans-serif" }}
//           >
//             Follow
//           </button>

//           {/* vertical divider */}
//           <span className="inline-block w-px h-[14px] bg-zinc-200/80 dark:bg-zinc-700/50" />

//           <button className="text-zinc-400 dark:text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
//             <MoreVertical size={16} strokeWidth={1.5} />
//           </button>
//         </div>
//       </div>


//       {/* ══ PART 2 — IMAGE ═══════════════════════════════════════════════════ */}
//       <div className="w-full overflow-hidden rounded-lg border border-zinc-100/80 dark:border-zinc-800/60" style={{ aspectRatio: "4/3" }}>
//         <img
//           src={post.src}
//           alt={post.title}
//           className="w-full h-full object-cover block"
//         />
//       </div>


//       {/* ══ PART 3 — METADATA ════════════════════════════════════════════════ */}
//       <div className={`flex flex-col rounded-xl ${glassPanel}`} style={{ padding: "14px 16px 16px", gap: 10 }}>

//         {/* Title + action icons */}
//         <div className="flex items-start justify-between gap-3">
//           <h2
//             className="flex-1 text-zinc-900 dark:text-zinc-100 leading-snug text-start"
//             style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 16.5, fontWeight: 700, letterSpacing: "-0.01em" }}
//           >
//             {post.title}
//           </h2>

//           {/* Actions */}
//           <div className="flex items-center flex-shrink-0 mt-0.5 -mr-1 gap-2"> 
//             <button
//             onClick={handleLike}
//             className="flex items-center gap-1.5 transition-all active:scale-95 group"
//           >
//             <Heart
//               size={13}
//               strokeWidth={1.5}
//               className={isLiked ? "text-[#b06060]" : "text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors"}
//               style={{ fill: isLiked ? "#b06060" : "none" }}
//             />
//             <span
//               className={`text-[11.5px] tabular-nums ${isLiked ? "text-[#b06060]" : "text-zinc-400 dark:text-zinc-600"}`}
//               style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 600 }}
//             >
//               {likeCount.toLocaleString()}
//             </span>
//           </button>

//             <button
//               className="p-1.5 rounded-lg text-zinc-400 dark:text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60 transition-colors"
//               title="Share"
//             >
//               <Share2 size={15} strokeWidth={1.6} />
//             </button>
//             <button
//               className="p-1.5 rounded-lg text-zinc-400 dark:text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60 transition-colors"
//               title="Download"
//             >
//               <Bookmark size={15} strokeWidth={1.6} />
//             </button>
//           </div>
//         </div>

//         {/* Description */}
//         <p
//           className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-start"
//           style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, lineHeight: 1.75 }}
//         >
//           {post.description}
//         </p>

//         {/* Tags */}
//         <div className="flex flex-wrap items-center justify-between gap-2">
//         <div className=" flex flex-wrap gap-2">
//           {post.tags.map((tag) => (
//             <span
//               key={tag}
//               className="text-zinc-400 dark:text-zinc-600"
//               style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.04em" }}
//             >
//               #{tag}
//             </span>
//           ))}
//           </div>

//             <div className="flex items-center gap-1.5">
//             <Eye size={13} strokeWidth={1.5} className="text-zinc-300 dark:text-zinc-700" />
//             <span
//               className="text-[11.5px] tabular-nums text-zinc-400 dark:text-zinc-600"
//               style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 600 }}
//             >
//               {post.views.toLocaleString()}
//             </span>
//           </div>
//         </div>


//         {/* Divider */}
//         <div className="h-px bg-zinc-200/60 dark:bg-zinc-700/40" />

//         {/* Comment row */}
//         <div className="flex items-center gap-2.5">
//           <img
//             src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=60&q=80"
//             alt="You"
//             className="w-6 h-6 rounded-full object-cover border border-zinc-200/80 dark:border-zinc-700/50 flex-shrink-0"
//           />
//           <input
//             type="text"
//             placeholder="Leave a quiet thought…"
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             className="flex-1 bg-transparent border-none outline-none text-[13px] italic text-zinc-500 dark:text-zinc-400 placeholder:text-zinc-300 dark:placeholder:text-zinc-600"
//             style={{ fontFamily: "'Playfair Display', serif" }}
//           />
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


import { useState } from "react";
import { Heart, Share2, Download, MoreVertical, Send, Eye, Bookmark } from "lucide-react";
import { toast, Toaster } from "sonner"; // Make sure to npm install sonner

// ─── Font import — add to your index.html <head> ─────────────────────────────
// <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700
//   &family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&display=swap" rel="stylesheet" />

const FeedCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.liked || false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [isSaved, setIsSaved] = useState(post.saved || false);
  const [comment, setComment] = useState("");

  const handleLike = () => {
    setIsLiked((prev) => {
      const newState = !prev;
      if (newState) {
        toast.success("Added to favorites");
      } else {
        toast("Removed from favorites");
      }
      return newState;
    });
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleSave = () => {
    setIsSaved((prev) => {
      const newState = !prev;
      if (newState) {
        toast.success("Saved to bookmarks");
      } else {
        toast("Removed from bookmarks");
      }
      return newState;
    });
  };

  // ── shared glass panel style ──────────────────────────────────────────────
  // Light: white/80 backdrop blur + zinc-200/60 border
  // Dark:  zinc-900/70 backdrop blur + zinc-700/40 border
  const glassPanel =
    "bg-white/80 dark:bg-zinc-900/70 " +
    "backdrop-blur-md " +
    "border border-zinc-200/70 dark:border-zinc-700/40 " +
    "shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)]";

  return (
    <div className="w-full max-w-lg mx-auto mb-10 flex flex-col gap-[6px] transition-all duration-300 hover:-translate-y-0.5">
        <Toaster position="top-center" richColors theme="system"/>

      {/* ══ PART 1 — HEADER ══════════════════════════════════════════════════ */}
      <div
        className={`flex items-center justify-between px-4 rounded-xl ${glassPanel}`}
        style={{ height: 58 }}
      >
        {/* Avatar + name + medium */}
        <div className="flex items-center gap-3">
          <img
            src={post.avatar}
            alt={post.artist}
            className="w-9 h-9 rounded-full object-cover border border-zinc-200/80 dark:border-zinc-700/50 flex-shrink-0"
          />
          <div className="flex flex-col gap-0.5 leading-none">
            <span
              className="text-[13.5px] text-start font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 font-Quicksand"
            >
              {post.artist}
            </span>
            <span
              className="text-[11px] italic text-zinc-400 text-start mt-1 dark:text-zinc-500 font-Playfair"
            >
              {post.medium}
            </span>
          </div>
        </div>

        {/* Follow · ··· */}
        <div className="flex items-center gap-3">
          <button
            className="text-[12.5px] font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Follow
          </button>

          {/* vertical divider */}
          <span className="inline-block w-px h-[14px] bg-zinc-200/80 dark:bg-zinc-700/50" />

          <button className="text-zinc-400 dark:text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
            <MoreVertical size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>


      {/* ══ PART 2 — IMAGE ═══════════════════════════════════════════════════ */}
      <div className="w-full overflow-hidden rounded-lg border border-zinc-100/80 dark:border-zinc-800/60" style={{ aspectRatio: "4/3" }}>
        <img
          src={post.src}
          alt={post.title}
          className="w-full h-full object-cover block"
        />
      </div>


      {/* ══ PART 3 — METADATA ════════════════════════════════════════════════ */}
      <div className={`flex flex-col rounded-xl ${glassPanel}`} style={{ padding: "14px 16px 16px", gap: 10 }}>

        {/* Title + action icons */}
        <div className="flex items-start justify-between gap-3">
          <h2
            className="flex-1 text-zinc-900 dark:text-zinc-100 leading-snug text-start"
            style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 16.5, fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            {post.title}
          </h2>

          {/* Actions */}
          <div className="flex items-center flex-shrink-0 mt-0.5 -mr-1 gap-2"> 
            <button
              onClick={handleLike}
              className="flex items-center gap-1.5 transition-all active:scale-95 group"
            >
              <Heart
                size={13}
                strokeWidth={1.5}
                className={isLiked ? "text-[#b06060]" : "text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors"}
                style={{ fill: isLiked ? "#b06060" : "none" }}
              />
              <span
                className={`text-[11.5px] tabular-nums ${isLiked ? "text-[#b06060]" : "text-zinc-400 dark:text-zinc-600"}`}
                style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 600 }}
              >
                {likeCount.toLocaleString()}
              </span>
            </button>

            <button
              className="p-1.5 rounded-lg text-zinc-400 dark:text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60 transition-colors"
              title="Share"
            >
              <Share2 size={15} strokeWidth={1.6} />
            </button>
            <button
              onClick={handleSave}
              className="p-1.5 rounded-lg text-zinc-400 dark:text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60 transition-colors active:scale-95"
              title={isSaved ? "Unsave" : "Save"}
            >
              <Bookmark 
                size={15} 
                strokeWidth={1.6} 
                className={isSaved ? "text-zinc-800 dark:text-zinc-200" : ""}
                style={{ fill: isSaved ? "currentColor" : "none" }}
              />
            </button>
          </div>
        </div>

        {/* Description */}
        <p
          className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-start"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, lineHeight: 1.75 }}
        >
          {post.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className=" flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-zinc-400 dark:text-zinc-600"
                style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.04em" }}
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <Eye size={13} strokeWidth={1.5} className="text-zinc-300 dark:text-zinc-700" />
            <span
              className="text-[11.5px] tabular-nums text-zinc-400 dark:text-zinc-600"
              style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 600 }}
            >
              {post.views.toLocaleString()}
            </span>
          </div>
        </div>


        {/* Divider */}
        <div className="h-px bg-zinc-200/60 dark:bg-zinc-700/40" />

        {/* Comment row */}
        <div className="flex items-center gap-2.5">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=60&q=80"
            alt="You"
            className="w-6 h-6 rounded-full object-cover border border-zinc-200/80 dark:border-zinc-700/50 flex-shrink-0"
          />
          <input
            type="text"
            placeholder="Leave a quiet thought…"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-[13px] italic text-zinc-500 dark:text-zinc-400 placeholder:text-zinc-300 dark:placeholder:text-zinc-600"
            style={{ fontFamily: "'Playfair Display', serif" }}
          />
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