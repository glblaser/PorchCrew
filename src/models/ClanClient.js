import m from 'mithril'

export const ClanClient = (host, port) => {
  host = host || 'localhost'
  port = port || '3099'

  return {
    loadClan: (clanTag) => {
      return m.request({
        method: "GET",
        url: `http://${host}:${port}/clan/${clanTag}`,
      })
    }
  }
}