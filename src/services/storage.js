import {recipes as defaultRecipes} from '../data/recipes';

export function loadRecipes() {
  const saved = localStorage.getItem('recipes');
  return saved ? JSON.parse(saved) : defaultRecipes;
}

export function saveRecipes(recipes) {
  localStorage.setItem('recipes', JSON.stringify(recipes));
}
