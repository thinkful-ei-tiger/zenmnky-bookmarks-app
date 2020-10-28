// main app container

import $ from 'jquery';

import '../css/normalize.css';
import '../css/styles.css';

import api from './api';
import bookmarkFunctions from './bookmarkList';


const main = () => {
  bookmarkFunctions.render();
    

}

$(main);