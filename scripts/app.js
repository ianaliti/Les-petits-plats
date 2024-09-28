import RecipeCardFactory from './recipeCardFactory.js';
import { searchRecipes } from './searchUtils.js';
import { updateAdvancedFilters, updateFilterOptions, filterRecipesByTags } from './filterUtils.js';
import { addTag, removeTag, removeOptionFromDropdown, addOptionToDropdown } from './tagUtils.js';
import { updateUI, displayNoResultsMessage, updateRecipeCount } from './uiUtils.js';
import { filterDropdownOptions } from './dropdownUtils.js';
import { recipes } from '../data/recipes.js';

let currentSearchQuery = '';  // To keep track of the current search query
let selectedTags = [];  // To keep track of selected tags
let filteredRecipes = [...recipes];  // Initially, all recipes are shown

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

    const recipeCardFactory = new RecipeCardFactory();
    updateRecipeCount(filteredRecipes.length, recipesCount);

    if (!tagContainerUnified) {
        console.error('Tag container not found! Please ensure it exists in the DOM.');
        return;
    }

    // Function to update filters and refresh the displayed recipes
    function updateFilters() {
        // First, filter recipes by tags
        let filteredByTags = filterRecipesByTags(recipes, selectedTags);

        // Then, filter recipes by the current search query
        filteredRecipes = searchRecipes(currentSearchQuery.trim(), filteredByTags);

        // If no recipes match both the tags and the search query, show an error message
        if (filteredRecipes.length === 0) {
            displayNoResultsMessage(currentSearchQuery, errorContainer)
        } else {
            errorContainer.innerHTML = ''
        }
        
        // Update the UI with the filtered recipes
        updateUI(filteredRecipes, recipesContainer, recipeCardFactory);

        // Update the dropdowns with available options based on the filtered recipes
        updateAdvancedFilters(filteredRecipes, selectedTags, handleAddTag);

        // Update the recipe count
        updateRecipeCount(filteredRecipes.length, recipesCount);
    }

    // Add tag and update filters when a new tag is selected
    function handleAddTag(tagText, selector) {
        if (addTag(tagText, selector, selectedTags, tagContainerUnified, handleRemoveTag, updateFilters)) {
            updateAdvancedFilters(filteredRecipes, selectedTags, handleAddTag);
        }
    }

    // Remove tag and update filters when a tag is deselected
    function handleRemoveTag(tagText, tagElement, selector) {
        selectedTags = removeTag(tagText, tagElement, selector, selectedTags, tagContainerUnified,
            (text, sel) => addOptionToDropdown(text, sel, handleAddTag), updateFilters);
        updateAdvancedFilters(filteredRecipes, selectedTags, handleAddTag);
        updateFilters();
    }

    // Listen for input in the search bar and filter recipes based on the search query
    searchBar.addEventListener('input', (event) => {
        currentSearchQuery = event.target.value.trim();  // Trim the input to ignore leading/trailing spaces

        // Only update filters if the query is not just spaces or empty
        if (currentSearchQuery.length === 0 || event.inputType === "insertText" && event.data === " ") {
            return; // Do nothing if the query is only spaces
        }

        updateFilters();  // Reapply both the search and tag filtering
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
