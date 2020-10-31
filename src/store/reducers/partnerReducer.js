const initialState = {
  partners: [],
  partner: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_PARTNERS":
      return { ...state, partners: action.payload.partners };
    case "SET_PARTNER":
      return { ...state, partner: action.payload.partner };
    case "ADD_PARTNER":
      return {
        ...state,
        partners: state.partners.concat(action.payload.partner),
      };
    case "UPDATE_PARTNER":
      return { ...state, partner: action.payload.partner };
    case "DELETE_PARTNER":
      const newPartners = state.partners.filter((partner) => {
        return partner.id !== action.payload.partner.id;
      });
      return { ...state, partners: newPartners };
    default:
      return state;
  }
};
