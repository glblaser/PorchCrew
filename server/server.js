const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
require('dotenv').config()
const { populateCardDictionary } = require('../database/clashapi.js');
const  { saveClanData, saveDeck, savePlayer, savePlayerCards, savePlayerData, saveWarlogData } = require('../database/helpers.js')

const port = process.env.PORT || 3099;

app.use(express.static("dist"));
app.use(
  bodyParser.json({
    strict: false
  })
);

app.listen(port, () => {
  console.log(`The shenanigans have started on aisle ${port}`);
});