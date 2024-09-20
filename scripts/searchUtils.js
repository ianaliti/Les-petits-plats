// File: searchUtils.js

export function searchRecipes(query, recipes) {
    const results = [];
    const lowerQuery = query.toLowerCase();

    if (query.length >= 3) {
        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];

            // Check if the query matches the recipe name
            const matchTitle = recipe.name.toLowerCase().includes(lowerQuery);

            // Check if the query matches the recipe description
            const matchDescription = recipe.description.toLowerCase().includes(lowerQuery);
            
            // Check if the query matches any of the ingredients
            let matchIngredients = false;
            for (let j = 0; j < recipe.ingredients.length; j++) {
                if (recipe.ingredients[j].ingredient.toLowerCase().includes(lowerQuery)) {
                    matchIngredients = true;
                    break;
                }
            }

            // If the recipe matches any of the criteria, add it to the results
            if (matchTitle || matchDescription || matchIngredients) {
                results.push(recipe);
            }
        }
        return results;
    }
    
    return [...recipes];
}
