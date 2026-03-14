import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      
      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Navbar />

        <main className="flex-1 p-6">
          {children}
        </main>

        <Footer />

      </div>
    </div>
  );
}