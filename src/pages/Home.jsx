import { useState } from "react";
import { useGym, dateKey, getStreak } from "../context/GymContext.jsx";

const input = "rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-zinc-100";

export default function Home() {
  const { workouts, groups, addWorkout, deleteWorkout, toggleToday } = useGym();
  const [name, setName] = useState("");
  const [group, setGroup] = useState(groups[0] ?? "");
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  const [weight, setWeight] = useState(0);
  const today = dateKey();

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !group) return;
    addWorkout({ name: name.trim(), group, sets, reps, weight });
    setName("");
  };

  const pending = workouts.filter((w) => !w.doneDates.includes(today));
  const finished = workouts.filter((w) => w.doneDates.includes(today));
  const percent = workouts.length ? Math.round((finished.length / workouts.length) * 100) : 0;

  const Row = ({ w }) => (
    <li className="flex items-center gap-3 rounded-xl bg-zinc-800 p-3 shadow-sm">
      <input type="checkbox" checked={w.doneDates.includes(today)}
        onChange={() => toggleToday(w.id)} className="h-5 w-5 accent-red-500" />
      <div className="flex-1">
        <p className="font-semibold">{w.name}</p>
        <p className="text-xs text-zinc-400">
          {w.group} · {w.sets} x {w.reps}{w.weight > 0 ? ` @ ${w.weight} kg` : ""} · {w.doneDates.length} sessions
        </p>
      </div>
      <span className="rounded-full bg-red-500/20 px-2 py-1 text-xs font-bold text-red-300">
        🔥 {getStreak(w.doneDates)} day streak
      </span>
      <button onClick={() => deleteWorkout(w.id)} className="text-zinc-500 hover:text-red-500">✕</button>
    </li>
  );

  return (
    <section>
      <h2 className="text-center text-3xl font-bold">Show up. Lift. Repeat.</h2>
      <p className="mb-5 text-center italic text-zinc-400">Plan your exercises and keep your gym streak alive.</p>

      <form onSubmit={submit} className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-6">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Exercise (e.g. Bench Press)"
          className={`${input} col-span-2 sm:col-span-4`} />
        <select value={group} onChange={(e) => setGroup(e.target.value)} className={`${input} col-span-2`}>
          {groups.map((g) => <option key={g}>{g}</option>)}
        </select>
        <label className="text-xs text-zinc-400">Sets
          <input type="number" min="1" value={sets} onChange={(e) => setSets(+e.target.value)} className={`${input} w-full`} />
        </label>
        <label className="text-xs text-zinc-400">Reps
          <input type="number" min="1" value={reps} onChange={(e) => setReps(+e.target.value)} className={`${input} w-full`} />
        </label>
        <label className="text-xs text-zinc-400">Weight (kg)
          <input type="number" min="0" value={weight} onChange={(e) => setWeight(+e.target.value)} className={`${input} w-full`} />
        </label>
        <button className="col-span-2 self-end rounded-lg bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600 sm:col-span-3">
          Add Exercise
        </button>
      </form>

      <div className="mb-5">
        <div className="mb-1 flex justify-between text-sm font-semibold">
          <span>Today's workout progress</span><span>{percent}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-zinc-700">
          <div className="h-full bg-red-500 transition-all" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <h3 className="mb-2 font-bold">To do today ({pending.length})</h3>
      <ul className="mb-5 space-y-2">
        {pending.length === 0 && <li className="italic text-zinc-500">Nothing left. Great session!</li>}
        {pending.map((w) => <Row key={w.id} w={w} />)}
      </ul>

      <h3 className="mb-2 font-bold">Completed ({finished.length})</h3>
      <ul className="space-y-2">
        {finished.length === 0 && <li className="italic text-zinc-500">No exercises completed yet.</li>}
        {finished.map((w) => <Row key={w.id} w={w} />)}
      </ul>
    </section>
  );
}
