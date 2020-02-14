const db = require('./db.js');

const updatePlayer = ({
  tag,
  name,
  expLevel,
  trophies,
  bestTropies,
  wins,
  losses,
  battleCount,
  threeCrownWins,
  challengeCardsWon,
  challengeMaxWins,
  tournamentBattleCount,
  role,
  donations,
  donationsReceived,
  totalDonations,
  warDayWins,
  clanCardsCollected,
  clan
}) => {

    console.log(tag)
  const query = {
    name: 'updatePlayer',
    text: `INSERT INTO players (tag, name, expLevel, trophies, bestTropies, wins, losses, battleCount, threeCrownWins, challengeCardsWon, challengeMaxWins, tournamentBattleCount, role, donations, donationsReceived, totalDonations, warDayWins, clanCardsCollected, clanTag) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) ON CONFLICT (tag) DO UPDATE SET (name, expLevel, trophies, bestTropies, wins, losses, battleCount, threeCrownWins, challengeCardsWon, challengeMaxWins, tournamentBattleCount, role, donations, donationsReceived, totalDonations, warDayWins, clanCardsCollected, clanTag)=(EXCLUDED.name, EXCLUDED.expLevel, EXCLUDED.trophies, EXCLUDED.bestTropies, EXCLUDED.wins, EXCLUDED.losses, EXCLUDED.battleCount, EXCLUDED.threeCrownWins, EXCLUDED.challengeCardsWon, EXCLUDED.challengeMaxWins, EXCLUDED.tournamentBattleCount, EXCLUDED.role, EXCLUDED.donations, EXCLUDED.donationsReceived, EXCLUDED.totalDonations, EXCLUDED.warDayWins, EXCLUDED.clanCardsCollected, EXCLUDED.clanTag)`,
    values: [
      tag,
      name,
      expLevel,
      trophies,
      bestTropies,
      wins,
      losses,
      battleCount,
      threeCrownWins,
      challengeCardsWon,
      challengeMaxWins,
      tournamentBattleCount,
      role,
      donations,
      donationsReceived,
      totalDonations,
      warDayWins,
      clanCardsCollected,
      clan.tag
    ]
  };

  return db.query(query);
};

const updateCurrentDeck = ({ tag, currentDeck }) => {
  const query = {
    name: 'updateCurrentDeck',
    text: 'INSERT INTO currentDecks (playerTag, card1ID, card2ID, card3ID, card4ID, card5ID, card6ID, card7ID, card8ID) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT (playerTag) DO UPDATE SET (card1ID, card2ID, card3ID, card4ID, card5ID, card6ID, card7ID, card8ID)=(EXCLUDED.card1ID, EXCLUDED.card2ID, EXCLUDED.card3ID, EXCLUDED.card4ID, EXCLUDED.card5ID, EXCLUDED.card6ID, EXCLUDED.card7ID, EXCLUDED.card8ID);',
    values: [
      tag,
      currentDeck[0].id,
      currentDeck[1].id,
      currentDeck[2].id,
      currentDeck[3].id,
      currentDeck[4].id,
      currentDeck[5].id,
      currentDeck[6].id,
      currentDeck[7].id
    ]
  };

  return db.query(query);
};

const insertCard = card => {
  const query = {
    name: 'insertCard',
    text: 'INSERT INTO cards (id, name, icon) VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING',
    values: [
      card.id,
      card.name,
      card.iconUrls.medium
    ]
  };

  return db.query(query);
}

const testQuery = tag => {
  const query = {
    name: 'testQuery',
    text: 'INSERT INTO xyz (tag) VALUES ($1);',
    values: [tag]
  };

  return db.query(query);
};

module.exports = { testQuery, updatePlayer, updateCurrentDeck, insertCard };