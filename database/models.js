import { sequelize } from './db.js'
import Sequelize from 'Sequelize'


export const Player = sequelize.define('player', {
  // attributes
  tag: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING
  },
  expLevel: {
    type: Sequelize.INTEGER
  },
  trophies: {
    type: Sequelize.INTEGER
  },
  bestTrophies: {
    type: Sequelize.INTEGER
  },
  wins: {
    type: Sequelize.INTEGER
  },
  losses: {
    type: Sequelize.INTEGER
  },
  battleCount: {
    type: Sequelize.INTEGER
  },
  threeCrownWins: {
    type: Sequelize.INTEGER
  },
  challengeCardsWon: {
    type: Sequelize.INTEGER
  },
  challengeMaxWins: {
    type: Sequelize.INTEGER
  },
  tournamentBattleCount: {
    type: Sequelize.INTEGER
  },
  role: {
    type: Sequelize.STRING
  },
  donations: {
    type: Sequelize.INTEGER
  },
  donationsReceived: {
    type: Sequelize.INTEGER
  },
  totalDonations: {
    type: Sequelize.INTEGER
  },
  warDayWins: {
    type: Sequelize.INTEGER
  },
  clanCardsCollected: {
    type: Sequelize.INTEGER
  },
  clanTag: {
    type: Sequelize.STRING
  }
}, {
  // options
});

export const Current_Deck = sequelize.define('current_deck', {
  // attributes
  playerTag: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  card1Id: {
    type: Sequelize.INTEGER
  },
  card2Id: {
    type: Sequelize.INTEGER
  },
  card3Id: {
    type: Sequelize.INTEGER
  },
  card4Id: {
    type: Sequelize.INTEGER
  },
  card5Id: {
    type: Sequelize.INTEGER
  },
  card6Id: {
    type: Sequelize.INTEGER
  },
  card7Id: {
    type: Sequelize.INTEGER
  },
  card8Id: {
    type: Sequelize.INTEGER
  }
}, {
  // options
});

export const Player_Card = sequelize.define('player_card', {
  // attributes
  tag: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  cardId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  cardLevel: {
    type: Sequelize.STRING
  },
  cardCount: {
    type: Sequelize.STRING
  }
}, {
  // options
});

export const Clan = sequelize.define('clan', {
  // attributes
  tag: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  badgeId: {
    type: Sequelize.INTEGER
  },
  clanScore: {
    type: Sequelize.INTEGER
  },
  clanWarTrophies: {
    type: Sequelize.INTEGER
  },
  locationId: {
    type: Sequelize.INTEGER
  },
  locationName: {
    type: Sequelize.STRING
  },
  locationIsCountry: {
    type: Sequelize.BOOLEAN
  },
  locationCountryCode: {
    type: Sequelize.STRING
  },
  requiredTrophies: {
    type: Sequelize.INTEGER
  },
  donationsPerWeek: {
    type: Sequelize.STRING
  },
  members: {
    type: Sequelize.INTEGER
  }
}, {
  // options
});

export const Clan_Player = sequelize.define('clan_player', {
  // attributes
  clanTag: {
    type: Sequelize.STRING
  },
  playerTag: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.STRING
  },
  lastSeen: {
    type: Sequelize.DATE
  },
  expLevel: {
    type: Sequelize.INTEGER
  },
  trophies: {
    type: Sequelize.INTEGER
  },
  clanRank: {
    type: Sequelize.INTEGER
  },
  previousClanRank: {
    type: Sequelize.INTEGER
  },
  donations: {
    type: Sequelize.INTEGER
  },
  donationsReceived: {
    type: Sequelize.INTEGER
  }
}, {
  // options
});

export const Clan_War_Player = sequelize.define('clan_war_player', {
  // attributes
  warId: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  clanTag: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  playerTag: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  cardsEarned: {
    type: Sequelize.INTEGER
  },
  battlesPlayed: {
    type: Sequelize.INTEGER
  },
  wins: {
    type: Sequelize.INTEGER
  },
  collectionDayBattlesPlayed: {
    type: Sequelize.INTEGER
  },
  numberOfBattles: {
    type: Sequelize.INTEGER
  }
}, {
  // options
});

export const Clan_War = sequelize.define('clan_war', {
  // attributes
  warId: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  tag: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  seasonId: {
    type: Sequelize.INTEGER
  },
  createdDate: {
    type: Sequelize.DATE
  },
  clanScore: {
    type: Sequelize.INTEGER
  },
  participants: {
    type: Sequelize.INTEGER
  },
  battlesPlayed: {
    type: Sequelize.INTEGER
  },
  wins: {
    type: Sequelize.INTEGER
  },
  crowns: {
    type: Sequelize.INTEGER
  },
  standing: {
    type: Sequelize.INTEGER
  }
}, {
  // options
})

export const Battle = sequelize.define('battle', {
  // attributes
  battleId: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  type:  {
      type: Sequelize.STRING
    },
  battleTime:  {
      type: Sequelize.DATE
    },
  isLadderTournament:  {
      type: Sequelize.BOOLEAN
    },
  arenaId:  {
      type: Sequelize.INTEGER
    },
  arenaName:  {
      type: Sequelize.STRING
    },
  gameModeId:  {
      type: Sequelize.INTEGER
    },
  gameModeName:  {
      type: Sequelize.STRING
    },
  deckSelection:  {
      type: Sequelize.STRING
    },
  isTie:  {
      type: Sequelize.BOOLEAN
    },
  player1Tag:  {
      type: Sequelize.STRING
    },
  player1StartingTrophies:  {
      type: Sequelize.INTEGER
    },
  player1Crowns:  {
      type: Sequelize.INTEGER
    },
  player1KingTowerHitPoints:  {
      type: Sequelize.INTEGER
    },
  player1KingTowerLevel:  {
      type: Sequelize.INTEGER
    },
  player1IsWinner:  {
      type: Sequelize.BOOLEAN
    },
  player1ClanTag:  {
      type: Sequelize.STRING
    },
  player1Card1Id:  {
      type: Sequelize.STRING
    },
  player1Card1Level:  {
      type: Sequelize.INTEGER
    },
  player1Card2Id:  {
      type: Sequelize.STRING
    },
  player1Card2Level:  {
      type: Sequelize.INTEGER
    },
  player1Card3Id:  {
      type: Sequelize.STRING
    },
  player1Card3Level:  {
      type: Sequelize.INTEGER
    },
  player1Card4d:  {
      type: Sequelize.STRING
    },
  player1Card4Level:  {
      type: Sequelize.INTEGER
    },
  player1Card5Id:  {
      type: Sequelize.STRING
    },
  player1Card5Level:  {
      type: Sequelize.INTEGER
    },
  player1Card6Id:  {
      type: Sequelize.STRING
    },
  player1Card6Level:  {
      type: Sequelize.INTEGER
    },
  player1Card7Id:  {
      type: Sequelize.STRING
    },
  player1Card7Level:  {
      type: Sequelize.INTEGER
    },
  player1Card8Id:  {
      type: Sequelize.STRING
    },
  player1Card8Level:  {
      type: Sequelize.INTEGER
    },
  player2Tag:  {
      type: Sequelize.STRING
    },
  player2StartingTrophies:  {
      type: Sequelize.INTEGER
    },
  player2Crowns:  {
      type: Sequelize.INTEGER
    },
  player2KingTowerHitPoints:  {
      type: Sequelize.INTEGER
    },
  player2KingTowerLevel:  {
      type: Sequelize.INTEGER
    },
  player2IsWinner:  {
      type: Sequelize.BOOLEAN
    },
  player2ClanTag:  {
      type: Sequelize.STRING
    },
  player2Card1Id:  {
      type: Sequelize.STRING
    },
  player2Card1Level:  {
      type: Sequelize.INTEGER
    },
  player2Card2Id:  {
      type: Sequelize.STRING
    },
  player2Card2Level:  {
      type: Sequelize.INTEGER
    },
  player2Card3Id:  {
      type: Sequelize.STRING
    },
  player2Card3Level:  {
      type: Sequelize.INTEGER
    },
  player2Card4d:  {
      type: Sequelize.STRING
    },
  player2Card4Level:  {
      type: Sequelize.INTEGER
    },
  player2Card5Id:  {
      type: Sequelize.STRING
    },
  player2Card5Level:  {
      type: Sequelize.INTEGER
    },
  player2Card6Id:  {
      type: Sequelize.STRING
    },
  player2Card6Level:  {
      type: Sequelize.INTEGER
    },
  player2Card7Id:  {
      type: Sequelize.STRING
    },
  player2Card7Level:  {
      type: Sequelize.INTEGER
    },
  player2Card8Id:  {
      type: Sequelize.STRING
    },
  player2Card8Level:  {
      type: Sequelize.INTEGER
    }
}, {
  // options
})

// module.exports = { Player, Current_Deck, Player_Card, Clan, Clan_Player, Clan_War_Player, Clan_War }