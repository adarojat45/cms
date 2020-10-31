const initialState = {
  posts: [],
  post: {},
  pagination: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_POSTS_COMPLETED":
      return { ...state, posts: action.payload.posts };
    default:
      return state;
  }
};
