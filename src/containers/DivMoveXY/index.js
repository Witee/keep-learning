import React, { Component } from 'react';
import './style.css';

class App extends Component {
  state = {
    list: ['div1'],
    dragging: false,
    startPageX: 0,
    startPageY: 0,
    offsetPageX: 0,
    offsetPageY: 0,
    draggingIndex: -1,
  }

  getDraggingStyle(index) {
    const { offsetPageX, offsetPageY, draggingIndex } = this.state;
    if (index !== draggingIndex) return {};
    const style = {
      backgroundColor: '#eee',
      transform: `translate(${offsetPageX}px, ${offsetPageY}px)`,
      opacity: 0.5,
    };
    console.log('style: ', style);
    return style;
  }

  handleMounseDown = (evt, index) => {
    console.log('=================================');
    this.setState({
      dragging: true,
      startPageX: evt.pageX,
      startPageY: evt.pageY,
      draggingIndex: index,
    });
  };

  handleMouseMove = (evt) => {
    const { startPageX, startPageY, offsetPageX, offsetPageY } = this.state;
    console.log('evt.pageX - startPageX = : ', `${evt.pageX} - ${startPageX} = ${evt.pageX - startPageX}`);
    console.log('evt.pageY- startPageY = : ', `${evt.pageY} - ${startPageY} = ${evt.pageY - startPageY}`);
    const newOffsetPageX = offsetPageX + (evt.pageX - startPageX);
    const newOffsetPageY = offsetPageY + (evt.pageY - startPageY);

    this.setState({ offsetPageX: newOffsetPageX, offsetPageY: newOffsetPageY });
  };

  handleMouseUp = () => {
    this.setState({ dragging: false, startPageX: 0, startPageY: 0 });
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
              className="div-move-xy-mask"
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
