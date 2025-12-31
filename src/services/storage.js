import {recipes as defaultRecipes} from '../data/recipes';

export function loadRecipes() {
  const saved = localStorage.getItem('recipes');

  if (!saved) return defaultRecipes;

  const parsed = JSON.parse(saved);
  return parsed.length ? parsed : defaultRecipes;
}

export function saveRecipes(recipes) {
  localStorage.setItem('recipes', JSON.stringify(recipes));
}
