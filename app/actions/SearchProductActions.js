import { actionNames } from "../utils/constants/actionConstants";

export function closeNotification() {
  return {
    type: actionNames.closeNotification
  };
}

export function searchProducts(filters, page, orderBy, order) {
  return {
    type: actionNames.search,
    filters,
    page,
    orderBy,
    order
  };
}

export function addToCart(id) {
  return {
    type: actionNames.addProductToCart,
    id
  };
}

export function loadFilters() {
  return {
    type: actionNames.loadFilters
  };
}

export function checkRoles(roles) {
  return {
    type: actionNames.checkRoles,
    roles
  };
}

export function seeDetails(uuid) {
  return {
    type: actionNames.seeDetails,
    uuid
  };
}

export function selectPage(page) {
  return {
    type: actionNames.selectSearchPage,
    page
  };
}

export function nextPage() {
  return {
    type: actionNames.nextSearchPage
  };
}

export function previousPage() {
  return {
    type: actionNames.previousSearchPage
  };
}
