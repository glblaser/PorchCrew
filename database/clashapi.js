import {} from 'dotenv'
import axios from 'axios'
import _ from 'lodash'
import { apiTokenVendor } from './throttler.js'

const authHeader = { headers: { Authorization: 'Bearer: ' + process.env.API_KEY_GRANT } }
export const cardDictionary = {}

export const tokenTest = async () => {
  // setTimeout(tokenTest, 3)

  for (let i=1; i<=10; i++) {
    let token = apiTokenVendor.getToken()
    console.log(token)
    token=''
  }
}

export const fetchCards = () => {
  return axios.get(`https://api.clashroyale.com/v1/cards`, authHeader)
    .then(res => {
      return res.data.items;
    })
    .catch(err => console.log(err));
}

export const fetchPlayerData = (tag='#9VJ9RJL0U') => {
  tag = encodeURIComponent(tag)
  return axios.get(`https://api.clashroyale.com/v1/players/${tag}`, authHeader)
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err));
};

export const populateCardDictionary = async () => {
  const cards = await fetchCards();
  const rarities = {
    13: 'common',
    11: 'rare',
    8: 'epic',
    5: 'legendary'
  }
  cards.forEach(card => {
    cardDictionary[card.id] = {
      name: card.name,
      maxLevel: card.maxLevel,
      rarity: rarities[card.maxLevel],
      iconUrl: card.iconUrls.medium
    }
  })
}

export const fetchClanData = (tag='#9VUPUQJP') => {
  tag = encodeURIComponent(tag)
  return axios.get(`https://api.clashroyale.com/v1/clans/${tag}`, authHeader)
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err));
}

export const fetchClanWarlogData = (tag='9VUPUQJP') => {
  tag = encodeURIComponent(tag)
  return axios.get(`https://api.clashroyale.com/v1/clans/${tag}/warlog`, authHeader)
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err));
}

// export default { fetchClanData, fetchPlayerData, populateCardDictionary, cardDictionary, fetchClanWarlogData, tokenTest };