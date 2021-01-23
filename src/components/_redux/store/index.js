import { createStore, combineReducers, applyMiddleware } from "redux";
import { logger, promise } from "components/_redux/store/middlewares";
import collectionReducer from "components/_redux/reducers/collection";
import userReducer from "components/_redux/reducers/auth";

const rootReducer = combineReducers({
  //add reducers here
  collection: collectionReducer,
  user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger, promise));

export default store;
