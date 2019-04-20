# Create React App 文档笔记 part-2

> https://facebook.github.io/create-react-app/docs/getting-started
> react-scripts: 2.1.8
> create-react-app: 2.1.8

## Building your App

#### Importing a Component

需要理解 [默认导出与命名导出的区别](./difference-between-default-and-named-exports.md)。

推荐使用 `import` 和 `export`，同时只导出一个组件，如 `export default Button`

```jsx
import React, { Component } from 'react';

class Button extends Component {
  render() {
    // ...
  }
}

export default Button; // Don’t forget to use export default!
```

#### Using Global Variables

在`HTML`文件中如果导入了带全局变量的文件，直接使用时 `linter` 会提示未定义。
所以要显式的从 `window` 中声明，如下:

```
  const $ = window.$;
```

或是在之后加入禁用语法检查的代码: `// eslint-disable-line`

#### Adding Bootstrap 、TypeScript、Relay、Router

参考官方文档， `Create React App` 并未有更多介绍。

#### Adding Custom Environment Variables

默认将在 `process.env` 上定义特殊的内建变量 `NODE_ENV`，还可以自定义以 `REACT_APP_` 开头的变量，其它变量会被忽略。将在 `build` 时会写入生成的文件中，在运行时可读取。

`macOS` 上临时添加变量命令:

```shell
REACT_APP_NOT_SECRET_CODE=abcdef npm start
```

还可以写在 `.env` 文件中，其中 `.env*.local` 文件不应该加入版本控制。

- `.env`：默认
- `.env.local`: 本地变量，会在除了 `test` 时导入
- `.env.development`, `.env.test`, `.env.production`: 在明确的环境中设置
- `.env.development.local`, `.env.test.local`, `.env.production.local`: 本地变量会覆盖相应的明确环境变量

左边文件优先级高于右边:

- `npm start`: `.env.development.local`, `.env.development`, `.env.local`, `.env`
- `npm run build`: `.env.production.local`, `.env.production`, `.env.local`, `.env`
- `npm test`: `.env.test.local`, `.env.test`, `.env`(注意没有 `.env.local`)

还可以将本机变量扩展至 `.env` 文件中

```
REACT_APP_VERSION=$npm_package_version
# REACT_APP_VERSION=${npm_package_version} # 另外一种写法
```

`.env` 文件中还可以使用变量

```
DOMAIN=www.example.com
REACT_APP_FOO=$DOMAIN/foo
REACT_APP_BAR=$DOMAIN/bar
```

#### Making a Progressive Web App 创建渐进式 Web App

> [官方文档](https://developers.google.com/web/progressive-web-apps/)

需要 Web App 需要工作在离线环境，可以使用此功能，将 `index.jsx` 中 `serviceWorker.unregister();` 改为 `serviceWorker.register();`

#### Creating a Production Build

> [缓存的最佳实践](https://jakearchibald.com/2016/caching-best-practices/) > [HTTP 缓存原理](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching#invalidating_and_updating_cached_responses)

使用 `npm run build` 命令会创建生产环境的 `build` 目录，`build/static` 目录是 JavaScript 和 CSS 文件。

`build/static/js` 会生成以下 3 个文件:

- `main.[hash].chunk.js`: 应用程序代码，如 App.js 等。
- `1.[hash].chunk.js`: 从 `node_modules` 导入的第三方代码。可以使用拆分代码使用缓存提高性能。
- `runtime~main.[hash].js`: 这是 `webpack` 在运行时导入和运行应用的逻辑。通常是嵌入在 `build/index.html` 中，`INLINE_RUNTIME_CHUNK=false` 参数可以设置为加载独立文件。

如果使用代码分割，`build/static` 目录还会有其它的文件。

###### 静态文件缓存

在 `build/static` 目录中的文件名都有唯一的基于内容生成的哈希值，所以可以使用缓存技术提高性能。
在 `index.html` 中设置 `Cache-Control: no-cache`，`build/static` 目录中的文件设置 `Cache-Control: max-age=31536000`(1 年)，这样可以确保浏览器总是获取最新的 `index.html`，而 `index.html` 引入的文件名都有哈希值，所以引入的文件肯定是正确的。
