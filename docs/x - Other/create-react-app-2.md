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

## Testing

#### Running Tests

Create React App 使用 `Jest` 作为测试运行器，并通过 `jsdom` 提供了些与真实浏览器相似的全局变量，如 `window`。
Create React App 不包括单独的浏览器端到端测试。

###### Filename Conventions 文件名约定

以下文件将作为测试文件:

- `__tests__` 目录中以 `.js` 结尾
- 以 `.test.js` 结尾
- 以 `.spec.js` 结尾
  推荐放在与被测试代码一目录或 `__tests__` 目录中

###### Command Line Interface

当运行 `npm test` 时会启动监控模式，每次保存文件将重新运行测试。
同时还包含了一个命令行的交互形式的接口。

###### Version Control Integration

执行 `npm test` 时，默认只会运行自上次提交之后修改的文件的测试用例，注意，如果提交未通过测试用例的代码，会存在问题。在命令行交互中按 `a` 可运行所有测试。

在以下情况 Jest 总会运行所有测试用例：

- continuous integration 持续集成服务器
- 项目不在 Git 或 Mercurial 库中

#### Writing Tests

使用 `it()` 包裹单个测试用例，不必要也不推荐使用 `describe()` 分组。Jest 还提供了内建的 `expect()` 全局函数进行断言:

```js
import sum from './sum';

it('sums numbers', () => {
  expect(sum(1, 2)).toEqual(3);
  expect(sum(2, 2)).toEqual(4);
});
```

Jest 所有支持的断言匹配器访问[这里](https://jestjs.io/docs/en/expect.html#content)。

`jest.fn()` 和 `expect(fn).toBeCalled()` 用来创建监视、模拟函数。

###### Testing Components

你可以选择一系列的测试技术。如 “smoke test 冒烟测试”、shallow rendering 浅渲染中测试输出内容、full rendering 完整渲染中测试组件生命周期和状态改变。

- 在 `src/App.test.js` 中添加一个“smoke test”，确保在渲染期间没有抛出异常

  ```js
  import React from 'react';
  import ReactDOM from 'react-dom';
  import App from './App';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
  ```

- `Shallow Rendering` 在隔离环境中测试子组件渲染，使用 Enzyme 中的 `shallow()` 渲染 API

  安装

  ```shell
  npm install --save enzyme enzyme-adapter-react-16 react-test-renderer
  ```

  创建全局配置文件 `src/setupTests.js`

  ```js
  import { configure } from 'enzyme';
  import Adapter from 'enzyme-adapter-react-16';

  configure({ adapter: new Adapter() });

  <!-- 如果使用 TypeScript，且设置了 '--isolatedModules'，则要求每个文件至少有一个 `export`，
  所以需要添加以下代码 -->
  // export default undefined
  ```

  编写冒烟测试: 使用 `shallow()` 替换 `ReactDOM.render()`，进行浅渲染，完整渲染使用 `mount()`

  ```js
  import React from 'react';
  import { shallow } from 'enzyme';
  import App from './App';

  it('renders without crashing', () => {
    shallow(<App />);
  });
  ```

  Enzyme 文档中使用 Chai 和 Sinon 断言库，但推荐使用 Jest 内建的 `expect()` 和 `jest.fn()` 替代。

  ```js
  import React from 'react';
  import { shallow } from 'enzyme';
  import App from './App';

  it('renders welcome message', () => {
    const wrapper = shallow(<App />);
    const welcome = <h2>Welcome to React</h2>;
    // expect(wrapper.contains(welcome)).toBe(true);
    expect(wrapper.contains(welcome)).toEqual(true);
  });
  ```

  还可以使用 jest-enzyme 简化测试用例
  安装

  ```shell
  npm i -D jest-enzyme
  ```

  在 `src/setupTests.js` 中导入

  ```js
  import 'jest-enzyme';
  ```

  使用

  ```js
  expect(wrapper).toContainReact(welcome);
  ```

- React Testing Library
  还可以使用 `react-testing-library` 替换 `enzyme`，`react-testing-library` 用一种类似最终用户使用组件的方式测试 React 组件，非常适合单元测试、集成测试和端到端测试。它直接与 DOM 一起工作，推荐使用 `jest-dom` 改善断言。

  安装

  ```shell
  npm i -D react-testing-library jest-dom
  ```

  同样需要添加一个全局配置文件 `src/setupTests.js`

  ```js
  // react-testing-library renders your components to document.body,
  // this will ensure they're removed after each test.
  import 'react-testing-library/cleanup-after-each';
  // this adds jest-dom's custom assertions
  import 'jest-dom/extend-expect';
  ```

  例子:

  ```js
  import React from 'react';
  import { render } from 'react-testing-library';
  import App from './App';

  it('renders welcome message', () => {
    const { getByText } = render(<App />);
    expect(getByText('Welcome to React')).toBeInTheDocument();
  });
  ```

  更多用法参考[官方文档](https://github.com/kentcdodds/react-testing-library)

#### Initializing Test Environment

添加 `src/setupTests.js` 文件后，文件中的内容会在运行测试之前运行，用于 mock:

```js
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;
```

#### Focusing and Excluding Tests

将测试用例中的 `it()` 替换为 `xit()` 将在执行时排除掉此用例；
改为 `fit()` 则只执行此用例。

#### Coverage Reporting

执行 `npm test -- --coverage` 在结果中将包含测试覆盖率

`package.json` 中的以下参数将用于覆盖默认的覆盖率配置

- `collectCoverageFrom`
- `coverageReporters`
- `coverageThreshold`
- `snapshotSerializers`

#### Continuous Integration

默认情况下 `npm test` 将进入监控模式，如果设置了环境变量 `CI=true` 则只运行一次。

默认情况下 `npm run build` 不会报语法警告，设置 `CI=true` 后，任何警告将停止构建。

- CI 服务器配置
  - Travis CI
  - CircleCI
- 本地环境变量配置
  `CI=true npm test`, `CI=true npm run build`

#### Snapshot Testing

快照测试是 Jest 的一个特性，它会把组件生成文件形式的快照保存在硬盘上，当有变化时会提示。

#### Editor Integration

Visual Studio Code 可以安装 Create React App 关于 Jest 的扩展，提供了类似 IDE 的特性，搜索 "Jest" 并安装。
此插件可以在同一行中提示潜在的错误，可以自动开启、停止监控模式，还可以提供一键快照更新。

#### Debugging Tests

使用 `Chrome` 和 `Visual Studio Code` 可以 DEBUG 测试用例。

###### Debugging Tests in Chrome

在 `package.json` 中添加以下代码:

```json
"scripts": {
    "test:debug": "react-scripts --inspect-brk test --runInBand --no-cache"
  }
```

在测试用例中添加 `debugger;` ，然后执行

```shell
$ npm run test:debug
```

然后打开 `Chrome` 访问 `about:inspect` 进行操作。

###### Debugging Tests in Visual Studio Code

可以在 `launch.json` 中添加如下代码:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug CRA Tests",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/react-scripts",
      "args": ["test", "--runInBand", "--no-cache", "--no-watch"],
      "cwd": "${workspaceRoot}",
      "protocol": "inspector",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```
