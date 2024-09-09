class RecipeCardFactory {
    createRecipeCard(recipe) {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('d-flex', 'justify-content-center', 'col-sm-12', 'col-md-6', 'col-lg-4', 'mb-4');

        recipeCard.innerHTML = `
            <div class="card recipe-card">
                <img src="./assets/images/${recipe.image}" class="card-img-top" alt="${recipe.name}">
                <p class="card-time">${recipe.time} min</p>
                <div class="card-body">
                    <h5 class="card-title">${recipe.name}</h5>
                    <p class="card-recipes">RECETTE</p>
                    <p class="card-text">${recipe.description}</p>
                    <div class="ingredients-section">
                        <h6 class="ingredients-title">INGRÉDIENTS</h6>
                        <div class="ingredients-grid">
                            ${recipe.ingredients.map(ing => `
                                <div class="ingredient-item">
                                    <span class="ingredient-name">${ing.ingredient}</span>
                                    <span class="ingredient-quantity">${ing.quantity ? `${ing.quantity} ${ing.unit || ''}` : ''}</span>
                                </div>`).join('')}
                        </div>
                    </div>
                 </div>
            </div>
        `;

        return recipeCard;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const recipesContainer = document.querySelector('.recipes-container');
    const tagContainer = document.querySelector('.tag-container');
    const recipeCount = document.querySelector('.recipe-count-number');
    const searchBar = document.querySelector('.search-bar');

    const recipeCardFactory = new RecipeCardFactory();
    let selectedTags = [];
    let filteredRecipes = [...recipes]; // Initially, all recipes are available

    // Function to search recipes based on the search input
    function searchRecipes(query) {
        if (query.length >= 3) {
            filteredRecipes = recipes.filter(recipe => {
                const matchTitle = recipe.name.toLowerCase().includes(query.toLowerCase());
                const matchDescription = recipe.description.toLowerCase().includes(query.toLowerCase());
                const matchIngredients = recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(query.toLowerCase()));
                
                return matchTitle || matchDescription || matchIngredients;
            });
        } else {
            filteredRecipes = [...recipes]; // Reset to all recipes if the query is less than 3 characters
        }
        updateUI(filteredRecipes);
        updateAdvancedFilters(filteredRecipes);
    }

    // Function to update the ingredients, appliances, and utensils based on filtered recipes
    function updateAdvancedFilters(filteredRecipes) {
        const ingredients = new Set();
        const appliances = new Set();
        const utensils = new Set();

        filteredRecipes.forEach(recipe => {
            recipe.ingredients.forEach(ing => ingredients.add(ing.ingredient));
            appliances.add(recipe.appliance);
            recipe.ustensils.forEach(ust => utensils.add(ust));
        });

        updateFilterOptions('.dropdown-ingredients', Array.from(ingredients));
        updateFilterOptions('.dropdown-appliances', Array.from(appliances));
        updateFilterOptions('.dropdown-utensils', Array.from(utensils));
    }

    // Function to update the dropdown filters (ingredients, appliances, utensils)
    function updateFilterOptions(selector, items) {
        const dropdownMenu = document.querySelector(selector + ' .dropdown-menu');
        dropdownMenu.innerHTML = '';

        items.forEach(item => {
            const option = document.createElement('li');
            option.textContent = item;
            option.classList.add('dropdown-item');
            option.addEventListener('click', () => addTag(item));
            dropdownMenu.appendChild(option);
        });
    }

    // Add tag under the filters
    function addTag(tagText) {
        if (!selectedTags.includes(tagText)) {
            selectedTags.push(tagText);
            const tagElement = document.createElement('div');
            tagElement.classList.add('tag');
            tagElement.innerHTML = `<span>${tagText}</span><button>x</button>`;

            tagElement.querySelector('button').addEventListener('click', () => removeTag(tagText, tagElement));

            tagContainer.appendChild(tagElement);

            filterRecipesByTags(); // Update filtered recipes by tags
        }
    }

    // Remove tag and update recipes
    function removeTag(tagText, tagElement) {
        selectedTags = selectedTags.filter(tag => tag !== tagText);
        tagContainer.removeChild(tagElement);
        filterRecipesByTags(); // Update filtered recipes by tags
    }

    // Filter recipes based on selected tags
    function filterRecipesByTags() {
        const finalFilteredRecipes = filteredRecipes.filter(recipe => {
            return selectedTags.every(tag => {
                const matchIngredient = recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag.toLowerCase()));
                const matchAppliance = recipe.appliance.toLowerCase().includes(tag.toLowerCase());
                const matchUtensil = recipe.ustensils.some(utensil => utensil.toLowerCase().includes(tag.toLowerCase()));
                return matchIngredient || matchAppliance || matchUtensil;
            });
        });

        recipeCount.textContent = `${finalFilteredRecipes.length} recettes`;
        updateUI(finalFilteredRecipes); // Display filtered recipes
    }

    // Update the UI with the filtered recipes
    function updateUI(recipesToShow) {
        recipesContainer.innerHTML = ''; // Clear container

        recipesToShow.forEach(recipe => {
            const recipeCard = recipeCardFactory.createRecipeCard(recipe);
            recipesContainer.appendChild(recipeCard);
        });
    }

    // Initially display all recipes
    updateUI(recipes);

    // Handle search bar input
    searchBar.addEventListener('input', (event) => {
        const query = event.target.value;
        searchRecipes(query);
    });

    // Example: Update dropdown filters on page load
    updateAdvancedFilters(recipes);
});
