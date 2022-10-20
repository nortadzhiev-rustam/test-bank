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
      allowNull: true,
    },
    answerB: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    answerC: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    answerD: {
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
    mark : {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    image: {
      type: DataTypes.STRING,
      allowNull: true,
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
