import { createStore, combineReducers } from "redux";
import cartReducer from "../reducer/CartReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  purchase: cartReducer,
});

const store = createStore(rootReducer);

export default store;
