import React from 'react'
import { Link } from 'react-router-dom'
import { User } from 'lucide-react'
import Logo from '../../assets/Logo.jpeg'

function Header() {
  return (
    <>
      {/* --- Header: Clean, Glass, Monochromatic --- */}
      <header className="fixed  w-full mx-auto top-0 inset-x-0 z-50 h-16 px-4 md:px-0 flex items-center justify-between 
        bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md 
        border-b border-zinc-200 dark:border-zinc-900 transition-colors duration-300">
        
        <div className='max-w-7xl w-full flex items-center justify-between mx-auto
        '>
        {/* Left: Logo */}
        <Link to="/" className="group">
        <div className=' flex items-center justify-center gap-2 '>
            <div className=' h-8 w-8 rounded-lg overflow-hidden'>
                <img src={Logo} alt="" />
            </div>
          <h1 className="text-xl md:text-2xl font-bold font-Eagle tracking-tighter leading-relaxed text-zinc-900 dark:text-white group-hover:opacity-70 transition-opacity">
            Painters' Diary
          </h1>
          </div>
        </Link>

        {/* Right Icons */}
        <div className="flex items-center gap-6">
          <Link to="/profile">
            <User className="w-5 h-5 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer" />
          </Link>
        </div>
        </div>
      </header>
    </>
  )
}

export default Header