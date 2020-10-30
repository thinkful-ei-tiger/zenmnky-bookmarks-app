// main app container

import $ from 'jquery';

import '../css/normalize.css';
import '../css/styles.css';

import storeModule from './store';
import bookmarkFunctions from './bookmarkList';


const main = () => {  
 //get bookmarks from api and update local store
  storeModule.updateLocalBookmarks();
  
  bookmarkFunctions.render();
  bookmarkFunctions.bindEventHandlers();  
}

$(main);