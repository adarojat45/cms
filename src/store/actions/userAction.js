import { axiosInstance } from "./config";
import { errorAlert, successAlert } from "./utility";
import { SET_USERS, SET_USER, SET_PROFILE } from "./";
const url = "/users";

export const getUsers = () => {
	return async (dispatch) => {
		try {
			const { data } = await axiosInstance.get(url);
			dispatch({
				type: SET_USERS,
				payload: {
					users: data,
				},
			});
		} catch (error) {
			errorAlert(error.message);
		}
	};
};

export const getUser = (userId) => {
	return async (dispatch, getState) => {
		try {
			const { data } = await axiosInstance.get(`${url}/${userId}`);
			dispatch({
				type: SET_USER,
				payload: {
					user: data,
				},
			});
		} catch (error) {
			errorAlert(error.message);
		}
	};
};

export const addUser = (newUser) => {
	return async (dispatch, getState) => {
		try {
			const { data } = await axiosInstance.post(url, newUser);
			const { users } = getState().userReducer;
			const newUsers = users.concat(data);
			dispatch({
				type: SET_USERS,
				payload: {
					users: newUsers,
				},
			});
			successAlert("Add user data successfully");
		} catch (error) {
			errorAlert(error.message);
		}
	};
};

export const updateUser = (userId, newUser) => {
	return async (dispatch, getState) => {
		try {
			const { data } = await axiosInstance.put(url + `/${userId}`, newUser);
			const { users } = getState().userReducer;
			const findIndex = (element) => element.id === userId;
			const index = users.findIndex(findIndex);
			const newUsers = [
				...users.slice(0, index),
				{
					...users[index],
					...data,
				},
				...users.slice(index + 1),
			];
			dispatch({
				type: SET_USERS,
				payload: {
					users: newUsers,
				},
			});
			successAlert("Update user data successfully");
		} catch (error) {
			errorAlert(error.message);
		}
	};
};

export const deleteUser = (userId) => {
	return async (dispatch, getState) => {
		try {
			axiosInstance.delete(url + `/${userId}`);
			const { users } = getState().userReducer;
			const newUsers = users.filter((item) => item.id !== userId);
			dispatch({
				type: SET_USERS,
				payload: {
					users: newUsers,
				},
			});
			successAlert("Delete data successfully");
		} catch (error) {
			errorAlert(error.message);
		}
	};
};

export const getProfile = () => {
	return async (dispatch, getState) => {
		// try {
		//   const { data } = await axiosInstance.get(url + "/findProfile");
		//   dispatch({
		//     type: SET_PROFILE,
		//     payload: {
		//       user: data,
		//     },
		//   });
		// } catch (error) {
		//   errorAlert(error.message);
		//   if (error.response.status === 403) {
		//     localStorage.removeItem("token");
		//     window.location.replace("/");
		//   }
		// }
	};
};

export const changePassword = (userId, newUser) => {
	return async (dispatch, getState) => {
		try {
			await axiosInstance.put(`${url}/changePassword/${userId}`, newUser);
			successAlert("Change password successfully");
		} catch (error) {
			errorAlert(error.message);
		}
	};
};
