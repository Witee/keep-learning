## Day 1 快速入门 - JavaScript学习计划

> 所有学习内容整理为7份，每天1份，使用艾宾浩斯记忆方法进行学习。

#### 数据类型和变量

- Number

  > 不区分整数和浮点数，统一用Number表示

  ```
  123; // 整数123
  0.456; // 浮点数0.456
  1.2345e3; // 科学计数法表示1.2345x1000，等同于1234.5
  -99; // 负数
  NaN; // NaN表示Not a Number，当无法计算结果时用NaN表示
  Infinity; // Infinity表示无限大，当数值超过了JavaScript的Number所能表示的最大值时，就表示为Infinity
  ```

- 字符串

  字符串是以单引号'或双引号"括起来的任意文本，比如'abc'，"xyz"等等

- 布尔值 true false
  - &&  与运算
  - ||  或运算
  - !   非运算

- 比较运算符

  > `==` 会自动转换数据类型再比较，所以要一直使用 `===`

  > NaN这个特殊的Number与所有其他值都不相等，包括它自己：

  ```
    NaN === NaN; // false
  ```

  唯一能判断`NaN`的方法是通过`isNaN()`函数：
  ```
    isNaN(NaN); // true
  ```

  最后要注意浮点数的相等比较：

  ```
    1 / 3 === (1 - 2 / 3); // false
  ```

  这不是JavaScript的设计缺陷。浮点数在运算过程中会产生误差，因为计算机无法精确表示无限循环小数。要比较两个浮点数是否相等，只能计算它们之差的绝对值，看是否小于某个阈值：

  ```
    Math.abs(1 / 3 - (1 - 2 / 3)) < 0.0000001; // true
  ```

- null 和 undefined

  > 多数情况下应该使用`null`，`undefined`仅仅在判断函数参数是否传递的情况下有用。

  - null       表示空
  - undefined  表示未定义


- 数组

  数组是一组按顺序排列的集合，集合的每个值称为元素。JavaScript的数组可以包括任意数据类型。

  ```
    [1, 2, 3.14, 'Hello', null, true];
  ```

- 对象

  JavaScript的对象是一组由键-值组成的无序集合，例如：

  ```
    var person = {
        name: 'Bob',
        age: 20,
        tags: ['js', 'web', 'mobile'],
        city: 'Beijing',
        hasCar: true,
        zipcode: null
    };
  ```

  JavaScript对象的键都是字符串类型，值可以是任意数据类型。上述`person`对象一共定义了6个键值对，其中每个键又称为对象的属性，例如，`person`的`name`属性为`'Bob'`，`zipcode`属性为`null`。

  要获取一个对象的属性，我们用对象变量.属性名的方式：

  ```
    person.name; // 'Bob'
    person.zipcode; // null
  ```

- 变量

  变量名是大小写英文、数字、`$`和`_`的组合，且不能用数字开头。

- strict模式

  如果一个变量没有通过var申明就被使用，那么该变量就自动被申明为全局变量。
  strict模式下，强制通过var申明变量，未使用var申明变量就使用的，将导致运行错误。
  使用方法在第一行加上`'use strict';`

---

#### 字符串

  > 字符串本身包含`'`或`"` 时，内部转义使用`\`，转义`\`本身使用`\\`

  - 多行字符串

    > 使用反引号

    ```
      `这是一个
      多行
      字符串`;
    ```  
  - 模板字符串

    ```
      var name = '小明';
      var age = 20;
      var message = `你好, ${name}, 你今年${age}岁了!`;
    ```

  - 操作字符串

    > 字符串是不可变的， 如果对字符串的某个索引赋值，不会有任何错误，但是，也没有任何效果。

    JavaScript为字符串提供了一些常用方法，注意，调用这些方法本身不会改变原有字符串的内容，而是返回一个新字符串。

    - `toUpperCase()`把一个字符串全部变为大写

      ```
        var s = 'Hello';
        s.toUpperCase(); // 返回'HELLO'
      ```

    - `toLowerCase()`把一个字符串全部变为小写

      ```
        var s = 'Hello';
        var lower = s.toLowerCase(); // 返回'hello'并赋值给变量lower
        lower; // 'hello'

      ```

    - `indexOf()`会搜索指定字符串出现的位置

      ```
        var s = 'hello, world';
        s.indexOf('world'); // 返回7
        s.indexOf('World'); // 没有找到指定的子串，返回-1
      ```

    - `substring()`返回指定索引区间的子串

      ```
        var s = 'hello, world'
        s.substring(0, 5); // 从索引0开始到5（不包括5），返回'hello'
        s.substring(7); // 从索引7开始到结束，返回'world'
      ```
    - `split()`使用正则切分字符串

      ```
        'a,b;; c   d'.split(/[\s\,\;]+/); // ['a', 'b', 'c', 'd']
      ```
---

#### 数组

  > JavaScript的Array可以包含任意数据类型，并通过索引来访问每个元素。

  - 数组长度 `.length`
  - 通过索引直接修改数组的值
  - `indexOf` 获取指定元素位置 `arr.indexOf(10); // 元素10的索引为0`
  - `slice` 截取数组的部分元素，返回新数组，不包含结束索引

    ```
      var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
      arr.slice(0, 3); // 从索引0开始，到索引3结束，但不包括索引3: ['A', 'B', 'C']
      arr.slice(3); // 从索引3开始到结束: ['D', 'E', 'F', 'G']
    ```

  - `push()` 向数组末尾添加若干元素，`pop()`把最后一个元素删除掉

    ```
      var arr = [1, 2];
      arr.push('A', 'B'); // 返回Array新的长度: 4
      arr; // [1, 2, 'A', 'B']
      arr.pop(); // pop()返回'B'
      arr; // [1, 2, 'A']
      arr.pop(); arr.pop(); arr.pop(); // 连续pop 3次
      arr; // []
      arr.pop(); // 空数组继续pop不会报错，而是返回undefined
      arr; // []
    ```

  - `unshift()` 向数组头部添加若干元素，`shift()` 把第一个元素删除掉

    ```
      var arr = [1, 2];
      arr.unshift('A', 'B'); // 返回Array新的长度: 4
      arr; // ['A', 'B', 1, 2]
      arr.shift(); // 'A'
      arr; // ['B', 1, 2]
      arr.shift(); arr.shift(); arr.shift(); // 连续shift 3次
      arr; // []
      arr.shift(); // 空数组继续shift不会报错，而是返回undefined
      arr; // []
    ```

  - `sort` 直接修改元素位置按照默认顺序排序
  - `reverse` 直接修改数据，将元素反转
  - `splice` 从指定的索引开始删除若干元素，然后再从该位置添加若干元素

    ```
      var arr = ['Microsoft', 'Apple', 'Yahoo', 'AOL', 'Excite', 'Oracle'];
      // 从索引2开始删除3个元素,然后再添加两个元素:
      arr.splice(2, 3, 'Google', 'Facebook'); // 返回删除的元素 ['Yahoo', 'AOL', 'Excite']
      arr; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']
      // 只删除,不添加:
      arr.splice(2, 2); // ['Google', 'Facebook']
      arr; // ['Microsoft', 'Apple', 'Oracle']
      // 只添加,不删除:
      arr.splice(2, 0, 'Google', 'Facebook'); // 返回[],因为没有删除任何元素
      arr; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']
    ```

  - `concat` 连接两个数组，不修改当前数组，返回新数组

    ```
      var arr = ['A', 'B', 'C'];
      var added = arr.concat([1, 2, 3]);
      added; // ['A', 'B', 'C', 1, 2, 3]
      arr; // ['A', 'B', 'C']
    ```

    实际上，`concat()`方法可以接收任意个元素和`Array`，并且自动把`Array`拆开，然后全部添加到新的`Array`里：

    ```
      var arr = ['A', 'B', 'C'];
      arr.concat(1, 2, [3, 4]); // ['A', 'B', 'C', 1, 2, 3, 4]
    ```

  - `join` 把当前数组的每个元素都用指定的字符串连接起来，然后返回连接后的字符串

    ```
      var arr = ['A', 'B', 'C', 1, 2, 3];
      arr.join('-'); // 'A-B-C-1-2-3'
    ```

---

#### 对象

  - 判断一个对象的属性是否存在
    - 'name' in xiaoming;
    - xiaoming.hasOwnProperty('name');

---

#### 条件判断

  ```
    var age = 3;
    if (age >= 18) {
        alert('adult');
    } else if (age >= 6) {
        alert('teenager');
    } else {
        alert('kid');
    }
  ```

---

#### 循环

  - 普通的 `for ( var i=1; i<=100; i++){}`
  - `for ... in`  循环的是属性，不是值
  - `while` 循环已知的初始和结束条件  `while (n > 0){n += 1}`
  - `do ... while` 与`while`的区别在于至少执行一次，结束时判断条件 `do {n += 1} while (n<100);`

---

#### Map

  > ES6引入的数据类型

  JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。

  ```
    const data = {};
    const element = document.getElementById('myDiv');

    data[element] = 'metadata';
    data['[object HTMLDivElement]'] // "metadata"
  ```

  上面代码原意是将一个 DOM 节点作为对象`data`的键，但是由于对象只接受字符串作为键名，所以`element`被自动转为字符串`[object HTMLDivElement]`。

  为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。

  ```
    const m = new Map();
    const o = {p: 'Hello World'};

    m.set(o, 'content')
    m.get(o) // "content"

    m.has(o) // true
    m.delete(o) // true
    m.has(o) // false
  ```

  上面代码使用 Map 结构的`set`方法，将对象`o`当作`m`的一个键，然后又使用`get`方法读取这个键，接着使用`delete`方法删除了这个键。

  上面的例子展示了如何向 Map 添加成员。作为构造函数，Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。

  ```
    const map = new Map([
      ['name', '张三'],
      ['title', 'Author']
    ]);

    map.size // 2
    map.has('name') // true
    map.get('name') // "张三"
    map.has('title') // true
    map.get('title') // "Author"
    map.clear()
    map.size // 0
  ```

  上面代码在新建 Map 实例时，就指定了两个键`name`和`title`。

  注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。

  ```
    const map = new Map();

    map.set(['a'], 555);
    map.get(['a']) // undefined
  ```

  上面代码的`set`和`get`方法，表面是针对同一个键，但实际上这是两个值，内存地址是不一样的，因此`get`方法无法读取该键，返回`undefined`。

  - 遍历方法
    Map 结构原生提供三个遍历器生成函数和一个遍历方法。

    - `keys()`：返回键名的遍历器。
    - `values()`：返回键值的遍历器。
    - `entries()`：返回所有成员的遍历器。
    - `forEach()`：遍历 Map 的所有成员。

    需要特别注意的是，Map 的遍历顺序就是插入顺序。

    ```
      const map = new Map([
        ['F', 'no'],
        ['T',  'yes'],
      ]);

      for (let key of map.keys()) {
        console.log(key);
      }
      // "F"
      // "T"

      for (let value of map.values()) {
        console.log(value);
      }
      // "no"
      // "yes"

      for (let item of map.entries()) {
        console.log(item[0], item[1]);
      }
      // "F" "no"
      // "T" "yes"

      // 或者
      for (let [key, value] of map.entries()) {
        console.log(key, value);
      }
      // "F" "no"
      // "T" "yes"

      // 等同于使用map.entries()
      for (let [key, value] of map) {
        console.log(key, value);
      }
      // "F" "no"
      // "T" "yes"
    ```

    上面代码最后的那个例子，表示 Map 结构的默认遍历器接口（`Symbol.iterator`属性），就是`entries`方法。

    ```
      map[Symbol.iterator] === map.entries
      // true
      Map 结构转为数组结构，比较快速的方法是使用扩展运算符（...）。

      const map = new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three'],
      ]);

      [...map.keys()]
      // [1, 2, 3]

      [...map.values()]
      // ['one', 'two', 'three']

      [...map.entries()]
      // [[1,'one'], [2, 'two'], [3, 'three']]

      [...map]
      // [[1,'one'], [2, 'two'], [3, 'three']]
    ```

    结合数组的`map`方法、`filter`方法，可以实现 Map 的遍历和过滤（Map 本身没有`map`和`filter`方法）。

    ```
      const map0 = new Map()
        .set(1, 'a')
        .set(2, 'b')
        .set(3, 'c');

      const map1 = new Map(
        [...map0].filter(([k, v]) => k < 3)
      );
      // 产生 Map 结构 {1 => 'a', 2 => 'b'}

      const map2 = new Map(
        [...map0].map(([k, v]) => [k * 2, '_' + v])
          );
      // 产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}
    ```

    此外，Map 还有一个`forEach`方法，与数组的`forEach`方法类似，也可以实现遍历。

    ```
      map.forEach(function(value, key, map) {
        console.log("Key: %s, Value: %s", key, value);
      });
      forEach方法还可以接受第二个参数，用来绑定this。

      const reporter = {
        report: function(key, value) {
          console.log("Key: %s, Value: %s", key, value);
        }
      };

      map.forEach(function(value, key, map) {
        this.report(key, value);
      }, reporter);
    ```

    上面代码中，`forEach`方法的回调函数的`this`，就指向`reporter`。

  - 与其他数据结构的互相转换

    - Map 转为数组

      前面已经提过，Map 转为数组最方便的方法，就是使用扩展运算符（`...`）。

      ```
        const myMap = new Map()
          .set(true, 7)
          .set({foo: 3}, ['abc']);
        [...myMap]
        // [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
      ```

    - 数组 转为 Map

      将数组传入 Map 构造函数，就可以转为 Map。

      ```
        new Map([
          [true, 7],
          [{foo: 3}, ['abc']]
        ])
        // Map {
        //   true => 7,
        //   Object {foo: 3} => ['abc']
        // }
      ```

    - Map 转为对象

      如果所有 Map 的键都是字符串，它可以转为对象。

      ```
        function strMapToObj(strMap) {
          let obj = Object.create(null);
          for (let [k,v] of strMap) {
            obj[k] = v;
          }
          return obj;
        }

        const myMap = new Map()
          .set('yes', true)
          .set('no', false);
        strMapToObj(myMap)
        // { yes: true, no: false }
    ```

    - 对象转为 Map

      ```
        function objToStrMap(obj) {
          let strMap = new Map();
          for (let k of Object.keys(obj)) {
            strMap.set(k, obj[k]);
          }
          return strMap;
        }

        objToStrMap({yes: true, no: false})
        // Map {"yes" => true, "no" => false}
      ```

    - Map 转为 JSON

      Map 转为 JSON 要区分两种情况。一种情况是，Map 的键名都是字符串，这时可以选择转为对象 JSON。

      ```
        function strMapToJson(strMap) {
          return JSON.stringify(strMapToObj(strMap));
        }

        let myMap = new Map().set('yes', true).set('no', false);
        strMapToJson(myMap)
        // '{"yes":true,"no":false}'
      ```

      另一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON。

      ```
        function mapToArrayJson(map) {
          return JSON.stringify([...map]);
        }

        let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
        mapToArrayJson(myMap)
        // '[[true,7],[{"foo":3},["abc"]]]'
      ```

    - JSON 转为 Map

      JSON 转为 Map，正常情况下，所有键名都是字符串。

      ```
        function jsonToStrMap(jsonStr) {
          return objToStrMap(JSON.parse(jsonStr));
        }

        jsonToStrMap('{"yes": true, "no": false}')
        // Map {'yes' => true, 'no' => false}
      ```

      但是，有一种特殊情况，整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为 Map。这往往是数组转为 JSON 的逆操作。

      ```
        function jsonToMap(jsonStr) {
          return new Map(JSON.parse(jsonStr));
        }

        jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
        // Map {true => 7, Object {foo: 3} => ['abc']}
      ```

---

#### Set

  > ES6引入的数据类型

  `Set`和`Map`类似，也是一组`key`的集合，但不存储value。由于`key`不能重复，所以，在`Set`中，没有重复的`key`。

  要创建一个`Set`，需要提供一个`Array`作为输入，或者直接创建一个空`Set`：

  ```
    var s1 = new Set(); // 空Set
    var s2 = new Set([1, 2, 3]); // 含1, 2, 3
  ```

  重复元素在`Set`中自动被过滤：

  ```
    var s = new Set([1, 2, 3, 3, '3']);
    s; // Set {1, 2, 3, "3"}
  ```

  注意数字`3`和字符串`'3'`是不同的元素。

  - `Set` 的方法

    - 操作方法

      - `add(value)`：添加某个值，返回 Set 结构本身。
      - `delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
      - `has(value)`：返回一个布尔值，表示该值是否为Set的成员。
      - `clear()`：清除所有成员，没有返回值。

      通过`add(key)`方法可以添加元素到`Set`中，可以重复添加，但不会有效果：

      ```
        s.add(1).add(2).add(2);
        // 注意2被加入了两次

        s.size // 2

        s.has(1) // true
        s.has(2) // true
        s.has(3) // false

        s.delete(2);
        s.has(2) // false
      ```

    - 遍历方法

      > 需要特别指出的是，`Set`的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用。

      - `keys()`：返回键名的遍历器
      - `values()`：返回键值的遍历器
      - `entries()`：返回键值对的遍历器

        `keys`方法、`values`方法、`entries`方法返回的都是遍历器对象（详见《Iterator 对象》一章）。由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以`keys`方法和`values`方法的行为完全一致。

        ```
          let set = new Set(['red', 'green', 'blue']);

          for (let item of set.keys()) {
          console.log(item);
          }
          // red
          // green
          // blue

          for (let item of set.values()) {
          console.log(item);
          }
          // red
          // green
          // blue

          for (let item of set.entries()) {
          console.log(item);
          }
          // ["red", "red"]
          // ["green", "green"]
          // ["blue", "blue"]
        ```

        上面代码中，`entries`方法返回的遍历器，同时包括键名和键值，所以每次输出一个数组，它的两个成员完全相等。

        Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的`values`方法。

        ```
          Set.prototype[Symbol.iterator] === Set.prototype.values
          // true
        ```
        这意味着，可以省略`values`方法，直接用`for...of`循环遍历 Set。

        ```
          let set = new Set(['red', 'green', 'blue']);

          for (let x of set) {
          console.log(x);
          }
          // red
          // green
          // blue
        ```  

      - `forEach()`：使用回调函数遍历每个成员

      Set 结构的实例与数组一样，也拥有`forEach`方法，用于对每个成员执行某种操作，没有返回值。

      ```
        set = new Set([1, 4, 9]);
        set.forEach((value, key) => console.log(key + ' : ' + value))
        // 1 : 1
        // 4 : 4
        // 9 : 9
      ```

      上面代码说明，`forEach`方法的参数就是一个处理函数。该函数的参数与数组的`forEach`一致，依次为键值、键名、集合本身（上例省略了该参数）。这里需要注意，Set 结构的键名就是键值（两者是同一个值），因此第一个参数与第二个参数的值永远都是一样的。

      另外，`forEach`方法还可以有第二个参数，表示绑定处理函数内部的this对象。

    - 遍历的应用

      扩展运算符`（...）`内部使用`for...of`循环，所以也可以用于 Set 结构。

      ```
        let set = new Set(['red', 'green', 'blue']);
        let arr = [...set];
        // ['red', 'green', 'blue']
      ```

      扩展运算符和 Set 结构相结合，就可以去除数组的重复成员。

      ```
        let arr = [3, 5, 2, 2, 5, 5];
        let unique = [...new Set(arr)];
        // [3, 5, 2]
      ```

      而且，数组的`map`和`filter`方法也可以间接用于 Set 了。

      ```
        let set = new Set([1, 2, 3]);
        set = new Set([...set].map(x => x * 2));
        // 返回Set结构：{2, 4, 6}

        let set = new Set([1, 2, 3, 4, 5]);
        set = new Set([...set].filter(x => (x % 2) == 0));
        // 返回Set结构：{2, 4}
      ```

      因此使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。

      ```
        let a = new Set([1, 2, 3]);
        let b = new Set([4, 3, 2]);

        // 并集
        let union = new Set([...a, ...b]);
        // Set {1, 2, 3, 4}

        // 交集
        let intersect = new Set([...a].filter(x => b.has(x)));
        // set {2, 3}

        // 差集
        let difference = new Set([...a].filter(x => !b.has(x)));
        // Set {1}
      ```

      如果想在遍历操作中，同步改变原来的 Set 结构，目前没有直接的方法，但有两种变通方法。一种是利用原 Set 结构映射出一个新的结构，然后赋值给原来的 Set 结构；另一种是利用`Array.from`方法。

      ```
        // 方法一
        let set = new Set([1, 2, 3]);
        set = new Set([...set].map(val => val * 2));
        // set的值是2, 4, 6

        // 方法二
        let set = new Set([1, 2, 3]);
        set = new Set(Array.from(set, val => val * 2));
        // set的值是2, 4, 6
      ```
      上面代码提供了两种方法，直接在遍历操作中改变原来的 Set 结构。

---


#### iterable

  > ES6引入的数据类型

  `Array`、`Map`和`Set`都属于`iterable`类型，具有`iterable`类型的集合可以通过新的`for ... of`循环来遍历。

  然而，更好的方式是直接使用`iterable`内置的`forEach`方法，它接收一个函数，每次迭代就自动回调该函数。以`Array`为例：

  ```
    var a = ['A', 'B', 'C'];
    a.forEach(function (element, index, array) {
        // element: 指向当前元素的值
        // index: 指向当前索引
        // array: 指向Array对象本身
        alert(element);
    });
  ```
