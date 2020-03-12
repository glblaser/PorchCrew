import m from 'mithril'

export const ClanSummaryView = () => {
  // oncreate: () => {
  //   console.log('oncreate clantag = ', clanTag)
  //   if (clanTag != undefined) {
  //     loadClan(clanTag)
  //   }
  // },

  const renderClanName = ( { name, tag } ) => {
    return m('div.col-sm-3',
      m('div.well', 
        m('h1', name),
        m('p.text-muted', tag)
      )
    )
  }

  const renderClanInfo = ( { members, clanScore, clanWarTrophies } ) => {
    return m('div.col-sm-9', 
      m('div.row.clanInfo', 
        m('div.col-sm-3',
          m('div.well', 
            m('h6', 'Members'),
            m('p.text-muted', `${members}/50`)  
          )
        ),
        m('div.col-sm-3',
          m('div.well', 
            m('h6', 'Clan Score'),
            m('p.text-muted', clanScore)  
          )
        ),
        m('div.col-sm-3',
          m('div.well', 
            m('h6', 'War Trophies'),
            m('p.text-muted', clanWarTrophies)  
          )
        )
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
      console.log('redrawing clanSummaryView with clan', clan)
      return renderClanSummaryView(clan)
    }
  }
}