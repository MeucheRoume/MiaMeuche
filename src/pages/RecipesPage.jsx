import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";

export default function RecipesPage({ recipes, ingredients = [], resetRecipes }) {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl">🍲 Mes recettes</h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={resetRecipes}
            className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300"
          >
            Réinitialiser
          </button>
          <Link
            to="/recipes/new"
            className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          >
            + Ajouter
          </Link>
        </div>
      </div>
      {recipes.length === 0 && (
        <p className="text-gray-500">Aucune recette. Commencez par en ajouter une !</p>
      )}
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} ingredients={ingredients} />
      ))}
    </div>
  );
}
