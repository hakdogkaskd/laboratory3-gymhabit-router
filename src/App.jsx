import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Groups from "./pages/Groups.jsx";
import Guide from "./pages/Guide.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";

const links = [
  { to: "/home", label: "Home" },
  { to: "/groups", label: "Muscle Groups" },
  { to: "/guide", label: "User Guide" },
  { to: "/about", label: "About" },
];

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-900 to-red-950 text-zinc-100">
      <header className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-between gap-2 rounded-2xl bg-zinc-800/80 px-6 py-4 shadow">
        <h1 className="text-2xl font-extrabold text-red-500">🏋️ GymHabit</h1>
        <nav className="flex gap-4 text-sm font-semibold">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                isActive ? "text-red-400 underline underline-offset-4" : "hover:text-red-400"
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-2xl p-6">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
