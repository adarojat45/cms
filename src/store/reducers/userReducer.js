const initialState = {
  users: [],
  user: null,
  profile: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.payload.users };
    case "SET_USER":
      return { ...state, user: action.payload.user };
    case "ADD_USER":
      return {
        ...state,
        users: state.users.concat(action.payload.user),
      };
    case "UPDATE_USER":
      return { ...state, user: action.payload.user };
    case "DELETE_USER":
      const newUsers = state.users.filter((user) => {
        return user.id !== action.payload.user.id;
      });
      return { ...state, users: newUsers };
    case "SET_PROFILE":
      return { ...state, profile: action.payload.user };
    default:
      return state;
  }
};
