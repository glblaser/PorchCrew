const axios = require('axios');
require('dotenv').config()

const searchPlayer = (tag='9VJ9RJL0U') => {
  return axios
    .get(
      `https://api.clashroyale.com/v1/players/%23${tag}`,
      { headers: { Authorization: 'Bearer: ' + process.env.API_KEY_MEDICI } }
    )
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err));
};

module.exports = { searchPlayer };