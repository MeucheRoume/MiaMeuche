import RecipeCard from "../components/RecipeCard";
import { useRecipes } from "../hooks/useRecipes";

export default function RecipesPage() {
  const { recipes } = useRecipes();

  return (
    <div className="p-4">
      <h1>🍲 Mes recettes</h1>
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
