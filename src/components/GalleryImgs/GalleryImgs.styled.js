// GalleryImgs.styled.js
import styled from 'styled-components';

export const GalleryWrapper = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const MainImageContainer = styled.div`
  width: 45%;
  position: relative;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: 44.1vh;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    order: -1;
  }
`;

export const MainImage = styled.img`
  width: 100%;
  display: block;
  object-fit: cover;
  transition: transform 0.5s ease-in-out;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  width: 45%;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const GridItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  padding-bottom: 66.67%; /* Relación de aspecto 3:2 */

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0);
    z-index: 1;
  }
`;

export const GridImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const MoreButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #795af6;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  @media (min-width: 769px) {
    position: absolute;
    bottom: -60px;
    right: 0;
  }

  @media (max-width: 768px) {
    position: static;
    margin: 20px auto 0;
  }
`;
