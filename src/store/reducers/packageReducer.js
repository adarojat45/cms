const initialState = {
  packages: [],
  package: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_PACKAGES":
      return { ...state, packages: action.payload.packages };
    case "ADD_PACKAGE":
      return {
        ...state,
        packages: state.packages.concat(action.payload.package),
      };
    case "UPDATE_PACKAGE":
      const findIndex = (element, i) =>
        element.id === action.payload.package.id;
      const index = state.packages.findIndex(findIndex);
      return {
        ...state,
        packages: [
          ...state.packages.slice(0, index),
          {
            ...state.packages[index],
            ...action.payload.package,
          },
          ...state.packages.slice(index + 1),
        ],
      };
    case "DELETE_PACKAGE":
      const newPackages = state.packages.filter((element) => {
        return element.id !== action.payload.package.id;
      });
      return { ...state, packages: newPackages };
    default:
      return state;
  }
};
