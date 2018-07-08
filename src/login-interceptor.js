let interceptor = require('express-interceptor')

exports.LoginInterceptor = interceptor(function (req, res) {
  return {
    isInterceptable: function () {
      return (req.route && req.route.path) ?
        [
          '/profile',
          '/modifyPassword',
          '/users',
          '/menus'
        ].includes(req.route.path)
        : false
    },
    intercept: function (body, send) {
      if (req.sessionStore.sessions.user) {
        send(body)
      } else {
        send(JSON.stringify({status: 1, reset: 100, desc: '请先登录'}))
      }
    }
  }
})