import m from 'mithril'

export const ClanCollectionsView = ({ attrs: { clan, warClient }}) => {
  let collections = []

  const renderCollectionsTable = () => {

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
          m('th', 'Player'),
          renderDateHeaders(),
          m('th', 'Total')
        )
      )
    }

    const renderCollectionsTableBody = () => {

      const renderCollectionsRows = () => {
        const rows = []
        const clanTotals = [0,0,0,0,0,0,0,0,0,0]

        if (collections[0]) {
          for (let index=0; index<collections.length; index+=10) {
            const row = [m('td.player', collections[index].name)]
            let total = 0

            for (let i=index; i<index+10; i++) {
              const cardsEarned = collections[i].cardsEarned
              
              total += cardsEarned
              clanTotals[i-index] += cardsEarned
              row.push(m('td', cardsEarned))
            }
            total = total != 0 ? total : null
            rows.push(m('tr', row, m('td.total', total)))
          }

          const totalsRow = [m('td', 'Total')]
          clanTotals.forEach((ele) => {
            totalsRow.push(m('td', ele))
          })

          const totalTotals = clanTotals.reduce((a, b) => a + b, 0)
          totalsRow.push(m('td', totalTotals))

          rows.push(m('tr#collectionTotals.total', totalsRow))
        }

        return rows 
      }

      return m('tbody', renderCollectionsRows())
    }

    if (collections[0]) {
      return m('table', {
        id: 'collectionsTable',
        class: 'table table-striped',
        style: 'width:100%'
        },
        renderCollectionsTableHead(),
        renderCollectionsTableBody()
      )
    }
  }

  const renderClanCollectionsView = () => {
    return m('div', {
      id: 'clan-collections',
      class: 'tab-pane fade col-sm-12 show active',
      role: 'tabpanel',
      'aria-labelledby': 'clan-collections-tab'
    }, renderCollectionsTable())
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
      return renderClanCollectionsView()
    }
  }
}