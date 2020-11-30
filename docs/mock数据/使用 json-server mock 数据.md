# 使用 json-server mock 数据



> 官网: https://github.com/typicode/json-server

## 安装 

```shell
npm install -D json-server
```



## 配置

项目根目录创建 mock 文件夹, 及 db.json

```json
➜  test-mock git:(master) mkdir mock
➜  test-mock git:(master) cat mock/db.json
{
  "users": [
    {"id": 1, "name": "user1", "age": 20},
    {"id": 2, "name": "user2", "age": 21}
  ]
}
```



## 启动

```shell
➜  test-mock git:(master) npx json-server --watch ./mock/db.json 

  \{^_^}/ hi!

  Loading ./mock/db.json
  Done

  Resources
  http://localhost:3000/users

  Home
  http://localhost:3000

  Type s + enter at any time to create a snapshot of the database
  Watching...

```



## 设置 api 路径

- 默认路径: 以 db.json 中 key 名称为路径, 如 `/users`

- 定制路径: 新建文件 `routes.json` 启动时使用  `--routes routes.json` 参数

  ```shell
  ➜  test-mock git:(master) ✗ npx json-server --watch ./mock/db.json --routes ./mock/routes.json 
  
    \{^_^}/ hi!
  
    Loading ./mock/db.json
    Loading ./mock/routes.json
    Done
  
    Resources
    http://localhost:3000/users
  
    Other routes
    /other/users -> /users
  
    Home
    http://localhost:3000
  
    Type s + enter at any time to create a snapshot of the database
    Watching...
  ```

   `/other/users -> /users` 说明新的路径配置已生效, 两个地址返回同样的数据.



## GET 请求

过滤名称: = 完全匹配

```shell
GET http://localhost:3000/users

[
    {
        "id": 1,
        "name": "user1",
        "age": 20
    },
    {
        "id": 2,
        "name": "user2",
        "age": 21
    }
]
```

范围: _gte (大于等于) _lte(小于等于)

```shell
GET http://localhost:3000/users?age_gte=21

[
    {
        "id": 2,
        "name": "user2",
        "age": 21
    }
]
```



翻页: /users/?_page=1&_limt=1

```shell
GET http://localhost:3000/users?_page=2&_limit=1

[
    {
        "id": 2,
        "name": "user2",
        "age": 21
    }
]
```



排序:  _sort 指定排序字段, _order 指定正序或倒序

```shell
GET http://localhost:3000/users?_sort=id&_order=desc

[
    {
        "id": 2,
        "name": "user2",
        "age": 21
    },
    {
        "id": 1,
        "name": "user1",
        "age": 20
    }
]
```



## POST 请求

> 同时本地的 db.json 也会修改

创建用户

```shell
POST http://localhost:3000/users

BODY:
{
    "name": "new user",
    "age": "25"
}

RES:
{
    "id": 3
    "name": "new user",
    "age": "25",
}

GET http://localhost:3000/users

[
    {
        "id": 1,
        "name": "user1",
        "age": 20
    },
    {
        "id": 2,
        "name": "user2",
        "age": 21
    },
    {
        "name": "new user",
        "age": "25",
        "id": 3
    }
]

```



## PATCH 请求

修改 name

```shell
PATCH http://localhost:3000/users/3

BODY
{
    "name": "new user name"
}

RES:
{
    "id": 3
    "name": "new user name",
    "age": "25",
}
```

## DELETE 请求

删除 id=3

```shell
DELETE http://localhost:3000/users/3
```



## 自定义API

> 不使用默认的设置, 本地启动一个自定义 api

配置 server

```js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./mock/db.json')
const middlewares = jsonServer.defaults()

// 设置默认中间件 (日志, 静态文件等)
server.use(middlewares)

// 启用 request body
server.use(jsonServer.bodyParser)

// 自定义的 api
server.post('/run', (req, res) => {
  console.log('req.body: ', req.body);

  res.send({status: 'ok'})
})

// 加载 db.json 中 api 路径
server.use(router)

server.listen(3000, () => {
  console.log('JSON Server is running')
})
```

启动

```shell
➜  test-mock git:(master) ✗ node mock/server.js
JSON Server is running
```



请求

```shell
POST http://localhost:3000/run

BODY
{
    "data": "some data"
}

RES:
{
    "status": "ok"
}
```

