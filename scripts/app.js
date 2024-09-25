import RecipeCardFactory from './recipeCardFactory.js';
import { searchRecipes } from './searchUtils.js';
import { updateAdvancedFilters, updateFilterOptions, filterRecipesByTags } from './filterUtils.js';
import { addTag, removeTag, removeOptionFromDropdown, addOptionToDropdown } from './tagUtils.js';
import { updateUI, displayNoResultsMessage, updateRecipeCount } from './uiUtils.js';
import { filterDropdownOptions } from './dropdownUtils.js';
import { recipes } from '../data/recipes.js';

// Event listener for when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const recipesContainer = document.querySelector('.recipes-container');
    const tagContainerUnified = document.querySelector('.tag-container-unified');
    const searchBar = document.querySelector('.search-bar');
    const errorContainer = document.createElement('div');
    errorContainer.classList.add('no-results-message');
    recipesContainer.parentElement.appendChild(errorContainer);

    const ingredientSearchInput = document.querySelector('.ingredient-search-input');
    const applianceSearchInput = document.querySelector('.appliance-search-input');
    const utensilSearchInput = document.querySelector('.utensil-search-input');
    const recipesCount = document.querySelector('.recipe-count-number');

    // Create instance of RecipeCardFactory for rendering recipes
    const recipeCardFactory = new RecipeCardFactory();
    let selectedTags = [];
    let filteredRecipes = [...recipes];
    updateRecipeCount(filteredRecipes.length, recipesCount);

     // Ensure the tag container exists
    if (!tagContainerUnified) {
        console.error('Tag container not found! Please ensure it exists in the DOM.');
        return;
    }

    // Function to update filters and refresh the displayed recipes
    function updateFilters() {
        filteredRecipes = filterRecipesByTags(recipes, selectedTags);
        updateUI(filteredRecipes, recipesContainer, recipeCardFactory);
        updateAdvancedFilters(filteredRecipes, selectedTags, handleAddTag);
        updateRecipeCount(filteredRecipes.length, recipesCount);
    }

    // Add tag and update filters when a new tag is selected
    function handleAddTag(tagText, selector) {
        if (addTag(tagText, selector, selectedTags, tagContainerUnified, handleRemoveTag, updateFilters)) {
            // Immediately update the dropdowns after adding a tag
            updateAdvancedFilters(filteredRecipes, selectedTags, handleAddTag);
        }
    }

    // Remove tag and update filters when a tag is deselected
    function handleRemoveTag(tagText, tagElement, selector) {
        selectedTags = removeTag(tagText, tagElement, selector, selectedTags, tagContainerUnified,
            (text, sel) => addOptionToDropdown(text, sel, handleAddTag), updateFilters);
        // Immediately update the dropdowns after removing a tag
        updateAdvancedFilters(filteredRecipes, selectedTags, handleAddTag);
    }

    // Listen for input in the search bar and filter recipes based on the search query
    searchBar.addEventListener('input', (event) => {
        const query = event.target.value;
        filteredRecipes = searchRecipes(query, recipes);


        // If no recipes match the query, display an error message
        if (filteredRecipes.length === 0 && query.length >= 3) {
            displayNoResultsMessage(query, errorContainer);
        } else {
            errorContainer.innerHTML = ''; // Clear error message if there are results
        }

        updateUI(filteredRecipes, recipesContainer, recipeCardFactory); // Update UI with filtered recipes
        updateAdvancedFilters(filteredRecipes, selectedTags, handleAddTag); // Update dropdown options
        updateRecipeCount(filteredRecipes.length, recipesCount); // Update recipe count
    });

    // Listen for input in the ingredient search field and filter dropdown options
    ingredientSearchInput.addEventListener('input', () => {
        filterDropdownOptions(ingredientSearchInput, '.ingredient-options',
            Array.from(filteredRecipes.flatMap(r => r.ingredients.map(ing => ing.ingredient))),
            (selector, items) => updateFilterOptions(selector, items, selectedTags, handleAddTag));
    });

    // Listen for input in the appliance search field and filter dropdown options
    applianceSearchInput.addEventListener('input', () => {
        filterDropdownOptions(applianceSearchInput, '.appliance-options',
            Array.from(filteredRecipes.map(r => r.appliance)),
            (selector, items) => updateFilterOptions(selector, items, selectedTags, handleAddTag));
    });

    // Listen for input in the utensil search field and filter dropdown options
    utensilSearchInput.addEventListener('input', () => {
        filterDropdownOptions(utensilSearchInput, '.utensil-options',
            Array.from(filteredRecipes.flatMap(r => r.ustensils)),
            (selector, items) => updateFilterOptions(selector, items, selectedTags, handleAddTag));
    });

    // Initialize UI with all recipes on page load
    updateUI(recipes, recipesContainer, recipeCardFactory);
    updateAdvancedFilters(recipes, selectedTags, handleAddTag);
});