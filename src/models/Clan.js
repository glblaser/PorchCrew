import axios from 'axios'

export const Clan = {
  clan: {},
  loadClan: (clanTag) => {
    console.log(clanTag)
    return axios.get('/clan/'+clanTag)
      .then(response => {
        Clan.clan = response.data
        console.log(Clan.clan)
      })
      .catch(err => console.log(err))
  }
}