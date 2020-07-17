import { isError } from "../../utils/helpers/isError";
import { actionNames } from "../../utils/constants/actionConstants";

class CustomersAdapter {
  listAdapt = response => {
    const { status, data } = response;

    if (!isError(status)) {
      return {
        type: actionNames.loadCustomersSuccessfully,
        customers: data.data,
        totalPages: data.pageCount
      };
    }

    const { details } = data.error;
    return {
      type: actionNames.loadCustomersFail,
      error: {
        code: status,
        type: null,
        errors: details
      }
    };
  };
}

export default new CustomersAdapter();
