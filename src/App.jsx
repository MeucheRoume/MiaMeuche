import { BrowserRouter, Routes, Route } from "react-router-dom";

import Menu from "./components/Menu";
import RecipesPage from "./pages/RecipesPage";
import PlannerPage from "./pages/PlannerPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import { useRecipes } from "./hooks/useRecipes";

export default function App() {
  const { recipes } = useRecipes();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route
            index
            element={<RecipesPage recipes={recipes} />}
          />

          <Route
            path="recipes"
            element={<RecipesPage recipes={recipes} />}
          />

          <Route
            path="planner"
            element={<PlannerPage recipes={recipes} />}
          />

          <Route
            path="recipe/:id"
            element={<RecipeDetailPage recipes={recipes}/>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
