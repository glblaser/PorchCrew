import m from 'mithril'
import { tagSearchForm } from './components/tagSearchForm'
import { ClanSummaryView } from './ClanSummaryView'
import { ClanTabsView } from './ClanTabsView'

export const ClanView = ({ attrs: { clanClient, warClient }}) => {
  let clan = {}
  let loading = false
  let error = false

  const clanTag = m.route.param('clanTag')

  const searchClan = (clanTag) => {
    m.route.set('/clan/:clanTag', { clanTag })
    loadClan(clanTag)
  }

  const loadClan = (clanTag) => {
    clan = {}
    loading = true

    clanClient.loadClan(clanTag)
    .then(res => {
      loading = false
      if (res != null) {
        error = false
        clan = res
      } else {
        error = true
      }
    })
    .catch(err => {
      loading = false
      error = true
    })
  }

  const searchForm = tagSearchForm(searchClan)

  const renderClan = () => {
    if (error) {
      return m('div.font-bold.font-italic.text-danger', 'Clan not found')
    } else if (clan === undefined || clan === {} ) {
      return m('div.font-italic.font-semibold', 'No clan loaded')
    } else {
      return m('div', m(ClanSummaryView, { clan }),
        m(ClanTabsView, { clan, clanClient, warClient })
      )
    }
  }

  return {
    oncreate: () => {
      if (clanTag != undefined) {
        loadClan(clanTag)
      }
    },
    view: (vNode) => {
      return m('div#clanView',
        m(searchForm),
        renderClan(clan),
      )
    }
  }
}