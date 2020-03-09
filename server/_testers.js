import  { Client } from '../database/helpers.js'
import { playerCache, clanCache, battleCache } from './cache.js'
const client = Client({ playerCache, clanCache, battleCache })

import { crawlBattles, crawlBattlesSavePlayerOnly, crawlPorchCrew } from './crawlers.js'

export const scripts = () => {

  // tokenTest()

  // test()
  // client.savePlayerData(['#9VJ9RJL0U'])

    
  // client.saveClanData()
  // // caches.playerCache.set('#PLQLR82YQ',true)
  // client.savePlayer()

  // client.saveDeck()
  // client.savePlayerCards()
  // client.savePlayerData(['#PGJQ80JV9'])
  client.savePlayerData(['#PGJQ80JV9', '#9U9Q9YJU'])
  // client.saveClanData('#8YLJ8UL2')
  // client.saveWarlogData('#20280RVQ')

  const test = async () => {
    // const tester = updateBattle([{battleId: 'test5'}, {battleId: 'test6'}, {battleId: 'test7'}])
    // console.log(await client.savePlayerData(['#9VJ9RJL0U']))
    // const clan = await fetchClanWarlogData('#9VUPUQJP')
    // const keys = Object.keys(clan.items[0])
    // console.log(keys)
    
    
    // console.log(await fetchClanData('#9VUPUQJP'))


    // console.log(await client.savePlayerData(['#PGJQ80JV9', '#9U9Q9YJU']))
    // crawlBattlesSavexPlayerOnly('#LC8GU2CR')
    crawlPorchCrew()
    const warlogData = await client.getWarlogData()
    // console.log(warlogData)

    // const tester = _findApiKeyName()
    // console.log(tester)
  }

  test()

  // battleCache.on( "del", ( key, value ) => {
  //   console.log('key is ', key, 'value is ', value)
  // })

  // battleCache.set(1, true, 1)
  // battleCache.set(2, true, 4)
  // battleCache.set(3, 7, 1)

  // console.log(battleCache.get(4))



  // client.savePlayerData(['#9VJ9RJL0U', '#8CG2P29R0', '#VVJCVC98'])


  // caches.clanCache.set('124', true)
  // setTimeout(function(){ console.log(caches.playerCache.keys()) }, 3000);
  // setTimeout(function(){ console.log(caches.clanCache.keys()) }, 3000)
}