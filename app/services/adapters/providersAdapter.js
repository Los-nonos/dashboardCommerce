import { isError } from "../../utils/helpers/isError";
import { actionNames } from "../../utils/constants/actionConstants";

class ProvidersAdapter {
  listAdapt = response => {
    const { status, data } = response;
    if (!isError(status)) {
      return {
        type: actionNames.loadProvidersSuccessful,
        providers: data.data,
        totalPages: data.pageCount
      };
    }

    const { details, error } = data;
    return {
      type: actionNames.loadProvidersFail,
      error: {
        code: status,
        type: error,
        errors: details
      }
    };
  };

  createAdapt = response => {
    const { status, data } = response;
    if (!isError(status)) {
      return {
        type: actionNames.createProviderSuccessful,
        message: "Proveedor creado satisfactoriamente"
      };
    }

    const { details, error } = data;
    return {
      type: actionNames.createProviderFail,
      error: {
        code: status,
        type: error,
        errors: details
      }
    };
  };

  updateAdapt = response => {
    const { status, data } = response;
    if (!isError(status)) {
      return {
        type: actionNames.updateProviderSuccessful,
        message: "Proveedor actualizado satisfactoriamente"
      };
    }

    const { details, error } = data;
    return {
      type: actionNames.updateProviderFail,
      error: {
        code: status,
        type: error,
        errors: details
      }
    };
  };
}

export default new ProvidersAdapter();
