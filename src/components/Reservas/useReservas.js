import { useQuery } from 'react-query';
import { getUserById } from '../../data/user';

export const useReservas = (userId) => {
  return useQuery(['user', userId], () => getUserById(userId), {
    enabled: !!userId,
    onError: (error) => {
      console.error('Error en useReservas:', error);
    },
  });
};
