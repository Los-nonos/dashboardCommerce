import {actionNames} from "../utils/constants/actionConstants";

export const stateDefault = {
  employees: [],
  employeeWithDetails: {},
};

const employeeReducer = (state= stateDefault, action) => {
  switch (action.type) {
    case actionNames.loadEmployeesSuccessful:
      return { ...state, employees: action.employees };
    case actionNames.loadEmployeesFail:
      return { ...state, employees: [] };
    case actionNames.nextEmployeePage:
      if (state.page + 1 <= state.totalPages) {
        return { ...state, page: state.page + 1 };
      }
      return { ...state, page: state.page };
    case actionNames.selectEmployeePage:
      return { ...state, page: action.page };
    case actionNames.previousEmployeePage:
      if (state.page - 1 > 0) {
        return { ...state, page: state.page - 1 };
      }
      return { ...state, page: state.page };
    case actionNames.loadEmployeeSuccessful:
      return { ...state, employeeWithDetails: action.employee };
    case actionNames.loadEmployeeFail:
      return { ...state, employeeWithDetails: {} };
    case actionNames.employeeCreatedSuccessfully:
      return { ...state };
    case actionNames.employeeCreatedFail:
      return { ...state };
    case actionNames.employeeUpdatedSuccessfully:
      return { ...state };
    case actionNames.employeeUpdatedFail:
      return { ...state };
    case actionNames.closeModal:
      return { ...state, modalShow: { createModal: false, updateModal: false }};
    default:
      return state;
  }
}

export default employeeReducer;