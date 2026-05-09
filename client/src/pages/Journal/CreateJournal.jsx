import React, { useState, useRef } from 'react';
import {toast, Toaster} from 'sonner'; 
import Header from './DiaryComponents/HeaderCreateJnl';
import Sidebar from './DiaryComponents/SidebarCreateJnl';
import Editor from './DiaryComponents/EditorCreateJnl'
import { Sparkles, Check, PenTool } from 'lucide-react';
import {createDiary} from '../../service/diary.service'

// --- Constants & Helper Data ---
const entryTypes = [
  { id: 'travelDiaries', title: 'Travel Log', desc: 'Document your journey', icon: '🗺️' },
  { id: 'idea', title: 'Creative Blog', desc: 'Share your thoughts', icon: '💡' }
];
                                             
const emotions = [
  { id: 'joyful', label: 'Joyful', icon: '✨' },
  { id: 'melancholic', label: 'Melancholic', icon: '🌧️' },
  { id: 'inspired', label: 'Inspired', icon: '🔥' },
  { id: 'peaceful', label: 'Peaceful', icon: '🍃' }
];

const weatherOptions = ['Sunny', 'Cloudy', 'Raining', 'Snowing', 'Windy', 'Stormy'];

const tips = [
  { quote: "Every blank canvas is a journey waiting to happen." },
  { quote: "Capture the feeling, not just the sight." }
];

const aiEnhancements = [
  { type: 'grammar', label: 'Fix Grammar', icon: <Check size={12} /> },
  { type: 'expand', label: 'Expand Ideas', icon: <Sparkles size={12} /> },
  { type: 'tone', label: 'Adjust Tone', icon: <PenTool size={12} /> }
];

const CreateDiary = () => {
  // --- Global App State ---
  const [currentUser] = useState({ name: 'Vincent van Gogh' }); // Replace with your actual user context
  const fileInputRef = useRef(null);

  // --- Layout State ---
  const [isCreating, setIsCreating] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [aiDropdownOpen, setAiDropdownOpen] = useState(false);

  // --- Editor & Content State ---
  const [activeMode, setActiveMode] = useState('travelDiaries');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [images, setImages] = useState([]);
  
  // --- Sidebar/Meta State ---
  const [emotion, setEmotion] = useState('');
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState('');
  
  // --- UI/UX Flags ---
  const [showPreview, setShowPreview] = useState(false);
  const [zenMode, setZenMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [publishStatus, setPublishStatus] = useState('idle'); // 'idle' | 'loading' | 'success'
  const [currentTipIndex] = useState(0);

  // --- Helper Functions ---
  const getCurrentSeason = () => {
    const month = new Date().getMonth();
    if (month === 11 || month === 0 || month === 1) return "Winter";
    if (month >= 2 && month <= 4) return "Spring";
    if (month >= 5 && month <= 7) return "Summer";
    return "Autumn";
  };

  const startNewCreation = () => {
    setIsCreating(true);
    setTitle('');
    setContent('');
    setTags('');
    setImages([]);
    setLocation('');
    setWeather('');
    setEmotion('');
    setShowPreview(false);
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newImages = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file), // Local preview URL
      file: file // Store actual File object for FormData
    }));

    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const handleAIEnhance = async (type) => {
    setIsThinking(true);
    // Replace this with your actual AI endpoint logic later
    setTimeout(() => {
      setContent(prev => prev + `\n\n[AI Enhanced: ${type}] Added some creative flair here...`);
      setIsThinking(false);
    }, 1500);
  };

  // --- REAL API PUBLISH HANDLER ---
  const handlePublish = async () => {
    // 1. Validations
    if (!title.trim()) {
      toast.error("Every masterpiece creation should have a title.");
      return;
    }
    if (!content.trim()) {
      toast.error("Content should not be empty.");
      return;
    }

    if (images.length === 0) {
      toast.error("At least one image is required.");
      return;
    }

    if(!tags.length === 0 ){
      toast.error("Please add minimum one tag to describe the matter ")
      return
    }

    if(activeMode === 'travelDiaries' ){
      if(!location.trim()){
        toast.error("Please add location for people discovering you ")
        return
      }
    }

    setPublishStatus('loading');

    try {
      // 2. Format Data for the Service
      const mappedDiaryType = activeMode === 'travelDiaries' ? "Travel_Log" : "Creative_Blog";
      
      // Capitalize the first letter of the emotion
      let mappedVibe = emotion ? emotion.charAt(0).toUpperCase() + emotion.slice(1) : undefined;
      
      // FIX: Map frontend "Peaceful" to Mongoose Schema "Calm"
      if (mappedVibe === "Peaceful") mappedVibe = "Calm";
      if (mappedVibe === "Happy") mappedVibe = "Joyful"; 

      // Assemble the data of the diary
      const diaryData = {
        diaryType: mappedDiaryType,
        title: title,
        description: content,
        vibe: mappedVibe, 
        location: location,
        weather: weather,
        travelDate: new Date().toISOString(),
        season: getCurrentSeason(), // Now using the dynamic season function
        tags,
        sketches: images.map(img => img.file)
      };

      // 3. Call the actual API service
      await createDiary(diaryData);

      // 4. Success Handling
      setPublishStatus('success');
      toast.success("Creation published successfully!");

      setTimeout(() => {
        startNewCreation(); // Reset form
        setPublishStatus('idle');
      }, 2000);

    } catch (error) {
      console.error("Publish error:", error);
      toast.error(error.message || "Failed to publish entry. Please try again.");
      setPublishStatus('idle'); 
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white dark:bg-black font-sans">
      <Toaster position='top-center' richColors theme='system'/>
      {/* Header Area */}
      <Header 
        isCreating={isCreating}
        startNewCreation={startNewCreation}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Content Area: Sidebar + Editor */}
      <div className="flex flex-1 overflow-hidden max-w-400 w-full mx-auto">
        
        <Sidebar 
          activeMode={activeMode}
          setActiveMode={setActiveMode}
          emotion={emotion}
          setEmotion={setEmotion}
          location={location}
          setLocation={setLocation}
          weather={weather}
          setWeather={setWeather}
          weatherOptions={weatherOptions}
          emotions={emotions}
          entryTypes={entryTypes}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          aiDropdownOpen={aiDropdownOpen}
          setAiDropdownOpen={setAiDropdownOpen}
          handleAIEnhance={handleAIEnhance}
          isThinking={isThinking}
          tips={tips}
          currentTipIndex={currentTipIndex}
          aiEnhancements={aiEnhancements}
        />

        <Editor 
          showPreview={showPreview}
          setShowPreview={setShowPreview}
          zenMode={zenMode}
          setZenMode={setZenMode}
          autoSave={autoSave}
          setAutoSave={setAutoSave}
          isSaving={isSaving}
          title={title}
          setTitle={setTitle}
          images={images}
          handleImageUpload={handleImageUpload}
          removeImage={removeImage}
          content={content}
          setContent={setContent}
          activeMode={activeMode}
          isThinking={isThinking}
          handleAIEnhance={handleAIEnhance}
          tags={tags}
          setTags={setTags}
          weather={weather}
          location={location}
          handlePublish={handlePublish}
          publishStatus={publishStatus}
          fileInputRef={fileInputRef}
          aiEnhancements={aiEnhancements}
        />
        
      </div>
    </div>
  );
};

export default CreateDiary;
