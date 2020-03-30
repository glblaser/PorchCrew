import { Player, Current_Deck, Player_Card, Clan, Clan_Player, Clan_War_Player, Clan_War, Battle } from '../database/models.js'
import { sequelize } from './db.js'

import moment from "moment"
import Sequelize from 'sequelize'
const Op = Sequelize.Op

export const getClanPlayers = async (clanTag) => {
  return Clan_Player.findAll({
    raw: true,
    where: {
      clanTag: clanTag,
      currentMember: true
    },
    order: [
      ['clanRank', 'ASC']
    ]
  })
}

export const deactivateOldClanPlayers = async (clanTag, currentPlayers) => {
  return Clan_Player.update(
    { currentMember: false },
    { where: {
        clanTag: clanTag,
        currentMember: true,
        playerTag: { [Op.notIn]: currentPlayers }
      }
    }
  )
}

export const getClanPlayersWars = async (clanTag) => {
  const queryStr = 
    `select
      all_wars_players."warId",
      all_wars_players."createdDate",
      all_wars_players."playerTag",
      all_wars_players.name,
      clan_war_players."battlesPlayed",
      clan_war_players.wins,
      clan_war_players."numberOfBattles"
    from
      (select 
        ten_clan_wars."warId",
        ten_clan_wars."createdDate",
        players."playerTag",
        players."name"
      from
        (select
          "warId", "createdDate", tag
        from
          clan_wars
        where
          "tag"='${clanTag}'
        order by "createdDate" desc
        limit 10) as ten_clan_wars
        cross join 
          (select 
            "playerTag", "name"
          from 
            clan_war_players
          where 
            "clanTag"='${clanTag}'
          union
          select
            "playerTag", "name"
          from
            clan_players
          where 
            "clanTag"='${clanTag}') as players
      where "tag"='${clanTag}') as all_wars_players
    left join
      clan_war_players
    on
      all_wars_players."warId" = clan_war_players."warId"
    and
      all_wars_players."playerTag" = clan_war_players."playerTag"
    order by upper(all_wars_players.name), "createdDate" DESC`

  return sequelize.query(queryStr, {type: Sequelize.QueryTypes.SELECT})
}

export const getCollections = async (clanTag) => {
  const queryStr = 
    `select
      all_wars_players."warId",
      all_wars_players."createdDate",
      all_wars_players."playerTag",
      all_wars_players.name,
      clan_war_players."cardsEarned",
      clan_war_players."collectionDayBattlesPlayed"
    from
      (select 
        ten_clan_wars."warId",
        ten_clan_wars."createdDate",
        players."playerTag",
        players."name"
      from
        (select
          "warId", "createdDate", tag
        from
          clan_wars
        where
          "tag"='${clanTag}'
        order by "createdDate" desc
        limit 10) as ten_clan_wars
        cross join 
          (select 
            "playerTag", "name"
          from 
            clan_war_players
          where 
            "clanTag"='${clanTag}'
          union
          select
            "playerTag", "name"
          from
            clan_players
          where 
            "clanTag"='${clanTag}') as players
      where "tag"='${clanTag}') as all_wars_players
    left join
      clan_war_players
    on
      all_wars_players."warId" = clan_war_players."warId"
    and
      all_wars_players."playerTag" = clan_war_players."playerTag"
    order by upper(all_wars_players.name), "createdDate" DESC`

  return sequelize.query(queryStr, {type: Sequelize.QueryTypes.SELECT})
}

export const getClanwWarPlayers = (warId, clanTag) => {
  return Clan_War_Player.findAll({
    raw: true,
    where: {
      warId: warId,
      clanTag: clanTag
    },
    order: [
      ['name', 'ASC']
    ]
  })
}

export const getClanWars = (tag) => {
  return Clan_War.findAll({
    raw: true,
    where: {
      tag: tag
    },
    order: [
      ['createdDate', 'DESC']
    ]
  })
}

export const getClan = (tag) => {
  return Clan.findOne({
    raw: true,
    where: {
      tag: tag
    }
  })  
}

export const updateBattle = (battles) => {
  return Battle.bulkCreate(battles, {
    ignoreDuplicates: true
  })
  // .then(console.log)
    .catch(err => console.log('Error updating battles: ;', err))
}

export const updatePlayer = (player) => {
  return Player.upsert(player)
    // .then(res => {
    //   if (res[1] === true) {
    //     console.log(`Player ${res[0].dataValues.tag} created`)
    //   } else console.log(`Upsert on Player`)
    // })
    .catch(err => console.log('Error updating players: ', err))
}

export const updateClanWars = (wars) => {
  return Clan_War.bulkCreate(wars, {
    ignoreDuplicates: true
  })
    // .then(res => console.log(res[0]))
    .catch(err => console.log('Error updating clan_wars: ', err))
}

export const updateClanWarPlayers = (players) => {
  return Clan_War_Player.bulkCreate(players, {
    ignoreDuplicates: true
  })
  // .then(console.log)
  .catch(err => console.log('Error updating clan_war_players: ', err))
}

export const bulkUpdatePlayers = (players) => {
  return Player.bulkCreate(players, {
    updateOnDuplicate: ['updatedAt', 'name', 'expLevel', 'trophies', 'bestTrophies', 'wins', 'losses', 'battleCount', 'threeCrownWins', 'challengeCardsWon', 'challengeMaxWins', 'tournamentBattleCount', 'role', 'donations', 'donationsReceived', 'warDayWins', 'clanCardsCollected', 'clanTag']
    // returning: true
  })
    // .then(console.log)
    .catch(err => console.log('Error updating clan_players: ', err))
}

export const updateCurrentDeck = (deck) => {
  return Current_Deck.upsert(deck)
    // .then(console.log)
    .catch(err => console.log('Error updating current_decks: ', err))
}

export const bulkUpdateCurrentDecks = (decks) => {
  return Current_Deck.bulkCreate(decks, {
    updateOnDuplicate: ['updatedAt', 'card1Id', 'card2Id', 'card3Id', 'card4Id', 'card5Id', 'card6Id', 'card7Id', 'card8Id']
  })
    // .then(console.log)
    .catch(err => console.log('Error bulk updating current_decks: ', err))
}

export const updatePlayerCards = (records) => {
  return Player_Card.bulkCreate(records, {
    updateOnDuplicate: ['updatedAt', 'cardLeve', 'cardCount']
  })
    // .then(console.log)
    .catch(err => console.log('Error updating player_cards: ', err))
}

export const updateClan = (clan) => {
  return Clan.upsert(clan)
    // .then(console.log)
    .catch(err => console.log('Error updating clans: ', err))
}

export const updateClanPlayers = (memberList) => {
  return Clan_Player.bulkCreate(memberList, {
    updateOnDuplicate: ['updatedAt', 'clanTag', 'name', 'role', 'lastSeen', 'expLevel', 'trophies', 'clanRank', 'previousClanRank', 'donations', 'donationsReceived', 'currentMember']
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