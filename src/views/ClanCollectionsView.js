import m from 'mithril'
import _ from 'lodash'
import { renderDateHeaders } from './helpers/tableHelper'

export const ClanCollectionsView = ({ attrs: { clan, warClient }}) => {
  let collections = []

  // const renderCollectionsTable = (clan) => {
  //   const clanTotals = [0,0,0,0,0,0,0,0,0,0]

  //   const renderCollectionsTableHead = () => {
  //     return m('thead',
  //       m('tr',  
  //         m('th.player', 'Player'),
  //         renderDateHeaders(collections.slice(0,10)),
  //         m('th.total', 'Total')
  //       )
  //     )
  //   }

  //   const renderCollectionsTableBody = () => {
  //     const collectionsChunked = _.chunk(collections, 10)

  //     const renderedCollectionRows = collectionsChunked.map(playerRecords => {
  //       const name = playerRecords[0].name
  //       let playerTotal = 0

  //       const collectionsResults = playerRecords.map((collection, i) => {
  //         const cardsEarned = collection.cardsEarned

  //         clanTotals[i] += cardsEarned
  //         playerTotal += cardsEarned

  //         return (m('td', cardsEarned))
  //       })

  //       return m('tr',
  //         m('td.player', name),
  //         collectionsResults,
  //         m('td.total', playerTotal)
  //       )
  //     })

  //     return m('tbody', renderedCollectionRows)
  //   }

  //   const renderCollectionsTableFooter = () => {
  //     const totalsRow = clanTotals.map(total => {
  //       return m('td', total)
  //     })

  //     const totalTotal = _.sum(clanTotals)

  //     return m('tfoot', 
  //       m('tr',
  //         m('td.player', clan.name),
  //         totalsRow,
  //         m('td.total', totalTotal)
  //       )
  //     )
  //   }

  //   if (collections[0]) {
  //     return m('table', {
  //       id: 'collectionsTable',
  //       class: 'table table-striped',
  //       style: 'width:100%'
  //       },
  //       renderCollectionsTableHead(),
  //       renderCollectionsTableBody(),
  //       renderCollectionsTableFooter()
  //     )
  //   }
  // }

  let dataTableMade = false

  const renderCollectionsTable = (clan) => {
    const clanTotals = [0,0,0,0,0,0,0,0,0,0]

    const renderCollectionsTableHead = () => {
      return m('thead',
        m('tr',
          m('th.indexCol', ''),
          m('th.player', 'Player'),
          renderDateHeaders(collections.slice(0,10)),
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
          m('td.indexCol', '1'),
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
          m('td.indexCol', ''),
          m('td.player', clan.name),
          totalsRow,
          m('td.total', totalTotal)
        )
      )
    }

    const convertToDataTable = () => {
      const records = collections.slice(0,10)

      const dateHeaders = records.map(record => {
        const date = new Date(record.createdDate)
        const month = date.toLocaleString('default', { month: 'short' })
        const day = date.getDate() 
    
        return month + ' ' + day
      })

      const columns = _.concat([{ title: 'Name', className: 'player' }], dateHeaders.map(date => {
        return { title: date }
      }),
      [{ title: 'Total', className: 'total' }])
  
      const options = {
        // columns: columns,
        // paging: false,
        pageLength: 50,
        lengthMenu: [10, 25, 50],
        info: false,
        "columnDefs": [ {
          "searchable": false,
          "orderable": false,
          "targets": 0
          },
          { "orderSequence": [ "desc", "asc" ], "targets": [ 2, 3, 4, 5, 6, 7, 8 , 9, 10, 11, 12 ] }
        ],
        "order": [[ 1, 'asc' ]],
        scrollY: 566,
        scrollX: true,
        scrollCollapse: true,
        paging: false,
        // "footerCallback": function (row, data, start, end, display) {
        //   var api = this.api()
        //    $(api.column(3).footer()).html(
        //       ' ( $'  + ' total)'
        //    );
        // }
      }
  
      $(document).ready(function() {
        const t = $('#clanCollectionsTable').DataTable(options)
        // $("#clanMembersTable").append(
        //   $('<tfoot/>').append( $("#clanMembersTable thead tr").clone() ))

        //creates unchanging index column
        t.on( 'order.dt search.dt', function () {
            t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                cell.innerHTML = i+1;
            });
        } ).draw();
      
      })    }

    return {
      oncreate: () => {
        if (!dataTableMade) {
          convertToDataTable()
          dataTableMade = true
        }
      },
      view: () => {
        return m('table', {
          id: 'clanCollectionsTable',
          class: 'display',
          style: 'width:100%'
          },
          renderCollectionsTableHead(),
          renderCollectionsTableBody(),
          renderCollectionsTableFooter()
        )
      }
    }
  }

  const renderClanCollectionsView = (clan) => {
    return m('div', {
      id: 'clan-collections',
      class: 'tab-pane fade col-sm-12 show active',
      role: 'tabpanel',
      'aria-labelledby': 'clan-collections-tab'
    }, collections[0] ? m(renderCollectionsTable(clan)) : '')
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