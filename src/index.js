import React from 'react';
import ReactDOM from 'react-dom';
import LearnThemNames from './LearnThemNames';
import image from './asset/HRLA31.jpg';
import pokemon from './asset/pokemon.jpg';

ReactDOM.render(<LearnThemNames image={image} pokemon={pokemon} />, document.getElementById('root'));