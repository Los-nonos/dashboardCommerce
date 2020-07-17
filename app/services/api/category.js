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

  createCategory = async body => {
    let response;

    try {
      response = await Api.post("categories/", body);
    } catch (err) {
      response = err;
    }

    return categoryAdapter.createAdapt(response);
  };

  updateCategory = async body => {
    let response;

    try {
      response = await Api.put(`categories/${body.id}`, body);
    } catch (err) {
      response = err;
    }

    return categoryAdapter.updateAdapt(response);
  };
}

export default new Category();
