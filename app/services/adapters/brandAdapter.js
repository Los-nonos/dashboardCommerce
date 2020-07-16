import { isError } from "../../utils/helpers/isError";
import { actionNames } from "../../utils/constants/actionConstants";

class BrandAdapter {
  listAdapt = listResponse => {
    const { status, data } = listResponse;
    if (!isError(status)) {
      return {
        type: actionNames.loadBrandsSuccessful,
        brands: data.data.brands,
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
}

export default new BrandAdapter();
