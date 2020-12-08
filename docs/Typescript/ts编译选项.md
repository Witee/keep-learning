# ts编译选项

使用 create-react-app 生成的ts项目会在根目录中存在一个ts配置文件 `tsconfig.json`, 其中 `compilerOptions` 中的一些选项解释如下:

## target

typescript本质上是个编译器, 可以将 `*.ts` 代码编译成不同 ESMAScript版本的 js 代码, 如 `es5`

源码 `index.ts`:

```js
const myname = 'abc';
const sum = (a: number, b: number) => a + b;
```

编译为 es3 和 es5 后代码变成了低版本的 js 代码, 箭头函数被转换为了 function 了:

```js
// index.js
"use strict";
var myname = 'abc';
var sum = function(a, b) { return a+b; };
```

target 设置为 es2015、es2016、es2017、es2018、es2019 和 esnext 编译后生成的代码和原代码是一样的：

```js
// index.js
"use strict";
const myname = 'abc';
const sum = (a, b) => a + b;
```

其中 `esnext` 表示最新标准的 js 版本.

## module

一个 js 文件就是一个模块, 在 nodejs 和 浏览器 环境中使用的模块是不一样的.

- commonjs : 只能在 nodejs 环境中使用, 也就是在服务端运行
- es6, esnext等: 是js官方的模块化规范, 只能在浏览器环境运行
- umd: 既可以在服务端运行也可以在浏览器运行

源码 `index.ts` , typescript 默认使用 es6 模块规范

```js
const sum = (a: number, b: number) => a + b

export default sum
```

`module: es6`, 没有任何变化, 因为 es6 是默认值

```js
const sum = (a, b) => a + b;
export default sum;
```

`module: commonjs` nodejs 模块化范式

```js
// index.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sum = (a, b) => a + b;
exports.default = sum;
```

可以看到 export default 会转换为 exports.default，导出的 sum 方法默认挂载在 default 属性上。

```js
const sum = require('./index.js').default  // 引包时需要注意后面要加上 .default
sum(1, 2)   // 3
```

`module: umd` : 既可以在服务端又可在浏览器端运行

```js
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const sum = (a, b) => a + b;
    exports.default = sum;
});
```

## lib

内建 api 的声明组

举个例子, 如果发现数组的 `find` 方法提示不能使用, 则可能是 lib 处没有配置对应的声明组, 加上 `es2015` 或 `esnext` 就正常了.

某些变量不在声明组中, 也可以通过安装声明文件实现, 如 `global` `__dirname` 等, 则安装 `@types/node`.

