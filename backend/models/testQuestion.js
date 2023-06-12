module.exports = (sequelize, DataTypes) => {
    const TestQuestion = sequelize.define('TestQuestion', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        created: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
    });
    return TestQuestion;
};