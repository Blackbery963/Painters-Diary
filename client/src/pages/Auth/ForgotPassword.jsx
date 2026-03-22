import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, KeyRound, ArrowLeft, Send, Sparkles, CheckCircle, ShieldCheck, Lock, Eye, EyeOff } from 'lucide-react';
import { Toaster, toast } from 'sonner';

// Asset Imports
import backgroundImage from '../../assets/ForgetPassword.jpg';
import logo from '../../assets/Logo.jpeg';

// ─── Step indicator ──────────────────────────────────────────────────────────
const StepIndicator = ({ current }) => {
  const steps = ['Email', 'Verify OTP', 'New Password'];
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((label, i) => {
        const idx = i + 1;
        const done = idx < current;
        const active = idx === current;
        return (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center gap-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                ${done ? 'bg-[#1f7d53] text-white' : active ? 'bg-[#1f7d53]/15 border-2 border-[#1f7d53] text-[#1f7d53]' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 border-2 border-transparent'}`}>
                {done ? <CheckCircle className="w-3.5 h-3.5" /> : idx}
              </div>
              <span className={`text-[9px] font-bold uppercase tracking-wider whitespace-nowrap
                ${active ? 'text-[#1f7d53]' : done ? 'text-[#1f7d53]/70' : 'text-gray-400'}`}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mb-4 rounded-full transition-all duration-500
                ${idx < current ? 'bg-[#1f7d53]' : 'bg-gray-200 dark:bg-gray-700'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// ─── OTP input boxes ─────────────────────────────────────────────────────────
const OtpInput = ({ otp, setOtp }) => {
  const refs = useRef([]);

  const handleChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) refs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      refs.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const next = [...otp];
    pasted.split('').forEach((c, i) => { next[i] = c; });
    setOtp(next);
    refs.current[Math.min(pasted.length, 5)]?.focus();
  };

  return (
    <div className="flex gap-2 justify-center" onPaste={handlePaste}>
      {otp.map((digit, idx) => (
        <input
          key={idx}
          ref={el => refs.current[idx] = el}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={e => handleChange(e.target.value, idx)}
          onKeyDown={e => handleKeyDown(e, idx)}
          className={`w-11 h-12 text-center text-lg font-bold rounded-xl border-2 outline-none transition-all duration-200
            bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white
            ${digit ? 'border-[#1f7d53] bg-[#1f7d53]/5' : 'border-gray-200 dark:border-gray-700 focus:border-[#1f7d53]'}`}
        />
      ))}
    </div>
  );
};

// ─── Password strength bar ────────────────────────────────────────────────────
const PasswordStrength = ({ password }) => {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const label = ['', 'Weak', 'Fair', 'Good', 'Strong'][score];
  const colors = ['', 'bg-red-400', 'bg-yellow-400', 'bg-blue-400', 'bg-[#1f7d53]'];

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= score ? colors[score] : 'bg-gray-200 dark:bg-gray-700'}`} />
        ))}
      </div>
      <p className={`text-xs font-bold ${colors[score].replace('bg-', 'text-').replace('bg-[#1f7d53]', 'text-[#1f7d53]')}`}>{label}</p>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // Resend countdown
  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer(r => r - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  // ── Step 1: send OTP
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setIsLoading(true);
    try {
      // TODO: await API.post('/auth/forgot-password', { email });
      await new Promise(r => setTimeout(r, 1500));
      toast.success('OTP sent to your email!');
      setResendTimer(60);
      setStep(2);
    } catch {
      toast.error('Could not find an account with that email.');
    } finally {
      setIsLoading(false);
    }
  };

  // ── Step 2: verify OTP
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (otp.some(d => !d)) {
      toast.error('Please enter the full 6-digit OTP.');
      return;
    }
    setIsLoading(true);
    try {
      // TODO: await API.post('/auth/verify-otp', { email, otp: otp.join('') });
      await new Promise(r => setTimeout(r, 1500));
      toast.success('OTP verified!');
      setStep(3);
    } catch {
      toast.error('Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    setIsLoading(true);
    try {
      // TODO: await API.post('/auth/forgot-password', { email });
      await new Promise(r => setTimeout(r, 1000));
      setOtp(Array(6).fill(''));
      setResendTimer(60);
      toast.success('New OTP sent!');
    } catch {
      toast.error('Failed to resend OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  // ── Step 3: reset password
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    setIsLoading(true);
    try {
      // TODO: await API.post('/auth/reset-password', { email, otp: otp.join(''), newPassword: password });
      await new Promise(r => setTimeout(r, 1500));
      toast.success('Password reset successfully!');
      setStep(4);
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const slideVariants = {
    enter: { opacity: 0, x: 30 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  return (
    <div className="min-h-screen lg:h-screen bg-gray-50 dark:bg-gray-950 font-['Quicksand'] flex flex-col lg:flex-row overflow-x-hidden">
      <Toaster position="top-center" richColors theme="system" />

      {/* ── SIDEBAR ── */}
      <div className="w-full lg:w-1/2 h-[30vh] lg:h-full relative bg-gray-900 shrink-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/40" />
        <div className="relative z-10 p-6 lg:p-16 flex flex-col justify-center items-center lg:items-start h-full text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#1f7d53] p-1 rounded-lg h-10 w-10 flex items-center justify-center overflow-hidden">
              <img src={logo} alt="Logo" className="rounded-lg" />
            </div>
            <span className="text-xl font-bold tracking-wide font-Eagle">Painters' Diary</span>
          </div>
          <h1 className="text-2xl lg:text-5xl font-bold text-center lg:text-left leading-tight">
            Recover <span className="text-[#1f7d53]">Access</span>
          </h1>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="w-full lg:w-1/2 flex flex-col relative z-20 -mt-8 lg:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 bg-white dark:bg-gray-950 rounded-t-[2.5rem] lg:rounded-none p-8 lg:p-20 flex flex-col justify-center shadow-2xl lg:shadow-none"
        >
          <div className="w-full max-w-md mx-auto">

            {/* Step indicator (steps 1-3 only) */}
            {step < 4 && <StepIndicator current={step} />}

            <AnimatePresence mode="wait">

              {/* ───── STEP 1: Email ───── */}
              {step === 1 && (
                <motion.div key="step-email" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                  <div className="mb-8 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1f7d53]/10 text-[#1f7d53] text-[10px] font-bold mb-4 uppercase tracking-widest">
                      <KeyRound className="w-3.5 h-3.5" /> Security Portal
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center lg:justify-start gap-2">
                      Forgot Password? <Sparkles className="w-5 h-5 text-[#1f7d53] hidden lg:block" />
                    </h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
                      Enter the email associated with your account and we'll send you a 6-digit OTP.
                    </p>
                  </div>

                  <form onSubmit={handleEmailSubmit} className="space-y-6">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#1f7d53] transition-colors" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="artist@example.com"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent rounded-2xl focus:border-[#1f7d53] transition-all outline-none text-gray-900 dark:text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 rounded-2xl font-bold text-white bg-[#1f7d53] hover:bg-[#186642] shadow-lg shadow-[#1f7d53]/30 transition-all flex items-center justify-center gap-3"
                    >
                      {isLoading
                        ? <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        : <><Send className="w-4 h-4" /> Send OTP</>}
                    </button>

                    <Link to="/authentication/login" className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-[#1f7d53] transition-colors font-bold">
                      <ArrowLeft className="w-4 h-4" /> Back to Login
                    </Link>
                  </form>
                </motion.div>
              )}

              {/* ───── STEP 2: OTP ───── */}
              {step === 2 && (
                <motion.div key="step-otp" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                  <div className="mb-8 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1f7d53]/10 text-[#1f7d53] text-[10px] font-bold mb-4 uppercase tracking-widest">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verify Identity
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Enter OTP</h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
                      We sent a 6-digit code to{' '}
                      <span className="text-gray-900 dark:text-white font-bold">{email}</span>
                    </p>
                  </div>

                  <form onSubmit={handleOtpSubmit} className="space-y-6">
                    <OtpInput otp={otp} setOtp={setOtp} />

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 rounded-2xl font-bold text-white bg-[#1f7d53] hover:bg-[#186642] shadow-lg shadow-[#1f7d53]/30 transition-all flex items-center justify-center gap-3"
                    >
                      {isLoading
                        ? <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        : <><ShieldCheck className="w-4 h-4" /> Verify OTP</>}
                    </button>

                    <div className="flex items-center justify-between text-sm">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex items-center gap-1.5 text-gray-500 hover:text-[#1f7d53] transition-colors font-bold"
                      >
                        <ArrowLeft className="w-4 h-4" /> Change Email
                      </button>
                      <button
                        type="button"
                        onClick={handleResend}
                        disabled={resendTimer > 0 || isLoading}
                        className={`font-bold transition-colors ${resendTimer > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-[#1f7d53] hover:underline'}`}
                      >
                        {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* ───── STEP 3: New Password ───── */}
              {step === 3 && (
                <motion.div key="step-password" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                  <div className="mb-8 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1f7d53]/10 text-[#1f7d53] text-[10px] font-bold mb-4 uppercase tracking-widest">
                      <Lock className="w-3.5 h-3.5" /> New Password
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Set New Password</h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
                      Create a strong password with at least 8 characters.
                    </p>
                  </div>

                  <form onSubmit={handlePasswordSubmit} className="space-y-5">
                    {/* New password */}
                    <div>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#1f7d53] transition-colors" />
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          placeholder="New password"
                          className="w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-transparent rounded-2xl focus:border-[#1f7d53] transition-all outline-none text-gray-900 dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(v => !v)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#1f7d53] transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      <PasswordStrength password={password} />
                    </div>

                    {/* Confirm password */}
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#1f7d53] transition-colors" />
                      </div>
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                        className={`w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-gray-800 border-2 rounded-2xl transition-all outline-none text-gray-900 dark:text-white
                          ${confirmPassword && (confirmPassword === password ? 'border-[#1f7d53]' : 'border-red-400')}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(v => !v)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#1f7d53] transition-colors"
                      >
                        {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>

                    {/* Match hint */}
                    {confirmPassword && confirmPassword !== password && (
                      <p className="text-xs text-red-400 font-bold -mt-2">Passwords do not match</p>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 rounded-2xl font-bold text-white bg-[#1f7d53] hover:bg-[#186642] shadow-lg shadow-[#1f7d53]/30 transition-all flex items-center justify-center gap-3 mt-2"
                    >
                      {isLoading
                        ? <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        : <><CheckCircle className="w-4 h-4" /> Reset Password</>}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* ───── STEP 4: Success ───── */}
              {step === 4 && (
                <motion.div
                  key="step-success"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="mx-auto w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Password Reset!</h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
                    Your password has been updated successfully.<br />You can now log in with your new password.
                  </p>
                  <Link
                    to="/authentication/login"
                    className="inline-block w-full py-4 rounded-2xl font-bold text-white bg-[#1f7d53] hover:bg-[#186642] transition-all text-center"
                  >
                    Go to Login
                  </Link>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;