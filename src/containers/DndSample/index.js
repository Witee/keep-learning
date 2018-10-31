import React, { Component } from 'react';
import './style.css';

const move = (arr, startIndex, toIndex) => {
  arr = arr.slice();
  arr.splice(toIndex, 0, arr.splice(startIndex, 1)[0]);
  return arr;
};

const lineHeight = 100;

class App extends Component {
  state = {
    list: ['div1', 'div2', 'div3', 'div4', 'div5'],
    dragging: false,
    draggingIndex: -1,
    startPageY: 0,
    offsetPageY: 0,
  }

  getDraggingStyle(index) {
    if (index !== this.state.draggingIndex) return {};
    return {
      backgroundColor: '#eee',
      transform: `translate(10px, ${this.state.offsetPageY}px)`,
      opacity: 0.5,
    };
  }

  handleMouseMove = (evt) => {
    const { list, startPageY, draggingIndex } = this.state;
    let offset = evt.pageY - startPageY;
    if (offset > lineHeight && draggingIndex < list.length - 1) {
      // move down
      offset -= lineHeight;
      this.setState({
        list: move(list, draggingIndex, draggingIndex + 1),
        draggingIndex: draggingIndex + 1,
        startPageY: startPageY + lineHeight,
      });
    } else if (offset < -lineHeight && draggingIndex > 0) {
      // move up
      offset += lineHeight;
      this.setState({
        list: move(list, draggingIndex, draggingIndex - 1),
        draggingIndex: draggingIndex - 1,
        startPageY: startPageY - lineHeight,
      });
    }
    this.setState({ offsetPageY: offset });
  };

  handleMouseUp = () => {
    this.setState({ dragging: false, startPageY: 0, draggingIndex: -1 });
  };

  handleMounseDown = (evt, index) => {
    this.setState({
      dragging: true,
      startPageY: evt.pageY,
      draggingIndex: index,
    });
  };

  render() {
    const { dragging, list } = this.state;
    return (
      <div className="test">
        {_.map(list, (l, i) => (
          <div
            key={l}
            className="item"
            onMouseDown={(evt) => this.handleMounseDown(evt, i)}
            style={this.getDraggingStyle(i)}
          >
            {l}
          </div>
        ))}

        {
          dragging && (
            <div
              className="dnd-sample-mask"
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
