import m from 'mithril'
import { ClanWarView } from './ClanWarView'
import { ClanCollectionsView } from './ClanCollectionsView'
import { ClanMembersView } from './ClanMembersView'
import _ from 'lodash'

export const ClanTabsView = () => {
  const renderClanTabs = (clanTab) => {
    const route = m.route.get()
    const baseRoute = _.join(_.split(route, '/', 3),'/')

    return m('div#clan-tabs.nav.nav-tabs[role="tablist"]', 
      m('a', { 
        id: 'clan-info-tab',
        class: `nav-item nav-link ${clanTab === 'info' ? 'active' : ''}`,
        onclick: () => {
          m.route.set(baseRoute)
        },
      }, 'Info'),
      m('a', {
        id: 'clan-members-tab',
        class: `nav-item nav-link ${clanTab === 'members' ? 'active' : ''}`,
        onclick: () => {
          m.route.set(baseRoute + '/members')
        }
      }, 'Members'),
      m('a', {
        id: 'clan-collections-tab',
        class: `nav-item nav-link ${clanTab === 'collections' ? 'active' : ''}`,
        onclick: () => {
          m.route.set(baseRoute + '/collections')
        }
      }, 'Collections'),
      m('a', {
        id: 'clan-war-tab',
        class: `nav-item nav-link ${clanTab === 'war' ? 'active' : ''}`,
        onclick: () => {
          m.route.set(baseRoute + '/war')
        }
      }, 'War')
    )
  }

  const renderClanTabsContent = (clan, clanClient, warClient, clanTab) => {

    const tabs = {
      info: m('div', {
        id: 'clan-info',
        class: `tab-pane fade col-sm-12 ${clanTab === 'info' ? 'show active' : ''}`,
        // role: 'tabpanel',
        // 'aria-labelledby': 'clan-info-tab'
      }, 'Clan info content'),
      members: m(ClanMembersView, { clan, clanClient, }),
      collections: m(ClanCollectionsView, { clan, warClient }),
      war: m(ClanWarView, { clan, warClient })
    }

    console.log('routes[clanTab] is ', tabs[clanTab])

    return m('div#clan-tabs-content.tab-content',
      tabs[clanTab]
    )

    // return m('div#clan-tabs-content.tab-content',
    //   m('div', {
    //     id: 'clan-info',
    //     class: `tab-pane fade col-sm-12 ${clanTab === 'info' ? 'show active' : ''}`,
    //     role: 'tabpanel',
    //     'aria-labelledby': 'clan-info-tab'
    //   }, 'Clan info content'),
    //   m(ClanMembersView, { clan, clanClient, }),
    //   m(ClanCollectionsView, { clan, warClient }),
    //   m(ClanWarView, { clan, warClient })
    // )
  }

  const renderClanTabsView = (clan, clanClient, warClient, clanRoute) => {
    if (clan.tag) {
      return m('nav',
        renderClanTabs(clanRoute),
        renderClanTabsContent(clan, clanClient, warClient, clanRoute)
      )
    }
  }

  return {
    oninit: () => {
      // console.log('clantabsview loaded')
    },
    view: ({ attrs: { clan, clanClient, warClient, clanRoute }}) => {
      return renderClanTabsView(clan, clanClient, warClient, clanRoute)
    }
  }
}