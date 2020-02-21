import dotenv from 'dotenv'
dotenv.config()
import axios from 'axios'
import _ from 'lodash'
import { limiter, limitTest } from './rateLimiter.js'

const authHeader = { headers: { Authorization: 'Bearer: ' + process.env.API_KEY_HOME } }

/***********************
 * For dev use.  Delete for prod.
 */
// import ip from "public-ip"
// const apiKeyNames = {
//   "75.87.1.110": "API_KEY_BUZZMILL",
//   "66.68.63.55": "API_KEY_HOME"
// }

// export const _initAuthHeader = async () => {
//   const apiKeyName = apiKeyNames[await ip.v4()]
//   console.log(apiKeyName)
//   authHeader.headers.Authorization = 'Bearer: ' + process.env[apiKeyName]
//   console.log(authHeader.headers.Authorization)
// } 

// _initAuthHeader()
/***************************/

export const cardDictionary = {}

export const tokenTest = async () => {
  // setTimeout(tokenTest, 3)

  for (let i=1; i<=10; i++) {
    let token = apiTokenVendor.getToken()
    console.log(token)
    token=''
  }
}

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

export const fetchCards = async () => {
  let token = await limiter.request()
  if (token === true) {
    return axios.get(`https://api.clashroyale.com/v1/cards`, authHeader)
      .then(res => {
        return res.data.items;
      }) 
      .catch(err => console.log(err));
  } else {
    return 'fetchCards token is not true'
  }
}

export const fetchPlayerData = async (tag='#9VJ9RJL0U') => {
  tag = encodeURIComponent(tag)
  let token = await limiter.request()
  if (token === true) {
    return axios.get(`https://api.clashroyale.com/v1/players/${tag}`, authHeader)
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err));
  } else {
    return 'fetchPlayerData token is not true'
  }
}

export const fetchBattlelog = async (tag='#9VJ9RJL0U') => {
  tag = encodeURIComponent(tag)
  let token = await limiter.request()
  if (token === true) {
    return axios.get(`https://api.clashroyale.com/v1/players/${tag}/battlelog`, authHeader)
      .then(res => {
        console.log('battlelog')
        return res.data;
      }) 
      .catch(err => console.log(err));
  } else {
    return 'fetchCards token is not true'
  }
}

export const fetchClanData = async (tag='#9VUPUQJP') => {
  tag = encodeURIComponent(tag)
  let token = await limiter.request()
  if (token === true) {
    return axios.get(`https://api.clashroyale.com/v1/clans/${tag}`, authHeader)
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err));
  } else {
    return 'fetchClanData token is not true'
  }
}

export const fetchClanWarlogData = async (tag='9VUPUQJP') => {
  tag = encodeURIComponent(tag)
  let token = await limiter.request()
  if (token === true) {
    return axios.get(`https://api.clashroyale.com/v1/clans/${tag}/warlog`, authHeader)
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err));
  } else {
    return 'fetchClanWarlogData token is not true'
  }
}

// export default { fetchClanData, fetchPlayerData, populateCardDictionary, cardDictionary, fetchClanWarlogData, tokenTest };