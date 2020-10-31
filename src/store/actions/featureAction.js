import { axiosInstance } from "./config";
import { errorAlert, successAlert } from "./utility";
const url = "/features";

export const getFeatures = () => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.get(url);
      dispatch({
        type: "SET_FEATURES",
        payload: {
          features: res.data,
        },
      });
      // successAlert("Fetch feature data successfully");
    } catch (error) {
      errorAlert(error.message);
    }
  };
};

export const addFeature = (newFeature) => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.post(url, newFeature);
      dispatch({
        type: "ADD_FEATURE",
        payload: {
          feature: res.data,
        },
      });
      successAlert("Add feature data successfully");
    } catch (error) {
      errorAlert(error.message);
    }
  };
};

export const updateFeature = (id, newFeature) => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.put(url + `/${id}`, newFeature);
      dispatch({
        type: "UPDATE_FEATURE",
        payload: {
          feature: res.data,
        },
      });
      successAlert("Update feature data successfully");
    } catch (error) {
      errorAlert(error.message);
    }
  };
};

export const deleteFeature = (id) => {
  return async (dispatch, getState) => {
    try {
      axiosInstance.delete(url + `/${id}`);
      dispatch({
        type: "DELETE_FEATURE",
        payload: {
          feature: {
            id,
          },
        },
      });
      successAlert("Delete feature data successfully");
    } catch (error) {
      errorAlert(error.message);
    }
  };
};
