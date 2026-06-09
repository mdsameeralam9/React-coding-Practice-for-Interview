import { combineReducers } from "redux";
import { productsReducers } from "./products";
import { productDetailReducer } from "./productDetail";

export const rootReducers = combineReducers({
    products: productsReducers,
    product: productDetailReducer
});