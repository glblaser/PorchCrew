import express from 'express'
import  { Client } from '../../database/helpers.js'
import { playerCache, clanCache, battleCache } from '../cache.js'

const client = Client({ playerCache, clanCache, battleCache })

const router = express.Router();

router.get('/:clanTag', (req, res) => {
  const clanTag = '#' + req.params.clanTag
  
  client.saveClanData(clanTag)
    .then(results => {
      return client.getClanData(clanTag)
      // add handling results === false (need to update saveClanData())
    })
    .then(clan => {
      res.json(clan)
    })
    .catch(err => {
      console.log(err)
      res.end()
    })
})

router.get('/:clanTag/wars', (req, res) => {
  const clanTag = '#' + req.params.clanTag
  
  client.saveWarlogData(clanTag)
    .then(results => {
      return client.getWarlogData(clanTag)
      // add handling results === false (need to update saveWarlogData())
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