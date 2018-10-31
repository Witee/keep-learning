import React, { Component } from 'react';
import Hammer from 'react-hammerjs';
import './style.css';


class App extends Component {
  state = {
    left: 184,
    offsetX: 0,
    top: 84,
    offsetY: 0,
  }

  /**
    只需要监听 拖动过程中 函数，通过 evt.isFinal 判断拖动是否结束
  */
  onPan = (evt) => {
    const { left, top } = this.state;

    if (evt.isFinal) {
      this.setState({
        left: evt.deltaX + left,
        top: evt.deltaY + top,
        offsetX: 0,
        offsetY: 0,
      });
    } else {
      this.setState({ offsetX: evt.deltaX, offsetY: evt.deltaY });
    }
  }

  render() {
    const { offsetX, left, offsetY, top } = this.state;

    return (
      <div>
        <div className="description">
          使用 hammer-js 实现 div 移动
        </div>

        <div className="hammer-js-work-area">

          <Hammer
            className="hammer-item"
            onPan={this.onPan}
            style={{
              position: 'absolute',
              transform: `translate(${offsetX}px, ${offsetY}px)`,
              left,
              top,
            }}
          >
            <div>可拖动DIV</div>
          </Hammer>

        </div>

      </div>
    );
  }
}

export default App;
