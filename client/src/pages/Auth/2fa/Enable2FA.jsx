import { useState, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, QrCode, ArrowRight, CheckCircle2,
  Lock, Smartphone, KeyRound, Palette, Settings, User,
  AlertTriangle, Eye, EyeOff, X,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { Link } from "react-router-dom";
import Logo from "../../../assets/Logo.jpeg"
// ─── Token guard helper ───────────────────────────────────────────────────────
// Returns the token string if valid-looking, null otherwise
function getAccessToken() {
  const token = localStorage.getItem("accessToken");
  if (!token || token === "null" || token === "undefined" || token.trim() === "") return null;
  // Basic JWT shape check: must be 3 base64 segments separated by dots
  if (token.split(".").length !== 3) return null;
  return token;
}

// ─── Inline Auth Modal ────────────────────────────────────────────────────────
// Shown when no valid token is found. User logs in without leaving the page.
// onSuccess() is called immediately after a token is saved to localStorage.
function AuthModal({ onSuccess, onClose }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [err, setErr]           = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");
    if (!email.trim() || !password) { setErr("Both fields are required"); return; }

    try {
      setLoading(true);
      const res  = await axios.post("http://localhost:3000/api/auth/login", { email, password });
      const data = res.data;

      if (data.requires2FA) {
        setErr("Your account already has 2FA enabled — you cannot set it up again.");
        return;
      }
      if (!data.accessToken) { setErr("Login failed — no token received"); return; }

      localStorage.setItem("accessToken", data.accessToken);
      toast.success("Logged in! Generating your QR code…");
      onSuccess(); // ← triggers QR generation automatically
    } catch (error) {
      if (error.response?.status === 403 && error.response?.data?.requiresVerification) {
        setErr("Please verify your email before continuing.");
      } else {
        setErr(error.response?.data?.message || "Invalid email or password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-[20px] overflow-hidden shadow-2xl relative"
      >
        {/* Green shimmer top */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#1f7d53]/50 to-transparent" />

        {/* Modal header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100 dark:border-white/8 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <div className="w-7 h-7 rounded-lg bg-[#1f7d53]/10 border border-[#1f7d53]/20 flex items-center justify-center">
                <AlertTriangle size={13} color="#1f7d53" />
              </div>
              <h3 className="text-gray-900 dark:text-white font-bold text-[15px] font-['Quicksand']">
                Login required
              </h3>
            </div>
            <p className="text-gray-500 dark:text-white/40 text-[12px] font-['Quicksand'] leading-relaxed">
              Sign in to continue setting up 2FA.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/8 transition-colors shrink-0 mt-0.5"
          >
            <X size={14} className="text-gray-400 dark:text-white/40" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="px-6 py-5 flex flex-col gap-3">

          {/* Error banner */}
          <AnimatePresence>
            {err && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="px-3 py-2.5 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 flex items-center gap-2">
                  <AlertTriangle size={13} className="text-red-500 shrink-0" />
                  <p className="text-red-600 dark:text-red-400 text-[12px] font-['Quicksand'] font-medium">{err}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-600 dark:text-white/50 text-[11px] font-bold uppercase tracking-wider font-['Quicksand']">
              Email
            </label>
            <input
              type="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3.5 py-2.5 rounded-[10px] bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-[13px] font-['Quicksand'] outline-none focus:border-[#1f7d53] transition-colors placeholder:text-gray-400 dark:placeholder:text-white/20"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-600 dark:text-white/50 text-[11px] font-bold uppercase tracking-wider font-['Quicksand']">
              Password
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 pr-10 rounded-[10px] bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-[13px] font-['Quicksand'] outline-none focus:border-[#1f7d53] transition-colors placeholder:text-gray-400 dark:placeholder:text-white/20"
              />
              <button
                type="button"
                onClick={() => setShowPw(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/30 hover:text-gray-600 dark:hover:text-white/60 transition-colors"
              >
                {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit" disabled={loading}
            className={`w-full py-3 mt-1 rounded-[10px] text-[14px] font-bold font-['Quicksand'] flex items-center justify-center gap-2 transition-all duration-200 ${
              loading
                ? "bg-[#1f7d53]/40 text-white/60 cursor-not-allowed"
                : "bg-[#1f7d53] hover:bg-[#16a34a] text-white cursor-pointer"
            }`}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                Signing in…
              </>
            ) : "Sign in & continue"}
          </button>

          <p className="text-center text-gray-400 dark:text-white/30 text-[11px] font-['Quicksand']">
            No account?{" "}
            <Link to="/signup" className="text-[#1f7d53] hover:underline font-semibold">
              Sign up
            </Link>
          </p>
        </form>
      </motion.div>
    </motion.div>
  );
}

// ─── OTP Input ────────────────────────────────────────────────────────────────
function OtpInput({ value, onChange, disabled }) {
  const inputs = useRef([]);
  const digits = value.split("");

  const handleKey = (e, i) => {
    if (e.key === "Backspace") {
      const next = [...digits];
      if (next[i]) { next[i] = ""; onChange(next.join("")); }
      else if (i > 0) {
        inputs.current[i - 1]?.focus();
        next[i - 1] = ""; onChange(next.join(""));
      }
      return;
    }
    if (!/^\d$/.test(e.key)) return;
    const next = [...digits];
    next[i] = e.key;
    onChange(next.join(""));
    if (i < 5) inputs.current[i + 1]?.focus();
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    onChange(pasted.padEnd(6, "").slice(0, 6));
    inputs.current[Math.min(pasted.length, 5)]?.focus();
    e.preventDefault();
  };

  return (
    <div className="flex gap-2 justify-center" onPaste={handlePaste}>
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputs.current[i] = el)}
          type="text" inputMode="numeric" maxLength={1}
          value={digits[i] || ""} disabled={disabled}
          onKeyDown={(e) => handleKey(e, i)}
          onChange={() => {}}
          onFocus={(e) => e.target.select()}
          className={`w-[44px] h-[52px] text-center text-[22px] font-bold rounded-[10px] outline-none transition-all duration-200 font-['Quicksand']
            ${digits[i]
              ? "border-[1.5px] border-[#1f7d53] bg-[#1f7d53]/10 text-gray-900 dark:text-white"
              : "border-[1.5px] border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white focus:border-[#1f7d53]"
            }`}
        />
      ))}
    </div>
  );
}

// ─── Step dots ────────────────────────────────────────────────────────────────
function StepDots({ step }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {[1, 2, 3].map((s) => (
        <div
          key={s}
          className={`h-2 rounded-full transition-all duration-300 ${
            s <= step ? "bg-[#1f7d53]" : "bg-gray-300 dark:bg-white/10"
          }`}
          style={{ width: s === step ? 24 : 8 }}
        />
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Enable2FA() {
  const [step, setStep]             = useState(1);
  const [qr, setQr]                 = useState(null);
  const [manualKey, setManualKey]   = useState(null);
  const [otp, setOtp]               = useState("");
  const [loading, setLoading]       = useState(false);
  const [showManual, setShowManual] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // ── Shared QR generation (called both directly and after modal login) ────
  const doGenerateQR = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/2fa/setup2fa",
        {},
        { headers: { Authorization: `Bearer ${getAccessToken()}` } }
      );
      setQr(res.data.qr);
      setManualKey(res.data.manualEntryKey);
      setStep(2);
      toast.success("QR ready — scan it with your authenticator app");
    } catch (err) {
      // Token present but server rejected it (expired) → force re-login
      if (err.response?.status === 401) {
        localStorage.removeItem("accessToken");
        setShowAuthModal(true);
        toast.error("Session expired — please log in again");
      } else {
        toast.error(err.response?.data?.message || "Failed to generate QR");
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Button click: check token first, show modal if missing ──────────────
  const handleGenerateQR = () => {
    if (!getAccessToken()) {
      setShowAuthModal(true); // modal's onSuccess will call doGenerateQR
      return;
    }
    doGenerateQR();
  };

  // ── After modal login succeeds → auto-proceed to QR ─────────────────────
  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    doGenerateQR();
  };

  // ── Verify OTP ───────────────────────────────────────────────────────────
  const handleVerify = async () => {
    if (otp.length < 6) { toast.error("Enter the full 6-digit code"); return; }
    try {
      setLoading(true);
      await axios.post(
        "http://localhost:3000/api/2fa/verify2fa",
        { otp },
        { headers: { Authorization: `Bearer ${getAccessToken()}` } }
      );
      setStep(3);
      toast.success("2FA enabled!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP — try again");
      setOtp("");
    } finally {
      setLoading(false);
    }
  };

  const slide = {
    initial: { opacity: 0, x: 32 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.32, ease: [0.4, 0, 0.2, 1] } },
    exit:    { opacity: 0, x: -24, transition: { duration: 0.2 } },
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <Toaster position="top-center" richColors theme="system" />

      {/* ── Auth modal (portal over everything) ── */}
      <AnimatePresence>
        {showAuthModal && (
          <AuthModal
            onSuccess={handleAuthSuccess}
            onClose={() => setShowAuthModal(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Page layout ── */}
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] font-['Quicksand'] flex flex-col transition-colors duration-300">

        {/* Header */}
        <header className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-200 dark:border-white/10 bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-md sticky top-0 z-40 transition-colors duration-300">
          <Link to="/">
            <div className="flex items-center gap-3">
              <div className="bg-[#1f7d53] p-0.5 rounded-lg flex h-8 w-8 items-center justify-center">
                <img className=" h-fit w-fit rounded-lg" src={Logo} alt="" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white tracking-wide font-Eagle">Painters' Diary</span>
            </div>
          </Link>
          <div className="flex items-center gap-5 text-gray-600 dark:text-gray-400">
            <Link to="/settings"><button className="hover:text-[#1f7d53] transition-colors"><Settings size={20} /></button></Link>
            <Link to="/profile"><button className="hover:text-[#1f7d53] transition-colors"><User size={20} /></button></Link>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center p-6 relative">
          <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none bg-[radial-gradient(ellipse,rgba(31,125,83,0.12)_0%,transparent_70%)]" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="w-full max-w-[420px] bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[24px] px-[32px] py-[36px] backdrop-blur-[20px] relative overflow-hidden shadow-xl dark:shadow-none transition-colors duration-300"
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-black/10 dark:via-white/20 to-transparent" />

            {/* Card header */}
            <div className="text-center mb-2">
              <motion.div
                animate={{ scale: step === 3 ? [1, 1.15, 1] : 1 }}
                transition={{ duration: 0.4 }}
                className="inline-flex p-[14px] rounded-[16px] bg-[#1f7d53]/10 border border-[#1f7d53]/20 mb-4"
              >
                {step === 3 ? <CheckCircle2 size={26} color="#1f7d53" />
                  : step === 2 ? <Smartphone size={26} color="#1f7d53" />
                  : <ShieldCheck size={26} color="#1f7d53" />}
              </motion.div>
              <h2 className="text-gray-900 dark:text-white text-[20px] font-bold m-0">
                {step === 1 && "Enable 2-Factor Auth"}
                {step === 2 && "Scan & Verify"}
                {step === 3 && "You're Protected"}
              </h2>
              <p className="text-gray-500 dark:text-white/40 text-[13px] mt-1.5">
                {step === 1 && "Secure your Painters' Diary account with TOTP"}
                {step === 2 && "Open your authenticator app and scan the code below"}
                {step === 3 && "Two-factor authentication is now active on your account"}
              </p>
            </div>

            <StepDots step={step} />

            <AnimatePresence mode="wait">

              {/* ── STEP 1 ── */}
              {step === 1 && (
                <motion.div key="s1" {...slide}>
                  <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[14px] px-[18px] py-[16px] mb-4 transition-colors">
                    <p className="text-gray-400 dark:text-white/50 text-[11px] uppercase tracking-[0.08em] mb-3 font-bold">
                      What you'll need
                    </p>
                    {[
                      { icon: Smartphone, text: "Google Authenticator or Authy" },
                      { icon: QrCode,     text: "Camera access to scan QR code" },
                      { icon: KeyRound,   text: "30 seconds to complete setup" },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-2.5 mb-2 last:mb-0">
                        <div className="w-[28px] h-[28px] rounded-lg bg-[#1f7d53]/10 flex items-center justify-center shrink-0">
                          <Icon size={13} color="#1f7d53" />
                        </div>
                        <span className="text-gray-600 dark:text-white/60 text-[13px] font-medium">{text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Soft warning shown only when not logged in */}
                  {!getAccessToken() && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-2.5 px-3.5 py-3 mb-4 rounded-[10px] bg-amber-50 dark:bg-amber-500/8 border border-amber-200 dark:border-amber-500/20"
                    >
                      <AlertTriangle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-amber-700 dark:text-amber-400 text-[12px] font-['Quicksand'] font-medium leading-relaxed">
                        You're not signed in. Clicking the button below will ask you to log in first.
                      </p>
                    </motion.div>
                  )}

                  <button
                    onClick={handleGenerateQR}
                    disabled={loading}
                    className={`w-full py-[14px] rounded-[12px] text-[15px] font-bold flex items-center justify-center gap-2 font-['Quicksand'] transition-all duration-200 ${
                      loading
                        ? "bg-[#1f7d53]/40 text-white cursor-not-allowed"
                        : "bg-[#1f7d53] hover:bg-[#16a34a] text-white cursor-pointer hover:-translate-y-[1px]"
                    }`}
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                        Generating...
                      </>
                    ) : <><QrCode size={17} /> Generate QR Code</>}
                  </button>
                </motion.div>
              )}

              {/* ── STEP 2 ── */}
              {step === 2 && (
                <motion.div key="s2" {...slide}>
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-[16px] bg-white border border-gray-200 shadow-[0_0_0_1px_rgba(31,125,83,0.2),_0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_0_0_1px_rgba(31,125,83,0.2),_0_8px_32px_rgba(0,0,0,0.4)]">
                      <img src={qr} alt="QR Code" className="w-[160px] h-[160px] block" />
                    </div>
                  </div>

                  {manualKey && (
                    <div className="mb-5">
                      <button
                        onClick={() => setShowManual(v => !v)}
                        className="w-full py-2 bg-transparent border border-gray-300 dark:border-white/10 rounded-[10px] text-gray-500 dark:text-white/45 text-[12px] font-bold cursor-pointer font-['Quicksand'] transition-colors hover:border-gray-400 dark:hover:border-white/20 hover:text-gray-700 dark:hover:text-white/70"
                      >
                        {showManual ? "Hide" : "Can't scan? Enter key manually"}
                      </button>
                      <AnimatePresence>
                        {showManual && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-2.5 px-3.5 py-2.5 rounded-[10px] bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                              <p className="text-gray-400 dark:text-white/30 text-[10px] mb-1 uppercase tracking-[0.08em] font-bold">Manual entry key</p>
                              <p className="text-[#1f7d53] text-[13px] font-bold break-all tracking-[0.05em] font-mono m-0">{manualKey}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  <p className="text-gray-500 dark:text-white/40 text-[13px] text-center mb-4 font-medium">
                    Enter the 6-digit code from your app
                  </p>

                  <OtpInput value={otp} onChange={setOtp} disabled={loading} />

                  <button
                    onClick={handleVerify}
                    disabled={loading || otp.length < 6}
                    className={`w-full py-[14px] mt-5 rounded-[12px] text-[15px] font-bold flex items-center justify-center gap-2 font-['Quicksand'] transition-colors duration-200 ${
                      otp.length < 6 || loading
                        ? "bg-gray-200 dark:bg-[#1f7d53]/30 text-gray-400 dark:text-white/40 cursor-not-allowed"
                        : "bg-[#1f7d53] text-white cursor-pointer hover:bg-[#16a34a]"
                    }`}
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                        Verifying...
                      </>
                    ) : <> Verify & Activate <ArrowRight size={16} /></>}
                  </button>
                </motion.div>
              )}

              {/* ── STEP 3 ── */}
              {step === 3 && (
                <motion.div key="s3" {...slide} className="text-center">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
                    className="w-[72px] h-[72px] rounded-full bg-[#1f7d53]/10 border-2 border-[#1f7d53]/30 flex items-center justify-center mx-auto mb-5"
                  >
                    <CheckCircle2 size={34} color="#1f7d53" />
                  </motion.div>
                  <p className="text-gray-600 dark:text-white/55 text-[14px] leading-[1.7] mb-6 font-medium">
                    Every login will now ask for your authenticator code.
                    Keep your app accessible — you'll need it each time.
                  </p>
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#1f7d53]/10 border border-[#1f7d53]/20">
                    <Lock size={13} color="#1f7d53" />
                    <span className="text-[#1f7d53] text-[12px] font-bold">Account secured with 2FA</span>
                  </div>
                  <button
                    onClick={() => window.history.back()}
                    className="w-full py-[13px] mt-6 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white/70 rounded-[12px] text-[14px] font-bold cursor-pointer font-['Quicksand'] transition-colors hover:bg-gray-200 dark:hover:bg-white/10"
                  >
                    Back to settings
                  </button>
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </>
  );
}