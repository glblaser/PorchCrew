CREATE TABLE players (
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "tag" varchar UNIQUE NOT NULL,
  "name" varchar,
  "expLevel" int,
  "trophies" int,
  "bestTrophies" int,
  "wins" int,
  "losses" int,
  "battleCount" int,
  "threeCrownWins" int,
  "challengeCardsWon" int,
  "challengeMaxWins" int,
  "tournamentBattleCount" int,
  "role" varchar,
  "donations" int,
  "donationsReceived" int,
  "totalDonations" int,
  "warDayWins" int,
  "clanCardsCollected" int,
  "clanTag" varchar,
  CONSTRAINT pk_players PRIMARY KEY (
    "tag"
  )
);

CREATE TABLE battlelogs (
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "battleId" varchar UNIQUE NOT NULL,
  "type" varchar,
  "battleTime" timestamptz,
  "isLadderTournament" boolean,
  "arenaId" int,
  "arenaName" varchar,
  "gameModeId" int,
  "gameModeName" varchar,
  "deckSelection" varchar,
  "isTie" boolean,
  "player1Tag" varchar,
  "player1StartingTrophies" int,
  "player1Crowns" int,
  "player1KingTowerHitPoints" int,
  "player1KingTowerLevel" int,
  "player1IsWinner" boolean,
  "player1ClanTag" varchar,
  "player1Card1Id" varchar,
  "player1Card1Level" int,
  "player1Card2Id" varchar,
  "player1Card2Level" int,
  "player1Card3Id" varchar,
  "player1Card3Level" int,
  "player1Card4d" varchar,
  "player1Card4Level" int,
  "player1Card5Id" varchar,
  "player1Card5Level" int,
  "player1Card6Id" varchar,
  "player1Card6Level" int,
  "player1Card7Id" varchar,
  "player1Card7Level" int,
  "player1Card8Id" varchar,
  "player1Card8Level" int,
  "player2Tag" varchar,
  "player2StartingTrophies" int,
  "player2Crowns" int,
  "player2KingTowerHitPoints" int,
  "player2KingTowerLevel" int,
  "player2IsWinner" boolean,
  "player2ClanTag" varchar,
  "player2Card1Id" varchar,
  "player2Card1Level" int,
  "player2Card2Id" varchar,
  "player2Card2Level" int,
  "player2Card3Id" varchar,
  "player2Card3Level" int,
  "player2Card4d" varchar,
  "player2Card4Level" int,
  "player2Card5Id" varchar,
  "player2Card5Level" int,
  "player2Card6Id" varchar,
  "player2Card6Level" int,
  "player2Card7Id" varchar,
  "player2Card7Level" int,
  "player2Card8Id" varchar,
  "player2Card8Level" int,
  CONSTRAINT pk_battlelog PRIMARY KEY (
    "battleId"
  )
);

CREATE TABLE current_decks (
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "playerTag" varchar UNIQUE NOT NULL,
  "card1Id" int,
  "card2Id" int,
  "card3Id" int,
  "card4Id" int,
  "card5Id" int,
  "card6Id" int,
  "card7Id" int,
  "card8Id" int,
  CONSTRAINT pk_currentDecks PRIMARY KEY (
    "playerTag"
  )
);

CREATE TABLE player_cards (
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "tag" varchar NOT NULL,
  "cardId" int,
  "cardLevel" int,
  "cardCount" int,
  CONSTRAINT pk_playerCards_tag_cardID PRIMARY KEY (
    tag, "cardId"
  )
);

CREATE TABLE clans (
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "tag" varchar NOT NULL,
  "name" varchar,
  "type" varchar,
  "description" varchar,
  "badgeId" int,
  "clanScore" int,
  "clanWarTrophies" int,
  "locationId" int,
  "locationName" varchar,
  "locationIsCountry" boolean,
  "locationCountryCode" varchar,
  "requiredTrophies" int,
  "donationsPerWeek" int,
  members int,
  CONSTRAINT pk_clans PRIMARY KEY (
    tag
  )
);

CREATE TABLE clan_players (
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "clanTag" varchar,
  "playerTag" varchar,
  "name" varchar,
  "role" varchar,
  "lastSeen" timestamptz,
  "expLevel" int,
  "trophies" int,
  "clanRank" int,
  "previousClanRank" int,
  "donations" int,
  "donationsReceived" int,
  CONSTRAINT pk_clan_players_clanTag_playerTag PRIMARY KEY (
    "playerTag"
  )
);

CREATE TABLE clan_war_players (
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "warId" varchar NOT NULL,
  "clanTag" varchar,
  "playerTag" varchar NOT NULL,
  "name" varchar,
  "cardsEarned" int,
  "battlesPlayed" int,
  "wins" int,
  "collectionDayBattlesPlayed" int,
  "numberOfBattles" int,
  CONSTRAINT pk_clan_war_players_warId_playerTag PRIMARY KEY (
    "warId", "playerTag"
  )
);

CREATE TABLE clan_wars (
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "warId" varchar NOT NULL,
  "tag" varchar,
  "seasonId" varchar,
  "createdDate" timestamptz,
  "clanScore" int,
  "participants" int,
  "battlesPlayed" int,
  "wins" int,
  "crowns" int,
  "standing" int,
  CONSTRAINT pk_clan_wars_warId_tag PRIMARY KEY (
    "warId", "tag"
  )
)
