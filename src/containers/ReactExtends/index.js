import React from 'react';
import Parent from './Parent';
import './style.css';

class App extends Parent {
  render() {
    return (
      <div id="parent">
        <div className="description">
          <h2>继承父层组件</h2>
        </div>

        <div className="container">

          <button type="button" onClick={this.click}>button</button>

        </div>
      </div>
    );
  }
}

export default App;
