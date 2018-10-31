import React, { Component } from 'react';
import './style.css';


class App extends Component {
  state = {
    dragging: false,
    startMoveX: 0,
    left: 184, // (768 - 400) / 2
    offsetPageX: 0,
    startMoveY: 0,
    top: 184, // 根据视觉随意设置的值
    offsetPageY: 0,
    width: 400, // 初始宽度
    startWidth: 0,
    resizeDirection: null, // 调整宽高的方向
  }

  /**
    CKEditor4 没有提供 npm 安装方式，所以只能使用 script 标签方式
  */
  componentDidMount() {
    const script = document.createElement('script');
    /**
      注意: 这里的 ckeditor.js 是定制版本，文件保存在 public/ckeditor 中
    */
    script.src = '/ckeditor/ckeditor.js';
    script.async = true;
    document.body.appendChild(script);
  }

  /**
    如果没有设置 direction 则认为是移动位置

    如果设置了 direction 则认为是调整宽高
  */
  handleMounseDown = (evt, resizeDirection = null) => {
    const { width } = this.state;
    this.setState({
      dragging: true,
      startMoveX: evt.pageX,
      startMoveY: evt.pageY,
      startWidth: width,
      resizeDirection,
    });
  }

  /**
    应该初始计算差值，而不是最终值，因为不能每次都把差值加到最终值中，导致值变大
  */
  handleMouseMove = (evt) => {
    const { startMoveX, startMoveY, startWidth, resizeDirection } = this.state;

    const offsetPageX = evt.pageX - startMoveX;
    const offsetPageY = evt.pageY - startMoveY;

    /**
      如果是调整宽高则需要调整定位的同时调整宽高

      注意这里的宽度:
        如果拖动 DIV 右侧的按钮，则只改变 width 即可；
        如果拖动 DIV 左侧的按钮，则同时需要改变 offsetPageX 的值(offsetPageX 减少的同时 width 增加)
    */
    if (resizeDirection) {
      if (resizeDirection === 'left') {
        this.setState({ width: startWidth - offsetPageX, offsetPageX });
      } else {
        this.setState({ width: startWidth + offsetPageX });
      }
    } else {
      this.setState({ offsetPageX, offsetPageY });
    }
  };

  handleMouseUp = () => {
    const { offsetPageX, left, offsetPageY, top } = this.state;
    this.setState({
      dragging: false,
      left: offsetPageX + left,
      offsetPageX: 0,
      top: offsetPageY + top,
      offsetPageY: 0,
      resizeDirection: null,
    });
  };

  render() {
    const { dragging, offsetPageX, left, offsetPageY, top, width } = this.state;

    return (
      <div>
        <div className="description">
          富文本编辑器, 可以拖动，调整宽度，单击编辑
        </div>

        <div className="rich-text-work-area">
          <div
            style={{
              position: 'absolute',
              transform: `translate(${offsetPageX}px, ${offsetPageY}px)`,
              left,
              top,
              width: `${width}px`,
              height: 'auto',
            }}
          >
            <article
              // className="rich-text-article-content"
              onMouseDown={this.handleMounseDown}
              contentEditable
              suppressContentEditableWarning // 禁用控制台警告
            >
              <p>单击以编辑</p>
            </article>

            <div className="rich-text-resizer">
              <div
                className="rich-text-anchor"
                data-direction="left"
                onMouseDown={(evt) => this.handleMounseDown(evt, 'left')}
              />
              <div
                className="rich-text-anchor"
                data-direction="right"
                onMouseDown={(evt) => this.handleMounseDown(evt, 'right')}
              />
            </div>
          </div>
        </div>

        {
          dragging && (
            <div
              className="div-move-x-mask"
              onMouseMove={this.handleMouseMove}
              onMouseUp={this.handleMouseUp}
            />
          )
        }

      </div>
    );
  }
}

export default App;
