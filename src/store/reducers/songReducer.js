const initialState = {
  songs: [],
  song: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_SONGS":
      return { ...state, songs: action.payload.songs };
    case "ADD_SONG":
      return {
        ...state,
        songs: state.songs.concat(action.payload.song),
      };
    default:
      return state;
  }
};
