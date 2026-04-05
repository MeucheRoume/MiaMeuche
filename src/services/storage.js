import {recipes as defaultRecipes} from '../data/recipes';

function migrateIngredients(ingredients) {
  return ingredients.map(ing =>
    typeof ing === 'string'
      ? { ingredientId: null, name: ing, quantity: '' }
      : ing
  );
}

export function loadRecipes() {
  try {
    const saved = localStorage.getItem('recipes');
    if (!saved) return defaultRecipes;
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed) || !parsed.length) return defaultRecipes;
    return parsed.map(r => ({ ...r, ingredients: migrateIngredients(r.ingredients) }));
  } catch {
    return defaultRecipes;
  }
}

export function saveRecipes(recipes) {
  localStorage.setItem('recipes', JSON.stringify(recipes));
}
