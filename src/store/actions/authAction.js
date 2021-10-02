import { axiosInstance } from "./config";
import { errorAlert } from "./utility";
import { SET_IS_AUTH } from "./index";
const url = "/users";

export const login = (credential) => {
	return async (dispatch) => {
		try {
			const res = await axiosInstance.post(`${url}/login`, credential);
			await localStorage.setItem("token", res.data.token);
			dispatch({
				type: SET_IS_AUTH,
			});
		} catch (error) {
			errorAlert(error?.response?.data?.message);
		}
	};
};
