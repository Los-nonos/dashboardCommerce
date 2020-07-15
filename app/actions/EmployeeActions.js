import { actionNames } from "../utils/constants/actionConstants";

export function employeeUpdated() {
  return {
    type: actionNames.employeeUpdated,
  }
}


export function closeModal() {
  return {
    type: actionNames.closeModal,
  }
}


export function seeDetails(id) {
  return {
    type: actionNames.seeEmployeeDetails,
    id
  };
}

export function completeEmployee() {
  return {
    type: actionNames.completeEmployee
  };
}

export function getEmployeeById(id) {
  return {
    type: actionNames.getEmployeeById,
    id
  };
}

export function nextPage() {
  return {
    type: actionNames.nextEmployeePage
  };
}

export function selectPage(index) {
  return {
    type: actionNames.selectEmployeePage,
    index
  };
}

export function previousPage() {
  return {
    type: actionNames.previousEmployeePage
  };
}

export function closeNotification() {
  return {
    type: actionNames.closeNotification
  };
}

export function createEmployee(dataEmployee) {
  return {
    type: actionNames.createEmployee,
    dataEmployee
  };
}

export function updateEmployee(dataEmployee) {
  return {
    type: actionNames.updateEmployee,
    dataEmployee
  };
}

export function showCreateModal() {
  return {
    type: actionNames.showCreateEmployeeModal
  };
}

export function listEmployees(page, orderBy, order) {
  return {
    type: actionNames.listEmployees,
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
