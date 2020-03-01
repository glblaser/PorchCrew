import { fetchClanData, fetchPlayerData, fetchBattlelog, populateCardDictionary, cardDictionary, fetchClanWarlogData } from './clashapi.js'
import { updatePlayer,
  bulkUpdatePlayers, 
  updateBattle,
  updateCurrentDeck, 
  bulkUpdateCurrentDecks, 
  updatePlayerCards, 
  updateClan, 
  updateClanPlayers, 
  updateClanWars, 
  updateClanWarPlayers, 
  getInitPlayerCache, 
  getInitClanCache,
  getInitBattleCache } from './query.js'
import moment from 'moment'
import _ from 'lodash'

export const Client = ({ playerCache, clanCache, battleCache }) => {
  return {
    initCache: () => {_initCache(playerCache, clanCache, battleCache)},
    savePlayer: (tag='#PLQLR82YQ') => {_savePlayer(tag, playerCache)},
    saveDeck: (tag='#PLQLR82YQ') => {_saveDeck(tag, playerCache)},
    savePlayerCards: (tag='#PLQLR82YQ') => {_savePlayerCards(tag, playerCache)},
    savePlayerData: (tags=['#PLQLR82YQ'], force=false) => {return _savePlayerData(tags, playerCache, force)},
    saveBattleData: (tag='#GLV2YPG9', force=false) => {return _saveBattleData(tag, battleCache, force)},
    saveClanData: (tag='#9VUPUQJP', force=false) => {return _saveClanData(tag, clanCache, force)},
    saveWarlogData: (tag='#9VUPUQJP', force=false) => {return _saveWarlogData(tag, clanCache, playerCache, force)}
  }
}

const _initCache = async (playerCache, clanCache, battleCache) => {
  const playerCacheData = await getInitPlayerCache()
  playerCache.mset(playerCacheData.map(row => {
    //ttl is 1 hour minus the difference between 'now' and last update
    let ttl = 3600 - moment().diff(moment(row.dataValues.updatedAt), 'seconds')
    return {
      key: row.tag,
      val: true,
      ttl: ttl
    }
  }))


  const clanCacheData = await getInitClanCache()
  clanCache.mset(clanCacheData.map(row => {
    //ttl is 1 day minus the difference between 'now' and last update
    let ttl = 86400 - moment().diff(moment(row.dataValues.updatedAt), 'seconds')
    return {
      key: row.tag,
      val: true,
      ttl: ttl
    }
  }))

  const battleCacheData = await getInitBattleCache()
  battleCache.mset(battleCacheData[0].map(row => {
    //ttl is 1 hour minus the difference between 'now' and last update
    let ttl = 3600 - moment().diff(moment(row.updatedAt), 'seconds')
    return {
      key: row.playerTag,
      val: true,
      ttl: ttl
    }
  }))
}

const _savePlayer = async (tag, playerCache) => {
  if (!playerCache.get(tag) && tag != undefined) {
    const data = await fetchPlayerData(tag);
    updatePlayer(data)
    playerCache.set(tag, true)
  } else {
    return true
  }
}

const _saveDeck = async (tag, playerCache) => {
  if (!playerCache.get(tag) && tag != undefined) {
    const data = await fetchPlayerData(tag);
    updateCurrentDeck(data)
    playerCache.set(tag, true)
  } else {
    return true
  }
}

const _buildPlayerCards = ( { tag, cards } ) => {
  return cards.map(card => {
    return {
      tag: tag,
      cardId: card.id,
      cardLevel: card.level + 13 - card.maxLevel,
      cardCount: card.count
    }
  })
}

const _buildBulkPlayerCards = (players) => {
  const allPlayerCards = players.map(player => {
    return _buildPlayerCards(player)
  })
  
  return _.flatten(allPlayerCards)
}

const _savePlayerCards = async (tag='#PLQLR82YQ', playerCache) => {
  if (!playerCache.get(tag) && tag != undefined) {
    const data = await fetchPlayerData(tag);
    const playerCards = _buildPlayerCards(data)
    
    updatePlayerCards(playerCards)
    
    playerCache.set(tag, true)
  } else {
    return true
  }
}

const _buildDeck = ( { tag, currentDeck }) => {
  const deck = {playerTag: tag}
  currentDeck.forEach((card, i) => {
    deck[`card${i+1}Id`] = card.id
  })

  return deck
}

const _buildBulkDecks = (players) => {
  return players.map(player => {
    return _buildDeck(player)
  })
}

const _buildPlayer = (data) => {
  const existingKeysInData = ["tag", "name", "expLevel", "trophies", "bestTrophies", "wins", "losses", "battleCount", "threeCrownWins", "challengeCardsWon", "challengeMaxWins", "tournamentBattleCount", "role", "donations", "donationsReceived", "totalDonations", "warDayWins", "clanCardsCollected"]
  const props = Object.entries(data).filter( e => existingKeysInData.includes(e[0]) )
  const player = Object.fromEntries(props)

  player.clanTag = data.clan.tag

  return player
}

const _buildBulkPlayers = (players) => {
  const allPlayers = players.map(player => {
    return _buildPlayer(player)
  })
  
  return _.flatten(allPlayers)
}

const _savePlayerData = async (tags=['#PLQLR82YQ'], playerCache, force=false) => {
  const newTags = force ? tags : tags.filter(tag => !playerCache.has(tag))
  
  if (newTags.length === 1) {
    const data = await fetchPlayerData(newTags[0])

    if (data) {
      const player = _buildPlayer(data)
      const playerCards = _buildPlayerCards(data)
      const deck = _buildDeck(data)

      updatePlayer(player)
      updateCurrentDeck(deck)
      updatePlayerCards(playerCards)

      playerCache.set(data.tag, true)

      return [player]
    }
    return false
  } else if (newTags.length > 1) {
    const playersData = newTags.map(tag => {
      return fetchPlayerData(tag)
    })

    Promise.all(playersData)
      .then(players => {
        players = players.filter(player => player)
        
        if (players.length != 0) {
          const bulkDecks = _buildBulkDecks(players)
          bulkUpdateCurrentDecks(bulkDecks)
  
          const bulkPlayerCards = _buildBulkPlayerCards(players)
          updatePlayerCards(bulkPlayerCards)
        
          const bulkPlayers = _buildBulkPlayers(players)
          bulkUpdatePlayers(bulkPlayers)

          const updatedPlayers = bulkPlayers.map(player => {return {key: player.tag, val: true}})
          playerCache.mset(updatedPlayers)
  
          return bulkPlayers
        }
        return false
      })
  }
  return false
}

const _buildBattles = (dataArray, playerTag) => {
  let allPlayers = []
  let addedPlayers = new Set()
  let allClans = new Set()

  const allBattles = _.flatten(dataArray.map(data => {
    const existingKeysInData = ["type", "isLadderTournament", "deckSelection"]
    const props = Object.entries(data).filter( e => existingKeysInData.includes(e[0]) )

    const _buildBattleIdAndAddPlayers = () => {
      const teamPlayerA = data.team[0].tag
      const teamPlayerB = data.team[1] ? data.team[1].tag : undefined
      const opponentPlayerA = data.opponent[0].tag
      const opponentPlayerB = data.opponent[1] ? data.opponent[1].tag : undefined
      const sortedPlayers = [teamPlayerA, teamPlayerB, opponentPlayerA, opponentPlayerB].filter(e => e !== undefined).sort()

      // allPlayers.push(sortedPlayers)

      return _.concat(sortedPlayers,[data.battleTime]).join('.')
    }

    const battleId = _buildBattleIdAndAddPlayers()
    const isTie = (data.team[0].crowns === data.opponent[0].crowns)

    const _buildBattleRecord = (playerData, isWinner=false, teammateTag=undefined) => {
      const battle = Object.fromEntries(props)
      battle.battleId = battleId
      battle.battleTime = moment.utc(data.battleTime).format()
      battle.arenaId = data.arena.id
      battle.arenaName = data.arena.name
      battle.gameModeId = data.gameMode.id
      battle.gameModeName = data.gameMode.name
      battle.isTie = isTie

      battle.playerTag = playerData.tag
      battle.teammateTag = teammateTag
      battle.startingTrophies = playerData.startingTrophies
      battle.trophyChange = playerData.trophyChange 
      battle.crowns = playerData.crowns 
      battle.kingTowerHitPoints = playerData.kingTowerHitPoints
      battle.princessTower1HitPoints = playerData.princessTowersHitPoints ? playerData.princessTowersHitPoints[0] : undefined
      battle.princessTower2HitPoints = playerData.princessTowersHitPoints ? playerData.princessTowersHitPoints[1] : undefined
      battle.isWinner = isWinner
      battle.clanTag = playerData.clan ? playerData.clan.tag : undefined

      if (battle.clanTag) {
        allClans.add(battle.clanTag)
      }

      playerData.cards.forEach((card, i) => {
        battle[`card${i+1}Id`] = card.id
        battle[`card${i+1}Level`] = card.level + 13 - card.maxLevel
      })

      if (!addedPlayers.has(playerData.tag)) {
        const endingTrophies = battle.startingTrophies ? battle.startingTrophies + (battle.trophyChange ? battle.trophyChange : 0) : undefined
 
        const player = {
          playerTag: battle.playerTag,
          trophies: endingTrophies
        }
        if (endingTrophies) {
          addedPlayers.add(playerData.tag)
        }
        allPlayers.push(player)
      }

      return battle
    }

    let battleRecords = []

    const teamIsWinner = data.team[0].crowns > data.opponent[0].crowns
    const opponentIsWinner = data.team[0].crowns < data.opponent[0].crowns

    battleRecords.push(_buildBattleRecord(data.team[0], teamIsWinner, data.team[1] ? data.team[1].tag : undefined))
    if (data.team[1]) {
      battleRecords.push(_buildBattleRecord(data.team[1], teamIsWinner, data.team[0].tag))
    }

    battleRecords.push(_buildBattleRecord(data.opponent[0], opponentIsWinner, data.opponent[1] ? data.opponent[1].tag : undefined))
    if (data.opponent[1]) {
      battleRecords.push(_buildBattleRecord(data.opponent[1], opponentIsWinner, data.opponent[0].tag))
    }
   
    return battleRecords
  }))

  return {
    battles: allBattles,
    allPlayers: _.union(_.flatten(allPlayers)),
    allClans: [...allClans]
  }
}

const _saveBattleData = async (tag='#PLQLR82YQ', battleCache, force=false) => {
  if ((!battleCache.get(tag) && tag != undefined) || force) {
    const data = await fetchBattlelog(tag)
    if (data) {
      const battlesRecords = _buildBattles(data, tag)
      updateBattle(battlesRecords.battles)
      battleCache.set(tag, true)
  
      return battlesRecords
    }
    return false
  }
  return false
}

const _buildClan = (data) => {
  const existingKeysInData = ["tag", "name", "type", "description", "badgeId", "clanScore", "clanWarTrophies", "requiredTrophies", "donationsPerWeek", "members"]
  const props = Object.entries(data).filter( e => existingKeysInData.includes(e[0]) )
  const clan = Object.fromEntries(props)

  clan.locationId = data.location.id
  clan.locationName = data.location.name
  clan.locationIsCountry = data.location.isCountry
  clan.locationCountryCode = data.location.countryCode

  return clan
}

const _buildClanPlayersArray = (clantag, players) => {
  return players.map(player => {
    player.clanTag = clantag
    player.playerTag = player.tag
    player.lastSeen = moment.utc(player.lastSeen).format()
    player.currentMember = true

    return player
  })
}

const _saveClanData = async (tag='#9VUPUQJP', clanCache, force=false) => {
  if ((!clanCache.get(tag) && tag != undefined) || force) {
    const data = await fetchClanData(tag)
    if (data) {
      const clan = _buildClan(data)
      const clanPlayers = _buildClanPlayersArray(data.tag, data.memberList)
  
      updateClan(clan)
      updateClanPlayers(clanPlayers)
  
      clanCache.set(tag, true)
  
      return clanPlayers 
    }
    return false
  }
  return false
}

const _buildWarlogRecords = (clanTag, data) => {
  let warPlayerRecords = []
  const allOpponents = new Set()
  
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

    warPlayerRecords = warPlayerRecords.concat(_buildWarPlayersRecords(warRecord.warId, clanTag, war.participants))

    return warRecord
  })
  
  allOpponents.delete(clanTag)

  return {
    clanWarRecords: clanWarRecords,
    warPlayerRecords: warPlayerRecords,
    allOpponents: [...allOpponents],
    allPlayers: warPlayerRecords.map(record => record.playerTag)
  }
}

const _saveWarlogData = async (tag='#9VUPUQJP', clanCache, playerCache, force=false) => {
  if ((!clanCache.get(tag) && tag != undefined) || force) {
    const data = await fetchClanWarlogData(tag)
    if (data) {
      const { clanWarRecords, warPlayerRecords, allOpponents, allPlayers } = _buildWarlogRecords(tag, data.items)

      updateClanWars(clanWarRecords)
      updateClanWarPlayers(warPlayerRecords)
      
      clanCache.set(tag, true)

      return { allOpponents, allPlayers }
    }
    return false
  }
  return false
}

const _saveClans = (clans, clanCache, playerCache) => {
  clans.forEach(clan => {
    // _saveClanData(clan, clanCache, playerCache)
    _saveWarlogData(clan, clanCache, playerCache, true)
  })
}

const _buildWarPlayersRecords = (warId, clanTag, participants) => {
  return participants.map(participant => {
    return {
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
  })
}
