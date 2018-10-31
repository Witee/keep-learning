import React, { Component } from 'react';
import './style.css';

/**
  只在 X 轴方向移动的 DIV
  过程:  按下鼠标 -> 拖动鼠标 -> 松开鼠标

  注意: 在 div 上有两个定位参数 left 与 transform
      定位可以选 absolute 或 relative
      在移动完成后将 transform 中的偏移转换为 位置的参数，保证 transform 中的值最终是 0，方便保存
*/

class App extends Component {
  state = {
    dragging: false,
    startMoveX: 0,
    left: 0,
    offsetPageX: 0,
  }

  /**
    按下鼠标时显示蒙层，记录鼠标起点位置 startMoveX
  */
  handleMounseDown = (evt) => {
    this.setState({ dragging: true, startMoveX: evt.pageX });
  };

  /**
    拖动鼠标时，使用 鼠标移动结束位置(evt.pageX) - 鼠标起点位置(startMoveX) = 移动距离(offsetPageX)
  */
  handleMouseMove = (evt) => {
    const { startMoveX } = this.state;

    this.setState({ offsetPageX: evt.pageX - startMoveX });
  };

  /**
    松开鼠标时，将移动距离转换为定位值(offsetPageX + left)，并将偏移量清零
  */
  handleMouseUp = () => {
    const { offsetPageX, left } = this.state;
    this.setState({ dragging: false, left: offsetPageX + left, offsetPageX: 0 });
  };

  render() {
    const { dragging, left, offsetPageX } = this.state;
    return (
      <div>
        <div className="description">
          可以横向拖动的 DIV
        </div>
        <div className="div-move-x">
          <div
            className="item"
            onMouseDown={this.handleMounseDown}
            style={{
              position: 'relative',
              backgroundColor: '#eee',
              transform: `translate(${offsetPageX}px, 0px)`,
              left,
            }}
          >
          div
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
      </div>
    );
  }
}

export default App;
