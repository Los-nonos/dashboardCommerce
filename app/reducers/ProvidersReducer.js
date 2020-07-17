import { actionNames } from "../utils/constants/actionConstants";

export const defaultState = {
  providers: [],
  pages: 1,
  totalPages: 1,
  formData: {},
  formErrors: {},
  modalShow: {
    createModal: false,
    updateModal: false
  }
};

const providersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionNames.showCreateProvidersModal:
      return { ...state, modalShow: { createModal: true, updateModal: false } };
    case actionNames.showUpdateProvidersModal:
      return { ...state, modalShow: { createModal: false, updateModal: true } };
    case actionNames.closeModal:
      return {
        ...state,
        modalShow: { createModal: false, updateModal: false }
      };
    default:
      return state;
  }
};

export default providersReducer;
