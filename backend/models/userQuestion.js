module.exports = (sequelize, DataTypes) => {
  const UserQuestion = sequelize.define("UserQuestions", {
    created: {
      DataTypes: DataTypes.BOOLEAN,
        allowNull: true,
    },
  });

  return UserQuestion;
};
