import React, { useRef, useState } from 'react';
import {
  Eye, EyeOff, Loader2, ToggleLeft, ToggleRight, X, Sparkles,
  Hash, PenLine, Check, Plus, MapPin, Cloud, Camera, Image as ImageIcon, Send
} from 'lucide-react';

const Editor = ({
  showPreview, setShowPreview, zenMode, setZenMode, autoSave, setAutoSave, isSaving,
  title, setTitle, images, handleImageUpload, removeImage, content, setContent,
  activeMode, isThinking, handleAIEnhance, tags, setTags, weather, location,
  handlePublish, publishStatus, fileInputRef, aiEnhancements
}) => {
  const textareaRef = useRef(null);
  const hasContent = content && content.trim().length > 0;
  const [isUploading, setIsUploading] = useState(false);
  const [tagInput, setTagInput] = useState('');

  // 1. Safely handle tags as an array
  const safeTags = Array.isArray(tags) ? tags : [];

  // 2. Tag Functions
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/^#/, ''); // Remove # if user types it
      if (newTag && !safeTags.includes(newTag)) {
        setTags([...safeTags, newTag]);
        setTagInput('');
      }
    } else if (e.key === 'Backspace' && !tagInput && safeTags.length > 0) {
      // Optional: Delete the last tag if input is empty and user hits backspace
      const currentTags = [...safeTags];
      currentTags.pop();
      setTags(currentTags);
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(safeTags.filter(tag => tag !== tagToRemove));
  };

  const getSeasonalDate = () => {
    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    const monthName = date.toLocaleString('default', { month: 'long' });
    
    let season = "Season";
    if (month === 11 || month === 0 || month === 1) season = "Winter";
    else if (month >= 2 && month <= 4) season = "Spring";
    else if (month >= 5 && month <= 7) season = "Summer";
    else season = "Autumn";

    return `${season}, ${monthName} ${day}`;
  };

  const enhancedImageUpload = async (e) => {
    try {
      setIsUploading(true);
      await handleImageUpload(e);
    } catch (err) {
      console.error("Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const renderPublishButton = () => {
    if (publishStatus === 'loading') {
      return (
        <button disabled className="px-5 py-2 rounded-md font-bold text-xs uppercase tracking-wide flex items-center gap-2 bg-zinc-100 text-zinc-400 cursor-wait dark:bg-zinc-800">
          <Loader2 size={14} className="animate-spin" /> <span>Processing</span>
        </button>
      );
    }
    if (publishStatus === 'success') {
      return (
        <button disabled className="px-5 py-2 rounded-md font-bold text-xs uppercase tracking-wide flex items-center gap-2 bg-zinc-900 text-white dark:bg-white dark:text-black">
          <Check size={14} /> <span>Done</span>
        </button>
      );
    }
    if (hasContent) {
      return (
        <button onClick={handlePublish} className="px-5 py-2 rounded-md font-bold text-xs uppercase tracking-wide flex items-center gap-2 bg-zinc-900 text-white hover:bg-black shadow-lg hover:shadow-xl transition-all dark:bg-white dark:text-black dark:hover:bg-zinc-200">
          <Send size={14} /> <span>Publish</span>
        </button>
      );
    }
    return (
      <button disabled className="px-5 py-2 rounded-md font-bold text-xs uppercase tracking-wide flex items-center gap-2 bg-zinc-100 text-zinc-300 dark:bg-zinc-800 dark:text-zinc-600 cursor-not-allowed">
        <PenLine size={14} /> <span>Empty</span>
      </button>
    );
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-black">
      {/* Top Bar */}
      <div className="px-8 py-4 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between bg-white/90 dark:bg-black/90 backdrop-blur-sm sticky top-0 z-20">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                {activeMode === 'travelDiaries' ? 'Travel Log' : 'Creative Blog'}
             </span>
             {activeMode === 'travelDiaries' && (
                <span className="text-xs font-serif italic text-zinc-500 mt-0.5">{getSeasonalDate()}</span>
             )}
             {activeMode === 'idea' && (
                <span className="text-xs font-medium text-zinc-500 mt-0.5">{new Date().toLocaleDateString()}</span>
             )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button onClick={() => setShowPreview(!showPreview)} className="p-2 rounded-md hover:bg-zinc-100 text-zinc-400 dark:hover:bg-zinc-900 transition-colors">
            {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      {/* Main Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-12">
        <div className="max-w-3xl mx-auto h-full flex flex-col">

          {/* PREVIEW MODE */}
          {showPreview ? (
            <div className="bg-white dark:bg-black text-zinc-900 dark:text-zinc-100">
              <div className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tight leading-tight">{title || "Untitled"}</h1>
                {activeMode === 'travelDiaries' ? (
                   <div className="flex justify-center items-center gap-4 text-xs font-medium uppercase tracking-widest text-zinc-500 border-t border-b border-zinc-100 dark:border-zinc-900 py-3 mx-auto max-w-md">
                     <span>{getSeasonalDate()}</span>
                     {location && <span>• {location}</span>}
                     {weather && <span>• {weather}</span>}
                   </div>
                ) : (
                   <div className="text-xs font-medium text-zinc-400 uppercase tracking-widest">{new Date().toLocaleDateString()}</div>
                )}
              </div>
                         
              {/* Clean Preview Grid (No buttons) */}
              {images.length > 0 && (
                <div className={`grid gap-4 mb-12 ${activeMode === 'travelDiaries' ? 'grid-cols-2 rotate-1' : 'grid-cols-1'}`}>
                  {images.map((img) => (
                    <div key={img.id} className={`${activeMode === 'travelDiaries' ? 'p-2 bg-white shadow-lg border border-zinc-100 transform hover:-rotate-1 transition-transform' : ''}`}>
                       <img src={img.url} className="w-full h-auto object-cover grayscale-[10%]" alt="content" />
                    </div>
                  ))}
                </div>
              )}
              
              <div className="prose prose-lg prose-zinc dark:prose-invert max-w-none font-serif leading-loose first-letter:text-5xl first-letter:font-bold first-letter:mr-1 first-letter:float-left">
                {content}
              </div>
            </div>
          ) : (
            /* EDIT MODE */
            <>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={activeMode === 'travelDiaries' ? "Journey Title..." : "Blog Headline..."} className="w-full text-4xl md:text-5xl font-serif font-bold mb-6 bg-transparent outline-none placeholder:text-zinc-200 dark:placeholder:text-zinc-800 text-zinc-900 dark:text-white tracking-tight" />

              {activeMode === 'travelDiaries' && (
                  <div className="flex items-center gap-4 mb-8 text-zinc-400 text-xs font-medium uppercase tracking-wider">
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-zinc-50 dark:bg-zinc-900 rounded-full">
                          <span className="text-zinc-800 dark:text-zinc-300">{getSeasonalDate()}</span>
                      </div>
                      {location && <div className="flex items-center gap-1"><MapPin size={12}/> {location}</div>}
                      {weather && <div className="flex items-center gap-1"><Cloud size={12}/> {weather}</div>}
                  </div>
              )}

              <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                     <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                        {activeMode === 'travelDiaries' ? <Camera size={14}/> : <ImageIcon size={14}/>}
                        {activeMode === 'travelDiaries' ? "Sketches & Snaps" : "Gallery"}
                     </h3>
                     <span className="text-[10px] text-zinc-300">{images.length} items</span>
                </div>

                <input required type="file" ref={fileInputRef} multiple onChange={enhancedImageUpload} className="hidden" accept="image/*" />
                
                <div className="flex flex-wrap gap-4">
                  {/* Interactive Image Upload Grid */}
                  {images.map((img) => (
                    <div
                      key={img.id}
                      className={`
                        relative group w-32 h-32 overflow-hidden
                        ${activeMode === 'travelDiaries'
                          ? 'rotate-1 border-4 border-white shadow-md'
                          : 'rounded-md border border-zinc-200 dark:border-zinc-800'
                        }
                      `}
                    >
                      <img
                        src={img.url}
                        className="w-full h-full object-cover"
                        alt="upload"
                      />

                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200" />

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(img.id);
                        }}
                        className="
                          absolute top-2 right-2 z-20
                          bg-red-500 hover:bg-red-600
                          text-white rounded-full p-1.5
                          opacity-0 group-hover:opacity-100
                          transition-all duration-200
                          shadow-lg
                        "
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  
                  {isUploading && (
                    <div className="w-32 h-32 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 animate-pulse">
                      <Loader2 size={20} className="animate-spin text-zinc-400" />
                    </div>
                  )}

                  <button onClick={() => fileInputRef.current?.click()} className="w-32 h-32 border border-zinc-300 hover:border-zinc-900 dark:border-zinc-700 dark:hover:border-zinc-500 flex flex-col items-center justify-center transition-all bg-zinc-50/30 hover:bg-zinc-50 dark:bg-zinc-900/30">
                    <Plus size={20} className="text-zinc-300 mb-2" />
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Add</span>
                  </button>
                </div>
                <p className='text-[10px] pt-2 text-zinc-400'>First image will be used as the cover.</p>
              </div>

              <textarea ref={textareaRef} value={content} onChange={(e) => setContent(e.target.value)} placeholder={activeMode === 'travelDiaries' ? "Describe the scenery, the people, the feeling..." : "Share your thoughts..."} className="flex-1 w-full resize-none text-lg md:text-xl font-serif leading-relaxed bg-transparent outline-none placeholder:text-zinc-300 dark:placeholder:text-zinc-800 text-zinc-800 dark:text-zinc-200 min-h-[300px]" />

              {content.length > 50 && (
                <div className="mt-8 pt-4 border-t border-dashed border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center gap-3 flex-wrap">
                    <Sparkles size={14} className="text-zinc-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">AI Polish</span>
                    {isThinking && <Loader2 size={12} className="animate-spin text-zinc-500"/>}
                    
                    <div className="flex gap-2 flex-wrap">
                      {aiEnhancements.map((enh) => (
                        <button key={enh.type} onClick={() => handleAIEnhance(enh.type)} disabled={isThinking} className="px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-wide bg-zinc-50 hover:bg-zinc-100 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-all flex items-center gap-1.5">
                            {enh.icon} {enh.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-8 py-4 border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-black flex items-center justify-between gap-6">
        <div className="flex-1 flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-transparent focus-within:border-zinc-300 dark:focus-within:border-zinc-800 transition-colors max-w-md overflow-x-auto">
          <Hash size={14} className="text-zinc-400 flex-shrink-0" />
          
          {/* Render Active Tags */}
          {safeTags.map((tag, idx) => (
            <div
              key={idx}
              className="
                flex items-center gap-1 flex-shrink-0
                px-2 py-1 rounded-md
                bg-zinc-900 text-white
                dark:bg-white dark:text-black
                text-[10px] font-semibold
              "
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="opacity-70 hover:opacity-100"
              >
                <X size={10} />
              </button>
            </div>
          ))}

          {/* Tag Input Field */}
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder={activeMode === 'travelDiaries' ? "Add tags (Required)..." : "Add tags..."}
            className="
              flex-1 min-w-[120px]
              bg-transparent text-xs
              outline-none
              text-zinc-700 dark:text-zinc-300
              placeholder:text-zinc-400
            "
          />
        </div>
        {renderPublishButton()}
      </div>
    </div>
  );
};

export default Editor;