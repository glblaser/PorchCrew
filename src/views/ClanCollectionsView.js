import m from 'mithril'

export const ClanCollectionsView = ({ attrs: { clan, warClient }}) => {
  let collections = {}

  const loadCollections = (clan, warClient) => {
    warClient.loadWars(clan.tag)
    .then(res => {
      if (res != null) {
        collections = res
      }
    })
    .catch(err => console.log('error is', err))
  }

  const renderClanCollectionsView = () => {
    return m('div', {
      id: 'clan-collections',
      class: 'tab-pane fade',
      role: 'tabpanel',
      'aria-labelledby': 'clan-collections-tab'
    }, 'Clan Collections content')
  }

  return {
    oninit: ({ attrs: { clan, warClient }}) => {
      loadCollections(clan, warClient)
    },
    view: ({ attrs: { clan, warClient }}) => {
      return renderClanCollectionsView()
    }
  }
}