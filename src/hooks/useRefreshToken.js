import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log("previous state: ", JSON.stringify(prev));
      console.log("Access Token: ", response?.data?.accessToken);
      return {
        ...prev,
        accessToken: response?.data?.accessToken,
        roles: response?.data?.roles,
      };
    });
    return response?.data?.accessToken;
    //always check spelling for accessToken
  };
  return refresh;
};

export default useRefreshToken;
