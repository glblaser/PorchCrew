import m from 'mithril'
import imgs from '../imgs/*.png'
import flags from '../imgs/flags/*.png'

export const ClanInfoView = ({ attrs: { clan, warClient }}) => {

  const renderClanDescription = (description) => {
    return m('div', { class: 'row' }, 
      m('div', { class: 'col', id: 'clanDescription' }, description)
    )
  }

  const renderClanType = (type) => {
    return m('div.col-sm-5',
      m('div', { class: 'row' }, 
        m('img', { src: imgs.people, style: 'width:auto;height:38px;' }),
        m('div', { class: 'col' }, 
          m('h6', 'Type'),
          m('div', { class: 'text-muted' }, type)
        )
      )
    )
  }

  const renderRequiredTrophies = (requiredTrophies) => {
    return m('div.col-sm-5',
      m('div.row', 
        m('img', { src: imgs.trophy_small, style: 'width:auto;height:38px;' }),
        m('div', { class: 'col' },
          m('h6', 'Required Trophies'),
          m('div', { class: 'text-muted' }, requiredTrophies)
        )
      )
    )
  }

  const renderLocation = ({ locationName, locationCountryCode }) => {
    const flag = flags[locationCountryCode] ? flags[locationCountryCode] : flags.Globe

    return m('div.col-sm-5',
      m('div.row', 
        m('img', { src: flag, style: 'width:auto;height:38px;' }),
        m('div', { class: 'col' },
          m('h6', 'Location'),
          m('div', { class: 'text-muted' }, locationName)
        )
      )
    )
  }

  const renderDonationsPerWeek = (donationsPerWeek) => {
    return m('div.col-sm-5',
      m('div.row', 
        m('img', { src: imgs.cards_small, style: 'width:auto;height:38px;' }),
        m('div', { class: 'col' },
          m('h6', 'Weekly Donations'),
          m('div', { class: 'text-muted' }, donationsPerWeek)
        )
      )
    )
  }

  const renderClanInfoView = (clan) => {
    console.log('clan is ', clan)
    return m('div', {
      id: 'clan-info',
      class: 'col-sm-12',
    }, m('div', { class: 'container clanInfo' }, 
        renderClanDescription(clan.description),
        m('div', { class: 'row clanInfo' },
          renderClanType(clan.type),
          renderRequiredTrophies(clan.requiredTrophies),
          m('div.col-sm-2')
        ),
        m('div', { class: 'row clanInfo' },
          renderLocation(clan),
          renderDonationsPerWeek(clan.donationsPerWeek),
          m('div.col-sm-2')
        )
      )
    )
  }

  return {
    view: ({ attrs: { clan }}) => {
      return renderClanInfoView(clan)
    }
  }
}