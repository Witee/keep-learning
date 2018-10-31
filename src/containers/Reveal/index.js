import React, { Component } from 'react';
import loadJS from 'load-js';
import './style.css';
// import Editor from '../HammerRichEditor/Editor';


class App extends Component {
  state = {
    slides: [<p>slide0</p>, <p>slide1</p>, <p>slide2</p>],
  }

  componentDidMount() {
    const link1 = document.createElement('link');
    link1.rel = 'stylesheet';
    link1.href = '/reveal/css/reveal.css';
    document.head.appendChild(link1);

    const link2 = document.createElement('link');
    link2.rel = 'stylesheet';
    link2.href = '/reveal/css/theme/white.css';
    document.head.appendChild(link2);

    const link3 = document.createElement('link');
    link3.rel = 'stylesheet';
    link3.href = '/reveal/css/print/pdf.css';
    document.head.appendChild(link3);

    loadJS([
      {
        async: true,
        url: '/ckeditor/ckeditor.js',
      },
      {
        async: true,
        url: '/headjs/head.min.js',
      },
      {
        async: true,
        url: '/reveal/js/reveal.js',
      },
    ]).then(() => {
      this.Reveal = _.get(window, 'Reveal', null);
      this.Reveal.initialize({
        controls: false,
        progress: false,
        keyboard: false,
        dependencies: [
          { src: '/reveal/lib/js/classList.js', condition: () => !document.body.classList },
          // { src: '/reveal/plugin/markdown/marked.js', condition: () => !!document.querySelector('[data-markdown]') },
          // { src: '/reveal/plugin/markdown/markdown.js', condition: () => !!document.querySelector('[data-markdown]') },
          // { src: '/reveal/plugin/highlight/highlight.js', async: true, callback: () => hljs.initHighlightingOnLoad() },
          // { src: '/reveal/plugin/zoom-js/zoom.js', async: true },
          // { src: '/reveal/plugin/notes/notes.js', async: true },
          // { src: '/reveal/plugin/math/math.js', async: true },
        ],
      });
      this.Reveal.addEventListener('slidechanged', (evt) => {
        console.log('evt: ', evt);
      });
    });
  }

  onClick = (index) => {
    console.log('index: ', index);
    this.Reveal.slide(index);
    console.log('slide: ', this.Reveal.getState());
  }

  render() {
    const { slides } = this.state;
    return (
      <div>
        {/* <div className="description">
          使用 Reveal 制作 PPT
        </div> */}

        <div className="reveal-work-area">
          <button type="button" onClick={() => this.onClick(0)}>切换-&gt;0</button>
          <button type="button" onClick={() => this.onClick(1)}>切换-&gt;1</button>
          <button type="button" onClick={() => this.onClick(2)}>切换-&gt;2</button>
          <div className="reveal">
            <div className="slides">
              {_.map(slides, (slide, index) => (
                <section key={index}>{slide}</section>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
