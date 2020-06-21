import {isError} from "../../utils/helpers/isError";
import {actionNames} from "../../utils/constants/actionConstants";
import {errorProducts} from "../../utils/presenter/errorPresenter";

class ProductAdapter {
  createAdapt = (createResponse, body) => {
    const { status, data } = createResponse;
    console.log(createResponse);
    if (!isError(status)) {
      return {
        type: actionNames.productCreatedSuccessfully,
        message: 'Producto creado satisfactoriamente',
        product: data.data
      };
    }

    return errorProducts(data, status, body, actionNames.productCreatedFail)
  }

  updateAdapt = (updateResponse, body) => {
    const { status, data } = updateResponse;

    if (!isError(status)) {
      return {
        type: actionNames.productUpdatedSuccessfully,
        message: 'Producto actualizado satisfactoriamente',
        product: data.data
      };
    }

    return errorProducts(data, status, body, actionNames.productUpdatedFail)
  }

  getByIdAdapt = (getResponse) => {
    const { status, data } = getResponse;

    if (!isError(status)) {
      return {
        type: actionNames.loadProductSuccessful,
        product: data.data,
      };
    }

    const { code, details } = data.errors;
    return {
      type: actionNames.loadProductFail,
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
        type: actionNames.loadProductsSuccessful,
        products: data.items,
        totalPages: data.pageCount,
      };
    }

    const { code, details } = data.errors;
    return {
      type: actionNames.loadProductsFail,
      error: {
        code: status,
        type: code,
        errors: details,
      },
    };
  }
}

export default new ProductAdapter();