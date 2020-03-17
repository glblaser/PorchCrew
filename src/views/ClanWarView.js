import m from 'mithril'
import _ from 'lodash'

export const ClanWarView = ({ attrs: { clan, warClient }}) => {
  let warDays = []
  const clanTotals = {
    numOfBattles: [0,0,0,0,0,0,0,0,0,0],
    played: [0,0,0,0,0,0,0,0,0,0],
    wins: [0,0,0,0,0,0,0,0,0,0]
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
            let total = 0

            const warRow = playerRecords.map((warDay, i) => {
              clanTotals.numOfBattles[i] += warDay.numOfBattles
              clanTotals.played[i] += warDay.played
              clanTotals.wins[i] += warDay.wins
              total += warDay.wins

              return m('td', warDay.wins)
            })

            console.log('clanTotals is', clanTotals)
            const renderedWarRow = m('tr',  
              m('td', name),
              warRow,
              m('td', total))

            return renderedWarRow
          })

          return renderedWarRows
        }

        return m('tbody', renderWarRows())
      }
    }


    return m('table', {
      id: 'warTable',
      class: 'table table-striped',
      style: 'width:100%'
      },
      renderWarTableHead(),
      renderWarTableBody()
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