// Import functions for updating the DOM and managing tags
import { updateUI, displayNoResultsMessage, updateAdvancedFilters } from './domUtils.js';
import { getSelectedTags } from './tagManagement.js';
import { recipes } from '../data/recipes.js';


const recipesCount = document.querySelector('.recipe-count-number');
const recipesContainer = document.querySelector('.recipes-container');
const errorContainer = document.createElement('div');
errorContainer.classList.add('no-results-message');
recipesContainer.parentElement.appendChild(errorContainer); 

let filteredRecipes = [...recipes]; 

/**
 * Search for recipes based on a query and update the UI with the results
 * @param {string} query - The search query entered by the user
 */
export function searchRecipes(query) {
    if (query.length >= 3) {
        // Filter recipes based on the search query
        filteredRecipes = recipes.filter(recipe => {
            const matchTitle = recipe.name.toLowerCase().includes(query.toLowerCase());
            const matchDescription = recipe.description.toLowerCase().includes(query.toLowerCase());
            const matchIngredients = recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(query.toLowerCase()));
            return matchTitle || matchDescription || matchIngredients;
        });

        // If no recipes found, show no results message
        if (filteredRecipes.length === 0) {
            displayNoResultsMessage(query);
        } else {
            errorContainer.innerHTML = ''; // Clear error message if results found
        }
    } else {
        // If query is less than 3 characters, show all recipes
        filteredRecipes = [...recipes];
        errorContainer.innerHTML = ''; // Clear error message
    }
    // Update the UI with filtered recipes and update advanced filters
    updateUI(filteredRecipes);
    updateAdvancedFilters(filteredRecipes);
    // Update the recipe count in the UI
    recipesCount.textContent = `${filteredRecipes.length} recettes`;
}

/**
 * Filter the recipes based on selected tags and update the UI
 */
export function filterRecipesByTags() {
    const selectedTags = getSelectedTags(); // Get currently selected tags

    // Filter recipes based on whether they match all selected tags
    filteredRecipes = recipes.filter(recipe => {
        return selectedTags.every(tag => {
            const matchIngredient = recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag.toLowerCase()));
            const matchAppliance = recipe.appliance.toLowerCase().includes(tag.toLowerCase());
            const matchUtensil = recipe.ustensils.some(utensil => utensil.toLowerCase().includes(tag.toLowerCase()));
            return matchIngredient || matchAppliance || matchUtensil;
        });
    });

    // Update dropdowns with only relevant options based on filtered recipes
    updateAdvancedFilters(filteredRecipes);

    // Update the recipe count and the UI with filtered recipes
    recipesCount.textContent = `${filteredRecipes.length} recettes`;
    updateUI(filteredRecipes);
}
