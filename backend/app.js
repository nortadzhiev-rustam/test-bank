const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const expressSession = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(expressSession.Store);
const cookieParser = require('cookie-parser');
require('dotenv').config();
require('./auth/passport');

require('./models/');

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();
app.use(morgan('dev'));
app.use(helmet());
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD","DELETE"],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('public'));
app.use(cookieParser());
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: require('./models').sequelize,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    sameSite: false,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  },

}));

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
app.use(middlewares.isAuth)
module.exports = app;
