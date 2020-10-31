import { axiosInstance } from "./config";
import { errorAlert, successAlert } from "./utility";
const url = "/partners";

export const getPartners = () => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.get(url);
      dispatch({
        type: "SET_PARTNERS",
        payload: {
          partners: res.data,
        },
      });
    } catch (error) {
      errorAlert(error.message);
    }
  };
};

export const getPartner = (id) => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.get(`${url}/${id}`);
      dispatch({
        type: "SET_PARTNER",
        payload: {
          partner: res.data,
        },
      });
    } catch (error) {
      errorAlert(error.message);
    }
  };
};

export const addPartner = (newUser) => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.post(url, newUser);
      dispatch({
        type: "ADD_PARTNER",
        payload: {
          partner: res.data,
        },
      });
      successAlert("Add partner data successfully");
    } catch (error) {
      errorAlert(error.message);
    }
  };
};

export const updatePartner = (id, newPartner) => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.put(url + `/${id}`, newPartner);
      dispatch({
        type: "UPDATE_PARTNER",
        payload: {
          partner: res.data,
        },
      });
      successAlert("Update partner data successfully");
    } catch (error) {
      errorAlert(error.message);
    }
  };
};

export const deletePartner = (id) => {
  return async (dispatch, getState) => {
    try {
      axiosInstance.delete(url + `/${id}`);
      dispatch({
        type: "DELETE_PARTNER",
        payload: {
          partner: {
            id,
          },
        },
      });
      successAlert("Delete partner data successfully");
    } catch (error) {
      errorAlert(error.message);
    }
  };
};
