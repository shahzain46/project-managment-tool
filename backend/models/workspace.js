module.exports = (sequelize, DataTypes) => {
  const Workspace = sequelize.define('Workspace', {
    name: DataTypes.STRING,
    ownerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  }, { paranoid: true });
  Workspace.associate = function (models) {
    Workspace.belongsToMany(models.User, { through: 'UserWorkspaces', foreignKey: 'workspaceId', as: 'members' });
    Workspace.belongsTo(models.User, { foreignKey: 'ownerId', as: 'owner' });
  };
  return Workspace;
};
