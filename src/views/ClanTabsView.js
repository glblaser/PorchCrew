import m from 'mithril'
import { ClanWarView } from './ClanWarView'
import { ClanCollectionsView } from './ClanCollectionsView'
import { ClanMembersView } from './ClanMembersView'

export const ClanTabsView = () => {
  const renderClanTabs = () => {
    return m('div#clan-tabs.nav.nav-tabs[role="tablist"]', 
      m('a', { 
        id: 'clan-info-tab',
        class: 'nav-item nav-link',
        href: '#clan-info',
        'data-toggle': "tab",
        'aria-controls': "clan-info",
        'aria-selected': "true"
      }, 'Info'),
      m('a', {
        id: 'clan-members-tab active',
        class: 'nav-item nav-link',
        href: '#clan-members',
        'data-toggle': 'tab',
        'aria-controls': 'clan-members',
        'aria-selected': 'false'
      }, 'Members'),
      m('a', {
        id: 'clan-collections-tab',
        class: 'nav-item nav-link',
        href: '#clan-collections',
        'data-toggle': 'tab',
        'aria-controls': 'clan-collections',
        'aria-selected': 'false'
      }, 'Collections'),
      m('a', {
        id: 'clan-war-tab',
        class: 'nav-item nav-link',
        href: '#clan-war',
        'data-toggle': 'tab',
        'aria-controls': 'clan-war',
        'aria-selected': 'false'
      }, 'War')
    )
  }

  const renderClanTabsContent = (clan, clanClient, warClient) => {
    return m('div#clan-tabs-content.tab-content',
      m('div', {
        id: 'clan-info',
        class: 'tab-pane fade col-sm-12',
        role: 'tabpanel',
        'aria-labelledby': 'clan-info-tab'
      }, 'Clan info content'),
      m(ClanCollectionsView, { clan, warClient }),
      m(ClanWarView, { clan, warClient }),
      m(ClanMembersView, { clan, clanClient }),
    )
  }

  const renderClanTabsView = (clan, clanClient, warClient) => {
    if (clan.tag) {
      return m('nav',
        renderClanTabs(),
        renderClanTabsContent(clan, clanClient, warClient)
      )
    }
  }

  return {
    oninit: () => {
      // console.log('clantabsview loaded')
    },
    view: ({ attrs: { clan, clanClient, warClient }}) => {
      return renderClanTabsView(clan, clanClient, warClient)
    }
  }
}