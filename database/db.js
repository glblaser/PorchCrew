const { Pool } = require('pg');
require('dotenv').config();
var fs = require('fs');
const path = require('path');

const {
  DB_USERNAME,
  DB_HOSTNAME,
  DB_DATABASE,
  DB_PASSWORD,
  DB_PORT
} = process.env;

const connection = new Pool({
  user: DB_USERNAME,
  host: DB_HOSTNAME,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT
});

// const createTables = () => {
//   var sql = fs.readFileSync(path.join(__dirname, '/schema.sql')).toString();
//   console.log(sql)
//   connection.connect()
//   .then(client => {
//     return client
//       .query(sql)
//       .then(res => {
//         console.log('made it to .then')
//         client.release()
//         console.log(res.rows[0])
//       })
//       .catch(err => {
//         console.log('made it to .catch')
//         client.release()
//         console.log(err.stack)
//       })
//   })
// }
 
connection.on('error', (err, client) => console.log(err, client));

module.exports = connection;
