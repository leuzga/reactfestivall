import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext/AuthContext";
import ProductCard from "../Card/ProductCard";
import styles from "./FavoritesList.module.css";
import { FaStar } from "react-icons/fa";
import { Spinner } from "@fluentui/react-components";
import { obtenerProductos } from "../../data/juegos";

const FavoritesList = () => {
  const { isAuthenticated, favorites } = useAuth();
  const [allProducts, setAllProducts] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch all products once and store them
    const fetchProducts = async () => {
      try {
        const data = await obtenerProductos(); 
        setAllProducts(data);
      } catch (error) {
        console.error("No se pueden obtener datos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      // Find full product details for each favorite
      const favoriteDetails = favorites
        .map((favId) => allProducts.find((product) => product.id === favId))
        .filter((product) => product !== undefined);

      setFavoriteProducts(favoriteDetails);
    }
  }, [isAuthenticated, allProducts, favorites]);

  if (!isAuthenticated) {
    return (
      <p className={styles.message}>
        Por favor, inicie sesión para ver sus favoritos
      </p>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner appearance="primary" label="Cargando Favoritos..." />
      </div>
    );
  }

  if (favorites.length === 0) {
    return <p className={styles.message}>No hay productos favoritos</p>;
  }

  return (
    <>
      <h2 className={styles.title1}>
        Favoritos
        <FaStar className={styles.icon} />
      </h2>
      <div className={styles.favsList}>
        {favoriteProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default FavoritesList;
