import Sequelize from 'sequelize'
import {} from 'dotenv'

// dotenv.config()

const {
  DB_USERNAME,
  DB_HOSTNAME,
  DB_DATABASE,
  DB_PASSWORD,
  DB_PORT
} = process.env;

export const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOSTNAME,
  dialect: 'postgres',
  logging: false
});

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });
