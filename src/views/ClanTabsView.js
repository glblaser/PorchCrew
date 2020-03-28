import m from 'mithril'
import { ClanWarView } from './ClanWarView'
import { ClanCollectionsView } from './ClanCollectionsView'
import { ClanMembersView } from './ClanMembersView'
import _ from 'lodash'

export const ClanTabsView = () => {
  const renderClanTabs = (clanRoute) => {
    const isInfoRoute = !_.includes(['members', 'collections', 'war'], clanRoute)

    return m('div#clan-tabs.nav.nav-tabs[role="tablist"]', 
      m('a', { 
        id: 'clan-info-tab',
        class: `nav-item nav-link ${clanRoute === 'info' ? 'active' : ''}`,
        href: '#clan-info',
        'data-toggle': "tab",
        'aria-controls': "clan-info",
        'aria-selected': "true"
      }, 'Info'),
      m('a', {
        id: 'clan-members-tab',
        class: `nav-item nav-link ${clanRoute === 'members' ? 'active' : ''}`,
        href: '#clan-members',
        'data-toggle': 'tab',
        'aria-controls': 'clan-members',
        'aria-selected': 'false'
      }, 'Members'),
      m('a', {
        id: 'clan-collections-tab',
        class: `nav-item nav-link ${clanRoute === 'collections' ? 'active' : ''}`,
        href: '#clan-collections',
        'data-toggle': 'tab',
        'aria-controls': 'clan-collections',
        'aria-selected': 'false'
      }, 'Collections'),
      m('a', {
        id: 'clan-war-tab',
        class: `nav-item nav-link ${clanRoute === 'war' ? 'active' : ''}`,
        href: '#clan-war',
        'data-toggle': 'tab',
        'aria-controls': 'clan-war',
        'aria-selected': 'false'
      }, 'War')
    )
  }

  const renderClanTabsContent = (clan, clanClient, warClient, clanRoute) => {

    const routes = {
      info: m('div', {
        id: 'clan-info',
        class: `tab-pane fade col-sm-12 ${clanRoute === 'info' ? 'show active' : ''}`,
        role: 'tabpanel',
        'aria-labelledby': 'clan-info-tab'
      }, 'Clan info content'),
      members: m(ClanMembersView, { clan, clanClient, }),
      collections: m(ClanCollectionsView, { clan, warClient }),
      war: m(ClanWarView, { clan, warClient })
    }

    console.log('routes[clanRoute] is ', routes[clanRoute])

    return m('div#clan-tabs-content.tab-content',
      routes[clanRoute]
    )

    // return m('div#clan-tabs-content.tab-content',
    //   m('div', {
    //     id: 'clan-info',
    //     class: `tab-pane fade col-sm-12 ${clanRoute === 'info' ? 'show active' : ''}`,
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