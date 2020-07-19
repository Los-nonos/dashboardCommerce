import { all, call, put } from "redux-saga/effects";
import { actionNames } from "../../utils/constants/actionConstants";
import orders from "../../services/api/orders";
import { pages, redirectTo } from "../../utils/helpers/redirectTo";

export function* listOrders(action) {
  const { page } = action;
  yield put({ type: actionNames.loadingToggle });
  const res = yield call(orders.list, page);

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

export function* searchCustomers(action) {
  const { filters } = action;

  yield put({ type: actionNames.loadingToggle });

  let queryFilters = "";
  const page = 1;

  Object.keys(filters).forEach(key => {
    const filterName = key;
    const value = filters[key];

    if (filters === "" && value !== "" && value !== []) {
      queryFilters = `${filterName}=${value}`;
    } else if (value !== "" && value !== []) {
      queryFilters = `${queryFilters}&${filterName}=${value}`;
    }
  });

  const res = yield call(orders.searchCustomers, page, queryFilters);

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

export function* selectUser(action) {
  const { id } = action;
  yield put({ type: actionNames.loadingToggle });
  const res = yield call(orders.getCustomer, id);

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
