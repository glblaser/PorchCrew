import m from 'mithril'

export const ClanCollectionsView = ({ attrs: { clan, warClient }}) => {
  let collections = []

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

  const renderCollectionsTableHead = () => {
    const thAttrs = (heading) => {
      return {
        class: 'player',
        // tabindex: '0',
        // 'aria-controls': 'collectionsTable',
        // rowspan: '1',
        // colspan: '1',
        // 'aria-label': `${heading}: activate to sort column ascending`,
        // style: 'width: 125px'
      }
    }
    
    const renderDateHeaders = () => {
      const dates = []

      if (collections[0]) {
        for (let i=0; i<10; i++) {
          let date = new Date(collections[i].createdDate)
          date = date.getMonth()+1 + '/' + date.getDate()
          dates.push(m('th', thAttrs(date), date))
        }
      }

      return dates
    }

    return m('thead',
      m('tr',  
        m('th', thAttrs('Player'), 'Player'),
        renderDateHeaders(),
        m('th', thAttrs('Total'), 'Total')
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

  const renderCollectionsTable = () => {
    return m('table', {
      id: 'collectionsTable',
      class: 'table table-striped',
      style: 'width:100%'
      },
      renderCollectionsTableHead(),
      renderCollectionsTableBody()
    )
  
  }

  const renderClanCollectionsView = () => {
    return m('div', {
      id: 'clan-collections',
      class: 'tab-pane fade col-sm-12',
      role: 'tabpanel',
      'aria-labelledby': 'clan-collections-tab'
    }, renderCollectionsTable())
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