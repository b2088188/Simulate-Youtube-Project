import {
  SIGNUP_SUCCESS,
  LOGIN_SUCCESS,
  LOADUSER_SUCCESS,
  LOGOUT_SUCCESS,
  UPDATE_USERDATASUCCESS,
  NOT_LOGIN,
  AUTH_FAIL,
  CLEAR_ERROR,
  LOADING,
} from "../types";

function authReducer(currentState, action) {
  switch (action.type) {
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
    case LOADUSER_SUCCESS:
      return {
        ...currentState,
        user: action.payload.user,
        //token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...currentState,
        user: null,
        token: null,
        isAuthenticated: false,
      };
    case UPDATE_USERDATASUCCESS:
      return {
        ...currentState,
        loading: false,
        user: action.payload.user,
      };
    case NOT_LOGIN:
      return {
        ...currentState,
        isAuthenticated: false,
        loading: false,
      };
    case AUTH_FAIL:
      return {
        ...currentState,
        loading: false,
        error: action.payload.message,
      };
    case CLEAR_ERROR:
      return {
        ...currentState,
        error: null,
      };
    case LOADING:
      return {
        ...currentState,
        loading: true,
      };
    default:
      return currentState;
  }
}
export default authReducer;
