import React from 'react';
import './style.css';

class App extends React.Component {
  state = { isFocused: false, isDragging: false }

  click = () => {
    this.setState({ isFocused: true });
  }

  render() {
    const { isFocused, isDragging } = this.state;
    return (
      <div id="anchor">
        <div className="description">
          <h2>Anchor 文档框上下左右添加可调整宽高的锚点</h2>
        </div>

        <div className="container">

          <div className="test-content">
            <h5>测试内容</h5>
            <div className="test-transformer">
              <div className="test-anchor" data-direction="left" />
            </div>

          </div>

          <div className="content" onClick={this.click}>
            <article>
              <h3>测试文本</h3>
            </article>

            {isFocused && (
              <div className="transformer">
                <div className="anchor" data-direction="top" />
                <div className="anchor" data-direction="bottom" />
                <div className="anchor" data-direction="left" />
                <div className="anchor" data-direction="right" />
              </div>
            )}
          </div>
          {isDragging && (
            <div className="content-mask" />
          )}
        </div>
      </div>
    );
  }
}

export default App;
