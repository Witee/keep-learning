## Day 6 浏览器1 - JavaScript学习计划
#### 浏览器对象

  - window

    > window对象不但充当全局作用域，而且表示浏览器窗口。
    > 内部宽高是指除去菜单栏、工具栏、边框等占位元素后，用于显示网页的净宽高。

    - window.innerWidth: 浏览器窗口的内部宽度
    - window.innerHeight: 浏览器窗口的内部高度
    - outerWidth: 浏览器窗口的整个宽度
    - outerHeight: 浏览器窗口的整个高度

  - navigator

    `navigator`对象表示浏览器的信息，最常用的属性包括：

    - navigator.appName：浏览器名称；
    - navigator.appVersion：浏览器版本；
    - navigator.language：浏览器设置的语言；
    - navigator.platform：操作系统类型；
    - navigator.userAgent：浏览器设定的`User-Agent`字符串。

    充分利用JavaScript对不存在属性返回`undefined`的特性，直接用短路运算符`||`计算：

    ```
      var width = window.innerWidth || document.body.clientWidth;
    ```

  - screen

    `screen`对象表示屏幕的信息，常用的属性有：

    - screen.width：屏幕宽度，以像素为单位；
    - screen.height：屏幕高度，以像素为单位；
    - screen.colorDepth：返回颜色位数，如8、16、24。

  - location

    `location`对象表示当前页面的URL信息。例如，一个完整的URL：

    ```
      http://www.example.com:8080/path/index.html?a=1&b=2#TOP
    ```

    可以用`location.href`获取。要获得URL各个部分的值，可以这么写：

    ```
      location.protocol; // 'http'
      location.host; // 'www.example.com'
      location.port; // '8080'
      location.pathname; // '/path/index.html'
      location.search; // '?a=1&b=2'
      location.hash; // 'TOP'
    ```

    要加载一个新页面，可以调用`location.assign()`。
    如果要重新加载当前页面，调用`location.reload()`方法非常方便。

  - document

    `document`对象表示当前页面。由于HTML在浏览器中以DOM形式表示为树形结构，`document`对象就是整个DOM树的根节点。

    `document`的`title`属性是从HTML文档中的`<title>xxx</title>`读取的，但是可以动态改变:

    ```
      document.title = '努力学习JavaScript!';
    ```

    用`document`对象提供的`getElementById()`和`getElementsByTagName()`可以按ID获得一个DOM节点和按Tag名称获得一组DOM节点。


    `document`对象还有一个`cookie`属性，可以获取当前页面的Cookie。
    
    Cookie是由服务器发送的key-value标示符。因为HTTP协议是无状态的，但是服务器要区分到底是哪个用户发过来的请求，就可以用Cookie来区分。当一个用户成功登录后，服务器发送一个Cookie给浏览器，例如`user=ABC123XYZ(加密的字符串)...`，此后，浏览器访问该网站时，会在请求头附上这个Cookie，服务器根据Cookie即可区分出用户。
    
    Cookie还可以存储网站的一些设置，例如，页面显示的语言等等。
    
    JavaScript可以通过`document.cookie`读取到当前页面的Cookie：
    
    ```
      document.cookie; // 'v=123; remember=true; prefer=zh'
    ```
    
    由于JavaScript能读取到页面的Cookie，而用户的登录信息通常也存在Cookie中，这就造成了巨大的安全隐患，这是因为在HTML页面中引入第三方的JavaScript代码是允许的：
    
    ```
      <!-- 当前页面在wwwexample.com -->
      <html>
          <head>
              <script src="http://www.foo.com/jquery.js"></script>
          </head>
          ...
      </html>
    ```
    
    如果引入的第三方的JavaScript中存在恶意代码，则`www.foo.com`网站将直接获取到`www.example.com`网站的用户登录信息。
    
    为了解决这个问题，服务器在设置Cookie时可以使用`httpOnly`，设定了`httpOnly`的Cookie将不能被JavaScript读取。这个行为由浏览器实现，主流浏览器均支持`httpOnly`选项，IE从IE6 SP1开始支持。
    
    为了确保安全，服务器端在设置Cookie时，应该始终坚持使用`httpOnly`。
    
    - history
    
      `history`对象保存了浏览器的历史记录，JavaScript可以调用`history`对象的`back()`或`forward ()`，相当于用户点击了浏览器的“后退”或“前进”按钮。
    
      这个对象属于历史遗留对象，对于现代Web页面来说，由于大量使用AJAX和页面交互，简单粗暴地调用`history.back()`可能会让用户感到非常愤怒。
    
      新手开始设计Web页面时喜欢在登录页登录成功时调用`history.back()`，试图回到登录前的页面。这是一种错误的方法。
    
      任何情况，你都不应该使用`history`这个对象了。

#### 操作DOM

  由于HTML文档被浏览器解析后就是一棵DOM树，要改变HTML的结构，就需要通过JavaScript来操作DOM。

  始终记住DOM是一个树形结构。操作一个DOM节点实际上就是这么几个操作：

  - 更新：更新该DOM节点的内容，相当于更新了该DOM节点表示的HTML的内容；

  - 遍历：遍历该DOM节点下的子节点，以便进行进一步操作；

  - 添加：在该DOM节点下新增一个子节点，相当于动态增加了一个HTML节点；

  - 删除：将该节点从HTML中删除，相当于删掉了该DOM节点的内容以及它包含的所有子节点。

  在操作一个DOM节点前，我们需要通过各种方式先拿到这个DOM节点。最常用的方法是`document.getElementById()`和`document.getElementsByTagName()`，以及CSS选择器`document.getElementsByClassName()`。

  由于ID在HTML文档中是唯一的，所以`document.getElementById()`可以直接定位唯一的一个DOM节点。`document.getElementsByTagName(`)和`document.getElementsByClassName()`总是返回一组DOM节点。要精确地选择DOM，可以先定位父节点，再从父节点开始选择，以缩小范围。

  例如：

  ```
    // 返回ID为'test'的节点：
    var test = document.getElementById('test');

    // 先定位ID为'test-table'的节点，再返回其内部所有tr节点：
    var trs = document.getElementById('test-table').getElementsByTagName('tr');

    // 先定位ID为'test-div'的节点，再返回其内部所有class包含red的节点：
    var reds = document.getElementById('test-div').getElementsByClassName('red');

    // 获取节点test下的所有直属子节点:
    var cs = test.children;

    // 获取节点test下第一个、最后一个子节点：
    var first = test.firstElementChild;
    var last = test.lastElementChild;
  ```

  第二种方法是使用`querySelector()`和`querySelectorAll()`，需要了解selector语法，然后使用条件来获取节点，更加方便：

  ```
    // 通过querySelector获取ID为q1的节点：
    var q1 = document.querySelector('#q1');

    // 通过querySelectorAll获取q1节点内的符合条件的所有节点：
    var ps = q1.querySelectorAll('div.highlighted > p');
  ```

  注意：低版本的IE<8不支持`querySelector`和`querySelectorAll`。IE8仅有限支持。

  严格地讲，我们这里的DOM节点是指`Element`，但是DOM节点实际上是`Node`，在HTML中，`Node`包括`Element`、`Comment`、`CDATA_SECTION`等很多种，以及根节点`Document`类型，但是，绝大多数时候我们只关心`Element`，也就是实际控制页面结构的`Node`，其他类型的`Node`忽略即可。根节点`Document`已经自动绑定为全局变量`document`。

##### 更新DOM

  拿到一个DOM节点后，我们可以对它进行更新。

  可以直接修改节点的文本，方法有两种：

  一种是修改`innerHTML`属性，这个方式非常强大，不但可以修改一个DOM节点的文本内容，还可以直接通过HTML片段修改DOM节点内部的子树：

  ```
    // 获取<p id="p-id">...</p>
    var p = document.getElementById('p-id');
    // 设置文本为abc:
    p.innerHTML = 'ABC'; // <p id="p-id">ABC</p>
    // 设置HTML:
    p.innerHTML = 'ABC <span style="color:red">RED</span> XYZ';
    // <p>...</p>的内部结构已修改
  ```

  用`innerHTML`时要注意，是否需要写入HTML。如果写入的字符串是通过网络拿到了，要注意对字符编码来避免XSS攻击。

  第二种是修改`innerText`或`textContent`属性，这样可以自动对字符串进行HTML编码，保证无法设置任何HTML标签：

  ```
    // 获取<p id="p-id">...</p>
    var p = document.getElementById('p-id');
    // 设置文本:
    p.innerText = '<script>alert("Hi")</script>';
    // HTML被自动编码，无法设置一个<script>节点:
    // <p id="p-id">&lt;script&gt;alert("Hi")&lt;/script&gt;</p>
  ```

  两者的区别在于读取属性时，`innerText`不返回隐藏元素的文本，而`textContent`返回所有文本。另外注意IE<9不支持`textContent`。

  修改CSS也是经常需要的操作。DOM节点的`style`属性对应所有的CSS，可以直接获取或设置。因为CSS允许`font-size`这样的名称，但它并非JavaScript有效的属性名，所以需要在JavaScript中改写为驼峰式命名`fontSize`：

  ```
    // 获取<p id="p-id">...</p>
    var p = document.getElementById('p-id');
    // 设置CSS:
    p.style.color = '#ff0000';
    p.style.fontSize = '20px';
    p.style.paddingTop = '2em';
  ```

##### 插入DOM

  把`<p id="js">JavaScript</p>`添加到`<div id="list">`的最后一项：

  ```
    var js = document.getElementById('js'),
    var  list = document.getElementById('list');
    list.appendChild(js);
  ```

  - insertBefore

    > 把子节点插入到指定位置

    把`Haskell`插入到`Python`之前

    ```
      var list = document.getElementById('list'),
      var ref = document.getElementById('python'),
      haskell = document.createElement('p');
      haskell.id = 'haskell';
      haskell.innerText = 'Haskell';
      list.insertBefore(haskell, ref);
    ```

##### 删除DOM

  ```
    // 拿到待删除节点:
    var self = document.getElementById('to-be-removed');
    // 拿到父节点:
    var parent = self.parentElement;
    // 删除:
    var removed = parent.removeChild(self);
    removed === self; // true
  ```
