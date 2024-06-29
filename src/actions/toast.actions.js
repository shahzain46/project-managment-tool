export const TOAST_SHOW = 'TOAST_SHOW';
export const TOAST_REMOVE = 'TOAST_REMOVE';

export function showToast({ type, message }) {
  return { type: TOAST_SHOW, toast: { type, message } };
}

export function removeToast(id) {
  return { type: TOAST_REMOVE, id };
}
