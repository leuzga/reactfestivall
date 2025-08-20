import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { obtenerProductos } from "../../data/juegos";
import { Skeleton, SkeletonItem, makeStyles, Button } from "@fluentui/react-components";
import { Card, CardHeader, CardFooter, CardPreview, Popover, PopoverTrigger, PopoverSurface } from "@fluentui/react-components";
import { HiOutlineShare } from 'react-icons/hi';
import styled from 'styled-components';
import ShareSocial from '../ShareSocial/ShareSocial'; // Asegúrate de que la ruta sea correcta

const useStyles = makeStyles({
  featuredProducts: {
    padding: "3rem",
  },
  title1: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    justifyContent: "center",
    fontWeight: 200,
    fontSize: "35px",
    color: "#ca63d1",
    marginBottom: "90px",
    marginTop: "20px",
  },
  icon: {
    marginLeft: "8px",
  },
  productGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    marginTop: "16px",
    flexWrap: "wrap", // Permitir que las tarjetas se envuelvan
  },
  productCard: {
    width: "300px",
    flex: "1 1 300px", // Permitir que las tarjetas se reduzcan si es necesario
  },
  cardContainer: {
    display: "flex",
    gap: "16px",
    marginBottom: "90px",
    flexWrap: "wrap",
    justifyContent: "center",
    '@media (max-width: 768px)': {
      flexDirection: "column",
      gap: "15px",
    },
  },
  btnExplorar: {
    marginTop: "90px",
    display: "block",
    margin: "0 auto",
    height: "50px",
    width: "200px",
    fontSize: "16px",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    '@media (max-width: 768px)': {
      width: "50%",
    },
  },
  skeletonCard: {
    width: "300px",
    height: "300px",
    borderRadius: "4px",
    backgroundColor: "#f5e9fc",
    flex: "1 1 300px", // Permitir que las tarjetas se reduzcan si es necesario
  },
  cardHeader: {
    textAlign: "left", // Alinear texto a la izquierda
  },
  cardFooter: {
    display: "flex",
    justifyContent: "flex-start",
  },
  cardButton: {
    textDecoration: "none",
    color: "inherit",
  },
});

const ShareIconWrapper = styled.div`
  position: absolute;
  bottom: 25px;
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

const CardFeatured = ({ product }) => {
  const styles = useStyles();

  return (
    <Card className={styles.productCard}>
      <CardPreview>
      {/* accedo a la posicion 0 img_urls[0] */}
        <img src={product.img_urls[0]} alt={product.nombre} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      </CardPreview>
      <CardHeader
        header={<p style={{ fontSize: "17px", textAlign: 'left' }}>{product.nombre}</p>}
        className={styles.cardHeader}
      />
      <CardFooter className={styles.cardFooter}>
        <Button appearance="primary">
          <Link to={`/detalle/${product.id}`} className={styles.cardButton}>Ver Detalle</Link>
        </Button>
      </CardFooter>
      <Popover withArrow>
        <PopoverTrigger disableButtonEnhancement>
          <ShareIconWrapper>
            <HiOutlineShare />
          </ShareIconWrapper>
        </PopoverTrigger>
        <PopoverSurface tabIndex={-1}>
          <ShareSocial imageUrl={product.img_urls[0]} />
          {/* accedo a la posicion 0 img_url} */}
        </PopoverSurface>
      </Popover>
    </Card>
  );
};

const FeaturedProducts = () => {
  const [randomProducts, setRandomProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const styles = useStyles();

  const loadRandomProducts = async () => {
    try {
      setIsLoading(true);
      const exampleProducts = await obtenerProductos();
      const shuffledProducts = exampleProducts.sort(() => 0.5 - Math.random());
      setRandomProducts(shuffledProducts.slice(0, 3));
    } catch (error) {
      console.error("Error al cargar productos aleatorios:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRandomProducts();
  }, []);

  const handleLoadMoreClick = () => {
    loadRandomProducts();
  };

  return (
    <div className={styles.featuredProducts}>
      <h2 className={styles.title1}>
        Productos destacados
        <FaStar className={styles.icon} />
      </h2>
      {isLoading ? (
        <div className={styles.productGrid}>
          <div className={styles.cardContainer}>
            <Skeleton animation="wave">
              <SkeletonItem className={styles.skeletonCard} />
            </Skeleton>
            <Skeleton animation="wave">
              <SkeletonItem className={styles.skeletonCard} />
            </Skeleton>
            <Skeleton animation="wave">
              <SkeletonItem className={styles.skeletonCard} />
            </Skeleton>
          </div>
        </div>
      ) : (
        <div className={styles.productGrid}>
          <div className={styles.cardContainer}>
            {randomProducts.map((product, index) => (
              <CardFeatured key={index} product={product} />
            ))}
          </div>
        </div>
      )}
      <Button appearance="primary" className={styles.btnExplorar} onClick={handleLoadMoreClick}>
        Explorar más
      </Button>
    </div>
  );
};

export default FeaturedProducts;









