import { BrowserRouter, Routes, Route } from "react-router-dom";

import Menu from "./components/Menu";
import RecipesPage from "./pages/RecipesPage";
import PlannerPage from "./pages/PlannerPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import RecipeFormPage from "./pages/RecipeFormPage";
import IngredientsPage from "./pages/IngredientsPage";
import IngredientFormPage from "./pages/IngredientFormPage";
import ErrorBoundary from "./components/ErrorBoundary";
import { useRecipes } from "./hooks/useRecipes";
import { useIngredients } from "./hooks/useIngredients";

export default function App() {
  const { recipes, addRecipe, updateRecipe, resetRecipes } = useRecipes();
  const { ingredients, addIngredient, updateIngredient, removeIngredient } = useIngredients();

  return (
    <ErrorBoundary>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route index element={<RecipesPage recipes={recipes} ingredients={ingredients} resetRecipes={resetRecipes} />} />
          <Route path="recipes" element={<RecipesPage recipes={recipes} ingredients={ingredients} resetRecipes={resetRecipes} />} />
          <Route path="recipes/new" element={<RecipeFormPage recipes={recipes} ingredients={ingredients} addRecipe={addRecipe} updateRecipe={updateRecipe} addIngredient={addIngredient} />} />

          <Route path="planner" element={<PlannerPage recipes={recipes} ingredients={ingredients} />} />

          <Route path="recipe/:id" element={<RecipeDetailPage recipes={recipes} ingredients={ingredients} />} />
          <Route path="recipe/:id/edit" element={<RecipeFormPage recipes={recipes} ingredients={ingredients} addRecipe={addRecipe} updateRecipe={updateRecipe} addIngredient={addIngredient} />} />

          <Route path="ingredients" element={<IngredientsPage ingredients={ingredients} removeIngredient={removeIngredient} />} />
          <Route path="ingredients/new" element={<IngredientFormPage ingredients={ingredients} addIngredient={addIngredient} updateIngredient={updateIngredient} />} />
          <Route path="ingredients/:id/edit" element={<IngredientFormPage ingredients={ingredients} addIngredient={addIngredient} updateIngredient={updateIngredient} />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </ErrorBoundary>
  );
}
