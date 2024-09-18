// File: searchUtils.js
export function searchRecipes(query, recipes) {
    if (query.length >= 3) {
        return recipes.filter(recipe => {
            const matchTitle = recipe.name.toLowerCase().includes(query.toLowerCase());
            const matchDescription = recipe.description.toLowerCase().includes(query.toLowerCase());
            const matchIngredients = recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(query.toLowerCase()));
            return matchTitle || matchDescription || matchIngredients;
        });
    }
    return [...recipes];
}