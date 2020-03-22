import m from 'mithril'

export const ClanInfoView = ({ attrs: { clan, warClient }}) => {

  const renderClanInfoView = (clan) => {
    console.log(clan)
    return m('div', {
      id: 'clan-info',
      class: 'tab-pane fade col-sm-12 show active',
      role: 'tabpanel',
      'aria-labelledby': 'clan-info-tab'
    }, clan.name)
  }

  return {
    // oninit: ({ attrs: { clan, warClient }}) => {
    //   loadWarDays(clan, warClient)
    // },
    view: ({ attrs: { clan }}) => {
      return renderClanInfoView(clan)
    }
  }
}