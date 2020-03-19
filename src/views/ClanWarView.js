import m from 'mithril'
import _ from 'lodash'

export const ClanWarView = ({ attrs: { clan, warClient }}) => {
  let warDays = []

  const renderWarTable = () => {
    const clanTotals = {
      numberOfBattles: [0,0,0,0,0,0,0,0,0,0],
      battlesPlayed: [0,0,0,0,0,0,0,0,0,0],
      wins: [0,0,0,0,0,0,0,0,0,0],
      numberOfBattlesTotal: () => {
        return _.sum(clanTotals.numberOfBattles)
      },
      battlesPlayedTotal: () => {
        return _.sum(clanTotals.battlesPlayed)
      },
      winsTotal: () => {
        return _.sum(clanTotals.wins)
      },
    }

    const renderWarTableHead = () => {
      const renderDateHeaders = () => {
        const dates = []

        for (let i=0; i<10; i++) {
          const date = new Date(warDays[i].createdDate)
          const month = date.toLocaleString('default', { month: 'short' })
          const day = date.getDate() 
          dates.push(m('th', month + ' ' + day))
        }

        return dates
      }

      return m('thead',
        m('tr',  
          m('th', 'Player'),
          renderDateHeaders(),
          m('th', 'Total')
        )
      )
    }

    const renderWarTableBody = () => {
      const warDaysChunked = _.chunk(warDays, 10)

      const renderedWarRows = warDaysChunked.map(playerRecords => {
        const name = playerRecords[0].name
        const playerTotal = {
          wins: 0,
          battlesPlayed: 0,
          numberOfBattles: 0
        }

        const warRow = playerRecords.map((warDay, i) => {
          const numberOfBattles = warDay.numberOfBattles
          const battlesPlayed = warDay.battlesPlayed
          const wins = warDay.wins

          clanTotals.numberOfBattles[i] += numberOfBattles
          clanTotals.battlesPlayed[i] += battlesPlayed
          clanTotals.wins[i] += wins
          
          playerTotal.numberOfBattles += numberOfBattles
          playerTotal.battlesPlayed += battlesPlayed
          playerTotal.wins += wins

          const missedWar = numberOfBattles - battlesPlayed > 0

          const record = numberOfBattles ? wins + ' / ' + battlesPlayed + ' / ' + numberOfBattles : null

          return m('td', { class: missedWar ? 'missedWar' : '' }, record)
        })

        
        const totalRecord = playerTotal.numberOfBattles ? playerTotal.wins + ' / ' + playerTotal.battlesPlayed + ' / ' + playerTotal.numberOfBattles : null

        const missedWar = playerTotal.numberOfBattles - playerTotal.battlesPlayed > 0

        return m('tr',  
          m('td.player', name),
          warRow,
          m('td.total', { class: missedWar ? 'missedWar' : '' }, totalRecord))
        })

      return m('tbody', renderedWarRows)
    }

    const renderWarTableFooter = () => {
      const totalsRow = []
      
      if(clanTotals.numberOfBattles[0] != undefined) {
        clanTotals.numberOfBattles.forEach((clanTotal, i) => {
          const record = clanTotals.wins[i] + ' / ' + clanTotals.battlesPlayed[i]  + ' / ' + clanTotals.numberOfBattles[i]
          totalsRow.push(m('td', record))
        })
      }

      const totalTotalsRecord = clanTotals.winsTotal() + ' / ' + clanTotals.battlesPlayedTotal()  + ' / ' + clanTotals.numberOfBattlesTotal()

      return m('tfoot', 
        m('tr',
        m('td', 'Totals'),
        totalsRow,
        m('td', totalTotalsRecord)
        )
      )
    }

    if (warDays[0]) {
      return m('table', {
        id: 'clanWarTable',
        class: 'table table-striped',
        style: 'width:100%'
        },
        renderWarTableHead(),
        renderWarTableBody(),
        renderWarTableFooter()
      ) 
    }
  }

  const renderClanWarView = () => {
    return m('div', {
      id: 'clan-war',
      class: 'tab-pane fade col-sm-12',
      role: 'tabpanel',
      'aria-labelledby': 'clan-war-tab'
      }, renderWarTable())
  }

  const loadWarDays = (clan, warClient) => {
    warClient.loadWarDays(clan.tag)
    .then(res => {
      if (res != null) {
        warDays = res
        return true
      }
    })
    .catch(err => console.log('error is', err))
  }

  return {
    oninit: ({ attrs: { clan, warClient }}) => {
      loadWarDays(clan, warClient)
    },
    view: ({ attrs: { clan, warClient }}) => {
      return renderClanWarView()
    }
  }
}