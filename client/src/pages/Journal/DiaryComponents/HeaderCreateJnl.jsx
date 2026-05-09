import React from 'react';
import { Plus, X, TableOfContents, Album, TextAlignStart } from 'lucide-react';
import { Link } from "react-router-dom";
import Logo from '../../../assets/Logo.jpeg'
const Header = ({ isCreating, startNewCreation, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-black/90 backdrop-blur-md">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 -ml-2 rounded-md lg:hidden text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <TextAlignStart size={20} />}
          </button>

          <Link to={"/"} className="group flex items-center gap-2">
            <div className='h-8 w-8 rounded-lg overflow-hidden lg:block hidden '>
              <img src={Logo} alt="" />
            </div>
            <h1 className="text-lg dark:text-gray-100 text-gray-800  font-semibold tracking-tight font-Eagle">
              Painters' Diary
            </h1>
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          {!isCreating && (
            <button onClick={startNewCreation} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-sm dark:bg-white dark:text-black dark:hover:bg-zinc-200">
              <Plus size={16} />
              <span className="hidden sm:inline">New Entry</span>
            </button>
          )}

           {isCreating && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-50 border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] font-bold tracking-widest text-zinc-500">Studio Active</span>
              </div>
           )}
           <Link to={"/journal"}>
             <div className="p-2 text-zinc-800 hover:bg-zinc-100 rounded-md dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors">
               <Album size={20}/>
             </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;