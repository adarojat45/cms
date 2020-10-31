const initialState = {
  images: [],
  image: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_IMAGES":
      return { ...state, images: action.payload.images };
    case "ADD_IMAGE":
      return {
        ...state,
        images: state.images.concat(action.payload.image),
      };
    default:
      return state;
  }
};
