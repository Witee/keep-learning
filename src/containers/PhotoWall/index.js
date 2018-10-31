import React from 'react';
import './style.css';
import Photo from './Photo';

const App = () => (
  <div id="photo-wall">
    <div className="description">
          照片墙
    </div>

    <div className="container">
      <Photo
        imgSrc="https://client.socialmaster.com.cn/access-files/2018-10-22/Es9oeSiEs5w4rUJGrnzy.png"
        imgWidth="200px"
        description="上海鲜花港的郁金香，花名：Ballade Dream。"
        deg="7deg"
      />
      <Photo
        imgSrc="https://client.socialmaster.com.cn/access-files/2018-10-22/wIo47qkZB6O7rLpvIXf6.jpg"
        imgWidth="200px"
        description="2010年上海世博会，中国馆。"
        deg="-8deg"
      />
    </div>

  </div>
);

export default App;
