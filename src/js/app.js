// main app container

import $ from 'jquery';

import '../css/normalize.css';
import '../css/styles.css';

import api from './api';

const main = () => {
    api.getBookmarks().then(json => console.log('json: ', json));
    

        
    // console.log('create: ',api.createBookmark("test title", "http://www.google.com", "just some description", "5"));
    

}

$(main);