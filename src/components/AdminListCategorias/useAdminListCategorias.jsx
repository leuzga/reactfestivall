import { useQuery } from "react-query";
import { LeerCategorias } from "../../data/dataService";

const useAdminListCategorias = () => {
  return useQuery(["data"], LeerCategorias);
};

export default useAdminListCategorias;
