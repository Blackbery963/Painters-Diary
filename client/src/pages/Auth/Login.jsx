import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Sparkles, AlertCircle } from 'lucide-react';
import { Toaster, toast } from 'sonner';

import Background from '../../assets/Login.jpg'
import logo from '../../assets/Logo.jpeg'

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '', 
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      // Future session check logic goes here
    };
    checkSession();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(''); 
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // --- THIS IS THE FIX FOR SONNER ---
    // We check if the fields are empty and trigger the Sonner toast!
    if (!formData.email.trim()) {
      toast.error('Please enter your email address to log in.');
      return; // Stops the function from continuing
    }
    
    if (!formData.password) {
      toast.error('Please provide your password.');
      return; // Stops the function from continuing
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulated network request
      await new Promise(resolve => setTimeout(resolve, 1500)); 

      // Simulated success block
      toast.success('Welcome back to your studio!');
      navigate('/Account');

    } catch (err) {
      console.error('Login error:', err);
      let errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-['Quicksand'] relative overflow-x-hidden lg:overflow-hidden lg:flex">
      
      {/* Sonner Toaster */}
      <Toaster position="top-center" richColors theme='system' />

      {/* SECTION 1: MOBILE BACKGROUND */}
      <div className="lg:hidden absolute top-0 left-0 w-full h-[35vh] z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${Background || 'https://via.placeholder.com/800x600'})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center pb-12 text-white">
          <div className="bg-[#1f7d53] p-1 rounded-lg h-10 w-10 flex items-center justify-center overflow-hidden">
            <img src={logo} alt="Logo" className='rounded-lg' />
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold font-Eagle tracking-wide drop-shadow-md"
          >
            Painters' Diary
          </motion.h1>
        </div>
      </div>

      {/* SECTION 2: DESKTOP SIDEBAR */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-950 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-70 transition-transform duration-[20s] hover:scale-105"
          style={{ backgroundImage: `url(${Background || 'https://via.placeholder.com/1920x1080'})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        <div className="relative z-10 w-full p-16 flex flex-col justify-between h-full text-white">
          <div className="flex items-center gap-3">
            <div className="bg-[#1f7d53] p-1 rounded-lg h-10 w-10 flex items-center justify-center overflow-hidden">
              <img src={logo} alt="Logo" className='rounded-lg' />
            </div>
            <span className="text-xl font-bold tracking-wide font-Eagle">Painters' Diary</span>
          </div>

          <div className="max-w-md">
            <h1 className="text-5xl font-bold leading-tight mb-6 font-Quicksand">
              Welcome back to your <span className="text-[#1f7d53]">studio</span>.
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed font-Quicksand">
              "Every artist was first an amateur." Continue your journey where you left off.
            </p>
          </div>
          
          <div className="text-sm text-gray-400 font-Quicksand">
            © 2025 Painters' Diary.
          </div>
        </div>
      </div>

      {/* SECTION 3: FORM CONTENT */}
      <div className="w-full lg:w-1/2 flex flex-col relative z-10">
        
        <div className="h-[28vh] lg:hidden" />

        <motion.div 
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 bg-white dark:bg-gray-950 rounded-t-[2.5rem] lg:rounded-none shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.3)] lg:shadow-none p-6 sm:p-10 lg:p-20 flex flex-col justify-center"
        >
          <div className="w-full max-w-md mx-auto">
            
            <div className="mb-8 lg:mb-10 text-center lg:text-left">
              <div className="lg:hidden w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-6" /> 
              
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center lg:justify-start gap-2 font-Playfair">
                Log In <Sparkles className="w-5 h-5 text-[#1f7d53] hidden lg:block" />
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm lg:text-base font-Quicksand">
                Enter your credentials to access your account.
              </p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-red-600 dark:text-red-300 font-medium font-Quicksand">{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              
              <div className="group">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#1f7d53] transition-colors" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="artist@example.com"
                    disabled={isLoading}
                    /* 'required' attribute has been removed so Sonner can handle the error */
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-[#1f7d53]/20 focus:border-[#1f7d53] transition-all duration-200 font-Quicksand"
                  />
                </div>
              </div>

              <div className="group">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#1f7d53] transition-colors" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      disabled={isLoading}
                      /* 'required' attribute has been removed so Sonner can handle the error */
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-[#1f7d53]/20 focus:border-[#1f7d53] transition-all duration-200 font-Quicksand"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-1.5 hover:underline ">
                  <Link 
                    to="/auth/forgot-password" 
                    className="text-xs sm:text-sm font-semibold text-[#1f7d53] hover:underline hover:text-[#155a3b] transition-colors "
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-[#1f7d53]/20 flex items-center justify-center gap-2 transition-all font-Quicksand text-lg mt-4 ${
                  isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1f7d53] hover:bg-[#186642] hover:shadow-[#1f7d53]/40'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <>
                    Sign In
                    <LogIn className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            <motion.div 
              variants={contentVariants} 
              className="mt-8 text-center"
            >
              <p className="text-gray-500 dark:text-gray-400 font-Quicksand">
                Don't have an account yet?{' '}
                <Link to="/auth/signup" className="text-[#1f7d53] font-bold hover:underline">
                  Create Account
                </Link>
              </p>
            </motion.div>
            
            <div className="h-8 lg:hidden" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;