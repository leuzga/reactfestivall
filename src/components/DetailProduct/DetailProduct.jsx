import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { FaCircle } from 'react-icons/fa';
import { Spinner } from '@fluentui/react-components';
import { obtenerProductoPorId } from '../../data/juegos';
import styles from './DetailProduct.module.css';
import Scheduler from '../Calendar/Scheduler';

const DetailProduct = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const data = await obtenerProductoPorId(parseInt(id));
        setProducto(data);
        setSelectedImage(data.img_urls[0]); // Imagen principal inicial
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner appearance='primary' label='Cargando detalle...' />
      </div>
    );
  }

  if (!producto) {
    return <div>No se encontró el producto.</div>;
  }

  return (
    <div className={styles.detailProduct}>
      <div className={styles.productHeader}>
        <h1 className={styles.productTitle}>{producto.nombre}</h1>
        <Link to='/' className={styles.goBack}>
          <IoIosArrowBack color='white' size={40} />
        </Link>
      </div>
      <div className={styles.contentDos}>

      <div className={styles.productContent}>
        <div className={styles.imagesBlock}>
          <img 
            src={selectedImage} 
            alt={producto.nombre} 
            className={styles.mainImage} 
          />
          <div className={styles.thumbnailContainer}>
            {producto.img_urls.map((url, index) => (
              <img 
                key={index} 
                src={url} 
                alt={`${producto.nombre} thumbnail ${index}`} 
                className={`${styles.thumbnail} ${selectedImage === url ? styles.activeThumbnail : ''}`} 
                onClick={() => setSelectedImage(url)}
              />
            ))}
          </div>
        </div>
        <div className={styles.schedulerBlock}>
        <Scheduler selectedGameId={producto.id} selectedGameName={producto.nombre} selectedCantidad={producto.cantidad} />
        </div>
      </div>
      </div>
      <div className={styles.contentDescription}>

      <div className={styles.productDescription}>
       
          <p className={styles.description}>{producto.descripcion}</p>
        
        </div>
      </div>
          <div className={styles.contentCaract}>
          <div className={styles.productCharacteristics}>
            {producto.caracteristicas.map((caracteristica, index) => (
              <div key={index} className={styles.characteristic}>
                <div className={styles.characteristicItem}>
                  <FaCircle color='#f5e9fc' size={10} />
                  <p>{caracteristica}</p>
                </div>
              </div>
            ))}
          </div> 

          </div>
    </div>
  );
};

export default DetailProduct;
