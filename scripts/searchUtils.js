export function searchRecipes(query, recipes) {
    // Check if the query has at least 3 characters
    if (query.length >= 3) {
        // Filter recipes based on matching the recipe name, description, or ingredients
        return recipes.filter(recipe => {
            const matchTitle = recipe.name.toLowerCase().includes(query.toLowerCase());
            const matchDescription = recipe.description.toLowerCase().includes(query.toLowerCase());
            const matchIngredients = recipe.ingredients.some(ingredient =>
                ingredient.ingredient.toLowerCase().includes(query.toLowerCase()
                ));
            return matchTitle || matchDescription || matchIngredients;
        });
    }
    return [...recipes]; // Return all recipes if the query is less than 3 characters
}