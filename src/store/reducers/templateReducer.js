const initialState = {
  templates: [],
  template: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_TEMPLATES":
      return { ...state, templates: action.payload.templates };
    case "ADD_TEMPLATE":
      return {
        ...state,
        templates: state.templates.concat(action.payload.template),
      };
    case "UPDATE_TEMPLATE":
      const findIndex = (element, i) =>
        element.id === action.payload.template.id;
      const index = state.templates.findIndex(findIndex);
      return {
        ...state,
        templates: [
          ...state.templates.slice(0, index),
          {
            ...state.templates[index],
            ...action.payload.template,
          },
          ...state.templates.slice(index + 1),
        ],
      };
    case "DELETE_TEMPLATE":
      const newtemplates = state.templates.filter((template) => {
        return template.id !== action.payload.template.id;
      });
      return { ...state, templates: newtemplates };
    default:
      return state;
  }
};
