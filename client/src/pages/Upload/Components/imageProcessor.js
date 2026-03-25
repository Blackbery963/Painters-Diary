/**
 * FILE: imageProcessor.js
 * PURPOSE: Handles the heavy lifting of HTML5 Canvas image manipulation.
 * It takes an image URL, applies crop coordinates, rotation, and CSS-like 
 * filters, and "bakes" them into a brand new base64 image string.
 */

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = url;
  });

export const getProcessedImg = async (imageSrc, pixelCrop, rotation = 0, filters = {}) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx || !pixelCrop) return null;

  const rads = (rotation * Math.PI) / 180;
  const safeWidth = Math.abs(image.width * Math.cos(rads)) + Math.abs(image.height * Math.sin(rads));
  const safeHeight = Math.abs(image.width * Math.sin(rads)) + Math.abs(image.height * Math.cos(rads));

  canvas.width = safeWidth;
  canvas.height = safeHeight;

  ctx.translate(safeWidth / 2, safeHeight / 2);
  ctx.rotate(rads);
  ctx.translate(-image.width / 2, -image.height / 2);

  const { brightness = 100, contrast = 100, saturation = 100, sepia = 0, grayscale = 0 } = filters;
  ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) sepia(${sepia}%) grayscale(${grayscale}%)`;

  ctx.drawImage(image, 0, 0);

  const data = ctx.getImageData(
    pixelCrop.x + (safeWidth - image.width) / 2,
    pixelCrop.y + (safeHeight - image.height) / 2,
    pixelCrop.width,
    pixelCrop.height
  );

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  ctx.putImageData(data, 0, 0);

  return canvas.toDataURL('image/jpeg', 0.95);
};