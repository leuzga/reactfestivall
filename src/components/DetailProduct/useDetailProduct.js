import { useQuery } from 'react-query';
import { obtenerProductoPorId } from '../../data/juegos';

const useDetailProduct = (id) => {
  return useQuery(['product', id], () => obtenerProductoPorId(id), {
    enabled: !!id, // Solo activa la consulta si `id` está disponible
  });
};

export default useDetailProduct;


