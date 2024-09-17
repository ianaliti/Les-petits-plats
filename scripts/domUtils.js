import { addTag , getSelectedTags} from "./tagManagement.js";
import RecipeCardFactory from "./recipeCardFactory.js";

// Initialize RecipeCardFactory instance globally
const recipeCardFactory = new RecipeCardFactory();

/**
 * Update the UI by creating and displaying recipe cards
 * @param {Array} recipesToShow - Array of recipes to display
 */

export function updateUI(recipesToShow) {
    const recipesContainer = document.querySelector('.recipes-container');
    recipesContainer.innerHTML = ''; // Clear container before adding new recipes

    // Loop through recipes and create recipe cards
    recipesToShow.forEach(recipe => {
        const recipeCard = recipeCardFactory.createRecipeCard(recipe);
        recipesContainer.appendChild(recipeCard); // Add recipe card to the container
    });
}

/**
 * Display a message when no recipes match the search query
 * @param {string} query - The search query
 */
export function displayNoResultsMessage(query) {
    const errorContainer = document.querySelector('.no-results-message');
    errorContainer.innerHTML = `
        <p>Aucune recette ne contient '${query}'. Vous pouvez chercher des termes comme « tarte aux pommes », « poisson », etc.</p>
    `;
}

/**
 * Update the filter dropdowns based on the remaining filtered recipes
 * @param {Array} filteredRecipes - Array of filtered recipes
 */
export function updateAdvancedFilters(filteredRecipes) {
    const ingredients = new Set();
    const appliances = new Set();
    const utensils = new Set();

    // Extract relevant ingredients, appliances, and utensils from filtered recipes
    filteredRecipes.forEach(recipe => {
        recipe.ingredients.forEach(ing => ingredients.add(ing.ingredient));
        appliances.add(recipe.appliance);
        recipe.ustensils.forEach(ust => utensils.add(ust));
    });

    // Update dropdown options with available ingredients, appliances, and utensils
    updateFilterOptions('.ingredient-options', Array.from(ingredients));
    updateFilterOptions('.appliance-options', Array.from(appliances));
    updateFilterOptions('.utensil-options', Array.from(utensils));
}

/**
 * Update filter options for a specific dropdown
 * @param {string} selector - CSS selector for the dropdown
 * @param {Array} items - Array of items to populate the dropdown with
 */
export function updateFilterOptions(selector, items) {
    const dropdownContainer = document.querySelector(selector);
    dropdownContainer.innerHTML = ''; // Clear existing options

    const selectedTags = getSelectedTags()
 
    // Filter out selected tags and rebuild the dropdown
    const unselectedItems = items.filter(item => !selectedTags.includes(item));

    // Add each unselected item to the dropdown
    unselectedItems.forEach(item => {
        const option = document.createElement('li');
        option.textContent = item;
        option.classList.add('dropdown-item');
        option.addEventListener('click', () => addTag(item, selector));
        dropdownContainer.appendChild(option);
    });
}

/**
 * Remove an option from the dropdown after it has been selected as a tag
 * @param {string} tagText - The tag text to remove from the dropdown
 * @param {string} selector - CSS selector for the dropdown
 */
export function removeOptionFromDropdown(tagText, selector) {
    const dropdownContainer = document.querySelector(selector);
    const options = Array.from(dropdownContainer.children);

    // Find and remove the option from the dropdown
    const optionToRemove = options.find(option => option.textContent.trim() === tagText.trim());
    if (optionToRemove) {
        dropdownContainer.removeChild(optionToRemove);
    }
}

/**
 * Add an option back to the dropdown after the tag has been removed
 * @param {string} tagText - The tag text to add back to the dropdown
 * @param {string} selector - CSS selector for the dropdown
 */
export function addOptionToDropdown(tagText, selector) {
    const dropdownContainer = document.querySelector(selector);
    const option = document.createElement('li');
    option.textContent = tagText;
    option.classList.add('dropdown-item');
    option.addEventListener('click', () => addTag(tagText, selector));
    dropdownContainer.appendChild(option); // Add option back to the dropdown
}
