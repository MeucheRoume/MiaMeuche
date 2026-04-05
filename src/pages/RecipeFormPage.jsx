import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CATEGORIES = ["légume", "viande", "poisson", "féculent", "produit laitier", "épice", "autre"];

export default function RecipeFormPage({ recipes, ingredients, addRecipe, updateRecipe, addIngredient }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = id ? recipes.find(r => r.id === Number(id)) : null;

  const [name,        setName]        = useState(existing?.name ?? "");
  const [recipeIngs,  setRecipeIngs]  = useState(existing?.ingredients ?? []);
  const [steps,       setSteps]       = useState(existing?.steps ?? [""]);

  // Ingredient search
  const [search,      setSearch]      = useState("");
  const [showDrop,    setShowDrop]    = useState(false);
  const searchRef = useRef(null);

  // Inline "create ingredient" mini-form
  const [showCreate,  setShowCreate]  = useState(false);
  const [newIngName,  setNewIngName]  = useState("");
  const [newIngCat,   setNewIngCat]   = useState("légume");
  const [newIngFresh, setNewIngFresh] = useState(false);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDrop(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = search.length > 0
    ? ingredients.filter(i =>
        i.name.toLowerCase().includes(search.toLowerCase()) &&
        !recipeIngs.some(ri => ri.ingredientId === i.id)
      )
    : [];

  function addFromDB(ing) {
    setRecipeIngs(prev => [...prev, { ingredientId: ing.id, quantity: "" }]);
    setSearch("");
    setShowDrop(false);
    setShowCreate(false);
  }

  function addCustomIngredient() {
    const trimmed = newIngName.trim();
    if (!trimmed) return;
    const newId = ingredients.length ? Math.max(...ingredients.map(i => i.id)) + 1 : 1;
    const newIng = {
      id: newId,
      name: trimmed,
      tags: { category: newIngCat, season: null, price: "€", fresh: newIngFresh },
    };
    addIngredient(newIng);
    setRecipeIngs(prev => [...prev, { ingredientId: newId, quantity: "" }]);
    setSearch("");
    setNewIngName("");
    setNewIngCat("légume");
    setNewIngFresh(false);
    setShowCreate(false);
    setShowDrop(false);
  }

  function updateQuantity(index, value) {
    setRecipeIngs(prev => prev.map((ri, i) => i === index ? { ...ri, quantity: value } : ri));
  }

  function removeRecipeIng(index) {
    setRecipeIngs(prev => prev.filter((_, i) => i !== index));
  }

  function getIngName(ri) {
    if (ri.ingredientId !== null) {
      return ingredients.find(i => i.id === ri.ingredientId)?.name ?? "Ingrédient inconnu";
    }
    return ri.name ?? "";
  }

  // Steps helpers
  function updateStep(index, value) {
    setSteps(prev => prev.map((s, i) => i === index ? value : s));
  }
  function addStep() {
    setSteps(prev => [...prev, ""]);
  }
  function removeStep(index) {
    if (steps.length === 1) return;
    setSteps(prev => prev.filter((_, i) => i !== index));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const cleanSteps = steps.map(s => s.trim()).filter(Boolean);

    if (existing) {
      updateRecipe(existing.id, { name: name.trim(), ingredients: recipeIngs, steps: cleanSteps });
      navigate(`/recipe/${existing.id}`);
    } else {
      const newId = recipes.length ? Math.max(...recipes.map(r => r.id)) + 1 : 1;
      addRecipe({ id: newId, name: name.trim(), ingredients: recipeIngs, steps: cleanSteps });
      navigate("/recipes");
    }
  }

  return (
    <div className="p-4 max-w-lg">
      <h1 className="text-2xl mb-4">{existing ? "Modifier la recette" : "Nouvelle recette"}</h1>

      <form onSubmit={handleSubmit}>
        {/* Nom */}
        <label className="block mb-1 font-semibold">Nom</label>
        <input
          className="border rounded w-full p-2 mb-4"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        {/* Ingrédients */}
        <label className="block mb-1 font-semibold">Ingrédients</label>

        {/* Ingrédients sélectionnés */}
        {recipeIngs.length > 0 && (
          <ul className="mb-2 flex flex-col gap-1">
            {recipeIngs.map((ri, i) => (
              <li key={i} className="flex items-center gap-2 bg-gray-50 border rounded px-2 py-1">
                <span className="flex-1 text-sm">{getIngName(ri)}</span>
                <input
                  className="border rounded p-1 text-sm w-24"
                  placeholder="quantité"
                  value={ri.quantity}
                  onChange={e => updateQuantity(i, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeRecipeIng(i)}
                  className="text-red-500 hover:text-red-700 px-1"
                  aria-label="Retirer cet ingrédient"
                >✕</button>
              </li>
            ))}
          </ul>
        )}

        {/* Recherche d'ingrédient */}
        <div ref={searchRef} className="relative mb-4">
          <input
            className="border rounded w-full p-2"
            placeholder="Rechercher un ingrédient à ajouter…"
            value={search}
            onChange={e => { setSearch(e.target.value); setShowDrop(true); setShowCreate(false); }}
            onFocus={() => { if (search) setShowDrop(true); }}
          />

          {showDrop && search.length > 0 && (
            <div className="absolute z-10 w-full bg-white border rounded shadow mt-1 max-h-48 overflow-y-auto">
              {filtered.map(ing => (
                <button
                  key={ing.id}
                  type="button"
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
                  onClick={() => addFromDB(ing)}
                >
                  {ing.name} <span className="text-gray-400 text-xs">({ing.tags.category})</span>
                </button>
              ))}
              {filtered.length === 0 && (
                <button
                  type="button"
                  className="w-full text-left px-3 py-2 text-blue-600 hover:bg-blue-50 text-sm"
                  onClick={() => { setShowCreate(true); setNewIngName(search); setShowDrop(false); }}
                >
                  + Créer « {search} »
                </button>
              )}
            </div>
          )}
        </div>

        {/* Mini-formulaire création rapide */}
        {showCreate && (
          <div className="border rounded p-3 mb-4 bg-blue-50">
            <p className="text-sm font-semibold mb-2">Nouvel ingrédient</p>
            <input
              className="border rounded w-full p-2 mb-2 text-sm"
              value={newIngName}
              onChange={e => setNewIngName(e.target.value)}
              placeholder="Nom"
            />
            <select
              className="border rounded w-full p-2 mb-2 text-sm"
              value={newIngCat}
              onChange={e => setNewIngCat(e.target.value)}
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <label className="flex items-center gap-2 text-sm mb-2">
              <input type="checkbox" checked={newIngFresh} onChange={e => setNewIngFresh(e.target.checked)} />
              Produit frais
            </label>
            <div className="flex gap-2">
              <button type="button" onClick={addCustomIngredient} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                Ajouter à la recette
              </button>
              <button type="button" onClick={() => setShowCreate(false)} className="bg-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-300">
                Annuler
              </button>
            </div>
          </div>
        )}

        {/* Étapes */}
        <label className="block mb-1 font-semibold">Étapes de préparation</label>
        {steps.map((step, i) => (
          <div key={i} className="flex gap-2 mb-1">
            <textarea
              className="border rounded flex-1 p-2"
              value={step}
              onChange={e => updateStep(i, e.target.value)}
              placeholder={`Étape ${i + 1}`}
              rows={2}
            />
            <button
              type="button"
              onClick={() => removeStep(i)}
              className="text-red-500 px-2 hover:text-red-700"
              aria-label="Supprimer cette étape"
            >✕</button>
          </div>
        ))}
        <button
          type="button"
          onClick={addStep}
          className="text-blue-600 text-sm mb-6 hover:underline"
        >+ Ajouter une étape</button>

        <div className="flex gap-2">
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
