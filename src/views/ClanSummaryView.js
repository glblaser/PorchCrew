import m from 'mithril'
import imgs from '../imgs/*.png'

export const ClanSummaryView = () => {
  
  const renderClanName = ( { name, tag } ) => {
    return m('div.col-sm-3',
      m('div.well', 
        m('h1', name),
        m('p.text-muted', tag)
      )
    )
  }

  const renderClanMembers = (members) => {
    return m('div.col-sm-3',
      m('div', { class: 'row' },
        m('img', { src: imgs.members, style: 'width:auto;height:50px;' }),
        m('div.col', 
          m('h5', 'Members'),
          m('p.text-muted', `${members}/50`)  
        )
      )
    )
  }

  const renderClanScore = (clanScore) => {
    return m('div.col-sm-3',
      m('div', { class: 'row' },
        m('img', { src: imgs.trophy_small, style: 'width:auto;height:50px;' }),
        m('div.col', 
          m('h5', 'Clan Score'),
          m('p.text-muted', clanScore)  
        )
      )
    )
  }

  const renderClanWarTrophies = (clanWarTrophies) => {
    return m('div.col-sm-3',
      m('div', { class: 'row' },
        m('img', { src: imgs.clan_trophy, style: 'width:auto;height:50px;' }),
        m('div.col', 
          m('h5', 'War Trophies'),
          m('p.text-muted', clanWarTrophies)  
        )
      )
    )
  }

  const renderClanInfo = ( { members, clanScore, clanWarTrophies } ) => {
    return m('div.col-sm-9', 
      m('div.row.clanInfo', 
        renderClanMembers(members),
        renderClanScore(clanScore),
        renderClanWarTrophies(clanWarTrophies)
      )
    )
  }

  const renderClanSummaryView = (clan) => {
    if (clan.tag) {
      return m('div#clanSummaryView.row',
        renderClanName(clan),
        renderClanInfo(clan)
      )
    }
  }

  return {
    view: ({ attrs: { clan }}) => {
      return renderClanSummaryView(clan)
    }
  }
}