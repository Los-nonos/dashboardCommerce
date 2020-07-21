import Api from "./api";
import ordersAdapter from "../adapters/ordersAdapter";
import customersAdapter from "../adapters/customersAdapter";

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

  searchCustomers = async (page, queryFilters) => {
    let response;
    try {
      response = await Api.get(`customers/?page=${page}&${queryFilters}`);
    } catch (err) {
      response = err;
    }

    return customersAdapter.listAdapt(response);
  };

  getCustomer = async id => {
    let response;

    try {
      response = await Api.get(`customers/${id}`);
    } catch (err) {
      response = err;
    }

    return ordersAdapter.getCustomerAdapt(response);
  };

  getProductsFromShoppingCart = async products => {
    let response;

    try {
      response = await Api.post("payments/products", { products });
    } catch (err) {
      response = err;
    }

    return ordersAdapter.getProductsFromCartAdapt(response);
  };
}

export default new Orders();
