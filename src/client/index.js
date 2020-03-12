import m from 'mithril'
// import UserList from '../views/UserList'
// import UserForm from '../views/UserForm'
import { Layout } from '../views/Layout'
import { ClanView } from '../views/ClanView'
import { ClanClient } from '../models/ClanClient'
import { HOST, PORT } from '../../conf/config.js';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css' // Import precompiled Bootstrap css
import '@fortawesome/fontawesome-free/css/all.css'

const clanClient = ClanClient(HOST, PORT)

const layout = (view, viewAttrs) => {
  return view ? { view: () => m(Layout, m(view, viewAttrs)) }
    : { view: () => m(Layout) }
}

m.route(document.body, '/', {
  '/': layout(),
  '/clan': layout(ClanView, { clanClient }),
  '/clan/:clanTag': layout(ClanView, { clanClient })
})
