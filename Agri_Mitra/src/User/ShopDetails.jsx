import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { productsApi } from "../services/api";
import UreaImage from "../assets/UREA.png";
import PotashImage from "../assets/potash.png";
import BioDapImage from "../assets/Bio dap.png";
import CalciumImage from "../assets/Calcium Nitrate.png";

const fallbackImages = [UreaImage, PotashImage, BioDapImage, CalciumImage];

export default function ShopDetails() {
  const { state } = useLocation();
  const shop = state?.shop;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data } = await productsApi.getAll();
        setProducts(
          data.map((product, index) => ({
            ...product,
            image: product.image || fallbackImages[index % fallbackImages.length],
          }))
        );
      } catch {
        setProducts([]);
      }
    };
    loadProducts();
  }, []);

  if (!shop) {
    return (
      <div className="text-center py-40">
        <h1 className="text-2xl font-bold">Shop not found</h1>
        <Link to="/shop" className="text-green-700 underline">
          Back to Shops
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* HERO (NO HOVER EFFECT) */}
      <section className="relative">
        <div className="h-[350px] w-full relative">
          <img
            src={shop.img}
            className="w-full h-full object-cover"
            alt={shop.name}
          />

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
            <h1 className="text-5xl font-bold mb-2">{shop.name}</h1>

            <p className="uppercase tracking-widest text-sm">
              Premium Agricultural Solutions
            </p>
          </div>
        </div>
      </section>

      {/* STORE INFO */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12">
          {/* IMAGE */}
          <div className="overflow-hidden rounded-2xl group">
            <img
              src={shop.img}
              className="rounded-2xl w-full md:w-[520px] object-cover transition duration-700 group-hover:scale-105"
              alt={shop.name}
            />
          </div>

          {/* TEXT */}
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-6">
              Your Partner in Sustainable Farming
            </h2>

            <p className="text-gray-500 mb-8 leading-relaxed">
              Welcome to {shop.name}. We provide high-quality fertilizers and
              professional agricultural nutrients designed to improve crop
              productivity and soil health.
            </p>

            <div className="space-y-4 text-sm text-gray-600">
              <p className="flex items-center gap-2">📍 {shop.address}</p>

              <p className="flex items-center gap-2">
                ⏰ Mon–Fri: 9:00 – 22:00
              </p>

              <p className="flex items-center gap-2">📞 +91 99099 09090</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold mb-10">Our Fertilizers</h2>

        <div className="grid md:grid-cols-3 gap-10">
          {products.map((p) => (
            <div
              key={p.id}
              className="
              bg-white border rounded-3xl p-8 text-center
              transition-all duration-500
              hover:-translate-y-2
              hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]
              group
              "
            >
              {/* IMAGE */}
              <div className="bg-gray-50 rounded-2xl p-10 mb-6 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="
                  h-40 mx-auto object-contain
                  transition duration-500
                  group-hover:scale-110
                  "
                />
              </div>

              {/* TITLE */}
              <h3 className="font-bold mb-6 text-lg">{p.name}</h3>

              {/* BUTTON */}
              <Link
                to="/product-details"
                state={{ product: p, shop }}
                className="inline-block bg-[#F2E8CF] px-8 py-3 rounded-full text-xs uppercase tracking-widest transition-all duration-300 hover:bg-yellow-500 hover:text-white hover:scale-105"
              >
                View Product
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
