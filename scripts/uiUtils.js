// File: uiUtils.js
export function updateUI(recipesToShow, recipesContainer, recipeCardFactory) {
    recipesContainer.innerHTML = '';

    recipesToShow.forEach(recipe => {
        const recipeCard = recipeCardFactory.createRecipeCard(recipe);
        recipesContainer.appendChild(recipeCard);
    });
}

export function displayNoResultsMessage(query, errorContainer) {
    errorContainer.innerHTML = `
        <p>Aucune recette ne contient '${query}'. Vous pouvez chercher des termes comme « tarte aux pommes », « poisson », etc.</p>
    `;
}

export function updateRecipeCount(count, recipesCountElement) {
    recipesCountElement.textContent = `${count} recettes`;
}
