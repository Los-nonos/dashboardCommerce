import { isError } from "../../utils/helpers/isError";
import { actionNames } from "../../utils/constants/actionConstants";

class BrandAdapter {
  listAdapt = listResponse => {
    const { status, data } = listResponse;
    if (!isError(status)) {
      return {
        type: actionNames.loadBrandsSuccessfully,
        brands: data.data,
        totalPages: data.pageCount
      };
    }

    const { code, details } = data.errors;
    return {
      type: actionNames.loadBrandsFail,
      error: {
        code: status,
        type: code,
        errors: details
      }
    };
  };

  createAdapt = response => {
    const { status, data } = response;
    if (!isError(status)) {
      return {
        type: actionNames.createBrandSuccessfully,
        message: data.data
      };
    }

    const { details } = data.errors;
    return {
      type: actionNames.createBrandFail,
      error: {
        code: status,
        type: "",
        errors: details
      }
    };
  };
}

export default new BrandAdapter();
