import { Player, Current_Deck, Player_Card, Clan, Clan_Player, Clan_War_Player, Clan_War, Battle } from '../database/models.js'
import { sequelize } from './db.js'

import moment from "moment"
import Sequelize from 'sequelize'

export const updateBattle = (battles) => {
  Battle.bulkCreate(battles, {
    ignoreDuplicates: true
  })
  // .then(console.log)
    .catch(err => console.log('Error updating battles: ;', err))
}

export const updatePlayer = (player) => {
  Player.upsert(player)
    // .then(res => {
    //   if (res[1] === true) {
    //     console.log(`Player ${res[0].dataValues.tag} created`)
    //   } else console.log(`Upsert on Player`)
    // })
    .catch(err => console.log('Error updating players: ', err))
}

export const updateClanWars = (wars) => {
  Clan_War.bulkCreate(wars, {
    ignoreDuplicates: true
  })
    // .then(res => console.log(res[0]))
    .catch(err => console.log('Error updating clan_wars: ', err))
}

export const updateClanWarPlayers = (players) => {
  Clan_War_Player.bulkCreate(players, {
    ignoreDuplicates: true
  })
  // .then(console.log)
  .catch(err => console.log('Error updating clan_war_players: ', err))
}

export const bulkUpdatePlayers = (players) => {
  Player.bulkCreate(players, {
    updateOnDuplicate: ['updatedAt', 'name', 'expLevel', 'trophies', 'bestTrophies', 'wins', 'losses', 'battleCount', 'threeCrownWins', 'challengeCardsWon', 'challengeMaxWins', 'tournamentBattleCount', 'role', 'donations', 'donationsReceived', 'warDayWins', 'clanCardsCollected', 'clanTag'],
    // returning: true
  })
    // .then(console.log)
    .catch(err => console.log('Error updating clan_players: ', err))
}

export const updateCurrentDeck = (deck) => {
  Current_Deck.upsert(deck)
    // .then(console.log)
    .catch(err => console.log('Error updating current_decks: ', err))
}

export const bulkUpdateCurrentDecks = (decks) => {
  Current_Deck.bulkCreate(decks, {
    updateOnDuplicate: ['updatedAt', 'card1Id', 'card2Id', 'card3Id', 'card4Id', 'card5Id', 'card6Id', 'card7Id', 'card8Id']
  })
    // .then(console.log)
    .catch(err => console.log('Error bulk updating current_decks: ', err))
}

export const updatePlayerCards = (records) => {
  Player_Card.bulkCreate(records, {
    updateOnDuplicate: ['updatedAt', 'cardLeve', 'cardCount']
  })
    // .then(console.log)
    .catch(err => console.log('Error updating player_cards: ', err))
}

export const updateClan = (clan) => {
  Clan.upsert(clan)
    // .then(console.log)
    .catch(err => console.log('Error updating clans: ', err))
}

export const updateClanPlayers = (memberList) => {
  Clan_Player.bulkCreate(memberList, {
    updateOnDuplicate: ['updatedAt', 'clanTag', 'name', 'role', 'lastSeen', 'expLevel', 'trophies', 'clanRank', 'previousClanRank', 'donations', 'donationsReceived']
  })
    // .then(console.log)
    .catch(err => console.log('Error updating clan_players: ', err))
}

export const getInitPlayerCache = () => {
  return Player.findAll({
    attributes: ['tag', 'updatedAt'],
    where: {
      updatedAt: {
        [Sequelize.Op.gte]: moment().subtract(1, 'hours').toDate()
      }
    }
  })
}

export const getInitClanCache = () => {
  return Clan.findAll({
    attributes: ['tag', 'updatedAt'],
    where: {
      updatedAt: {
        [Sequelize.Op.gte]: moment().subtract(1, 'days').toDate()
      }
    }
  })
}

//get all player tags updated in last hour with more than 20 occurences
export const getInitBattleCache = async () => {
  const timeMinusHour = moment().subtract(1, 'hours').format()

  const queryStr = `SELECT "playerTag", MIN("updatedAt") as "updatedAt" FROM battles WHERE "updatedAt" >= '${timeMinusHour}' GROUP BY "playerTag" HAVING COUNT("playerTag") >= 20;`

  return sequelize.query(queryStr)
}

// module.exports = { updatePlayer, bulkUpdatePlayers, updateCurrentDeck, bulkUpdateCurrentDecks, updatePlayerCards, updateClan, updateClanPlayers, updateClanWars, updateClanWarPlayers, getInitPlayerCache, getInitClanCache, getInitBattleCache };