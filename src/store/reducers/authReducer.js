import { SET_IS_AUTH } from "../actions";
const initialState = {
  isAuth: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_AUTH:
      return { ...state, isAuth: true };
    default:
      return state;
  }
};
