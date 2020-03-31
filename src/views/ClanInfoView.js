import m from 'mithril'

export const ClanInfoView = ({ attrs: { clan, warClient }}) => {

  const renderClanInfoView = (clan) => {
    console.log('clan is ', clan)
    return m('div', {
      id: 'clan-info',
      class: 'tab-pane fade col-sm-12 show active',
      role: 'tabpanel',
      'aria-labelledby': 'clan-info-tab'
    }, m('div', { class: 'container' }, clan.description),
      m('div', { class: 'row' }, 
        m('div', { class: 'col' }, 
          m('h6', 'Type'),
          m('div', { class: 'text-muted' }, clan.type)
        ),
        m('div', { class: 'col' }, 
          m('h6', 'Required Trophies'),
          m('div', { class: 'text-muted' }, clan.requiredTrophies)
        )
      ),
      m('div', { class: 'row' },
        m('div', { class: 'col' },
          m('h6', 'Location'),
          m('div', { class: 'text-muted' }, clan.locationName)
        ),
        m('div', { class: 'col' },
          m('h6', 'Weekly Donations'),
          m('div', { class: 'text-muted' }, clan.donationsPerWeek)
        )
      )
    )
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