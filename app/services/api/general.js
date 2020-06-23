import Api from './api';
import generalAdapter from "../adapters/generalAdapter";

class General {
  checkNotification = (token) => {
    let response;
    try {
      response = Api.post('notifications', { token });
    }catch (err) {
      response = err;
    }
    return generalAdapter.checkNotificationAdapt(response)
  }
}

export default new General();