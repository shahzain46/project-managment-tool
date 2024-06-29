const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const expressValidator = require('express-validator');
const history = require('connect-history-api-fallback');
const db = require('./models');
const auth = require('./middlewares/auth');

/**
 * express application
 */
const app = express();

// use middleware to proxy requests through index.html page
app.use(history());

// allow cross origin requests
// configure to only allow requests from certain origins
app.use(cors());

// use logger for http request in short manner
app.use(morgan('short'));

// secure express app
app.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false,
}));

// parsing the request bodys
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Connect to Database
 */
db.sequelize.authenticate()
  .then(() => {
    console.log('MySQL: Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('MySQL: Unable to connect to the database:', err);
  });


app.use(expressValidator());

// serve react static files
app.use(express.static(path.resolve(__dirname, '../build')));

// secure your private routes with jwt authentication middleware
app.all('/api/v1/*', (req, res, next) => auth(req, res, next));

// Handle all v1 routes
fs.readdirSync(`${__dirname}/routes/v1`).forEach((file) => {
  require(`./routes/v1/${file}`)(app);
});

app.all('*', (req, res) => res.status(404).json({
  message: "Seems like the endpoint you're looking for no longer exists 🤔",
}));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

module.exports = app;
