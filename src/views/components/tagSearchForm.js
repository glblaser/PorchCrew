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
    if (tag && tag.length > 4) {
      let tag = tag.replace('#', '')
      loadData()
    }
  }

  // const searchBtnAttrs = {
  //   onclick: setTag,
  //   type: 'submit',
  //   class: 'btn btn-primary'
  // }

  // const searchButton = m('button', searchBtnAttrs, m('i.fa.fa-search'))

  const loadData= () => {
    data = {}
    loading = true
    searchFn(tag)
    .then(res => {
      loading = false
      if (res != null) {
        error = false
        cb(res)
      } else {
        error = true
      }
    })
    .catch(err => {
      loading = false
      error = true
    })
  }

  const renderTagInput = () => {
    console.log('rendering tag')
    const attrs = {
      oninput: updateTag,
      placeholder: 'Clan Tag',
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

    return m('form.inline', 
      m('div.input-group', 
        renderTagInput(),
        renderSearchButton()
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
