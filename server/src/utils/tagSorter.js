// /utils/tagSorter.js

// 1. Define your dictionaries of known tags
const KNOWN_CATEGORIES = new Set([
    'artwork', 'photography', 'video', 'sketch', 
    'travel', 'vlog', 'social', 'knowledge', 'experience'
]);

const KNOWN_STYLES_AND_MEDIUMS = new Set([
    'portrait', 'landscape', 'abstract', 'realism', 'minimalism',
    'oil painting', 'digital art', 'watercolor', 'charcoal', 'acrylic'
]);

// 2. Export the sorting function
export const sortTags = (incomingTags = []) => {
    const sorted = {
        categoryTags: [],
        styleTags: [],
        generalTags: []
    };

    incomingTags.forEach(tag => {
        // Double-check the tag is clean, just in case
        const cleanTag = tag.toLowerCase().trim();

        if (KNOWN_CATEGORIES.has(cleanTag)) {
            sorted.categoryTags.push(cleanTag);
        } 
        else if (KNOWN_STYLES_AND_MEDIUMS.has(cleanTag)) {
            sorted.styleTags.push(cleanTag);
        } 
        else {
            // If the backend doesn't recognize it, it's a general user tag
            sorted.generalTags.push(cleanTag); 
        }
    });

    return sorted;
};