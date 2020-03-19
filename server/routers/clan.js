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
      res.status(404).send('Not found')
    })
})

router.get('/:clanTag/wars', (req, res) => {
  const clanTag = '#' + req.params.clanTag
  
  client.saveClanData(clanTag)
    .then(results => {
      return client.saveWarlogData(clanTag, true)
    })
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

router.get('/:clanTag/collections', (req, res) => {
  const clanTag = '#' + req.params.clanTag
  
  client.saveClanData(clanTag)
    .then(results => {
      return client.saveWarlogData(clanTag, true)
    })
    .then(results => {
      return client.getCollectionsData(clanTag)
      // add handling results === false (need to update saveWarlogData())
    })
    .then(collections => {
      res.json(collections)
    })
    .catch(err => {
      console.log(err)
      res.end()
    })
})

router.get('/:clanTag/war', (req, res) => {
  const clanTag = '#' + req.params.clanTag
  
  client.saveClanData(clanTag)
    .then(results => {
      return client.saveWarlogData(clanTag, true)
    })
    .then(results => {
      return client.getWarData(clanTag)
      // add handling results === false (need to update saveWarlogData())
    })
    .then(war => {
      res.json(war)
    })
    .catch(err => {
      console.log(err)
      res.end()
    })
})

export default router