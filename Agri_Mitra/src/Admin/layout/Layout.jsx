import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-[#f5f7f6]">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Navbar />

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}
