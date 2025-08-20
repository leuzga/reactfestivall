import { useMutation } from 'react-query';
import { verificarDisponibilidad } from '../../data/juegos';

const useVerificarDisponibilidad = () => {
  const mutation = useMutation(async (datosReserva) => {
    try {
      const response = await verificarDisponibilidad(datosReserva);
      return response;
    } catch (error) {
      console.error('Error verificando disponibilidad:', error);
      return { disponible: false };
    }
  });

  return {
    mutate: mutation.mutate,
    data: mutation.data,
    isSuccess: mutation.isSuccess,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};

export default useVerificarDisponibilidad;
