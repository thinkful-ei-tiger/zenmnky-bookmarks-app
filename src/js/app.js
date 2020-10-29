// main app container

import $ from 'jquery';

import '../css/normalize.css';
import '../css/styles.css';

import api from './api';
import bookmarkFunctions from './bookmarkList';


const main = () => {
  bookmarkFunctions.render();
  bookmarkFunctions.bindEventHandlers();
  
  api.getBookmarks()
    .then(res => res.json())
    .then(jsonResp => console.log(jsonResp))
    .catch(error => console.log(error))
  
}

$(main);