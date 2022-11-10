const User = require("./User");

module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define(
    "Department",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },

    {
      tableName: "department",
      timestamps: true,
    }
  );

  Department.associate = function (models) {
    Department.hasMany(models.User, {
      foreignKey: "departmentId",
    });
    Department.hasMany(models.Question, {
      foreignKey: "departmentId",
    });
    Department.hasMany(models.Test, {
      foreignKey: "departmentId",
    });
  };

  return Department;
};
