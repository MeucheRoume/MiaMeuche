import { useState } from "react";
import { Link } from "react-router-dom";

const CATEGORY_COLORS = {
  "légume":          "bg-green-100 text-green-800",
  "viande":          "bg-red-100 text-red-800",
  "poisson":         "bg-blue-100 text-blue-800",
  "féculent":        "bg-amber-100 text-amber-800",
  "produit laitier": "bg-indigo-100 text-indigo-800",
  "épice":           "bg-orange-100 text-orange-800",
  "autre":           "bg-gray-100 text-gray-700",
};

const SEASON_LABELS = {
  "printemps": "🌸",
  "été":       "☀️",
  "automne":   "🍂",
  "hiver":     "❄️",
};

export default function IngredientsPage({ ingredients, removeIngredient }) {
  const [search, setSearch] = useState("");

  const filtered = ingredients.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl">🥕 Ingrédients</h1>
        <Link to="/ingredients/new" className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
          + Ajouter
        </Link>
      </div>

      <input
        className="border rounded w-full p-2 mb-4"
        placeholder="Rechercher un ingrédient…"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {filtered.length === 0 && (
        <p className="text-gray-500">Aucun ingrédient trouvé.</p>
      )}

      <ul className="divide-y">
        {filtered.map(ing => (
          <li key={ing.id} className="flex items-center justify-between py-2 gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium">{ing.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${CATEGORY_COLORS[ing.tags.category] ?? "bg-gray-100 text-gray-700"}`}>
                {ing.tags.category}
              </span>
              {ing.tags.fresh && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">⚡ frais</span>
              )}
              {ing.tags.season
                ? ing.tags.season.map(s => (
                    <span key={s} className="text-xs">{SEASON_LABELS[s]}</span>
                  ))
                : <span className="text-xs text-gray-400">toute l'année</span>
              }
              <span className="text-xs text-gray-500">{ing.tags.price}</span>
            </div>
            <div className="flex gap-2 shrink-0">
              <Link to={`/ingredients/${ing.id}/edit`} className="text-sm text-gray-600 hover:underline">
                Modifier
              </Link>
              <button
                type="button"
                onClick={() => removeIngredient(ing.id)}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
