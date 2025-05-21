import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="flex flex-col justify-center items-center min-h-screen text-center p-6 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Back to Dashboard
      </Link>
    </section>
  );
}
