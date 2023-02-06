require('dotenv').config();

module.exports = {
  development: {
    username: proccess.env.MYSQL_USER,
    password: proccess.env.MYSQL_PASS,
    database: proccess.env.MYSQL_DATABASE,
    host: proccess.env.MYSQL_HOST,
    port: proccess.env.MYSQL_PORT,
    dialect: mysql
  },
  test: {
    username: proccess.env.MYSQL_USER,
    password: proccess.env.MYSQL_PASS,
    database: proccess.env.MYSQL_DATABASE,
    host: proccess.env.MYSQL_HOST,
    port: proccess.env.MYSQL_PORT,
    dialect: mysql
  },
  production: {
    username: proccess.env.MYSQL_USER,
    password: proccess.env.MYSQL_PASS,
    database: proccess.env.MYSQL_DATABASE,
    host: proccess.env.MYSQL_HOST,
    port: proccess.env.MYSQL_PORT,
    dialect: mysql
  }
}
