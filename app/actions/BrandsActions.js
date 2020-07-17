import { actionNames } from "../utils/constants/actionConstants";

export function createBrands() {
  return {
    type: actionNames.createBrand
  };
}

export function updateBrands() {
  return {
    type: actionNames.updateBrand
  };
}

export function getBrandById(id) {
  return {
    type: actionNames.getBrandById,
    id
  };
}

export function nextPage() {
  return {
    type: actionNames.nextBrandPage
  };
}

export function selectPage(index) {
  return {
    type: actionNames.selectBrandPage,
    index
  };
}

export function previousPage() {
  return {
    type: actionNames.previousBrandsPage
  };
}

export function closeNotification() {
  return {
    type: actionNames.closeNotification
  };
}

export function showCreateModal() {
  return {
    type: actionNames.showCreateBrandModal
  };
}

export function listBrands(page, orderBy, order) {
  return {
    type: actionNames.listBrands,
    page,
    orderBy,
    order
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

export function closeModal() {
  return {
    type: actionNames.closeModal
  };
}
