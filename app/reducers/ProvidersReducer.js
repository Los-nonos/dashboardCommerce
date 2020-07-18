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
    case actionNames.loadProvidersSuccessful:
      return {
        ...state,
        providers: action.providers,
        totalPages: action.totalPages
      };
    case actionNames.loadProvidersFail:
      return { ...state, providers: [], totalPages: 1 };
    case actionNames.createProviderSuccessful:
      return { ...state };
    case actionNames.createProviderFail:
      return { ...state };
    case actionNames.updateProviderSuccessful:
      return { ...state };
    case actionNames.updateProviderFail:
      return { ...state };
    case actionNames.nextProvidersPage:
      if (state.page + 1 <= state.totalPages) {
        return { ...state, page: state.page + 1 };
      }
      return { ...state, page: state.page };
    case actionNames.previousProvidersPage:
      if (state.page - 1 > 0) {
        return { ...state, page: state.page - 1 };
      }
      return { ...state, page: state.page };
    case actionNames.selectProvidersPage:
      return { ...state, page: action.page };
    default:
      return state;
  }
};

export default providersReducer;
