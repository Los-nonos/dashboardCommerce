import {isError} from "../../utils/helpers/isError";
import {actionNames} from "../../utils/constants/actionConstants";
import {errorProducts} from "../../utils/presenter/errorPresenter";

class EmployeeAdapter {
  createAdapt = (createResponse, body) => {
    const { status, data } = createResponse;
    console.log(createResponse);
    if (!isError(status)) {
      return {
        type: actionNames.employeeCreatedSuccessfully,
        message: 'Producto creado satisfactoriamente',
        product: data.data
      };
    }

    return errorProducts(data, status, body, actionNames.employeeCreatedFail)
  }

  updateAdapt = (updateResponse, body) => {
    const { status, data } = updateResponse;

    if (!isError(status)) {
      return {
        type: actionNames.employeeUpdatedSuccessfully,
        message: 'Producto actualizado satisfactoriamente',
        product: data.data
      };
    }

    return errorProducts(data, status, body, actionNames.employeeUpdatedFail)
  }

  getByIdAdapt = (getResponse) => {
    const { status, data } = getResponse;

    if (!isError(status)) {
      return {
        type: actionNames.loadEmployeeSuccessful,
        product: data.data,
      };
    }

    const { code, details } = data.errors;
    return {
      type: actionNames.loadEmployeeFail,
      error: {
        code: status,
        type: code,
        errors: details.errors,
      },
    };
  }

  listAdapt = (listResponse) => {
    const { status, data } = listResponse;

    if (!isError(status)) {
      return {
        type: actionNames.loadEmployeesSuccessful,
        products: data.items,
        totalPages: data.pageCount,
      };
    }

    const { code, details } = data.errors;
    return {
      type: actionNames.loadEmployeesFail,
      error: {
        code: status,
        type: code,
        errors: details,
      },
    };
  }
}

export default new EmployeeAdapter();