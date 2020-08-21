import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { flightsReducer } from "./Reducer/Reducer";
import thunk from "redux-thunk";

const initialState = {};

const reducer = combineReducers({
  allflights: flightsReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
