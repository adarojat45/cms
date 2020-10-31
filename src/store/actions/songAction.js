import { axiosInstance } from "./config";
import { errorAlert, successAlert } from "./utility";
const url = "/songs";

export const getSongs = () => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.get(url);
      dispatch({
        type: "SET_SONGS",
        payload: {
          songs: res.data,
        },
      });
    } catch (error) {
      errorAlert(error.message);
    }
  };
};

export const addSong = (newSong) => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.post(url, newSong);
      dispatch({
        type: "ADD_SONG",
        payload: {
          song: res.data,
        },
      });
      successAlert("Add song data successfully");
    } catch (error) {
      errorAlert(error.message);
    }
  };
};
