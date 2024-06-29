const development = {
  database: 'taskadb',
  username: 'root',
  password: 'root',
  host: 'localhost',
  port: '32778',
  dialect: 'mysql',
  logging: false,
};

const testing = {
  database: 'taskadb-test',
  username: 'root',
  password: 'root',
  host: 'localhost',
  port: '32778',
  dialect: 'mysql',
};

const production = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT,
  dialect: 'mysql',
};

module.exports = {
  development,
  testing,
  production,
};
