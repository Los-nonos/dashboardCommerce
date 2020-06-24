import Api from './api';
import generalAdapter from "../adapters/generalAdapter";

class General {
  checkNotification = async (id) => {
    let response;
    try {
      response = await Api.post('notifications', { id });
    }catch (err) {
      response = err;
    }
    return generalAdapter.checkNotificationAdapt(response)
  }
}

export default new General();