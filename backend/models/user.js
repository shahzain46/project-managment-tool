/* eslint-disable no-param-reassign */
const bcryptService = require('../services/bcrypt');

const hooks = {
  beforeCreate(user) {
    user.password = bcryptService.password(user);
  },
};

const defaultScope = {
  attributes: { exclude: ['password'] },
};

const scopes = {
  withPassword: {
    attributes: { exclude: [] },
  },
};

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      notEmpty: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActivated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user',
    },
  }, {
    hooks, defaultScope, scopes, paranoid: true,
  });
  User.associate = function (models) {
    User.belongsToMany(models.Workspace, { through: 'UserWorkspaces', foreignKey: 'userId' });
  };
  return User;
};
