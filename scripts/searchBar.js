import { searchRecipes } from './filterTag.js';

// DOM element for the search bar
const searchBar = document.querySelector('.search-bar');

// Event listener for input in the search bar to trigger recipe search
searchBar.addEventListener('input', (event) => {
    const query = event.target.value; // Get search query from input field
    searchRecipes(query); // Call the search function with the user's query
});
