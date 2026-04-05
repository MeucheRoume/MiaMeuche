import { useEffect, useState } from 'react';
import { loadIngredients, saveIngredients } from '../services/ingredientStorage';

export function useIngredients() {
  const [ingredients, setIngredients] = useState(() => loadIngredients());

  useEffect(() => {
    saveIngredients(ingredients);
  }, [ingredients]);

  function addIngredient(ingredient) {
    setIngredients(prev => [...prev, ingredient]);
  }

  function updateIngredient(id, updated) {
    setIngredients(prev => prev.map(i => (i.id === id ? { ...i, ...updated } : i)));
  }

  function removeIngredient(id) {
    setIngredients(prev => prev.filter(i => i.id !== id));
  }

  return { ingredients, addIngredient, updateIngredient, removeIngredient };
}
