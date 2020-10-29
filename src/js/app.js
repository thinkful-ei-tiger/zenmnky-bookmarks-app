// main app container

import $ from 'jquery';

import '../css/normalize.css';
import '../css/styles.css';

import api from './api';
import storeModule from './store';
import bookmarkFunctions from './bookmarkList';


//populate the local store object based on data from the API
storeModule.updateLocalBookmarks();

const main = () => {  
 //get bookmarks from api and update local store
 
 storeModule.updateLocalBookmarks();  
 bookmarkFunctions.bindEventHandlers();  
}

$(main);