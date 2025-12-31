export const defaultPlanner = {
  monday: {lunch: null, dinner: null},
  tuesday: {lunch: null, dinner: null},
  wednesday: {lunch: null, dinner: null},
  thursday: {lunch: null, dinner: null},
  friday: {lunch: null, dinner: null},
  saturday: {lunch: null, dinner: null},
  sunday: {lunch: null, dinner: null},
};

export function generateWeekPlan(recipes) {
  const days = Object.keys(defaultPlanner);
  const newPlanner = {};

  days.forEach(day => {
    newPlanner[day] = {
      lunch: recipes[Math.floor(Math.random() * recipes.length)] || null,
      dinner: recipes[Math.floor(Math.random() * recipes.length)] || null,
    };
  });

  return newPlanner;
}