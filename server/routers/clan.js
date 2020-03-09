import express from 'express'
import  { Client } from '../../database/helpers.js'
import { playerCache, clanCache, battleCache } from '../cache.js'

const client = Client({ playerCache, clanCache, battleCache })

const router = express.Router();

router.get('/wars/:clanTag', (req, res) => {
  const clanTag = '#' + req.params.clanTag
  
  client.saveWarlogData(clanTag)
    .then(results => {
      // if (results ===  false) { 
        
      // } else {
        console.log(results)
        return client.getWarlogData(clanTag)
      // }
    })
    .then(wars => {
      res.json(wars)
    })
    .catch(err => {
      console.log(err)
      res.end()
    })
})

export default router