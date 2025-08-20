import { useState, useEffect } from 'react';
import { obtenerProductos } from '../../data/juegos';// Ajusta la ruta según la ubicación de tu archivo

const useSearchSuggestion = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const juegos = await obtenerProductos();
        const nombres = juegos.map(juego => juego.nombre);
        setSuggestions(nombres);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchSuggestions();
  }, []);
  

  return { suggestions, isLoading, error };
};

export default useSearchSuggestion;
