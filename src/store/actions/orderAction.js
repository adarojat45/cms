import { axiosInstance } from "./config";
import { errorAlert, successAlert } from "./utility";
const url = "/orders";

export const getOrders = () => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.get(url);
      dispatch({
        type: "SET_ORDERS",
        payload: {
          orders: res.data,
        },
      });
      // successAlert("Fetch order data successfully");
    } catch (error) {
      errorAlert(error.message);
    }
  };
};

export const getOrder = (id) => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.get(url + `/${id}`);
      dispatch({
        type: "SET_ORDER",
        payload: {
          order: res.data,
        },
      });
      // successAlert("Fetch order data successfully");
    } catch (error) {
      errorAlert(error.message);
    }
  };
};

export const addOrder = (neworder) => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.post(url, neworder);
      dispatch({
        type: "ADD_ORDER",
        payload: {
          order: res.data,
        },
      });
      successAlert("Add order data successfully");
    } catch (error) {
      errorAlert(error.message);
    }
  };
};

export const updateOrder = (id, newOrder) => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.put(url + `/${id}`, newOrder);
      dispatch({
        type: "UPDATE_ORDER",
        payload: {
          order: res.data,
        },
      });
      successAlert("Update order data successfully");
    } catch (error) {
      errorAlert(error.message);
      errorAlert(error);
    }
  };
};

export const deleteOrder = (id) => {
  return async (dispatch, getState) => {
    try {
      axiosInstance.delete(url + `/${id}`);
      dispatch({
        type: "DELETE_ORDER",
        payload: {
          order: {
            id,
          },
        },
      });
      successAlert("Delete order data successfully");
    } catch (error) {
      errorAlert(error.message);
    }
  };
};
