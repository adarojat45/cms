import { axiosInstance } from "./config";
import { errorAlert, successAlert } from "./utility";
const url = "/videos";

export const getVideos = () => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.get(url);
      dispatch({
        type: "SET_VIDEOS",
        payload: {
          videos: res.data,
        },
      });
    } catch (error) {
      errorAlert(error.message);
    }
  };
};

export const addVideo = (newSong) => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.post(url, newSong);
      dispatch({
        type: "ADD_VIDEO",
        payload: {
          video: res.data,
        },
      });
      successAlert("Add video data successfully");
    } catch (error) {
      errorAlert(error.message);
    }
  };
};
