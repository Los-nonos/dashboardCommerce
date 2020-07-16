import { all, call, put } from "redux-saga/effects";
import { actionNames } from "../../utils/constants/actionConstants";
import employee from "../../services/api/employee";
import { pages, redirectTo } from "../../utils/helpers/redirectTo";

export function* createEmployee(action) {
  const { dataEmployee } = action;
  yield all([put({ type: actionNames.loadingToggle })]);
  const res = yield call(employee.createEmployee, dataEmployee);

  if (res.error) {
    if (res.error.code === 401 || res.error.code === 403) {
      yield all([put({ type: actionNames.handleError, error: res.error })]);
      redirectTo(pages.error);
    }
    yield all([
      put(res),
      put({ type: actionNames.loadingToggle }),
      put({ type: actionNames.showNotification, error: res.error })
    ]);
  } else {
    const response = yield call(employee.seeDetails, res.employee.id);
    yield all([
      put(res),
      put({ type: actionNames.loadingToggle }),
      put({ type: actionNames.showNotification, message: res.message }),
      put({ type: actionNames.closeModal }),
      put(response),
      put({ type: actionNames.showUpdateEmployeeModal })
    ]);
  }
}

export function* updateEmployee(action) {
  const { dataEmployee } = action;
  yield all([put({ type: actionNames.loadingToggle })]);
  const res = yield call(employee.update, dataEmployee);

  if (res.error) {
    if (res.error.code === 401 || res.error.code === 403) {
      yield all([put({ type: actionNames.handleError, error: res.error })]);
      redirectTo(pages.error);
    }
    yield all([
      put(res),
      put({ type: actionNames.loadingToggle }),
      put({ type: actionNames.showNotification, error: res.error })
    ]);
  } else {
    yield all([
      put(res),
      put({ type: actionNames.loadingToggle }),
      put({ type: actionNames.showNotification, message: res.message }),
      put({ type: actionNames.closeModal })
    ]);
  }
}

export function* seeEmployeeDetails(action) {
  const { id } = action;

  yield all([put({ type: actionNames.loadingToggle })]);
  const res = yield call(employee.seeDetails, id);

  if (res.error) {
    if (res.error.code === 401 || res.error.code === 403) {
      yield all([put({ type: actionNames.handleError, error: res.error })]);
      redirectTo(pages.error);
    }
    yield all([
      put(res),
      put({ type: actionNames.loadingToggle }),
      put({ type: actionNames.showNotification, error: res.error })
    ]);
  } else {
    yield all([
      put(res),
      put({ type: actionNames.loadingToggle }),
      put({ type: actionNames.showUpdateEmployeeModal })
    ]);
  }
}

export function* listEmployees(action) {
  let { page, orderBy, order } = action;
  orderBy = orderBy ? orderBy : "registrationDate";
  order = order ? order : "asc";
  yield put({ type: actionNames.loadingToggle });
  const res = yield call(employee.list, page, orderBy, order);

  if (res.error) {
    if (res.error.code === 401 || res.error.code === 403) {
      yield all([put({ type: actionNames.handleError, error: res.error })]);
      redirectTo(pages.error);
    }
    yield all([
      put(res),
      put({ type: actionNames.loadingToggle }),
      put({ type: actionNames.showNotification, error: res.error })
    ]);
  } else {
    yield put(res);
    yield put({ type: actionNames.loadingToggle });
  }
}

export function* enableEmployee(action) {
  const { id } = action;

  yield all([put({ type: actionNames.loadingToggle })]);
  const res = yield call(employee.enableEmployee, id);

  if (res.error) {
    if (res.error.code === 401 || res.error.code === 403) {
      yield all([put({ type: actionNames.handleError, error: res.error })]);
      redirectTo(pages.error);
    }
    yield all([
      put(res),
      put({ type: actionNames.loadingToggle }),
      put({ type: actionNames.showNotification, error: res.error })
    ]);
  } else {
    yield all([
      put(res),
      put({ type: actionNames.loadingToggle }),
      put({
        type: actionNames.showNotification,
        message: "El empleado a sido habilitado exitosamente"
      })
    ]);
  }
}

export function* disableEmployee(action) {
  const { id } = action;

  yield all([put({ type: actionNames.loadingToggle })]);
  const res = yield call(employee.disableEmployee, id);

  if (res.error) {
    if (res.error.code === 401 || res.error.code === 403) {
      yield all([put({ type: actionNames.handleError, error: res.error })]);
      redirectTo(pages.error);
    }
    yield all([
      put(res),
      put({ type: actionNames.loadingToggle }),
      put({ type: actionNames.showNotification, error: res.error })
    ]);
  } else {
    yield all([
      put(res),
      put({ type: actionNames.loadingToggle }),
      put({
        type: actionNames.showNotification,
        message: "El empleado a sido deshabilitado exitosamente"
      })
    ]);
  }
}
