## Day 4 标准对象- JavaScript学习计划

  - Date

    > JavaScript的月份范围用整数表示是0~11

    ```
      // 系统当前时间
      var now = new Date();
      now; // Wed Jun 24 2015 19:49:22 GMT+0800 (CST)
      now.getFullYear(); // 2015, 年份
      now.getMonth(); // 5, 月份，注意月份范围是0~11，5表示六月
      now.getDate(); // 24, 表示24号
      now.getDay(); // 3, 表示星期三
      now.getHours(); // 19, 24小时制
      now.getMinutes(); // 49, 分钟
      now.getSeconds(); // 22, 秒
      now.getMilliseconds(); // 875, 毫秒数
      now.getTime(); // 1435146562875, 以number形式表示的时间戳
    ```

    解析指定时间，返回时间戳

    ```
      var d = Date.parse('2015-06-24T19:49:22.875+08:00');
      d; // 1435146562875

      // 时间戳转换为Date
      var d = new Date(1435146562875);
      d; // Wed Jun 24 2015 19:49:22 GMT+0800 (CST)
    ```

  - 时区

    `Date`对象表示的时间总是按浏览器所在时区显示的，不过我们既可以显示本地时间，也可以显示调整后的UTC时间：

    ```
      var d = new Date(1435146562875);
      d.toLocaleString(); // '2015/6/24 下午7:49:22'，本地时间（北京时区+8:00），显示的字符串与操作系统设定的格式有关
      d.toUTCString(); // 'Wed, 24 Jun 2015 11:49:22 GMT'，UTC时间，与本地时间相差8小时
    ```

    那么在JavaScript中如何进行时区转换呢？实际上，只要我们传递的是一个`number`类型的时间戳，我们就不用关心时区转换。任何浏览器都可以把一个时间戳正确转换为本地时间。

    时间戳是个什么东西？时间戳是一个自增的整数，它表示从1970年1月1日零时整的GMT时区开始的那一刻，到现在的毫秒数。假设浏览器所在电脑的时间是准确的，那么世界上无论哪个时区的电脑，它们此刻产生的时间戳数字都是一样的，所以，时间戳可以精确地表示一个时刻，并且与时区无关。

    所以，我们只需要传递时间戳，或者把时间戳从数据库里读出来，再让JavaScript自动转换为当地时间就可以了。

    要获取当前时间戳，可以用：

    ```
      if (Date.now) {
          alert(Date.now()); // 老版本IE没有now()方法
      } else {
          alert(new Date().getTime());
      }
    ```

---

#### RegExp

  在正则表达式中，如果直接给出字符，就是精确匹配。用`\d`可以匹配一个数字，`\w`可以匹配一个字母或数字，所以：

    - `'00\d'`可以匹配`'007'`，但无法匹配`'00A'`；
    
    - `'\d\d\d'`可以匹配`'010'`；
    
    - `'\w\w'`可以匹配`'js'`；

  `.`可以匹配任意字符，所以：

    - `'js.'`可以匹配`'jsp'`、`'jss'`、`'js!'`等等。

  要匹配变长的字符，在正则表达式中，用`*`表示任意个字符（包括0个），用`+`表示至少一个字符，用`?`表示0个或1个字符，用`{n}`表示n个字符，用`{n,m}`表示n-m个字符：

  来看一个复杂的例子：`\d{3}\s+\d{3,8}`。

  我们来从左到右解读一下：

    1. `\d{3}`表示匹配3个数字，例如`'010'`；
    
    2. `\s`可以匹配一个空格（也包括Tab等空白符），所以`\s+`表示至少有一个空格，例如匹配`' '`，`'\t\t'`等；
    
    3. `\d{3,8}`表示3-8个数字，例如`'1234567'`。

  综合起来，上面的正则表达式可以匹配以任意个空格隔开的带区号的电话号码。

  如果要匹配`'010-12345'`这样的号码呢？由于`'-'`是特殊字符，在正则表达式中，要用`'\'`转义，所以，上面的正则是`\d{3}\-\d{3,8}`。

  但是，仍然无法匹配`'010 - 12345'`，因为带有空格。所以我们需要更复杂的匹配方式。


  - 进阶

    要做更精确地匹配，可以用`[]`表示范围，比如：

      - `[0-9a-zA-Z\_]`可以匹配一个数字、字母或者下划线；

      - `[0-9a-zA-Z\_]+`可以匹配至少由一个数字、字母或者下划线组成的字符串，比如`'a100'`，`'0_Z'`，`'js2015'`等等；

      - `[a-zA-Z\_\$][0-9a-zA-Z\_\$]*`可以匹配由字母或下划线、$开头，后接任意个由一个数字、字母或者下划线、$组成的字符串，也就是JavaScript允许的变量名；

      - `[a-zA-Z\_\$][0-9a-zA-Z\_\$]{0, 19}`更精确地限制了变量的长度是1-20个字符（前面1个字符+后面最多19个字符）。

    `A|B`可以匹配A或B，所以`(J|j)ava(S|s)cript`可以匹配`'JavaScript'`、`'Javascript'`、`'javaScript'`或者`'javascript'`。

    `^`表示行的开头，`^\d`表示必须以数字开头。

    `$`表示行的结束，`\d$`表示必须以数字结束。

    你可能注意到了，`js`也可以匹配`'jsp'`，但是加上`^js$`就变成了整行匹配，就只能匹配`'js'`了。


  - RegExp

    有了准备知识，我们就可以在JavaScript中使用正则表达式了。

    JavaScript有两种方式创建一个正则表达式：

    第一种方式是直接通过`/正则表达式/`写出来，第二种方式是通过`new RegExp('正则表达式')`创建一个RegExp对象。

    两种写法是一样的：

    ```
      var re1 = /ABC\-001/;
      var re2 = new RegExp('ABC\\-001');

      re1; // /ABC\-001/
      re2; // /ABC\-001/
    ```

    注意，如果使用第二种写法，因为字符串的转义问题，字符串的两个`\\`实际上是一个`\`。

    先看看如何判断正则表达式是否匹配：

    ```
      var re = /^\d{3}\-\d{3,8}$/;
      re.test('010-12345'); // true
      re.test('010-1234x'); // false
      re.test('010 12345'); // false
    ```

    RegExp对象的`test()`方法用于测试给定的字符串是否符合条件。


  - 切分字符串

    用正则表达式切分字符串比用固定的字符更灵活，请看正常的切分代码：

    ```
      'a b   c'.split(' '); // ['a', 'b', '', '', 'c']
    ```

    嗯，无法识别连续的空格，用正则表达式试试：

    ```
      'a b   c'.split(/\s+/); // ['a', 'b', 'c']
    ```

    无论多少个空格都可以正常分割。加入`,`试试：

    ```
      'a,b, c  d'.split(/[\s\,]+/); // ['a', 'b', 'c', 'd']
    ```

    再加入`;`试试：

    ```
      'a,b;; c  d'.split(/[\s\,\;]+/); // ['a', 'b', 'c', 'd']
    ```

    如果用户输入了一组标签，下次记得用正则表达式来把不规范的输入转化成正确的数组。

  - 分组

    除了简单地判断是否匹配之外，正则表达式还有提取子串的强大功能。用`()`表示的就是要提取的分组（Group）。比如：

    `^(\d{3})-(\d{3,8})$`分别定义了两个组，可以直接从匹配的字符串中提取出区号和本地号码：

    ```
      var re = /^(\d{3})-(\d{3,8})$/;
      re.exec('010-12345'); // ['010-12345', '010', '12345']
      re.exec('010 12345'); // null
    ```

    如果正则表达式中定义了组，就可以在`RegExp`对象上用`exec()`方法提取出子串来。

    `exec()`方法在匹配成功后，会返回一个`Array`，第一个元素是正则表达式匹配到的整个字符串，后面的字符串表示匹配成功的子串。

    `exec()`方法在匹配失败时返回`null`。

    提取子串非常有用。来看一个更凶残的例子：

    ```
      var re = /^(0[0-9]|1[0-9]|2[0-3]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])$/;
      re.exec('19:05:30'); // ['19:05:30', '19', '05', '30']
    ```

    这个正则表达式可以直接识别合法的时间。但是有些时候，用正则表达式也无法做到完全验证，比如识别日期：

    ```
    var re = /^(0[1-9]|1[0-2]|[0-9])-(0[1-9]|1[0-9]|2[0-9]|3[0-1]|[0-9])$/;
    ```

    对于`'2-30'`，`'4-31'`这样的非法日期，用正则还是识别不了，或者说写出来非常困难，这时就需要程序配合识别了。

  - 贪婪匹配

    需要特别指出的是，正则匹配默认是贪婪匹配，也就是匹配尽可能多的字符。举例如下，匹配出数字后面的`0`：

    ```
      var re = /^(\d+)(0*)$/;
      re.exec('102300'); // ['102300', '102300', '']
    ```

    由于`\d+`采用贪婪匹配，直接把后面的`0`全部匹配了，结果`0*`只能匹配空字符串了。

    必须让`\d+`采用非贪婪匹配（也就是尽可能少匹配），才能把后面的`0`匹配出来，加个`?`就可以让`\d+`采用非贪婪匹配：

    ```
      var re = /^(\d+?)(0*)$/;
      re.exec('102300'); // ['102300', '1023', '00']
    ```

  - 全局搜索

    JavaScript的正则表达式还有几个特殊的标志，最常用的是`g`，表示全局匹配：

    ```
      var r1 = /test/g;
      // 等价于:
      var r2 = new RegExp('test', 'g');
    ```

    全局匹配可以多次执行`exec()`方法来搜索一个匹配的字符串。当我们指定`g`标志后，每次运行`exec()`，正则表达式本身会更新`lastIndex`属性，表示上次匹配到的最后索引：

    ```
      var s = 'JavaScript, VBScript, JScript and ECMAScript';
      var re=/[a-zA-Z]+Script/g;

      // 使用全局匹配:
      re.exec(s); // ['JavaScript']
      re.lastIndex; // 10

      re.exec(s); // ['VBScript']
      re.lastIndex; // 20

      re.exec(s); // ['JScript']
      re.lastIndex; // 29

      re.exec(s); // ['ECMAScript']
      re.lastIndex; // 44

      re.exec(s); // null，直到结束仍没有匹配到
    ```

    全局匹配类似搜索，因此不能使用`/^...$/`，那样只会最多匹配一次。

    正则表达式还可以指定`i`标志，表示忽略大小写，`m`标志，表示执行多行匹配。

---

#### JSON

  > JSON是JavaScript Object Notation的缩写，它是一种数据交换格式。

  在JSON中，一共就这么几种数据类型：

    - number：和JavaScript的`number`完全一致；
    - boolean：就是JavaScript的`true`或`false`；
    - string：就是JavaScript的`string`；
    - null：就是JavaScript的`null`；
    - array：就是JavaScript的`Array`表示方式——`[]`；
    - object：就是JavaScript的`{ ... }`表示方式。

  并且，JSON还定死了字符集必须是UTF-8，表示多语言就没有问题了。为了统一解析，JSON的字符串规定必须用双引号`""`，Object的键也必须用双引号`""`。

  - 序列化

    让我们先把小明这个对象序列化成JSON格式的字符串：

    ```
      var xiaoming = {
          name: '小明',
          age: 14,
          gender: true,
          height: 1.65,
          grade: null,
          'middle-school': '\"W3C\" Middle School',
          skills: ['JavaScript', 'Java', 'Python', 'Lisp']
      };

      JSON.stringify(xiaoming); // '{"name":"小明","age":14,"gender":true,"height":1.65,"grade":null,"middle-school":"\"W3C\" Middle School","skills":["JavaScript","Java","Python","Lisp"]}'
    ```

    要输出得好看一些，可以加上参数，按缩进输出：

    ```
      JSON.stringify(xiaoming, null, '  ');
    ```
    结果：

    ```
      {
        "name": "小明",
        "age": 14,
        "gender": true,
        "height": 1.65,
        "grade": null,
        "middle-school": "\"W3C\" Middle School",
        "skills": [
          "JavaScript",
          "Java",
          "Python",
          "Lisp"
        ]
      }
    ```

    第二个参数用于控制如何筛选对象的键值，如果我们只想输出指定的属性，可以传入`Array`：

    ```  
      JSON.stringify(xiaoming, ['name', 'skills'], '  ');
    ```

    结果：

    ```
      {
        "name": "小明",
        "skills": [
          "JavaScript",
          "Java",
          "Python",
          "Lisp"
        ]
      }
    ```

    还可以传入一个函数，这样对象的每个键值对都会被函数先处理：

    ```
      function convert(key, value) {
          if (typeof value === 'string') {
              return value.toUpperCase();
          }
          return value;
      }

      JSON.stringify(xiaoming, convert, '  ');
    ```

    上面的代码把所有属性值都变成大写：

    ```
      {
        "name": "小明",
        "age": 14,
        "gender": true,
        "height": 1.65,
        "grade": null,
        "middle-school": "\"W3C\" MIDDLE SCHOOL",
        "skills": [
          "JAVASCRIPT",
          "JAVA",
          "PYTHON",
          "LISP"
        ]
      }
    ```
    如果我们还想要精确控制如何序列化小明，可以给`xiaoming`定义一个`toJSON()`的方法，直接返回JSON应该序列化的数据：

    ```
      var xiaoming = {
          name: '小明',
          age: 14,
          gender: true,
          height: 1.65,
          grade: null,
          'middle-school': '\"W3C\" Middle School',
          skills: ['JavaScript', 'Java', 'Python', 'Lisp'],
          toJSON: function () {
              return { // 只输出name和age，并且改变了key：
                  'Name': this.name,
                  'Age': this.age
              };
          }
      };

      JSON.stringify(xiaoming); // '{"Name":"小明","Age":14}'
    ```

    - 反序列化

      拿到一个JSON格式的字符串，我们直接用`JSON.parse()`把它变成一个JavaScript对象：

      ```
        JSON.parse('[1,2,3,true]'); // [1, 2, 3, true]
        JSON.parse('{"name":"小明","age":14}'); // Object {name: '小明', age: 14}
        JSON.parse('true'); // true
        JSON.parse('123.45'); // 123.45
      ```

      `JSON.parse()`还可以接收一个函数，用来转换解析出的属性：

      ```
        JSON.parse('{"name":"小明","age":14}', function (key, value) {
            // 把number * 2:
            if (key === 'name') {
                return value + '同学';
            }
            return value;
        }); // Object {name: '小明同学', age: 14}
      ```
      在JavaScript中使用JSON，就是这么简单！
