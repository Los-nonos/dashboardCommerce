import { all, takeEvery } from "redux-saga/effects";
import { login, loginFailed } from "../Auth/LoginSagas";
// eslint-disable-next-line import/no-cycle
import { saveSession, deleteSession, renewToken } from "../Auth/SessionSagas";
import { actionNames } from "../../utils/constants/actionConstants";
/* eslint-disable import/no-cycle */
import { checkRoles } from "../Auth/permissionsSagas";
import { loadFilters, searchProducts, seeDetails } from "../Search/SearchSagas";
import {
  createProduct,
  getProductByUuid,
  listProducts,
  updateProduct
} from "../Products/ProductsSagas";
import { listEmployees, seeEmployeeDetails } from "../User/EmployeeSagas";
import {checkNotifications} from "../General/GeneralSagas";
// import { signUp } from "../Auth/signUpSagas";

function* sagas() {
  yield takeEvery(actionNames.login, login);
  yield takeEvery(actionNames.saveSession, saveSession);
  yield takeEvery(actionNames.deleteSession, deleteSession);
  yield takeEvery(actionNames.renewToken, renewToken);
  yield takeEvery(actionNames.loginFailed, loginFailed);
  yield takeEvery(actionNames.checkRoles, checkRoles);
  yield takeEvery(actionNames.loadFilters, loadFilters);
  yield takeEvery(actionNames.search, searchProducts);
  yield takeEvery(actionNames.seeDetails, seeDetails);
  yield takeEvery(actionNames.createProduct, createProduct);
  yield takeEvery(actionNames.updateProduct, updateProduct);
  yield takeEvery(actionNames.listProducts, listProducts);
  yield takeEvery(actionNames.getProductByUuid, getProductByUuid);
  yield takeEvery(actionNames.listEmployees, listEmployees);
  yield takeEvery(actionNames.seeEmployeeDetails, seeEmployeeDetails);
  yield takeEvery(actionNames.checkNotifications, checkNotifications);
  // yield takeEvery(actionNames.signUp, signUp);
}

export default function* rootSaga() {
  yield all([sagas()]);
}
