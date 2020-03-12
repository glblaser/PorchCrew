import m from 'mithril'

export const Layout = () => {
  const createNavLink = (path, name) => {
    let routePath = m.route.get()
    let active = routePath.startsWith(path) ? 'active' : ''
    return m('li.nav-item', 
      m(m.route.Link, { href: path, class: `nav-link ${active}` }, name)
    )
  }

  const renderMenuButton = () => {
    const menuBtnAttrs = {
      type: 'button',
      class: 'navbar-toggler mr-auto',
      'data-toggle': 'collapse',
      'data-target': '#menu',
      'aria-controls': 'basicExampleNav',
      'aria-expanded': 'false',
      'aria-label': 'Toggle navigation'
    }

    return m('button', menuBtnAttrs, m('span.navbar-toggler-icon'))   
  }

  const renderNavBar = () => {
    return m('nav.navbar.navbar-expand-lg.navbar-dark.bg-primary', 
      m('div.container', 
        m('a.navbar-brand', { href: '/' }, 'PorchCrew.net'),
        renderMenuButton(),
        m('div#menu.navbar-collapse.collapse', 
          m('ul.navbar-nav.mr-auto', 
            createNavLink('/clan', 'Clans'),
            createNavLink('/player', 'Players')
          )
        )
      )
    )
  }

  const renderContent = (vnode) => {
    return m('div.container', vnode.children)
  }

  return {
    view: (vnode) => {
      return m('div.main',
        renderNavBar(), 
        renderContent(vnode)
      )
    }
  }
}

