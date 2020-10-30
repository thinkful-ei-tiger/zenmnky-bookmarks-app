Okay, so i have it setup to dynamically generate the initial view

still need to:
    
    handle views
    - handle the new bookmark button
        - include the create form in UI
    
    update state
    - new bookmark form adds a new object to API's state

Next:
    - focus on creating the 'create new' view
        - event handler for the button
        - rendering logic
        - api post functioning
    
Then:
    - api get functioning


Creating Template Rendering Functions
    - create new bookmark object
    - post to API
    - populate local store based on API GET
    - Render page based on local store

Then Focus in on the Create-View functionality
    - This will begin working with the api to update the local store-state
    - DOM rendering is to be based on the state of the local store
        - local store is based on the API psuedo-DB



=====
okay, so now i'm focusing on the Expanded View.✔️
- so when i get a bookmark from the api, i'll want to add a new property to it: `expanded: false`. ✔️
- then, when that element is clicked on, i'll want to find that element in the store's bookmark array ✔️ 
- and toggle its `expanded` property ✔️
- then render the page again ✔️

=====
👉 Next: focus on ability to delete bookmarks:
- add delete button ( )
- add delete button ( × ) to bookmark items
- handle delete
    - remove from api
    - render

🔺 New Plan 🔺
- I've created a bit of a mess by having the app render based on each api call. Looking at the shopping list app, it's better to do the initial GET call to the api when the page loads, then call render. Each time an item is added or deleted, that item will be added/delted to/from the api and to the store.

- so, i'm intending to go back through and model my app off the shopping list api app. jeeze....