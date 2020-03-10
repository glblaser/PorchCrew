import m from 'mithril'

export const ClanView = ({ attrs: { clanClient, clanTag }}) => {
  let clan = {
    name: '...'
  }
 
  const validateSearchInput = () => {
    return searchBar.length > 0
  }

  const setClanTag = () => {
    if (clanTag && clanTag.length > 4) {
      let tag = clanTag.replace('#', '')
      m.route.set('/clan/:clanTag', {clanTag: tag})  
    }
  }

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
        oninput: (e) => clanTag = e.target.value,
        placeholder: 'Clan Tag',
        type: 'text',  
        value: clanTag
      }
      const searchBtnAttrs = {
        onclick: setClanTag,
        type: 'submit',
        class: 'btn btn-primary' + (clanTag ? '' : ' d-none')
      }
      return m('div', 
        m('form.inline', 
          m('div.input-group', 
            m('input.form-control', searchBarAttrs)
            , m('button', searchBtnAttrs, 
                m('i.fa.fa-search')
              )
          )
        ),
        m('h5', clan.name)
      )
    }
  }
}