class RecipeCardFactory {
    createRecipeCard(recipe) {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('col-md-4', 'mb-4');

        recipeCard.innerHTML = `
            <div class="card recipe-card">
                <img src="./assets/images/${recipe.image}" class="card-img-top" alt="${recipe.name}">
                <div class="card-body">
                    <h5 class="card-title">${recipe.name}</h5>
                    <p class="card-text">Temps: ${recipe.time} min</p>
                    <p class="card-text">Ingrédients:</p>
                    <ul class="list-unstyled">
                        ${recipe.ingredients.map(ing => `<li>${ing.ingredient}${ing.quantity ? `: ${ing.quantity} ${ing.unit || ''}` : ''}</li>`).join('')}
                    </ul>
                    <p class="card-text">${recipe.description}</p>
                </div>
            </div>
        `;

        return recipeCard;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const recipesContainer = document.querySelector('.recipes-container');
    const recipeCardFactory = new RecipeCardFactory();

    recipes.forEach(recipe => {
        const recipeCard = recipeCardFactory.createRecipeCard(recipe);
        recipesContainer.appendChild(recipeCard);
    });
});
