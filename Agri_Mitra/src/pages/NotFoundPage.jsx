import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="bg-[#f8faf8] min-h-screen flex items-center justify-center px-6">
      <div className="max-w-xl w-full bg-white border border-gray-200 rounded-3xl shadow-sm p-10 text-center">
        <p className="text-sm font-semibold tracking-[0.3em] uppercase text-green-700">
          404
        </p>
        <h1 className="text-4xl font-bold text-gray-900 mt-4">
          Page not found
        </h1>
        <p className="text-gray-600 mt-4 leading-7">
          The page you requested does not exist or may have moved. Use the links
          below to get back into the main Agri-Mitra experience.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/home"
            className="bg-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-800 transition"
          >
            Go to Home
          </Link>
          <Link
            to="/shop"
            className="border border-green-700 text-green-700 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
