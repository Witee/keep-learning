# CSS3基础2

#### 背景相关属性
  - `background`: 设置背景样式。复合属性，可同时设置背景色、背景图片、背景重复模式等
  - `background-attachment`: 背景图片是随对象内容滚动还是固定的，需要先指定`background-image`
    - `scroll`: 背景图片会随组件里内容滚动而滚动。默认值
    - `fixed`: 背景图片固定
  - `background-color`: 背景颜色，背景图片会覆盖背景色
  - `background-position`: 背景图片位置，值为两个，一个为横坐标一个为纵坐标，可以为值或百分比，如果是一个值，则是横坐标
  - `background-repeat`: 设置背景图片是否平铺。属性有: `repeat(纵向、横向同时平铺)`、`no-repeat(不平铺)`、`repeat-x(仅在横向平铺)`、`repeat-y(仅在纵向平铺)`

###### CSS3新增背景相关属性
  - `background-clip`: 设置背景覆盖的范围
    - `border-box`: 指定背景覆盖`border`、`padding`、`content`
    - `no-clip`: : 指定背景覆盖`border`、`padding`、`content`
    - `padding-box`: 覆盖`padding`、`content`
    - `content-box`: 只覆盖`content`
    - `border`: 指定背景图片从`border`开始覆盖
    - `padding`: 指定背景图片从`padding`开始覆盖
    - `content`: 指定背景图片从`content`开始覆盖
  - `background-origin`: 设置背景覆盖的起点
  - `background-size`: 背景图片大小，值由两部分组成，代表图片宽度、高度，支持3种写法
    - 长度值
    - 百分比
    - `auto`: 指定背景图片保持纵横比缩放。宽度、高度只能有一个指定为`auto`，表明宽度、高度会以保持纵横比的方式自动计算

###### CSS3新增的多背景图片
  CSS3 之前，每个组件只能指定一种背景图片，如果同时指定了背景颜色和背景图片，那么背景图片会覆盖背景颜色。CSS3允许同时指定多个背景图片，这些背景图片会依次覆盖。
  CSS3并没有为多背景图片支持提供额外的属性，多背景图片依然是通过`background-image`、`background-repeat`、`background-position`、`background-size`等属性来控制的，只是CSS3允许指定多个属性值（逗号隔开），这样就可以实现多背景图片的效果。
  ```
    // 依次指定了3个背景图片
    background-image: url(snow.gif), url(face.gif), url(sky.gif);
    // 依次指定了3个背景图片的重复方式: 纵向、横向、两个方向
    background-repeat: repeat-y, repeat-x, repeat;
    // 依次指定了3个背景图片的位置
    background-position: center top, left center, left top;
  ```

---
#### 边框相关属性
  - `border`: 复合属性，可同时设置边框的粗细、线型、颜色
  - `border-color` 设置组件边框颜色。如果提供4个颜色，则将按上右下左的顺序一次设置4个边框的颜色；1个值则同时设置4个边框；2个值则设置上+下和左+右边框颜色；3个值则设置上、左+右、下边框颜色
  - `border-style`: 设置组件的边框线型，值的设置同`border-color`
  - `border-width`: 边框宽度，值的设置同`border-color`
  - `border-top`: 复合属性，上边框样式，可同时设置粗细、线型、颜色
  - `border-top-color`: 上边框颜色
  - `border-top-style`: 上边框线型
  - `border-top-width`: 上边框线宽

    > 同时还可以设置 right、bottom、left

  - `none`: 无边框
  - `hidden`: 隐藏边框
  - `dotted`: 点线边框
  - `dashed`: 虚线边框
  - `solid`: 实线边框
  - `double`: 双线边框
  - `groove`: 3d凹槽边框
  - `ridge`: 3D凸槽边框
  - `inset`: 3D凹入边框
  - `outset`: 3D突出边框

##### CSS3 提供的渐变边框
  - `border-top-colors`: 用户设置目标组件的上边框颜色。如果设置上边框的宽度是`Npx`, 那么就可以为该属性设置`N`种颜色，每种颜色显示`1px`的宽度。但如果设置的颜色数量小于边框的yapa，那么最后一个颜色将会覆盖边框剩下的宽度。

    > 同时还可设置 `border-right-colors`、`border-bottom-colors`、`border-left-colors`

##### CSS3 提供的圆角边框
  - `border-radius`: 指定圆角边框的圆角半径。如果该属性指定1个长度，则4个圆角都使用该长度作为半径；如果指定2个长度，则第一个长度将作为左上角、右下角的半径；如果我绑定3个长度，则第一个长度作为左上角的半径，第二个长度作为右上角、左下角的半径，第三个长度作为右下角的半径
  - `border-top-left-radius`: 左上角的圆角半径
  - `border-top-right-radius`: 右上角
  - `border-bottom-left-radius`: 左下角
  - `border-bottom-right-radius`: 右下角

##### CSS3 提供的图片边框
  - `border-image`: 格式: `border-image-source border-image-slice[/border-image-width] border-image-repeat`

    - `border-image-source`: 指定图片，可以为`none`或使用`url()`函数指定图片
    - `border-image-slice`: 可以指定1~4个数值或百分比数值，这4个数值用于控制如何边框图片进行切割。假设指定了 10 20 30 40，这4个数值分别指定切割边框图片时上边框为10px、右20px、下30px、左40px。同样还可以设置1、2、3个值，规则相同
    - `border-image-width`: 指定边框宽度，可以指定1~ 4个长度、数值、百分比。还可以设置1~3个值，规则相同
    - `border-image-repeat`: 指定边框图片的覆盖方式，支持`stretch(白头偕老覆盖)、repeat(平辅覆盖)、round(取整平铺)三种`。可指定两个值，分别代表横向、纵向覆盖方式

---
#### 补丁相关属性

##### 内补丁相关属性
  - `padding`: 可同时设置上、右、下、左4个值，还可支持1~3个值，规则相同
  - `padding-top`: 上边的内补丁距离
  - `padding-right`: 右边的内补丁距离
  - `padding-bottom`: 下边的内补丁距离
  - `padding-left`: 左边的内补丁距离

##### 外补丁相关属性
  - `margin`: 同 `padding`
  - `margin-top`: 上边的外补丁距离
  - `margin-righ`、 `margin-bottom`、`margin-left`

---
#### 大小、定位、轮廓相关属性

##### 大小
  - `height`: 设置目标对象的高度
  - `max-height`: 最大高度。如果小于`min-height`值，则自动转换为`min-height`
  - `min-height`: 最小高度。如果大于`max-height`值，则自动转换为`max-height`
  - `width`: 宽度
  - `max-width`: 最大宽度。如果小于`min-width`，则转换为`min-width`
  - `min-width`: 最小宽度。如果小于`max-width`，则转换为`max-width`

###### CSS3 新增的 box-sizing 属性
  > 用于控制元素整体的宽高

  - `content-box`: 设置`width`、`height`控制元素的内容区宽度和高度
  - `padding-box`: 设置`width`、`height`控制元素的内容区加内补丁区的宽度和高度
  - `border-box`: 设置`width`、`height`控制元素的内容区加内补丁区再加外边框区的宽高

###### CSS3 新增的 resize 属性

  > 用于指定是否允许用户通过拖动来改变元素的大小

  - `none`: 不允许用户通过拖动来改变组件的大小
  - `both`: 不允许用户通过拖动来改变组件宽高
  - `horizontal`: 不允许拖动改变宽度
  - `vertical`: 不允许拖动改变高度
  - `inherit`: 继承自父元素的 `resize` 值，默认。

##### 定位相关属性

  > 用于设置目标组件的位置，包括是否漂浮于页面之上，通过使用漂浮的`<div .../>`元素，可自由移动页面元素的位置，从而可在页面上产生动画效果

  - `position`: 设置目标定位方式。设置为`absolute`会允许将该对象漂浮于页面之上，无须考虑它周围内容的布局；设置为`relative`会保持对象在正常的HTML流中，目标对象的位置将参照前一个对象的位置进行定位；设置为`static`，则目标对象仅以页面作为参照系
  - `z-index`: 设置目标对象的漂浮层的层序，值越大，越浮于上面。此属性仅当`position`属性值为`relative`或`absolute`时有效。此属性对窗口控件(如`<select .../>`元素)没有影响
  - `top`: 设置目标对于最近一个具有定位设置的父对象的顶边偏移，仅当`position`属性为`relative`或`absolute`时有效
  - `right`、`bottom`、`left`同`top`

##### 轮廓相关属性

  > 主要用于让目标对象周围有一圈“光晕”效果，光晕不会占用页面实际物理布局

  - `outline`: 复合属性，或全面设置目标对象轮廓的颜色、线型、线宽三个属性
  - `outline-color`: 轮廓颜色
  - `outline-style`: 线型。支持的值有: `none`、`dotted`、`dashed`、`solid`、`double`、`groove`、`ridge`、`inset`、`outset`
  - `outline-width`: 轮廓宽度
  - `outline-offset`: 轮廓偏移距离，即轮廓与边框之间的距离
