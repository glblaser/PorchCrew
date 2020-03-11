import m from 'mithril'
import { tagSearchForm } from './components/tagSearchForm'

export const ClanView = ({ attrs: { clanClient, clanTag }}) => {
  let clan = {}

  const onClanDataLoaded = (clan) => {
    console.log(clan)
  }

  const searchClan = (clanTag) => {
    m.route.set('/clan/:clanTag', { clanTag })
  }

  const searchForm = m(tagSearchForm(searchClan))

  return {
    oncreate: () => {
      if (clanTag != undefined) {
        loadClan()
      }
    },
    view: (vNode) => {
      console.log('redrawing clanview')

      return m('div',
        searchForm,
        m('h5',
          clan.name
        )
      )
    }
  }
}