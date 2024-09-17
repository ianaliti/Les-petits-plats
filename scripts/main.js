// Import required modules and scripts
import { recipes } from '../data/recipes.js'
import { updateUI, updateAdvancedFilters } from './domUtils.js';
import './searchBar.js';
import './filterTag.js';
import './tagManagement.js';
import './domUtils.js';
import './recipeCardFactory.js';

// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Initial UI update with all recipes
    updateUI(recipes);
    // Update the dropdown filters with all recipes
    updateAdvancedFilters(recipes);
});
