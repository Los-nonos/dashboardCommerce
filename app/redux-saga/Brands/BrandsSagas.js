import { all, call, put } from "redux-saga/effects";
import { actionNames } from "../../utils/constants/actionConstants";
import brands from "../../services/api/brands";
import { pages, redirectTo } from "../../utils/helpers/redirectTo";

export function* listBrands(action) {
  let { page, orderBy, order } = action;
  orderBy = orderBy ? orderBy : "registrationDate";
  order = order ? order : "asc";
  yield put({ type: actionNames.loadingToggle });
  const res = yield call(brands.list, page, orderBy, order);

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

export function* createBrand(action) {
  let { dataBrand } = action;
  yield put({ type: actionNames.loadingToggle });
  const res = yield call(brands.create, dataBrand);

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
    yield put({ type: actionNames.closeModal });
    yield put({ type: actionNames.listBrands });
  }
}

export function* updateBrand(action) {}
