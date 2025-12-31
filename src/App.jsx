import { BrowserRouter, Routes, Route } from "react-router-dom";

import Menu from "./components/Menu";
import RecipesPage from "./pages/RecipesPage";
import PlannerPage from "./pages/PlannerPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route
            index
            element={<RecipesPage/>}
          />

          <Route
            path="recipes"
            element={<RecipesPage/>}
          />

          <Route
            path="planner"
            element={<PlannerPage/>}
          />

          <Route
            path="recipe/:id"
            element={<RecipeDetailPage/>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
