import { Link } from "react-router-dom";
import { usePlanner } from "../hooks/usePlanner";

export default function PlannerPage({ recipes }) {
  const { planner, autoPlan, resetPlanner } = usePlanner(recipes);
  const days = Object.keys(planner);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">🗓️ Planning de la semaine</h1>

      <div className="flex gap-2 mb-4">
        <button type="button" onClick={autoPlan} className="bg-green-600 text-white px-3 py-1 rounded">
          Générer automatiquement
        </button>
        <button type="button" onClick={resetPlanner} className="bg-gray-400 text-white px-3 py-1 rounded">
          Réinitialiser
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Jour</th>
            <th className="border p-2">Déjeuner</th>
            <th className="border p-2">Dîner</th>
          </tr>
        </thead>
        <tbody>
          {days.map(day => (
            <tr key={day}>
              <td className="border p-2 font-semibold capitalize">{day}</td>
              <td className="border p-2">
                {planner[day].lunch ? (
                  <Link to={`/recipe/${planner[day].lunch.id}`} className="hover:underline">
                    {planner[day].lunch.name}
                  </Link>
                ) : "—"}
              </td>
              <td className="border p-2">
                {planner[day].dinner ? (
                  <Link to={`/recipe/${planner[day].dinner.id}`} className="hover:underline">
                    {planner[day].dinner.name}
                  </Link>
                ) : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
