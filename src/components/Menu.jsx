import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div className="p-4">
      <nav className="flex gap-4 mb-4">
        <Link to="/recipes" className="px-3 py-1 bg-gray-200 rounded">📚 Recettes</Link>
        <Link to="/planner" className="px-3 py-1 bg-gray-200 rounded">🗓️ Planner</Link>
      </nav>

      {/* Outlet est remplacé par la page correspondante */}
      <Outlet />
    </div>
  );
}
