// CRUD FUNCTIONS GO HERE
import api from './api';
import bookmarkList from './bookmarkList';

const store = {
    bookmarks: [
      // {
      //   id: 'x56w',
      //   title: 'Title 1',
      //   rating: 3,
      //   url: 'http://www.title1.com',
      //   description: 'lorem ipsum dolor sit',
      //   expanded: false
      // },
      // {
      //   id: '6ffw',
      //   title: 'Title 2',
      //   rating: 5,
      //   url: 'http://www.title2.com',
      //   description: 'dolorum tempore deserunt',
      //   expanded: false
      // } 
    ],
    adding: false,
    error: null,
    filter: 0
  };

  //populate the bookmarks array based on the data from the api
const updateLocalBookmarks = () => {
  api.getBookmarks()
  .then(res => res.json())
  .then(jsonResp => {
      jsonResp.forEach(bookmark => {
          //locally add an expanded property to the bookmark object
          Object.assign(bookmark, {expanded: false} )
          //add the updated bookmark object to the local bookmark array
          store.bookmarks.push(bookmark);
      })
  })
  .then( () => {
    bookmarkList.render()
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



const addBookmark = () => {

  }

  const handleAddingNewBookmark = () => {

  }

  const handleError = () => {

  }

  const handleFilterBookmarks = () => {

  }

  export default {
    store,
    updateLocalBookmarks,
    findById,
    toggleExpandedView
  }