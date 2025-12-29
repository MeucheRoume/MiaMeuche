function RecipeCard({ recipe }) {
  return (
    <div className="border p-2 rounded-md mb-2">
      <h3>{recipe.name}</h3>
      <ul>
        {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
      </ul>
    </div>
  );
}
export default RecipeCard;
