import m from 'mithril'
import _ from 'lodash'

export const ClanCollectionsView = ({ attrs: { clan, warClient }}) => {
  let collections = []

  const renderCollectionsTable = (clan) => {
    const clanTotals = [0,0,0,0,0,0,0,0,0,0]

    const renderCollectionsTableHead = () => {
      const renderDateHeaders = () => {
        const dates = []

        for (let i=0; i<10; i++) {
          const date = new Date(collections[i].createdDate)
          const month = date.toLocaleString('default', { month: 'short' })
          const day = date.getDate() 
          dates.push(m('th', month + ' ' + day))
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

    const renderCollectionsTableBody = () => {
      const collectionsChunked = _.chunk(collections, 10)

      const renderedCollectionRows = collectionsChunked.map(playerRecords => {
        const name = playerRecords[0].name
        let playerTotal = 0

        const collectionsResults = playerRecords.map((collection, i) => {
          const cardsEarned = collection.cardsEarned

          clanTotals[i] += cardsEarned
          playerTotal += cardsEarned

          return (m('td', cardsEarned))
        })

        return m('tr',
          m('td.player', name),
          collectionsResults,
          m('td.total', playerTotal)
        )
      })

      return m('tbody', renderedCollectionRows)
    }

    const renderCollectionsTableFooter = () => {
      const totalsRow = clanTotals.map(total => {
        return m('td', total)
      })

      const totalTotal = _.sum(clanTotals)

      return m('tfoot', 
        m('tr',
          m('td.player', clan.name),
          totalsRow,
          m('td.total', totalTotal)
        )
      )
    }

    if (collections[0]) {
      return m('table', {
        id: 'collectionsTable',
        class: 'table table-striped',
        style: 'width:100%'
        },
        renderCollectionsTableHead(),
        renderCollectionsTableBody(),
        renderCollectionsTableFooter()
      )
    }
  }

  const renderClanCollectionsView = (clan) => {
    return m('div', {
      id: 'clan-collections',
      class: 'tab-pane fade col-sm-12 show active',
      role: 'tabpanel',
      'aria-labelledby': 'clan-collections-tab'
    }, renderCollectionsTable(clan))
  }

  const loadCollections = (clan, warClient) => {
    warClient.loadCollections(clan.tag)
    .then(res => {
      if (res != null) {
        collections = res
        return true
      }
    })
    .catch(err => console.log('error is', err))
  }

  return {
    oninit: ({ attrs: { clan, warClient }}) => {
      loadCollections(clan, warClient)
    },
    view: ({ attrs: { clan, warClient }}) => {
      return renderClanCollectionsView(clan)
    }
  }
}