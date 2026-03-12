import { useState } from "react";

import HeroShop from "../assets/Hero_shop.png";

import FarmaFer from "../assets/Farma Fer.png";
import Valley from "../assets/Valley Fertilizers.png";
import EcoCrop from "../assets/EcoCrop Solutions.png";
import Growers from "../assets/Growers Choice.png";
import Nature from "../assets/Nature's Best Agri.png";
import Modern from "../assets/Modern Farmer Supply.png";
import Plant from "../assets/Plant Power Store.png";
import Root from "../assets/Root & Shoot Suppliers.png";

export default function Shop() {
  const shops = [
    {
      name: "Farma Fer",
      img: FarmaFer,
      address: "124 Agri Lane, West Valley District, CA 90210",
      verified: true,
    },
    {
      name: "Valley Fertilizers",
      img: Valley,
      address: "88 Farm Road, East District, TX 75001",
      verified: true,
    },
    {
      name: "EcoCrop Solutions",
      img: EcoCrop,
      address: "45 Sustainable Way, North Zone, FL 33101",
      verified: true,
    },
    {
      name: "Growers Choice",
      img: Growers,
      address: "22 Plantation Drive, South Region, CA 92000",
      verified: false,
    },
    {
      name: "Nature's Best Agri",
      img: Nature,
      address: "78 Organic Blvd, Central City, TX 78701",
      verified: false,
    },
    {
      name: "Modern Farmer Supply",
      img: Modern,
      address: "101 Innovation Road, Tech Park, CA 94000",
      verified: true,
    },
    {
      name: "Plant Power Store",
      img: Plant,
      address: "33 Green Avenue, Suburbia, FL 32801",
      verified: false,
    },
    {
      name: "Root & Shoot Suppliers",
      img: Root,
      address: "56 Growth Street, Farmland, TX 76000",
      verified: false,
    },

    {
      name: "Agri Hub",
      img: FarmaFer,
      address: "New Road 12, Gujarat",
      verified: true,
    },
    {
      name: "Green Harvest",
      img: Valley,
      address: "Market Street 22",
      verified: true,
    },
    {
      name: "Crop Center",
      img: EcoCrop,
      address: "Farm Valley 11",
      verified: false,
    },
    {
      name: "Farm Store",
      img: Growers,
      address: "Agri Road 33",
      verified: false,
    },
    {
      name: "Smart Seeds",
      img: Nature,
      address: "Field Area 55",
      verified: true,
    },
    {
      name: "Fertilizer Depot",
      img: Modern,
      address: "Industrial Area 8",
      verified: false,
    },
    {
      name: "Organic Shop",
      img: Plant,
      address: "Nature Street 77",
      verified: true,
    },
    { name: "Agri Market", img: Root, address: "Farm Hub 99", verified: false },
  ];

  /* Pagination */
  const [currentPage, setCurrentPage] = useState(1);

  const shopsPerPage = 8;

  const indexOfLastShop = currentPage * shopsPerPage;
  const indexOfFirstShop = indexOfLastShop - shopsPerPage;

  const currentShops = shops.slice(indexOfFirstShop, indexOfLastShop);

  const totalPages = Math.ceil(shops.length / shopsPerPage);

  return (
    <div className="bg-white text-gray-800">
      {/* HERO */}
      <section className="relative">
        <div
          className="h-[420px] bg-cover bg-center relative"
          style={{ backgroundImage: `url(${HeroShop})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
            <span className="material-icons text-4xl mb-3">storefront</span>

            <h1 className="text-5xl font-extrabold">Explore Shops</h1>

            <p className="mt-2 text-lg text-white/90">
              Find premium stockists near you
            </p>
          </div>
        </div>

        {/* SEARCH CARD */}
        <div className="bg-[#F5F5F3] pt-32 pb-24">
          <div className="max-w-6xl mx-auto px-6 -mt-40 relative z-10">
            <div
              className="bg-white rounded-[26px] p-10 border border-gray-100
              shadow-[0_20px_60px_rgba(0,0,0,0.08)]
              transition-all duration-500
              hover:shadow-[0_25px_70px_rgba(0,0,0,0.12)]
              hover:-translate-y-1"
            >
              <h2 className="text-center text-2xl font-bold text-gray-800 mb-10">
                Find Local Suppliers
              </h2>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">
                    State
                  </label>

                  <select className="mt-2 w-full rounded-xl border-gray-200 bg-gray-50 focus:ring-2 focus:ring-green-700 focus:border-green-700">
                    <option>Select State</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">
                    District
                  </label>

                  <select className="mt-2 w-full rounded-xl border-gray-200 bg-gray-50 focus:ring-2 focus:ring-green-700 focus:border-green-700">
                    <option>Select District</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">
                    Shop / City
                  </label>

                  <select className="mt-2 w-full rounded-xl border-gray-200 bg-gray-50 focus:ring-2 focus:ring-green-700 focus:border-green-700">
                    <option>Select City or Shop</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  className="bg-[#C9A227] hover:bg-yellow-600 text-white font-semibold
                  px-12 py-3 rounded-lg shadow-md flex items-center gap-2
                  transition hover:scale-105"
                >
                  <span className="material-icons text-sm">search</span>
                  SEARCH
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP GRID */}
      <section className="py-16 bg-[#F5F5F3]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentShops.map((shop, index) => (
              <div
                key={index}
                className="bg-[#EFEFEF] rounded-2xl p-4 hover:shadow-xl transition group"
              >
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={shop.img}
                    alt={shop.name}
                    className="w-full h-48 object-cover transition duration-500 group-hover:scale-105"
                  />

                  {shop.verified && (
                    <div className="absolute top-3 right-3 bg-white text-green-700 text-xs font-semibold px-3 py-1 rounded-full shadow flex items-center gap-1">
                      <span className="material-icons text-[14px]">
                        verified
                      </span>
                      Verified
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <h3 className="font-bold text-lg text-gray-800">
                    {shop.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">{shop.address}</p>

                  <button className="inline-flex items-center gap-1 text-green-700 font-semibold text-sm mt-4 hover:gap-2 transition">
                    VIEW DETAILS
                    <span className="material-icons text-[16px]">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center mt-12 gap-3 flex-wrap">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition
                ${
                  currentPage === i + 1
                    ? "bg-[#C9A227] text-white"
                    : "bg-white border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
              }
              className="px-4 py-2 text-sm font-semibold border border-gray-300 rounded-md hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
