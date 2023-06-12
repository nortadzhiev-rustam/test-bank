const { sequelize } = require("./models");

const app = require("./app");
const port = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(port);
});
