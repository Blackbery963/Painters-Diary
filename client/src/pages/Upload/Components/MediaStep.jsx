/**
 * FILE: MediaStep.jsx
 * PURPOSE: Step 1 of the upload flow. Renders the empty state for selecting 
 * files, and the gallery view for managing, previewing, and deleting media 
 * once uploaded.
 */

import React from 'react';
import { Camera, Image as ImageIcon, Plus, Trash2, Crop, Scissors, X } from 'lucide-react';
import { getFilterStyle, FILTER_PRESETS } from './constants';

const MediaStep = ({ files, fileInputRef, handleFileSelect, removeFile, openEditor }) => {
  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      {files.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm">
          <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6">
            <ImageIcon className="text-zinc-400" size={32} />
          </div>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-8 py-3 rounded-xl font-medium flex items-center gap-2 hover:opacity-90 shadow-lg"
          >
            <Camera size={20} /> Select from Device
          </button>
          <p className="text-xs text-zinc-400 mt-4">Select multiple files at once</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="group relative w-full aspect-[16/9] md:aspect-[2/1] bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700">
             <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-3 py-1 rounded-full text-xs text-white z-10">Main Cover</div>
             
             {files[0].type === 'video' ? (
               <video src={files[0].url} className="w-full h-full object-contain bg-black" style={{ filter: getFilterStyle(files[0].edits?.filters || FILTER_PRESETS.normal) }} />
             ) : (
               <img src={files[0].url} alt="Main" className="w-full h-full object-contain" />
             )}

             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6">
               <button onClick={() => openEditor(files[0])} className="flex flex-col items-center gap-2 text-white hover:scale-105 transition-transform">
                 <div className="p-3 bg-white/10 backdrop-blur-md rounded-full">{files[0].type === 'video' ? <Scissors size={24} /> : <Crop size={24} />}</div>
                 <span className="text-xs">Edit</span>
               </button>
               <button onClick={() => removeFile(files[0].id)} className="flex flex-col items-center gap-2 text-red-400 hover:scale-105 transition-transform">
                 <div className="p-3 bg-white/10 backdrop-blur-md rounded-full"><Trash2 size={24} /></div>
                 <span className="text-xs">Remove</span>
               </button>
             </div>
          </div>

          <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
             {files.slice(1).map((file) => (
               <div key={file.id} className="relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 group cursor-pointer" onClick={() => openEditor(file)}>
                 {file.type === 'video' ? <video src={file.url} className="w-full h-full object-cover" /> : <img src={file.url} className="w-full h-full object-cover" alt="sub" />}
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 text-xs font-medium">Edit</span>
                 </div>
                 <button onClick={(e) => { e.stopPropagation(); removeFile(file.id); }} className="absolute top-1 right-1 p-1 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                   <X size={12} />
                 </button>
               </div>
             ))}
             <button onClick={() => fileInputRef.current?.click()} className="flex-shrink-0 flex flex-col items-center justify-center w-24 h-24 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-600 text-zinc-500 hover:text-zinc-700 hover:border-zinc-500 transition-colors text-xs gap-1">
               <Plus size={20} /><span>Add</span>
             </button>
          </div>
        </div>
      )}
      <input ref={fileInputRef} type="file" multiple accept="image/*,video/*" className="hidden" onChange={handleFileSelect} />
    </div>
  );
};

export default MediaStep;