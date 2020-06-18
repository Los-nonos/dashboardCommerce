import Api from './api';
import productAdapter from "../adapters/productAdapter";

class Products {
  create = async (dataProduct) => {
    const body = dataProduct;

    let response;
    try {
      response = await Api.post('products/', body);
    }catch(err) {
      response = err;
    }

    return productAdapter.create(response, body);
  };

  update = async (dataProduct) => {
    const body = dataProduct;

    let response;

    try {
      response = await Api.put(`/products/${body.id}`, body);
    }catch (err) {
      response = err;
    }

    return productAdapter.update(response, body);
  }

  getById = async (id) => {
    let response;
    try {
      response = await Api.get(`/products/${id}`);
    }catch(err) {
      response = err;
    }

    return productAdapter.getById(response);
  };

  list = async (page, orderBy, order) => {
    let response;
    try {
      response = await Api.get(`/search?page=${page}&orderBy=${orderBy}:${order}`)
    } catch (err) {
      response = err;
    }

    return productAdapter.list(response);
  }
}

export default new Products();