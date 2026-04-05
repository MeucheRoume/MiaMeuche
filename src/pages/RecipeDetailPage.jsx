import { useParams, Link } from "react-router-dom";

const CATEGORY_COLORS = {
  "légume":          "bg-green-100 text-green-800",
  "viande":          "bg-red-100 text-red-800",
  "poisson":         "bg-blue-100 text-blue-800",
  "féculent":        "bg-amber-100 text-amber-800",
  "produit laitier": "bg-indigo-100 text-indigo-800",
  "épice":           "bg-orange-100 text-orange-800",
  "autre":           "bg-gray-100 text-gray-700",
};

const SEASON_LABELS = { "printemps": "🌸", "été": "☀️", "automne": "🍂", "hiver": "❄️" };

export default function RecipeDetailPage({ recipes, ingredients }) {
  const { id } = useParams();
  const recipe = recipes.find(r => r.id === Number(id));

  if (!recipe) return <p>Recette introuvable.</p>;

  function resolveIngredient(ri) {
    if (ri.ingredientId !== null) {
      return ingredients.find(i => i.id === ri.ingredientId) ?? null;
    }
    return null;
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl">{recipe.name}</h1>
        <Link to={`/recipe/${recipe.id}/edit`} className="px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300">
          Modifier
        </Link>
      </div>

      {recipe.image && (
        <img src={recipe.image} alt={recipe.name} className="mb-4 w-full max-w-sm rounded" />
      )}

      <h2 className="text-xl mt-4 mb-2">Ingrédients</h2>
      <ul className="flex flex-col gap-2">
        {recipe.ingredients.map((ri, i) => {
          const ing = resolveIngredient(ri);
          const name = ing?.name ?? ri.name ?? "Ingrédient inconnu";
          return (
            <li key={`${i}-${ri.ingredientId ?? name}`} className="flex items-center gap-2 flex-wrap">
              <span>
                {ri.quantity && <span className="text-gray-500 text-sm mr-1">{ri.quantity}</span>}
                {ing
                  ? <Link to={`/ingredients/${ing.id}/edit`} className="hover:underline">{name}</Link>
                  : name
                }
              </span>
              {ing && (
                <>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${CATEGORY_COLORS[ing.tags.category] ?? "bg-gray-100"}`}>
                    {ing.tags.category}
                  </span>
                  {ing.tags.fresh && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">⚡ frais</span>
                  )}
                  {ing.tags.season
                    ? ing.tags.season.map(s => <span key={s} className="text-xs">{SEASON_LABELS[s]}</span>)
                    : null
                  }
                </>
              )}
            </li>
          );
        })}
      </ul>

      {recipe.steps && recipe.steps.length > 0 && (
        <>
          <h2 className="text-xl mt-4 mb-2">Préparation</h2>
          <ol className="list-decimal list-inside flex flex-col gap-1">
            {recipe.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}
