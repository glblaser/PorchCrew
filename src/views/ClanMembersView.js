import m from 'mithril'
import _ from 'lodash'
import { renderDateHeaders } from './helpers/tableHelper'

export const ClanMembersView = ({ attrs: { clan, clanClient }}) => {
  let members = []

  const convertToDataTable = () => {
    const membersData = members.map(member => [
      member.clanRank,
      member.name,
      member.role,
      member.expLevel,
      member.trophies,
      member.donations,
      member.donationsReceived
    ])

    const headings = [
      { title: 'Rank'},
      { title: 'Name', className: 'player' },
      { title: 'Role' },
      { title: 'Level' },
      { title: 'Trophies' },
      { title: 'Donations' },
      { title: 'Cards Received' }
    ]

    const options = {
      data: membersData,
      columns: headings,
      paging: false,
      info: false,
      "footerCallback": function (row, data, start, end, display) {
        var api = this.api()
         $(api.column(3).footer()).html(
            ' ( $'  + ' total)'
         );
    }
    }

    $(document).ready(function() {
      $('#clanMembersTable').DataTable(options)
      $("#clanMembersTable").append(
        $('<tfoot/>').append( $("#clanMembersTable thead tr").clone() )
    );
    })
    
  }

  let dataTableMade = false
  
  const renderClanMembersTable = (clan) => {
    if (members.length > 0) {
      return {
        oncreate: () => {
          console.log(members)
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
      // 'test'
    )
  }

  const loadClanMembers = (clan, warClient) => {
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
      // $(document).ready(function() {
      //   $('#example').DataTable( {
      //       data: dataSet,
      //       columns: [
      //           { title: "Name" },
      //           { title: "Position" },
      //           { title: "Office" },
      //           { title: "Extn." },
      //           { title: "Start date" },
      //           { title: "Salary" }
      //       ]
      //   } );
      // })
      loadClanMembers(clan, clanClient)
    },
    view: ({ attrs: { clan, clanClient }}) => {
      return renderClanMembersView(clan)
    }
  }
}

