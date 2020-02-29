import _ from 'lodash'
import { limiter } from './rateLimiter.js'

export const cardDictionary = {}

export const populateCardDictionary = async () => {
  const cards = await fetchCards();
  const rarities = {
    13: 'common',
    11: 'rare',
    8: 'epic',
    5: 'legendary'
  }
  if (cards) {
    cards.items.forEach(card => {
      cardDictionary[card.id] = {
        name: card.name,
        maxLevel: card.maxLevel,
        rarity: rarities[card.maxLevel],
        iconUrl: card.iconUrls.medium
      }
    })
    return true
  }
  return false
}

export const fetchCards = async () => {
  return limiter.request(`https://api.clashroyale.com/v1/cards`)
}

export const fetchPlayerData = async (tag='#9VJ9RJL0U') => {
  tag = encodeURIComponent(tag)
  return limiter.request(`https://api.clashroyale.com/v1/players/${tag}`)
}

export const fetchBattlelog = async (tag='#9VJ9RJL0U') => {
  tag = encodeURIComponent(tag)
  return limiter.request(`https://api.clashroyale.com/v1/players/${tag}/battlelog`)
}

export const fetchClanData = async (tag='#9VUPUQJP') => {
  tag = encodeURIComponent(tag)
  return limiter.request(`https://api.clashroyale.com/v1/clans/${tag}`)
}

export const fetchClanWarlogData = async (tag='9VUPUQJP') => {
  tag = encodeURIComponent(tag)
  return limiter.request(`https://api.clashroyale.com/v1/clans/${tag}/warlog`)
}

// export default { fetchClanData, fetchPlayerData, populateCardDictionary, cardDictionary, fetchClanWarlogData, tokenTest };