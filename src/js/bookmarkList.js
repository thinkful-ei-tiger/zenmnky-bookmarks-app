// rendering functions go in here
// templates and the such

import $ from 'jquery';

const render = () => {
    let pageHTML = ``;
    let sectionsToRender = [
        generateTitleSection,
        generateAddAndFilterSection,
        generateBookmarkContentArea
    ];

    sectionsToRender.forEach(sectionGenerator => pageHTML += sectionGenerator())
    $('body').html(pageHTML)
}

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

    for(let i=0; i < 3; i++){
        sectionTemplate += generateBookmarkElement();
    }

    sectionTemplate += `</section>`;

    return sectionTemplate;
}

const generateBookmarkElement = () => {
    const bookmarkItemTemplate = `
    <div class="bookmarkItem">
        <div class="bookmarkTitleArea">
            <h3>TITLE GOES HERE</h3>
        </div>
        <div class="bookmarkRatingArea">
            RATING ICONS GO HERE
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
        <div class="bookMarkDescriptionArea">
            <p>User's bookmark descriptoin. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac suscipit sapien. Fusce vel odio velit. Donec ut tincidunt nisi, sit amet luctus enim.</p>
        </div>
        <button id="viewSiteBtn">View Site</button>
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
                    <input type="text" name="bookmarkTitle" id="bookmarkTitle: placeholder="Title">
                    
                    <label for="bookmarkLink">Link:</label>
                    <input type="text" name="bookmarkLink" id="bookmarkLink: placeholder="http://www.YourLinkHere">

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
                </fieldset>
            </form>
        </section>
    `;
}

const generateErrorContainer = () => {
    let errorContainerTemplate = `
        <section id="errorContainer" class="error">
            <h3>Error</h3>
            <p>Error message</p>
        </section>
    `;
}

const handleEditBookmarkElement = () => {

}

export default {
    render
};