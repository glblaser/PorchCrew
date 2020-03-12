import m from 'mithril'


export const tagSearchForm = (searchFn) => {
  console.log('created tagSearchFrom')
  let tag = ''
  let loading = false
  let error = false
  let data = {}

  const renderSearchButton = () => {
    const searchBtnAttrs = {
      onclick: setTag,
      type: 'submit',
      class: 'btn btn-primary',
      disabled: !tag || tag.length <=4
    }

    return m('button', searchBtnAttrs, m('i.fa.fa-search'))   
  }

  const updateTag = (e) => {
    tag = e.target.value
  }

  const setTag = () => {
    console.log('tag is', tag)
    if (tag && tag.length > 4) {
      tag = tag.replace('#', '')
      searchFn(tag)
    }
  }

  const renderTagInput = () => {
    console.log('rendering tag')
    const attrs = {
      oninput: updateTag,
      placeholder: 'Search...',
      type: 'text',  
      value: tag,
      disabled: loading
    }
  
    return m('input.form-control', attrs)
  }

  const renderSearchError = () => {
    if (error) {
      return m('p.font-bold.font-italic.text-danger', 'Clan does not exist')
    }
  }

  const renderSearchForm = () => {
    console.log('render searchform')

    return m('form#searchbar.inline.row', 
      m('div.md-form.my-0',
        m('div.input-group', 
          renderTagInput(),
          renderSearchButton()
        )
      ), 
      renderSearchError(),
      m('p.font-weight-light.font-italic', { hidden: !loading }, "Loading...")
    )
  }

  return {
    view: (vNode) => {
      console.log('tag search form . view')
      return renderSearchForm()
    }
  }

}
