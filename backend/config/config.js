require('dotenv').config();

const config = {
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.DB_NAME,
  host: process.env.MYSQL_HOST || '127.0.0.1',
  port: process.env.MYSQL_PORT || 3306,
  dialect: 'mysql',
};

module.exports = {
  development: { ...config },
  test: { ...config },
  production: { ...config },
};
