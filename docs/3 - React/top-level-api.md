# React Top-Level API

## React.Component

当使用 ES6 类定义 React 组件 时 `React.Component` 是基类。

## React.PureComponent

与 `React.Component` 区别是 `React.PureComponent` 实现了 `shouldComponentUpdate()`，并对 prop 和 state 进行浅比较。可以实现为纯组件，以提升性能。

如果复杂数据的深处发生变化且浅比较无法发现时，可以使用 `forceUpdate()` 手工更新，还可以使用 不可变对象 加快嵌套数据对比速度。

另外 `React.PureComponent` 的 `shouldComponentUpdate()` 跳过整个子组件树的 prop 更新，需要确保所有子组件同样为纯组件。

## React.memo

```jsx
const MyComponent = React.memo(function MyComponent(props) {
  /* render using props */
});
```

`React.memo` 是高阶组件，只接受一个函数组件。
当同样 `props` 对应同样结果时，如果使用 `React.memo` 包裹组件，则会重用上次的渲染结果。

默认只使用浅比较对比复杂对象，还可以通过传递第二个参数自定义比较。

```jsx
function MyComponent(props) {
  /* render using props */
}
function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  areEqual 返回 false 时将进行更新
  */
}
export default React.memo(MyComponent, areEqual);
```

## React.Fragment

`return` 中允许返回多个元素

```jsx
render() {
  return (
    <React.Fragment>
      Some text.
      <h2>A heading</h2>
    </React.Fragment>
  );
}
```

## React.createRef

通过 ref 属性创建 React 元素的引用

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  render() {
    return <input type="text" ref={this.inputRef} />;
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }
}
```

## React.lazy

定义动态加载的组件，必须由 `<React.Suspense>` 包裹

```jsx
// This component is loaded dynamically
const SomeComponent = React.lazy(() => import('./SomeComponent'));
```

## React.Suspense

组件未渲染完成时 `React.Suspense` 会提供一个备用页面，目前只支持 `React.lazy` 的使用场景，未来可能会支持数据加载的场景。

```jsx
// This component is loaded dynamically
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    // Displays <Spinner> until OtherComponent loads
    <React.Suspense fallback={<Spinner />}>
      <div>
        <OtherComponent />
      </div>
    </React.Suspense>
  );
}
```
