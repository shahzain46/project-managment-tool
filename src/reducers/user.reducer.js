import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, PROFILE_GET, LOGIN_ERROR, USER_VERIFY, USER_ACTIVATE,
} from '../actions';
import Auth from '../Auth';

const initialState = {
  user: {},
  token: Auth.getToken(),
  isFetching: false,
  isFetched: false,
  isAuthenticated: Auth.isUserAuthenticated(),
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state, isFetching: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user.user,
        token: action.user.token,
        isFetching: false,
        isFetched: true,
        isAuthenticated: true,
        error: {},
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isFetching: false,
      };
    case LOGOUT:
      return {
        ...state, user: {}, token: null, isFetched: false, isAuthenticated: false,
      };
    case USER_VERIFY:
      return {
        ...state,
        user: {
          ...state.user,
          isVerified: true,
        },
      };
    case USER_ACTIVATE:
      return {
        ...state,
        user: {
          ...state.user,
          isActivated: true,
        },
      };
    case PROFILE_GET:
      return {
        ...state,
        user: action.profile,
        isFetching: false,
        isFetched: true,
      };
    default:
      return state;
  }
};
