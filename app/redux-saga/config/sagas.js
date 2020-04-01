import { all, takeEvery } from "redux-saga/effects";
import { login, loginFailed } from "../Auth/LoginSagas";
// eslint-disable-next-line import/no-cycle
import { saveSession, deleteSession, renewToken } from "../Auth/SessionSagas";
import { authActionNames } from "../../utils/constants/actionsName/authActionsName";
/* eslint-disable import/no-cycle */
import { checkRoles } from "../Auth/permissionsSgas";
import { signUp } from "../Auth/signUpSagas";

function* sagas() {
  yield takeEvery(authActionNames.login, login);
  yield takeEvery(authActionNames.saveSession, saveSession);
  yield takeEvery(authActionNames.deleteSession, deleteSession);
  yield takeEvery(authActionNames.renewToken, renewToken);
  yield takeEvery(authActionNames.loginFailed, loginFailed);
  yield takeEvery(authActionNames.checkRoles, checkRoles);
  yield takeEvery(authActionNames.signUp, signUp);
}

export default function* rootSaga() {
  yield all([sagas()]);
}
