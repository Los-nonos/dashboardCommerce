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

  createAdapt = response => {
    const { status, data } = response;

    if (!isError(status)) {
      return {
        type: actionNames.createCategorySuccessfully,
        message: "Categoria creada satisfactoriamente"
      };
    }

    const { details } = data.errors;
    return {
      type: actionNames.createCategoryFail,
      error: {
        code: status,
        type: null,
        errors: details
      }
    };
  };

  updateAdapt = response => {
    const { status, data } = response;

    if (!isError(status)) {
      return {
        type: actionNames.updateCategorySuccessfully,
        message: "Categoria actualizada satisfactoriamente"
      };
    }

    const { details } = data.errors;
    return {
      type: actionNames.updateCategoryFail,
      error: {
        code: status,
        type: null,
        errors: details
      }
    };
  };
}

export default new CategoryAdapter();
