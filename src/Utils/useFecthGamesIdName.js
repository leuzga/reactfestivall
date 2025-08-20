import { useQuery } from 'react-query';
import { fetchSuggestions } from '../data/juegos';

const useFetchGamesIdName = () => {
  return useQuery('suggestions', fetchSuggestions, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};

export default useFetchGamesIdName;
