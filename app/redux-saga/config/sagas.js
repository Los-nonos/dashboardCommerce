import { all, takeEvery } from "redux-saga/effects";
import { login, loginFailed } from "../Auth/LoginSagas";
// eslint-disable-next-line import/no-cycle
import { saveSession, deleteSession, renewToken } from "../Auth/SessionSagas";
import { actionNames } from "../../utils/constants/actionConstants";
/* eslint-disable import/no-cycle */
import { checkRoles } from "../Auth/permissionsSagas";
// import { signUp } from "../Auth/signUpSagas";

function* sagas() {
  yield takeEvery(actionNames.login, login);
  yield takeEvery(actionNames.saveSession, saveSession);
  yield takeEvery(actionNames.deleteSession, deleteSession);
  yield takeEvery(actionNames.renewToken, renewToken);
  yield takeEvery(actionNames.loginFailed, loginFailed);
  yield takeEvery(actionNames.checkRoles, checkRoles);
  // yield takeEvery(actionNames.signUp, signUp);
}

export default function* rootSaga() {
  yield all([sagas()]);
}
