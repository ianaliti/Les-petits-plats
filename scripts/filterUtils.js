// Function to update filters based on selected tags and available recipes
export function updateAdvancedFilters(filteredRecipes, selectedTags, addTagCallback) {
    const ingredients = new Set(); // Set to store unique ingredients
    const appliances = new Set(); // Set to store unique appliances
    const utensils = new Set(); // Set to store unique utensils

    // Loop through each recipe and extract its ingredients, appliances, and utensils
    filteredRecipes.forEach(recipe => {
        recipe.ingredients.forEach(ing => ingredients.add(ing.ingredient));
        appliances.add(recipe.appliance);
        recipe.ustensils.forEach(ust => utensils.add(ust));
    });

    // Update the dropdown options with the available and unselected filter items
    updateFilterOptions('.ingredient-options', Array.from(ingredients), selectedTags, addTagCallback);
    updateFilterOptions('.appliance-options', Array.from(appliances), selectedTags, addTagCallback);
    updateFilterOptions('.utensil-options', Array.from(utensils), selectedTags, addTagCallback);
}

// Function to populate dropdowns with available filter options
export function updateFilterOptions(selector, items, selectedTags, addTagCallback) {
    const dropdownContainer = document.querySelector(selector);
    dropdownContainer.innerHTML = ''; // Clear the existing dropdown items

    // Filter out selected tags from the dropdown options
    const unselectedItems = items.filter(item => !selectedTags.includes(item));

    // Create and append dropdown options for unselected items
    unselectedItems.forEach(item => {
        const option = document.createElement('li');
        option.textContent = item;
        option.classList.add('dropdown-item');
        option.addEventListener('click', () => addTagCallback(item, selector));
        dropdownContainer.appendChild(option);
    });
}

// Function to filter recipes based on selected tags
export function filterRecipesByTags(recipes, selectedTags) {
    return recipes.filter(recipe => {
        return selectedTags.every(tag => {
            const matchIngredient = recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag.toLowerCase()));
            const matchAppliance = recipe.appliance.toLowerCase().includes(tag.toLowerCase());
            const matchUtensil = recipe.ustensils.some(utensil => utensil.toLowerCase().includes(tag.toLowerCase()));
            return matchIngredient || matchAppliance || matchUtensil; // Return true if any tag matches
        });
    });
}