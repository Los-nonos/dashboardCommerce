import { actionNames } from "../utils/constants/actionConstants";

export function showUpdateModal() {
  return {
    type: actionNames.showUpdateCategoryModal
  };
}

export function categoriesUpdated() {
  return {
    type: actionNames.updateCategories
  };
}

export function createCategory(dataCategory) {
  return {
    type: actionNames.createCategory,
    dataCategory
  };
}

export function updateCategory(dataCategory) {
  return {
    type: actionNames.updateCategory,
    dataCategory
  };
}

export function closeModal() {
  return {
    type: actionNames.closeModal
  };
}

export function completeCategory() {
  return {
    type: actionNames.completeCategory
  };
}

export function getCategoryById(name, id) {
  return {
    type: actionNames.getCategoryById,
    name,
    id
  };
}

export function previousPage() {
  return {
    type: actionNames.previousCategoryPage
  };
}

export function selectPage(index) {
  return {
    type: actionNames.selectCategoryPage,
    index
  };
}

export function nextPage() {
  return {
    type: actionNames.nextCategoryPage
  };
}

export function closeNotification() {
  return {
    type: actionNames.closeNotification
  };
}

export function showCreateModal() {
  return {
    type: actionNames.showCreateCategoryModal
  };
}

export function listCategories(page, orderBy, order) {
  return {
    type: actionNames.listCategories,
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

export function seeDetails(id) {
  return {
    type: actionNames.seeCategoryDetails,
    id
  };
}
