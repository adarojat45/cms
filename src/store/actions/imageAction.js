import { axiosInstance } from "./config";
import { errorAlert, successAlert } from "./utility";
const url = "/images";

export const getImages = () => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.get(url);
      dispatch({
        type: "SET_IMAGES",
        payload: {
          images: res.data,
        },
      });
    } catch (error) {
      errorAlert(error.message);
    }
  };
};

export const addImage = (newImage) => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.post(url, newImage);
      dispatch({
        type: "ADD_IMAGE",
        payload: {
          image: res.data,
        },
      });
      successAlert("Add image data successfully");
    } catch (error) {
      errorAlert(error.message);
    }
  };
};
