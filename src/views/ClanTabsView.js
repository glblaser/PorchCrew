import m from 'mithril'
import { ClanWarContentView } from './ClanWarContentView'
import { ClanCollectionsView } from './ClanCollectionsView'

export const ClanTabsView = () => {
  const renderClanTabs = () => {
    return m('div#clan-tabs.nav.nav-tabs[role="tablist"]', 
      m('a', { 
        id: 'clan-info-tab',
        class: 'nav-item nav-link active',
        href: '#clan-info',
        'data-toggle': "tab",
        'aria-controls': "clan-info",
        'aria-selected': "true"
      }, 'Info'),
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
      }, 'War'),
      m('a', {
        id: 'clan-donations-requests-tab',
        class: 'nav-item nav-link',
        href: '#clan-donations-requests',
        'data-toggle': 'tab',
        'aria-controls': 'clan-donations-requests',
        'aria-selected': 'false'
      }, 'Donations/Requests')
    )
  }

  const renderClanTabsContent = (clan, warClient) => {
    return m('div#clan-tabs-content.tab-content',
      m('div', {
        id: 'clan-info',
        class: 'tab-pane fade show active',
        role: 'tabpanel',
        'aria-labelledby': 'clan-info-tab'
      }, 'Clan info content'),
      m(ClanCollectionsView, { clan, warClient }),
      m(ClanWarContentView, { clan, warClient }),
      m('div', {
        id: 'clan-donations-requests',
        class: 'tab-pane fade',
        role: 'tabpanel',
        'aria-labelledby': 'clan-donations-requests-tab'
      }, 'Clan donations/requests content'),
    )
  }

  const renderClanTabsView = (clan, warClient) => {
    if (clan.tag) {
      return m('nav',
        renderClanTabs(),
        renderClanTabsContent(clan, warClient)
      )
    }
  }

  return {
    oninit: () => {
      console.log('clantabsview loaded')
    },
    view: ({ attrs: { clan, warClient }}) => {
      return renderClanTabsView(clan, warClient)
    }
  }
}