module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define("Test", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image: { type: DataTypes.STRING, allowNull: true },
    isEditing: { type: DataTypes.BOOLEAN, allowNull: false },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });

  Test.associate = function (models) {
    Test.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
    Test.hasMany(models.Question, {
      foreignKey: "testId",
      as: "questions",
    });
    Test.belongsTo(models.Department, {
      foreignKey: "departmentId",
      as: "department",
    });
    Test.belongsTo(models.Collection, {
      foreignKey: "collectionId",
      as: "collection",
    });
  };

  return Test;
};
