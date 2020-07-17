import { actionNames } from "../utils/constants/actionConstants";

export const defaultState = {
  orders: [],
  page: 1,
  totalPages: 1,
  formData: {},
  formErrors: {},
  modalShow: {
    createModal: false
  }
};

const ordersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionNames.showCreateOrdersModal:
      return {
        ...state,
        modalShow: { createModal: true }
      };
    case actionNames.closeModal:
      return {
        ...state,
        modalShow: { createModal: false }
      };
    default:
      return state;
  }
};

export default ordersReducer;
