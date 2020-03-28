import m from 'mithril'
// import UserList from '../views/UserList'
// import UserForm from '../views/UserForm'
import { Layout } from '../views/Layout'
import { ClanView } from '../views/ClanView'
import { ClanClient } from '../models/ClanClient'
import { WarClient } from '../models/WarClient'
import { HOST, PORT } from '../../conf/config.js';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css' // Import precompiled Bootstrap css
import '@fortawesome/fontawesome-free/css/all.css'

const clanClient = ClanClient(HOST, PORT)
const warClient = WarClient(HOST, PORT)

const layout = (view, viewAttrs) => {
  return view ? { view: () => m(Layout, m(view, viewAttrs)) }
    : { view: () => m(Layout) }
}

m.route(document.body, '/', {
  '/': layout(),
  '/clan': layout(ClanView, { clanClient, warClient }),
  '/clan/:clanTag': layout(ClanView, { clanClient, warClient, clanRoute:'info' }),
  '/clan/:clanTag/members': layout(ClanView, { clanClient, warClient, clanRoute:'members' }),
  '/clan/:clanTag/collections': layout(ClanView, { clanClient, warClient, clanRoute:'collections' }),
  '/clan/:clanTag/war': layout(ClanView, { clanClient, warClient, clanRoute:'war' })
})
