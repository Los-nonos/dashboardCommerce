import {all, call, put} from 'redux-saga/effects';
import general from '../../services/api/general';
import {actionNames} from "../../utils/constants/actionConstants";
import {pages, redirectTo} from "../../utils/helpers/redirectTo";

export function* checkNotifications(action) {
  const { id } = action;
  const res = yield call(general.checkNotification, id);
  if(res.error) {
    if (res.error.code === 401 || res.error.code === 403) {
      yield all([put({ type: actionNames.handleError, error: res.error })]);
      redirectTo(pages.error);
    }
    yield all([
      put(res),
      put({ type: actionNames.loadingToggle }),
      put({ type: actionNames.showNotification, error: res.error })
    ]);
  }else{
    yield put(res);
  }
}