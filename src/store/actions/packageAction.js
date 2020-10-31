import { axiosInstance } from "./config";
import { errorAlert, successAlert } from "./utility";
const url = "/packages";

export const getPackages = () => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.get(url);
      dispatch({
        type: "SET_PACKAGES",
        payload: {
          packages: res.data,
        },
      });
      // successAlert("Fetch pacakge data successfully");
    } catch (error) {
      errorAlert(error.message);
    }
  };
};

export const addPackage = (newPackage) => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.post(url, newPackage);
      dispatch({
        type: "ADD_PACKAGE",
        payload: {
          package: res.data,
        },
      });
      successAlert("Add package data successfully");
    } catch (error) {
      console.log(error);
      errorAlert(error.message);
    }
  };
};

export const updatePackage = (id, newPackage) => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.put(url + `/${id}`, newPackage);
      dispatch({
        type: "UPDATE_PACKAGE",
        payload: {
          package: res.data,
        },
      });
      successAlert("Update package data successfully");
    } catch (error) {
      errorAlert(error.message);
    }
  };
};

export const deletePackage = (id) => {
  return async (dispatch, getState) => {
    try {
      axiosInstance.delete(url + `/${id}`);
      dispatch({
        type: "DELETE_PACKAGE",
        payload: {
          package: {
            id,
          },
        },
      });
      successAlert("Delete package data successfully");
    } catch (error) {
      errorAlert(error.message);
    }
  };
};
