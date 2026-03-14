import hero from "../assets/Hero_shop.png";
import missionImg from "../assets/Hero_shop.png";
import productImg from "../assets/Farma Fer.png";
import commitImg from "../assets/Hero_shop.png";

export default function About() {
  return (
    <div className="bg-[#F5F5F3] text-slate-800 overflow-hidden">
      {/* HERO */}
      <section className="relative">
        <div className="h-[350px] w-full relative group overflow-hidden">
          <img
            src={hero}
            alt="Agri Mitra"
            className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/30"></div>

          <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
            <span className="material-symbols-outlined text-white text-5xl mb-4">
              spa
            </span>

            <h1 className="text-5xl font-extrabold text-white mb-2">
              About Us
            </h1>

            <p className="text-white/90 text-sm tracking-widest uppercase">
              Home &gt; About
            </p>
          </div>

          <span className="material-symbols-outlined absolute left-10 top-20 text-white/30 text-7xl animate-bounce">
            eco
          </span>

          <span className="material-symbols-outlined absolute right-10 bottom-20 text-white/30 text-6xl animate-pulse">
            auto_awesome
          </span>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl font-black mb-8 hover:text-green-700 transition">
            About Us
          </h2>

          <p className="text-slate-600 text-lg leading-relaxed hover:text-slate-800 transition">
            At Agri-Mitra we provide smart fertilizer solutions that help
            farmers grow healthier crops and increase productivity. Our mission
            is to bridge the gap between modern agricultural science and
            real-world farming needs while promoting sustainable soil health.
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 space-y-32">
          {/* MISSION */}
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 relative">
              <span className="material-symbols-outlined absolute -top-10 -left-6 text-4xl text-green-700 opacity-40">
                emergency
              </span>

              <h3 className="text-3xl font-bold mb-6 hover:text-green-700 transition">
                Our Mission
              </h3>

              <ul className="text-slate-500 text-sm leading-relaxed list-disc pl-5 space-y-3 hover:text-slate-700 transition">
                <li>
                  At Agri-Mitra, our mission is to provide top-quality
                  fertilizers that meet the diverse needs of gardeners and
                  farmers while supporting sustainable agriculture.
                </li>

                <li>
                  We aim to empower farmers with reliable agricultural solutions
                  that increase productivity while protecting soil fertility and
                  promoting long-term sustainability.
                </li>
              </ul>
            </div>

            <div className="md:w-1/2 relative flex justify-center">
              <div
                className="w-[380px] aspect-square overflow-hidden shadow-2xl transition duration-500 hover:scale-105"
                style={{
                  clipPath:
                    "polygon(25% 0%,75% 0%,100% 50%,75% 100%,25% 100%,0% 50%)",
                }}
              >
                <img
                  src={missionImg}
                  alt="Mission"
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="material-symbols-outlined absolute -bottom-10 -right-10 text-8xl text-green-700 opacity-20 animate-pulse">
                eco
              </span>
            </div>
          </div>

          {/* PRODUCTS */}
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 relative flex justify-center">
              <div
                className="w-[380px] aspect-square overflow-hidden shadow-2xl transition duration-500 hover:scale-105"
                style={{
                  clipPath:
                    "polygon(25% 0%,75% 0%,100% 50%,75% 100%,25% 100%,0% 50%)",
                }}
              >
                <img
                  src={productImg}
                  alt="Products"
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="material-symbols-outlined absolute -bottom-8 -left-8 text-8xl text-green-700 opacity-20 animate-bounce">
                waves
              </span>
            </div>

            <div className="md:w-1/2 text-right">
              <h3 className="text-3xl font-bold mb-6 hover:text-green-700 transition">
                Our Products
              </h3>

              <ul className="text-slate-500 text-sm leading-relaxed list-disc pl-5 space-y-3 hover:text-slate-700 transition">
                <li>
                  We provide organic, liquid and slow-release fertilizers for
                  farms of every size.
                </li>

                <li>
                  Our products supply essential nutrients for healthy growth,
                  stronger roots and better yields.
                </li>

                <li>
                  Eco-friendly fertilizer solutions that protect soil health and
                  support sustainable agriculture.
                </li>
              </ul>
            </div>
          </div>

          {/* COMMITMENT */}
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <h3 className="text-3xl font-bold mb-6 hover:text-green-700 transition">
                Our Commitment
              </h3>

              <p className="text-slate-500 text-sm leading-relaxed hover:text-slate-700 transition">
                We are committed to helping farmers succeed by providing
                reliable fertilizer products and continuous innovation.
                Agri-Mitra supports sustainable farming practices for a greener
                future.
              </p>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <div
                className="w-[380px] aspect-square overflow-hidden shadow-2xl transition duration-500 hover:scale-105"
                style={{
                  clipPath:
                    "polygon(25% 0%,75% 0%,100% 50%,75% 100%,25% 100%,0% 50%)",
                }}
              >
                <img
                  src={commitImg}
                  alt="Commitment"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-20 bg-[#F5F5F3] border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 hover:text-green-700 transition">
              AGRI-MITRA . We're here
            </h2>

            <p className="text-slate-500 text-sm max-w-lg mx-auto">
              Helping farmers connect with trusted fertilizer suppliers for
              better crop productivity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-20 max-w-4xl mx-auto">
            <div>
              <h4 className="font-bold text-lg mb-4 uppercase">
                Office Location
              </h4>

              <p className="text-slate-500 text-sm leading-relaxed">
                Rajkot <br />
                Gujarat 360001 <br />
                India
              </p>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-4 uppercase">Subscribe</h4>

              <div className="flex border-b border-gray-300 pb-2 items-center">
                <input
                  className="w-full bg-transparent border-none text-sm outline-none"
                  placeholder="Enter your email address"
                />

                <span className="material-symbols-outlined text-green-700 cursor-pointer hover:scale-125 transition">
                  mail
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
