import { actionNames } from "../utils/constants/actionConstants";

export function updateProvider(dataProvider) {
  return {
    type: actionNames.updateProvider,
    dataProvider
  };
}

export function createProvider(dataProvider) {
  return {
    type: actionNames.createProvider,
    dataProvider
  };
}

export function closeModal() {
  return {
    type: actionNames.closeModal
  };
}

export function completeProvider() {
  return {
    type: actionNames.completeProvider
  };
}

export function getProviderById(id) {
  return {
    type: actionNames.getProviderById,
    id
  };
}

export function nextPage() {
  return {
    type: actionNames.nextProvidersPage
  };
}

export function selectPage(index) {
  return {
    type: actionNames.selectProvidersPage,
    index
  };
}

export function previousPage() {
  return {
    type: actionNames.previousProvidersPage
  };
}

export function closeNotification() {
  return {
    type: actionNames.closeNotification
  };
}

export function showCreateModal() {
  return {
    type: actionNames.showCreateProvidersModal
  };
}

export function listProviders(page, orderBy, order) {
  return {
    type: actionNames.listProviders,
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
