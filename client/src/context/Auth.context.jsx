import { createContext, useContext, useEffect, useState } from "react";
import { initializeAuth } from "../utils/authInit.utils.js";
import { accessTokenStore } from "../utils/tokenStore.utils.js"; 

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true); // true until boot check done

  // ── Runs on every app load / tab focus / device unlock ──────────────
  useEffect(() => {
    bootAuth();

    // Re-runs when the tab becomes visible again (device unlock, switching tabs)
    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  async function handleVisibilityChange() {
    if (document.visibilityState === "visible") {
      await bootAuth();
    }
  }

  async function bootAuth() {
    // initializeAuth handles checking memory or fetching a new token silently
    const token = await initializeAuth();
    
    if (!token) {
      setUser(null);
      setAccessToken(null);
      setLoading(false);
      return;
    }

    setAccessToken(token);

    // Hydrate user from /me endpoint
    try {
      const res = await fetch("/api/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        // Token rejected by server — clear memory and state completely
        accessTokenStore.clear(); 
        setUser(null);
        setAccessToken(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  // ── Called after successful login ────────────────────────────────────
  function handleLoginSuccess(token, userData) {
    accessTokenStore.set(token);   // Update memory store
    setAccessToken(token);         // Update React state
    setUser(userData);
  }


  // ── Called on logout ─────────────────────────────────────────────────
  function handleLogout() {
    accessTokenStore.clear();      // Clear memory store
    setAccessToken(null);          // Clear React state
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, accessToken, loading, handleLoginSuccess, handleLogout }}
    >
      {/* Block the entire app until boot check completes */}
      {loading ? <FullScreenLoader /> : children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

// Minimal loader so the app doesn't flash the login page on refresh
function FullScreenLoader() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-[#1f7d53] animate-spin" />
    </div>
  );
}