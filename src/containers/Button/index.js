import React from 'react';
import Btn from './Btn';
import './style.css';

const App = () => (
  <div id="button-test">
    <div className="description">
      <h2>Ant Design Button</h2>
      <ul>
        <li>按钮默认样式</li>
        <li>hover 效果</li>
        <li>active 效果</li>
        <li>释放鼠标后效果，使用伪类 :after 结合 animation</li>
      </ul>
    </div>

    <div className="container">
      <Btn>Default</Btn>
    </div>

  </div>
);

export default App;
