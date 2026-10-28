import { useState } from "react";
import { useGym, dateKey } from "../context/GymContext.jsx";

export default function Groups() {
  const { workouts, groups, addGroup, deleteGroup } = useGym();
  const [name, setName] = useState("");
  const today = dateKey();

  const submit = (e) => {
    e.preventDefault();
    if (name.trim()) addGroup(name.trim());
    setName("");
  };

  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">Muscle Groups</h2>
      <form onSubmit={submit} className="mb-5 flex gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New group (e.g. Core)..."
          className="flex-1 rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2" />
        <button className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600">Add</button>
      </form>

      <div className="space-y-4">
        {groups.map((g) => {
          const list = workouts.filter((w) => w.group === g);
          const done = list.filter((w) => w.doneDates.includes(today)).length;
          return (
            <div key={g} className="rounded-xl bg-zinc-800 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">{g}</h3>
                <span className="text-sm text-zinc-400">{done}/{list.length} done today</span>
                <button onClick={() => deleteGroup(g)} className="text-sm text-red-400 hover:underline">Delete</button>
              </div>
              <ul className="mt-2 list-disc pl-5 text-sm text-zinc-300">
                {list.length === 0 && <li className="list-none italic">No exercises here yet.</li>}
                {list.map((w) => <li key={w.id}>{w.name} ({w.sets} x {w.reps})</li>)}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
