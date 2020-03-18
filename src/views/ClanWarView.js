import m from 'mithril'
import _ from 'lodash'

export const ClanWarView = ({ attrs: { clan, warClient }}) => {
  let warDays = []
  const clanTotals = {
    numberOfBattles: [0,0,0,0,0,0,0,0,0,0],
    battlesPlayed: [0,0,0,0,0,0,0,0,0,0],
    wins: [0,0,0,0,0,0,0,0,0,0],
    numberOfBattlesTotal: () => {
      return clanTotals.numberOfBattles.reduce((a, b) => a + b, 0)
    },
    battlesPlayedTotal: () => {
      return clanTotals.battlesPlayed.reduce((a, b) => a + b, 0)
    },
    winsTotal: () => {
      return clanTotals.wins.reduce((a, b) => a + b, 0)
    },
  }

  const renderWarTable = () => {

    const renderWarTableHead = () => {
      const renderDateHeaders = () => {
        const dates = []

        if (warDays[0]) {
          for (let i=0; i<10; i++) {
            let date = new Date(warDays[i].createdDate)
            date = date.getMonth()+1 + '/' + date.getDate()
            dates.push(m('th', date))
          }
        }

        return dates
      }

      return m('thead',
        m('tr',  
          m('th.player', 'Player'),
          renderDateHeaders(),
          m('th.total', 'Total')
        )
      )
    }

    const renderWarTableBody = () => {
      if (warDays[0]) {
        const renderWarRows = () => {
          const warDaysChunked = _.chunk(warDays, 10)

          const renderedWarRows = warDaysChunked.map(playerRecords => {
            const name = playerRecords[0].name
            const playerTotal = {
              wins: 0,
              battlesPlayed: 0,
              numberOfBattles: 0
            }

            const warRow = playerRecords.map((warDay, i) => {
              clanTotals.numberOfBattles[i] += warDay.numberOfBattles
              clanTotals.battlesPlayed[i] += warDay.battlesPlayed
              clanTotals.wins[i] += warDay.wins
              playerTotal.numberOfBattles += warDay.numberOfBattles
              playerTotal.battlesPlayed += warDay.battlesPlayed
              playerTotal.wins += warDay.wins

              const record = warDay.numberOfBattles ? warDay.wins + ' / ' + warDay.battlesPlayed + ' / ' + warDay.numberOfBattles : null

              return m('td', record)
            })

            
            const totalRecord = playerTotal.numberOfBattles ? playerTotal.wins + ' / ' + playerTotal.battlesPlayed + ' / ' + playerTotal.numberOfBattles : null

            return m('tr',  
              m('td.player', name),
              warRow,
              m('td.total', totalRecord))
            })

          return renderedWarRows
        }

        return m('tbody', renderWarRows())
      }
    }

    const renderWarTableFooter = () => {
      if (warDays[0]) {
        const renderWarFooter = () => {
          const totalsRow = [m('td', 'Totals')]
          if(clanTotals.numberOfBattles[0] != undefined) {
            clanTotals.numberOfBattles.forEach((clanTotal, i) => {
              const record = clanTotals.wins[i] + ' / ' + clanTotals.battlesPlayed[i]  + ' / ' + clanTotals.numberOfBattles[i]
              totalsRow.push(m('td', record))
            })
          }

          const totalTotalsRecord = clanTotals.winsTotal() + ' / ' + clanTotals.battlesPlayedTotal()  + ' / ' + clanTotals.numberOfBattlesTotal()

          return m('tr',
            totalsRow,
            m('td', totalTotalsRecord)
          )
        }

        return m('tfoot.total', renderWarFooter())
      }
    }


    return m('table', {
      id: 'warTable',
      class: 'table table-striped',
      style: 'width:100%'
      },
      renderWarTableHead(),
      renderWarTableBody(),
      renderWarTableFooter()
    ) 
  }

  const renderClanWarView = () => {
    return m('div', {
      id: 'clan-war',
      class: 'tab-pane fade col-sm-12 show active',
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