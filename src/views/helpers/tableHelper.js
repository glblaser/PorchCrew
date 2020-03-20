import m from 'mithril'

export const renderDateHeaders = (records) => {
  return records.map(record => {
    const date = new Date(record.createdDate)
    const month = date.toLocaleString('default', { month: 'short' })
    const day = date.getDate() 

    return m('th', month + ' ' + day)
  })
}
