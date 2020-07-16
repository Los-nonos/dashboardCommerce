import Api from "./api";
import categoryAdapter from "../adapters/categoryAdapter";

class Category {
  list = async () => {
    let response;
    try {
      response = await Api.get(`categories/`);
    } catch (err) {
      response = err;
    }

    return categoryAdapter.listAdapt(response);
  };
}

export default new Category();
