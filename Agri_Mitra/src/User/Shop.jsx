import { useState } from "react";
import { Link } from "react-router-dom";

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
      id: "farma-fer",
      name: "Farma Fer",
      img: FarmaFer,
      address: "124 Agri Lane, West Valley District, CA 90210",
      verified: true,
    },
    {
      id: "valley-fertilizers",
      name: "Valley Fertilizers",
      img: Valley,
      address: "88 Farm Road, East District, TX 75001",
      verified: true,
    },
    {
      id: "eco-crop",
      name: "EcoCrop Solutions",
      img: EcoCrop,
      address: "45 Sustainable Way, North Zone, FL 33101",
      verified: true,
    },
    {
      id: "growers-choice",
      name: "Growers Choice",
      img: Growers,
      address: "22 Plantation Drive, South Region, CA 92000",
      verified: false,
    },
    {
      id: "natures-best",
      name: "Nature's Best Agri",
      img: Nature,
      address: "78 Organic Blvd, Central City, TX 78701",
      verified: false,
    },
    {
      id: "modern-farmer",
      name: "Modern Farmer Supply",
      img: Modern,
      address: "101 Innovation Road, Tech Park, CA 94000",
      verified: true,
    },
    {
      id: "plant-power",
      name: "Plant Power Store",
      img: Plant,
      address: "33 Green Avenue, Suburbia, FL 32801",
      verified: false,
    },
    {
      id: "root-shoot",
      name: "Root & Shoot Suppliers",
      img: Root,
      address: "56 Growth Street, Farmland, TX 76000",
      verified: false,
    },
  ];

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
                {/* Gradient Hover Glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500
                bg-gradient-to-br from-green-100/40 via-transparent to-yellow-100/40"
                ></div>

                {/* IMAGE */}
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={shop.img}
                    alt={shop.name}
                    className="w-full h-48 object-cover
                    transition-transform duration-700
                    group-hover:scale-110"
                  />

                  {shop.verified && (
                    <div className="absolute top-3 right-3 bg-white text-green-700 text-xs px-3 py-1 rounded-full shadow-md">
                      Verified
                    </div>
                  )}
                </div>

                {/* TEXT */}
                <div className="mt-4 relative z-10">
                  <h3 className="font-bold text-lg text-gray-800 group-hover:text-green-800 transition">
                    {shop.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">{shop.address}</p>

                  {/* BUTTON */}
                  <Link
                    to="/shop-details"
                    state={{ shop }}
                    className="inline-flex items-center gap-1 text-green-700 font-semibold text-sm mt-4
                    transition-all duration-300 group-hover:gap-3"
                  >
                    VIEW DETAILS
                    <span className="material-icons text-[16px] transition-transform duration-300 group-hover:translate-x-1">
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
