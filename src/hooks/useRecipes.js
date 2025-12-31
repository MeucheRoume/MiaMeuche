import {useEffect, useState} from 'react';

import {loadRecipes, saveRecipes} from '../services/storage';

export function useRecipes() {
  // state initialisé avec les recettes du storage
  const [recipes, setRecipes] = useState(() => {
    return loadRecipes();  // charge depuis localStorage ou le fichier par
                           // défaut
  });

  // persistance automatique
  useEffect(() => {
    saveRecipes(recipes);
  }, [recipes]);

  // ajouter une recette
  function addRecipe(recipe) {
    setRecipes(prev => [...prev, recipe]);
  }

  // mettre à jour une recette
  function updateRecipe(id, updatedRecipe) {
    setRecipes(
        prev => prev.map(r => (r.id === id ? {...r, ...updatedRecipe} : r)));
  }

  // supprimer une recette
  function removeRecipe(id) {
    setRecipes(prev => prev.filter(r => r.id !== id));
  }

  return {recipes, addRecipe, updateRecipe, removeRecipe, setRecipes};
}
