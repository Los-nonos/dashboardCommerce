import { actionNames } from "../utils/constants/actionConstants";

export const stateDefault = {
  filters: {
    categoryName: [],
    brandName: [],
    providerName: [],
    valueFilterOption: "",
    query: ""
  },
  products: [],
  productsWithStock: [],
  formData: {
    id: 0,
    name: "",
    description: "",
    images: [],
    characteristics: []
  },
  productWithDetails: {
    characteristics: []
  },
  modalShow: {
    createModal: false,
    updateModal: false,
    viewModal: false
  },
  completeProductData: {
    title: "Caracteristicas",
    characteristics: []
  },
  dataToCompleteProduct: {
    category: {
      name: "",
      filters: []
    }
  },
  formErrors: {},
  page: 1,
  totalPages: 1,
  totalPagesInventory: 1
};

const productsReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case actionNames.loadFiltersSuccesful:
      return {
        ...state,
        filters: {
          categoryName: action.body.categories,
          brandName: action.body.brands,
          providerName: action.body.providers
        }
      };
    case actionNames.loadFiltersFail:
      return {
        ...state,
        filters: {
          categoryName: [],
          brandName: [],
          providerName: []
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
    case actionNames.loadProductsSuccessful:
      return {
        ...state,
        products: action.products,
        totalPages: action.totalPages
      };
    case actionNames.loadProductsFail:
      return { ...state, products: [], totalPages: 1 };
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
      return { ...state, modalShow: { createModal: true } };
    case actionNames.showUpdateProductModal:
      return { ...state, modalShow: { updateModal: true } };
    case actionNames.closeModal:
      return {
        ...state,
        modalShow: { createModal: false, updateModal: false, viewModal: false }
      };
    case actionNames.selectedCategory:
      return { ...state, dataToCompleteProduct: { category: action.category } };
    case actionNames.showViewModal:
      return { ...state, modalShow: { viewModal: true } };
    case actionNames.loadProductsWithDetailsSuccesful:
      return {
        ...state,
        formData: {
          id: action.productWithDetails.id,
          title: action.productWithDetails.name,
          description: action.productWithDetails.description,
          price: action.productWithDetails.price,
          taxes: action.productWithDetails.taxes
          //category: action.productWithDetails.category.id,
          //characteristics: action.productWithDetails.characteristics,
          //brand: action.productWithDetails.brand.id,
          //provider: action.productWithDetails.provider.id
        }
      };
    case actionNames.loadProductWithDetailsFail:
      return { ...state, productWithDetails: {} };
    case actionNames.loadProductSuccessful:
      return {
        ...state,
        formData: {
          id: action.product.id,
          name: action.product.title,
          description: action.product.description,
          brand: action.product.brand[0],
          category: action.product.categories[0],
          images: action.product.images,
          price: action.product.price,
          taxes: action.product.taxes,
          characteristics: action.product.characteristics
        }
      };
    case actionNames.loadProductFail:
      return { ...state, formData: {} };
    case actionNames.productCreatedFail:
      return { ...state, formErrors: action.errors };
    case actionNames.productCreatedSuccessfully:
      return { ...state };
    case actionNames.updateProductImage:
      const images = state.formData.images;
      images.push(action.image_url);
      return {
        ...state,
        formData: { ...state.formData, images: images }
      };
    case actionNames.loadProductsWithLowerStockSuccessful:
      return {
        ...state,
        productsWithStock: action.products,
        totalPagesInventory: action.totalPages
      };
    case actionNames.loadProductsWithLowerStockFail:
      return {
        ...state,
        productsWithStock: [],
        totalPagesInventory: 1
      };
    default:
      return state;
  }
};

export default productsReducer;
