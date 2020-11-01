import { SET_PROFILE, SET_USERS, SET_USER } from "../actions";

const initialState = {
  users: [],
  user: null,
  profile: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: action.payload.users };
    case SET_USER:
      return { ...state, user: action.payload.user };
    case SET_PROFILE:
      return { ...state, profile: action.payload.user };
    default:
      return state;
  }
};
