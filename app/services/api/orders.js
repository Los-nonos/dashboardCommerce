import Api from "./api";
import ordersAdapter from "../adapters/ordersAdapter";

class Orders {
  list = async page => {
    let response;
    try {
      response = await Api.get(`orders/all?page=${page}`);
    } catch (err) {
      response = err;
    }

    return ordersAdapter.listAdapt(response);
  };
}

export default new Orders();
