import m from 'mithril'
import imgs from '../imgs/*.png'
import { ClanWarView } from './ClanWarView'
import { ClanCollectionsView } from './ClanCollectionsView'
import { ClanInfoView } from './ClanInfoView'
import { ClanMembersView } from './ClanMembersView'
import _ from 'lodash'

export const ClanTabsView = () => {
  const route = m.route.get()
  const baseRoute = _.join(_.split(route, '/', 3),'/')
  let clanTabRoute = _.split(route, '/')[3]

  clanTabRoute = _.includes(['members', 'collections', 'war'], clanTabRoute) ? clanTabRoute : 'info'
  
  const renderClanTabs = () => {

    const renderInfoTab = () => {
      return m('a', { 
        id: 'clan-info-tab',
        class: `nav-item nav-link ${clanTabRoute === 'info' ? 'active' : ''}`,
        onclick: () => {
          m.route.set(baseRoute)
        },
      }, 'Info')
    }

    const renderMembersTab = () => {
      return m('a', {
        id: 'clan-members-tab',
        class: `nav-item nav-link ${clanTabRoute === 'members' ? 'active' : ''}`,
        onclick: () => {
          m.route.set(baseRoute + '/members')
        }
      }, 
        m('div', { class: 'row' }, 
          m('div', '   '),
          m('img', { src: imgs.members, style: 'width:auto;height:22px;padding-left:10px;padding-right:10px;' }),
          m('div', { style: 'padding-right:10px;'}, 'Members')
        )
      )
    }

    const renderCollectionsTab = () => {
      return m('a', {
        id: 'clan-collections-tab',
        class: `nav-item nav-link ${clanTabRoute === 'collections' ? 'active' : ''}`,
        onclick: () => {
          m.route.set(baseRoute + '/collections')
        }
      }, 'Collections')
    }

    const renderWarTab = () => {
      return m('a', {
        id: 'clan-war-tab',
        class: `nav-item nav-link ${clanTabRoute === 'war' ? 'active' : ''}`,
        onclick: () => {
          m.route.set(baseRoute + '/war')
        }
      }, 'War')
    }


    return m('div#clan-tabs.nav.nav-tabs', 
      renderInfoTab(),
      renderMembersTab(),
      renderCollectionsTab(),
      renderWarTab()
    )
  }

  const renderClanTabsContent = (clan, clanClient, warClient) => {

    const tabs = {
      info: m(ClanInfoView, { clan }),
      members: m(ClanMembersView, { clan, clanClient, }),
      collections: m(ClanCollectionsView, { clan, warClient }),
      war: m(ClanWarView, { clan, warClient })
    }

    return m('div#clan-tabs-content.tab-content',
      tabs[clanTabRoute]
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