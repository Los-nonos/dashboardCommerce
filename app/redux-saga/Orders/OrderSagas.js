import { all, call, put, select } from "redux-saga/effects";
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

const getProductsCart = state => {
  return state.ordersReducer.formData.productsSaved;
};

export function* addProductQuantityFromCart(action) {
  const { id } = action;
  const productsSaved = yield select(getProductsCart);

  let products = productsSaved.map(product => {
    if (product.id === id) {
      product.quantity += 1;
      return product;
    }
    return product;
  });

  yield all([
    put({
      type: actionNames.addProductQuantityFromCartSuccessfully, //TODO: change for function in actions
      products
    })
  ]);
}

export function* removeProductQuantityFromCart(action) {
  const { id } = action;
  const productsSaved = yield select(getProductsCart);

  let products = productsSaved.map(product => {
    if (product.id === id) {
      if (product.quantity === 1) {
        return undefined;
      } else {
        product.quantity -= 1;
        return product;
      }
    }
    return product;
  });

  yield all([
    put({
      type: actionNames.removeProductQuantityFromCartSuccessfully,
      products
    })
  ]);
}

export function* getProductsFromShoppingCart(action) {
  const { products } = action;
  yield put({ type: actionNames.loadingToggle });
  const res = yield call(orders.getProductsFromShoppingCart, products);

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
    yield all([put(res), put({ type: actionNames.loadingToggle })]);
  }
}

export function* removeProductFromCart(action) {
  const { id } = action;
  const products = yield select(getProductsCart);

  const newProducts = products.filter(product => product.id !== id);

  yield put({ type: actionNames.addProductToCartSuccessfully, newProducts });
}

export function* addProductInShoppingCart(action) {
  const { id } = action;

  const products = yield select(getProductsCart);

  products.push({ id, quantity: 1 });

  yield all([
    put({
      type: actionNames.addProductToCartSuccessfully,
      productsSaved: products,
      products: []
    })
  ]);
}
