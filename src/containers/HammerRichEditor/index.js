import React, { Component } from 'react';
import './style.css';
import Editor from './Editor';


class App extends Component {
  componentDidMount() {
    const script = document.createElement('script');
    /**
      注意: 这里的 ckeditor.js 是定制版本，文件保存在 public/ckeditor 中
    */
    script.src = '/ckeditor/ckeditor.js';
    script.async = true;
    document.body.appendChild(script);
  }

  render() {
    return (
      <div>
        <div className="description">
          使用 hammer-js 实现 div 移动，单击移动、双击编辑
        </div>

        <div className="hammer-js-work-area">
          <Editor id="a1">
            <p>双击以编辑</p>
          </Editor>
        </div>
      </div>
    );
  }
}

export default App;
