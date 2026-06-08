import { combineReducers } from "redux";
import { productsReducers } from "./products";

export const rootReducers = combineReducers({
    products: productsReducers
});