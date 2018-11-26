import React from 'react';
import './style.css';

// eslint-disable-next-line
class Cat extends React.Component {
  render() {
    console.log('render Cat');
    // eslint-disable-next-line
    const { mouse } = this.props;
    return (
      // eslint-disable-next-line
      <img
        src="https://client.socialmaster.com.cn/access-files/2018-10-24/0JDe6nfpHfXVCL5vCv28.png"
        style={{ position: 'absolute', left: mouse.x, top: mouse.y }}
      />
    );
  }
}

// eslint-disable-next-line
class Mouse extends React.Component {
  state = {
    x: 0,
    y: 0,
  }

  handleMouseMove = (evt) => {
    this.setState({ x: evt.clientX, y: evt.clientY });
  }

  render() {
    console.log('render Mouse');
    const { x, y } = this.state;
    // eslint-disable-next-line
    const { render } = this.props;
    return (
      <div style={{ height: '100%', backgroundColor: '#eee' }} onMouseMove={this.handleMouseMove}>
        {render({ x, y })}
      </div>
    );
  }
}

// eslint-disable-next-line
class App extends React.Component {

  renderTheCat(mouse) {
    return (<Cat mouse={mouse} />);
  }

  render() {
    console.log('render App');
    return (
      <div id="render-props">
        <div className="description">
          <h2>Try to use render props</h2>
          <p>The new technique to render props.</p>
        </div>

        <div className="container">
          <h1>Move the mouse around!</h1>
          <Mouse render={this.renderTheCat} />
        </div>
      </div>
    );
  }
}


export default App;
