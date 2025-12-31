import RecipeCard from "../components/RecipeCard";

export default function RecipesPage({ recipes }) {
  return (
    <div className="p-4">
      <h1>🍲 Mes recettes</h1>
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
