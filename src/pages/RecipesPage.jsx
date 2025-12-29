import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import { loadRecipes, saveRecipes } from "../services/storage";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState(loadRecipes);

  useEffect(() => {
    saveRecipes(recipes);
  }, [recipes]);

  return (
    <div>
      <h1>🍲 Mes recettes</h1>
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}