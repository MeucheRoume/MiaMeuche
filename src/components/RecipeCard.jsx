import { Link } from "react-router-dom";

function RecipeCard({ recipe, ingredients = [] }) {
  function getIngName(ri) {
    if (typeof ri === "string") return ri;
    if (ri.ingredientId !== null) {
      return ingredients.find(i => i.id === ri.ingredientId)?.name ?? "?";
    }
    return ri.name ?? "?";
  }

  return (
    <Link to={`/recipe/${recipe.id}`} className="block border p-2 rounded-md mb-2 hover:bg-gray-50">
      <h3 className="font-semibold">{recipe.name}</h3>
      <ul className="text-sm text-gray-600 list-disc list-inside">
        {recipe.ingredients.map((ri, i) => (
          <li key={i}>{getIngName(ri)}</li>
        ))}
      </ul>
    </Link>
  );
}
export default RecipeCard;
