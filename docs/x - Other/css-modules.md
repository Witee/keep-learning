# CSS MODULES

> [官方文档](https://github.com/css-modules/css-modules) > [CSS Modules 用法教程 by 阮一峰](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)

用于在同一作用域（通常为同一个文件中）生成唯一的样式名称。

以使用 `create-react-app` 生成的项目为例，
CSS 模块功能将生成唯一的样式名称: `[filename]_[classname]_[hash]`，

以 `.module.css` 结尾，将默认启用 CSS 模块。

定义 CSS 模块，名称格式为 `camelCase`驼峰命名法。

```css
/* Button.module.css */
.error {
  /* 或 errorName 等 */
  background-color: red;
}
```

定义常规样式表

```css
/* another-stylesheet.css */
.error {
  color: red;
}
```

使用时同时引入两种样式表，其中 `another-stylesheet.css` 只引入而没有对应的 `classname`使其生效，
以下代码演示同名`classname`不冲突.

```jsx
import React, { Component } from 'react';
import styles from './Button.module.css'; // 将CSS模块导入为 `styles` 对象
// import { error } from './Button.module.css'; // 另外一种导入方法
import './another-stylesheet.css'; // 导入常规样式表

class Button extends Component {
  render() {
    // reference as a js object
    return <button className={styles.error}>Error Button</button>;
  }
}
```

结果。使用 `styles.error` 与常规样式表同名`classname`没有冲突

```
<!-- 按钮是红色背景，但没有红色字体 -->
<button class="Button_error_ax7yz">Error Button</button>
```

最后还有全局作用域和组合，参考官网。
