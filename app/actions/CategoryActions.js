import {actionNames} from "../utils/constants/actionConstants";

export function categoriesUpdated() {
  return {
    type: actionNames.updateCategories
  }
}


export function createCategory() {
  return {
    type: actionNames.createCategory
  }
}


export function updateCategory() {
  return {
    type: actionNames.updateCategory,
  }
}


export function closeModal() {
  return {
    type: actionNames.closeModal,
  }
}


export function completeCategory() {
  return {
    type: actionNames.completeCategory,
  }
}


export function getCategoryById(id){
  return {
    type: actionNames.getCategoryById,
    id
  }
}


export function previousPage() {
  return {
    type: actionNames.previousCategoryPage
  };
}


export function selectPage(index) {
  return {
    type: actionNames.selectCategoryPage,
    index,
  };
}


export function nextPage() {
  return {
    type: actionNames.nextCategoryPage
  };
}


export function closeNotification() {
  return {
    type: actionNames.closeNotification,
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
    order,
  };
}


export function checkRoles(roles) {
  return {
    type: actionNames.checkRoles,
    roles,
  };
}

export function seeDetails(id) {
  return {
    type: actionNames.seeCategoryDetails,
    id
  }
}