import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageSquare, Frown, Meh, Smile, Sparkles, CheckCircle2 } from "lucide-react";
import Header from "../../components/common/Header";
import { glassShell, glassSurface, divider, spring } from "../../components/common/glass";

// ─── RATINGS CONFIG ────────────────────────────────────────────────────────────
const RATINGS = [
  { icon: Frown,    label: "Poor",    value: 1, accent: "text-rose-400   dark:text-rose-500" },
  { icon: Meh,      label: "Okay",    value: 2, accent: "text-amber-400  dark:text-amber-500" },
  { icon: Smile,    label: "Great",   value: 3, accent: "text-emerald-500 dark:text-emerald-400" },
  { icon: Sparkles, label: "Amazing", value: 4, accent: "text-violet-400 dark:text-violet-400" },
];

// ─── CATEGORY TAGS ─────────────────────────────────────────────────────────────
const CATEGORIES = ["UI / Design", "Performance", "Features", "Bug", "Other"];

// ─── FEEDBACK PAGE ─────────────────────────────────────────────────────────────
const FeedbackPage = () => {
  const [rating,   setRating]   = useState(null);
  const [category, setCategory] = useState(null);
  const [message,  setMessage]  = useState("");
  const [loading,  setLoading]  = useState(false);
  const [done,     setDone]     = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !message.trim()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1600);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-24 pb-16 px-4 flex flex-col items-center">
      <Header />

      {/* Page heading */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring.entry, delay: 0.05 }}
        className="text-center mb-8"
      >
        <h1
          className="text-[26px] font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-1.5"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          Help us refine the diary.
        </h1>
        <p
          className="text-[13px] text-zinc-400 dark:text-zinc-500 max-w-xs mx-auto leading-relaxed"
          style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
        >
          Your voice shapes a better space for every artist here.
        </p>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring.entry, delay: 0.1 }}
        className={`w-full max-w-2xl ${glassShell} rounded-[24px] overflow-hidden`}
      >
        <AnimatePresence mode="wait">

          {/* ── SUCCESS STATE ── */}
          {done ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={spring.bounce}
              className="flex flex-col items-center justify-center gap-4 py-16 px-8 text-center"
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${glassSurface}`}>
                <CheckCircle2 size={24} className="text-emerald-500" strokeWidth={1.7} />
              </div>
              <div>
                <p
                  className="text-[16px] font-bold text-zinc-900 dark:text-zinc-100 mb-1"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  Thank you.
                </p>
                <p
                  className="text-[12.5px] text-zinc-400 dark:text-zinc-500 leading-relaxed"
                  style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
                >
                  Your feedback has been received. We'll use it to keep improving.
                </p>
              </div>
              <button
                onClick={() => { setDone(false); setRating(null); setCategory(null); setMessage(""); }}
                className="mt-2 text-[11.5px] font-semibold text-zinc-400 dark:text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                Submit another
              </button>
            </motion.div>

          ) : (

            /* ── FORM STATE ── */
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="p-6 space-y-6"
            >

              {/* Rating */}
              <div>
                <p className="text-[9.5px] font-black uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-600 mb-3"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}>
                  How was your experience?
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {RATINGS.map((r) => {
                    const active = rating === r.value;
                    return (
                      <motion.button
                        key={r.value}
                        type="button"
                        whileTap={{ scale: 0.93 }}
                        onClick={() => setRating(r.value)}
                        className={`
                          flex flex-col items-center gap-1.5 py-3 rounded-[14px]
                          border transition-all duration-200 outline-none
                          ${active
                            ? "bg-zinc-900 dark:bg-zinc-100 border-zinc-900 dark:border-zinc-100"
                            : `${glassSurface} border-transparent hover:border-zinc-200/70 dark:hover:border-zinc-700/40`
                          }
                        `}
                      >
                        <r.icon
                          size={18}
                          strokeWidth={active ? 2.2 : 1.6}
                          className={active ? "text-white dark:text-zinc-900" : r.accent}
                        />
                        <span
                          className={`text-[10.5px] font-bold ${active ? "text-white dark:text-zinc-900" : "text-zinc-500 dark:text-zinc-500"}`}
                          style={{ fontFamily: "'Quicksand', sans-serif" }}
                        >
                          {r.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Category */}
              <div>
                <p className="text-[9.5px] font-black uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-600 mb-3"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}>
                  Topic
                </p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => {
                    const active = category === c;
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCategory(active ? null : c)}
                        className={`
                          px-3 py-1.5 rounded-full text-[11.5px] font-semibold
                          border transition-all duration-200 outline-none
                          ${active
                            ? "bg-zinc-900 dark:bg-zinc-100 border-zinc-900 dark:border-zinc-100 text-white dark:text-zinc-900"
                            : `${glassSurface} border-transparent text-zinc-500 dark:text-zinc-500 hover:border-zinc-200/70 dark:hover:border-zinc-700/40`
                          }
                        `}
                        style={{ fontFamily: "'Quicksand', sans-serif" }}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Divider */}
              <div className={divider} />

              {/* Message */}
              <div className="relative">
                <p className="text-[9.5px] font-black uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-600 mb-3"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}>
                  Your thoughts
                </p>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Suggestions, bugs, or just a quiet hello…"
                  rows={4}
                  className={`
                    w-full px-4 py-3.5 rounded-[14px] resize-none outline-none
                    text-[13px] leading-relaxed
                    text-zinc-700 dark:text-zinc-300
                    placeholder:text-zinc-300 dark:placeholder:text-zinc-700
                    bg-white/40 dark:bg-zinc-900/40
                    border border-zinc-200/60 dark:border-zinc-700/40
                    focus:border-zinc-400/60 dark:focus:border-zinc-500/50
                    transition-colors duration-200
                  `}
                  style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
                />
                <MessageSquare
                  size={14}
                  className="absolute bottom-3.5 right-3.5 text-zinc-300 dark:text-zinc-700 pointer-events-none"
                  strokeWidth={1.5}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading || !rating || !message.trim()}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.975 }}
                className="
                  w-full h-12 rounded-[14px]
                  bg-zinc-900 dark:bg-zinc-100
                  text-white dark:text-zinc-900
                  text-[13px] font-bold
                  flex items-center justify-center gap-2
                  disabled:opacity-40
                  transition-opacity duration-200
                "
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-zinc-500 dark:border-zinc-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={13} strokeWidth={2} />
                    Send Feedback
                  </>
                )}
              </motion.button>

            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Footer */}
      <p
        className="mt-8 text-[10.5px] text-zinc-300 dark:text-zinc-700"
        style={{ fontFamily: "'Quicksand', sans-serif" }}
      >
        Painters' Diary © 2026 — Built for the minimalist artist.
      </p>
    </div>
  );
};

export default FeedbackPage;