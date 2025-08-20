// useGallery.js
import { create } from 'zustand';
import listImages from '../../data/listimages.js';

const fetchImages = async () => {
  const images = await listImages();
  return images;
};

function getNextImages(images, currentIndex) {
  let nextIndex = currentIndex + 5;

  // Si se han cargado todas las imágenes, vuelve al inicio
  if (nextIndex >= images.length) {
    nextIndex = 0;
  }

  return images.slice(nextIndex, nextIndex + 5);
}

const loadNextImages = (
  images,
  currentIndex,
  setLoadedImages,
  setCurrentIndex
) => {
  if (images && images.length > 0) {
    const nextImages = getNextImages(images, currentIndex);
    setLoadedImages(nextImages);
    setCurrentIndex((currentIndex + 5) % images.length);
  }
};

const useGalleryStore = create((set) => ({
  loadedImages: [],
  images: listImages(),
  currentIndex: 0,
  setLoadedImages: (images) => set({ loadedImages: images }),
  setCurrentIndex: (index) => set({ currentIndex: index }),
}));

export { useGalleryStore, getNextImages, fetchImages, loadNextImages };
