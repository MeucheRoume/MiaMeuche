import { ingredients as defaultIngredients } from '../data/ingredients';

export function loadIngredients() {
  try {
    const saved = localStorage.getItem('ingredients');
    if (!saved) return defaultIngredients;
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length ? parsed : defaultIngredients;
  } catch {
    return defaultIngredients;
  }
}

export function saveIngredients(ingredients) {
  try {
    localStorage.setItem('ingredients', JSON.stringify(ingredients));
  } catch {
    // Silently fail if localStorage is unavailable
  }
}
