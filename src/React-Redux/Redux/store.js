import { createStore } from "redux";
import { rootReducers } from "./reducers/rootReducers";

export const store = createStore(rootReducers)