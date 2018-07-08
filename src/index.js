let express = require('express')
let session = require('express-session')
let cors = require('express-cors')
let bodyParser = require('body-parser')

let LoginInterceptor = require('./login-interceptor').LoginInterceptor
let all_data = require('./data').data

let app = express()

app.use(session({secret: 'the session keys', cookie: {maxAge: 60000}}))
app.use(LoginInterceptor)
app.use(cors({
  allowedOrigins: [
    'http://localhost:63342',
    'http://localhost:8080',
    'http://localhost:3000',
    'http://localhost:8000',
  ]
}))
app.use(bodyParser.urlencoded({
  extended: true
}))

let user = {username: 'admin', password: 'admin1234'}

/***
 * /profile 获取当前登录用户
 * /login 登录
 * /logout 退出登录
 * /modifyPassword 修改密码
 * /menus 获取菜单
 * /users 分页获取用户列表
 * /users/add 添加用户
 * /users/delete 删除用户
 */
//获取当前登录用户详情
app.get('/profile', function (req, res) {
  res.send(req.session.user)
})

//登录接口
app.post('/login', function (req, res) {
  let {username, password} = req.body
  if (username === user.username && password === user.password) {
    req.sessionStore.sessions.user = user
    res.send({status: 0, desc: '登录成功'})
  } else {
    res.send({status: 1, desc: '用户名或密码错误'})
  }
})

//modify password
app.post('/modifyPassword', function (req, res) {
  let {newPassword, oldPassword} = req.body
  if (oldPassword === user.password) {
    user.password = newPassword
    res.send({status: 0, desc: 'success'})
  } else {
    res.send({status: 1, desc: 'oldPassword invalid'})
  }
})

//退出登录接口
app.post('/logout', function (req, res) {
  req.sessionStore.set('user', null)
  res.send({status: 0, desc: '登出成功'})
})

//获取菜单列表
app.get('/menus', function (req, res) {
  res.send({
    status: 0,
    data: [{
      name: '系统管理',
      submenus: [{
        name: '用户管理'
      }]
    }]
  })
})

//分页获取用户列表
app.post('/users', function (req, res) {
  let {currentPage, pageSize, name, email} = req.body || {currentPage: 1, pageSize: 10}
  let data = [...all_data]
  if (name) {
    data = data.filter((row) => row.name.includes(name))
  }
  if (email) {
    data = data.filter((row) => row.email.includes(email))
  }

  let page_data = data.slice(currentPage * pageSize - pageSize, pageSize)
  res.send({
    total: data.length,
    rows: page_data
  })
})

//分页获取用户列表
app.post('/users/add', function (req, res) {
  let {id, name, username, email, desc} = req.body
  all_data.push({id, name, username, email, desc})
  res.send({status: 0, desc: 'success'})
})

//分页获取用户列表
app.post('/users/delete', function (req, res) {
  let {id} = req.body
  all_data = all_data.filter(row => row.id !== id)
  res.send({status: 0, desc: 'success'})
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))