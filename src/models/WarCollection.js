import axios from 'axios'

export const WarCollection = {
  wars: [],
  loadWars: (clanTag) => {
    return axios.get('/clan/'+clanTag+'/wars')
      .then(response => {
        WarCollection.wars = response.data
      })
      .catch(err => console.log(err))
  }
}