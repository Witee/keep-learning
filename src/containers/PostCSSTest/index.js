import React from 'react';
import './style.css';
import Btn from '../Button/Btn';

class App extends React.Component {
  state = {
    color: 'black',
  }

  colorClick = (color) => {
    this.setState({ color });
  }

  render() {
    const { color } = this.state;
    return (
      <div id="postcss-test" data-theme={color}>
        <div className="description">
          <h2>Use PreCSS in the PostCSS platform instead of SASS</h2>
          <p>PostCSS is a platform, if want to support variables in CSS you need to use the PreCSS plugin.</p>
        </div>

        <div className="container">
          <label>
            theme selector:
          </label>
          <Btn onClick={() => this.colorClick('black')}>black</Btn>
          <Btn onClick={() => this.colorClick('white')}>white</Btn>
        </div>

      </div>
    );
  }
}

export default App;
