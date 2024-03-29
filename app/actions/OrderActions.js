import { actionNames } from "../utils/constants/actionConstants";

export function loadProducts(products) {
  return {
    type: actionNames.loadProductsFromShoppingCart,
    products
  };
}

export function removeProduct(id) {
  return {
    type: actionNames.removeProductFromCart,
    id
  };
}

export function addProductQuantityFromShoppingCart(id) {
  return {
    type: actionNames.addProductQuantityFromCart,
    id
  };
}

export function removeProductQuantityFromShoppingCart(id) {
  return {
    type: actionNames.removeProductQuantityFromCart,
    id
  };
}

export function searchCustomer(filters) {
  return {
    type: actionNames.searchCustomer,
    filters
  };
}

export function selectUser(id) {
  return {
    type: actionNames.selectedUser,
    id
  };
}

export function closeModalCustomer() {
  return {
    type: actionNames.closeModalCustomer
  };
}

export function showSearchCustomerModal() {
  return {
    type: actionNames.showSearchCustomerModal
  };
}

export function createOrder(dataOrder) {
  return {
    type: actionNames.createOrder,
    dataOrder
  };
}

export function closeModal() {
  return {
    type: actionNames.closeModal
  };
}

export function completeOrder() {
  return {
    type: actionNames.completeOrder
  };
}

export function getOrderById(id) {
  return {
    type: actionNames.getOrderById,
    id
  };
}

export function nextPage() {
  return {
    type: actionNames.nextOrderPage
  };
}

export function selectPage(index) {
  return {
    type: actionNames.selectOrderPage,
    index
  };
}

export function previousPage() {
  return {
    type: actionNames.previousOrderPage
  };
}

export function closeNotification() {
  return {
    type: actionNames.closeNotification
  };
}

export function showCreateModal() {
  return {
    type: actionNames.showCreateOrdersModal
  };
}

export function listOrders(page, orderBy, order) {
  return {
    type: actionNames.listOrders,
    page,
    order,
    orderBy
  };
}

export function checkRoles(roles) {
  return {
    type: actionNames.checkRoles,
    roles
  };
}
