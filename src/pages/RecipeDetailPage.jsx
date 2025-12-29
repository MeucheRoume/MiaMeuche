import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function RecipeDetailPage() {
  const { id } = useParams(); // Récupère l'id depuis l'URL
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Récupérer la liste des recettes depuis localStorage
    const savedRecipes = JSON.parse(localStorage.getItem("recipes") || "[]");
    const found = savedRecipes.find(r => r.id === Number(id));
    setRecipe(found || null);
  }, [id]);

  if (!recipe) return <p>Recette introuvable.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-2">{recipe.name}</h1>

      {recipe.image && (
        <img src={recipe.image} alt={recipe.name} className="mb-4 w-full max-w-sm rounded" />
      )}

      <h2 className="text-xl mt-4 mb-2">Ingrédients</h2>
      <ul className="list-disc list-inside">
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>

      {recipe.steps && (
        <>
          <h2 className="text-xl mt-4 mb-2">Préparation</h2>
          <ol className="list-decimal list-inside">
            {recipe.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}
