# restify 是如何运行的

- `next()` 与 `return next()` 有什么区别
- 可以使用 `res.send(new Error('some error'));` 返回错误吗
- 如何正确返回错误信息

> 文档基于 restify 4.3.2
> 原码位于 /src/codes/x - Other/restify-i18n.js

> 基于 4.3.2 版本 https://github.com/restify/node-restify/tree/v4.3.2

```js
const restify = require('restify');

const server = restify.createServer({ name: 'myapp' });

// pre链
const pre = (req, res, next) => {
  console.log('pre chain: ', req.href());
  next();
};

// use链, 可写在一行, 或多行
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(auth, i18n);

// 业务链
const chains = [
  function(req, res, next) {
    res.send(req.params);
    return next();
  },
];
server.get('/echo/:name', chains);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
```

### 创建 Server

> [http.createServer()](http://nodejs.cn/api/http.html#http_http_createserver_options_requestlistener)

`restify.createServer()` 内部实际使用 `http.createServer()` 方法创建`server`

### restify 框架定义的响应处理链

- pre：在确定路由之前执行的处理器链
  执行日志记录, 记录性能指标, 个人不建议使用, 使用 nginx 日志代替.

- use：在确定路由之后执行的处理器链
  处理认证, 国际化等中间件.

- {httpVerb}：路由独有的处理器链
  处理业务逻辑

### restify 路由处理

将相同的 verb 放在一个对象中, 通过 uri 匹配对应的处理链.

执行顺序

1. 处理 pre 链
2. 处理 use 链
3. 处理业务(路由)链

`server.listen()` 执行完成后, 所有的链都已注册好, 等待请求.

restify 中使用 `server.on('request', (res, req) => {})` 监听请求事件, 收到请求后根据上面的顺序组合处理链, 并使用 `next()` 调用下一个.

`req` 实际基于 `http.IncomingMessage` 类增加自定义方法生成;
`res` 实际基于 `http.ServerResponse` 类增加自定义方法(如`res.send()`)生成;

`res.send(code, body, headers)` 中使用 `response.write(body)` 设置返回数据, `response.end()` 完成响应流.

### 注意事项

- `next()` 与 `return next()` 有什么区别
  区别是是否要执行 `next()` 之后的代码

```js
(req, res, next) => {
  console.log('use chain -> user');

  const cfg = { language: 'en' };

  req.user = cfg;
  next();

  console.log('return user'); // next() 没有 return 时, 会执行
};
```

- 可以使用 `res.send(new Error('some error'));` 返回错误吗

不可以, `res.send()` 返回的错误不会被错误事件监听捕获

```js
// 不会被 server.on('InternalServer', ...) 捕获
server.get('/error/500', (req, res, next) => {
  res.send(new errors.InternalServerError('boom!'));
  return next();
});

server.get('/error/400', (req, res, next) => next(new errors.BadRequestError('bad request')));

server.get('/error/404', (req, res, next) => next(new errors.NotFoundError('not found')));

server.on('NotFound', (req, res, err, cb) => {
  console.error('404 %s', req.href());
  return cb();
});

server.on('InternalServer', (req, res, err, cb) => {
  console.error('should not appear');
  return cb();
});
```

- 如何正确返回错误信息
  使用 `next(restify.errors.xxx('...'))` 返回.

```js
return next(new restify.errors.BadRequestError('token'));
```

建议使用 `restify.errors` 中的错误对象返回, 因为可以自动携带不同的错误码, 同时还可以为 i18n 作准备, 因为在处理国际化时, 错误对象会有 `{message: '...'}` 的格式, 只需要将 `...` 的内容转换为对应的语言即可.

而使用 `new Error('...')` 则只能返回错误码为 500 的错误.

### i18n(国际化) 错误信息

如示例代码 `/src/codes/x - Other/i18n.js` , 只需要在 `use链` 中添加处理返回的错误信息即可,

即将信息进行转换 `error.message = translate(t, error);`.
