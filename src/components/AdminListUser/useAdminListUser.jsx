import { useQuery } from "react-query";
import { getUsers } from "../../data/user";

const useAdminListUser = () => {
  return useQuery("usuarios", getUsers);
};

export default useAdminListUser;

