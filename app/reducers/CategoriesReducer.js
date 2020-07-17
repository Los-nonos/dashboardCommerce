import { actionNames } from "../utils/constants/actionConstants";

export const defaultState = {
  categories: [],
  formData: {},
  formErrors: {},
  page: 1,
  totalPages: 1,
  modalShow: {
    createModal: false,
    updateModal: false
  }
};

const categoriesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionNames.loadCategoriesSuccessful:
      return {
        ...state,
        categories: action.categories,
        totalPages: action.totalPages
      };
    case actionNames.loadCategoriesFail:
      return {
        ...state,
        categories: [],
        totalPages: 1
      };
    case actionNames.showCreateCategoryModal:
      return { ...state, modalShow: { createModal: true, updateModal: false } };
    case actionNames.showUpdateCategoryModal:
      return {
        ...state,
        modalShow: { createModal: false, updateModal: true }
      };
    case actionNames.closeModal:
      return {
        ...state,
        modalShow: { createModal: false, updateModal: false }
      };
    case actionNames.nextCategoryPage:
      if (state.page + 1 <= state.totalPages) {
        return { ...state, page: state.page + 1 };
      }
      return { ...state, page: state.page };
    case actionNames.selectCategoryPage:
      return { ...state, page: action.page };
    case actionNames.previousCategoryPage:
      if (state.page - 1 > 0) {
        return { ...state, page: state.page - 1 };
      }
      return { ...state, page: state.page };
    case actionNames.getCategoryById:
      return { ...state, formData: { id: action.id, name: action.name } };
    default:
      return state;
  }
};

export default categoriesReducer;
