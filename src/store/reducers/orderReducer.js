const initialState = {
  orders: [],
  order: null,
  pagination: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_ORDERS":
      return { ...state, orders: action.payload.orders };
    case "SET_ORDER":
      return { ...state, order: action.payload.order };
    case "ADD_ORDER":
      return {
        ...state,
        orders: state.orders.concat(action.payload.order),
      };
    case "UPDATE_ORDER":
      const findIndex = (element, i) => element.id === action.payload.order.id;
      const index = state.orders.findIndex(findIndex);
      return {
        ...state,
        orders: [
          ...state.orders.slice(0, index),
          {
            ...state.orders[index],
            ...action.payload.order,
          },
          ...state.orders.slice(index + 1),
        ],
        order: action.payload.order,
      };
    case "DELETE_ORDER":
      const newOrders = state.orders.filter((order) => {
        return order.id !== action.payload.order.id;
      });
      return { ...state, orders: newOrders };
    default:
      return state;
  }
};
