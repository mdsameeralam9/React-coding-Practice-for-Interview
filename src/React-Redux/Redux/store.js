import { applyMiddleware, createStore } from "redux";
import { rootReducers } from "./reducers/rootReducers";
import { thunk } from "redux-thunk";

export const store = createStore(rootReducers, applyMiddleware(thunk))