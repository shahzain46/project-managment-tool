import { TOAST_SHOW, TOAST_REMOVE } from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case TOAST_SHOW:
      return [
        ...state,
        {
          id: state.length + 1,
          type: action.toast.type,
          message: action.toast.message,
        },
      ];
    case TOAST_REMOVE:
      return state.filter(toast => toast.id !== action.id);
    default:
      return state;
  }
};
