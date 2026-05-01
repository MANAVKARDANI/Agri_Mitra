import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { suppliersApi } from "../services/api";

import HeroShop from "../assets/Hero_shop.png";

import FarmaFer from "../assets/Farma Fer.png";
import Valley from "../assets/Valley Fertilizers.png";
import EcoCrop from "../assets/EcoCrop Solutions.png";
import Growers from "../assets/Growers Choice.png";
import Nature from "../assets/Nature's Best Agri.png";
import Modern from "../assets/Modern Farmer Supply.png";
import Plant from "../assets/Plant Power Store.png";
import Root from "../assets/Root & Shoot Suppliers.png";

const localImages = [FarmaFer, Valley, EcoCrop, Growers, Nature, Modern, Plant, Root];

export default function Shop() {
  const [shops, setShops] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const shopsPerPage = 8;

  useEffect(() => {
    const loadShops = async () => {
      try {
        const { data } = await suppliersApi.getAll();
        const mapped = data.map((shop, index) => ({
          id: shop.id,
          name: shop.name,
          img: localImages[index % localImages.length],
          address: shop.address,
          verified: true,
        }));
        setShops(mapped);
      } catch {
        setShops([]);
      }
    };
    loadShops();
  }, []);

  const indexOfLastShop = currentPage * shopsPerPage;
  const indexOfFirstShop = indexOfLastShop - shopsPerPage;

  const currentShops = shops.slice(indexOfFirstShop, indexOfLastShop);
  const totalPages = Math.ceil(shops.length / shopsPerPage);

  return (
    <div className="bg-white text-gray-800">
      {/* HERO */}
      <section className="relative">
        <div
          className="h-[350px] bg-cover bg-center"
          style={{ backgroundImage: `url(${HeroShop})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
            <h1 className="text-5xl font-extrabold">Explore Shops</h1>
            <p className="mt-2 text-lg text-white/90">
              Find premium stockists near you
            </p>
          </div>
        </div>
      </section>

      {/* ================= SEARCH BOX (ADDED ONLY) ================= */}
      {/* ================= SEARCH BOX (FIXED BG) ================= */}
      <div className="relative -mt-24 z-10 flex justify-center px-6">
        <div
          className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)]
    border border-gray-100 p-8 w-full max-w-5xl"
        >
          <h2 className="text-xl font-semibold text-center mb-6 text-gray-700">
            Find Local Suppliers
          </h2>

          <div className="grid md:grid-cols-3 gap-5 mb-6">
            {/* STATE */}
            <select
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm
        hover:bg-white hover:border-green-400 hover:shadow-sm
        focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
            >
              <option>Select State</option>
              <option>Gujarat</option>
              <option>Maharashtra</option>
              <option>Rajasthan</option>
              <option>Karnataka</option>
            </select>

            {/* DISTRICT */}
            <select
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm
        hover:bg-white hover:border-green-400 hover:shadow-sm
        focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
            >
              <option>Select District</option>
              <option>Ahmedabad</option>
              <option>Surat</option>
              <option>Rajkot</option>
              <option>Pune</option>
            </select>

            {/* SHOP */}
            <select
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm
        hover:bg-white hover:border-green-400 hover:shadow-sm
        focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
            >
              <option>Select City or Shop</option>
              <option>Farma Fer</option>
              <option>EcoCrop Solutions</option>
            </select>
          </div>

          {/* BUTTON */}
          <div className="flex justify-center">
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-xl text-sm font-semibold
        shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
               SEARCH
            </button>
          </div>
        </div>
      </div>

      {/* SHOP GRID */}
      <section className="py-16 bg-[#F5F5F3]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentShops.map((shop) => (
              <div
                key={shop.id}
                className="relative bg-[#EFEFEF] rounded-2xl p-4
                transition-all duration-500 ease-[cubic-bezier(.25,.8,.25,1)]
                hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]
                hover:shadow-green-200/50
                group cursor-pointer overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500
                bg-gradient-to-br from-green-100/40 via-transparent to-yellow-100/40"
                ></div>

                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={shop.img}
                    alt={shop.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {shop.verified && (
                    <div className="absolute top-3 right-3 bg-white text-green-700 text-xs px-3 py-1 rounded-full shadow-md">
                      Verified
                    </div>
                  )}
                </div>

                <div className="mt-4 relative z-10">
                  <h3 className="font-bold text-lg text-gray-800 group-hover:text-green-800 transition">
                    {shop.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">{shop.address}</p>

                  <Link
                    to="/shop-details"
                    state={{ shop }}
                    className="inline-flex items-center gap-1 text-green-700 font-semibold text-sm mt-4
                    transition-all duration-300 group-hover:gap-3"
                  >
                    VIEW DETAILS
                    <span className="material-icons text-[16px] group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center mt-12 gap-3">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-md transition ${
                  currentPage === i + 1
                    ? "bg-green-700 text-white"
                    : "bg-white border hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
