import { axiosInstance } from "./config";
import { errorAlert, successAlert } from "./utility";
const url = "/templates";

export const getTemplates = () => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.get(url);
      dispatch({
        type: "SET_TEMPLATES",
        payload: {
          templates: res.data,
        },
      });
    } catch (error) {
      errorAlert(error.message);
    }
  };
};

export const addTemplate = (newtemplate) => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.post(url, newtemplate);
      dispatch({
        type: "ADD_TEMPLATE",
        payload: {
          template: res.data,
        },
      });
      successAlert("Add template data successfully");
    } catch (error) {
      errorAlert(error.message);
    }
  };
};

export const updateTemplate = (id, newtemplate) => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.put(url + `/${id}`, newtemplate);
      dispatch({
        type: "UPDATE_TEMPLATE",
        payload: {
          template: res.data,
        },
      });
      successAlert("Update template data successfully");
    } catch (error) {
      errorAlert(error.message);
    }
  };
};

export const deleteTemplate = (id) => {
  return async (dispatch, getState) => {
    try {
      axiosInstance.delete(url + `/${id}`);
      dispatch({
        type: "DELETE_TEMPLATE",
        payload: {
          template: {
            id,
          },
        },
      });
      successAlert("Delete template data successfully");
    } catch (error) {
      errorAlert(error.message);
    }
  };
};
