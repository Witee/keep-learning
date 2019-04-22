# Create React App 文档笔记 part-3

> https://facebook.github.io/create-react-app/docs/getting-started
> react-scripts: 2.1.8
> create-react-app: 2.1.8

## Back-End Integration

#### Proxying API Requests in Development

前后端如果使用相同的主机和端口，可以在 `package.json` 中添加 `proxy` 字段：

```json
"proxy": "http://localhost:4000",
```

这样以 `/api/` 开头的请求就会代理到对应的地址。
启用会可能会报 `Invalid Host Header` 的错误，可以在 `.env.development` 中添加 `HOST=mypublicdevhost.com` 配置

`proxy` 配置只在 `npm start` 时生效，生产环境需要指定正确的地址。

###### Configuring the Proxy Manually

如果 `option` 配置不够灵活，还可以使用中间件，
安装

```shell
npm i -D http-proxy-middleware
```

然后创建 `src/setupProxy.js`

```js
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api', { target: 'http://localhost:5000/' }));
};
```

#### Fetching Data with AJAX Requests

使用全局函数 `fetch` 可以发起 `AJAX` 请求，返回一个 `Promise`.

#### Title and Meta Tags

可以在 `/public/index.html` 中修改 `<title>`，动态可以使用浏览器的 `document.totle` API，还可以使用第三方库 `React Helmet`。

###### Generating Dynamic `<meta>` Tags on the Server

推荐使用占位符，然后就可以在服务端替换成具体的值，如下:

````html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta property="og:title" content="__OG_TITLE__" />
    <meta property="og:description" content="__OG_DESCRIPTION__" />
    ```
  </head>
</html>
````

###### Injecting Data from the Server into the Page

还可以在 HTML 中添加全局变量占位符:

````html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script>
      window.SERVER_DATA = __SERVER_DATA__;
    </script>
    ```
  </head>
</html>
````

## Deployment

提到的内容基本没用上，不总结了

## Advanced Usage

#### Acvanced Configuration

shell 或 `.env` 中可以设置环境变量：

- BROWSER: `npm start` 时打开的浏览器，设置为 `none` 表示关闭自动打开功能
- HOST: 开发环境默认绑定 `localhost`，可以指定为其它
- PORT: 开发环境默认为 3000 端口，可指定为其它
- HTTPS: 设置为 `true` 表示开发环境使用 `https` 模式
- PUBLIC_URL: Create React App 假设应用服务在根或是 `package.json` 的 `homepage` 定义的子目录下。通常会忽略主机名，此变量可以强制将资源指向提供的地址，尤其对 CDN 特别有用。
- CI: 如果设置为 `true`，Create React App 在构建时如果有错误会停止。运行测试时不进入监控模式
- REACT_EDITOR: 开发环境中如果有报错，点击文件链接可以通过编辑器打开，设置为 `none` 关闭此功能
- CHOKIDAR_USEPOLLING: 设置为 true 时，watcher 在 VM 内部根据需要以轮询模式运行。如果 npm start 未检测到更改，请使用此选项。
- NODE_PATH: 只允许设置相对路径。通过设置 NODE_PATH=src 可以方便地模拟 monorepo 设置。
- INLINE_RUNTIME_CHUNK: 默认情况下，Create React App 会在生成构建期间将运行时脚本嵌入到 index.html 中。设置为 false 时，脚本将不会嵌入，并将照常导入。在处理 CSP 时通常需要这样做。
