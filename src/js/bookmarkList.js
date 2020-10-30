import $ from 'jquery';
import storeModule from './store';
import api from './api';
import store from './store';
import templates from './templates';


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
        // 🚧 ERROR VIEW 🚧
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
        templates.generateTitleSection,
        templates.generateAddAndFilterSection,
        templates.generateBookmarkContentArea
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
        templates.generateTitleSection,
        templates.generateAddBookmarkSection,
        templates.generateBookmarkContentArea
    ];

    return sectionsToRender;
};


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
    handleFilterByChange();
}

const handleFilterByChange = () => {
    $('body').on('change', '#filterByRating', () => {
        //grab the value of filterByRating
        let newFilterVal =  $('#filterByRating').val();
        //update the filter value in the store
        storeModule.store.filter = newFilterVal;
        //render
        render();
    })
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
            .then((newItem) => {
                storeModule.addBookmark(newItem);
                render();
            })
            .catch((error) => {
                // 🚧 Under Construction 🚧
                //store error message 
                //render error
            })
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
};

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

        if( $(event.target).is('button') ) {
            api.deleteBookmark(id)
                .then( () => {
                    storeModule.findAndDeleteBookmark(id);
                    render();
                })
                .then( () => render() )
                .catch((error) => {
                    // 🚧 Under Construction 🚧
                    //store error message 
                    //render error
                })
            
            console.log('delete button clicked')
        } else {   
            //toggle the 'expanded' property
            storeModule.toggleExpandedView(bookmark);
            render()
        }
    })
};

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



/*=============================================
=            export the goods            =
=============================================*/

export default {
    render,
    bindEventHandlers
};