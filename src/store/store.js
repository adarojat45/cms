import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import {
  imageReducer,
  userReducer,
  categoryReducer,
  postReducer,
  authReducer,
} from "./reducers";

const reducers = combineReducers({
  imageReducer,
  userReducer,
  categoryReducer,
  postReducer,
  authReducer,
});

const store = process.env.REACT_APP_DEV
  ? createStore(reducers, applyMiddleware(thunk, logger))
  : createStore(reducers, applyMiddleware(thunk));

export default store;
