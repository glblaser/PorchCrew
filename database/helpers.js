const { fetchClanData, fetchPlayerData, populateCardDictionary, cardDictionary, fetchClanWarlogData } = require('./clashapi.js');
const { updatePlayer, bulkUpdatePlayers, updateCurrentDeck, bulkUpdateCurrentDecks, updatePlayerCards, updateClan, updateClanPlayers, updateClanWars, updateClanWarPlayers, getInitPlayerCache, getInitClanCache } = require('./query.js');
const moment = require("moment");
const { Op } = require('sequelize')


const Client = ({ playerCache, clanCache }) => {
  return {
    initCache: () => {initCache(playerCache, clanCache)},
    savePlayer: (tag='#PLQLR82YQ') => {savePlayer(tag, playerCache)},
    saveDeck: (tag='#PLQLR82YQ') => {saveDeck(tag, playerCache)},
    savePlayerCards: (tag='#PLQLR82YQ') => {savePlayerCards(tag, playerCache)},
    savePlayerData: (tags=['#PLQLR82YQ']) => {savePlayerData(tags, playerCache)},
    saveClanData: (tag='#9VUPUQJP') => {saveClanData(tag, clanCache, playerCache)},
    saveWarlogData: (tag='#9VUPUQJP') => {saveWarlogData(tag, clanCache, playerCache)}
  }
}

const initCache = async (playerCache, clanCache) => {
  let playerCacheData = await getInitPlayerCache()
  playerCache.mset(playerCacheData.map(row => row.dataValues)
    .map(row => {
      //ttl is 1 hour minus the difference between 'now' and last update
      let ttl = 3600 - moment().diff(moment(row.updatedAt), 'seconds')
      return {
        key: row.tag,
        val: true,
        ttl: ttl
      }
    })
  )

  let clanCacheData = await getInitClanCache()
  clanCache.mset(clanCacheData.map(row => row.dataValues)
    .map(row => {
      //ttl is 1 day minus the difference between 'now' and last update
      let ttl = 86400 - moment().diff(moment(row.updatedAt), 'seconds')
      return {
        key: row.tag,
        val: true,
        ttl: ttl
      }
    })
  )
}

const savePlayer = async (tag, playerCache) => {
  console.log(!playerCache.get(tag) && tag != undefined)
  if (!playerCache.get(tag) && tag != undefined) {
    const data = await fetchPlayerData(tag);
    updatePlayer(data)
    playerCache.set(tag, true)
  } else {
    return true
  }
}

const saveDeck = async (tag, playerCache) => {
  if (!playerCache.get(tag) && tag != undefined) {
    const data = await fetchPlayerData(tag);
    updateCurrentDeck(data)
    playerCache.set(tag, true)
  } else {
    return true
  }
}

const buildPlayerCards = (tag, cards) => {
  return cards.map(card => {
    let cardRecord = {
      tag: tag,
      cardId: card.id,
      cardLevel: card.level + 13 - card.maxLevel,
      cardCount: card.count
    }
    return cardRecord
  })
}

const buildBulkPlayerCards = (players) => {
  let allPlayers = players.map(player => {
    return buildPlayerCards(player.tag, player.cards)
  })
  
  return [].concat.apply([], allPlayers);
}

const savePlayerCards = async (tag='#PLQLR82YQ', playerCache) => {
  if (!playerCache.get(tag) && tag != undefined) {
    const data = await fetchPlayerData(tag);
    let playerCards = buildPlayerCards(data.tag, data.cards)
    updatePlayerCards(playerCards)
    playerCache.set(tag, true)
  } else {
    return true
  }
}

const savePlayerData = async (tags=['#PLQLR82YQ'], playerCache) => {
  let newTags = tags.filter(tag => !playerCache.has(tag))

  if (newTags.length === 1) {
    const data = await fetchPlayerData(newTags[0])
    let playerCards = buildPlayerCards(data.tag, data.cards)

    let deck = {playerTag: newTags[0]}
    data.currentDeck.forEach((card, ind) => {
      let key = `card${ind+1}Id`
      deck[key] = card.id
    })

    updatePlayer(data)
    updateCurrentDeck(deck)
    updatePlayerCards(playerCards)

    playerCache.set(newTags[0], true)
  } else if (newTags.length > 1) {
    let playersData = newTags.map(tag => {
      return fetchPlayerData(tag)
    })

    Promise.all(playersData)
      .then(players => {
        let decks = buildBulkDecks(players)
        bulkUpdateCurrentDecks(decks)
      
        let bulkPlayers = buildBulkPlayers(players)
        bulkUpdatePlayers(bulkPlayers)

        let bulkPlayerCards = buildBulkPlayerCards(players)
        updatePlayerCards(bulkPlayerCards)
      })

     playerCache.mset(newTags.map(tag => {return {key: tag, val: true}}))
  } else {
    return true
  }
}

const buildBulkDecks = (players) => {
  return players.map(player => {
    let deck = {playerTag: player.tag}
    player.currentDeck.forEach((card, ind) => {
      let key = `card${ind+1}Id`
      deck[key] = card.id
    })

    return deck
  })
}

const buildBulkPlayers = (players) => {
  return players.map(player => {
    player.clanTag = player.clan.tag

    return player
  })
}

const buildClanPlayersArray = (tag, players) => {
  return players.map(player => {
    player.clanTag = tag
    player.playerTag = player.tag
    player.lastSeen = moment.utc(player.lastSeen).format()

    return player
  })
}

const saveClanData = async (tag='#9VUPUQJP', clanCache, playerCache) => {
  if (!clanCache.get(tag) && tag != undefined) {
    const data = await fetchClanData(tag)
    const clanPlayers = buildClanPlayersArray(data.tag, data.memberList)

    data.locationId = data.location.id
    data.locationName = data.location.name
    data.locationIsCountry = data.location.isCountry
    data.locationCountryCode = data.location.countryCode
  
    updateClan(data)
    updateClanPlayers(clanPlayers)
  
    const playerTags = data.memberList.map(member => member.tag)
    savePlayerData(playerTags, playerCache)

    clanCache.set(tag, true)

    //wabt to return playerTags to separate ou the save clan from save players
  } else {
    return true
  }
}

const buildWarlogRecords = (clanTag, data) => {
  let warPlayerRecords = []
  let allOpponents = new Set()
  
  const clanWarRecords = data.map(war => {
    const warRecord =   {
      tag: clanTag,
      seasonId: war.seasonId,
      createdDate: moment.utc(war.createdDate).format()
    }
    const clans = []

    war.standings.forEach(({ clan }, ind) => {
      clans.push(clan.tag)
      if (clan.tag === clanTag) {
        warRecord.clanScore = clan.clanScore
        warRecord.participants = clan.participants
        warRecord.battlesPlayed = clan.battlesPlayed
        warRecord.wins = clan.wins
        warRecord.crowns = clan.crowns
        warRecord.standing = ind + 1
      }
    })

    clans.forEach(clan => {
      allOpponents.add(clan)
    })
    warRecord.warId = clans.sort().join('.')

    warPlayerRecords = warPlayerRecords.concat(buildWarPlayersRecords(warRecord.warId, clanTag, war.participants))

    return warRecord
  })
  
  allOpponents.delete(clanTag)

  let warlog = {
    clanWarRecords: clanWarRecords,
    warPlayerRecords: warPlayerRecords,
    allOpponents: [...allOpponents]
  }

  return warlog
}

const saveWarlogData = async (tag='#9VUPUQJP', clanCache, playerCache, force=false) => {
  if ((!clanCache.get(tag) && tag != undefined) || force) {
    const data = await fetchClanWarlogData(tag)
    const { clanWarRecords, warPlayerRecord, allOpponents } = buildWarlogRecords(tag, data.items)
    // updateClanWars(clanWarRecords)
    // updateClanWarPlayers(warPlayerRecords)
    
    saveClans(allOpponents, clanCache, playerCache)

    clanCache.set(tag, true)
  } else {
    return true
  }
}

const saveClans = (clans, clanCache, playerCache) => {
  // clans.forEach(clan => {
    
  // })
  for (let i=0; i<2; i++) {

    saveClanData(clans[i], clanCache, playerCache)
    // saveWarlogData(clans[i], clanCache, playerCache, true)
  }
}

const buildWarPlayersRecords = (warId, clanTag, participants) => {
  let warPlayersRecords = participants.map(participant => {
    let warPlayerRecord = {
      warId: warId,
      clanTag: clanTag,
      playerTag: participant.tag,
      name: participant.name,
      cardsEarned: participant.cardsEarned,
      battlesPlayed: participant.battlesPlayed,
      wins: participant.wins,
      collectionDayBattlesPlayed: participant.collectionDayBattlesPlayed,
      numberOfBattles: participant.numberOfBattles
    }

    return warPlayerRecord
  })

  return warPlayersRecords
}

module.exports = { Client }