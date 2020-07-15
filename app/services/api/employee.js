import Api from "./api";
import employeeAdapter from "../adapters/employeeAdapter";

class Employee {
  createEmployee = async dataEmployee => {
    console.log(dataEmployee);
    let response;
    try {
      response = await Api.post('employees', dataEmployee, { 'Content-Type': 'application/json', 'Accept': 'application/json' });
    } catch (err) {
      response = err;
    }
    console.log(response);

    return employeeAdapter.createAdapt(response, dataEmployee);
  };

  update = async dataEmployee => {
    let response;
    try {
      response = await Api.post(`/employees/${dataEmployee.id}`, dataEmployee);
    } catch (err) {
      response = err;
    }

    return employeeAdapter.updateAdapt(response, dataEmployee);
  };

  list = async (page, orderBy, order) => {
    let response;
    try {
      response = await Api.get(
        `/employees?page=${page}&orderBy=${orderBy}:${order}`
      );
    } catch (err) {
      response = err;
    }
    return employeeAdapter.listAdapt(response);
  };

  seeDetails = async id => {
    let response;
    try {
      response = await Api.get(`/users/${id}`);
    } catch (err) {
      response = err;
    }
    return employeeAdapter.getByIdAdapt(response);
  };

  enableEmployee = async id => {
    let response;
    try {
      response = await Api.get(`/users/${id}/enable`);
    } catch (err) {
      response = err;
    }

    return employeeAdapter.enableAdapt(response);
  };

  disableEmployee = async id => {
    let response;
    try {
      response = await Api.get(`/users/${id}/disable`);
    } catch (err) {
      response = err;
    }

    return employeeAdapter.disableAdapt(response);
  };
}

export default new Employee();
