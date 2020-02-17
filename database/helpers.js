const { fetchClanData, fetchPlayerData, populateCardDictionary, cardDictionary, fetchClanWarlogData } = require('./clashapi.js');
const { updatePlayer, bulkUpdatePlayers, updateCurrentDeck, bulkUpdateCurrentDecks, updatePlayerCards, updateClan, updateClanPlayers, updateClanWars, updateClanWarPlayers } = require('./query.js');
const moment = require("moment");

const savePlayer = async (tag='#PLQLR82YQ') => {
  const data = await fetchPlayerData(tag);
  updatePlayer(data)
}

// savePlayer();

const saveDeck = async (tag='#PLQLR82YQ') => {
  const data = await fetchPlayerData(tag);
  updateCurrentDeck(data)
}

// saveDeck()

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

const savePlayerCards = async (tag='#PLQLR82YQ') => {
  const data = await fetchPlayerData(tag);

  let playerCards = buildPlayerCards(data.tag, data.cards)
  updatePlayerCards(playerCards)
}

// savePlayerCards()

const savePlayerData = async (tags=['#PLQLR82YQ']) => {
  if (tags.length <= 1) {
    const data = await fetchPlayerData(tags[0])
    let playerCards = buildPlayerCards(data.tag, data.cards)

    updatePlayer(data)
    updateCurrentDeck(data)
    updatePlayerCards(playerCards)
  } else {
    let playersData = tags.map(tag => {
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

// savePlayerData(['#9VJ9RJL0U', '#8CG2P29R0', '#VVJCVC98'])

const buildClanPlayersArray = (tag, players) => {
  return players.map(player => {
    player.clanTag = tag
    player.playerTag = player.tag
    player.lastSeen = moment.utc(player.lastSeen).format()

    return player
  })
}

const saveClanData = async (tag='#9VUPUQJP') => {
  const data = await fetchClanData(tag)
  let clanPlayers = buildClanPlayersArray(data.tag, data.memberList)

  updateClan(data)
  updateClanPlayers(clanPlayers)

  let tags = data.memberList.map(member => member.tag)
  savePlayerData(tags)
}

// savePlayerData()
// fetchClanData()
// saveClanData();
// saveClanData('#8YLJ8UL2');

const buildWarlogRecords = (clanTag, data) => {
  let warPlayerRecords =[]
  
  let clanWarRecords = data.map(war => {
    let warRecord =   {
      tag: clanTag,
      seasonId: war.seasonId,
      createdDate: moment.utc(war.createdDate).format()
    }

    let clans = []
    war.standings.forEach((clan, ind) => {
      clans.push(clan.clan.tag)
      if (clan.clan.tag === clanTag) {
        warRecord.clanScore = clan.clan.clanScore
        warRecord.participants = clan.clan.participants
        warRecord.battlesPlayed = clan.clan.battlesPlayed
        warRecord.wins = clan.clan.wins
        warRecord.crowns = clan.clan.crowns
        warRecord.standing = ind + 1
      }
    })

    warRecord.warId = clans.sort().join('.')

    warPlayerRecords = warPlayerRecords.concat(buildWarPlayersRecords(warRecord.warId, clanTag, war.participants))

    return warRecord
  })

  let warlog = {
    clanWarRecords: clanWarRecords,
    warPlayerRecords: warPlayerRecords
  }

  return warlog
}

const saveWarlogData = async (tag='#9VUPUQJP') => {
  const data = await fetchClanWarlogData(tag)
  const warlog = buildWarlogRecords(tag, data.items)
  updateClanWars(warlog.clanWarRecords)
  updateClanWarPlayers(warlog.warPlayerRecords)
}

// saveWarlogData()

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

module.exports = { saveClanData, saveDeck, savePlayer, savePlayerCards, savePlayerData, saveWarlogData }