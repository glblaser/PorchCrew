import m from 'mithril'

export default {
    view: (vnode) => {
        return m("main.layout", [
            m("nav.menu", [
                m(m.route.Link, {href: "/clan"}, "Clans"),
                m(m.route.Link, {href: "/player"}, "Players")
            ]),
            m("div.container", vnode.children)
        ])
    }
}
