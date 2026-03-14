import { Link } from "react-router-dom";

import Hero from "../assets/Hero.png";
import Homebg from "../assets/Homebg.png";

import Nitrogen from "../assets/nitrogen.png";
import Phosphorus from "../assets/Phosphorus.png";
import Potassium from "../assets/Potassium.png";

import BioDAP from "../assets/Bio dap.png";
import Potash from "../assets/potash.png";
import Urea from "../assets/UREA.png";
import Calcium from "../assets/Calcium Nitrate.png";

import lab from "../assets/lab.png";
import store from "../assets/store.png";
import scientist from "../assets/scientist.png";
import tablet from "../assets/tablet.png";

export default function Home() {
  return (
    <div className="bg-white text-gray-800">
      {/* HERO */}
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={Hero}
            alt="Greenhouse farming"
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
              <button
                type="button"
                className="bg-green-800 hover:bg-green-900 text-white px-6 py-3 rounded-lg font-semibold transition hover:scale-105"
              >
                Explore Products
              </button>

              <button
                type="button"
                className="bg-white border border-gray-300 px-6 py-3 rounded-lg font-semibold text-green-800 hover:bg-gray-50 transition hover:scale-105"
              >
                Locate Shops
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PRECISION */}
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
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 skew-x-12 translate-x-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            {/* LEFT IMAGE GRID */}
            <div className="lg:w-1/2">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6 mt-12">
                  <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg h-64">
                    <img
                      src={lab}
                      alt="fertilizer laboratory"
                      className="w-full h-full object-cover hover:scale-105 transition duration-700"
                    />
                  </div>

                  <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg h-48">
                    <img
                      src={store}
                      alt="agriculture store"
                      className="w-full h-full object-cover hover:scale-105 transition duration-700"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg h-48">
                    <img
                      src={scientist}
                      alt="agriculture scientist"
                      className="w-full h-full object-cover hover:scale-105 transition duration-700"
                    />
                  </div>

                  <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg h-64">
                    <img
                      src={tablet}
                      alt="smart farming tablet"
                      className="w-full h-full object-cover hover:scale-105 transition duration-700"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT TEXT */}
            <div className="lg:w-1/2">
              <span className="text-green-600 font-bold tracking-widest uppercase text-xs mb-4 block">
                The 360 Network
              </span>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 leading-tight">
                50+ Certified <br /> Smart Hubs
              </h2>

              <p className="text-gray-500 mb-10 text-lg font-light leading-relaxed">
                Access our network of verified clean-storage facilities. We
                ensure every product maintains its chemical integrity from our
                lab to your soil.
              </p>

              {/* FEATURES */}
              <div className="flex flex-col gap-4">
                <FeatureCard
                  icon="inventory_2"
                  title="Live Stock Monitoring"
                  desc="Updates every 15 minutes"
                />

                <FeatureCard
                  icon="verified_user"
                  title="Quality Assurance"
                  desc="ISO certified storage conditions"
                />
              </div>

              {/* BUTTON */}
              <div className="mt-10">
                <Link to="/shop">
                  <button
                    type="button"
                    className="flex items-center gap-2 bg-white shadow-lg hover:shadow-xl transition px-8 py-3 rounded-xl font-semibold text-gray-800 hover:scale-105"
                  >
                    Locate Nearest Hub
                    <span className="material-symbols-outlined text-lg">
                      near_me
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
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

          <button
            type="button"
            className="mt-16 border border-gray-300 px-8 py-3 rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-100 transition hover:scale-105"
          >
            VIEW ALL PRODUCTS
          </button>
        </div>
      </section>
    </div>
  );
}

/* COMPONENTS */

function ProductCard({ img, title, desc, bg }) {
  return (
    <div className="relative bg-[#F4F4F1] rounded-[40px] p-10 overflow-hidden group hover:shadow-xl transition">
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
    <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition hover:-translate-y-1">
      <div className="bg-gray-100 p-6 rounded-lg flex justify-center items-center">
        <img src={img} alt={name} className="h-20 object-contain" />
      </div>

      <h3 className="mt-6 font-semibold text-gray-800">{name}</h3>

      <p className="text-sm text-gray-400 mt-1">{desc}</p>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-md transition">
      <div className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center text-green-600">
        <span className="material-symbols-outlined">{icon}</span>
      </div>

      <div>
        <h4 className="font-bold text-gray-800">{title}</h4>

        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </div>
  );
}
