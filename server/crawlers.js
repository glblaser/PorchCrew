import moment from 'moment'
import  { Client } from '../database/helpers.js'
import { playerCache, clanCache, battleCache } from './cache.js'
const client = Client({ playerCache, clanCache, battleCache })

export const crawlBattles = async (tag = '#PLQLR82YQ') => {
  const { allPlayers, allClans } = await client.saveBattleData(tag)
  
  const newPlayerTags = allPlayers
    ? allPlayers.filter(player => (player.trophies != undefined && player.trophies >= 5800)).map(e => e.playerTag) 
    : [] 

  client.savePlayerData(newPlayerTags)
  
  console.log(newPlayerTags)
  newPlayerTags.forEach(playerTag => {
    crawlBattles(playerTag)
  })
}

export const crawlBattlesSavePlayerOnly = async (tag = '#PLQLR82YQ') => {
  const { allPlayers, allClans } = await client.getBattleOpponents(tag)
  
  const newPlayerTags = allPlayers
    ? allPlayers.filter(player => (player.trophies != undefined && player.trophies >= 5800)).map(e => e.playerTag) 
    : [] 

  client.savePlayerData(newPlayerTags)
  
  console.log(newPlayerTags)
  newPlayerTags.forEach(playerTag => {
    crawlBattles(playerTag)
  })
}

export const crawlPorchCrew = async () => {
  const pcId = '#9VUPUQJP'
  const members = await client.saveClanData(pcId, true)
  const warlog = await client.saveWarlogData(pcId, true)

  if (members) {
    const memberTags = members.map(member => member.tag)
    // .filter(member => {
    //   const hourAgo = moment().subtract(1, 'hours')
    //   const recent = hourAgo.isBefore(member.lastSeen)

    //   return recent
    // }).map(member => member.tag)

    memberTags.forEach(member => {
      client.saveBattleData(member, true)
    })
    client.savePlayerData(memberTags, true)
    
    console.log('PC updated at', moment().local().format())
  } else {
    console.log('PC update failed at', moment().local().format())
  }

  if (warlog) {
    console.log('warlog updated')
  } else console.log('warlog update failed')
}

export const crawlClans = async (tag = '#9VUPUQJP') => {
  const { allOpponents } = await client.saveWarlogData(tag)
  if (allOpponents) {
    allOpponents.forEach(tag => {
      client.saveClanData(tag)
    })
    allOpponents.forEach(tag => {
      crawlClans(tag)
    })
  }
}