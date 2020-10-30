// CRUD FUNCTIONS GO HERE
import api from './api';
import bookmarkFunctions from './bookmarkList';

const store = {
    bookmarks: [],
    adding: false,
    error: null,
    filter: 0
  };

  //populate the bookmarks array based on the data from the api
const updateLocalBookmarks = () => {
  api.getBookmarks()
  .then(jsonResp => {
      jsonResp.forEach(bookmark => {
          addBookmark(bookmark)
      })
  })
  .then( () => {
    bookmarkFunctions.render();
  })
  .catch(error => console.error(error.message))
}

/**
 * findById
 * Within the local store object, find the matching bookmark by id
 * @param {string} id 
 */
const findById = (id) => {
  return store.bookmarks.find(currentItem => currentItem.id === id);
};  

/**
 * toggleExpandedView
 * toggles the expanded boolean property of the given local bookmark object
 * @param {object} bookmarkObj 
 */
const toggleExpandedView = (bookmarkObj) => {
  bookmarkObj.expanded = !bookmarkObj.expanded;
};



const addBookmark = (newBookmark) => {
  let newItem = newBookmark;
  //locally add an expanded property to the bookmark object
  Object.assign(newItem, {expanded: false} )
  //add the updated bookmark object to the local bookmark array
  store.bookmarks.push(newItem);
}

const findAndDeleteBookmark = (id) => {
  store.bookmarks = store.bookmarks.filter(currentItem => currentItem.id !== id);
}

/*=============================================
=            export the goods            =
=============================================*/

export default {
  store,
  updateLocalBookmarks,
  findById,
  toggleExpandedView,
  addBookmark,
  findAndDeleteBookmark

}