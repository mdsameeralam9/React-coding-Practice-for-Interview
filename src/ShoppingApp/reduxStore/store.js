import { applyMiddleware, createStore } from "redux";
import {thunk} from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { productsReducer } from "./reducer";

export const store = createStore(
  productsReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
