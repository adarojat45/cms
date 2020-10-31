import { SET_CATEGORIES, SET_CATEGORY } from "../actions";
const initialState = {
  categories: [],
  category: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload.categories };
    case SET_CATEGORY:
      return { ...state, category: action.payload.category };
    default:
      return state;
  }
};
