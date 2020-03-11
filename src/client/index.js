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

const layout = (view, viewAttrs) => {7
  return { view: () => m(Layout, m(view, viewAttrs)) }
}

m.route(document.body, '/', {
  '/': { view: () => m(Layout) },
  '/clan': layout(ClanView, { clanClient }),
  '/clan/:clanTag': layout(ClanView, { clanClient })
})
