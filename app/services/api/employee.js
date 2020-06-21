import Api from "./api";

class Employee{
  create = async(dataEmployee) => {
    let response;
    try {
      response = await Api.post(`/employees`, dataEmployee)
    } catch (err) {
      response = err;
    }
  }

  update = async (dataEmployee) => {
    let response;
    try {
      response = await Api.post(`/employees/${dataEmployee.id}`, dataEmployee)
    } catch (err) {
      response = err;
    }
  }

  list = async (page, orderBy, order) => {
    let response;
    try {
      response = await Api.get(`/employees?page=${page}&orderBy=${orderBy}:${order}`)
    } catch (err) {
      response = err;
    }
  }

  seeDetails = async (id) => {
    let response;
    try {
      response = await Api.get(`/users/${id}`)
    } catch (err) {
      response = err;
    }
  }

  enableEmployee = async (id) => {
    let response;
    try {
      response = await Api.get(`/users/${id}/enable`)
    } catch (err) {
      response = err;
    }
  }

  disableEmployee = async (id) => {
    let response;
    try {
      response = await Api.get(`/users/${id}/disable`)
    } catch (err) {
      response = err;
    }
  }
}

export default new Employee();