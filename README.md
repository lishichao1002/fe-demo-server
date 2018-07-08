| 地址            | 请求方式 | 参数                               | 功能             |
| --------------- | -------- | ---------------------------------- | ---------------- |
| /login          | POST     | username, password                 | 登录             |
| /logout         | POST     |                                    | 退出登录         |
| /profile        | GET      |                                    | 获取当前登录用户 |
| /modifyPassword | POST     | oldPassword, newPassword           | 修改密码         |
| /menus          | GET      |                                    | 获取菜单         |
| /users          | POST     | currentPage, pageSize, name, email | 分页获取用户列表 |
| /users/add      | POST     | id, name, username, email, desc    | 添加用户         |
| /users/delete   | POST     | id                                 | 删除用户         |
|                 |          |                                    |                  |


