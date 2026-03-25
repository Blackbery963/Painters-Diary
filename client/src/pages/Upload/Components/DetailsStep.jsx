/**
 * FILE: DetailsStep.jsx
 * PURPOSE: Step 2 of the upload flow. Handles metadata collection like 
 * title, description, smart tags, pricing, and awards.
 */
import React from 'react';
import { Tag, Trophy, X, Plus } from 'lucide-react';
import { MAX_TAGS, SUGGESTED_TAGS } from './constants';

const DetailsStep = ({ formData, setFormData, tagInput, setTagInput, handleAddTag, handleRemoveTag, handleTagInputKeyDown }) => {
  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-2xl mx-auto space-y-10">
      
      {/* Title Input */}
      <div className="group relative pt-4">
        <input
          type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
          placeholder="Untitled Masterpiece"
          className="w-full text-2xl font-serif bg-transparent border-0 border-b border-zinc-300 dark:border-zinc-700 focus:border-zinc-900 dark:focus:border-zinc-100 focus:ring-0 px-0 py-2 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 text-zinc-900 dark:text-zinc-100 transition-all outline-none"
        />
        <label className="block text-xs text-zinc-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-1 left-0">Give your work a name *</label>
      </div>

      {/* Description Input */}
      <div>
        <textarea
          value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="What is the story behind this piece? (Optional)" rows={3}
          className="w-full bg-transparent outline-none border-none p-0 text-lg text-zinc-600 dark:text-zinc-300 placeholder:text-zinc-300 dark:placeholder:text-zinc-600 resize-none leading-relaxed"
        />
      </div>

      {/* Tags Section */}
      <div>
        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4 flex justify-between items-center">
          <span>Tags & Categories</span>
          <span className="font-normal lowercase tracking-normal">{formData.tags.length}/{MAX_TAGS}</span>
        </label>
        
        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {formData.tags.map(tag => (
              <span key={tag} className="animate-in zoom-in duration-200 flex items-center gap-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-3 py-1.5 rounded-full text-sm font-medium">
                #{tag}
                <button onClick={() => handleRemoveTag(tag)} className="hover:text-red-400 transition-colors ml-1"><X size={14} /></button>
              </span>
            ))}
          </div>
        )}

        <div className="relative">
          <input
            type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleTagInputKeyDown}
            placeholder={formData.tags.length < MAX_TAGS ? "Add a tag and press Enter or Comma..." : "Tag limit reached"}
            disabled={formData.tags.length >= MAX_TAGS}
            className="w-full bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-lg px-4 py-3 text-sm focus:border-zinc-900 dark:focus:border-zinc-100 text-zinc-900 dark:text-zinc-100 transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-zinc-400"
          />
          {tagInput.trim() && (
            <button onClick={() => handleAddTag(tagInput)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-3 py-1.5 rounded-md font-medium">Add</button>
          )}
        </div>

        {/* ✅ Restored Suggested Tags */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-zinc-400 mr-1">Suggestions:</span>
          {SUGGESTED_TAGS.filter(t => !formData.tags.includes(t)).slice(0, 6).map((tag) => (
            <button key={tag} onClick={() => handleAddTag(tag)} className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded-full px-3 py-1.5 transition-colors bg-zinc-50 dark:bg-zinc-900/50 flex items-center gap-1">
              <Plus size={12} /> {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
             <Tag size={18} className="text-zinc-400" />
             <span className="text-zinc-700 dark:text-zinc-300 font-medium">For Sale?</span>
          </div>
          <div onClick={() => setFormData({...formData, isForSale: !formData.isForSale})} className={`w-10 h-5 rounded-full p-0.5 cursor-pointer transition-colors ${formData.isForSale ? 'bg-zinc-900 dark:bg-zinc-100' : 'bg-zinc-200 dark:bg-zinc-700'}`}>
            <div className={`w-4 h-4 bg-white dark:bg-zinc-900 rounded-full shadow-sm transition-transform ${formData.isForSale ? 'translate-x-5' : 'translate-x-0'}`} />
          </div>
        </div>
        {formData.isForSale && (
          <div className="mt-4 flex items-baseline gap-1 animate-in slide-in-from-top-2">
             <span className="text-2xl text-zinc-400 font-light">₹</span>
             <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} placeholder="0" className="w-full bg-transparent outline-none border-none p-0 text-3xl font-light focus:ring-0 text-zinc-900 dark:text-white placeholder:text-zinc-200" />
          </div>
        )}
      </div>

      {/* ✅ Restored Award Winning Section */}
      <div className={`relative rounded-xl border p-4 transition-all duration-300 ${formData.isAwardWinning ? 'bg-amber-50/50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800' : 'bg-zinc-50 dark:bg-zinc-900 border-transparent'}`}>
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setFormData({...formData, isAwardWinning: !formData.isAwardWinning})}>
          <Trophy size={18} className={formData.isAwardWinning ? 'text-amber-600 dark:text-amber-400' : 'text-zinc-400'} />
          <span className={`text-sm font-medium ${formData.isAwardWinning ? 'text-amber-900 dark:text-amber-100' : 'text-zinc-500'}`}>This piece has won an award</span>
        </div>
      </div>
      
    </div>
  );
};

export default DetailsStep;