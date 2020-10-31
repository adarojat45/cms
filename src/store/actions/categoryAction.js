import { axiosInstance } from "./config";
import { errorAlert, successAlert } from "./utility";
import { SET_CATEGORIES, SET_CATEGORY } from "./";
const url = "/categories";

export const getCategories = () => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(url);
      dispatch({
        type: SET_CATEGORIES,
        payload: {
          categories: data,
        },
      });
    } catch (error) {
      errorAlert(error.message);
    }
  };
};

export const getCategory = (categoryId) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(`${url}/${categoryId}`);
      dispatch({
        type: SET_CATEGORY,
        payload: {
          category: data,
        },
      });
    } catch (error) {
      errorAlert(error.message);
    }
  };
};

export const addCategory = (newCategory) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axiosInstance.post(url, newCategory);
      const { categories } = getState().categoryReducer;
      const newCategories = categories.concat(data);
      dispatch({
        type: SET_CATEGORIES,
        payload: {
          categories: newCategories,
        },
      });
      successAlert("Add data successfully");
    } catch (error) {
      errorAlert(error.message);
    }
  };
};

export const updateCategory = (categoryId, newCategory) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axiosInstance.put(
        url + `/${categoryId}`,
        newCategory
      );
      const { categories } = getState().categoryReducer;
      const findIndex = (element, i) => element.id === categoryId;
      const index = categories.findIndex(findIndex);
      const newCategories = [
        ...categories.slice(0, index),
        {
          ...categories[index],
          ...data,
        },
        ...categories.slice(index + 1),
      ];
      dispatch({
        type: SET_CATEGORIES,
        payload: {
          categories: newCategories,
        },
      });
      successAlert("Update data successfully");
    } catch (error) {
      errorAlert(error.message);
    }
  };
};

export const deleteCategory = (categoryId) => {
  return async (dispatch, getState) => {
    try {
      await axiosInstance.delete(url + `/${categoryId}`);
      const { categories } = getState().categoryReducer;
      const newCategories = categories.filter((item) => item.id !== categoryId);
      dispatch({
        type: SET_CATEGORIES,
        payload: {
          categories: newCategories,
        },
      });
      successAlert("Delete data successfully");
    } catch (error) {
      errorAlert(error.message);
    }
  };
};
