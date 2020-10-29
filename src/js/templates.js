import storeModule from './store';

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
            <button id="deleteBookmark">× Delete</button>
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


const generateAddBookmarkSection = () => {
    const addBookmarkTemplate = `
        <section class="addBookmarkView">
            <form action="#" id="createNewForm" class="createNew">
                <fieldset>
                    <legend>Create New Bookmark: </legend>
                    
                    <div class='form-item'>
                        <label for="bookmarkTitle">Title:</label>
                        <input type="text" name="bookmarkTitle" id="bookmarkTitle" placeholder="Title">
                    </div>

                    <div class='form-item'>
                        <label for="bookmarkLink">Link:</label>
                        <input type="text" name="bookmarkLink" id="bookmarkLink" placeholder="http://www.YourLinkHere">
                    </div>

                    <div class='form-item'>
                        <label for="bookmarkDescription">Description</label>
                        <textarea name="bookmarkDescription" id="bookmarkDescription" placeholder="Enter a helpful description for your link" ></textarea>
                    </div>

                    <div class='form-item'>
                        <select name="selectRating" id="selectRating">
                            <option selected disabled>Select Rating</option>
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Stars</option>
                        </select>
                    </div>

                    <button class='form-item' type="submit" id="submitNewBookmark">Add</button>
                    <button class='form-item' type="reset" id="clearSubmitNew">Clear</button>
                    <button class='form-item' id="cancelSubmitNew">Cancel</button>
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

export default {
    generateTitleSection,   
    generateAddAndFilterSection,
    generateBookmarkContentArea,
    generateAddBookmarkSection,
    generateErrorContainer
}