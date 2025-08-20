// GalleryImgs.jsx
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import {
  useGalleryStore,
  getNextImages,
  fetchImages,
  loadNextImages,
} from './useGallery';
import {
  GalleryWrapper,
  MainImageContainer,
  MainImage,
  GridContainer,
  GridItem,
  GridImage,
  MoreButton,
} from './GalleryImgs.styled';

const GalleryImgs = () => {
  const { loadedImages, setLoadedImages, currentIndex, setCurrentIndex } =
    useGalleryStore();

  const { data: images, isLoading } = useQuery('images', fetchImages);

  // Carga las primeras imágenes cuando se monta el componente
  useEffect(() => {
    if (images && images.length > 0) {
      const initialImages = getNextImages(images, currentIndex);
      setLoadedImages(initialImages);
    }
  }, [images, currentIndex]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <GalleryWrapper>
      <MainImageContainer>
        <MainImage src={loadedImages[0]?.url} alt={loadedImages[0]?.alt} />
      </MainImageContainer>
      <GridContainer>
        {loadedImages.slice(1).map((image) => (
          <GridItem key={image.id}>
            <GridImage src={image.url} alt={image.alt} />
          </GridItem>
        ))}
        <MoreButton
          onClick={() =>
            loadNextImages(
              images,
              currentIndex,
              setLoadedImages,
              setCurrentIndex
            )
          }
        >
          Ver más
        </MoreButton>
      </GridContainer>
    </GalleryWrapper>
  );
};

export default GalleryImgs;
