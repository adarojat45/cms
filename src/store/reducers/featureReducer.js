const initialState = {
  features: [],
  feature: null,
  pagination: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_FEATURES":
      return { ...state, features: action.payload.features };
    case "ADD_FEATURE":
      return {
        ...state,
        features: state.features.concat(action.payload.feature),
      };
    case "UPDATE_FEATURE":
      const findIndex = (element, i) =>
        element.id === action.payload.feature.id;
      const index = state.features.findIndex(findIndex);
      return {
        ...state,
        features: [
          ...state.features.slice(0, index),
          {
            ...state.features[index],
            ...action.payload.feature,
          },
          ...state.features.slice(index + 1),
        ],
      };
    case "DELETE_FEATURE":
      const newFeatures = state.features.filter((feature) => {
        return feature.id !== action.payload.feature.id;
      });
      return { ...state, features: newFeatures };
    default:
      return state;
  }
};
