const { Player, Current_Deck, Player_Card, Clan, Clan_Player, Clan_War_Player, Clan_War } = require('../database/models.js');

const updatePlayer = (player) => {
  player.clanTag = player.clan.tag
  Player.upsert(player)
    .then(record => {console.log(record)})
    .catch(err => console.log('Error updating players: ', err))
}

const updateClanWars = (wars) => {
  Clan_War.bulkCreate(wars, {
    ignoreDuplicates: true
  })
    .then(console.log)
    .catch(err => console.log('Error updating clan_wars: ', err))
}

const updateClanWarPlayers = (players) => {
  Clan_War_Player.bulkCreate(players, {
    ignoreDuplicates: true
  })
  .then(console.log)
  .catch(err => console.log('Error updating clan_war_players: ', err))
}

const bulkUpdatePlayers = (players) => {
  Player.bulkCreate(players, {
    updateOnDuplicate: ['updatedAt', 'name', 'expLevel', 'trophies', 'bestTrophies', 'wins', 'losses', 'battleCount', 'threeCrownWins', 'challengeCardsWon', 'challengeMaxWins', 'tournamentBattleCount', 'role', 'donations', 'donationsReceived', 'warDayWins', 'clanCardsCollected', 'clanTag']
  })
    .then(console.log)
    .catch(err => console.log('Error updating clan_players: ', err))
}

const updateCurrentDeck = ({ tag, currentDeck }) => {
  let deck = {playerTag: tag}
  currentDeck.forEach((card, ind) => {
    let key = `card${ind+1}Id`
    deck[key] = card.id
  })
  Current_Deck.upsert(deck)
    .then(console.log)
    .catch(err => console.log('Error updating current_decks: ', err))
}

const bulkUpdateCurrentDecks = (decks) => {
  Current_Deck.bulkCreate(decks, {
    updateOnDuplicate: ['updatedAt', 'card1Id', 'card2Id', 'card3Id', 'card4Id', 'card5Id', 'card6Id', 'card7Id', 'card8Id']
  })
    .then(console.log)
    .catch(err => console.log('Error bulk updating current_decks: ', err))
}

const updatePlayerCards = (records) => {
  Player_Card.bulkCreate(records, {
    updateOnDuplicate: ['updatedAt', 'cardLeve', 'cardCount']
  })
    .then(console.log)
    .catch(err => console.log('Error updating player_cards: ', err))
}

const updateClan = (clan) => {
  clan.locationId = clan.location.id
  clan.locationName = clan.location.name
  clan.locationIsCountry = clan.location.isCountry
  clan.locationCountryCode = clan.location.countryCode

  Clan.upsert(clan)
    .then(console.log)
    .catch(err => console.log('Error updating clans: ', err))
}

const updateClanPlayers = (memberList) => {
  Clan_Player.bulkCreate(memberList, {
    updateOnDuplicate: ['updatedAt', 'clanTag', 'name', 'role', 'lastSeen', 'expLevel', 'trophies', 'clanRank', 'previousClanRank', 'donations', 'donationsReceived']
  })
    .then(console.log)
    .catch(err => console.log('Error updating clan_players: ', err))

}

module.exports = { updatePlayer, bulkUpdatePlayers, updateCurrentDeck, bulkUpdateCurrentDecks, updatePlayerCards, updateClan, updateClanPlayers, updateClanWars, updateClanWarPlayers };