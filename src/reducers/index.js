import { combineReducers } from 'redux';
import auth from './user.reducer';
import toast from './toast.reducer';
import workspace from './workspace.reducer';
import workspaces from './workspaces.reducer';

const rootReducer = combineReducers({
  auth,
  toast,
  workspace,
  workspaces,
});

export default rootReducer;
