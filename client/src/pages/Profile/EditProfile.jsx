import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, MapPin, Globe, Briefcase, Palette,
  ChevronLeft, Search, X, Instagram, Twitter, Linkedin,
  LayoutGrid, Link2, UserCheck, Camera, Check,
  Youtube, Hash, Sparkles, AtSign,
} from "lucide-react";
import { Toaster, toast } from "sonner";
import Logo from "../../assets/Logo.jpeg";

// Importing the API services
// import { getProfileInfo, updateProfile } from "../../../service/profile.service.js";
import { getProfileInfo, updateProfile } from "../../service/profile.service";

// ─── Field wrapper ────────────────────────────────────────────────────────────
const Field = ({ label, children, hint }) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-xs font-bold uppercase tracking-[0.1em] text-gray-500 dark:text-white/40 font-['Quicksand'] pl-1">
      {label}
    </label>
    {children}
    {hint && <p className="text-xs text-gray-400 dark:text-white/30 font-['Quicksand'] pl-1">{hint}</p>}
  </div>
);

// ─── Styled input ─────────────────────────────────────────────────────────────
const Input = ({ icon: Icon, prefix, ...props }) => (
  <div className="relative flex items-center group w-full">
    {Icon && (
      <div className="absolute left-4 text-gray-400 dark:text-white/30 group-focus-within:text-zinc-900 dark:group-focus-within:text-white transition-colors">
        <Icon size={16} />
      </div>
    )}
    {prefix && (
      <span className="absolute left-4 text-gray-400 dark:text-white/30 text-sm font-semibold select-none pointer-events-none font-['Quicksand']">
        {prefix}
      </span>
    )}
    <input
      {...props}
      className={`w-full bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 rounded-xl py-3 text-sm sm:text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/20 focus:outline-none focus:border-zinc-900 dark:focus:border-white focus:ring-1 focus:ring-zinc-900/10 dark:focus:ring-white/10 transition-all font-['Quicksand'] ${
        Icon || prefix ? "pl-10 pr-4" : "px-4"
      }`}
    />
  </div>
);

// ─── Styled select ────────────────────────────────────────────────────────────
const Select = ({ icon: Icon, options, placeholder, ...props }) => (
  <div className="relative group w-full">
    {Icon && (
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/30 group-focus-within:text-zinc-900 dark:group-focus-within:text-white transition-colors z-10 pointer-events-none">
        <Icon size={16} />
      </div>
    )}
    <select
      {...props}
      className="w-full appearance-none bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-10 py-3 text-sm sm:text-base text-gray-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white focus:ring-1 focus:ring-zinc-900/10 dark:focus:ring-white/10 transition-all cursor-pointer font-['Quicksand']"
    >
      <option value="">{placeholder}</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
      <ChevronLeft size={16} className="-rotate-90" />
    </div>
  </div>
);

// ─── Card wrapper ─────────────────────────────────────────────────────────────
const Card = ({ children, className = "" }) => (
  <div className={`bg-white dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/[0.07] rounded-2xl relative overflow-hidden ${className}`}>
    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-300/60 dark:via-white/10 to-transparent" />
    {children}
  </div>
);

// ─── Section header ───────────────────────────────────────────────────────────
const SectionHeader = ({ icon: Icon, title, desc }) => (
  <div className="flex items-start gap-4 mb-6">
    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/5">
      <Icon size={18} className="text-zinc-900 dark:text-white" />
    </div>
    <div>
      <h3 className="text-base font-bold text-gray-900 dark:text-white font-['Quicksand']">{title}</h3>
      <p className="text-xs sm:text-sm text-gray-500 dark:text-white/40 mt-0.5 font-['Quicksand'] leading-snug">{desc}</p>
    </div>
  </div>
);

// ─── Avatar uploader ──────────────────────────────────────────────────────────
const AvatarUploader = ({ preview, onFileChange }) => {
  const ref = useRef();
  return (
    <div className="flex flex-col items-center gap-3 flex-shrink-0 w-full sm:w-auto">
      <div className="relative group cursor-pointer" onClick={() => ref.current?.click()}>
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-2 border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 shadow-sm">
          {preview
            ? <img src={preview} alt="avatar" className="w-full h-full object-cover" />
            : <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-white/20"><User size={40} strokeWidth={1.5} /></div>
          }
        </div>
        <div className="absolute inset-0 rounded-3xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Camera size={24} className="text-white" />
        </div>
        <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-zinc-900 dark:bg-white border-[3px] border-white dark:border-[#0a0a0a] flex items-center justify-center shadow-md">
          <Camera size={14} className="text-white dark:text-zinc-900" />
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-white/40 font-['Quicksand'] font-medium">Change Photo</p>
      <input ref={ref} type="file" name="avatar" accept="image/*" className="hidden" onChange={onFileChange} />
    </div>
  );
};

// ─── Social row ───────────────────────────────────────────────────────────────
const SocialRow = ({ icon: Icon, name, placeholder, value, onChange }) => (
  <div className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] group focus-within:border-zinc-900 dark:focus-within:border-white/50 transition-all w-full">
    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-white">
      <Icon size={16} />
    </div>
    <input
      type="text" name={name} value={value} onChange={onChange}
      placeholder={placeholder}
      className="flex-1 min-w-0 bg-transparent text-sm sm:text-base text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/25 focus:outline-none font-['Quicksand']"
    />
  </div>
);

// ─── Char counter textarea ─────────────────────────────────────────────────────
const BioTextarea = ({ value, onChange }) => {
  const max = 200;
  // Fallback to empty string if value is undefined to prevent length errors
  const safeValue = value || ""; 
  const pct = Math.min((safeValue.length / max) * 100, 100);
  const over = safeValue.length > max;
  return (
    <div className="relative w-full">
      <textarea
        name="bio" value={safeValue} onChange={onChange} rows={4}
        maxLength={max + 20}
        placeholder="Tell the world about your artistic journey…"
        className="w-full bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm sm:text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/20 focus:outline-none focus:border-zinc-900 dark:focus:border-white focus:ring-1 focus:ring-zinc-900/10 dark:focus:ring-white/10 transition-all resize-none font-['Quicksand'] leading-relaxed"
      />
      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        <div className="w-16 h-1.5 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${over ? "bg-red-500" : pct > 80 ? "bg-amber-500" : "bg-zinc-900 dark:bg-white"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className={`text-xs font-bold font-['Quicksand'] ${over ? "text-red-500" : "text-gray-400 dark:text-white/30"}`}>
          {max - safeValue.length}
        </span>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
const STEPS = ["Identity", "Interests", "Web Presence"];
const artStyles   = ["Abstract","Realism","Impressionism","Surrealism","Minimalism","Pop Art","Digital","Cyberpunk","Traditional","Watercolor","Oil Paint"];
const professions = ["Professional Artist","Hobbyist","Student","Instructor","Illustrator","Designer","Curator","Concept Artist"];
const interestCategories = {
  Painting: ["Oil","Acrylic","Watercolor","Gouache","Ink","Encaustic","Fresco"],
  Drawing:  ["Charcoal","Graphite","Pastel","Colored Pencil","Digital Sketch"],
  Digital:  ["3D Modeling","Vector","Pixel Art","VFX","Generative","NFT","Motion"],
  Photo:    ["Portrait","Landscape","Street","Analog","Macro","Editorial","Aerial"],
  Design:   ["Graphic","UI/UX","Product","Fashion","Interior","Typography"],
  Craft:    ["Ceramics","Textiles","Woodworking","Sculpture","Printmaking","Jewelry"],
};

export default function EditProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [step, setStep] = useState(0);            
  const [activeTab, setActiveTab] = useState("Painting");
  const [search, setSearch] = useState("");
  
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [selectedInterests, setSelectedInterests] = useState([]);

  // REMOVED 'user' state. Now all inputs read directly from 'profile'
  const [profile, setProfile] = useState({
    nickname: "", bio: "", location: "", website: "",
    artStyle: "", profession: "", twitter: "", instagram: "", linkedin: "", youtube: "", portfolio: "",
  });

  // ── Load profile ──────────────────────────────────────────────────────────
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const data = await getProfileInfo();
        const userData = data.user || data;

        setProfile({
          nickname: userData.nickname || "",
          bio: userData.bio || "",
          location: userData.location || "",
          website: userData.website || "",
          portfolio: userData.portfolio || "",
          artStyle: userData.artStyle || "",
          profession: userData.profession || "",
          twitter: userData.twitter || "",
          instagram: userData.instagram || "",
          linkedin: userData.linkedin || "",
          youtube: userData.youtube || "", // YouTube is successfully mapped here
        });

        // Set the avatar preview if they already have one in the database
        if (userData.avatar) {
          setAvatarPreview(userData.avatar);
        }

        // Set selected interests
        if (userData.interests && Array.isArray(userData.interests)) {
          setSelectedInterests(userData.interests);
        }

      } catch (error) {
        console.error(error);
        toast.error("Failed to load profile. Are you logged in?");
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, []);

  const handleChange = (e) => setProfile(p => ({ ...p, [e.target.name]: e.target.value }));
  
  const handleNickname = (e) => {
    let v = e.target.value.replace(/\s/g, "");
    if (v && !v.startsWith("@")) v = `@${v}`;
    if (v === "@") v = "";
    setProfile(p => ({ ...p, nickname: v }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }
    
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    toast.success("Photo selected. Save changes to apply.");
  };
  
  const toggleInterest = (tag) => {
    setSelectedInterests(p => {
      return p.includes(tag) ? p.filter(t => t !== tag) : [...p, tag];
    });
  };

  // ── Validate fields ─────────────────────────────────────────────────────────
  const validateFields = () => {
    if (step === 0) {
      if (!profile.nickname.trim()) {
        toast.error("Please enter a nickname");
        return false;
      }
      if (profile.nickname.length < 3) {
        toast.error("Nickname must be at least 3 characters");
        return false;
      }
    }
    if (step === 1) {
      if (selectedInterests.length === 0) {
        toast.warning("Select at least one interest to continue", {
          description: "You can skip this, but interests help personalize your experience"
        });
      }
    }
    if (step === 2) {
      const urlFields = ['website', 'portfolio', 'twitter', 'instagram', 'linkedin', 'youtube'];
      for (const field of urlFields) {
        if (profile[field] && !profile[field].startsWith('http')) {
          toast.error(`Please enter a valid URL for ${field}`);
          return false;
        }
      }
    }
    return true;
  };

  const handleNext = (nextStep) => {
    if (validateFields()) {
      setStep(nextStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ── Save Profile (Wired to Backend API) ──────────────────────────────────
  const handleSave = async () => {
    if (!profile.nickname?.trim()) {
      toast.error("Nickname is required");
      setStep(0);
      return;
    }
    
    setSaving(true);
    const saveToastId = toast.loading("Saving your profile...");
    
    try {
      // Create FormData to handle text AND images
      const formData = new FormData();
      
      // Append all standard fields
      Object.keys(profile).forEach(key => {
        if (profile[key]) {
          formData.append(key, profile[key]);
        }
      });
      
      // Append interests array as a stringified JSON
      formData.append('interests', JSON.stringify(selectedInterests));
      
      // Append the avatar image file if they uploaded a new one
      if (avatarFile) {
        formData.append('profileImage', avatarFile); // Ensure this matches your backend multer key! (Usually 'avatar' or 'profileImage')
      }
      
      // Call the service (we removed Content-Type in the service so FormData works correctly)
      await updateProfile(formData);
      
      toast.dismiss(saveToastId);
      toast.success("Profile updated successfully!", {
        duration: 4000,
        icon: <Check size={16} />,
      });
      
      // Navigate back to the profile page after saving
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
      
    } catch (err) {
      console.error("Save error:", err);
      toast.dismiss(saveToastId);
      toast.error("Failed to save profile", {
        description: "Please try again or check your connection.",
        duration: 5000,
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex flex-col items-center justify-center gap-4">
        <Toaster position="top-center" richColors theme="system" />
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-[3px] border-zinc-200 dark:border-white/10" />
          <div className="absolute inset-0 rounded-full border-[3px] border-zinc-900 dark:border-white border-t-transparent animate-spin" />
        </div>
      </div>
    );
  }

  const filteredTags = (interestCategories[activeTab] || []).filter(t => t.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <Toaster position="top-center" richColors theme="system" />

      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] font-['Quicksand'] text-gray-900 dark:text-white transition-colors duration-300 relative overflow-x-hidden">
        
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[400px] pointer-events-none opacity-40 dark:opacity-20"
          style={{ background: "radial-gradient(ellipse, rgba(150,150,150,0.15) 0%, transparent 70%)" }} />

        {/* HEADER */}
        <header className="sticky top-0 z-40 w-full border-b border-gray-200/80 dark:border-white/[0.07] bg-white/75 dark:bg-[#0a0a0a]/80 backdrop-blur-xl">
          <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Link to="/profile" className="flex-shrink-0 p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-white/70">
                <ChevronLeft size={22} />
              </Link>
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-900 dark:bg-white border border-gray-200 dark:border-white/10 shadow-sm">
                  <img src={Logo} alt="logo" className="w-full h-full object-cover" />
                </div>
                <h1 className="text-base sm:text-lg font-bold truncate">Edit Profile</h1>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={saving}
              className={`flex-shrink-0 flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl text-sm font-bold transition-all ${
                saving
                  ? "bg-zinc-900/60 dark:bg-white/60 text-white dark:text-zinc-900 cursor-not-allowed"
                  : "bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-gray-200 shadow-sm"
              }`}
            >
              {saving ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <UserCheck size={16} />}
              <span className="hidden sm:inline">{saving ? "Saving…" : "Save Changes"}</span>
            </motion.button>
          </div>
        </header>

        {/* BODY */}
        <div className="max-w-3xl mx-auto px-4 py-6 pb-20 relative z-10">

          {/* Nav Tabs */}
          <div className="flex gap-1 p-1 bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.07] rounded-2xl mb-8 shadow-sm overflow-x-auto no-scrollbar snap-x">
            {STEPS.map((s, i) => (
              <button
                key={s} 
                onClick={() => { if (i < step || validateFields()) setStep(i); }}
                className={`flex-1 min-w-[100px] whitespace-nowrap snap-center py-3 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 ${
                  step === i ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md" : "text-gray-500 dark:text-white/40 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white/90"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            
            {/* STEP 0: Identity */}
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }} className="space-y-6">
                <Card className="p-5 sm:p-8">
                  <SectionHeader icon={User} title="Public Identity" desc="How you appear to other artists" />
                  <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
                    <AvatarUploader preview={avatarPreview} onFileChange={handleAvatarChange} />
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label="Nickname">
                        <Input icon={AtSign} name="nickname" value={profile.nickname} onChange={handleNickname} placeholder="@yourname" />
                      </Field>
                      <Field label="Profession">
                        <Select icon={Briefcase} name="profession" value={profile.profession} onChange={handleChange} placeholder="Select role" options={professions} />
                      </Field>
                      <Field label="Location">
                        <Input icon={MapPin} name="location" value={profile.location} onChange={handleChange} placeholder="City, Country" />
                      </Field>
                      <Field label="Primary Style">
                        <Select icon={Palette} name="artStyle" value={profile.artStyle} onChange={handleChange} placeholder="Select style" options={artStyles} />
                      </Field>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 sm:p-8">
                  <SectionHeader icon={Sparkles} title="Artist Bio" desc="Your story in 200 characters" />
                  <BioTextarea value={profile.bio} onChange={handleChange} />
                </Card>

                <div className="flex justify-end pt-2">
                  <button onClick={() => handleNext(1)} className="w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-gray-200 text-sm font-bold rounded-xl transition-colors shadow-sm">
                    Next: Interests <ChevronLeft size={16} className="rotate-180" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 1: Interests */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }} className="space-y-6">
                <Card className="p-5 sm:p-8">
                  <SectionHeader icon={LayoutGrid} title="Art Interests" desc="Select topics to personalize your feed" />

                  <div className="flex overflow-x-auto no-scrollbar gap-2 pb-4 mb-4 border-b border-gray-100 dark:border-white/[0.06] snap-x">
                    {Object.keys(interestCategories).map((cat) => (
                      <button
                        key={cat} onClick={() => { setActiveTab(cat); setSearch(""); }}
                        className={`snap-start whitespace-nowrap px-4 py-2 rounded-xl text-[13px] font-bold transition-all ${
                          activeTab === cat ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md" : "bg-gray-100 dark:bg-white/[0.06] text-gray-600 dark:text-white/50 hover:bg-gray-200 dark:hover:bg-white/10"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="relative mb-6">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/30" />
                    <input
                      type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={`Search in ${activeTab}…`}
                      className="w-full bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-10 py-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/25 focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all"
                    />
                    {search && (
                      <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white/60 p-1"><X size={16} /></button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    <AnimatePresence>
                      {filteredTags.map((tag) => {
                        const on = selectedInterests.includes(tag);
                        return (
                          <motion.button
                            key={tag} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.15 }} onClick={() => toggleInterest(tag)} type="button"
                            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-[13px] font-bold transition-all ${
                              on ? "bg-zinc-900 border-zinc-900 text-white dark:bg-white dark:border-white dark:text-zinc-900 shadow-sm" : "bg-gray-50 dark:bg-white/[0.04] border-gray-200 dark:border-white/[0.07] text-gray-600 dark:text-white/60 hover:border-gray-300 dark:hover:border-white/15"
                            }`}
                          >
                            {on && <Check size={12} strokeWidth={3} />}
                            {tag}
                          </motion.button>
                        );
                      })}
                    </AnimatePresence>
                  </div>

                  {selectedInterests.length > 0 && (
                    <div className="mt-8 pt-5 border-t border-gray-100 dark:border-white/[0.06]">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-white/40">Selected ({selectedInterests.length})</span>
                        <button onClick={() => { setSelectedInterests([]); toast.success("All interests cleared"); }} className="text-xs text-zinc-900 dark:text-white hover:opacity-70 font-bold transition-colors">Clear all</button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedInterests.map((tag) => (
                          <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold rounded-lg">
                            {tag}
                            <button onClick={() => toggleInterest(tag)} type="button" className="opacity-60 hover:opacity-100"><X size={12} strokeWidth={3}/></button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>

                <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-2">
                  <button onClick={() => setStep(0)} className="w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-3.5 text-sm font-bold text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-white/5 sm:bg-transparent sm:dark:bg-transparent rounded-xl transition-colors">
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button onClick={() => handleNext(2)} className="w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-gray-200 text-sm font-bold rounded-xl transition-colors shadow-sm">
                    Next: Web Presence <ChevronLeft size={16} className="rotate-180" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Web Presence */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }} className="space-y-6">
                <Card className="p-5 sm:p-8">
                  <SectionHeader icon={Globe} title="Web Presence" desc="Where can people find your work?" />
                  <div className="space-y-5">
                    <Field label="Portfolio Website" hint="Your primary art portfolio or personal site">
                      <Input icon={Link2} name="portfolio" value={profile.portfolio} onChange={handleChange} placeholder="https://yourportfolio.com" />
                    </Field>
                    <Field label="Personal Website">
                      <Input icon={Globe} name="website" value={profile.website} onChange={handleChange} placeholder="https://yoursite.com" />
                    </Field>
                  </div>
                </Card>

                <Card className="p-5 sm:p-8">
                  <SectionHeader icon={Hash} title="Social Profiles" desc="Connect your social accounts" />
                  <div className="space-y-4">
                    <SocialRow icon={Twitter} name="twitter" value={profile.twitter} onChange={handleChange} placeholder="https://twitter.com/yourhandle" />
                    <SocialRow icon={Instagram} name="instagram" value={profile.instagram} onChange={handleChange} placeholder="https://instagram.com/yourprofile" />
                    <SocialRow icon={Linkedin} name="linkedin" value={profile.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/yourprofile" />
                    {/* YOUTUBE FIELD HAS BEEN ADDED HERE */}
                    <SocialRow icon={Youtube} name="youtube" value={profile.youtube} onChange={handleChange} placeholder="https://youtube.com/@yourchannel" />
                  </div>
                </Card>

                <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-2">
                  <button onClick={() => setStep(1)} className="w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-3.5 text-sm font-bold text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-white/5 sm:bg-transparent sm:dark:bg-transparent rounded-xl transition-colors">
                    <ChevronLeft size={16} /> Back
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    disabled={saving}
                    className={`w-full sm:w-auto flex justify-center items-center gap-2 px-8 py-3.5 text-sm font-bold rounded-xl transition-all shadow-sm ${
                      saving ? "bg-zinc-900/60 dark:bg-white/60 text-white dark:text-zinc-900 cursor-not-allowed" : "bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-gray-200"
                    }`}
                  >
                    {saving ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <UserCheck size={18} />}
                    {saving ? "Saving…" : "Save Profile"}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}