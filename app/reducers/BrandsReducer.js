import { actionNames } from "../utils/constants/actionConstants";

export const defaultState = {
  brands: [],
  formData: {},
  formErrors: {},
  page: 1,
  totalPages: 1,
  modalShow: {
    createModal: false,
    updateModal: false
  }
};

const brandsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionNames.loadBrandsSuccessful:
      return { ...state, brands: action.brands, totalPages: action.totalPages };
    case actionNames.loadBrandsFail:
      return { ...state, brands: [], totalPages: 1 };
    default:
      return state;
  }
};

export default brandsReducer;
