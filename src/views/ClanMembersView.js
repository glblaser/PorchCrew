import m from 'mithril'
import _ from 'lodash'
import { renderDateHeaders } from './helpers/tableHelper'

export const ClanMembersView = ({ attrs: { clan, clanClient }}) => {
  let members = []

  const convertToDataTable = () => {
    const membersData = members.map((member, i) => [
      i+1,
      member.name,
      member.role,
      member.expLevel,
      member.trophies,
      member.clanRank,
      member.donations,
      member.donationsReceived
    ])

    const columns = [
      { title: '', className: 'indexCol'},
      { title: 'Name', className: 'player' },
      { title: 'Role' },
      { title: 'Level' },
      { title: 'Trophies' },
      { title: 'Rank'},
      { title: 'Donations' },
      { title: 'Cards Received' }
    ]

    const options = {
      data: membersData,
      columns: columns,
      // paging: false,
      pageLength: 50,
      lengthMenu: [10, 25, 50],
      info: false,
      "columnDefs": [ {
        "searchable": false,
        "orderable": false,
        "targets": 0
        },
        { "orderSequence": [ "desc", "asc" ], "targets": [ 2, 3, 4, 6, 7 ] }
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
      const t = $('#clanMembersTable').DataTable(options)
      $("#clanMembersTable").append(
        $('<tfoot/>').append( $("#clanMembersTable thead tr").clone() ))
      t.on( 'order.dt search.dt', function () {
          t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
              cell.innerHTML = i+1;
          });
      } ).draw();
    
    })
    
  }

  let dataTableMade = false
  
  const renderClanMembersTable = (clan) => {
    if (members.length > 0) {
      return {
        oncreate: () => {
          if (!dataTableMade) {
            convertToDataTable()
            dataTableMade = true
          }
        },
        view: () => {
          return m('table', {
            id: 'clanMembersTable',
            class: 'display',
            width: '100%',
          })
        }
      }
    } else {
      return {
        view: () => {
          return m('a','')
        }
      }
    }
  }

  const renderClanMembersView = (clan) => {
    return m('div', {
      id: 'clan-members',
      class: 'tab-pane fade col-sm-12 show active',
      role: 'tabpanel',
      'aria-labelledby': 'clan-members-tab'
    }, 
      m(renderClanMembersTable(clan))
    )
  }

  const loadClanMembers = (clan, clanClient) => {
    clanClient.loadClanMembers(clan.tag)
    .then(res => {
      if (res != null) {
        members = res
        return true
      }
    })
    .catch(err => console.log('error is', err))
  }

  return {
    oninit: ({ attrs: { clan, clanClient }}) => {
      loadClanMembers(clan, clanClient)
    },
    view: ({ attrs: { clan, clanClient }}) => {
      return renderClanMembersView(clan)
    }
  }
}

