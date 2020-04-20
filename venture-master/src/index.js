import React from 'react';
import ReactDOM from 'react-dom';

/* ------- bootstrap files ------- */
import 'bootstrap/dist/css/bootstrap.css';
// eslint-disable-next-line no-unused-vars
import $ from 'jquery';
// eslint-disable-next-line no-unused-vars
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
/* ------- bootstrap files ------- */

import './global.css';
import App from './components/App';

const container = document.getElementById('app');
ReactDOM.render(<App />, container);
