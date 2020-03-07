// src/index.js
import m from 'mithril'
import UserList from '../views/UserList'
import UserForm from '../views/UserForm'
import Layout from '../views/Layout'

m.route(document.body, '/list', {
  '/list': {
    render: () => {
        return m(Layout, m(UserList))
    }
  },
  '/edit/:id': {
    render: (vnode) => {
        return m(Layout, m(UserForm, vnode.attrs))
    }
  }
})
