import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="text-center">
      <h2 className="mb-3 text-3xl font-bold">404 - Page not found</h2>
      <Link to="/home" className="text-red-400 underline">Back to Home</Link>
    </section>
  );
}
