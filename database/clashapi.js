const axios = require('axios');
require('dotenv').config()

const authHeader = { headers: { Authorization: 'Bearer: ' + process.env.API_KEY_BUZZMILL } }
const cardDictionary = {}

const fetchCards = () => {
  return axios.get(`https://api.clashroyale.com/v1/cards`, authHeader)
    .then(res => {
      return res.data.items;
    })
    .catch(err => console.log(err));
}

const fetchPlayerData = (tag='#9VJ9RJL0U') => {
  tag = encodeURIComponent(tag)
  return axios.get(`https://api.clashroyale.com/v1/players/${tag}`, authHeader)
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err));
};

const populateCardDictionary = async () => {
  const cards = await fetchCards();
  const rarities = {
    13: 'common',
    11: 'rare',
    8: 'epic',
    5: 'legendary'
  }
  cards.forEach(card => {
    let rarity = 
    cardDictionary[card.id] = {
      name: card.name,
      maxLevel: card.maxLevel,
      rarity: rarities[card.maxLevel],
      iconUrl: card.iconUrls.medium
    }
  })
}

const fetchClanData = (tag='#9VUPUQJP') => {
  tag = encodeURIComponent(tag)
  return axios.get(`https://api.clashroyale.com/v1/clans/${tag}`, authHeader)
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err));
}

const fetchClanWarlogData = (tag='9VUPUQJP') => {
  tag = encodeURIComponent(tag)
  return axios.get(`https://api.clashroyale.com/v1/clans/${tag}/warlog`, authHeader)
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err));
}

module.exports = { fetchClanData, fetchPlayerData, populateCardDictionary, cardDictionary, fetchClanWarlogData };