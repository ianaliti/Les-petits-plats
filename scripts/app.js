// app.js

import RecipeCardFactory from './RecipeCardFactory.js';
import { searchRecipes } from './searchUtils.js';
import { updateAdvancedFilters, updateFilterOptions, filterRecipesByTags } from './filterUtils.js';
import { addTag, removeTag, removeOptionFromDropdown, addOptionToDropdown } from './tagUtils.js';
import { updateUI, displayNoResultsMessage, updateRecipeCount } from './uiUtils.js';
import { filterDropdownOptions } from './dropdownUtils.js';
import { recipes } from '../data/recipes.js';

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
    let selectedTags = [];
    let filteredRecipes = [...recipes];
    updateRecipeCount(filteredRecipes.length, recipesCount);

    if (!tagContainerUnified) {
        console.error('Tag container not found! Please ensure it exists in the DOM.');
        return;
    }

    function updateFilters() {
        filteredRecipes = filterRecipesByTags(recipes, selectedTags);
        updateUI(filteredRecipes, recipesContainer, recipeCardFactory);
        updateAdvancedFilters(filteredRecipes, selectedTags, handleAddTag);
        updateRecipeCount(filteredRecipes.length, recipesCount);
    }

    function handleAddTag(tagText, selector) {
        if (addTag(tagText, selector, selectedTags, tagContainerUnified, handleRemoveTag, updateFilters)) {
            // Immediately update the dropdowns after adding a tag
            updateAdvancedFilters(filteredRecipes, selectedTags, handleAddTag);
        }
    }

    function handleRemoveTag(tagText, tagElement, selector) {
        selectedTags = removeTag(tagText, tagElement, selector, selectedTags, tagContainerUnified,
            (text, sel) => addOptionToDropdown(text, sel, handleAddTag), updateFilters);
        // Immediately update the dropdowns after removing a tag
        updateAdvancedFilters(filteredRecipes, selectedTags, handleAddTag);
    }

    searchBar.addEventListener('input', (event) => {
        const query = event.target.value;
        filteredRecipes = searchRecipes(query, recipes);

        if (filteredRecipes.length === 0 && query.length >= 3) {
            displayNoResultsMessage(query, errorContainer);
        } else {
            errorContainer.innerHTML = '';
        }

        updateUI(filteredRecipes, recipesContainer, recipeCardFactory);
        updateAdvancedFilters(filteredRecipes, selectedTags, handleAddTag);
        updateRecipeCount(filteredRecipes.length, recipesCount);
    });

    ingredientSearchInput.addEventListener('input', () => {
        filterDropdownOptions(ingredientSearchInput, '.ingredient-options',
            Array.from(filteredRecipes.flatMap(r => r.ingredients.map(ing => ing.ingredient))),
            (selector, items) => updateFilterOptions(selector, items, selectedTags, handleAddTag));
    });

    applianceSearchInput.addEventListener('input', () => {
        filterDropdownOptions(applianceSearchInput, '.appliance-options',
            Array.from(filteredRecipes.map(r => r.appliance)),
            (selector, items) => updateFilterOptions(selector, items, selectedTags, handleAddTag));
    });

    utensilSearchInput.addEventListener('input', () => {
        filterDropdownOptions(utensilSearchInput, '.utensil-options',
            Array.from(filteredRecipes.flatMap(r => r.ustensils)),
            (selector, items) => updateFilterOptions(selector, items, selectedTags, handleAddTag));
    });

    updateUI(recipes, recipesContainer, recipeCardFactory);
    updateAdvancedFilters(recipes, selectedTags, handleAddTag);
});