import { actionNames } from "../utils/constants/actionConstants";

export const defaultState = {
  orders: [],
  customers: [],
  page: 1,
  totalPages: 1,
  formData: {
    customer: {}
  },
  formErrors: {},
  modalShow: {
    createModal: false,
    searchCustomer: false
  }
};

const ordersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionNames.showCreateOrdersModal:
      return {
        ...state,
        modalShow: { createModal: true, searchCustomer: false }
      };
    case actionNames.closeModal:
      return {
        ...state,
        modalShow: { createModal: false, searchCustomer: false }
      };
    case actionNames.showSearchCustomerModal:
      return {
        ...state,
        modalShow: { searchCustomer: true }
      };
    case actionNames.closeModalCustomer:
      return {
        ...state,
        modalShow: { searchCustomer: false, createModal: true }
      };
    case actionNames.loadCustomersSuccessfully:
      return { ...state, customers: action.customers };
    case actionNames.loadCustomersFail:
      return { ...state, customers: [] };
    case actionNames.getCustomerByOrderSuccessfully:
      return { ...state, formData: { customer: action.customer } };
    case actionNames.getCustomerByOrderFail:
      return { ...state, formData: { customer: {} } };
    default:
      return state;
  }
};

export default ordersReducer;
