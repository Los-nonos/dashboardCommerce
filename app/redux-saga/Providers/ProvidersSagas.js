import { all, put, call } from "redux-saga/effects";
import { actionNames } from "../../utils/constants/actionConstants";
import { pages, redirectTo } from "../../utils/helpers/redirectTo";
import providers from "../../services/api/providers";

export function* listProviders(action) {
  yield put({ type: actionNames.loadingToggle });
  const res = yield call(providers.list);

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

export function* createProvider(action) {
  const { dataProvider } = action;
  yield put({ type: actionNames.loadingToggle });
  const res = yield call(providers.create, dataProvider);

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
    yield put({ type: actionNames.listProviders });
  }
}

export function* updateProvider(action) {
  const { dataProvider } = action;
  yield put({ type: actionNames.loadingToggle });
  const res = yield call(providers.update, dataProvider);

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
    yield put({ type: actionNames.listProviders });
  }
}
