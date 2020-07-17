import { call, put, all } from "redux-saga/effects";
import product from "../../services/api/products";
import { actionNames } from "../../utils/constants/actionConstants";
import { pages, redirectTo } from "../../utils/helpers/redirectTo";

export function* createProduct(action) {
  const { dataProduct } = action;
  yield put({ type: actionNames.loadingToggle });
  const res = yield call(product.create, dataProduct);

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
    const response = yield call(product.getById, res.product.id);
    yield all([
      put(res),
      put({ type: actionNames.loadingToggle }),
      put({ type: actionNames.showNotification, message: res.message }),
      put({ type: actionNames.closeModal }),
      put(response),
      put({ type: actionNames.showUpdateProductModal })
    ]);
  }
}

export function* updateProduct(action) {
  const { dataProduct } = action;
  yield put({ type: actionNames.loadingToggle });
  const res = yield call(product.update, dataProduct);

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
      put({ type: actionNames.closeModal }),
      put({ type: actionNames.showNotification, message: res.message })
    ]);
    //redirectTo(pages.closeModal);
  }
}

export function* listProducts(action) {
  let { page, orderBy, order } = action;
  orderBy = orderBy ? orderBy : "registrationDate";
  order = order ? order : "asc";
  yield put({ type: actionNames.loadingToggle });
  const res = yield call(product.list, page, orderBy, order);

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

export function* getProductByUuid(action) {
  let { uuid } = action;
  yield put({ type: actionNames.loadingToggle });
  const res = yield call(product.getById, uuid);

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
    yield put({ type: actionNames.showUpdateProductModal });
  }
}
