import { actionNames } from "../utils/constants/actionConstants";

export function updateProductImage(image_url) {
  return {
    type: actionNames.updateProductImage,
    image_url
  };
}

export function selectedCategory(category) {
  return {
    type: actionNames.selectedCategory,
    category
  };
}

export function loadFilters() {
  return {
    type: actionNames.loadFilters
  };
}

export function updateProduct(dataProduct) {
  return {
    type: actionNames.updateProduct,
    dataProduct
  };
}

export function productsUpdated() {
  return {
    type: actionNames.productNeedUpdated
  };
}

export function getProductsByUuid(uuid) {
  return {
    type: actionNames.getProductByUuid,
    uuid
  };
}

export function completeProduct(dataProduct) {
  return {
    type: actionNames.completeProduct,
    dataProduct
  };
}

export function createProduct(dataProduct) {
  return {
    type: actionNames.createProduct,
    dataProduct
  };
}

export function nextPage() {
  return {
    type: actionNames.nextProductsPage
  };
}

export function selectPage(index) {
  return {
    type: actionNames.selectProductPage,
    index
  };
}

export function previousPage() {
  return {
    type: actionNames.previousProductsPage
  };
}

export function listProducts(page, orderBy, order) {
  return {
    type: actionNames.listProducts,
    page,
    orderBy,
    order
  };
}

export function checkRoles(roles) {
  return {
    type: actionNames.checkRoles,
    roles
  };
}

export function showProductOnWebsite(uuid) {
  return {
    type: actionNames.showOnWebsite,
    uuid
  };
}

export function closeNotification() {
  return {
    type: actionNames.closeNotification
  };
}

export function closeModal() {
  return {
    type: actionNames.closeModal
  };
}

export function showCreateModal() {
  return {
    type: actionNames.showCreateProductModal
  };
}

export function seeDetails(uuid) {
  return {
    type: actionNames.seeDetails,
    uuid
  };
}
