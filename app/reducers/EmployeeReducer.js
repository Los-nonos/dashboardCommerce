import {actionNames} from "../utils/constants/actionConstants";

export const stateDefault = {
  employees: [],
};

const employeeReducer = (state= stateDefault, action) => {
  switch (action.type) {

    default:
      return state;
  }
}

export default employeeReducer;