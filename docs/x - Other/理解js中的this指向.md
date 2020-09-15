# 理解JS的函数调用和'this'指向

> 原文: https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/
>
> 译文: https://juejin.im/post/6844903768425758733



### 核心代码

首先来看JS函数调用的核心，`Function`类的`call`方法。`call`方法的逻辑很直白：

1. 把从第二个起的所有参数放进一个参数列表，如`argList`中
2. 把第一个参数定为`thisValue`
3. 执行`function`，把`this`指向`thisValue`，`argList`作为参数列表

```js
function hello(thing) {
    console.log(this + " says hello " + thing);
}

hello.call("Yehuda", "world") // Yehuda says hello world

```



### 简单的调用

```js
function hello(thing) {
  console.log("Hello " + thing);
}

// this:
hello("world")

// 相当于:
hello.call(window, "world");

```

在ES5的严格模式(strict mode)下，有一点小小的改动

```js
// this:
hello("world")

// 相当于:
hello.call(undefined, "world");
```



### 成员函数

另一个常见的场景是调用一个对象的成员函数，如`person.hello()`。这时候函数调用的语法糖分析如下：

```js
var person = {
  name: "Brendan Eich",
  hello: function(thing) {
    console.log(this + " says hello " + thing);
  }
}

// this:
person.hello("world")

// desugars to this:
person.hello.call(person, "world");

```

要注意，无论`hello`函数是如何添加到这个对象的，效果都是一样的，记得事先声明一个独立的`hello`函数即可。现在来看下把`hello`函数动态添加到某个对象，调用起来是什么效果：

```js
function hello(thing) {
  console.log(this + " says hello " + thing);
}

person = { name: "Brendan Eich" }
person.hello = hello;

person.hello("world") // still desugars to person.hello.call(person, "world")

hello("world") // "[object DOMWindow]world"

```



### 使用 `Function.prototype.bind`

有时候会想让一个函数始终保持相同的`this`指向，开发者会使用闭包来实现这个目的：

```js
var person = {
  name: "Brendan Eich",
  hello: function(thing) {
    console.log(this.name + " says hello " + thing);
  }
}

var boundHello = function(thing) { 
    return person.hello.call(person, thing); 
}

boundHello("world");

```

尽管`boundHello("world")`最终会解析成`boundHello.call(window, "world")`，但之前的操作已经把`this`绑定回我们想要的对象了。

我们还可以把这样的转换封装成通用模块：

```js
var bind = function(func, thisValue) {
  return function() {
    return func.apply(thisValue, arguments);
  }
}

var boundHello = bind(person.hello, person);
boundHello("world") // "Brendan Eich says hello world"

```

要理解这段代码，你只需直到另外两个信息：首先，`arguments`是一个类数组对象，表示所有传给这个函数的对象；其次，`apply`的作用和`call`类似，但前者一次接收一个类数组对象作为传参，后者接收多个参数。

这里的`bind`函数简单返回一个新的函数。在调用`bind()`时，它又会调用之前传参进去的函数，并且把后者的`this`绑定到第二个参数。

因为这种用法也很常见，所以ES5引入了一个新的方法`bind`，适用于所有`Function`类对象，效果如下：

```js
var boundHello = person.hello.bind(person);
boundHello("world") // "Brendan Eich says hello world"

```

如果你需要写一个（带有`this`，但其指向有特定需要的）回调函数，这种写法就很有用：

```js
var person = {
  name: "Alex Russell",
  hello: function() { console.log(this.name + " says hello world"); }
}

$("#some-div").click(person.hello.bind(person));

// when the div is clicked, "Alex Russell says hello world" is printed

```

当然这种写法还是有点拗手。TC39（ECMAScript标准制定委员会）还在努力寻找一种更优雅的解决方案。