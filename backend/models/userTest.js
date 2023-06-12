module.exports = (sequelize, DataTypes) => {
  const UserTest = sequelize.define("UserTest", {
    created: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  });

  return UserTest;
};
