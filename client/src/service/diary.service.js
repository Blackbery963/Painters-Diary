import { accessTokenStore } from '../utils/tokenStore.utils'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const createDiary = async (diaryData) => {
    const token = accessTokenStore.get()

    if(!token){
        throw new Error("No token found. Please login first.")
    }

    try {
        const formData = new FormData();

        // 1. Append standard text fields safely
        if (diaryData.diaryType) formData.append("diaryType", diaryData.diaryType);
        if (diaryData.title) formData.append("title", diaryData.title);
        if (diaryData.description) formData.append("description", diaryData.description);
        if (diaryData.author) formData.append("author", diaryData.author);
        if (diaryData.vibe) formData.append("vibe", diaryData.vibe);
        if (diaryData.location) formData.append("location", diaryData.location);
        if (diaryData.weather) formData.append("weather", diaryData.weather);
        if (diaryData.travelDate) formData.append("travelDate", diaryData.travelDate);
        if (diaryData.season) formData.append("season", diaryData.season);

        // 2. Append tags as stringified JSON
        if (diaryData.tags) {
            formData.append("tags", JSON.stringify(diaryData.tags));
        }

        // 3. FIX: Append files from diaryData (not formData!)
        if (diaryData.sketches && Array.isArray(diaryData.sketches)) {
            diaryData.sketches.forEach(file => { 
                formData.append("sketches", file);
            });
        }

        // 4. Send request
        const res = await fetch(`${BASE_URL}/api/diary/create-diary`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
                // Note: Do NOT set Content-Type here. The browser sets it automatically for FormData.
            },
            body: formData
        });

        const data = await res.json();

        if(!res.ok){
            throw new Error(data.message || "Failed to create diary");
        }

        return data;

    } catch (error) {
        // FIX: Throw the error to the React component instead of trying to send an Express response
        console.error("Diary Creation Service Error:", error);
        throw error;
    }
}


export const getUserDiaries = async () => {
    const token = accessTokenStore.get();

    if(!token){
        throw new Error ("No token provided. Please login first")
    }

    try {

        const res = await fetch (`${BASE_URL}/api/diary/get-diary`, {
        method: "GET",
        headers: {Authorization: `Bearer ${token}`}
    })

    const data = await res.json()

    if(!res.ok){
        throw new Error (error.message || "Failed to fetch diaries")
    }
    return data;

    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
}



export const diaryById = async () => {
    const token = accessTokenStore.get();

    if(!token){
        throw new Error ("No token provided. Please login first")
    }

    try {

        const res = await fetch (`${BASE_URL}/api/diary/${id}`, {
        method: "GET",
        headers: {Authorization: `Bearer ${token}`}
    })

    const data = await res.json()

    if(!res.ok){
        throw new Error (error.message || "Failed to fetch diaries")
    }
    return data;

    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
}