import React from 'react';
import './style.css';

class App extends React.Component {
  state = {
    allowFixed: false,
    originTop: 0,
  };

  componentDidMount() {
    const fixedDom = document.getElementById('fixed');
    const originTop = fixedDom.getBoundingClientRect().top;

    this.setState({ originTop });

    window.addEventListener('scroll', () => {
      const { allowFixed } = this.state;
      if (allowFixed) {
        this.setState({ originTop: fixedDom.getBoundingClientRect().top });
      }
    });
  }

  click = () => {
    this.setState({ allowFixed: true });
  }

  render() {
    const { allowFixed, originTop } = this.state;

    let divStyle = {};
    if (allowFixed) { divStyle = { position: 'fixed', top: `${originTop}px` }; }

    return (
      <div id="affix">
        <div className="description">
          <h2>固钉</h2>
        </div>

        <div className="container">

          <div style={divStyle} id="fixed">
            <button type="button" onClick={this.click}>Fix button</button>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
