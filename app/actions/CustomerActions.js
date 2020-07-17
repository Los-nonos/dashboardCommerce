import { actionNames } from "../utils/constants/actionConstants";

export function createCustomer(dataCustomer) {
  return {
    type: actionNames.createCustomer,
    dataCustomer
  };
}

export function updateCustomer(dataCustomer) {
  return {
    type: actionNames.updateCustomer,
    dataCustomer
  };
}

export function closeModal() {
  return {
    type: actionNames.closeModal
  };
}

export function showUpdateModal() {
  return {
    type: actionNames.showUpdateCustomerModal
  };
}

export function completeCustomer() {
  return {
    type: actionNames.completeCustomer
  };
}

export function getCustomerById(id) {
  return {
    type: actionNames.getCustomerById,
    id
  };
}

export function nextPage() {
  return {
    type: actionNames.nextCustomerPage
  };
}

export function selectPage(index) {
  return {
    type: actionNames.selectCustomerPage,
    index
  };
}

export function previousPage() {
  return {
    type: actionNames.previousCustomerPage
  };
}

export function closeNotification() {
  return {
    type: actionNames.closeNotification
  };
}

export function showCreateModal() {
  return {
    type: actionNames.showCreateCustomersModal
  };
}

export function listCustomers(page, orderBy, order) {
  return {
    type: actionNames.listCustomers,
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
