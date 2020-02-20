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

CREATE TABLE battles (
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  "battleId" varchar NOT NULL,
  "type" varchar,
  "battleTime" timestamptz,
  "isLadderTournament" boolean,
  "arenaId" int,
  "arenaName" varchar,
  "gameModeId" int,
  "gameModeName" varchar,
  "deckSelection" varchar,
  "isTie" boolean,
  "playerTag" varchar NOT NULL,
  "teammateTag" varchar,
  "playerStartingTrophies" int,
  "playerTrophyChange" int,
  "playerCrowns" int,
  "playerKingTowerHitPoints" int,
  "playerPrincessTower1HitPoints" int,
  "playerPrincessTower2HitPoints" int,
  "playerIsWinner" boolean,
  "playerClanTag" varchar,
  "playerCard1Id" varchar,
  "playerCard1Level" int,
  "playerCard2Id" varchar,
  "playerCard2Level" int,
  "playerCard3Id" varchar,
  "playerCard3Level" int,
  "playerCard4Id" varchar,
  "playerCard4Level" int,
  "playerCard5Id" varchar,
  "playerCard5Level" int,
  "playerCard6Id" varchar,
  "playerCard6Level" int,
  "playerCard7Id" varchar,
  "playerCard7Level" int,
  "playerCard8Id" varchar,
  "playerCard8Level" int,
  CONSTRAINT pk_battles_battleId_playerTag PRIMARY KEY (
    "battleId", "playerTag"
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
