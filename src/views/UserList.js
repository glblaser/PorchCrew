import m from 'mithril'
import { User } from '../models/User.js'

export default {
  oninit: User.loadList,
  view: function() {
      // TODO add code 
      return m('.user-list', User.list.map(user => {
        return m(m.route.Link, {
          class: "user-list-item",
          href: "/edit/" + user.id,
        }, user.firstName + " " + user.lastName)
      }))
  }
}