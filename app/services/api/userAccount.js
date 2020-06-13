// eslint-disable-next-line import/no-cycle
import Api from "./api";
import userAccountAdapter from "../adapters/userAccountAdapter";

class UserAccount {
  changePassword = async userData => {
    const body = userData;

    let changeResponse;
    try {
      changeResponse = await Api.post("auth/change-password/", body);
    } catch (err) {
      changeResponse = err;
    }

    return userAccountAdapter.changePassword(changeResponse);
  };
}

export default new UserAccount();
