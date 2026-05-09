import { accessTokenStore } from "../utils/tokenStore.utils";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

//used to fetch the user information from database by validating access token 

export const getProfileInfo = async () => {
  const token = accessTokenStore.get();

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const res = await fetch(`${BASE_URL}/api/profile/get-profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Check if the response status is not 2xx
    if (!res.ok) {
      throw new Error(`Failed to fetch profile: ${res.statusText}`);
    }

    // Return the parsed JSON
    return await res.json();
    
  } catch (error) {
    // This will catch network errors OR the explicit errors thrown above
    console.error("Error in getProfileInfo service:", error);
    throw error; // Re-throw so your React component's catch block can handle it
  }
};


//updating the profile info in database through PUT method 

// FIX 1: Add 'formDataPayload' inside the parentheses
export const updateProfile = async (formDataPayload) => { 
  const token = accessTokenStore.get();

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const res = await fetch(`${BASE_URL}/api/profile/update-profile`, {
      method: "PUT",
      headers: { 
        Authorization: `Bearer ${token}` 
        // CRITICAL: Do NOT put 'Content-Type': 'multipart/form-data' here!
        // The browser must set the Content-Type automatically so it can attach the secret "boundary" code.
      },
      // FIX 2: Send the actual payload
      body: formDataPayload 
    });

    if (!res.ok) {
      throw new Error("Failed to update profile");
    }
    return res.json();

  } catch (error) {
    console.log("Failed to update profile", error);
    throw error;
  }
}

export const updateCover = async (formDataPayload) => {
  const token = accessTokenStore.get();

  if (!token){
    throw new Error(" No token found");
  }
  try {
    const res = await fetch (`${BASE_URL}/api/profile/update-cover`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formDataPayload
    })
    if(!res.ok){
      throw new Error (" Failed to update cover image")
    }
    return res.json()
    
  } catch (error) {
    console.log("Failed to update cover image", error);
    throw error;
  }
}
