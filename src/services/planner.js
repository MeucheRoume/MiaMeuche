export const defaultPlanner = {
  monday: {lunch: null, dinner: null},
  tuesday: {lunch: null, dinner: null},
  wednesday: {lunch: null, dinner: null},
  thursday: {lunch: null, dinner: null},
  friday: {lunch: null, dinner: null},
  saturday: {lunch: null, dinner: null},
  sunday: {lunch: null, dinner: null},
};

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateWeekPlan(recipes) {
  if (!recipes.length) return { ...defaultPlanner };

  const days = Object.keys(defaultPlanner);
  const slots = days.length * 2; // lunch + dinner per day

  // Repeat the shuffled pool until we have enough slots
  let pool = [];
  while (pool.length < slots) {
    pool = [...pool, ...shuffle(recipes)];
  }

  const newPlanner = {};
  let idx = 0;
  days.forEach(day => {
    newPlanner[day] = {
      lunch: pool[idx++],
      dinner: pool[idx++],
    };
  });

  return newPlanner;
}