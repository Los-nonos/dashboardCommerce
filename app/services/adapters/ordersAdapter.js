import { isError } from "../../utils/helpers/isError";
import { actionNames } from "../../utils/constants/actionConstants";

class OrdersAdapter {
  listAdapt = response => {
    const { status, data } = response;
    if (!isError(status)) {
      return {
        type: actionNames.loadOrdersSuccessful,
        orders: data.data,
        totalPages: data.pageCount
      };
    }

    const { code, details } = data.errors;
    return {
      type: actionNames.loadOrdersFail,
      error: {
        code: status,
        type: code,
        errors: details
      }
    };
  };

  getCustomerAdapt = response => {
    const { status, data } = response;
    if (!isError(status)) {
      return {
        type: actionNames.getCustomerByOrderSuccessfully,
        customer: data.data
      };
    }

    const { code, details } = data.errors;
    return {
      type: actionNames.getCustomerByOrderFail,
      error: {
        code: status,
        type: code,
        errors: details
      }
    };
  };

  getProductsFromCartAdapt = response => {
    const { status, data } = response;

    if (!isError(status)) {
      return {
        type: actionNames.loadProductsFromShoppingCartSuccessfully,
        products: data.data
      };
    }
    const { error } = data;

    return {
      type: actionNames.loadProductsFromShoppingCartFail,
      error: {
        code: status,
        type: null,
        errors: error
      }
    };
  };
}

export default new OrdersAdapter();
