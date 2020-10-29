//CRUD functions
// API Documentation: https://thinkful-list-api.herokuapp.com/endpoints/bookmarks
const BASE_URL = 'https://thinkful-list-api.herokuapp.com';
const username = 'zenmnky-bookmarks';
let url = `${BASE_URL}/${username}/bookmarks`;


const apiFetch = (...args) => {
    let error;
    return fetch(...args)
        .then(response => {
            if(!response.ok){
                // if the response is not 2xx, begin building an error object
                error = { code: response.status };

                if (!res.headers.get('content-type').includes('json')){
                    error.message = response.statusText;
                    return Promise.reject(error);
                }
            }
            //if response is ok, parse JSON
            return response.json();

        });
        .then(data => {
            if (error) {
                error.message = data.message;
                return Promise.reject(error);
            }

            return data;
        });
};


/**
 * createBookmark
 * Creates a new JSON object and POSTs it to the API
 * @param {string} newTitle - bookmark title
 * @param {string} newUrl - must begin with 'http' or 'https'
 * @param {string} newDesc - bookmark description
 * @param {string} newRating - should be a number, 1-5
 * 
 * @returns {promise}
 */
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


/**
 * getBookmarks
 * Performs a GET request to API
 * @returns {XMLDocument} Data from API
 */
const getBookmarks = () => {
    return fetch(url);
}

/**
 * updateBookmark
 * PATCH request to API to update a bookmark object
 * @param {number} id - id of bookmark object
 * @param {object} updateData - contains key-value pairs to update
 */
const updateBookmark = (id, updateData) => {
    let patchURL = `${url}/${id}`;

    return fetch(patchURL, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updateData)
    });
}

/**
 * deleteBookmark
 * DELETE request to API to delete a bookmark object
 * @param {number} id - id of bookmark object
 */
const deleteBookmark = (id) => {
    let deleteURL = `${url}/${id}`;
    
    return fetch(deleteURL, {
        method: 'DELETE'
    });
}

/*=============================================
=            export the goods            =
=============================================*/

export default {
    createBookmark,
    getBookmarks,
    updateBookmark,
    deleteBookmark    
};