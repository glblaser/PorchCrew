import m from 'mithril'

export default {
    view: (vnode) => {
        return m("main.layout", [
            m("nav.menu", [
                m(m.route.Link, {href: "/list"}, "Clans"),
                m(m.route.Link, {href: "/list"}, "Players")
            ]),
            m("section", vnode.children)
        ])
    }
}
