// const express = require("express");
// const morgan = require("morgan");
// const helmet = require("helmet");
// const cors = require("cors");
// const expressSession = require("express-session");
// const SequelizeStore = require("connect-session-sequelize")(
//   expressSession.Store
// );
// const cookieParser = require("cookie-parser");
// require("dotenv").config();
// require("./auth/passport");
// require("./models/");

// const middlewares = require("./middlewares");
// const api = require("./api");

// const allowedDomains = [
//   "https://www.exam.rustamnortadzhiev.com",
//   "http://localhost:3000",
//   "http://192.168.1.129:3000",
// ];

// const app = express();

// // Middleware setup
// app.use(morgan("dev"));
// app.use(helmet());

// app.use((req, res, next) => {
//   // Set the Access-Control-Allow-Origin header to allow all origins
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   // Set other headers as needed
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH"
//   );
//   next();
// });

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // bypass the requests with no origin (like curl requests, mobile apps, etc )
//       if (!origin) return callback(null, true);

//       if (allowedDomains.indexOf(origin) === -1) {
//         var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // allow only specific methods
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use("/static", express.static("public"));
// app.use(cookieParser());
// app.use(
//   expressSession({
//     secret: process.env?.SESSION_SECRET,
//     resave: true,
//     saveUninitialized: false,
//     proxy: true,
//     store: new SequelizeStore({
//       db: require("./models").sequelize,
//     }),
//     name: "testGeneratorCookie",
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24, // 1 day
//       sameSite: "none",
//       secure: process.env.NODE_ENV === "development",
//       httpOnly: false,
//     },
//   })
// );

// // Routes
// app.get("/", (req, res) => {
//   res.json({
//     message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
//   });
// });

// app.use("/api/v1", api);

// // Error handling middleware
// app.use(middlewares.notFound);
// app.use(middlewares.errorHandler);

// // Authentication middleware
// app.use(middlewares.isAuth);

// module.exports = app;

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const expressSession = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(
  expressSession.Store
);
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./auth/passport");

require("./models/");

const allowedDomains = [
  "https://www.exam.rustamnortadzhiev.com",
  "http://localhost:3000",
  "http://192.168.1.129:3000",
  "http://192.168.1.254:3000",
];

const middlewares = require("./middlewares");
const api = require("./api");

const app = express();
app.use(morgan("dev"));
app.use(helmet());
app.set("trust proxy", 1);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(
  cors({
    origin: true,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("public"));
app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env?.SESSION_SECRET,
    resave: true,
    proxy: true,
    saveUninitialized: false,
    store: new SequelizeStore({
      db: require("./models").sequelize,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      sameSite: "none",
      secure: process.env.NODE_ENV === "development",
      httpOnly: false,
    },
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
app.use(middlewares.isAuth);
module.exports = app;
