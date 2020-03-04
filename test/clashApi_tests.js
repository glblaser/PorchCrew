import chai from 'chai';
const expect = chai.expect
import { fetchCards, fetchPlayerData, fetchBattlelog, fetchClanData, fetchClanWarlogData } from '../database/clashapi.js'

describe('fetchCards', function() {
  it('should fetch array (.items) with all 98 cards', async function() {
    const result = await fetchCards()
    expect(result).to.have.property('items').with.lengthOf(98)
    expect(result.items).to.be.a('array')
  })

  it('should have all fields for card objects with data', async function() {
    const result = await fetchCards()
    const cards = result.items

    expect(result).to.have.all.keys('items')
    cards.forEach(card => {
      expect(card).to.have.all.keys('name', 'id', 'maxLevel', 'iconUrls')
      expect(card.iconUrls).to.have.all.keys('medium')
      expect(card.name, card.id, card.maxLevel, card.iconUrls, card.iconUrls.medium).to.not.equal(undefined)
    })
  })
})

describe('fetchPlayerData', function() {
  it('should have all fields for player with data', async function() {
    const player = await fetchPlayerData('#9VJ9RJL0U')
    
    expect(player).to.have.all.keys('tag', 'name', 'expLevel', 'trophies', 'bestTrophies', 'wins', 'losses', 'battleCount', 'threeCrownWins', 'challengeCardsWon', 'challengeMaxWins', 'tournamentCardsWon', 'tournamentBattleCount', 'role', 'donations', 'donationsReceived', 'totalDonations', 'warDayWins', 'clanCardsCollected', 'clan', 'arena', 'leagueStatistics', 'badges', 'achievements', 'cards', 'currentDeck', 'currentFavouriteCard', 'starPoints')

    expect(player.tag, player.name, player.expLevel, player.trophies, player.bestTrophies, player.wins, player.losses, player.battleCount, player.threeCrownWins, player.challengeCardsWon, player.challengeMaxWins, player.tournamentCardsWon, player.tournamentBattleCount, player.role, player.donations, player.donationsReceived, player.totalDonations, player.warDayWins, player.clanCardsCollected, player.clan, player.arena, player.leagueStatistics, player.badges, player.achievements, player.cards, player.currentDeck, player.currentFavouriteCard, player.starPoints).to.not.equal(undefined)
  })

  it('should return false when passed in empty array or bad player tag', async function() {
    const badTag = await fetchPlayerData('#BADTAG')
    const emptyArr = await fetchPlayerData([])
    expect(badTag).to.equal(false)
    expect(emptyArr).to.equal(false)
  })
})

