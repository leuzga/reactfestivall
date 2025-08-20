import { useQuery } from "react-query";
import { obtenerCaracteristicas } from "../../data/caracteristicas";

const useAdminListCaracteristicas = () => {
  return useQuery("caracteristicas", obtenerCaracteristicas);
};

export default useAdminListCaracteristicas;

