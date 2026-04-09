import axios from "axios";
import { accessTokenStore } from "./tokenStore.utils.js";

export async function initializeAuth() {
  // Check if we already have a valid token in memory
  if (accessTokenStore.get() && !accessTokenStore.isExpired()) {
    return accessTokenStore.get();
  }

  // If expired or missing, clear memory just in case before requesting a new one
  accessTokenStore.clear();

  try {
    // axios.post(URL, BODY, CONFIG)
    const res = await axios.post(
      'http://localhost:3000/api/auth/refresh-token', 
      {}, // Empty body because we just need the new token
      {
        withCredentials: true // CRUCIAL: This is the Axios way to send the httpOnly cookie!
      }
    );

    // Axios automatically parses JSON into res.data
    const newAccessToken = res.data.accessToken;
    
    // Save the brand new token to memory
    accessTokenStore.set(newAccessToken); 
    return newAccessToken;
    
  } catch (error) {
    // Axios automatically throws an error if the backend sends a 401 or 404
    console.error("Silent refresh failed:", error?.response?.data?.message || error.message);
    return null;
  }
}