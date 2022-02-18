module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define('Test', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answerA: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answerB: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answerC: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answerD: {
      type: DataTypes.STRING,
      allowNull: false,
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
    mark : {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Test.associate = (models) => {
    Test.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    Test.belongsTo(models.Department, {
      foreignKey: 'departmentId',
      as: 'department',
    });
  };

  
  return Test;
};
