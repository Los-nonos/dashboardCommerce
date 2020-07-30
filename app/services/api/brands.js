import Api from "./api";
import brandAdapter from "../adapters/brandAdapter";

class Brands {
  list = async (page, order, orderBy) => {
    let response;
    try {
      response = await Api.get(
        `/brands?page=${page}&orderBy=${orderBy}:${order}`
      );
    } catch (err) {
      response = err;
    }

    return brandAdapter.listAdapt(response);
  };

  create = async body => {
    let response;
    try {
      response = await Api.post(`/brands`, body);
    } catch (err) {
      response = err;
    }

    return brandAdapter.createAdapt(response);
  };

  update = async body => {
    let response;
    try {
      response = await Api.put(`/brands/${body.id}`, body);
    }catch (err) {
      response = err;
    }

    return brandAdapter.updateAdapt(response);
  }
}

export default new Brands();
