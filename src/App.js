import React from 'react';
import './App.css';
import Hello from './containers/Hello';
import DndSample from './containers/DndSample';
import DivMoveX from './containers/DivMoveX';
import DivMoveXY from './containers/DivMoveXY';
import DivMoveY from './containers/DivMoveY';
import RichTextEditor from './containers/RichTextEditor';
import DraggableEcharts from './containers/DraggableEcharts';
import Reveal from './containers/Reveal';
import Hammer from './containers/Hammer';
import HammerRichEditor from './containers/HammerRichEditor';
import Image from './containers/Image';
import PhotoWall from './containers/PhotoWall';
import PostCSSTest from './containers/PostCSSTest';
import Button from './containers/Button';
import RenderProps from './containers/RenderProps';
import Anchor from './containers/Anchor';
import Affix from './containers/Affix';
import ReactExtends from './containers/ReactExtends';
import Layout from './containers/Layout';

const routeMap = {
  DndSample,
  DivMoveX,
  DivMoveXY,
  DivMoveY,
  RichTextEditor,
  DraggableEcharts,
  Reveal,
  Hammer,
  HammerRichEditor,
  Image,
  PhotoWall,
  PostCSSTest,
  Button,
  RenderProps,
  Anchor,
  Affix,
  ReactExtends,
  Layout,
};

class App extends React.PureComponent {
  handleLinkClick = key => {
    window.history.pushState(null, '', `/#/${key}`);
    this.forceUpdate();
  };

  render() {
    const currentPage = document.location.hash.replace(/#\/?/, '');

    const CurrentPage = routeMap[currentPage] || Hello;

    return (
      <div className="root-container">
        <ul className="menu-list">
          {Object.keys(routeMap).map(key => (
            <li
              key={key}
              className={key === currentPage ? 'is-active' : ''}
              style={{ listStyle: 'none' }}
            >
              <span className="link" onClick={() => this.handleLinkClick(key)}>
                {key}
              </span>
            </li>
          ))}
        </ul>
        <div className="content">
          <CurrentPage />
        </div>
      </div>
    );
  }
}

export default App;
