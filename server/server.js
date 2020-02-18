import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'

import { populateCardDictionary } from '../database/clashapi.js'
import  { Client } from '../database/helpers.js'
import caches from '../server/cache.js'
import { tokenTest } from '../database/clashapi.js'

const app = express();
const port = process.env.PORT || 3099;

app.use(express.static("dist"));
app.use(
  bodyParser.json({
    strict: false
  })
);

console.log(process.env)

// import esm from 'esm'
// import RequestRateLimiter, { RequestsRequestHandler } from 'request-rate-limiter';
 
// const limiter = new RequestRateLimiter();
// limiter.setRequestHandler(new RequestsRequestHandler);
// console.log(RequestRateLimiter)
 
 
// just send one request
// const testLimiter = async () => {
//   let response = await limiter.request('testRequest');
//   console.log(response)
// }

// testLimiter()


const client = Client(caches)
client.initCache() 

// tokenTest()

// test()
// client.savePlayerData(['#9VJ9RJL0U'])
// client.saveClanData()
// caches.playerCache.set('#PLQLR82YQ',true)
// client.savePlayer()

// client.saveDeck()
// client.savePlayerCards()
// client.savePlayerData(['#PGJQ80JV9', '#9U9Q9YJU'])
// client.saveClanData('#8YLJ8UL2')
// client.saveWarlogData('#8YLJ8UL2')
// client.savePlayerData(['#9VJ9RJL0U', '#8CG2P29R0', '#VVJCVC98'])


// caches.clanCache.set('124', true)
// setTimeout(function(){ console.log(caches.playerCache.keys()) }, 3000);
// setTimeout(function(){ console.log(caches.clanCache.keys()) }, 3000)

app.listen(port, () => {
  console.log(`The shenanigans have started on aisle ${port}`);
});