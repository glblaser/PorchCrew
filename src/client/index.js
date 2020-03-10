import m from 'mithril'
// import UserList from '../views/UserList'
// import UserForm from '../views/UserForm'
import Layout from '../views/Layout'
import ClanInfo from '../views/ClanInfo'


m.route(document.body, '/', {
  '/': {
    render: () => {
        return m(Layout)
    }
  },
  '/clan': {
    render: () => {
        return m(Layout, m(ClanInfo))
    }
  }
})
