import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CATEGORIES = ["légume", "viande", "poisson", "féculent", "produit laitier", "épice", "autre"];
const SEASONS    = ["printemps", "été", "automne", "hiver"];
const PRICES     = ["€", "€€", "€€€"];

export default function IngredientFormPage({ ingredients, addIngredient, updateIngredient }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = id ? ingredients.find(i => i.id === Number(id)) : null;

  const [name,     setName]     = useState(existing?.name ?? "");
  const [category, setCategory] = useState(existing?.tags.category ?? "légume");
  const [price,    setPrice]    = useState(existing?.tags.price    ?? "€");
  const [fresh,    setFresh]    = useState(existing?.tags.fresh    ?? false);
  const [allYear,  setAllYear]  = useState(existing ? existing.tags.season === null : true);
  const [season,   setSeason]   = useState(existing?.tags.season ?? []);

  function toggleSeason(s) {
    setSeason(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  }

  function handleAllYearChange(checked) {
    setAllYear(checked);
    if (checked) setSeason([]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const tags = {
      category,
      season: allYear ? null : season,
      price,
      fresh,
    };

    if (existing) {
      updateIngredient(existing.id, { name: name.trim(), tags });
      navigate("/ingredients");
    } else {
      const newId = ingredients.length ? Math.max(...ingredients.map(i => i.id)) + 1 : 1;
      addIngredient({ id: newId, name: name.trim(), tags });
      navigate("/ingredients");
    }
  }

  return (
    <div className="p-4 max-w-md">
      <h1 className="text-2xl mb-4">{existing ? "Modifier l'ingrédient" : "Nouvel ingrédient"}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 font-semibold">Nom</label>
          <input
            className="border rounded w-full p-2"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Catégorie</label>
          <select
            className="border rounded w-full p-2"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Saison</label>
          <label className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={allYear}
              onChange={e => handleAllYearChange(e.target.checked)}
            />
            Toute l'année
          </label>
          {!allYear && (
            <div className="flex gap-3 flex-wrap">
              {SEASONS.map(s => (
                <label key={s} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={season.includes(s)}
                    onChange={() => toggleSeason(s)}
                  />
                  {s}
                </label>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold">Prix</label>
          <div className="flex gap-4">
            {PRICES.map(p => (
              <label key={p} className="flex items-center gap-1">
                <input
                  type="radio"
                  name="price"
                  value={p}
                  checked={price === p}
                  onChange={() => setPrice(p)}
                />
                {p}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 font-semibold">
            <input
              type="checkbox"
              checked={fresh}
              onChange={e => setFresh(e.target.checked)}
            />
            Produit frais (à consommer rapidement)
          </label>
        </div>

        <div className="flex gap-2 pt-2">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            {existing ? "Enregistrer" : "Créer"}
          </button>
          <button type="button" onClick={() => navigate(-1)} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
