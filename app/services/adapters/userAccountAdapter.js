import { isError } from "../../utils/helpers/isError";
import { actionNames } from "../../utils/constants/actionConstants";
import { errorUserPassword } from "../../utils/presenter/errorPresenter";

class UserAccountAdapter {
  changePassword = changeResponse => {
    const { status, data } = changeResponse;
    if (!isError(status)) {
      return {
        type: actionNames.passwordChangedSuccessfully,
        message: "Password changed successfully"
      };
    }

    if (data.errors.details.errors) {
      return errorUserPassword(data, status, actionNames.passwordChangedFail);
    }
    const { code, details } = data.errors;
    return {
      type: actionNames.passwordChangedFail,
      error: {
        code: status,
        type: code,
        detail: details
      }
    };
  };
}

export default new UserAccountAdapter();
