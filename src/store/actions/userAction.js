import { axiosInstance } from "./config";
import { errorAlert, successAlert } from "./utility";
const url = "/users";

export const getUsers = () => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.get(url);
      dispatch({
        type: "SET_USERS",
        payload: {
          users: res.data,
        },
      });
      // successAlert("Fetch feature data successfully");
    } catch (error) {
      errorAlert(error.message);
    }
  };
};

export const getUser = (id) => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.get(`${url}/${id}`);
      dispatch({
        type: "SET_USER",
        payload: {
          user: res.data,
        },
      });
      // successAlert("Fetch feature data successfully");
    } catch (error) {
      errorAlert(error.message);
    }
  };
};

export const addUser = (newUser) => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.post(url, newUser);
      dispatch({
        type: "ADD_USER",
        payload: {
          user: res.data,
        },
      });
      successAlert("Add user data successfully");
    } catch (error) {
      errorAlert(error.message);
    }
  };
};

export const updateUser = (id, newUser) => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.put(url + `/${id}`, newUser);
      dispatch({
        type: "UPDATE_USER",
        payload: {
          user: res.data,
        },
      });
      successAlert("Update user data successfully");
    } catch (error) {
      errorAlert(error.message);
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch, getState) => {
    try {
      axiosInstance.delete(url + `/${id}`);
      dispatch({
        type: "DELETE_USER",
        payload: {
          user: {
            id,
          },
        },
      });
      successAlert("Delete user data successfully");
    } catch (error) {
      errorAlert(error.message);
    }
  };
};

export const getProfile = () => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.get(url + "/findProfile");
      dispatch({
        type: "SET_PROFILE",
        payload: {
          user: res.data,
        },
      });
      // successAlert("Fetch feature data successfully");
    } catch (error) {
      errorAlert(error.message);
    }
  };
};

export const changePassword = (id, newUser) => {
  return async (dispatch, getState) => {
    try {
      await axiosInstance.put(`${url}/changePassword/${id}`, newUser);
      // dispatch({
      //   type: "UPDATE_USER",
      //   payload: {
      //     user: res.data,
      //   },
      // });
      successAlert("Change password successfully");
    } catch (error) {
      errorAlert(error.message);
    }
  };
};
