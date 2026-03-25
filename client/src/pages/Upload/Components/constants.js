/**
 * FILE: constants.js
 * PURPOSE: Stores all static configuration, magic numbers, and default states 
 * for the Upload module. This keeps our React components clean and makes 
 * it easy to update presets or limits in one central place.
 */

export const SUGGESTED_TAGS = ['artwork', 'portrait', 'oil painting', 'travel', 'sketch', 'digital art', 'photography', 'vlog'];
export const MAX_TAGS = 10; 

export const FILTER_PRESETS = {
  normal: { brightness: 100, contrast: 100, saturation: 100, sepia: 0, grayscale: 0 },
  cinematic: { brightness: 90, contrast: 115, saturation: 85, sepia: 10, grayscale: 0 },
  vintage: { brightness: 110, contrast: 90, saturation: 70, sepia: 40, grayscale: 0 },
  bw: { brightness: 100, contrast: 110, saturation: 0, sepia: 0, grayscale: 100 },
};

export const getFilterStyle = (f) => 
  `brightness(${f.brightness}%) contrast(${f.contrast}%) saturate(${f.saturation}%) sepia(${f.sepia}%) grayscale(${f.grayscale}%)`;