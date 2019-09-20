# CSS基础1

#### CSS使用方法

  - 链接外部样式文件:
  	`<link type="text/css" rel="stylesheet" href="style.css" />`
  - 导入外部样式:
    ```css
      <style type="text/css">
        @import "outer.css"
        @import url("mycss.css")
      </style>
    ```
  - 使用内部CSS样式:
    ```css
      <style type="text/css">
        ...
      </style>
    ```
  - 内联样式: `style="property:value;"`

#### CSS 选择器
  - 元素选择器: `E (...) // E代表HTML元素名`

  - 属性选择器:
    - `E {...}`: 对所有E元素起作用
    - `E[attr]{...}`: 具有`attr`属性的E元素起作用: `div[id] {...} //具有id属性的div`
    - `E[attr=value]{...}`: 包含`attr`且值为`value`
    - `E[attr~=value]{...}`: 包含`attr`且值为以空格隔开的系列值，其中某个值为`value`
      ```css
      <style type="text/css">
        img[title~=flower]{...}
      </style>

      <img src="/i/eg_tulip.jpg" title="tulip flower" /> // 选中
      ```
    - `E[attr|=value]{...}`: 包含`attr` 且 值 为以连字符或整个 `value` 开头的值
      ```css
        <style type="text/css">
          p[lang|=en]{...}
        </style>

        <p lang="en">Hello!</p>  // 选中
        <p lang="en-us">Hi!</p>  // 选中
      ```
    - `E[attr^="value"]{...}`: 包含`attr`且值为`value`开头 (CSS3新增)
    - `E[attr$="value"]{...}`: 包含`attr`且值为`value`结尾 (CSS3新增)
    - `E[attr*="value"]{...}`: 包含`attr`且值包含`value` (CSS3新增)

  - ID选择器: `#idValue {...}` `E#idValue {...}`

  - class选择器: `[E].classValue {...} // E可选`

  - 包含选择器: `Selector1 Selector2 {...}`
    ```html
      /* 处于div之内且class属性为a的元素 */
      div .a {...}

        <div>
          <section>
            <p class="a">asdf</p>
          </section>
        </div>
    ```

  - 子选择器: `Selector1 > Selector2 {...}`
    ```html
      /* div的直接子元素且class属性为a的元素 */
      div>.a {...}

      <div><p class="a">...</p></div>
    ```

  - CSS3 新增的兄弟选择器: `Selector1 ~ Selector2 {...}`
    ```html
      #android ~ .long {...}

      <div id="android">aaa</div>
      <p class="long">bbb</div>    // 选中
      <div class="long">ccc</div>  // 选中
    ```

  - 选择器组合: `Selector1,Selector2,...{...}` 一份样式对多个选择器起作用

  - 伪元素选择器:
    - `:first-letter`: 指定对象内的第一个字符

      仅对块元素(如`<div.../>`、`<p.../>`、 `<section.../>等`)起作用。如果想对内联元素(如`<span.../>`等)使用该属性，必须先设定对象的`height`、`width`属性，或者设定`position`属性为`absolute`，或者设定`display`属性为`block`。通过选择器配合`font-size`、`float`属性可制作首字下沉效果
      ```html
        <style type="text/css">
          span {display: block;}
          span:first-letter {color: #f00; font-fize: 20pt;}
          section:fitst-letter {color: #00f; font-size: 30pt; font-weight: bold;}
          p:first-letter {color: #00f; font-size: 40pt; font-weight: bold;}
        </style>

        <body>
          <span>abc</span>
          <section>aaaaa</section>
          <p>bbbbb</p>
        </body>
      ```

    - `:first-line`: 指定对象内的第一行内容；同样只对块元素起作用，同上
    - `:before`: 与内容相关的属性结合使用，用于在指定对象内部的前端插入内容
    - `:after`: 与内容相关的属性结合使用，用于在指定对象内部的尾端添加内容

  - 内容相关的属性
    - `content`: 值可以是字符串、`url(url)`、`attr(alt)`、`counter(name)`、`counter(name, list-style-type)`、 `open-quote`、`close-quote`等格式。用于向指定元素之前或之后插入指定内容。
    ```html
      div>div:before {content: 'AAA'}

      <div>
        <div>bbb</div>
      </div>
    ```

  - CSS3 新增的伪类选择器
    - 结构性伪类选择器
      - `Selector:root`: 匹配文档的根元素`<html.../>`
      - `Selector:first-child`: 匹配符合`Selector`选择器，且必须是其父元素的第一个子节点的元素
      - `Selector:last-child`: 匹配符合`Selector`选择器，且必须是其父元素的最后一个子节点的元素
      - `Selector:nth-child(n)`: 匹配符合`Selector`选择器，且必须是其父元素的第n个子节点的元素; `odd/event`表示奇数/偶数
      - `Selector:nth-last-child(n)`: 匹配符合`Selector`选择器，且必须是其父元素的倒数第n个子节点的元素
      - `Selector:only-child`: 匹配符合`Selector`选择器，且必须是其父元素的唯一子节点的元素
      - `Selector:first-of-type`: 匹配符合`Selector`选择器，且必须与它同类型、同级的兄弟元素中的第一个元素
      - `Selector:last-of-type`: 匹配符合`Selector`选择器，且必须与它同类型、同级的兄弟元素中的最后一个元素
      - `Selector:nth-of-type(n)`: 匹配符合`Selector`选择器，且必须与它同类型、同级的兄弟元素中的第n个元素
      - `Selector:nth-last-of-type(n)`: 匹配符合`Selector`选择器，且必须与它同类型、同级的兄弟元素中的倒数第n个元素
      - `Selector:only-of-type`: 匹配符合`Selector`选择器，且必须与它同类型、同级的兄弟元素中的唯一一个元素
      - `Selector:empty`: 匹配符合`Selector`选择器，且其内部没有任何子元素的元素

    - UI元素状态伪类选择器: `Selector可选`
      - `Selector:link`: 匹配`Selector`选择器且未被访问前的元素
      - `Selector:visited`: ...访问过的
      - `Selector:active`: ...用户激活(鼠标按住)
      - `Selector:hover`: ...鼠标悬停
      - `Selector:focus`: ...已得到焦点
      - `Selector:enabled`: ...处于可用状态
      - `Selector:disabled`: ...处于不可用状态
      - `Selector:checked`: ...处于选中状态
      - `Selector:default`: ...页面打开时处于选中状态
      - `Selector:read-only`: ...处于只读状态
      - `Selector:read-write`: ...处于读写状态
      - `Selector::selection (两个冒号)`: 匹配`Selector`的元素中当前被选中的内容

    - CSS3新增的特殊伪类选择器
      - `Selector:target`: 匹配符合`Selector`选择器且必须是命名锚点目标的元素，且是当前访问的目标
      - `Selector:not(Selector2)`: 匹配符合`Selector1`选择器，但不符合`Selector2`选择器的元素

#### 字体相关属性
  - `font`: 复合属性，如 `font-style`、`font-variant`、 `font-weight`、 `font-size`、`line-height`、`font-family`，为了更具体地进行控制，通常不建议使用
  - `color`: 控制文字颜色，可以为字符串类型的颜色名、十六进制的颜色值、rgb()造成的RGB值，或CSS3新增的HSL颜色值
  - `font-family`: 文字的字体，因为字体需要浏览器内核内嵌字体的支持，可以设置多个，以优先找到的字体显示，使用`,`号分隔
  - `font-size`: 字体大小，可以为相对和绝对大小
    - `xx-small`: 绝对字体尺寸。最小字体
    - `x-small`: 绝对。较小字体
    - `small`: 绝对。小字体
    - `medium`: 绝对。正常大小，默认值
    - `large`: 绝对。大字体
    - `x-large`: 绝对。较大字体
    - `xx-large`: 绝对。最大字体
    - `larger`: 相对字体尺寸。相对于父组件中的字体进行相对增大
    - `smaller`: 相对。相对于父组件的字体进行相对减少
    - `length`: 直接设置字体大小。可以为百分比，大小为父组件字体大小的百分比；也可以为一个`数值+长度单位`，如`11pt`、`14px`等
    - `font-size-adjust`: 用于控制对不同字体的字体尺寸进行微调。可以为`none`(不进行任何调整)或用一个数值代表调整比例
    - `font-stretch`: 改变文字横向的拉伸，默认值为`normal`，即不拉伸。还可以为`narrower(横向压缩)`、`wider(横向拉伸)`
    - `font-style`: 设置文字风格，是否采用斜体等。可以为`normal(正常)`、`italic(任何)`、`oblique(倾斜字体)`
    - `font-weight`: 设置字体是否加粗。表示加粗程度，使用`lighter(更细)`、`normal(正常)`、`bold(加粗)`、`bolder(更粗)`。还可以使用具体的数值，用 100、200、300、 ...、900来控制字体的加粗程度。
    - `text-decoration`: 控制文字是否有修饰线。值为`none(无修饰)`、`blink(闪烁)`、`underline(下画线)`、`line-through(中画线)`、`overline(上画线)`等
    - `font-variant`: 设置文字大写字母的格式。值为`normal(正常的字体)`、`small-caps(小型的大写字母字体)`
    - `text-shadow`: 文字是否有阴影效果
    - `text-transform`: 设置文字的大小写。值为`none(不转换)`、`capitalize(首字母大写)`、`uppercase(全部大写)`、`lowercase(全部小写)`
    - `line-height`: 设置字体行高，即字体最底端与字体内部顶端之间的距离。为负值的行高可用来实现阴影效果
    - `letter-spacing`: 设置字符之间的间隔。将指定的间隔添加到每个字符之后，但最后一个文字不会受影响。支持`normal`和`数值+长度单位`(如 11pt、14px等)两种值
    - `word-spacing`: 设置单词之间的间隔，同样支持上面两种值

  - 添加阴影
    `text-shadow`属性值为`color xoffset yoffset length` 或 `xoffset yoffset radius color`
    - `color`: 阴影的颜色，如省略，在Firfox、Opera中将直接使用字体颜色作为引用颜色，在IE、Chrome中将不显示阴影
    - `xoffset`: 阴影在横向上的偏移
    - `yoffset`: 阴影在纵向上的偏移
    - `radius`: 阴影的模糊半径。半径越大，阴影看上去越模糊

  - CSS3支持的颜色表示方法
    - 颜色名称: 如`white(白色)`、`red(红色)`、`greenyellow(绿黄色)`、`gold(金色)`
    - 十六进制的颜色值: 三元色混合原理，如`#FF0000`，其中前两位`FF(就是255)`表示红光值最大；间中两位表示绿光的值；后面两位表示蓝光的值。实际上也可以把红、绿、蓝分为0~15个色阶，这样使用3位十六进制数即可表示，如`#0F0`
    - rgb(r,g,b)函数: 同样为三原色混合原理。如`rgb(255,255,0)`，红光值为255(最大值)、绿光值255、蓝光值为0，结果为黄色
    - `hsl(Hue,Saturation,Lightness)`函数: 使用色调、饱和度、亮度控制的颜色。如`hsl(120, 100%, 100%)`，色调为120，也就是绿色(色调0代表红色、120代表绿色、240代表蓝色)，饱和度、亮度都是100%，因此为绿色
    - `rgba(r,g,b,a)`: 多了一个`a`参数表示透明度，`a`可以为`0~1`之间任意数，`0`代表完全透明
    - `hsla(Hue,Saturation,Lightness,alpha)`: 多了一个`alpha`表示透明度

#### 文本相关属性
  - `text-indent`: 段落文本缩进
  - `text-overflow`: 控制溢出文本的处理方法，支持两个属性:
    - `clip`: 如果该元素指定了`overflow:hidden`属性，当该元素中文本溢出时，`clip`指定只是简单地裁切溢出的文本
    - `ellipsis`: 如果该元素指定了`overflow:hidden`属性，当该元素文本溢出时，`ellipsis`指定裁切溢出的文本，并显示溢出标记`...`
  - `vertical-align`: 用于设置目标元素里内容的垂直对齐方式，通常有顶端对齐，底对齐等方式
    - `auto`: 对元素的文本内容执行自动对齐
    - `baseline`: 默认值。将支持`valign`属性的元素的文本内容与基线对齐
    - `sub`: 将元素的内容与文本下标对齐
    - `super`: 上标对齐
    - `top`: 默认值。顶端对齐
    - `middle`: 默认值。对齐到元素中间
    - `bottom`: 默认值。底端对齐
    - `length`: 指定文本内容相对于基线的偏移距离。可使用百分比或绝对距离
  - `text-align`: 水平对齐方式，支持属性:
    - `left`: 左对齐
    - `right`: 右对齐
    - `center`: 居中对齐
    - `justify`: 两端对齐
  - `word-break`: 换行方式
    - `normal`: 默认规则换行。西文只会在半角空格、连字符的地方进行换行，不会在单词中间换行；中文可以在任何一个中文字符换行
    - `keep-all`: 只能在半角空格或连字符处换行
    - `break-all`: 允许在单词中间换行
  - `white-space`: 内容对空格的处理方式
    - `normal`: 默认。抵达窗口边界换行
    - `nowrap`: 强制在同一行内显示所有文本，直到文本结束或遇到`<br/>`元素
  - `word-wrap`: 同样为换行方式
    - `normal`: 默认规则
    - `break-word`: 允许在单词中间换行

  > `word-break: break-all`与`word-wrap: break-word`区别
  > `word-break:break-all`真正的强制换行，不留空隙；`word-wrap: break-word`如果一行文字有换行点，如空格，则在换行点换行，经常会留空白

#### CSS3新增的服务器字体
  - 格式:

    ```html
      @font-face {
        font-family: NAME;
        src: url(URL) format(FONTFORMAT);
        // 指定顺序 src: local("Goudy Stout"), url("Blazed.ttf") format("TrueType")
        SRULES
      }

      @font-face {
        font-family: aaaaa;
        src: url("Delicious-Roman.otf") format("OpenType");
      }

      <div style="font-family: aaaaa; font-size: 30pt"
    ```
