import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import path from 'path'
import { PORT } from '../conf/config.js'

import { populateCardDictionary } from '../database/clashapi.js'

import  { Client } from '../database/helpers.js'
import { playerCache, clanCache, battleCache } from './cache.js'
const client = Client({ playerCache, clanCache, battleCache })

import { porchCrewCron } from './cron.js'

const app = express();
const port = PORT || 3099;

app.use(cors())
app.use('/', express.static('dist'));
app.use(
  bodyParser.json({
    strict: false
  })
);

import * as router from './routers/index.js'

app.use('/clan/', router.clan);

populateCardDictionary()
// client.initCache()
porchCrewCron.start()

//for spot testing
import { scripts } from './_testers.js'

scripts()

app.listen(port, () => {
  console.log(`The shenanigans have started on aisle ${port}`);
});