import { axiosInstance } from "./config";
import { errorAlert, successAlert } from "./utility";
import { SET_POST, SET_POSTS } from "./";
const url = "/posts";

export const getPosts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(url);
      dispatch({
        type: SET_POSTS,
        payload: {
          posts: data,
        },
      });
    } catch (error) {
      errorAlert(error.message);
    }
  };
};

export const getPost = (postId) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(`${url}/${postId}`);
      dispatch({
        type: SET_POST,
        payload: {
          post: data,
        },
      });
    } catch (error) {
      errorAlert(error.message);
    }
  };
};

export const addPost = (newPost) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axiosInstance.post(url, newPost);
      const { posts } = getState().postReducer;
      const newPosts = posts.concat(data);
      dispatch({
        type: SET_POSTS,
        payload: {
          posts: newPosts,
        },
      });
      successAlert("Add data successfully");
    } catch (error) {
      errorAlert(error.message);
    }
  };
};

export const updatePost = (postId, newPost) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axiosInstance.put(url + `/${postId}`, newPost);
      const { posts } = getState().postReducer;
      const findIndex = (element, i) => element.id === postId;
      const index = posts.findIndex(findIndex);
      const newPosts = [
        ...posts.slice(0, index),
        {
          ...posts[index],
          ...data,
        },
        ...posts.slice(index + 1),
      ];
      dispatch({
        type: SET_POSTS,
        payload: {
          posts: newPosts,
        },
      });
      successAlert("Update data successfully");
    } catch (error) {
      errorAlert(error.message);
    }
  };
};

export const deletePost = (postId) => {
  return async (dispatch, getState) => {
    try {
      await axiosInstance.delete(url + `/${postId}`);
      const { posts } = getState().postReducer;
      const newPosts = posts.filter((item) => item.id !== postId);
      dispatch({
        type: SET_POSTS,
        payload: {
          posts: newPosts,
        },
      });
      successAlert("Delete data successfully");
    } catch (error) {
      errorAlert(error.message);
    }
  };
};
