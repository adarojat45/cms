import { SET_POST, SET_POSTS } from "../actions";

const initialState = {
  posts: [],
  post: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return { ...state, posts: action.payload.posts };
    case SET_POST:
      return { ...state, post: action.payload.post };
    default:
      return state;
  }
};
