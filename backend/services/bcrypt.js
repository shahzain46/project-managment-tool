const bcrypt = require('bcrypt-nodejs');

exports.password = (user) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(user.password, salt);

  return hash;
};

exports.comparePassword = (pw, hash) => bcrypt.compareSync(pw, hash);
