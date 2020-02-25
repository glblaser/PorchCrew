import Sequelize from 'sequelize'

import {
  DB_USERNAME,
  DB_HOSTNAME,
  DB_DATABASE,
  DB_PASSWORD,
  DB_PORT
} from './config.js';

export const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOSTNAME,
  dialect: 'postgres',
  logging: false
});
