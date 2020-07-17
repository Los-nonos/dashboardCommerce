import Api from "./api";
import customerAdapter from "../adapters/customersAdapter";

class Customers {
  list = async (page, orderBy) => {
    let response;
    try {
      response = await Api.get(`customers/?page=${page}&orderBy=${orderBy}`);
    } catch (err) {
      response = err;
    }

    return customerAdapter.listAdapt(response);
  };
}

export default new Customers();
