module.exports = {
  database: 'test',
  username: 'test',
  password: 'password',
  dialect: 'postgres',
  host: 'localhost',
  port: '5432',
  pool: {
    max: 5,
    min: 1,
    acquire: 60000,
    idle: 60000,
  },
};