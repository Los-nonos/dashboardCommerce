import { isError } from "../../utils/helpers/isError";
import { actionNames } from "../../utils/constants/actionConstants";

class CategoryAdapter {
  listAdapt = listResponse => {
    const { status, data } = listResponse;
    if (!isError(status)) {
      return {
        type: actionNames.loadCategoriesSuccessful,
        categories: data.data,
        totalPages: data.pageCount
      };
    }

    const { code, details } = data.errors;
    return {
      type: actionNames.loadCategoriesFail,
      error: {
        code: status,
        type: code,
        errors: details
      }
    };
  };
}

export default new CategoryAdapter();
