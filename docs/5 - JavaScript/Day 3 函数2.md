## Day 3 函数2 - JavaScript学习计划

#### 高阶函数

  > 一个函数接收另一个函数作为参数，这种函数就称之为高阶函数。

  - map

    > `map()`方法定义在JavaScript的`Array`中

    把一个函数作用在`Array`的每一个元素上，并生成一个新的`Array`

    ```js
      function pow(x) {
        return x * x;
      }

      var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      arr.map(pow); // [1, 4, 9, 16, 25, 36, 49, 64, 81]
    ```

  - reduce

    > `map()`方法同样定义在JavaScript的`Array`中

    `Array`的`reduce()`把一个函数作用在这个`Array`的`[x1, x2, x3...]`上，这个函数必须接收两个参数，`reduce()`把结果继续和序列的下一个元素做累积计算，其效果就是：

    ```js
      [x1, x2, x3, x4].reduce(f) = f(f(f(x1, x2), x3), x4)
    ```
    比方说对一个`Array`求和，就可以用`reduce`实现：

    ```js
      var arr = [1, 3, 5, 7, 9];
      arr.reduce(function (x, y) {
        return x + y;
      }); // 25
    ```

  - filter

    > 用于把Array的某些元素过滤掉，然后返回剩下的元素。

    `filter()`把传入的函数依次作用于每个元素，然后根据返回值是`true`还是`false`决定保留还是丢弃该元素。

    例如，在一个`Array`中，删掉偶数，只保留奇数，可以这么写：

    ```js
      var arr = [1, 2, 4, 5, 6, 9, 10, 15];
      var r = arr.filter(function (x) {
          return x % 2 !== 0;
      });
      r; // [1, 5, 9, 15]
    ```

    回调函数

      `filter()`接收的回调函数，其实可以有多个参数。通常我们仅使用第一个参数，表示`Array`的某个元素。回调函数还可以接收另外两个参数，表示元素的位置和数组本身：

      ```js
        var arr = ['A', 'B', 'C'];
        var r = arr.filter(function (element, index, self) {
            console.log(element); // 依次打印'A', 'B', 'C'
            console.log(index); // 依次打印0, 1, 2
            console.log(self); // self就是变量arr
            return true;
        });
      ```

      利用`filter`，可以巧妙地去除`Array`的重复元素：

      ```js
        'use strict';

        var r,
        var arr = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'orange', 'strawberry'];

        r = arr.filter(function (element, index, self) {
          return self.indexOf(element) === index;
        });

        return (r.toString());
      ```

  - sort

    > `Array`的`sort()`方法用于排序

    - 字符根据ASCII码进行排序
    - `sort()`默认把所有元素（如数字）转换为String再排序，10排在2前面
    - `sort()`会直接修改当前`Array`
    - `sort()`是高阶函数

    ```js
      var arr = [10, 20, 1, 2];
      arr.sort(function (x, y) {
          if (x < y) {
              return -1;
          }
          if (x > y) {
              return 1;
          }
          return 0;
      }); // [1, 2, 10, 20]
    ```

---

#### 闭包

  - 函数做为返回值

    > 每次调用返回一个新的函数，每个函数结果互不影响

    函数`lazy_sum`中又定义了函数`sum`，并且，内部函数`sum`可以引用外部函数`lazy_sum`的参数和局部变量，当`lazy_sum`返回函数`sum`时，相关参数和变量都保存在返回的函数中，这种称为"闭包(Closure)"。

    ```js
      function lazy_sum(arr) {
        var sum = function () {
          return arr.reduce(function (x, y) {
              return x + y;
            });
          }
          return sum;
      }
    ```

    当我们调用lazy_sum()时，返回的并不是求和结果，而是求和函数：

    ```js
      var f = lazy_sum([1, 2, 3, 4, 5]); // function sum()
    ```

    调用函数f时，才真正计算求和的结果：

    ```js
      f(); // 15
    ```

  - 闭包

    > 阮一峰: 闭包就是能够读取其它函数内部变量的函数, 也可以理解成"定义在一个函数内部的函数", 是将函数内部和函数外部连接起来的一座桥梁.
>
    > 最大的用处有两个: 读取函数内部的变量; 让变量始终保持在内存中.

    
    
    注意到返回的函数在其定义内部引用了局部变量`arr`，所以，当一个函数返回了一个函数后，其内部的局部变量还被新函数引用，所以，闭包用起来简单，实现起来可不容易。
    
    另一个需要注意的问题是，返回的函数并没有立刻执行，而是直到调用了`f()`才执行。我们来看一个例子：
    
    ```js
      function count() {
        var arr = [];
        for (var i=1; i<=3; i++) {
        arr.push(function () {
                return i * i;
            });
        }
        return arr;
      }

      var results = count();
  var f1 = results[0];
      var f2 = results[1];
  var f3 = results[2];
    ```
    
    在上面的例子中，每次循环，都创建了一个新的函数，然后，把创建的3个函数都添加到一个`Array`中返回了。
    
    你可能认为调用`f1()`，`f2()`和`f3()`结果应该是`1`，`4`，`9`，但实际结果是：

    ```js
  f1(); // 16
      f2(); // 16
  f3(); // 16
    ```

    全部都是`16`！原因就在于返回的函数引用了变量`i`，但它并非立刻执行。等到3个函数都返回时，它们所引用的变量`i`已经变成了`4`，因此最终结果为`16`。
    
    返回闭包时牢记的一点就是：返回函数不要引用任何循环变量，或者后续会发生变化的变量。
    
    如果一定要引用循环变量怎么办？方法是再创建一个函数，用该函数的参数绑定循环变量当前的值，无论该循环变量后续如何更改，**已绑定到函数参数的值不变**：
    
    ```js
      function count() {
        var arr = [];
        for (var i=1; i<=3; i++) {
            arr.push((function (n) {
                return function () {
                return n * n;
                }
            })(i));
        }
        return arr;
  }
    
      var results = count();
      var f1 = results[0];
      var f2 = results[1];
  var f3 = results[2];
    
  f1(); // 1
      f2(); // 4
      f3(); // 9
    ```
    
    注意这里用了一个“创建一个匿名函数并立刻执行”的语法：

    ```js
  (function (x) {
        return x * x;
      })(3); // 9
    ```

    理论上讲，创建一个匿名函数并立刻执行可以这么写：

    ```js
      function (x) { return x * x } (3);
    ```

    但是由于JavaScript语法解析的问题，会报SyntaxError错误，因此需要用括号把整个函数定义括起来：

    ```js
      (function (x) { return x * x }) (3);
    ```
    
    通常，一个立即执行的匿名函数可以把函数体拆开，一般这么写：

    ```js
  (function (x) {
        return x * x;
  })(3);
    ```

    说了这么多，难道闭包就是为了返回一个函数然后延迟执行吗？

    当然不是！闭包有非常强大的功能。举个栗子：
    
在面向对象的程序设计语言里，比如Java和C++，要在对象内部封装一个私有变量，可以用`private`修饰一个成员变量。
    
    在没有class机制，只有函数的语言里，借助闭包，同样可以封装一个私有变量。我们用JavaScript创建一个计数器：
    
    ```js
      'use strict';
    
      function create_counter(initial) {
        var x = initial || 0;
        return {
            inc: function () {
            x += 1;
                return x;
        }
        }
      }
    ```
    
    它用起来像这样：

    ```js
      var c1 = create_counter();
      c1.inc(); // 1
      c1.inc(); // 2
      c1.inc(); // 3

      var c2 = create_counter(10);
  c2.inc(); // 11
      c2.inc(); // 12
  c2.inc(); // 13
    ```
    
    在返回的对象中，实现了一个闭包，该闭包携带了局部变量`x`，并且，从外部代码根本无法访问到变量`x`。换句话说，闭包就是携带状态的函数，并且它的状态可以完全对外隐藏起来。
    
    闭包还可以把多参数的函数变成单参数的函数。例如，要计算x<sup>y</sup>可以用`Math.pow(x, y)`函数，不过考虑到经常计算x<sup>2</sup>或x<sup>3</sup>，我们可以利用闭包创建新的函数`pow2`和`pow3`：
    
```js
      function make_pow(n) {
        return function (x) {
            return Math.pow(x, n);
    }
      }
    
      // 创建两个新函数:
      var pow2 = make_pow(2);
      var pow3 = make_pow(3);
    
      pow2(5); // 25
      pow3(7); // 343
    ```

---

#### 箭头函数

  > ES6 新增函数，相关于匿名函数，并且简化了函数定义。
  > 箭头函数的`this`总是指向词法作用域，也就是外层调用者`obj`

  如果参数不是一个，就需要用括号()括起来：

```js
  // 两个参数:
  (x, y) => x * x + y * y

  // 无参数:
  () => 3.14

  // 可变参数:
  (x, y, ...rest) => {
      var i, sum = x + y;
      for (i=0; i<rest.length; i++) {
          sum += rest[i];
      }
      return sum;
  }
```

由于`this`在箭头函数中已经按照词法作用域绑定了，所以，用`call()`或者`apply()`调用箭头函数时，无法对`this`进行绑定，即传入的第一个参数被忽略：

```js
var obj = {
      birth: 1990,
      getAge: function (year) {
          var b = this.birth; // 1990
          var fn = (y) => y - this.birth; // this.birth仍是1990
          return fn.call({birth:2000}, year);
      }
  };
  obj.getAge(2015); // 25
```



---

#### generator

  > ES6引入数据类型，看上去像一个函数，但可以返回多次。

  定义:
  ```js
    function* foo(x) {
      yield x + 1;
      yield x + 2;
      return x + 3;
    }
  ```

  generator和函数不同的是，generator由`function*`定义（注意多出的`*`号），并且，除了`return`语句，还可以用`yield`返回多次。

  大多数同学立刻就晕了，generator就是能够返回多次的“函数”？返回多次有啥用？

  还是举个栗子吧。

  我们以一个著名的斐波那契数列为例，它由`0`，`1`开头：

  ```
    0 1 1 2 3 5 8 13 21 34 ...
  ```

  要编写一个产生斐波那契数列的函数，可以这么写：

  ```js
    function fib(max) {
        var
            t,
            a = 0,
            b = 1,
            arr = [0, 1];
        while (arr.length < max) {
            t = a + b;
            a = b;
            b = t;
            arr.push(t);
        }
        return arr;
    }

    // 测试:
    fib(5); // [0, 1, 1, 2, 3]
    fib(10); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
  ```

  函数只能返回一次，所以必须返回一个`Array`。但是，如果换成generator，就可以一次返回一个数，不断返回多次。用generator改写如下：

  ```js
    function* fib(max) {
        var
            t,
            a = 0,
            b = 1,
            n = 1;
        while (n < max) {
            yield a;
            t = a + b;
            a = b;
            b = t;
            n ++;
        }
        return a;
    }
  ```

  直接调用试试：

  ```js
    fib(5); // fib {[[GeneratorStatus]]: "suspended", [[GeneratorReceiver]]: Window}
  ```

  直接调用一个generator和调用函数不一样，`fib(5)`仅仅是创建了一个generator对象，还没有去执行它。

  调用generator对象有两个方法，一是不断地调用generator对象的`next()`方法：

  ```
    var f = fib(5);
    f.next(); // {value: 0, done: false}
    f.next(); // {value: 1, done: false}
    f.next(); // {value: 1, done: false}
    f.next(); // {value: 2, done: false}
    f.next(); // {value: 3, done: true}
  ```

  `next()`方法会执行generator的代码，然后，每次遇到`yield x;`就返回一个对象`{value: x, done: true/false}`，然后“暂停”。返回的`value`就是`yield`的返回值，`done`表示这个generator是否已经执行结束了。如果`done`为`true`，则`value`就是`return`的返回值。

  当执行到`done`为`true`时，这个generator对象就已经全部执行完毕，不要再继续调用`next()`了。

  第二个方法是直接用`for ... of`循环迭代generator对象，这种方式不需要我们自己判断`done`：

  ```
    for (var x of fib(5)) {
      console.log(x); // 依次输出0, 1, 1, 2, 3
    }
  ```

  generator和普通函数相比，有什么用？

  因为generator可以在执行过程中多次返回，所以它看上去就像一个可以记住执行状态的函数，利用这一点，写一个generator就可以实现需要用面向对象才能实现的功能。例如，用一个对象来保存状态，得这么写：

  ```
    var fib = {
        a: 0,
        b: 1,
        n: 0,
        max: 5,
        next: function () {
            var
                r = this.a,
                t = this.a + this.b;
            this.a = this.b;
            this.b = t;
            if (this.n < this.max) {
                this.n ++;
                return r;
            } else {
                return undefined;
            }
        }
    };
  ```

  用对象的属性来保存状态，相当繁琐。

  generator还有另一个巨大的好处，就是把异步回调代码变成“同步”代码。这个好处要等到后面学了AJAX以后才能体会到。

  没有generator之前的黑暗时代，用AJAX时需要这么写代码：

  ```
    ajax('http://url-1', data1, function (err, result) {
      if (err) {
        return handle(err);
      }
      ajax('http://url-2', data2, function (err, result) {
        if (err) {
          return handle(err);
        }
        ajax('http://url-3', data3, function (err, result) {
          if (err) {
            return handle(err);
          }
          return success(result);
        });
      });
    });
  ```

  回调越多，代码越难看。

  有了generator的美好时代，用AJAX时可以这么写：

  ```
    try {
        r1 = yield ajax('http://url-1', data1);
        r2 = yield ajax('http://url-2', data2);
        r3 = yield ajax('http://url-3', data3);
        success(r3);
    }
    catch (err) {
        handle(err);
    }
  ```
  看上去是同步的代码，实际执行是异步的。
