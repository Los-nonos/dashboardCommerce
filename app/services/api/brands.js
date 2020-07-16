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
}

export default new Brands();
