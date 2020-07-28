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
  listProductsWithLowerStock,
  updateProduct,
  deleteProduct
} from "../Products/ProductsSagas";
import {
  createEmployee,
  listEmployees,
  seeEmployeeDetails,
  updateEmployee
} from "../User/EmployeeSagas";
import { checkNotifications, deleteUser } from "../General/GeneralSagas";
import {
  createCategory,
  listCategories,
  updateCategory
} from "../Categories/CategoriesSagas";
import { createBrand, listBrands, updateBrand } from "../Brands/BrandsSagas";
import { listCustomers } from "../Customers/CustomerSagas";
import {
  addProductInShoppingCart,
  addProductQuantityFromCart,
  getProductsFromShoppingCart,
  listOrders,
  removeProductFromCart,
  removeProductQuantityFromCart,
  searchCustomers,
  selectUser
} from "../Orders/OrderSagas";
import {
  createProvider,
  listProviders,
  updateProvider
} from "../Providers/ProvidersSagas";
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

  yield takeEvery(actionNames.createEmployee, createEmployee);
  yield takeEvery(actionNames.updateEmployee, updateEmployee);
  yield takeEvery(actionNames.seeEmployeeDetails, seeEmployeeDetails);

  yield takeEvery(actionNames.listCategories, listCategories);
  yield takeEvery(actionNames.createCategory, createCategory);
  yield takeEvery(actionNames.updateCategory, updateCategory);

  yield takeEvery(actionNames.listBrands, listBrands);
  yield takeEvery(actionNames.createBrand, createBrand);
  yield takeEvery(actionNames.updateBrand, updateBrand);

  yield takeEvery(actionNames.listCustomers, listCustomers);

  yield takeEvery(actionNames.listOrders, listOrders);

  yield takeEvery(actionNames.listProviders, listProviders);
  yield takeEvery(actionNames.createProvider, createProvider);
  yield takeEvery(actionNames.updateProvider, updateProvider);

  yield takeEvery(actionNames.searchCustomer, searchCustomers);
  yield takeEvery(actionNames.selectedUser, selectUser);

  yield takeEvery(actionNames.addProductToCart, addProductInShoppingCart);
  yield takeEvery(
    actionNames.removeProductQuantityFromCart,
    removeProductQuantityFromCart
  );
  yield takeEvery(
    actionNames.addProductQuantityFromCart,
    addProductQuantityFromCart
  );
  yield takeEvery(actionNames.removeProductFromCart, removeProductFromCart);
  yield takeEvery(
    actionNames.loadProductsFromShoppingCart,
    getProductsFromShoppingCart
  );

  yield takeEvery(
    actionNames.listProductsWithLowerStock,
    listProductsWithLowerStock
  );

  yield takeEvery(actionNames.deleteUser, deleteUser);
  yield takeEvery(actionNames.changeEmployeeState, deleteUser);
  yield takeEvery(actionNames.deleteProduct, deleteProduct);
  // yield takeEvery(actionNames.signUp, signUp);
}

export default function* rootSaga() {
  yield all([sagas()]);
}
