import { createContext, useContext, useEffect, useState } from "react";

const GymContext = createContext();
export const useGym = () => useContext(GymContext);

// Today's date as "YYYY-MM-DD" (local time)
export const dateKey = (d = new Date()) =>
  new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);

// Count consecutive gym days ending today (or yesterday)
export function getStreak(doneDates) {
  let streak = 0;
  const day = new Date();
  if (!doneDates.includes(dateKey(day))) day.setDate(day.getDate() - 1);
  while (doneDates.includes(dateKey(day))) {
    streak++;
    day.setDate(day.getDate() - 1);
  }
  return streak;
}

const load = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
};

export function GymProvider({ children }) {
  const [workouts, setWorkouts] = useState(() => load("gh-workouts", []));
  const [groups, setGroups] = useState(() =>
    load("gh-groups", ["Chest", "Back", "Legs", "Arms", "Shoulders", "Cardio"])
  );

  // Save to the browser whenever data changes
  useEffect(() => localStorage.setItem("gh-workouts", JSON.stringify(workouts)), [workouts]);
  useEffect(() => localStorage.setItem("gh-groups", JSON.stringify(groups)), [groups]);

  const addWorkout = (data) =>
    setWorkouts((w) => [...w, { id: Date.now(), doneDates: [], ...data }]);

  const deleteWorkout = (id) => setWorkouts((w) => w.filter((x) => x.id !== id));

  const toggleToday = (id) =>
    setWorkouts((w) =>
      w.map((x) => {
        if (x.id !== id) return x;
        const today = dateKey();
        const done = x.doneDates.includes(today);
        return { ...x, doneDates: done ? x.doneDates.filter((d) => d !== today) : [...x.doneDates, today] };
      })
    );

  const addGroup = (name) => setGroups((g) => (g.includes(name) ? g : [...g, name]));

  const deleteGroup = (name) => {
    setGroups((g) => g.filter((x) => x !== name));
    setWorkouts((w) => w.filter((x) => x.group !== name));
  };

  return (
    <GymContext.Provider
      value={{ workouts, groups, addWorkout, deleteWorkout, toggleToday, addGroup, deleteGroup }}
    >
      {children}
    </GymContext.Provider>
  );
}
