class RecipeCardFactory {
    createRecipeCard(recipe) {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('col-sm-12', 'col-md-6', 'col-lg-4', 'mb-4');  // Ensure it fits 3 per row

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
    const tagContainerUnified = document.querySelector('.tag-container-unified');  // Unified tag container
    const searchBar = document.querySelector('.search-bar');
    const errorContainer = document.createElement('div'); 
    errorContainer.classList.add('no-results-message'); 
    recipesContainer.parentElement.appendChild(errorContainer); 


    const ingredientSearchInput = document.querySelector('.ingredient-search-input');
    const applianceSearchInput = document.querySelector('.appliance-search-input');
    const utensilSearchInput = document.querySelector('.utensil-search-input');
    const recipesCount = document.querySelector('.recipe-count-number')

    const recipeCardFactory = new RecipeCardFactory();
    let selectedTags = [];
    let filteredRecipes = [...recipes]; 
    recipesCount.textContent = `${filteredRecipes.length} recettes`;

    // Ensure the tag container exists in the DOM
    if (!tagContainerUnified) {
        console.error('Tag container not found! Please ensure it exists in the DOM.');
        return; // Stop execution if the element is not found
    }

    // Function to search recipes based on the search input
    function searchRecipes(query) {
        if (query.length >= 3) {
            filteredRecipes = recipes.filter(recipe => {
                const matchTitle = recipe.name.toLowerCase().includes(query.toLowerCase());
                const matchDescription = recipe.description.toLowerCase().includes(query.toLowerCase());
                const matchIngredients = recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(query.toLowerCase()));
                return matchTitle || matchDescription || matchIngredients;
            });
            
            if (filteredRecipes.length === 0) {
                displayNoResultsMessage(query);
            } else {
                errorContainer.innerHTML = '';
            }
        } else {
            filteredRecipes = [...recipes]; // Reset to all recipes if the query is less than 3 characters
            errorContainer.innerHTML = '';
        }
        updateUI(filteredRecipes);
        updateAdvancedFilters(filteredRecipes);
        recipesCount.textContent = `${filteredRecipes.length} recettes`;
    }

    // Function to display no results message
    function displayNoResultsMessage(query) {
        errorContainer.innerHTML = `
            <p>Aucune recette ne contient '${query}'. Vous pouvez chercher des termes comme « tarte aux pommes », « poisson », etc.</p>
        `;
    }

    // Function to update the ingredients, appliances, and utensils based on filtered recipes
    function updateAdvancedFilters(filteredRecipes) {
        const ingredients = new Set();
        const appliances = new Set();
        const utensils = new Set();

        // Collect only the tags corresponding to the filtered recipes
        filteredRecipes.forEach(recipe => {
            recipe.ingredients.forEach(ing => ingredients.add(ing.ingredient));
            appliances.add(recipe.appliance);
            recipe.ustensils.forEach(ust => utensils.add(ust));
        });

        // Update dropdown options to show only matching tags for remaining recipes
        updateFilterOptions('.ingredient-options', Array.from(ingredients));
        updateFilterOptions('.appliance-options', Array.from(appliances));
        updateFilterOptions('.utensil-options', Array.from(utensils));
    }


    // Function to filter and update the dropdown options
    function filterDropdownOptions(inputElement, selector, items) {
        const searchValue = inputElement.value.toLowerCase();
        const filteredItems = items.filter(item => item.toLowerCase().includes(searchValue));
        updateFilterOptions(selector, filteredItems);
    }

    // Function to update the dropdown filter options
    function updateFilterOptions(selector, items) {
        const dropdownContainer = document.querySelector(selector);
        dropdownContainer.innerHTML = '';  // Clear existing options
    
        // Only display options that match remaining recipes and aren't selected
        const unselectedItems = items.filter(item => !selectedTags.includes(item));
    
        // Rebuild the dropdown with valid and unselected items
        unselectedItems.forEach(item => {
            const option = document.createElement('li');
            option.textContent = item;
            option.classList.add('dropdown-item');
            option.addEventListener('click', () => addTag(item, selector));
            dropdownContainer.appendChild(option);
        });
    }

    // Add tag under the filters and remove it from the dropdown
    function addTag(tagText, selector) {
        if (!selectedTags.includes(tagText)) {
            selectedTags.push(tagText);
            
            const tagElement = document.createElement('div');
            tagElement.classList.add('tag');
            tagElement.innerHTML = `<span>${tagText}</span><button>x</button>`;
            
            tagElement.querySelector('button').addEventListener('click', () => removeTag(tagText, tagElement, selector));
    
            // Append the tag to the tag container
            tagContainerUnified.appendChild(tagElement);
    
            // Remove the selected tag from the dropdown immediately
            removeOptionFromDropdown(tagText, selector);
    
            // Update recipes after adding the tag
            filterRecipesByTags();
        }
    }

     // Function to remove an option from the dropdown
     function removeOptionFromDropdown(tagText, selector) {
        const dropdownContainer = document.querySelector(selector);
        const options = Array.from(dropdownContainer.children);
    
        const optionToRemove = options.find(option => option.textContent.trim() === tagText.trim());
        if (optionToRemove) {
            dropdownContainer.removeChild(optionToRemove);  // Remove the option from the dropdown
        }
    }

    // Remove tag and add it back to the dropdown options
    function removeTag(tagText, tagElement, selector) {
        selectedTags = selectedTags.filter(tag => tag !== tagText);
        tagContainerUnified.removeChild(tagElement);  // Remove from the unified container
    
        // Re-add the tag back to the dropdown
        addOptionToDropdown(tagText, selector);
    
        filterRecipesByTags();  // Update recipes
    }

    // Function to add an option back to the dropdown
    function addOptionToDropdown(tagText, selector) {
        const dropdownContainer = document.querySelector(selector);
        const option = document.createElement('li');
        option.textContent = tagText;
        option.classList.add('dropdown-item');
        option.addEventListener('click', () => addTag(tagText, selector));
    
        dropdownContainer.appendChild(option);  // Add the option back to the dropdown
    }

    // Filter recipes based on selected tags
    function filterRecipesByTags() {
        // Filter recipes by selected tags
        filteredRecipes = recipes.filter(recipe => {
            return selectedTags.every(tag => {
                const matchIngredient = recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag.toLowerCase()));
                const matchAppliance = recipe.appliance.toLowerCase().includes(tag.toLowerCase());
                const matchUtensil = recipe.ustensils.some(utensil => utensil.toLowerCase().includes(tag.toLowerCase()));
                return matchIngredient || matchAppliance || matchUtensil;
            });
        });
    
        // Update the dropdown to remove options that don't correspond to filtered recipes
        updateAdvancedFilters(filteredRecipes);
    
        // Update the recipe count and display the filtered recipes
        recipesCount.textContent = `${filteredRecipes.length} recettes`;
        updateUI(filteredRecipes);  // Display filtered recipes
    }

    // Update the UI with the filtered recipes
    function updateUI(recipesToShow) {
        recipesContainer.innerHTML = ''; // Clear container

        recipesToShow.forEach(recipe => {
            const recipeCard = recipeCardFactory.createRecipeCard(recipe);
            recipesContainer.appendChild(recipeCard);
        });
    }

    // Handle search bar input
    searchBar.addEventListener('input', (event) => {
        const query = event.target.value;
        searchRecipes(query);
    });

    // Handle filtering within dropdown inputs
    ingredientSearchInput.addEventListener('input', () => {
        filterDropdownOptions(ingredientSearchInput, '.ingredient-options', Array.from(filteredRecipes.flatMap(r => r.ingredients.map(ing => ing.ingredient))));
    });

    applianceSearchInput.addEventListener('input', () => {
        filterDropdownOptions(applianceSearchInput, '.appliance-options', Array.from(filteredRecipes.map(r => r.appliance)));
    });

    utensilSearchInput.addEventListener('input', () => {
        filterDropdownOptions(utensilSearchInput, '.utensil-options', Array.from(filteredRecipes.flatMap(r => r.ustensils)));
    });

    // Initially display all recipes
    updateUI(recipes);
    updateAdvancedFilters(recipes);
});
