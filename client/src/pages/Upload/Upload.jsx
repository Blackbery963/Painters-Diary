/**
 * FILE: Upload.jsx
 * PURPOSE: The main wrapper and orchestrator for the Upload feature.
 * Holds the master state, handles navigation between Step 1 (Media) 
 * and Step 2 (Details), fires important toast notifications, and manages 
 * the final simulated API submission.
 */

import React, { useState, useRef } from 'react';
import { ChevronRight, ChevronLeft, Trash2, User, Loader2, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

import MediaEditor from './Components/MediaEditor';
import DetailsStep from './Components/DetailsStep';
import MediaStep from './Components/MediaStep';
import { useAuth } from '../../context/Auth.context';
import Header from '../../components/common/Header';
import { FILTER_PRESETS, MAX_TAGS, SUGGESTED_TAGS } from './Components/constants';
import axios from 'axios';
import { glassShell, glassSurface } from '../../components/common/glass.js';

// ─── Upload Progress Modal ─────────────────────────────────────────────────────
const UploadProgressModal = ({ isOpen, progress, currentFile, totalFiles, status }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className={`${glassShell} rounded-[20px] p-6 max-w-md w-full`}>
        
        {/* Status Icon */}
        <div className="flex flex-col items-center gap-4 mb-6">
          {status === 'uploading' && (
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${glassSurface}`}>
              <Loader2 size={28} className="text-zinc-900 dark:text-zinc-100 animate-spin" strokeWidth={1.8} />
            </div>
          )}
          {status === 'success' && (
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${glassSurface}`}>
              <Check size={28} className="text-emerald-500" strokeWidth={2.2} />
            </div>
          )}
          {status === 'error' && (
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${glassSurface}`}>
              <span className="text-2xl">⚠️</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 
          className="text-[17px] font-bold text-center text-zinc-900 dark:text-zinc-100 mb-2"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          {status === 'uploading' && 'Publishing your work...'}
          {status === 'success' && 'Published successfully!'}
          {status === 'error' && 'Upload failed'}
        </h3>

        {/* Subtitle */}
        <p 
          className="text-[13px] text-center text-zinc-400 dark:text-zinc-500 mb-6"
          style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
        >
          {status === 'uploading' && 'Please wait while we upload your files...'}
          {status === 'success' && 'Your artwork is now live for everyone to see.'}
          {status === 'error' && 'Something went wrong. Please try again.'}
        </p>

        {/* Progress Section - only show during upload */}
        {status === 'uploading' && (
          <div className="space-y-4">
            {/* File Counter */}
            <div className="flex items-center justify-between text-[12px]">
              <span 
                className="font-semibold text-zinc-500 dark:text-zinc-400"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                Uploading file {currentFile} of {totalFiles}
              </span>
              <span 
                className="font-bold text-zinc-900 dark:text-zinc-100"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                {Math.round(progress)}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="relative w-full h-2 rounded-full bg-zinc-200/60 dark:bg-zinc-800/60 overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-zinc-900 dark:bg-zinc-100 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Upload Stats */}
            <div className={`grid grid-cols-2 gap-2 p-3 rounded-[14px] ${glassSurface}`}>
              <div className="text-center">
                <p 
                  className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-600 mb-0.5"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  Completed
                </p>
                <p 
                  className="text-[15px] font-bold text-zinc-900 dark:text-zinc-100"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  {currentFile - 1}/{totalFiles}
                </p>
              </div>
              <div className="text-center">
                <p 
                  className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-600 mb-0.5"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  Remaining
                </p>
                <p 
                  className="text-[15px] font-bold text-zinc-900 dark:text-zinc-100"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  {totalFiles - currentFile + 1}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Main Upload Component ─────────────────────────────────────────────────────
const Upload = () => {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState([]);
  const [editingFile, setEditingFile] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', price: '', isForSale: false, tags: [], isAwardWinning: false });
  const [tagInput, setTagInput] = useState('');
  
  // Upload progress state
  const [uploadProgress, setUploadProgress] = useState({
    isOpen: false,
    progress: 0,
    currentFile: 1,
    totalFiles: 0,
    status: 'uploading' // 'uploading' | 'success' | 'error'
  });
  
  const fileInputRef = useRef(null);
  const { accessToken } = useAuth();

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
    if (files.length === 0) {
      toast.error('Please select at least one media file to continue');
      return;
    }
    setStep(2);
  };

  const handlePublish = async () => {
    try {
      if (!accessToken) throw new Error("Not logged in");

      // Validation
      if (files.length === 0) {
        toast.error("Upload at least one artwork!");
        return;
      }
      if (!formData.title.trim()) {
        toast.error("Every masterpiece needs a title!");
        return;
      }

      // Open progress modal
      setUploadProgress({
        isOpen: true,
        progress: 0,
        currentFile: 1,
        totalFiles: files.length,
        status: 'uploading'
      });

      const uploadData = new FormData();
      uploadData.append("title",          formData.title);
      uploadData.append("description",    formData.description);
      uploadData.append("isForSale",      String(formData.isForSale));
      uploadData.append("isAwardWinning", String(formData.isAwardWinning));
      uploadData.append("price",          String(formData.price || 0));
      uploadData.append("stocks",         String(formData.isForSale ? 1 : 0)); // Default to 1 stock if for sale, otherwise 0
      uploadData.append("tags",           JSON.stringify(formData.tags));
      
      files.forEach((f) => uploadData.append("media", f.file));

      // Upload with progress tracking
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/post/create`, 
        uploadData, 
        {
          headers: { 
            Authorization: `Bearer ${accessToken}` 
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            const currentFileIndex = Math.min(
              Math.ceil((percentCompleted / 100) * files.length), 
              files.length
            );
            
            setUploadProgress(prev => ({
              ...prev,
              progress: percentCompleted,
              currentFile: currentFileIndex
            }));
          }
        }
      );

      // Success state
      setUploadProgress(prev => ({
        ...prev,
        progress: 100,
        status: 'success'
      }));

      // Close modal after 2 seconds
      setTimeout(() => {
        setUploadProgress({ isOpen: false, progress: 0, currentFile: 1, totalFiles: 0, status: 'uploading' });
        
        // Reset form
        setFiles([]);
        setFormData({ title: '', description: '', price: '', stocks:'', isForSale: false, tags: [], isAwardWinning: false });
        setStep(1);
        
        toast.success("Published successfully!");
      }, 2000);

      return res.data;

    } catch (err) {
      console.error(err);
      
      // Error state
      setUploadProgress(prev => ({
        ...prev,
        status: 'error'
      }));

      // Close modal after 3 seconds
      setTimeout(() => {
        setUploadProgress({ isOpen: false, progress: 0, currentFile: 1, totalFiles: 0, status: 'uploading' });
      }, 3000);

      const errorMessage = err?.response?.data?.message || err.message || "Something went wrong!";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-700 relative">
      <Toaster position="top-center" richColors theme="system" />
      
      {/* Upload Progress Modal */}
      <UploadProgressModal 
        isOpen={uploadProgress.isOpen}
        progress={uploadProgress.progress}
        currentFile={uploadProgress.currentFile}
        totalFiles={uploadProgress.totalFiles}
        status={uploadProgress.status}
      />
      
      {editingFile && <MediaEditor file={editingFile} onClose={() => setEditingFile(null)} onSave={saveEdits} />}
      
      <Header/>

      <div className="max-w-4xl mx-auto px-6 py-10 pb-32 pt-24">
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
               className={`px-6 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${files.length > 0 ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:shadow-lg' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400'}`}
             >
               Next Step <ChevronRight size={16} />
             </button>
          ) : (
            <button 
              onClick={handlePublish} 
              disabled={uploadProgress.isOpen}
              className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-8 py-2.5 rounded-lg text-sm font-medium hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploadProgress.isOpen ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  Publish <ChevronRight size={16} />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;