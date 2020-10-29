// rendering functions go in here
// templates and the such

import $ from 'jquery';
import storeModule from './store';
import api from './api';
import store from './store';


const handleEditBookmarkElement = () => {

}

/*=============================================
=            VIEW RENDERING            =
=============================================*/
/**
 * master rendering function.
 * handles the logic to determine what is rendered to the DOM
 */
const render = () => {
        
    if (storeModule.store.error){
        console.log('error fired')
        //render error view
    } else if (storeModule.store.adding) {
        //render create-new view
        handleRenderView(renderCreateNewView);
    } else {
        //render initial view
        handleRenderView(renderInitialView);
    }
};


/*----------  Helper view rendering functions  ----------*/
/**
 * handleRenderView
 * handles rendering page views into the DOM
 * @param {function} viewToRender - function that returns an array of template generating functions
 */
const handleRenderView = (viewToRender) => {
    // clear HTML template variable
    let pageHTML = ``;

    //retreive the array of template functions from the provided function
    let sectionsToRender = viewToRender();
    
    //call each function and get it's template string and add to the HTML template
    sectionsToRender.forEach(sectionGenerator => pageHTML += sectionGenerator());

    //inject into the DOM
    $('body').html(pageHTML)
};


/**
 * renderInitialView()
 * provides the template functions for the initial view
 * @returns {array}an array of section template generator functions
 */
const renderInitialView = () => {
    let sectionsToRender = [
        generateTitleSection,
        generateAddAndFilterSection,
        generateBookmarkContentArea
    ];

    return sectionsToRender;
};


/**
 * renderCreateNewView()
 * provides the template functions for the create-new view
 * @returns {array} - an array of section template generator functions
 */
const renderCreateNewView = () => {
    let sectionsToRender = [
        generateTitleSection,
        generateAddBookmarkSection,
        generateBookmarkContentArea
    ];

    return sectionsToRender;
};



/*=============================================
=            TEMPLATE GENERATORS            =
=============================================*/
const generateTitleSection = () => {
    let titleTemplate = `
    <div id="title" class="title">
        <h1>Bookmark App</h1>
    </div>
    `;

    return titleTemplate;
}

const generateAddAndFilterSection = () => {
    let sectionTemplate = `
    <section id="addAndFilterContainer" class="addAndFilter">
        <button id="addBookmark">Add New</button>
        <select name="filterByRating" id="filterByRating">
            <option selected disabled>Filter by Rating</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Stars</option>
        </select>
    </section>
    `;

    return sectionTemplate;
}

const generateBookmarkContentArea = () => {
    let sectionTemplate = `<section id="contentArea" class="contentArea">`;

    //for each bookmark object in the store's bookmark array,
    //create a bookmark element
    storeModule.store.bookmarks.forEach(bookmark => {
        sectionTemplate += generateBookmarkElement(bookmark);
    });

    sectionTemplate += `</section>`;

    return sectionTemplate;
}

const generateBookmarkElement = (bookmarkObj) => {
    let bookmarkItemTemplate = `
    <div class="bookmarkItem js-bookmarkItem" data-item-id=${bookmarkObj.id}>
        <div class="bookmarkTitleArea">
            <h3>${bookmarkObj.title}</h3>
        </div>
    `;

    if(bookmarkObj.expanded){
        bookmarkItemTemplate += `
            <div class="bookMarkDescriptionArea">
                <p>${bookmarkObj.description}</p>
            </div>
            <a href=${bookmarkObj.url}><button id="viewSiteBtn">View Site</button></a>
        `;
    }
    

    bookmarkItemTemplate += `
        <div class="bookmarkRatingArea">
            <p>Rating: ${bookmarkObj.rating}</p>
        </div>
    </div>
    `;

    return bookmarkItemTemplate;
}

const generateExpandedBookmarkSection = () => {
    const expandedViewTemplate = `
    <div class="bookmarkItem expanded-view">
        <div class="bookmarkTitleArea">
            <h3>TITLE GOES HERE</h3>
        </div>

        <div class="bookmarkRatingArea">
            RATING ICONS GO HERE
        </div>
    </div>
    `;
}

const generateAddBookmarkSection = () => {
    const addBookmarkTemplate = `
        <section class="addBookmarkView">
            <form action="#" id="createNewForm" class="createNew">
                <fieldset>
                    <legend>Create New Bookmark: </legend>
                    
                    <label for="bookmarkTitle">Title:</label>
                    <input type="text" name="bookmarkTitle" id="bookmarkTitle" placeholder="Title">
                    
                    <label for="bookmarkLink">Link:</label>
                    <input type="text" name="bookmarkLink" id="bookmarkLink" placeholder="http://www.YourLinkHere">

                    <label for="bookmarkDescription">Description</label>
                    <textarea name="bookmarkDescription" id="bookmarkDescription" placeholder="Enter a helpful description for your link" ></textarea>

                    <select name="selectRating" id="selectRating">
                        <option selected disabled>Select Rating</option>
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Stars</option>
                    </select>

                    <button type="submit" id="submitNewBookmark">Add</button>
                    <button type="reset" id="clearSubmitNew">Clear</button>
                    <button id="cancelSubmitNew">Cancel</button>
                </fieldset>
            </form>
        </section>
    `;

    return addBookmarkTemplate;
}

const generateErrorContainer = () => {
    let errorContainerTemplate = `
        <section id="errorContainer" class="error">
            <h3>Error</h3>
            <p>Error message</p>
        </section>
    `;

    return errorContainerTemplate;
}




/*=============================================
=            EVENT HANDLERS            =
=============================================*/

/**
 * bindEventHandlers()
 * All the event handlers bound in one function
 */
const bindEventHandlers = () => {
    handleAddNewBookmark();
    handleSubmitNewBookmark();
    handleCancelNewBookmark();
    handleClickedBookmark();
}

/**
 * handleAddNewBookmark()
 * event handler. 
 * updates the state of the store to indicate an adding state, then calls the render functions
 */
const handleAddNewBookmark = () => {
    $('body').on('click', 'button#addBookmark', () => {
        storeModule.store.adding = true;
        render();
    })
}

/**
 * handleSubmitNewBookmark()
 * event handler. 
 * adds new bookmark to api, updates state of store, renders page
 * 
 */
const handleSubmitNewBookmark = () => {
    $('body').on('click', 'button#submitNewBookmark', (event) => {
        event.preventDefault();

        // reset store adding state back to default
        storeModule.store.adding = false;

        //grab the data from the fields, stringify it, and send it to the API
        let newTitle = $('input[type=text]#bookmarkTitle').val();
        let newUrl = $('input[type=text]#bookmarkLink').val();
        let newDesc = $('#bookmarkDescription').val();
        let newRating = $('#selectRating').val();

    
        api.createBookmark(newTitle, newUrl, newDesc, newRating)
            // call the get bookmark functions, which will render the page    
            .then(() => api.getBookmarks());
    })
};

/**
 * handleCancelNewBookmark()
 * event handler
 * updates the state of the store to indicate adding is false, then calls the render functions
 */
const handleCancelNewBookmark = () => {
    $('body').on('click', 'button#cancelSubmitNew', (event) => {
        event.preventDefault();
        // reset store adding state back to default
        storeModule.store.adding = false;
        render();
    })
}

/**
 * handleClickedBookmark
 * When a bookmark element is clicked, toggle the expanded key-value property
 */
const handleClickedBookmark = () => {
    $('body').on('click', '.js-bookmarkItem', (event) => {
        //get the bookmark's id
        let id = getItemIdFromElement(event.currentTarget);
        //find the bookmark object in the store's bookmark array
        let bookmark = storeModule.findById(id);
        //toggle the 'expanded' property
        storeModule.toggleExpandedView(bookmark);
        //render
        render();  
    })
}

/**
 * getItemIdFromElement
 * Retreivies the item-id stored in the custom data attribute of a bookmark element
 * @param {element} item - DOM Element
 * @returns {string} - id stored in data-item-id
 */
const getItemIdFromElement = (item) => {
    return $(item)
      .closest('.js-bookmarkItem')
      .data('item-id');
  };

export default {
    render,
    bindEventHandlers
};