import m from 'mithril'

export const ClanView = ({ attrs: { clanClient, clanTag }}) => {
  let clan = {}
 
  const validateSearchInput = () => {
    return searchBar.length > 0
  }
  
  const updateClanTag = (e) => {
    clanTag = e.target.value
    if (clanTag.length > 4) {
      searchButton.dom.classList.remove('d-none')
    } else {
      searchButton.dom.classList.add('d-none')
    }
  }

  const setClanTag = () => {
    if (clanTag && clanTag.length > 4) {
      let tag = clanTag.replace('#', '')
      m.route.set('/clan/:clanTag', {clanTag: tag})  
    }
  }

  const searchBtnAttrs = {
    onclick: setClanTag,
    type: 'submit',
    class: 'btn btn-primary'
  }

  const searchButton = m('button', searchBtnAttrs, m('i.fa.fa-search'))

  const loadClan = () => {
    clanClient.loadClan(clanTag)
    .then(res => {
      if (res != null) {
        clan = res
      }
    })
  }

  return {
    oncreate: () => {
      if (clanTag != undefined) {
        loadClan()
      }
    },
    view: (vNode) => {
      const searchBarAttrs = {
        oninput: updateClanTag,
        placeholder: 'Clan Tag',
        type: 'text',  
        value: clanTag
      }
      return m('div', 
        m('form.inline', 
          m('div.input-group', 
            m('input.form-control', searchBarAttrs)
            , searchButton
          )
        ),
        m('h5', clan.name)
      )
    }
  }
}