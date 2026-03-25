/**
 * FILE: MediaEditor.jsx
 * PURPOSE: The fullscreen popup modal that handles cropping, trimming, 
 * and applying filters to a selected image or video.
 */
import React, { useState, useRef } from 'react';
import Cropper from 'react-easy-crop';
import { Play, Scissors, Crop, Sliders, Maximize, Square, Smartphone, Monitor, RotateCcw, Wand2 } from 'lucide-react';
import { FILTER_PRESETS, getFilterStyle } from './constants';
import { getProcessedImg } from './imageProcessor';
import { toast } from 'sonner';

const MediaEditor = ({ file, onClose, onSave }) => {
  const isVideo = file.type === 'video';
  const [editTab, setEditTab] = useState('main');
  const [filters, setFilters] = useState(file.edits?.filters || FILTER_PRESETS.normal);
  
  // Image State
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState(4 / 5);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Video State
  const [videoDuration, setVideoDuration] = useState(0);
  const [trimRange, setTrimRange] = useState(file.edits?.trim || { start: 0, end: 100 });
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleApplyPreset = (presetKey) => {
    setFilters(FILTER_PRESETS[presetKey]);
    // ✅ Toast notification for filter application
    toast.success(`${presetKey.charAt(0).toUpperCase() + presetKey.slice(1)} filter applied`, { duration: 1500 });
  };

  const handleSave = async () => {
    const loadingToast = toast.loading('Processing media...');
    try {
      if (!isVideo && croppedAreaPixels) {
        const processedUrl = await getProcessedImg(file.url, croppedAreaPixels, rotation, filters);
        onSave(file.id, processedUrl, { filters });
      } else {
        onSave(file.id, file.url, { trim: trimRange, filters });
      }
      toast.dismiss(loadingToast);
    } catch (e) {
      toast.dismiss(loadingToast);
      toast.error("Failed to save edits");
    }
  };

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-[60] flex flex-col animate-in fade-in duration-200">
      <div className="flex justify-between items-center px-6 py-4 bg-zinc-900 border-b border-zinc-800">
        <button onClick={onClose} className="text-zinc-400 hover:text-white text-sm font-medium">Cancel</button>
        <span className="text-zinc-100 font-medium">Edit {isVideo ? 'Video' : 'Image'}</span>
        <button onClick={handleSave} className="bg-white text-black px-5 py-1.5 rounded-full text-sm font-bold hover:bg-zinc-200">Done</button>
      </div>

      <div className="relative flex-1 bg-zinc-950 overflow-hidden flex items-center justify-center">
        {isVideo ? (
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
            <video 
              ref={videoRef} src={file.url} className="w-full h-full object-contain"
              onLoadedMetadata={(e) => setVideoDuration(e.target.duration)}
              onEnded={() => setIsPlaying(false)}
              style={{ filter: getFilterStyle(filters) }}
            />
            <button onClick={toggleVideoPlay} className="absolute inset-0 flex items-center justify-center group">
              {!isPlaying && (
                <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play fill="white" className="text-white ml-1" size={32} />
                </div>
              )}
            </button>
          </div>
        ) : (
          <Cropper
            image={file.url} crop={crop} zoom={zoom} rotation={rotation} aspect={aspect}
            onCropChange={setCrop} onZoomChange={setZoom} onRotationChange={setRotation}
            onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
            style={{ containerStyle: { background: '#09090b' }, mediaStyle: { filter: getFilterStyle(filters) } }}
          />
        )}
      </div>

      <div className="bg-zinc-900 border-t border-zinc-800 p-6 pb-8 space-y-6">
        <div className="flex justify-center gap-8 mb-4">
            <button onClick={() => setEditTab('main')} className={`flex flex-col items-center gap-1 text-xs font-medium uppercase tracking-wide transition-colors ${editTab === 'main' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>
              {isVideo ? <Scissors size={20} /> : <Crop size={20} />} {isVideo ? 'Trim' : 'Crop'}
            </button>
            <button onClick={() => setEditTab('adjust')} className={`flex flex-col items-center gap-1 text-xs font-medium uppercase tracking-wide transition-colors ${editTab === 'adjust' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>
              <Sliders size={20} /> Adjust
            </button>
        </div>

        <div className="flex items-center justify-center">
          {editTab === 'main' ? (
            isVideo ? (
              // VIDEO TRIMMER
              <div className="w-full max-w-lg space-y-4">
                <div className="flex justify-between text-xs text-zinc-400 font-mono">
                  <span>{((trimRange.start / 100) * videoDuration).toFixed(1)}s</span>
                  <span>{((trimRange.end / 100) * videoDuration).toFixed(1)}s</span>
                </div>
                <div className="relative h-12 bg-zinc-800 rounded-lg overflow-hidden cursor-pointer group">
                  <div className="absolute inset-0 flex gap-0.5 opacity-30">
                      {[...Array(20)].map((_, i) => <div key={i} className="flex-1 bg-zinc-600 rounded-sm"/>)}
                  </div>
                  <div className="absolute top-0 bottom-0 bg-white/10 border-x-4 border-white" style={{ left: `${trimRange.start}%`, right: `${100 - trimRange.end}%` }} />
                  <input 
                    type="range" min="0" max="100" value={trimRange.start}
                    onChange={(e) => setTrimRange(p => ({ ...p, start: Math.min(Number(e.target.value), trimRange.end - 5) }))}
                    className="absolute inset-0 w-full opacity-0 z-10 cursor-col-resize"
                  />
                  <input 
                    type="range" min="0" max="100" value={trimRange.end}
                    onChange={(e) => setTrimRange(p => ({ ...p, end: Math.max(Number(e.target.value), trimRange.start + 5) }))}
                    className="absolute inset-0 w-full opacity-0 z-20 cursor-col-resize"
                  />
                </div>
              </div>
            ) : (
              // IMAGE CROP CONTROLS
              <div className="space-y-4 w-full max-w-lg">
                <div className="flex justify-center gap-3">
                  {[
                    { label: 'Free', val: undefined, icon: <Maximize size={14}/> },
                    { label: '1:1', val: 1, icon: <Square size={14}/> },
                    { label: '4:5', val: 4/5, icon: <Smartphone size={14}/> },
                    { label: '16:9', val: 16/9, icon: <Monitor size={14}/> },
                  ].map((opt) => (
                    <button
                      key={opt.label} onClick={() => setAspect(opt.val)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium border ${aspect === opt.val ? 'bg-zinc-100 text-zinc-900 border-zinc-100' : 'bg-zinc-800 text-zinc-400 border-zinc-700'}`}
                    >
                      {opt.icon} {opt.label}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-4 pt-2">
                  <RotateCcw size={16} className="text-zinc-500" />
                  <input
                    type="range" min={0} max={360} value={rotation} onChange={(e) => setRotation(Number(e.target.value))}
                    className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                </div>
              </div>
            )
          ) : (
            // FILTER CONTROLS
            <div className="w-full max-w-md space-y-5">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <Wand2 size={16} className="text-zinc-500 mr-2 flex-shrink-0" />
                {Object.keys(FILTER_PRESETS).map((presetKey) => (
                    <button 
                      key={presetKey} onClick={() => handleApplyPreset(presetKey)}
                      className="px-4 py-1.5 rounded-full text-xs font-medium capitalize bg-zinc-800 text-zinc-300 border border-zinc-700 hover:text-white flex-shrink-0 transition-colors"
                    >
                      {presetKey === 'bw' ? 'B&W' : presetKey}
                    </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {['brightness', 'contrast', 'saturation', 'sepia'].map((f) => (
                  <div key={f} className="space-y-1.5">
                    <div className="flex justify-between text-[10px] text-zinc-400 uppercase tracking-wider">
                      <span>{f}</span><span>{filters[f]}%</span>
                    </div>
                    <input
                      type="range" min={0} max={200} value={filters[f]}
                      onChange={(e) => setFilters({...filters, [f]: Number(e.target.value)})}
                      className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-white"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaEditor;