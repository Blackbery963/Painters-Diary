import { useEffect, useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Common
import Preloader from "./components/common/Preloader";
import OfflinePage from "./components/common/Offline";

// Pages
// import LandingPage from "./pages/Home/LandingPage";
import Home from "./pages/Home/Home"

// for authentication 
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import EmailVerification from "./pages/Auth/EmailVerification";
import ResetPassword from "./pages/Auth/ResetPassword";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Enable2FA from "./pages/Auth/2fa/Enable2FA";

// important pages
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/Profile/EditProfile";

//features related pages
import Dashboard from "./features/dashboard/pages/Dashboard";
import StudioManager from "./features/studio/pages/StudioManager";

import Upload from "./pages/Upload/Upload";
import Settings from "./pages/Settings/Settings";

// legal pages
import FAQs from "./pages/Legal/FAQs";
import Help from "./pages/Legal/Help";
import TermsAndConditions from "./pages/Legal/TermsAndConditions";
import CookiePolicy from "./pages/Legal/Cookies";
import SecurityPolicy from "./pages/Legal/ScurityPolicy";
import About from "./pages/Legal/About";

import ProtectedRoute from "./middleware/ProtectedRoute.middleware";

import SearchPage from "./pages/Search/Search";
import GalleryPage from "./pages/Gallery/Gallery";
import Saved from "./pages/Save/SavedFiles";
import { ImageOff } from "lucide-react";
import FeedbackPage from "./pages/Legal/Feedback";
import MiniChatBar from "./pages/Chat/MiniChatBar";
import ChatApp from "./pages/Chat/Chat";
import JournalPage from "./pages/Journal/Journal";
import CreateJournal from "./pages/Journal/CreateJournal";
import Artist from "./pages/Artist/Artist";
import CreateCommunityPage from "./pages/Community/CreateCommunity";

// ─── Connection quality check ─────────────────────────────────────────────────
// Pings a tiny resource and measures round-trip time.
// Returns: "online" | "slow" | "offline"
async function measureConnection() {
  try {
    const start = Date.now();

    // Cache-busted tiny fetch — won't hit your own server at all
    await fetch(`https://www.gstatic.com/generate_204?_=${Date.now()}`, {
      method: "HEAD",
      mode: "no-cors",
      cache: "no-store",
      signal: AbortSignal.timeout(5000), // give up after 5 s
    });

    const ms = Date.now() - start;
    if (ms > 2000) return "slow";   // reachable but painfully slow
    return "online";
  } catch {
    return "offline";
  }
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // "online" | "slow" | "offline"
  const [connStatus, setConnStatus] = useState("online");

  // ── Initial preloader (2 s) ──────────────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // ── Connection detection ─────────────────────────────────────────────────
  const checkConnection = useCallback(async () => {
    // navigator.onLine is unreliable (stays true on captive portals / airplane
    // mode on some OSes), so we always follow up with a real ping.
    if (!navigator.onLine) {
      setConnStatus("offline");
      return;
    }
    const quality = await measureConnection();
    setConnStatus(quality);
  }, []);

  useEffect(() => {
    // Run once on mount
    checkConnection();

    // Browser online/offline events
    const handleOnline  = () => checkConnection(); // re-ping, don't trust the event alone
    const handleOffline = () => setConnStatus("offline");

    window.addEventListener("online",  handleOnline);
    window.addEventListener("offline", handleOffline);

    // Poll every 30 s to catch slow / flaky connections between events
    const poll = setInterval(checkConnection, 30_000);

    return () => {
      window.removeEventListener("online",  handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearInterval(poll);
    };
  }, [checkConnection]);

  // ── Render gates ─────────────────────────────────────────────────────────

  // 1. Always show preloader first (before any network check matters)
  if (isLoading) return <Preloader />;

  // 2. Offline or airplane mode → full offline page
  if (connStatus === "offline") return <OfflinePage status="offline" onRetry={checkConnection} />;

  // 3. Slow connection → same offline page but with "slow" variant
  //    (OfflinePage should handle the `status` prop to show the right message)
  if (connStatus === "slow") return <OfflinePage status="slow" onRetry={checkConnection} />;

  // 4. Normal — render the app
  return (
    <Router>
      <Routes>
        <Route path="/"                          element={<Home />} />
        
        {/* Auth */}

        <Route path="/auth/signup"               element={<Signup />} />
        <Route path="/auth/login"                element={<Login />} />
        <Route path="/auth/email-verification"   element={<EmailVerification />} />
        <Route path="/auth/reset-password"       element={<ResetPassword />} />
        <Route path="/auth/forgot-password"      element={<ForgotPassword />} />
        <Route path="/auth/2fa/enable2fa"        element={<Enable2FA />} />


        < Route element = {<ProtectedRoute/>}>
        {/* App */}
        <Route path="/profile"                   element={<Profile />} />
        <Route path="/profile/edit"              element={<EditProfile />} />
       
        <Route path="/feature/dashboard"         element={<Dashboard/>}/>
        <Route path="/feature/studio-manager"    element={<StudioManager/>}/>



        <Route path="/settings"                  element={<Settings />} />
        <Route path="/upload"                    element={<Upload />} />

        {/* Legal */}
        <Route path="/about"                     element={<About />} />
        <Route path="/legal/faqs"                element={<FAQs />} />
        <Route path="/legal/help"                element={<Help />} />
        <Route path="/legal/terms"               element={<TermsAndConditions />} />
        <Route path="/legal/privacy"             element={<SecurityPolicy />} />
        <Route path="/legal/cookies"             element={<CookiePolicy />} />
        <Route path="/legal/feedback"            element={<FeedbackPage/>}/>

        {/* Chat and chat bar routes */}
        <Route path="/chat"                      element={<ChatApp/>}/>

        {/* Search Pages  */}
        <Route path="/search"                    element={<SearchPage/>}/>

        {/* Gallery Page */}
        <Route path="/gallery"                   element={<GalleryPage/>}/>

        {/* Saved page */}
        <Route path="/saved"                     element={<Saved />} />

        {/* Finding user according to your interest */}
        <Route path="/discover-artist"                    element={<Artist/>}/>

        {/* for the diaries or journals  */}
        <Route path="/journal"                   element={<JournalPage/>}/>
        <Route path="/journal/create"            element={<CreateJournal/>}/>



        {/* For community related routes  */}
        <Route path="/community/create"         element={<CreateCommunityPage/>}/>
        </Route>

      </Routes>
    </Router>
  );
}



