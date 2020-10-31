import { axiosInstance } from "./config";
const url = "/auth";

export const login = (credential) => {
  return async (dispatch, getState) => {
    const res = await axiosInstance.post(`${url}/login`, credential);
    localStorage.setItem("token", res.data.token);
    return res;
  };
};
