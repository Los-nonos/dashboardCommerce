import { all, call, put } from "redux-saga/effects";
import { actionNames } from "../../utils/constants/actionConstants";
import category from "../../services/api/category";
import { pages, redirectTo } from "../../utils/helpers/redirectTo";

export function* listCategories(_action) {
  yield put({ type: actionNames.loadingToggle });
  const res = yield call(category.list);

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

export function* createCategory(action) {}

export function* updateCategory(action) {}
