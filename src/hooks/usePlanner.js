import {useEffect, useState} from 'react';

import {defaultPlanner, generateWeekPlan} from '../services/planner';

export function usePlanner(recipes) {
  const [planner, setPlanner] = useState(() => {
    const saved = localStorage.getItem('planner');
    return saved ? JSON.parse(saved) : defaultPlanner;
  });

  useEffect(() => {
    localStorage.setItem('planner', JSON.stringify(planner));
  }, [planner]);

  function autoPlan() {
    setPlanner(generateWeekPlan(recipes));
  }

  function resetPlanner() {
    setPlanner(defaultPlanner);
  }

  return {planner, autoPlan, resetPlanner, setPlanner};
}
