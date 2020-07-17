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
    case actionNames.loadBrandsSuccessfully:
      return { ...state, brands: action.brands, totalPages: action.totalPages };
    case actionNames.loadBrandsFail:
      return { ...state, brands: [], totalPages: 1 };
    case actionNames.nextBrandPage:
      if (state.page + 1 <= state.totalPages) {
        return { ...state, page: state.page + 1 };
      }
      return { ...state, page: state.page };
    case actionNames.selectBrandPage:
      return { ...state, page: action.index };
    case actionNames.previousBrandsPage:
      if (state.page - 1 > 0) {
        return { ...state, page: state.page - 1 };
      }
      return { ...state, page: state.page };
    case actionNames.createBrandSuccessfully:
      return { ...state };
    case actionNames.createBrandFail:
      return { ...state };
    case actionNames.updateBrandSuccessfully:
      return { ...state };
    case actionNames.updateBrandFail:
      return { ...state };
    default:
      return state;
  }
};

export default brandsReducer;
