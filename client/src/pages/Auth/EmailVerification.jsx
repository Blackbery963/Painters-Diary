import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, RotateCcw, ShieldCheck, Sparkles } from 'lucide-react';
import { Toaster, toast } from 'sonner';

import backgroundImage from '../../assets/EmailVerification.jpg'; 
import logo from '../../assets/Logo.jpeg';

const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "artist@example.com";
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    
    if (code.length < 6) {
      toast.error("Please enter the full 6-digit code");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      toast.success("Identity Verified!");
      navigate('/Account');
    } catch (err) {
      toast.error("Invalid code.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen lg:h-screen bg-gray-50 dark:bg-gray-950 font-['Quicksand'] flex flex-col lg:flex-row overflow-x-hidden">
      <Toaster position="top-center" richColors theme='system' />

      {/* SECTION 1: DYNAMIC IMAGE BOX 
          Mobile: 35vh height
          Desktop: 100vh height (h-full)
      */}
      <div className="w-full lg:w-1/2 h-[35vh] lg:h-full relative bg-gray-900 shrink-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-[20s] hover:scale-105"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/40" />
        
        {/* Branding on Image */}
        <div className="relative z-10 p-6 lg:p-16 flex flex-col justify-center items-center lg:items-start h-full text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#1f7d53] p-1 rounded-lg h-10 w-10 flex items-center justify-center overflow-hidden">
              <img src={logo} alt="Logo" className='rounded-lg' />
            </div>
            <span className="text-xl font-bold tracking-wide font-Eagle">Painters' Diary</span>
          </div>
          <h1 className="text-2xl lg:text-5xl font-bold text-center lg:text-left leading-tight lg:hidden block">
            Security <span className="text-[#1f7d53]">Verification</span>
          </h1>
          <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-4 hidden lg:block">
            Protect your <span className="text-[#1f7d53]">art</span>.
          </h1>
          <p className="hidden lg:block text-lg text-gray-300 max-w-md">
            We've sent a unique 6-digit verification code to your email. This ensures your diary stays private and secure.
          </p>
        </div>
      </div>

      {/* SECTION 2: CONTENT AREA
          Mobile: Overlaps image slightly with rounded-t
          Desktop: Flat split-screen (rounded-none)
      */}
      <div className="w-full lg:w-1/2 flex flex-col relative z-20 -mt-10 lg:mt-0">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 bg-white dark:bg-gray-950 rounded-t-[2.5rem] lg:rounded-none p-8 lg:p-20 flex flex-col justify-center shadow-2xl lg:shadow-none"
        >
          <div className="w-full max-w-md mx-auto">
            
            <div className="mb-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1f7d53]/10 text-[#1f7d53] text-[10px] font-bold mb-4 uppercase tracking-widest mx-auto lg:mx-0">
                <ShieldCheck className="w-3.5 h-3.5" /> Secure Channel
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center lg:justify-start gap-2">
                Check your inbox <Sparkles className="w-5 h-5 text-[#1f7d53] hidden lg:block" />
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
                We sent a 6-digit code to <br />
                <span className="text-gray-900 dark:text-white font-bold">{email}</span>
              </p>
            </div>

            <form onSubmit={handleVerify} className="space-y-8">
              {/* OTP Inputs */}
              <div className="flex justify-between gap-2 sm:gap-4">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    ref={el => inputRefs.current[index] = el}
                    value={data}
                    onChange={e => handleChange(index, e.target.value)}
                    onKeyDown={e => handleKeyDown(index, e)}
                    className="w-10 h-12 sm:w-12 sm:h-14 lg:w-14 lg:h-16 text-center text-xl lg:text-2xl font-bold bg-gray-50 dark:bg-gray-800 border-2 border-transparent rounded-xl focus:border-[#1f7d53] focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-[#1f7d53]/10 transition-all outline-none text-gray-900 dark:text-white"
                  />
                ))}
              </div>

              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg shadow-[#1f7d53]/30 flex items-center justify-center gap-3 transition-all ${
                    isLoading ? 'bg-gray-400' : 'bg-[#1f7d53] hover:bg-[#186642]'
                  }`}
                >
                  {isLoading ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Verify & Continue <ArrowRight className="w-5 h-5" /></>
                  )}
                </motion.button>

                <div className="text-center">
                  <button
                    type="button"
                    disabled={timer > 0}
                    onClick={() => setTimer(60)}
                    className={`text-xs flex items-center justify-center gap-2 mx-auto font-bold transition-colors ${
                      timer > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-[#1f7d53] hover:underline'
                    }`}
                  >
                    <RotateCcw className={`w-3.5 h-3.5 ${timer > 0 ? '' : 'animate-spin-slow'}`} />
                    {timer > 0 ? `Resend in ${timer}s` : "Resend code"}
                  </button>
                </div>
              </div>
            </form>

            {/* Creative Help Box */}
            <div className="mt-10 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800 flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#1f7d53] shrink-0" />
              <div className="text-[11px] text-gray-500 leading-relaxed">
                <p>Didn't get the email? Check your <span className="text-gray-800 dark:text-gray-300 font-semibold">Spam folder</span> or try resending. Ensure you used the correct email address.</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Desktop Footer Only */}
        <div className="hidden lg:block p-8 text-center text-xs text-gray-400">
           © 2026 Painters' Diary. Secure Artist Verification.
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;