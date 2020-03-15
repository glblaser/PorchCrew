import m from 'mithril'

export const User = {
  list: [],
  loadList: () => {
    return m.request({
      method: "GET",
      url: "https://rem-rest-api.herokuapp.com/api/users",
      withCredentials: true,
    })
    .then(function(result) {
      User.list = result.data
    })
  },
  current: {},
  load: (id) => {
    return m.request({
      method: "GET",
      url: "https://rem-rest-api.herokuapp.com/api/users/" + id,
      withCredentials: true,
    })
    .then(function(result) {
      User.current = result
    })
  },
  save: () => {
    return m.request({
        method: "PUT",
        url: "https://rem-rest-api.herokuapp.com/api/users/" + User.current.id,
        body: User.current,
        withCredentials: true,
    })
  }
}