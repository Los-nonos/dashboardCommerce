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
}

export default new OrdersAdapter();
