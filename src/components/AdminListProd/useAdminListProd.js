import { useQuery } from "react-query";
import { obtenerProductos } from "../../data/juegos";

const useAdminListProd = () => {
  return useQuery(["data"], obtenerProductos);
};

export default useAdminListProd;

