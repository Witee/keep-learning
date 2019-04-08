# CSS3基础3

#### 盒模型与布局相关的属性

##### 布局相关属性
  - `float`: 控制是否浮动以及如何浮动。当通过该属性设置某个对象浮动后，该对象将被当作块(block-level)组件处理，即相当于display属性被设置为block。也就是说，即使为浮动组件的display设置了其他属性值，该属性依然是block。浮动组件将会漂浮紧紧跟随它的前一个组件，直到遇到边框、内补丁、外补丁或另一个块组件为止。属性支持left、right两个属性值，分别指定对象向左、向右浮动
  - `clear`: 设置组件的左、右是否允许出现浮动对象。
    - `none`: 默认值。两边都允许出现浮动组件
    - `left`: 不允许左边出现浮动组件
    - `right`: 不允许右边出现浮动组件
    - `both`: 两边都不允许出现浮动组件

  - `clip`: 控制对HTML元素进行裁剪。可指定为`auto`(不裁剪)或`rect(n n n n)`，其中`rect()`用于在目标组件上定义一个矩形，目标组件只要位于该矩形内的区域才会被显示出来

  - `overflow`: 当组件不够容纳内容时的显示方式
    - `visible`: 默认值。既不裁剪内容也不添加滚动条
    - `auto`: 自动添加滚动条
    - `hidden`: 自动裁剪
    - `scroll`: 总是显示滚动条
    - `overflow-x`: 控制水平方向的显示方式
    - `overflow-y`: 控制垂直方向的显示方式
    - `visibility`: 是否显示。与`display`属性不同，当隐藏后仍占用空间，值为`visible`和`hidden`
    - `display`: 是否及如何显示，主要用于控制CSS盒模型

##### 盒模型和 display 属性
  > HTML组件中呈现一片空白区域的组件都可当成盒模型，如div、span、section等
  > display=以下值就可以设置

  - `block`类型: 这种盒模型默认占据一行
  - `inline`类型: 不会占据一行，即使通过CSS设置宽高也不会起作用

  - `none`: 设置目标对象隐藏，占用的空间也会释放

  - `inline-block`: 此盒模型既不会占据一行，同时也支持通过`width`、`height`指定宽高

  - `inline-table`: 默认情况下`<table.../>`属于`block`，默认占一行，`inline-table`允许设置宽高，允许左右出现其他内容

##### 其它表格相关的盒模型

  - `table`: 将目标HTML组件显示为表格
  - `table-caption`: 显示为表格标题
  - `table-cell`: 单元格
  - `table-column`: 表格列
  - `table-column-group`: 表格列组
  - `table-header-group`: 表格头部分
  - `table-footer-group`: 表格页脚部分
  - `table-row`: 表格行
  - `table-row-group`: 表格行组

  - `list-item`: 将组件转换为类似于`<ul.../>`的列表元素，也可以同时在元素前面添加列表标志

  - `run-in`: 类似`inline`，希望显示在它后面元素内部；如果后面紧跟一个`block`盒模型元素，那么`run-in`盒模型元素将被放入后面的元素中显示

##### 对盒添加阴影

  - `box-shadow`: 可以为所有盒模型的元素整体增加阴影。复合元素
    - `hOffset`: 控制阴影在水平方向的偏移
    - `vOffset`: 控制阴影在垂直方向的偏移
    - `blurLength`: 阴影的模糊程度
    - `scaleLength`: 阴影的缩放程序
    - `color`: 阴影的颜色

##### CSS3 的多栏布局

  - `columns`: 复合属性，同时指定栏目宽度、栏目数两个属性值。相当于同时指定`column-width`、`column-count`
  - `column-width`: 指定一个长度值，用于指定每个栏目的宽度
  - `column-count`: 指定一个整数值，用于指定栏目数
  - `column-rule`: 复合属性，用于指定各栏目之间的分隔条。可同时指定分隔条的宽度、样式、颜色。相当于同时指定`columns-rule-width`、`column-rule-style`、`column-rule-color`
  - `column-rule-width`: 指定一个长度值，用于指定栏目之间分隔条的宽度
  - `column-rule-style`: 用户设置分隔条的线型。支持`none`、`dotted`、`dashed`、`solid`、`double`、`groove`、`ridge`、`inset`、`outset`
  - `column-rule-color`: 设置分隔条的颜色
  - `column-gap`: 长度值，指定栏目之间的间距
  - `column-fill`: 控制栏目高度
    - `auto`: 各栏目的高度随着其内容的多少自动变化
    - `balance`: 各栏目的高度将会统一成内容最多的那一栏的高度

##### 使用盒模型实现多栏布局

  - `box-orient`: 设置`box`盒模型里子元素的排列方向
    - `horizontal`: `box`盒模型里的子元素水平排列。如果没有为子元素指定高度，水平排列的`box`盒模型里子元素的高度等于父窗口的高度
    - `vertical`: 垂直排列，同`horizontal`

  - `box-ordinal-group`: 设置`box`盒模型里子元素的显示顺序
  - `box-flex`: 子元素自适应宽度的比例

---
#### 表格、列表相关属性及media query

##### 表格相关属性

  - `border-collapse`: 设置表格里行和单元格边框的显示方式，该属性控制两个单元格的边框是合并在一起，还是按照标准的HTML样式分开。有两个值，即`seperate(边框分开，使得单元格的分隔线为双线)`和`collapse(边框合并，使得单元格的分隔线为单线)`
  - `border-spacing`: 当设置`border-collapse`为`seperate`时，用于设置两个单元格边框之间的间距
  - `caption-side`: 用于设置表格标题位于表格哪边。必须和`<caption.../>`元素一起使用。有4个值，`top`、`bottom`、`left`、`right`
  - `empty-cells`: 控制单元格内没有内容时，是否显示单元格边框。只有当`border-collapse`属性设置成`seperate`时，才有效。支持`show`和`hide`两个属性值
  - `table-layout`: 设置表格宽度布局的方法。支持`auto`和`fixed`两个值。`auto`是默认值；`fixed`批使用固定布局方式

##### 控制表格布局

  通过将表格的`table-layout`指定为`fixed`可以控制表格的布局方式，指定`table-layout:fixed`是一种固定布局方式。在这种情况下，表格的宽度会按如下方式计算得到:

  - 如果通过`<col.../>`或`<colgroup.../>`元素设置了每列的宽度，则表格宽度资金的等于所有列宽的总和。
  - 如果表格的第一个单元格设置了宽度信息，则表格宽度将等于第一行内所有单元格宽度的总和
  - 直接平均分配每列的宽度，忽略单元内容的实际宽度

##### 列表相关属性

  - `list-style`: 复合属性，可同时指定`list-style-image`、`list-style-position`、`list-style-type`三个属性
  - `list-style-image`: 用于指定作为列表项标记的图片
  - `list-style-position`: 指定列表项标记出现的位置。支持`outside(列表项标记放在列表元素之外)`和`inside(列表项标记放在列表元素之内)`两个值
  - `list-style-type`: 指定列表项标记的样式
    - `decimal`: 阿拉伯数字。默认值
    - `disc`: 实心圆
    - `circle`: 空心圆
    - `square`: 实心方块
    - `lower-roman`: 小写罗马数字
    - `upper-roman`: 大写罗马数字
    - `lower-alpha`: 小写英文字母
    - `upper-alpha`: 大写英文字母
    - `none`: 不使用项目符号

##### 控制光标的属性

  - `all-scroll`: 代表十字箭头光标
  - `col-resize`: 水平拖动线光标
  - `crosshair`: 十字线光标
  - `move`: 十字箭头光标
  - `help`: 问号箭头光标
  - `no-drop`: 禁止光标
  - `not-allowed`: 禁止光标
  - `pointer`: 手型光标
  - `progress`: 沙漏箭头光标
  - `row-resize`: 垂直拖动线光标
  - `text`: 文本编辑光标
  - `vertical-text`: 垂直文本编辑光标
  - `wait`: 沙漏光标
  - `*-resize`: 可在各种方向上拖动的光标，支持`w-resie`、`s-resize`、`e-resize`、`ne-resize`、`sw-resize`、`se-resize`、`nw-resize`等各种属性值，`n`代表向上、`s`向下、`e`向右、`w`向左

---
#### media query 功能

##### media query 语法

  > 语法: `@media not|only 设备类型 [ and  设备特性]*`
  > `[and 设备特性]` 部分可出现0~N次

  设备类型如下:
  - `all`: 所有
  - `aural`: 语音和音频合成器
  - `braille`: 触觉反馈设备
  - `embossed`: 凸点字符(盲文)印刷设备
  - `handheld`: 小型或手提设备
  - `print`: 打印机
  - `projection`: 投影图像
  - `screen`: 计算机显示器
  - `tty`: 固定间距字符格的设备
  - `tv`: 电视类设备

  设备特性如下:
  - `width`: 带单位的长度值。匹配浏览器窗口的宽度
  - `height`: 高度
  - `aspect-ratio`: 比例值。如16/9。 匹配浏览器窗口的宽度与高度值的比率
  - `device-width`: 设备分辨率的宽度
  - `device-height`: 设备分辨率的高度
  - `device-aspect-ratio`: 比例。设备分辨率的宽度与高度的比率
  - `color`: 整数值。匹配设备使用多少位的色深。比如真彩色是32，不是彩色设备，值为0
  - `color-index`: 整数值。匹配色彩表中的颜色数
  - `monochrome`: 整数值。匹配单色帧缓冲器中每像素的位(bit)数。如不是单色设备，值为0
  - `resolution`: 分辨率。如300dpi。匹配设备的物理分辨率
  - `scan`: 可能是`progressive`或`interiace`。匹配扫描方式，`progressive(逐行扫描)`、`interiace(隔行扫描)`


---
#### 变形与动画相关属性

##### CSS3提供的变形支持

  - `transform`: 用于设置变形。支持一个或多个变形函数
    - `translate(tx [,ty])`: 横向上移动tx距离，纵向移动ty路径。ty可省略，默认为0
    - `translateX(tx)`: 横向上移动tx距离
    - `translateY(ty)`: 纵向移动ty
    - `scale(sx [,sy])`: 横向缩放比为sx，纵向缩放比为sy，sy省略时表示保持纵横比缩放
    - `scaleX(sx)`: 相当于执行`scale(sx, 1)`
    - `scaleY(sy)`: 相当于执行`scaleY(1, sy)`
    - `rotate(angle)`: 顺时针转过angle角度
    - `skew(sx [,sy])`: 沿着X轴倾斜sx角度，沿着Y轴倾斜sy角度。sy省略时为0
    - `skewX(sx)`: 沿着X轴倾斜sx角度
    - `skewY(sy)`: 沿着Y轴倾斜sy角度
    - `matrix(m11 ,m12, m21, m22, dx ,dy)`: 这是一个基于矩阵变换的函数。前4个参数将组成变形矩阵； dx、dy负责对坐标系统进行平移

  - `transform-origin`: 设置变形的中心点。值应该指定为xCenter、yCenter，分别对应以下值:
    - `left`: 指定旋转中心点位于组件的左边界。只能指定给xCenter
    - `top`: 上边界。只能指定给yCenter
    - `right`: 右边界。只能指定给xCenter
    - `bottom`: 下边界。你只能指定给yCenter
    - `center`: 中间。如果将xCenter、yCenter都指定为center，则旋转中心点位于元素中心
    - 长度值: 指定旋转中心点距离左边界、右边界的长度
    - 百分比: 旋转中心点位于横向、纵向上的百分比位置

##### CSS3 提供的 Transition动画

  - `transition-property`: 指定元素的哪个CSS属性进行平滑渐变处理。可以指定`brakground-color`、`width`、`height`等
  - `transition-duration`: 渐变的持续时间
  - `transition-timing-function`: 渐变的速度
    - `ease`: 动画开始较慢，然后速度加快，到达最大速度后再减慢速度
    - `linear`: 线性速度。动画开始时的速度到结束时的速度保持不变
    - `ease-in`: 开始时速度较慢，然后加快
    - `ease-out`: 开始很快，然后减慢
    - `ease-in-out`: 开始时较慢，然后加快，到达最大速度后再减慢
    - `cubic-bezier(x1, y1, x2, y2)`: 通过贝济埃曲线来控制动画的速度。可替代上面5个值

  - `transition-delay`: 指定延时时间，经过多长时间才开始执行平滑渐变

##### CSS3 提供的 Animation 动画

  - `animation-name`: 指定动画名称。该属性指定一个已有的关键帧定义
  - `animation-duration`: 指定动画的持续时间
  - `animation-timing-function`: 指定动画的变化速度
  - `animation-delay`: 指定动画延迟多长时间才开始执行
  - `animation-iteration-count`: 循环执行次数
  - `animation`: 复合属性。格式及内容就是上面的顺序及值
