const steps = [
  ["Add an exercise", "On Home, type the exercise, pick a muscle group, then set the sets, reps and weight."],
  ["Check it off", "Tick the checkbox after you finish it. It moves to Completed."],
  ["Grow your streak", "Train on consecutive days to build the 🔥 gym streak."],
  ["Organize", "Open Muscle Groups to add or delete groups and see your progress per group."],
  ["Delete", "Press ✕ beside an exercise to remove it. Deleting a group removes its exercises."],
];

export default function Guide() {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">User Guide</h2>
      <ol className="space-y-3">
        {steps.map(([title, text], i) => (
          <li key={title} className="flex gap-3 rounded-xl bg-zinc-800 p-4 shadow-sm">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 font-bold text-white">{i + 1}</span>
            <div><p className="font-semibold">{title}</p><p className="text-sm text-zinc-400">{text}</p></div>
          </li>
        ))}
      </ol>
    </section>
  );
}
