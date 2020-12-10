import { ActionTypes } from "./ActionTypes";
import api from "../../utils/axios";

export const loadUser = () => async (dispatch, getState) => {
  dispatch({
    type: ActionTypes.USER_LOAD_REQUEST,
    payload: {},
  });
  try {
    const { data } = await api.post("/api/users/user", tokenConfig(getState));
    dispatch({ type: ActionTypes.USER_LOAD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ActionTypes.USER_LOAD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const login = (loginDetails) => async (dispatch) => {
  dispatch({
    type: ActionTypes.USER_LOGIN_REQUEST,
    payload: loginDetails,
  });
  try {
    const { data } = await api.post("/api/users/login", loginDetails);
    console.log(data);
    localStorage.setItem("user", JSON.stringify(data));
    dispatch({
      type: ActionTypes.USER_LOGIN_SUCCESS,
      payload: JSON.stringify(data),
    });
  } catch (error) {
    dispatch({
      type: ActionTypes.USER_LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const register = (signupDetails) => async (dispatch) => {
  dispatch({
    type: ActionTypes.USER_REGISTER_REQUEST,
    payload: signupDetails,
  });
  try {
    const { data } = await api.post("/api/users/register", signupDetails);
    dispatch({ type: ActionTypes.USER_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ActionTypes.USER_REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateUser = ({ userId, name, email, password }) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: ActionTypes.USER_UPDATE_REQUEST,
    payload: { userId, name, email, password },
  });
  try {
    const { data } = await api.put("/api/users/" + userId, {
      name,
      email,
      password,
    });
    dispatch({ type: ActionTypes.USER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ActionTypes.USER_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// logout user
export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem("user");
  dispatch({ type: ActionTypes.USER_LOGOUT });
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from auth state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers.authorization = token;
  }

  return config;
};

// //"http://localhost:9000/";

// // get current user
// const currentUser = JSON.parse(localStorage.getItem("user"));
// let headers = {};

// // attach user"s token to requests
// if (currentUser && currentUser.token) {
//   headers.Authorization = `Bearer ${currentUser.token}`;
// }
