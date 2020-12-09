import { ActionTypes } from "./ActionTypes";
import api from "../../utils/axios";

const login = (loginDetails) => async (dispatch) => {
  dispatch({
    type: ActionTypes.USER_LOGIN_REQUEST,
    payload: loginDetails,
  });
  try {
    const { data } = await api.post("/api/users/login", loginDetails);
    localStorage.setItem("user", JSON.stringify(data));
    dispatch({ type: ActionTypes.USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ActionTypes.USER_LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

const register = (signupDetails) => async (dispatch) => {
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
// const getUser = (id) => async (dispatch) => {
//   dispatch({
//     type: ActionTypes.USER_PROFILE_REQUEST,
//     payload: id,
//   });
//   try {
//     const { data } = await api.post("/api/users/" + id);
//     dispatch({ type: ActionTypes.USER_PROFILE_SUCCESS, payload: data });
//     console.log(data);
//     //localStorage.setItem("profile", data);
//     //Cookie.set("user", JSON.stringify(data));
//   } catch (error) {
//     dispatch({
//       type: ActionTypes.USER_PROFILE_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

const updateUser = ({ userId, name, email, password }) => async (
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
const logoutUser = () => async (dispatch) => {
  localStorage.removeItem("user");
  dispatch({ type: ActionTypes.USER_LOGOUT });
};

export { login, register, logoutUser, updateUser };
