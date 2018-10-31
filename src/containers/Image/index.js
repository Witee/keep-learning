import React, { Component } from 'react';
import './style.css';

class App extends Component {
  state = {

  }

  render() {
    return (
      <div id="image-test">
        <div className="description">
          图片的显示
        </div>

        <div className="image-father">
          <img
            className="thumbnail-image"
            src="https://client.socialmaster.com.cn/access-files/2018-10-23/KGymjsoLDzGnebpKOJpr.png"
            alt="小图测试"
          />
        </div>

      </div>
    );
  }
}

export default App;
