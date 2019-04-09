import React from 'react';
import ReactDOM from 'react-dom';
import LearnThemNames from './LearnThemNames';
import image1 from './asset/HRLA29-1.jpg';
import image2 from './asset/HRLA29-2.jpg';
import dog from './asset/Nightwing.png';

ReactDOM.render(<LearnThemNames image1={image1} image2={image2} dog={dog} />, document.getElementById('root'));