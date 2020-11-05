# 虚拟 DOM 原理

> Snabbdom - Virtual DOM library: https://github.com/snabbdom/snabbdom
>
> Snabbdom 源码解析: https://github.com/creeperyang/blog/issues/33



## 核心概念

- Virtual DOM 是真实 DOM 的映射
- 虚拟 DOM 改变时, 会得到一个新的虚拟树. 算法对比两棵树, 找出差异, 在真实的 DOM 树上做出改变.
- Virtual DOM 建立在 DOM 之上，是基于 DOM 的一层抽象，实际可理解为用更轻量的纯 JavaScript 对象（树）描述 DOM（树）
- React框架在更新时只更新 Virtual DOM, 由 Virtual DOM 统一更新变化的部分



## 虚拟 DOM 更新至真实 DOM 的流程

### 创建 Virtual DOM 元素

使用 js 对象描述 DOM 元素:

```js
 {
  type, // String，DOM 节点的类型，如 'div'
  data, // Object，包括 props，style 等等 DOM 节点的各种属性
  children // Array，子节点
}
```

使用 js 函数创建 DOM 元素:

```js
/**
 * 生成 vnode
 * @param  {String} type     类型，如 'div'
 * @param  {String} key      key vnode的唯一id
 * @param  {Object} data     data，包括属性，事件等等
 * @param  {Array} children  子 vnode
 * @param  {String} text     文本
 * @param  {Element} elm     对应的 dom
 * @return {Object}          vnode
 */
function vnode(type, key, data, children, text, elm) {
  const element = {
    __type: VNODE_TYPE,
    type, key, data, children, text, elm
  }

  return element
}
```



### 创建 Virtual DOM Tree

用函数描述 DOM, 生成 Virtual DOM Tree:

```js
function h(type, config, ...children) {
  const props = {}
  // 省略用 config 填充 props 的过程
  return vnode(
    type,
    key,
    props,
    flattenArray(children).map(c => {
      return isPrimitive(c) ? vnode(undefined, undefined, undefined, undefined, c) : c
    })
  )
}
```



### Virtual DOM 更新

- Virtual DOM 生成真实 DOM
- Virtual DOM diff 算法

#### 生成真实 DOM

通过一个函数生成:

```js
function createElm(vnode, insertedVnodeQueue) {
  let data = vnode.data
  let i
  // 省略 hook 调用
  let children = vnode.children
  let type = vnode.type

  /// 根据 type 来分别生成 DOM
  // 处理 comment
  if (type === 'comment') {
    if (vnode.text == null) {
      vnode.text = ''
    }
    vnode.elm = api.createComment(vnode.text)
  }
  // 处理其它 type
  else if (type) {
    const elm = vnode.elm = data.ns
      ? api.createElementNS(data.ns, type)
      : api.createElement(type)

    // 调用 create hook
    for (let i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode)

    // 分别处理 children 和 text。
    // 这里隐含一个逻辑：vnode 的 children 和 text 不会／应该同时存在。
    if (isArray(children)) {
      // 递归 children，保证 vnode tree 中每个 vnode 都有自己对应的 dom；
      // 即构建 vnode tree 对应的 dom tree。
      children.forEach(ch => {
        ch && api.appendChild(elm, createElm(ch, insertedVnodeQueue))
      })
    }
    else if (isPrimitive(vnode.text)) {
      api.appendChild(elm, api.createTextNode(vnode.text))
    }
    // 调用 create hook；为 insert hook 填充 insertedVnodeQueue。
    i = vnode.data.hook
    if (i) {
      i.create && i.create(emptyNode, vnode)
      i.insert && insertedVnodeQueue.push(vnode)
    }
  }
  // 处理 text（text的 type 是空）
  else {
    vnode.elm = api.createTextNode(vnode.text)
  }

  return vnode.elm
}
```

#### diff 算法

将新旧树分层对比, 如果当前层节点有变化, 则整个节点都被替换, 无需再去对比此节点的子节点.



![分层diff](https://user-images.githubusercontent.com/8046480/27190439-0a875688-5227-11e7-9015-eb34142de8ce.png)

同层节点变化时, 使用 key 追踪变动.

![追踪key](https://user-images.githubusercontent.com/8046480/27191679-28085118-522b-11e7-92e9-fa0ed047f7cd.png)