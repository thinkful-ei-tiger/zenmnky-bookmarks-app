//CRUD functions
// API Documentation: https://thinkful-list-api.herokuapp.com/endpoints/bookmarks
const BASE_URL = 'https://thinkful-list-api.herokuapp.com';
const username = 'zenmnky-bookmarks';
let url = `${BASE_URL}/${username}/bookmarks`;

const createBookmark = (newTitle, newUrl, newDesc, newRating) => {
    let newItem = JSON.stringify({
        title: newTitle,
        url: newUrl,
        desc: newDesc,
        rating: newRating
    })

    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: newItem
    })
}

const getBookmarks = () => {
    return fetch(url);        
}

const updateBookmark = (id, updateData) => {
    let patchURL = `${url}/${id}`;

    return fetch(patchURL, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updateData)
    });
}

const deleteBookmark = (id) => {
    let deleteURL = `${url}/${id}`;
    
    return fetch(deleteURL, {
        method: 'DELETE'
    });
}

export default {
    createBookmark,
    getBookmarks,
    updateBookmark,
    deleteBookmark    
};