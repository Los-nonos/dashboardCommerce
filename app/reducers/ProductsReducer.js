import {actionNames} from "../utils/constants/actionConstants";

export const stateDefault = {
  filters: {
    categoryName: [],
    filterNames: [],
    filterOptions: [],
    valueFilterOption: "",
    query: ""
  },
  products: [],
  formData: {
    id: '',
    name: '',
    description: '',
    productImage: '',
    characteristics: [],
  },
  productWithDetails: {},
  modalShow: {
    createModal: false,
    updateModal: false,
  },
  completeProductData: {
    title: 'Caracteristicas',
    characteristics: [],
  },
  dataToCompleteProduct: {
    category: {
        name: '',
        filters: []
      },
  },
  formErrors: {},
  page: 1,
  totalPages: 1
};

const productsReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case actionNames.loadFiltersSuccesful:
      return {...state, filters: {
          categoryName: action.body.categories,
          filterName: action.body.filterNames,
          filterOption: action.body.filterOptions
        }
      };
    case actionNames.loadFiltersFail:
      return {...state, filters: {
          categoryName: [],
          filterName: [],
          filterOption: [],
        }
      };
    case actionNames.loadProductsByFilterSuccesful:
      return {
        ...state,
        products: action.products,
        totalPages: action.totalPages
      };
    case actionNames.loadProductsByFilterFail:
      return { ...state, products: [] };
    case actionNames.nextProductsPage:
      if (state.page + 1 <= state.totalPages) {
        return { ...state, page: state.page + 1 };
      }
      return { ...state, page: state.page };
    case actionNames.previousProductsPage:
      if (state.page - 1 > 0) {
        return { ...state, page: state.page - 1 };
      }
      return { ...state, page: state.page };
    case actionNames.selectProductPage:
      return { ...state, page: action.page };
    case actionNames.showCreateProductModal:
      return { ...state, modalShow:{ createModal: true } };
    case actionNames.showUpdateProductModal:
      return { ...state, modalShow: { updateModal: true } };
    case actionNames.closeModal:
      return { ...state, modalShow: { createModal: false, updateModal: false }};
    case actionNames.selectedCategory:
      return { ...state, dataToCompleteProduct: { category: action.category } };
    default:
      return state;
  }
};

export default productsReducer;
