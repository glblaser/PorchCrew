import m from 'mithril'
import _ from 'lodash'

export const ClanWarView = ({ attrs: { clan, warClient }}) => {
  let warDays = []  

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
      const renderWarRows = () => {
        const warDaysChunked = _.chunk(warDays, 10)
        console.log(warDaysChunked)
      }

      return m('tbody', renderWarRows())
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