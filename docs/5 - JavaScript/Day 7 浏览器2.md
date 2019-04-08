## Day 7 浏览器2 - JavaScript学习计划
> 所有学习内容整理为7份，每天1份，使用艾宾浩斯记忆方法进行学习。

##### 操作表单

  HTML表单的输入控件主要有以下几种：

    - 文本框，对应的`<input type="text">`，用于输入文本；

    - 口令框，对应的`<input type="password">`，用于输入口令；

    - 单选框，对应的`<input type="radio">`，用于选择一项；

    - 复选框，对应的`<input type="checkbox">`，用于选择多项；

    - 下拉框，对应的`<select>`，用于选择一项；

    - 隐藏文本，对应的`<input type="hidden">`，用户不可见，但表单提交时会把隐藏文本发送到服务器

  - 获取值

    如果我们获得了一个`<input>`节点的引用，就可以直接调用`value`获得对应的用户输入值：

    ```
      // <input type="text" id="email">
      var input = document.getElementById('email');
      input.value; // '用户输入的值'
    ```

    这种方式可以应用于`text`、`password`、`hidden`以及`select`。但是，对于单选框和复选框，`value`属性返回的永远是HTML预设的值，而我们需要获得的实际是用户是否“勾上了”选项，所以应该用`checked`判断：

    ```
      // <label><input type="radio" name="weekday" id="monday" value="1"> Monday</label>
      // <label><input type="radio" name="weekday" id="tuesday" value="2"> Tuesday</label>
      var mon = document.getElementById('monday');
      var tue = document.getElementById('tuesday');
      mon.value; // '1'
      tue.value; // '2'
      mon.checked; // true或者false
      tue.checked; // true或者false
    ```

  - 设置值

    设置值和获取值类似，对于`text`、`password`、`hidden`以及`select`，直接设置`value`就可以：

    ```
      // <input type="text" id="email">
      var input = document.getElementById('email');
      input.value = 'test@example.com'; // 文本框的内容已更新
    ```

    对于单选框和复选框，设置`checked`为`true`或`false`即可。

  - HTML5控件

  HTML5新增了大量标准控件，常用的包括`date`、`datetime`、`datetime-local`、`color`等，它们都使用`<input>`标签：

  ```
    <input type="date" value="2015-07-01">
    <input type="datetime-local" value="2015-07-01T02:03:04">
    <input type="color" value="#ff0000">
  ```

  不支持HTML5的浏览器无法识别新的控件，会把它们当做`type="text"`来显示。支持HTML5的浏览器将获得格式化的字符串。例如，`type="date"`类型的`input`的`value`将保证是一个有效的`YYYY-MM-DD`格式的日期，或者空字符串。

  - 提交表单

    最后，JavaScript可以以两种方式来处理表单的提交（AJAX方式在后面章节介绍）。

    方式一是通过`<form>`元素的`submit()`方法提交一个表单，例如，响应一个`<button>`的`click`事件，在JavaScript代码中提交表单：

    ```
      <!-- HTML -->
      <form id="test-form">
          <input type="text" name="test">
          <button type="button" onclick="doSubmitForm()">Submit</button>
      </form>

      <script>
      function doSubmitForm() {
          var form = document.getElementById('test-form');
          // 可以在此修改form的input...
          // 提交form:
          form.submit();
      }
      </script>
    ```

    这种方式的缺点是扰乱了浏览器对form的正常提交。浏览器默认点击`<button type="submit">`时提交表单，或者用户在最后一个输入框按回车键。因此，第二种方式是响应`<form>`本身的`onsubmit`事件，在提交form时作修改：

    ```
      <!-- HTML -->
      <form id="test-form" onsubmit="return checkForm()">
          <input type="text" name="test">
          <button type="submit">Submit</button>
      </form>

      <script>
      function checkForm() {
          var form = document.getElementById('test-form');
          // 可以在此修改form的input...
          // 继续下一步:
          return true;
      }
      </script>
    ```
    注意要`return true`来告诉浏览器继续提交，如果`return false`，浏览器将不会继续提交form，这种情况通常对应用户输入有误，提示用户错误信息后终止提交form。

    在检查和修改`<input>`时，要充分利用`<input type="hidden">`来传递数据。

    例如，很多登录表单希望用户输入用户名和口令，但是，安全考虑，提交表单时不传输明文口令，而是口令的MD5。普通JavaScript开发人员会直接修改`<input>`：

    ```
      <!-- HTML -->
      <form id="login-form" method="post" onsubmit="return checkForm()">
          <input type="text" id="username" name="username">
          <input type="password" id="password" name="password">
          <button type="submit">Submit</button>
      </form>

      <script>
      function checkForm() {
          var pwd = document.getElementById('password');
          // 把用户输入的明文变为MD5:
          pwd.value = toMD5(pwd.value);
          // 继续下一步:
          return true;
      }
      </script>
    ```

    这个做法看上去没啥问题，但用户输入了口令提交时，口令框的显示会突然从几个`*`变成32个`*`（因为MD5有32个字符）。

    要想不改变用户的输入，可以利用`<input type="hidden">`实现：

    ```
      <!-- HTML -->
      <form id="login-form" method="post" onsubmit="return checkForm()">
          <input type="text" id="username" name="username">
          <input type="password" id="input-password">
          <input type="hidden" id="md5-password" name="password">
          <button type="submit">Submit</button>
      </form>

      <script>
      function checkForm() {
          var input_pwd = document.getElementById('input-password');
          var md5_pwd = document.getElementById('md5-password');
          // 把用户输入的明文变为MD5:
          md5_pwd.value = toMD5(input_pwd.value);
          // 继续下一步:
          return true;
      }
      </script>
    ```

    注意到`id`为`md5-password`的`<input>`标记了`name="password"`，而用户输入的`id`为`input-password`的`<input>`没有`name`属性。没有`name`属性的`<input>`的数据不会被提交。  

##### 操作文件

  > 在HTML表单中，可以上传文件的唯一控件就是`<input type="file">`。

  注意：当一个表单包含`<input type="file">`时，表单的`enctype`必须指定为`multipart/form-data`，`method`必须指定为`post`，浏览器才能正确编码并以`multipart/form-data`格式发送表单的数据。

  出于安全考虑，浏览器只允许用户点击`<input type="file">`来选择本地文件，用JavaScript对`<input type="file">`的`value`赋值是没有任何效果的。当用户选择了上传某个文件后，JavaScript也无法获得该文件的真实路径。

  - File API

  由于JavaScript对用户上传的文件操作非常有限，尤其是无法读取文件内容，使得很多需要操作文件的网页不得不用Flash这样的第三方插件来实现。

  随着HTML5的普及，新增的File API允许JavaScript读取文件内容，获得更多的文件信息。

  HTML5的File API提供了`File`和`FileReader`两个主要对象，可以获得文件信息并读取文件。

  - 回调

    上面的代码还演示了JavaScript的一个重要的特性就是单线程执行模式。在JavaScript中，浏览器的JavaScript执行引擎在执行JavaScript代码时，总是以单线程模式执行，也就是说，任何时候，JavaScript代码都不可能同时有多于1个线程在执行。

    你可能会问，单线程模式执行的JavaScript，如何处理多任务？

    在JavaScript中，执行多任务实际上都是异步调用，比如上面的代码：

    ```
      reader.readAsDataURL(file);
    ```
    就会发起一个异步操作来读取文件内容。因为是异步操作，所以我们在JavaScript代码中就不知道什么时候操作结束，因此需要先设置一个回调函数：

    ```
      reader.onload = function(e) {
          // 当文件读取完成后，自动调用此函数:
      };
    ```
    当文件读取完成后，JavaScript引擎将自动调用我们设置的回调函数。执行回调函数时，文件已经读取完毕，所以我们可以在回调函数内部安全地获得文件内容。


##### AJAX

  > AJAX不是JavaScript的规范, 是 Asynchronous JavaScript and XML 的缩写

  - 现代浏览器使用 `XMLHttpRequest` 对象
  - 低版本的ID，使用 `ActiveXObject`

  混写:

  ```
    var request;
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    } else {
        request = new ActiveXObject('Microsoft.XMLHTTP');
    }
  ```

  - 安全限制

    > 因为浏览器的同源策略导致的。默认情况下，JavaScript在发送AJAX请求时，URL的域名必须和当前页面完全一致。

    解决办法:
    - 通过 Flash，已废弃
    - 在同源域名下架设代理服务器

      ```
        '/proxy?url=http://www.sina.com.cn'
      ```

    - JSONP: 只能使用 GET 请求，且要求返回 JavaScript

      > 这种方式跨域实际上是利用了浏览器允许跨域引用JavaScript资源

  - CORS
  如果浏览器支持HTML5，那么就可以一劳永逸地使用新的跨域策略：CORS了。

  CORS全称Cross-Origin Resource Sharing，是HTML5规范定义的如何跨域访问资源。

  了解CORS前，我们先搞明白概念：

  Origin表示本域，也就是浏览器当前页面的域。当JavaScript向外域（如sina.com）发起请求后，浏览器收到响应后，首先检查`Access-Control-Allow-Origin`是否包含本域，如果是，则此次跨域请求成功，如果不是，则请求失败，JavaScript将无法获取到响应的任何数据。

  ![](https://raw.githubusercontent.com/Witee/statics/master/blog/liaoxuefeng/jQuery1.png)


  假设本域是`my.com`，外域是`sina.com`，只要响应头`Access-Control-Allow-Origin`为`http://my.com`，或者是`*`，本次请求就可以成功。

  可见，跨域能否成功，取决于对方服务器是否愿意给你设置一个正确的`Access-Control-Allow-Origin`，决定权始终在对方手中。

  上面这种跨域请求，称之为“简单请求”。简单请求包括GET、HEAD和POST（POST的Content-Type类型
  仅限`application/x-www-form-urlencoded`、`multipart/form-data和text/plain`），并且不能出现任何自定义头（例如，`X-Custom: 12345`），通常能满足90%的需求。

  无论你是否需要用JavaScript通过CORS跨域请求资源，你都要了解CORS的原理。最新的浏览器全面支持HTML5。在引用外域资源时，除了JavaScript和CSS外，都要验证CORS。例如，当你引用了某个第三方CDN上的字体文件时：

  ```
    /* CSS */
    @font-face {
      font-family: 'FontAwesome';
      src: url('http://cdn.com/fonts/fontawesome.ttf') format('truetype');
    }
  ```

  如果该CDN服务商未正确设置`Access-Control-Allow-Origin`，那么浏览器无法加载字体资源。

  对于PUT、DELETE以及其他类型如`application/json`的POST请求，在发送AJAX请求之前，浏览器会先发送一个`OPTIONS`请求（称为preflighted请求）到这个URL上，询问目标服务器是否接受：

  ```
    OPTIONS /path/to/resource HTTP/1.1
    Host: bar.com
    Origin: http://my.com
    Access-Control-Request-Method: POST
  ```

  服务器必须响应并明确指出允许的Method：

  ```
    HTTP/1.1 200 OK
    Access-Control-Allow-Origin: http://my.com
    Access-Control-Allow-Methods: POST, GET, PUT, OPTIONS
    Access-Control-Max-Age: 86400
  ```
  浏览器确认服务器响应的`Access-Control-Allow-Methods`头确实包含将要发送的AJAX请求的Method，才会继续发送AJAX，否则，抛出一个错误。

  由于以`POST`、`PUT`方式传送JSON格式的数据在REST中很常见，所以要跨域正确处理`POST`和`PUT`请求，服务器端必须正确响应`OPTIONS`请求。

##### Promise

  > Promise有各种开源实现，在ES6中被统一规范，由浏览器直接支持。

  我们先看一个最简单的Promise例子：生成一个0-2之间的随机数，如果小于1，则等待一段时间后返回成功，否则返回失败：

  ```
    function test(resolve, reject) {
        var timeOut = Math.random() * 2;
        log('set timeout to: ' + timeOut + ' seconds.');
        setTimeout(function () {
            if (timeOut < 1) {
                log('call resolve()...');
                resolve('200 OK');
            }
            else {
                log('call reject()...');
                reject('timeout in ' + timeOut + ' seconds.');
            }
        }, timeOut * 1000);
    }
  ```
  这个`test()`函数有两个参数，这两个参数都是函数，如果执行成功，我们将调用`resolve('200 OK')`，如果执行失败，我们将调用`reject('timeout in ' + timeOut + ' seconds.')`。可以看出，`test()`函数只关心自身的逻辑，并不关心具体的`resolve`和`reject`将如何处理结果。

  有了执行函数，我们就可以用一个Promise对象来执行它，并在将来某个时刻获得成功或失败的结果：

  ```
    var p1 = new Promise(test);
    var p2 = p1.then(function (result) {
        console.log('成功：' + result);
    });
    var p3 = p2.catch(function (reason) {
        console.log('失败：' + reason);
    });
  ```

  变量`p1`是一个Promise对象，它负责执行`test`函数。由于`test`函数在内部是异步执行的，当test函数执行成功时，我们告诉Promise对象：

  ```
    // 如果成功，执行这个函数：
    p1.then(function (result) {
        console.log('成功：' + result);
    });
  ```

  当`test`函数执行失败时，我们告诉Promise对象：

  ```
    p2.catch(function (reason) {
        console.log('失败：' + reason);
    });
  ```

  Promise对象可以串联起来，所以上述代码可以简化为：

  ```
    new Promise(test).then(function (result) {
        console.log('成功：' + result);
    }).catch(function (reason) {
        console.log('失败：' + reason);
    });
  ```

##### Canvas

  > Canvas是HTML5新增的组件，它就像一块幕布，可以用JavaScript在上面绘制各种图表、动画等。

  - 定义画布

    ```
      <canvas id="test-canvas" width="300" height="200"></canvas>
    ```

  - 获取画布

    ```
      var canvas = document.getElementById('test-canvas');
    ```

  `getContext('2d')`方法让我们拿到一个`CanvasRenderingContext2D`对象，所有的绘图操作都需要通过这个对象完成。

  ```
    var ctx = canvas.getContext('2d');
  ```

  如果需要绘制3D怎么办？HTML5还有一个WebGL规范，允许在Canvas中绘制3D图形：

  ```
    gl = canvas.getContext("webgl");
  ```
