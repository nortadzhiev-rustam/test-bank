module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Teacher",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Question, {
      foreignKey: "userId",
      as: "user",
    });
    User.belongsTo(models.Department, {
      foreignKey: "departmentId",
      as: "department",
    });

    User.hasMany(models.Test, {
      foreignKey: "userId",
      as: "owner",
    });
    
    User.hasMany(models.Collection, {
      foreignKey: "userId",
      as: "collections",
    });
  };

  return User;
};
