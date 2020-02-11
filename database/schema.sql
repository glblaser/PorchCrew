CREATE TABLE players (
  tag varchar UNIQUE NOT NULL,
  name varchar,
  expLevel int,
  trophies int,
  bestTropies int,
  wins int,
  losses int,
  battleCount int,
  threeCrownWins int,
  challengeCardsWon int,
  challengeMaxWins int,
  tournamentBattleCount int,
  role varchar,
  donations int,
  donationsReceived int,
  totalDonations int,
  warDayWins int,
  clanCardsCollectred int,
  clanTag varchar,
  CONSTRAINT pk_players PRIMARY KEY (
    tag
  )
);

CREATE TABLE cards (
  id int UNIQUE NOT NULL,
  name varchar,
  icon varchar,
  CONSTRAINT pk_cards PRIMARY KEY (
    id
  )
);

CREATE TABLE currentDecks (
  playerTag varchar UNIQUE NOT NULL,
  card1ID int,
  card2ID int,
  card3ID int,
  card4ID int,
  card5ID int,
  card6ID int,
  card7ID int,
  card8ID int,
  CONSTRAINT pk_currentDecks PRIMARY KEY (
    playerTag
  )
);

CREATE TABLE playerCards (
  id SERIAL NOT NULL,
  tag varchar,
  cardID int,
  cardLevel int,
  cardCount int,
  CONSTRAINT pk_playerCards PRIMARY KEY (
    id
  )
);

ALTER TABLE currentDecks ADD FOREIGN KEY (playerTag) REFERENCES players (tag);

ALTER TABLE currentDecks ADD FOREIGN KEY (card1ID) REFERENCES cards (id);

ALTER TABLE currentDecks ADD FOREIGN KEY (card2ID) REFERENCES cards (id);

ALTER TABLE currentDecks ADD FOREIGN KEY (card3ID) REFERENCES cards (id);

ALTER TABLE currentDecks ADD FOREIGN KEY (card4ID) REFERENCES cards (id);

ALTER TABLE currentDecks ADD FOREIGN KEY (card5ID) REFERENCES cards (id);

ALTER TABLE currentDecks ADD FOREIGN KEY (card6ID) REFERENCES cards (id);

ALTER TABLE currentDecks ADD FOREIGN KEY (card7ID) REFERENCES cards (id);

ALTER TABLE currentDecks ADD FOREIGN KEY (card8ID) REFERENCES cards (id);

ALTER TABLE playerCards ADD FOREIGN KEY (tag) REFERENCES players (tag);

ALTER TABLE playerCards ADD FOREIGN KEY (cardID) REFERENCES cards (id);