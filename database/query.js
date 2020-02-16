const { Player, Current_Deck, Player_Card, Clan, Clan_Player } = require('../database/models.js');

const updatePlayer = (player) => {
  player.clanTag = player.clan.tag
  Player.upsert(player)
    .then(record => {console.log(record)})
    .catch(err => console.log('Error updating players: ', err))

}

const bulkUpdatePlayers = () => {

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

module.exports = { updatePlayer, bulkUpdatePlayers, updateCurrentDeck, updatePlayerCards, updateClan, updateClanPlayers };