import { actionNames } from "../utils/constants/actionConstants";

export function deleteBrand(id) {
  return {
    type: actionNames.deleteBrand,
    id
  };
}

export function createBrands(dataBrand) {
  return {
    type: actionNames.createBrand,
    dataBrand
  };
}

export function updateBrands(dataBrand) {
  return {
    type: actionNames.updateBrand,
    dataBrand
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
