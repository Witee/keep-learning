# 代码分割

> Based on React 16.8.x

## `import()`

React 使用动态 `import()` 语法实现代码分割。

`import()` 返回 `Promise`。

```js
import('./math').then((math) => {
  console.log(math.add(1, 2));
});
```

## React.lazy

`React.lazy` 必须调用 `import()` 返回的函数。被导入的组件必须是一个包含默认导出的 React 组件。

```jsx
const OtherComponent = React.lazy(() => import('./OtherComponent'));

const MyComponent = () => (
  <div>
    <OtherComponent />
  </div>
);
```

## Suspense

`Suspense` 可以使 `React.lazy()` 导入的组件未完成渲染时显示备用的内容。
`Suspense` 可以包含多个懒加载组件。

```jsx
const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

const MyComponent = () => (
  <div>
    <Suspense fallback={<div>Loading...</div>}>
      <section>
        <OtherComponent />
        <AnotherComponent />
      </section>
    </Suspense>
  </div>
);
```

## Error boundaries

如果模块加载失败，如网络错误，会使用 错误连输组件覆盖。

```jsx
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Suspense>
  </Router>
);
```

## Route-based code splitting

通常基于路由分割代码

```jsx
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Suspense>
  </Router>
);
```

## Named Exports

`React.lazy` 目前仅支持默认导出。 如果要导入的模块使用命名导出，则可以创建一个中间模块，将其重新导出为默认模块。

```jsx
// ManyComponents.js
export const MyComponent = /* ... */;
export const MyUnusedComponent = /* ... */;
```

```jsx
// MyComponent.js
export { MyComponent as default } from './ManyComponents.js';
```

```jsx
// MyApp.js
import React, { lazy } from 'react';
const MyComponent = lazy(() => import('./MyComponent.js'));
```
