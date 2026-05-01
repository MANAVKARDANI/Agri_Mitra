import { Link } from "react-router-dom";

export default function InfoPage({
  title,
  description,
  sections = [],
}) {
  return (
    <div className="bg-[#f8faf8] min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-200 shadow-sm p-8 md:p-12">
        <p className="text-sm font-semibold tracking-[0.25em] text-green-700 uppercase">
          Agri-Mitra
        </p>
        <h1 className="text-4xl font-bold text-gray-900 mt-4">{title}</h1>
        <p className="text-gray-600 mt-4 leading-7">{description}</p>

        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold text-gray-900">
                {section.heading}
              </h2>
              <p className="text-gray-600 mt-2 leading-7">{section.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <Link
            to="/home"
            className="inline-flex items-center text-green-700 font-semibold hover:underline"
          >
            Return to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
