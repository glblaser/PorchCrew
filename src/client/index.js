import m from 'mithril'
// import UserList from '../views/UserList'
// import UserForm from '../views/UserForm'
import Layout from '../views/Layout'
import { ClanView } from '../views/ClanView'
import { ClanClient } from '../models/ClanClient'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css' // Import precompiled Bootstrap css
import '@fortawesome/fontawesome-free/css/all.css'



const clanClient = ClanClient('localhost', 3099)

m.route(document.body, '/', {
  '/': { view: () => m(Layout) },
  '/clan': { view: () => m(Layout, m(ClanView, { clanClient }))},
  '/clan/:clanTag' : { view: () => m(Layout, m(ClanView, { clanClient, clanTag: m.route.param('clanTag') }))}
})
