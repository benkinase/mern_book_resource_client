import { ActionTypes } from "../actions/ActionTypes";

function userLoginReducer(state = {}, action) {
  switch (action.type) {
    case ActionTypes.USER_LOGIN_REQUEST:
      return { loading: true };
    case ActionTypes.USER_LOGIN_SUCCESS:
      return { loading: false, user: action.payload };
    case ActionTypes.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case ActionTypes.USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

function userRegisterReducer(state = {}, action) {
  switch (action.type) {
    case ActionTypes.USER_REGISTER_REQUEST:
      return { loading: true };
    case ActionTypes.USER_REGISTER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        message: action.payload.success,
      };
    case ActionTypes.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function userUpdateReducer(state = {}, action) {
  switch (action.type) {
    case ActionTypes.USER_UPDATE_REQUEST:
      return { loading: true };
    case ActionTypes.USER_UPDATE_SUCCESS:
      return { loading: false, user: action.payload };
    case ActionTypes.USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
export { userLoginReducer, userRegisterReducer, userUpdateReducer };
