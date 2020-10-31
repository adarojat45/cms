const initialState = {
  videos: [],
  video: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_VIDEOS":
      return { ...state, videos: action.payload.videos };
    case "ADD_VIDEO":
      return {
        ...state,
        videos: state.videos.concat(action.payload.video),
      };
    default:
      return state;
  }
};
