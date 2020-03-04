import chai from 'chai';
const expect = chai.expect
import { fetchCards, fetchPlayerData, fetchBattlelog, fetchClanData, fetchClanWarlogData } from '../database/clashapi.js'

describe('fetchCards', function() {
  it('should have all keys for cards', async function() {
    const result = await fetchCards()
    expect(result).to.have.all.keys('items')
  })

  it('should have items array with all 98 cards', async function() {
    const result = await fetchCards()
    expect(result.items).to.have.lengthOf(98)
    expect(result.items).to.be.a('array')
  })

  it('should have all keys with data for card objects', async function() {
    const result = await fetchCards()

    result.items.forEach(card => {
      expect(card).to.have.all.keys('name', 'id', 'maxLevel', 'iconUrls')
      expect(card.iconUrls).to.have.all.keys('medium')
    })
  })
})

describe('fetchPlayerData', function() {
  it('should have all keys for player', async function() {
    const player = await fetchPlayerData('#9VJ9RJL0U')
    
    expect(player).to.have.all.keys('tag', 'name', 'expLevel', 'trophies', 'bestTrophies', 'wins', 'losses', 'battleCount', 'threeCrownWins', 'challengeCardsWon', 'challengeMaxWins', 'tournamentCardsWon', 'tournamentBattleCount', 'role', 'donations', 'donationsReceived', 'totalDonations', 'warDayWins', 'clanCardsCollected', 'clan', 'arena', 'leagueStatistics', 'badges', 'achievements', 'cards', 'currentDeck', 'currentFavouriteCard', 'starPoints')
  })

  it('should return false when passed in empty array or bad player tag', async function() {
    const badTag = await fetchPlayerData(['#BADTAG'])
    const emptyArr = await fetchPlayerData([])
    expect(badTag).to.equal(false)
    expect(emptyArr).to.equal(false)
  })
})

describe('fetchBattlelog', function() {
  it('should contain desired keys for all battles', async function() {
    const battles = await fetchBattlelog('#PLQLR82YQ')
    
    battles.forEach(battle => {
      const apiKeys = Object.keys(battle)
      const desiredKeys = ['type', 'battleTime', 'isLadderTournament', 'arena', 'gameMode', 'deckSelection', 'team', 'opponent']

      expect(desiredKeys.every(key => apiKeys.includes(key))).to.be.true
    })    
  })

  it('should return array of 25 battles', async function() {
    const battles = await fetchBattlelog('#PLQLR82YQ')
    
    expect(battles).to.have.lengthOf(25)
    expect(battles).to.be.a('array')
  })

  it('should return empty array when passed in a bad player tag', async function() {
    const badTag = await fetchBattlelog('#BADTAG')
    
    expect(badTag).to.have.lengthOf(0)
    expect(badTag).to.be.a('array')
  })
})

describe('fetchClanData', function() {
  it('should have all keys for clan', async function() {
    const clan = await fetchClanData('#9VUPUQJP')
    
    expect(clan).to.have.all.keys('tag', 'name', 'type', 'description', 'badgeId', 'clanScore', 'clanWarTrophies', 'location', 'requiredTrophies', 'donationsPerWeek', 'clanChestStatus', 'clanChestLevel', 'clanChestMaxLevel', 'members', 'memberList')
  })

  it('should return false when passed a bad clan tag', async function() {
    const badTag = await fetchClanData('#BADTAG')
    expect(badTag).to.equal(false)
  })

  it('should include memberList array of members having all keys for a member', async function() {
    const clan = await fetchClanData('#9VUPUQJP')
    const members = clan.memberList

    members.forEach(member => {
      expect(member).to.have.all.keys('tag', 'name', 'role', 'lastSeen', 'expLevel', 'trophies', 'arena', 'clanRank', 'previousClanRank', 'donations', 'donationsReceived', 'clanChestPoints')
    })
  })
})

describe('fetchClanWarlogData', function() {
  it('should have all keys for clan warlogs', async function() {
    const clan = await fetchClanWarlogData('#9VUPUQJP')
    
    expect(clan).to.have.all.keys('items', 'paging')
  })

  it('should return false when passed a bad clan tag', async function() {
    const badTag = await fetchClanWarlogData('#BADTAG')
    expect(badTag).to.equal(false)
  })

  it('should include items array of wars having all keys for a war', async function() {
    const warlog = await fetchClanWarlogData('#9VUPUQJP')

    warlog.items.forEach(war => {
      expect(war).to.have.all.keys('seasonId', 'createdDate', 'participants', 'standings')
    })
  })
})
