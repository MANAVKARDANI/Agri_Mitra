import { Link } from "react-router-dom";

import Hero from "../assets/Hero.png";
import Homebg from "../assets/Homebg.png";
import Nitrogen from "../assets/nitrogen.png";
import Phosphorus from "../assets/Phosphorus.png";
import Potassium from "../assets/Potassium.png";
import Retail from "../assets/retail.png";
import Warehouse from "../assets/Warehouse Hubs.png";
import BioDAP from "../assets/Bio dap.png";
import Potash from "../assets/potash.png";
import Urea from "../assets/urea.png";
import Calcium from "../assets/Calcium Nitrate.png";

export default function Home() {
  return (
    <div className="bg-white text-gray-800">
      {/* NAVBAR */}
      <nav className="bg-gray-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <span className="text-green-800 font-bold text-xl tracking-tight">
                AGRI-MITRA
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-10 text-sm font-semibold tracking-wide">
              <Link
                to="/"
                className="text-green-800 border-b-2 border-green-800 pb-1"
              >
                HOME
              </Link>

              <Link
                to="/shop"
                className="text-gray-500 hover:text-green-800 transition"
              >
                SHOP
              </Link>

              <Link
                to="/about"
                className="text-gray-500 hover:text-green-800 transition"
              >
                ABOUT
              </Link>

              <Link
                to="/contact"
                className="text-gray-500 hover:text-green-800 transition"
              >
                CONTACT
              </Link>
            </div>

            <div className="flex items-center gap-6 text-gray-600">
              <button className="hover:text-green-800 transition">🔍</button>
              <button className="hover:text-green-800 transition">👤</button>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-[650px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={Hero}
            alt="Greenhouse"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/20"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-xl bg-white/40 backdrop-blur-xl p-10 rounded-3xl shadow-2xl">
            <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-4 py-1 rounded-full uppercase tracking-widest">
              Real-time Stock Alerts
            </span>

            <h1 className="text-5xl font-extrabold text-green-900 mt-6 leading-tight">
              Smart Farming <br />
              <span className="text-gray-700 font-light">Redefined.</span>
            </h1>

            <p className="mt-6 text-gray-600">
              Access premium fertilizers and real-time inventory data from
              modern greenhouses to your local shop.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="bg-green-800 hover:bg-green-900 text-white px-6 py-3 rounded-lg font-semibold transition">
                Explore Products
              </button>

              <button className="bg-white border border-gray-300 px-6 py-3 rounded-lg font-semibold text-green-800 hover:bg-gray-50 transition">
                Locate Shops
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PRECISION SECTION */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl text-green-800 font-medium">
            Precision & Growth
          </h2>

          <div className="w-px h-16 bg-green-800 mx-auto my-6"></div>

          <p className="text-gray-600 text-lg">
            We bridge the gap between advanced agricultural science and
            accessible farming resources. Our platform ensures you find the
            exact nutrient balance for your crops, exactly when you need it.
          </p>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between mb-16">
            <div>
              <h2 className="text-4xl font-bold text-gray-900">
                Essential Nutrients
              </h2>

              <p className="text-gray-500 mt-3 text-lg">
                Curated selection for optimal yield.
              </p>
            </div>

            <Link
              to="/shop"
              className="text-green-700 font-semibold hover:underline"
            >
              View full catalog →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <ProductCard
              img={Nitrogen}
              title="Nitrogen Series"
              desc="Rapid vegetative growth."
              bg={Homebg}
            />

            <ProductCard
              img={Phosphorus}
              title="Phosphorus Boost"
              desc="Robust root systems."
              bg={Homebg}
            />

            <ProductCard
              img={Potassium}
              title="Potassium Shield"
              desc="Disease resistance."
              bg={Homebg}
            />
          </div>
        </div>
      </section>
      

      {/* LOCATE SUPPLIERS */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="max-w-sm">
              <div className="w-10 h-[3px] bg-green-700 mb-6"></div>

              <h2 className="text-4xl font-bold leading-tight text-gray-900">
                Locate <br />
                <span className="text-green-700">Suppliers</span> <br />
                Near You.
              </h2>

              <p className="mt-6 text-gray-500 text-base leading-relaxed">
                Our network connects you with over 50 verified stockists. Check
                real-time availability and secure your supplies before the
                season peaks.
              </p>

              <Link
                to="/shops"
                className="inline-block mt-8 text-green-700 font-semibold hover:underline"
              >
                Start Search
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="relative">
                <img
                  src={Warehouse}
                  alt="Warehouse"
                  className="w-full h-[380px] object-cover shadow-lg"
                />
                <div className="bg-white px-4 py-2 text-sm font-semibold shadow-md absolute bottom-6 left-6">
                  Warehouse Hubs
                </div>
              </div>

              <div className="relative">
                <img
                  src={Retail}
                  alt="Retail"
                  className="w-full h-[240px] object-cover"
                />
                <div className="bg-white px-4 py-2 text-sm font-semibold shadow-md absolute bottom-6 left-6">
                  Retail Partners
                </div>
              </div>

              <img
                src={Hero}
                alt="Greenhouse"
                className="w-full h-[240px] object-cover shadow-lg"
              />

              <div className="border border-gray-200 flex items-center justify-center">
                <div className="text-center py-12 px-10">
                  <div className="text-4xl font-bold text-green-700">50+</div>
                  <div className="text-xs uppercase tracking-widest text-gray-400 mt-2">
                    VERIFIED LOCATIONS
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      

      
      {/* FEATURED SECTION */}
      <section className="py-24 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-green-700 text-xs font-semibold tracking-[0.25em] uppercase">
            Curated For You
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-3">
            Featured Selection
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-14">
            <FeaturedCard img={BioDAP} name="Bio DAP" desc="Organic Compound" />

            <FeaturedCard img={Potash} name="Potash" desc="Potassium Rich" />

            <FeaturedCard img={Urea} name="Urea" desc="High Nitrogen" />

            <FeaturedCard
              img={Calcium}
              name="Calcium Nitrate"
              desc="Soluble Grade"
            />
          </div>

          <button className="mt-16 border border-gray-300 px-8 py-3 rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-100 transition">
            VIEW ALL PRODUCTS
          </button>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="bg-gray-100 border-t border-gray-200 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16">
            <div>
              <h3 className="text-green-800 font-bold text-xl mb-4">
                AGRI-MITRA
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                Empowering modern agriculture through technology, accessibility,
                and sustainable practices. Join the future of farming today.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-6">Home</h4>

              <ul className="space-y-4 text-sm text-gray-500">
                <li>About Us</li>
                <li>Shop</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-6">Contact</h4>

              <ul className="space-y-4 text-sm text-gray-500">
                <li>📍 Rajkot, Gujarat 360001</li>

                <li>✉ agrimitra@gmail.com</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
            <p>© 2026 AGRI-MITRA. All rights reserved.</p>

            <div className="flex gap-8 mt-4 md:mt-0">
              <span>Sitemap</span>
              <span>Cookies</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProductCard({ img, title, desc, bg }) {
  return (
    <div className="relative bg-[#F4F4F1] rounded-[40px] p-10 overflow-hidden group hover:shadow-xl">
      <div className="absolute inset-0 opacity-10">
        <img src={bg} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="relative flex justify-center mb-12">
        <img
          src={img}
          alt={title}
          className="h-64 object-contain group-hover:scale-105 transition"
        />
      </div>

      <div className="relative z-10">
        <h3 className="text-3xl font-bold text-gray-800 mt-4">{title}</h3>
        <p className="text-gray-500 mt-4 text-lg">{desc}</p>
      </div>
    </div>
  );
}


function FeaturedCard({ img, name, desc }) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition">
      <div className="bg-gray-100 p-6 rounded-lg flex justify-center items-center">
        <img
          src={img}
          alt={name}
          className="h-20 object-contain"
        />
      </div>

      <h3 className="mt-6 font-semibold text-gray-800">
        {name}
      </h3>

      <p className="text-sm text-gray-400 mt-1">
        {desc}
      </p>
    </div>
  );
}