import { isError } from "../../utils/helpers/isError";
import { actionNames } from "../../utils/constants/actionConstants";

class GeneralAdapter {
  checkNotificationAdapt = getResponse => {
    const { status, data } = getResponse;

    if (!isError(status)) {
      return {
        type: actionNames.checkNotificationsSuccessfully,
        notifications: data.data.notifications
      };
    }

    const details = data.error;
    return {
      type: actionNames.checkNotificationsFail,
      error: {
        code: status,
        type: null,
        errors: details
      }
    };
  };
}

export default new GeneralAdapter();
