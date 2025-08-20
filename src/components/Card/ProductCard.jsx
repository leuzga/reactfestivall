import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { HiOutlineShare, HiHeart, HiOutlineHeart } from "react-icons/hi";

import {
  Popover,
  PopoverTrigger,
  PopoverSurface,
} from "@fluentui/react-components";
import { useAuth } from "../AuthContext/AuthContext";
import ShareSocial from "../ShareSocial/ShareSocial";
import { Rating as FluentRating } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import useRatingStore from "../Rating/useRatingStore";
import { Button } from "@fluentui/react-components";

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  width: 390px;
  height: 270px;
  background: #ffffff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  overflow: hidden;
  border: 8px solid white;
  position: relative;

  @media (max-width: 414px) { /* Ajuste para iPhone XR */
    width: 360px;
    height: 240px;
  }

  @media (max-width: 768px) {
    width: 500px;
    height: 220px;
  }
`;

const ImageWrapper = styled.div`
  flex-shrink: 0;
  width: 240px;
  height: 100%;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 0.3s ease;
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #f5e9fc; /* Color deseado */
    mix-blend-mode: multiply; /* Mezcla el color con la imagen */
    opacity: 0.7; /* Ajusta la opacidad según sea necesario */
    transition: opacity 0.3s ease;
  }

  &:hover:before {
    opacity: 0; /* Elimina el filtro al pasar el cursor */
  }

  @media (max-width: 414px) {
    width: 180px;
    height: 180px; /* Ajuste para el tamaño del iPhone XR */
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 200px; /* Ajusta la altura si es necesario */
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 16px;
  gap: 9px;
  flex: 1;
  line-height: 1.2;
  text-align: center;
`;

const Title = styled.h3`
  margin: 0;
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  color: #333;
`;

const DetailLink = styled(Link)`
  margin-top: 16px;
  font-size: 14px;
  color: #795af6;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  transition: color 0.3s ease;

  &:hover {
    color: #5a3ec8;
  }
`;

const ShareIconWrapper = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  color: #795af6;
  cursor: pointer;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #795af6;
  z-index: 1;

  &:hover {
    color: #ff00ff;
    border: 2px solid #ff00ff;
  }
`;

const FavoriteIconWrapper = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  cursor: pointer;
  color: #ff00ff;
  z-index: 1;
  font-size: 28px;
  svg {
    stroke-width: 1px;
  }
`;

const RatingWrapper = styled.div`
  margin-top: auto;
  align-self: center;
  user-select: none;
  pointer-events: none;
  font-size: 14px;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 16px;
  left: 83%;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  justify-content: center;

  @media (max-width: 414px) {
    bottom: 10px; /* Ajuste para iPhone XR */
    left: 75%;
    transform: translateX(-50%);
    width: auto;
  }


  @media (max-width: 768px) {
    bottom: 12px; /* Ajusta la distancia desde el borde inferior */
    left: 80%;
    transform: translateX(-50%);
    width: auto; /* Ajusta el ancho del botón */
  }
`;

const ProductCard = ({ product }) => {
  const { isAuthenticated, favorites, addFavorite, removeFavorite } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(favorites.includes(product.id));
  }, [product.id, favorites]);

  const toggleFavorite = () => {
    if (!isAuthenticated) {
      // Redireccionar al inicio de sesión...
      return;
    }

    if (isFavorite) {
      removeFavorite(product.id);
    } else {
      addFavorite(product.id);
    }
    setIsFavorite(!isFavorite);
  };

  if (!product) {
    return <div>No hay información del producto</div>;
  }

  const { id, nombre, img_urls, promedioValoracion } = product; //img_urls para mas imagenes 

  const navigate = useNavigate();
  const setJuegoId = useRatingStore((state) => state.setJuegoId);
  const handleDetalle = () => {
    setJuegoId(id);
    navigate(`/detalle/${id}`);
  };

  const averageRating = promedioValoracion;
// accedo a la posicion 0 img_urls[0]
  return (
    <>
      <CardContainer>
        <ImageWrapper>
          <img src={img_urls[0]} alt={nombre} />
          
        </ImageWrapper>
        <TextContainer>
          <Title>{nombre}</Title>
          <RatingWrapper>
            <FluentRating size="medium" value={averageRating} readOnly />
          </RatingWrapper>
          <ButtonWrapper>
            <Button appearance="primary" onClick={handleDetalle}>
              Ver Detalle
            </Button>
          </ButtonWrapper>
        </TextContainer>
        <Popover withArrow>
          <PopoverTrigger disableButtonEnhancement>
            <ShareIconWrapper>
              <HiOutlineShare />
            </ShareIconWrapper>
          </PopoverTrigger>
          <PopoverSurface tabIndex={-1}>
            <ShareSocial imageUrl={img_urls[0]} />
            {/* accedo a la posicion 0 img_urls[0] */}
          </PopoverSurface>
        </Popover>
        <FavoriteIconWrapper onClick={toggleFavorite}>
          {isFavorite ? (
            <HiOutlineHeart style={{ fill: "#D81B60", stroke: "#5B5FC7" }} />
          ) : (
            <HiHeart style={{ fill: "none" }} />
          )}
        </FavoriteIconWrapper>
      </CardContainer>
    </>
  );
};

export default ProductCard;
