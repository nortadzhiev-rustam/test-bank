module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define(
    "Collection",
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
      tableName: "collections",
      timestamps: true,
    }
  );

  Collection.associate = function (models) {
    Collection.belongsTo(models.User, {
      foreignKey: "userId",
    });

    Collection.hasMany(models.Test, {
      foreignKey: "collectionId",
      as: 'tests'
    });
  };

  return Collection;
};
