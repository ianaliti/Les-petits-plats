// File: filterUtils.js
export function updateAdvancedFilters(filteredRecipes, selectedTags, addTagCallback) {
    const ingredients = new Set();
    const appliances = new Set();
    const utensils = new Set();

    filteredRecipes.forEach(recipe => {
        recipe.ingredients.forEach(ing => ingredients.add(ing.ingredient));
        appliances.add(recipe.appliance);
        recipe.ustensils.forEach(ust => utensils.add(ust));
    });

    updateFilterOptions('.ingredient-options', Array.from(ingredients), selectedTags, addTagCallback);
    updateFilterOptions('.appliance-options', Array.from(appliances), selectedTags, addTagCallback);
    updateFilterOptions('.utensil-options', Array.from(utensils), selectedTags, addTagCallback);
}

export function updateFilterOptions(selector, items, selectedTags, addTagCallback) {
    const dropdownContainer = document.querySelector(selector);
    dropdownContainer.innerHTML = '';

    const unselectedItems = items.filter(item => !selectedTags.includes(item));

    unselectedItems.forEach(item => {
        const option = document.createElement('li');
        option.textContent = item;
        option.classList.add('dropdown-item');
        option.addEventListener('click', () => addTagCallback(item, selector));
        dropdownContainer.appendChild(option);
    });
}

export function filterRecipesByTags(recipes, selectedTags) {
    return recipes.filter(recipe => {
        return selectedTags.every(tag => {
            const matchIngredient = recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag.toLowerCase()));
            const matchAppliance = recipe.appliance.toLowerCase().includes(tag.toLowerCase());
            const matchUtensil = recipe.ustensils.some(utensil => utensil.toLowerCase().includes(tag.toLowerCase()));
            return matchIngredient || matchAppliance || matchUtensil;
        });
    });
}