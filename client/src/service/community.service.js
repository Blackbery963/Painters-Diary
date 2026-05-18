import { accessTokenStore } from "../utils/tokenStore.utils";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createCommunity = async (communityData) => {
    const token = accessTokenStore.get();

    if (!token) {
        throw new Error("Unauthorized. Please login first.");
    }

    try {
        const formData = new FormData();

        if (communityData.name) formData.append("name", communityData.name);
        if (communityData.description) formData.append("description", communityData.description);
        if (communityData.privacy) formData.append("privacy", communityData.privacy);

        if (communityData.tags) {
            formData.append("tags", JSON.stringify(communityData.tags)); 
        }

        if (communityData.rules) {
            formData.append("rules", JSON.stringify(communityData.rules));
        }

        // ✅ FIX: Handle logo as single File (not array)
        if (communityData.logo) {
            formData.append("logo", communityData.logo);
        }
        
        // ✅ FIX: Handle cover as single File (not array)
        if (communityData.coverImage) {
            formData.append("coverImage", communityData.coverImage);
        }

        const res = await fetch(`${BASE_URL}/api/community/create-community`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        });

        const data = await res.json();
        
        if (!res.ok) {
            throw new Error(data.message || "Failed to create Community");
        }
        
        return data;

    } catch (error) {
        console.error("Community Creation Error:", error);
        throw error; 
    }
};