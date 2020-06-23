import {isError} from "../../utils/helpers/isError";
import {actionNames} from "../../utils/constants/actionConstants";

class GeneralAdapter {
  checkNotificationAdapt = (getResponse) => {
    const { status, data } = getResponse;

    if (!isError(status)) {
      return {
        type: actionNames.checkNotificationsSuccessfully,
        notifications: data.data.notifications,
      };
    }

    const { code, details } = data.errors;
    return {
      type: actionNames.loadEmployeeFail,
      error: {
        code: status,
        type: code,
        errors: details.errors
      }
    };
  }
}

export default new GeneralAdapter();