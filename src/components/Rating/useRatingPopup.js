
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getValoraciones, enviarValoracion } from "../../data/juegos";

const useRatingPopup = (juegoId) => {
  const queryClient = useQueryClient();

  const valoracionesQuery = useQuery(["product", juegoId], () => getValoraciones(juegoId));

  const mutation = useMutation(enviarValoracion, {
    onSuccess: () => {
      // Refetch valoraciones after a successful mutation
      queryClient.invalidateQueries(["product", juegoId]);
    },
  });

  return {
    ...valoracionesQuery,
    enviarValoracion: mutation.mutate,
  };

};

export default useRatingPopup;
