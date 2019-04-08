## Day 2 函数1 - JavaScript学习计划

> 所有学习内容整理为7份，每天1份，使用艾宾浩斯记忆方法进行学习。

#### 函数的定义和调用

  - 函数定义

    如果没有`return`语句，返回`undefined`

    ```
      function abs(x) {
        return x
      }
    ```

  - arguments 永远指向当前函数的调用者传入的所有参数

    `arguments`类似`Array`但它不是一个`Array`：

    ```
      function foo(x) {
        alert(x); // 10
        for (var i=0; i<arguments.length; i++) {
            alert(arguments[i]); // 10, 20, 30
        }
      }
    foo(10, 20, 30);
    ```

  - rest参数

    > ES6 引入

    rest参数只能写在最后，前面用...标识，从运行结果可知，传入的参数先绑定a、b，多余的参数以数组形式交给变量rest，所以，不再需要arguments我们就获取了全部参数。

    如果传入的参数连正常定义的参数都没填满，也不要紧，rest参数会接收一个空数组（注意不是undefined）。

    ```
      function foo(a, b, ...rest) {
        console.log('a = ' + a);
        console.log('b = ' + b);
        console.log(rest);
      }

      foo(1, 2, 3, 4, 5);
      // 结果:
      // a = 1
      // b = 2
      // Array [ 3, 4, 5 ]

      foo(1);
      // 结果:
      // a = 1
      // b = undefined
      // Array []
    ```

---

#### 变量作用域与解构赋值

  > 如果一个变量在函数体内部申明，则该变量的作用域为整个函数体，在函数体外不可引用该变量。

  如果两个不同的函数各自申明了同一个变量，那么该变量只在各自的函数体内起作用。换句话说，不同函数内部的同名变量互相独立，互不影响。

  由于JavaScript的函数可以嵌套，此时，内部函数可以访问外部函数定义的变量，反过来则不行。

  JavaScript的函数在查找变量时从自身函数定义开始，从“内”向“外”查找。如果内部函数定义了与外部函数重名的变量，则内部函数的变量将“屏蔽”外部函数的变量。

  - 变量提升

    JavaScript的函数定义有个特点，它会先扫描整个函数体的语句，把所有申明的变量“提升”到函数顶部：

    ```
    'use strict';

    function foo() {
        var x = 'Hello, ' + y;
        alert(x);
        var y = 'Bob';
    }

    foo();
    ```

    虽然是strict模式，但语句`var x = 'Hello, ' + y;`并不报错，原因是变量y在稍后申明了。但是`alert`显示·，说明变量`y`的值为undefined。这正是因为JavaScript引擎自动提升了变量`y`的声明，但不会提升变量`y`的赋值。

    对于上述`foo()`函数，JavaScript引擎看到的代码相当于：

    ```
    function foo() {
        var y; // 提升变量y的申明
        var x = 'Hello, ' + y;
        alert(x);
        y = 'Bob';
    }
    ```

    由于JavaScript的这一怪异的“特性”，我们在函数内部定义变量时，请严格遵守“在函数内部首先申明所有变量”这一规则。

  - 全局作用域

    不在任何函数内定义的变量就具有全局作用域。实际上，JavaScript默认有一个全局对象window，全局作用域的变量实际上被绑定到window的一个属性：

    ```
    'use strict';

    var course = 'Learn JavaScript';
    alert(course); // 'Learn JavaScript'
    alert(window.course); // 'Learn JavaScript'
    ```

    JavaScript实际上只有一个全局作用域。任何变量（函数也视为变量），如果没有在当前函数作用域中找到，就会继续往上查找，最后如果在全局作用域中也没有找到，则报ReferenceError错误。

  - 名字空间

    全局变量会绑定到`window`上，不同的JavaScript文件如果使用了相同的全局变量，或者定义了相同名字的顶层函数，都会造成命名冲突，并且很难被发现。

    减少冲突的一个方法是把自己的所有变量和函数全部绑定到一个全局变量中。例如：

    ```
    // 唯一的全局变量MYAPP:
    var MYAPP = {};

    // 其他变量:
    MYAPP.name = 'myapp';
    MYAPP.version = 1.0;

    // 其他函数:
    MYAPP.foo = function () {
        return 'foo';
    };
    ```
    把自己的代码全部放入唯一的名字空间`MYAPP`中，会大大减少全局变量冲突的可能。

    许多著名的JavaScript库都是这么干的：jQuery，YUI，underscore等等。

  - 局部作用域

    由于JavaScript的变量作用域实际上是函数内部，我们在`for`循环等语句块中是无法定义具有局部作用域的变量的：

    ```
      'use strict';

      function foo() {
          for (var i=0; i<100; i++) {
              //
          }
          i += 100; // 仍然可以引用变量i
      }
    ```
    为了解决块级作用域，ES6引入了新的关键字`let`，用`let`替代`var`可以申明一个块级作用域的变量：

    ```
      'use strict';

      function foo() {
          var sum = 0;
          for (let i=0; i<100; i++) {
              sum += i;
          }
          i += 1; // SyntaxError
      }
    ```

  - 常量

    ES6 中使用`const`定义常量

  - 解构赋值

    ES6 引入，可以直接对多个变量同时赋值，多个变量要使用`[...]`括起来

    `var [x, y, z] = ['hello', 'JavaScript', 'ES6'];`

    还可以忽略某些元素

    ```
      let [, , z] = ['hello', 'JavaScript', 'ES6']; // 忽略前两个元素，只对z赋值第三个元素
      z; // 'ES6'
    ```

    如果需要从一个对象中取出若干属性，也可以使用解构赋值，便于快速获取对象的指定属性：

    ```
    'use strict';

    var person = {
        name: '小明',
        age: 20,
        gender: 'male',
        passport: 'G-12345678',
        school: 'No.4 middle school'
    };
    var {name, age, passport} = person;

    // name, age, passport分别被赋值为对应属性:
    alert('name=' + name + ', age=' + age + ', passport=' + passport);
    ```

    对一个对象进行解构赋值时，同样可以直接对嵌套的对象属性进行赋值，只要保证对应的层次是一致的：

    ```
      var person = {
          name: '小明',
          age: 20,
          gender: 'male',
          passport: 'G-12345678',
          school: 'No.4 middle school',
          address: {
              city: 'Beijing',
              street: 'No.1 Road',
              zipcode: '100001'
          }
      };
      var {name, address: {city, zip}} = person;
      name; // '小明'
      city; // 'Beijing'
      zip; // undefined, 因为属性名是zipcode而不是zip
      // 注意: address不是变量，而是为了让city和zip获得嵌套的address对象的属性:
      address; // Uncaught ReferenceError: address is not defined
    ```

    解构赋值还可以使用默认值，这样就避免了不存在的属性返回`undefined`的问题：

    ```
      var person = {
          name: '小明',
          age: 20,
          gender: 'male',
          passport: 'G-12345678'
      };

      // 如果person对象没有single属性，默认赋值为true:
      var {name, single=true} = person;
      name; // '小明'
      single; // true
    ```

    有些时候，如果变量已经被声明了，再次赋值的时候，正确的写法也会报语法错误：

    ```
      // 声明变量:
      var x, y;
      // 解构赋值:
      {x, y} = { name: '小明', x: 100, y: 200};
      // 语法错误: Uncaught SyntaxError: Unexpected token =
    ```

    这是因为JavaScript引擎把`{`开头的语句当作了块处理，于是`=`不再合法。解决方法是用小括号括起来：

    ```
      ({x, y} = { name: '小明', x: 100, y: 200});
    ```

  - 使用场景

    解构赋值在很多时候可以大大简化代码。例如，交换两个变量`x`和`y`的值，可以这么写，不再需要临时变量：

    ```
      var x=1, y=2;
      [x, y] = [y, x]
    ```

    快速获取当前页面的域名和路径：

    ```
    var {hostname:domain, pathname:path} = location;
    ```

    如果一个函数接收一个对象作为参数，那么，可以使用解构直接把对象的属性绑定到变量中。例如，下面的函数可以快速创建一个`Date`对象：

    ```
      function buildDate({year, month, day, hour=0, minute=0, second=0}) {
          return new Date(year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second);
      }
    ```
    它的方便之处在于传入的对象只需要`year`、`month`和`day`这三个属性：

    ```
      buildDate({ year: 2017, month: 1, day: 1 });
      // Sun Jan 01 2017 00:00:00 GMT+0800 (CST)
    ```

    也可以传入`hour`、`minute`和`second`属性：

    ```
      buildDate({ year: 2017, month: 1, day: 1, hour: 20, minute: 15 });
      // Sun Jan 01 2017 20:15:00 GMT+0800 (CST)
    ```

    使用解构赋值可以减少代码量，但是，需要在支持ES6解构赋值特性的现代浏览器中才能正常运行。目前支持解构赋值的浏览器包括Chrome，Firefox，Edge等。

---

#### 方法

  > 在一个对象中绑定函数，称为这个对象的方法。
  > 注意`this`的指向

  ```
    var xiaoming = {
      name: '小明',
      birth: 1990,
      age: function () {
          var y = new Date().getFullYear();
          return y - this.birth;
      }
    };

    xiaoming.age; // function xiaoming.age()
    xiaoming.age(); // 今年调用是25,明年调用就变成26了
  ```
  在一个方法内部，this是一个特殊变量，它始终指向当前对象，也就是xiaoming这个变量。所以，this.birth可以拿到xiaoming的birth属性。

  `this`指针只在`age`方法的函数内指向`xiaoming`，在函数内部定义的函数，`this`又指向`undefined`了！（在非strict模式下，它重新指向全局对象`window`！）

  - apply
  -
    > 用来控制`this`指向

    apply方法，它接收两个参数，第一个参数就是需要绑定的this变量，第二个参数是Array，表示函数本身的参数。

    ```
      function getAge() {
        var y = new Date().getFullYear();
        return y - this.birth;
      }

      var xiaoming = {
          name: '小明',
          birth: 1990,
          age: getAge
      };

      xiaoming.age(); // 25
      getAge.apply(xiaoming, []); // 25, this指向xiaoming, 参数为空
    ```

    另一个与`apply()`类似的方法是`call()`，唯一区别是：

    `apply()`把参数打包成`Array`再传入；

    `call()`把参数按顺序传入。

    比如调用`Math.max(3, 5, 4)`，分别用`apply()`和`call()`实现如下：

    ```
      Math.max.apply(null, [3, 5, 4]); // 5
      Math.max.call(null, 3, 5, 4); // 5
    ```
    对普通函数调用，我们通常把this绑定为null。

  - 装饰器
    利用`apply()`，我们还可以动态改变函数的行为。

    JavaScript的所有对象都是动态的，即使内置的函数，我们也可以重新指向新的函数。

    现在假定我们想统计一下代码一共调用了多少次`parseInt()`，可以把所有的调用都找出来，然后手动加上`count += 1`，不过这样做太傻了。最佳方案是用我们自己的函数替换掉默认的`parseInt()`：

    ```
      var count = 0;
      var oldParseInt = parseInt; // 保存原函数

      window.parseInt = function () {
        count += 1;
        return oldParseInt.apply(null, arguments); // 调用原函数
      };

      // 测试:
      parseInt('10');
      parseInt('20');
      parseInt('30');
      count; // 3
    ```
