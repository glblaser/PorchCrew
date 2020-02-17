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

// client.savePlayerData(['#9VJ9RJL0U'])
// client.saveClanData()
// caches.playerCache.set('#PLQLR82YQ',true)
// client.savePlayer()

// client.saveDeck()
// client.savePlayerCards()
// client.savePlayerData(['#PGJQ80JV9', '#9U9Q9YJU'])
// client.saveClanData()
// client.saveWarlogData()
// client.savePlayerData(['#9VJ9RJL0U', '#8CG2P29R0', '#VVJCVC98'])


// caches.clanCache.set('124', true)
// setTimeout(function(){ console.log(caches.playerCache.keys()) }, 3000);
// setTimeout(function(){ console.log(caches.clanCache.keys()) }, 4000)

app.listen(port, () => {
  console.log(`The shenanigans have started on aisle ${port}`);
});