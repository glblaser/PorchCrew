import m from 'mithril'

export const ClanWarView = ({ attrs: { clan, warClient }}) => {
  
  const renderClanWarView = () => {
    return m('div', {
      id: 'clan-war',
      class: 'tab-pane fade col-sm-12 show active',
      role: 'tabpanel',
      'aria-labelledby': 'clan-war-tab'
      }, 'Clan war content')
  }


  return {
    view: ({ attrs: { clan, warClient }}) => {
      return renderClanWarView()
    }
  }
}