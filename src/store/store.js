import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import {
  featureReducer,
  orderReducer,
  packageReducer,
  templateReducer,
  imageReducer,
  songReducer,
  videoReducer,
  userReducer,
  partnerReducer,
  categoryReducer,
} from "./reducers";

const reducers = combineReducers({
  featureReducer,
  orderReducer,
  packageReducer,
  templateReducer,
  imageReducer,
  songReducer,
  videoReducer,
  userReducer,
  partnerReducer,
  categoryReducer,
});

const store = process.env.REACT_APP_DEV
  ? createStore(reducers, applyMiddleware(thunk, logger))
  : createStore(reducers, applyMiddleware(thunk));

export default store;
