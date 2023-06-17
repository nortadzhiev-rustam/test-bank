module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define("Question", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    options: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    correctAnswer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mark: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    matches: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  Question.associate = (models) => {
    Question.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
    Question.belongsTo(models.Department, {
      foreignKey: "departmentId",
      as: "department",
    });
    Question.belongsTo(models.Test, {
      foreignKey: "testId",
      as: "test",
    });
  };

  return Question;
};
