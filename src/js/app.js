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
 storeModule.updateLocalBookmarks();  
 bookmarkFunctions.bindEventHandlers();  
}

$(main);