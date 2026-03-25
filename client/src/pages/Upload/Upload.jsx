/**
 * FILE: Upload.jsx
 * PURPOSE: The main wrapper and orchestrator for the Upload feature.
 * Holds the master state, handles navigation between Step 1 (Media) 
 * and Step 2 (Details), fires important toast notifications, and manages 
 * the final simulated API submission.
 */
import React, { useState, useRef } from 'react';
import { ChevronRight, ChevronLeft, Trash2, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

import MediaEditor from './Components/MediaEditor';
import DetailsStep from './Components/DetailsStep';
import MediaStep from './Components/MediaStep';
import { FILTER_PRESETS, MAX_TAGS, SUGGESTED_TAGS } from './Components/constants';

const Upload = () => {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState([]);
  const [editingFile, setEditingFile] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', price: '', isForSale: false, tags: [], isAwardWinning: false });
  const [tagInput, setTagInput] = useState('');
  
  const fileInputRef = useRef(null);

  // --- Handlers ---
  const handleFileSelect = (e) => {
    if (e.target.files?.length) {
      const newFiles = Array.from(e.target.files).map(file => ({
        file,
        url: URL.createObjectURL(file),
        type: file.type.split('/')[0], 
        id: Math.random().toString(36).substr(2, 9),
        edits: { trim: { start: 0, end: 100 }, filters: FILTER_PRESETS.normal }
      }));
      setFiles(prev => [...prev, ...newFiles]);
      // ✅ Toast notification when files are successfully added
      toast.success(`${newFiles.length} file(s) added successfully`);
    }
  };

  const saveEdits = (id, newUrl, newEdits) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, url: newUrl, edits: newEdits } : f));
    setEditingFile(null);
    toast.success('Edits saved successfully!');
  };

  const handleAddTag = (tagToAdd) => {
    const cleanTag = tagToAdd.trim().toLowerCase().replace(/^#/, '');
    if (!cleanTag) return;
    if (formData.tags.includes(cleanTag)) {
      return toast.error('Tag already added');
    }
    if (formData.tags.length >= MAX_TAGS) {
      return toast.error(`You can only add up to ${MAX_TAGS} tags`);
    }
    setFormData(prev => ({ ...prev, tags: [...prev.tags, cleanTag] }));
    setTagInput(''); 
  };

  const handleNextStepClick = () => {
    // ✅ Toast notification explicitly telling user why they can't proceed
    if (files.length === 0) {
      toast.error('Please select at least one media file to continue');
      return;
    }
    setStep(2);
  };

  const handlePublish = () => {
    if (!formData.title.trim()) {
      toast.error("Every masterpiece needs a title!");
      return;
    }
    
    // Simulated API Call Demo
    toast.promise(new Promise(resolve => setTimeout(resolve, 2500)), {
      loading: 'Publishing your masterpiece to Painters\' Diary...',
      success: () => {
        setFiles([]);
        setFormData({ title: '', description: '', price: '', isForSale: false, tags: [], isAwardWinning: false });
        setStep(1);
        return 'Published successfully! Your artwork is now live.';
      },
      error: 'Failed to publish. Please try again.'
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-700 relative">
      <Toaster position="top-center" richColors theme="system" />
      
      {editingFile && <MediaEditor file={editingFile} onClose={() => setEditingFile(null)} onSave={saveEdits} />}

      <nav className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to={"/"}>
            <div className="flex items-center gap-2">
              <span className="text-lg lg:text-2xl font-bold tracking-tight font-Eagle">Painters' Diary</span>
            </div>
          </Link>
          <Link to={"/account"}>
            <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-300">
              <User size={20} />
            </button>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10 pb-32">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-light tracking-tight mb-2">
            {step === 1 ? 'Curate your gallery' : 'Tell the story behind your work'}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            {step === 1 ? 'Start by selecting your masterpiece' : 'Add details to help people discover your work'}
          </p>
        </div>

        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex gap-2">
             <div className={`h-1.5 w-6 rounded-full transition-colors ${step >= 1 ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-200 dark:bg-zinc-800'}`} />
             <div className={`h-1.5 w-6 rounded-full transition-colors ${step >= 2 ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-200 dark:bg-zinc-800'}`} />
          </div>
          <button 
            onClick={() => {
              if (window.confirm("Discard current upload?")) {
                setFiles([]);
                setFormData({ title: '', description: '', price: '', isForSale: false, tags: [], isAwardWinning: false });
                setStep(1);
                toast.info('Draft discarded successfully');
              }
            }}
            className="text-xs font-medium text-red-500 transition-colors uppercase tracking-wider flex items-center gap-1 justify-center"
          >
          <Trash2 size={12}/> Discard
          </button>
        </div>

        <div className="w-full">
           {step === 1 ? (
             <MediaStep files={files} fileInputRef={fileInputRef} handleFileSelect={handleFileSelect} removeFile={(id) => setFiles(f => f.filter(x => x.id !== id))} openEditor={setEditingFile} />
           ) : (
             <DetailsStep formData={formData} setFormData={setFormData} tagInput={tagInput} setTagInput={setTagInput} handleAddTag={handleAddTag} handleRemoveTag={(t) => setFormData(p => ({...p, tags: p.tags.filter(x => x !== t)}))} handleTagInputKeyDown={(e) => { if(e.key === 'Enter' || e.key === ',') { e.preventDefault(); handleAddTag(tagInput); } }} />
           )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 p-4 z-40">
        <div className="max-w-4xl mx-auto flex justify-between items-center px-4">
          {step === 2 ? (
            <button onClick={() => setStep(1)} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-2 text-sm font-medium">
              <ChevronLeft size={16} /> Back
            </button>
          ) : <div/>}

          {step === 1 ? (
             <button 
               onClick={handleNextStepClick}
               /* I removed 'disabled={files.length === 0}' here so the button is actually clickable and the toast can pop up! */
               className={`px-6 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${files.length > 0 ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:shadow-lg' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400'}`}
             >
               Next Step <ChevronRight size={16} />
             </button>
          ) : (
            <button onClick={handlePublish} className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-8 py-2.5 rounded-lg text-sm font-medium hover:shadow-lg transition-all flex items-center gap-2">
              Publish <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;