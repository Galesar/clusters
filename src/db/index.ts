import { Sequelize } from 'sequelize';
import config from '../configs/main';

const url = `postgres://${config.db.USERNAME}:${config.db.PASSWORD}@${config.db.HOST}:${config.db.PORT}/${config.db.DATABASE_NAME}`;

const sequelize = new Sequelize(url, {
  logging: false,
  pool: {
    max: 5,
    min: 1,
    acquire: 60000,
    idle: 60000,
  },
});

(async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.log('Unable to connect to the database:', error);
  }
})();

export default sequelize;
