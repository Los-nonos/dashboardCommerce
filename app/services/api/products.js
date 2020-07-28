import Api from "./api";
import productAdapter from "../adapters/productAdapter";

class Products {
  create = async dataProduct => {
    const body = dataProduct;

    let response;
    try {
      response = await Api.post("products/", body);
    } catch (err) {
      response = err;
    }

    return productAdapter.createAdapt(response, body);
  };

  update = async dataProduct => {
    const body = dataProduct;

    let response;
    try {
      response = await Api.put(`products/${body.id}`, body);
    } catch (err) {
      response = err;
    }

    return productAdapter.updateAdapt(response, body);
  };

  getById = async id => {
    let response;
    try {
      response = await Api.get(`products/${id}`);
    } catch (err) {
      response = err;
    }

    return productAdapter.getByIdAdapt(response);
  };

  list = async (page, orderBy, order) => {
    let response;
    try {
      response = await Api.get(
        `/search?page=${page}&orderBy=${orderBy}:${order}`
      );
    } catch (err) {
      response = err;
    }

    return productAdapter.listAdapt(response);
  };

  listWithStock = async (page, orderBy, order, minValue) => {
    let response;

    try {
      response = await Api.get(
        `/inventory/?page=${page}&orderBy=${orderBy}:${order}&minValue=${minValue}`
      );
    } catch (err) {
      response = err;
    }

    return productAdapter.listWithStockAdapt(response);
  };

  delete = async id => {
    let response;
    try {
      response = await Api.delete(`products/${id}`);
    } catch (err) {
      response = err;
    }

    return productAdapter.deleteAdapt(response);
  };
}

export default new Products();
