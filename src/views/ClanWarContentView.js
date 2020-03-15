import m from 'mithril'

export const ClanWarContentView = ({ attrs: { clan, warClient }}) => {
  
  const renderClanWarContentView = () => {
    return m('div', {
      id: 'clan-war',
      class: 'tab-pane fade',
      role: 'tabpanel',
      'aria-labelledby': 'clan-war-tab'
      }, 'Clan war content')
  }


  return {
    view: ({ attrs: { clan, warClient }}) => {
      return renderClanWarContentView()
    }
  }
}