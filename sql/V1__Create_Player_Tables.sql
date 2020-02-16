CREATE TABLE players (
  "createdAt" timestamptz,
  "updatedAt" timestamptz,
  tag varchar UNIQUE NOT NULL,
  name varchar,
  "expLevel" int,
  trophies int,
  "bestTrophies" int,
  wins int,
  losses int,
  "battleCount" int,
  "threeCrownWins" int,
  "challengeCardsWon" int,
  "challengeMaxWins" int,
  "tournamentBattleCount" int,
  role varchar,
  donations int,
  "donationsReceived" int,
  "totalDonations" int,
  "warDayWins" int,
  "clanCardsCollected" int,
  "clanTag" varchar,
  CONSTRAINT pk_players PRIMARY KEY (
    tag
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
  tag varchar NOT NULL,
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
  tag varchar NOT NULL,
  name varchar,
  type varchar,
  description varchar,
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
  name varchar,
  role varchar,
  "lastSeen" timestamptz,
  "expLevel" int,
  trophies int,
  "clanRank" int,
  "previousClanRank" int,
  donations int,
  "donationsReceived" int,
  CONSTRAINT pk_clan_players_clanTag_playerTag PRIMARY KEY (
    "playerTag"
  )
);
