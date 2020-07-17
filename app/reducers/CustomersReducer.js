import { actionNames } from "../utils/constants/actionConstants";

export const defaultState = {
  customers: [],
  page: 1,
  totalPages: 1,
  formData: {},
  formErrors: {},
  modalShow: {
    createModal: false,
    updateModal: false
  }
};

const customerReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionNames.loadCustomersSuccessfully:
      return {
        ...state,
        customers: action.customers,
        totalPages: action.totalPages
      };
    case actionNames.loadCustomersFail:
      return {
        ...state,
        customers: [],
        totalPages: 1
      };
    case actionNames.showCreateCustomersModal:
      return { ...state, modalShow: { createModal: true, updateModal: false } };
    case actionNames.showUpdateCustomerModal:
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

export default customerReducer;
