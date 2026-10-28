export default function About() {
  return (
    <section className="rounded-xl bg-zinc-800 p-6 shadow-sm">
      <h2 className="mb-3 text-2xl font-bold">About GymHabit</h2>
      <p className="mb-3 text-zinc-300">
        GymHabit is a gym workout tracker made for DCIT 26.
      </p>
      <p className="mt-3 text-zinc-300">Built with JavaScript (React), HTML, CSS (Tailwind), and JSON.</p>
      <p className="mt-3 font-semibold">Features:</p>
      <ul className="list-disc pl-5 text-zinc-300">
        <li>React Router pages with a navigation bar</li>
        <li>Workout streaks and daily progress bar</li>
        <li>Shared state with the Context API</li>
        <li>localStorage to keep your data after refresh</li>
      </ul>
    </section>
  );
}
