import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

const user = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  authR: { user },
};

if (localStorage.getItem("user")) {
  const decodedToken = JSON.parse(localStorage.getItem("user"));
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("user");
  } else {
    initialState.authR.user = decodedToken;
  }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
