import m from 'mithril'
import { Clan } from '../models/Clan.js'

export default {
  // oninit: (vnode) => {Clan.loadClan(vnode.attrs.clanTag)},

  view: () => {
    let searchBar = ''

    return [ m('div', [
      m('input.search[type=text][placeholder=Clan Tag]', {
        oninput: (e) => {
          searchBar = e.target.value
          // console.log(searchBar)
        }
      })
      , m('button.button.fa.fa-search[type=submit]', {
        onclick: () => {
          console.log(searchBar)
          Clan.loadClan('9VUPUQJP')
        }
      })])
      , m('div', Clan.clan.name)
    ]
  }
}