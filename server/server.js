const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
require('dotenv').config()
const { populateCardDictionary } = require('../database/clashapi.js');
const  { Client } = require('../database/helpers.js')
const caches = require('../server/cache.js')

const port = process.env.PORT || 3099;

app.use(express.static("dist"));
app.use(
  bodyParser.json({
    strict: false
  })
);

const client = Client(caches)
client.initCache()

app.listen(port, () => {
  console.log(`The shenanigans have started on aisle ${port}`);
});