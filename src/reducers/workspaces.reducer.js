import { WORKSPACES_FETCH_SUCCESS, WORKSPACES_REQUEST } from '../actions';

const initialState = {
  list: [],
  isFetching: false,
  isFetched: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case WORKSPACES_REQUEST:
      return {
        ...state, isFetching: true,
      };
    case WORKSPACES_FETCH_SUCCESS:
      return {
        ...state,
        list: action.workspaces,
        isFetching: false,
        isFetched: true,
      };
    default:
      return state;
  }
};
