import { axiosInstance } from "./config";
import { errorAlert } from "./utility";
import { SET_IS_AUTH } from "./index";
const url = "/auth";

export const login = (credential) => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.post(`${url}/login`, credential);
      await localStorage.setItem("token", res.data.token);
      dispatch({
        type: SET_IS_AUTH,
      });
    } catch (error) {
      console.log(error.response);
      errorAlert(error.response.data.message);
    }
  };
};
