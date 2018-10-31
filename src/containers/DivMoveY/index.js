import React, { Component } from 'react';
import './style.css';

const LINE_HEIGHT = 40;

class App extends Component {
  constructor(props) {
    super(props);

    const list = [];
    _.times(10, (n) => {
      list.push(`Items ${n}`);
    });

    this.state = {
      list,
      dragging: false,
      startPageY: 0,
      offsetPageY: 0,
      draggingIndex: -1,
    };
  }

  /**
    排序，交换元素位置
    1. 将原来位置(startIndex)元素提取，并从原有列表中删除
    2. 将提取出来的元素插入到新位置(toIndex)
  */
  move = (arr, startIndex, toIndex) => {
    const moveItem = arr.splice(startIndex, 1)[0];
    arr.splice(toIndex, 0, moveItem);
    return arr;
  }

  /**
    按下鼠标时，设置初始值；打开拖动标志、保存起始的 pageY、设置当前操作的 index
  */
  handleMouseDown = (evt, index) => {
    this.setState({ dragging: true, startPageY: evt.pageY, draggingIndex: index });
  };

  /**
    松开鼠标时，恢复默认值，同 constructor 中的 state 值
  */
  handleMouseUp = () => {
    this.setState({ dragging: false, startPageY: 0, offsetPageY: 0, draggingIndex: -1 });
  };

  /**
    核心拖动代码
    拖动距离每次与列高作对比，大于列高或小于负列高时，
    交换列表元素位置、更新操作的index、更新起始的 pageY

    注意：
      正在拖动的元素要“浮于”其它元素之上，否则 onMouseMove 将不被调用
  */
  handleMouseMove = (evt) => {
    const { list, startPageY, draggingIndex } = this.state;
    let offset = evt.pageY - startPageY;
    if (offset > LINE_HEIGHT && draggingIndex < list.length - 1) {
      // move down
      offset -= LINE_HEIGHT;
      this.setState({
        list: this.move(list, draggingIndex, draggingIndex + 1),
        draggingIndex: draggingIndex + 1,
        startPageY: startPageY + LINE_HEIGHT,
      });
    } else if (offset < -LINE_HEIGHT && draggingIndex > 0) {
      // move up
      offset += LINE_HEIGHT;
      this.setState({
        list: this.move(list, draggingIndex, draggingIndex - 1),
        draggingIndex: draggingIndex - 1,
        startPageY: startPageY - LINE_HEIGHT,
      });
    }

    this.setState({ offsetPageY: offset });
  };

  getDraggingStyle =(index) => {
    const { draggingIndex, offsetPageY } = this.state;
    if (draggingIndex !== index) { return {}; }

    return {
      backgroundColor: '#eee',
      transform: `translate(10px, ${offsetPageY}px)`,
      opacity: 0.5,
    };
  }

  render() {
    const { dragging, list } = this.state;
    return (
      <div id="div-move-y">
        <div className="description">
          列表排序
        </div>

        <ul>
          {_.map(list, (l, index) => (
            <li
              key={l}
              onMouseDown={(evt) => this.handleMouseDown(evt, index)}
              style={this.getDraggingStyle(index)}
            >
              {l}
            </li>
          ))}
        </ul>
        {dragging && (
          <div
            className="div-move-y-mask"
            onMouseMove={this.handleMouseMove}
            onMouseUp={this.handleMouseUp}
          />
        )}
      </div>
    );
  }
}

export default App;
