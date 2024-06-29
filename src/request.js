import Auth from './Auth';
import handleBadResponse from './utils/handleBadResponse';

const API_ROOT = 'http://localhost:9000/api/v1';

export default function request(_path, _options) {
  const options = Object.assign({
    hasToken: true,
    fullPath: false,
    emptyHeaders: false,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${Auth.getToken()}`,
      'Content-Type': 'application/json',
    },
  }, _options);

  if (!options.hasToken) {
    delete options.headers.Authorization;
  }

  if (options.body instanceof FormData) {
    delete options.headers['Content-Type'];
  }

  if (options.emptyHeaders) {
    options.headers = {};
  }

  const path = options.fullPath ? _path : API_ROOT + _path;

  return new Promise((accept, reject) => {
    window.fetch(path, options).then((response) => {
      const { status } = response;

      if (status >= 400) {
        handleBadResponse(response);
        reject(response);
      } else {
        accept(response);
      }
    }, reject);
  });
}
