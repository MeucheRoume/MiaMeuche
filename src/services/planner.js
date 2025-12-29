export function generateWeekPlan(recipes) {
  const days = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
  ];
  const plan = {};

  days.forEach(day => {
    plan[day] = {
      lunch: recipes[Math.floor(Math.random() * recipes.length)] || null,
      dinner: recipes[Math.floor(Math.random() * recipes.length)] || null,
    };
  });

  return plan;
}