import m from 'mithril'

export const WarClient = (host, port) => {
  host = host || 'localhost'
  port = port || '3099'
  
  let wars = []

  return {
    loadWars: (clanTag) => {
      const tag = clanTag.replace('#', '')
      return m.request({
        method: 'GET',
        url: `http://${host}:${port}/clan/${tag}/wars`,
      })
    },
    loadCollections: (clanTag) => {
      const tag = clanTag.replace('#', '')
      return m.request({
        method: 'GET',
        url: `http://${host}:${port}/clan/${tag}/collections`,
      })
    },
    loadWarDays: (clanTag) => {
      const tag = clanTag.replace('#', '')
      return m.request({
        method: 'GET',
        url: `http://${host}:${port}/clan/${tag}/war`,
      })
    }
  }
}