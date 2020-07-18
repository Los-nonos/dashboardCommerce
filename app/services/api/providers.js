import Api from "./api";
import providersAdapter from "../adapters/providersAdapter";

class Providers {
  list = async () => {
    let response;
    try {
      response = await Api.get("providers/");
    } catch (err) {
      response = err;
    }

    return providersAdapter.listAdapt(response);
  };

  create = async body => {
    let response;
    try {
      response = await Api.post("providers/", body);
    } catch (err) {
      response = err;
    }

    return providersAdapter.createAdapt(response);
  };

  update = async body => {
    let response;
    try {
      response = await Api.post(`providers/${body.id}`, body);
    } catch (err) {
      response = err;
    }

    return providersAdapter.updateAdapt(response);
  };
}

export default new Providers();
