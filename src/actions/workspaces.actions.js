import request from '../request';

export const WORKSPACES_FETCH_SUCCESS = 'WORKSPACES_FETCH_SUCCESS';
export const WORKSPACES_REQUEST = 'WORKSPACES_REQUEST';

export function requestWorkspaces() {
  return { type: WORKSPACES_REQUEST };
}

export function fetchWithSuccessWorkspaces(workspaces) {
  return { type: WORKSPACES_FETCH_SUCCESS, workspaces };
}

export function fetchWorkspaces() {
  return (dispatch) => {
    dispatch(requestWorkspaces());
    return request('/workspaces/')
      .then(response => response.json())
      .then(({ workspaces }) => dispatch(fetchWithSuccessWorkspaces(workspaces)))
      .catch((err) => {
        throw err;
      });
  };
}
