export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t px-6 py-4 flex items-center justify-between text-sm text-gray-500">

      {/* Left */}
      <div>
        © 2026 . All rights reserved.
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        <a href="#" className="hover:text-gray-700">
          Privacy Policy
        </a>

        <a href="#" className="hover:text-gray-700">
          Support Center
        </a>

        <a href="#" className="hover:text-gray-700">
          Documentation
        </a>

      </div>

    </footer>
  );
}