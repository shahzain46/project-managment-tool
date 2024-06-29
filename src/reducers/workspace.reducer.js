import { WORKSPACE_FETCH_SUCCESS, WORKSPACE_REQUEST, WORKSPACE_CLEAR } from '../actions';

const initialState = {
  current: {},
  isFetching: false,
  isFetched: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case WORKSPACE_REQUEST:
      return {
        ...state, isFetching: true,
      };
    case WORKSPACE_FETCH_SUCCESS:
      return {
        ...state,
        current: action.workspace,
        isFetching: false,
        isFetched: true,
      };
    case WORKSPACE_CLEAR:
      return {
        ...state,
        current: {},
        isFetched: false,
      };
    default:
      return state;
  }
};
