import request from '../request';

export const WORKSPACE_FETCH_SUCCESS = 'WORKSPACE_FETCH_SUCCESS';
export const WORKSPACE_REQUEST = 'WORKSPACE_REQUEST';
export const WORKSPACE_CLEAR = 'WORKSPACE_CLEAR';

export function requestWorkspace() {
  return { type: WORKSPACE_REQUEST };
}

export function fetchWithSuccessWorkspace(workspace) {
  return { type: WORKSPACE_FETCH_SUCCESS, workspace };
}

export function clearWorkspace() {
  return { type: WORKSPACE_CLEAR };
}

export function fetchWorkspace(id) {
  return (dispatch) => {
    dispatch(requestWorkspace());
    return request(`/workspaces/${id}`)
      .then(response => response.json())
      .then(({ workspace }) => {
        setTimeout(() => {
          dispatch(fetchWithSuccessWorkspace(workspace));
        }, 500);
      })
      .catch((err) => {
        throw err;
      });
  };
}
