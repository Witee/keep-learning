# Create React App 文档笔记 part-1

> https://facebook.github.io/create-react-app/docs/getting-started
> react-scripts: 2.1.8
> create-react-app: 2.1.8

## Getting Started 入门

#### 创建项目

`create-react-app` 官方不推荐安装在全局，而是使用 `npx`，确保每次都使用最新版本。

```shell
npx create-react-app -V // 执行时如果命令不存在，则会自动安装
// --typescript 表示使用 typescript
npx create-react-app app_name --typescript
```

#### create-react-app 2.1.8 版本支持的语言特性

- `Exponentiation Operator` 幂运算
- `async/await`
- `rest/spread Properties` 扩展运算符
- `import()` 动态导入
- `Class Fields and Static Properties`
- `JSX`
- `Flow` 静态属性检查器
- `TypeScript`

默认没有包含 [polyfills](https://github.com/facebook/create-react-app/blob/master/packages/react-app-polyfill/README.md)

## Development 开发环境

#### Visual Studio Code 配置

- `highlighting`
- `lint`
- `debugging`

  ```json
  .vscode/launch.json
  {
    "version": "0.2.0",
    "configurations": [
      {
        "name": "Chrome",
        "type": "chrome",
        "request": "launch",
        "url": "http://localhost:3000",
        "webRoot": "${workspaceFolder}/src",
        "sourceMapPathOverrides": {
          "webpack:///src/*": "${webRoot}/*"
        }
      }
    ]
  }

  ```

  然后执行 `npm start`，回到编辑器按 `F5`，即可弹出浏览器，然后进行打断点之类的操作。

- `Formatting Code Automatically`

  通过安装 3 个包实现，通过编辑器实现了，所以未安装。

  ```shell
  npm i -D husky lint-staged prettier
  ```

#### Developing Components in Isolation 隔离环境开发组件

- `Storybook`: 是 React Ui 组件开发环境。使用交互方式在每一个`states`中浏览组件。

  运行以下命令，然后根据文档操作。

  ```shell
  npx -p @storybook/cli sb init
  ```

- `Styleguidist`: 在一个独立开发组件的环境中集成了风格、用法指南，类似于`Storybook`。在`Styleguidist`中，您用`Markdown`编写示例，其中每个代码片段都呈现为一个可实时编辑的场所。

  安装

  ```shell
  npm install --save react-styleguidist
  ```

  修改`package.json`

  ```json
  "scripts": {
    ...
    "styleguide": "styleguidist server",
    "styleguide:build": "styleguidist build",
    ...
  }
  ```

  然后在 `app` 目录运行命令，按照提示操作

  ```shell
  npm run styleguide
  ```

#### Analyzing the Bundle Size 分析打包大小

`Source map explorer` 使用 `source maps` 分析打包大小，帮助理解包是如何变大的。

```shell
npm install --save source-map-explorer
```

修改`package.json`

```json
  "scripts": {
    ...
    "analyze": "source-map-explorer 'build/static/js/*.js'",
    ...
  }
```

使用命令如下：

```shell
npm run build
npm run analyze
```

#### 启用 HTTPS

`macOS`

```shell
HTTPS=true npm start
```

## Styles and Assets

#### 添加样式表

直接在组件中使用 `import './Button.css';` 导入，在生产环境时会自动打包到一个压缩的`.css`文件中

也可以将所有的样式写入 `src/index.css`，由 `src/index.js` 导入，方便同时清除。

#### Adding a CSS Modules Stylesheet 添加 CSS 模块样式表 [可选]

默认即支持常规 `<link>` 样式表和 `CSS` 文件，同时还可以使用 CSS 模块 功能，以 `.module.css` 结尾，表示使用此功能。

更多使用方法访问 [CSS MODULES](./css-modules.md)

#### Adding a Sass Stylesheet

需要安装 `node-sass`

```shell
npm i -D node-sass
```

将 `src/App.css` 改名为 `src/App.scss`，同时更新 `src/App.js`中的引入名称。

#### Post-Processing CSS

项目中会自动通过 `Autoprefixer` 设置，增加样式前缀支持多种浏览器。

在 `package.json` 中通过 `browserslist` 定制。

#### Adding Images, Fonts, and Files

使用 `import` 导入，如

JSX

```jsx
import React from 'react';
import logo from './logo.png'; // Tell Webpack this JS file uses this image

console.log(logo); // /logo.84287d09.png

function Header() {
  // Import result is the URL of your image
  return <img src={logo} alt="Logo" />;
}

export default Header;
```

CSS

```css
.Logo {
  background-image: url(./logo.png);
}
```

SVG，使用 `ReactComponent` 导入名称，表示渲染成组件，而不只是名称。

```jsx
import { ReactComponent as Logo } from './logo.svg';
const App = () => (
  <div>
    {/* Logo is an actual React component */}
    <Logo />
  </div>
);
```

#### Using the Public Folder

`create-react-app` 鼓励使用 `import` 导入文件。有以下 3 个好处:

- 会将脚本、样式表打包在一起，减少网络请求
- 打包时，如果文件不存在会报 404
- 文件名会包含哈希值，解决缓存旧版本问题

放在 `public` 目录的文件不会经过 `webpack` 处理，只会复制到 `build` 目录中。
`index.html` 中可以使用变量 `PUBLIC_URL` ，如:

```html
<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
```

可以在 `js` 中使用这个变量 `return <img src={process.env.PUBLIC_URL + '/img/logo.png'} />;`

#### Code Splitting 代码分割

> [Code Splitting in Create React App](https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html) > [Code-Splitting in React](https://reactjs.org/docs/code-splitting.html)

提案中的新特性，通过 `import()` 按需导入，返回一个 `Promise`，参数为模块名称。
同样可以使用 `async/await`处理。

```jsx
import React, { Component } from 'react';

class App extends Component {
  handleClick = () => {
    import('./moduleA')
      .then(({ moduleA }) => {
        // Use moduleA
      })
      .catch((err) => {
        // Handle failure
      });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Load</button>
      </div>
    );
  }
}

export default App;
```
