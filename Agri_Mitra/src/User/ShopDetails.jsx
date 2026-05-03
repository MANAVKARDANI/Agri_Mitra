import { useEffect, useMemo, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { productsApi } from "../services/api";
import { resolveMediaUrl } from "../utils/assetUrl";

const PLACEHOLDER_PRODUCT =
  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&auto=format&fit=crop";

export default function ShopDetails() {
  const { state } = useLocation();
  const shop = state?.shop;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data } = await productsApi.getAll();
        setProducts(Array.isArray(data) ? data : []);
      } catch {
        setProducts([]);
      }
    };
    loadProducts();
  }, []);

  const shopProducts = useMemo(() => {
    if (!shop?.id) return products;
    const sid = Number(shop.id);
    const linked = products.filter((p) => Number(p.supplier_id) === sid);
    if (linked.length) return linked;
    return products;
  }, [products, shop]);

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

  const heroSrc = resolveMediaUrl(shop.image) || shop.img;
  const contact = shop.contact || "+91 99099 09090";
  const hours = shop.business_hours || "Mon–Sat: 9:00 – 20:00";

  return (
    <div className="bg-white">
      <section className="relative">
        <div className="h-[350px] w-full relative">
          <img src={heroSrc} className="w-full h-full object-cover" alt={shop.name} />

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
            <h1 className="text-5xl font-bold mb-2">{shop.name}</h1>

            <p className="uppercase tracking-widest text-sm">
              {[shop.village, shop.district, shop.state].filter(Boolean).join(" · ") ||
                "Premium Agricultural Solutions"}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="overflow-hidden rounded-2xl group">
            <img
              src={heroSrc}
              className="rounded-2xl w-full md:w-[520px] h-72 md:h-auto object-cover transition duration-700 group-hover:scale-105"
              alt={shop.name}
            />
          </div>

          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-6">Your Partner in Sustainable Farming</h2>

            <p className="text-gray-500 mb-8 leading-relaxed">
              Welcome to {shop.name}. We provide high-quality fertilizers and professional agricultural
              nutrients designed to improve crop productivity and soil health.
            </p>

            <div className="space-y-4 text-sm text-gray-600">
              <p className="flex items-center gap-2">📍 {shop.address}</p>
              <p className="flex items-center gap-2">⏰ {hours}</p>
              <p className="flex items-center gap-2">📞 {contact}</p>
              {(shop.state || shop.district) && (
                <p className="flex items-center gap-2">
                  🗺️ {[shop.village, shop.city, shop.district, shop.state].filter(Boolean).join(", ")}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold mb-10">Our Fertilizers</h2>

        <div className="grid md:grid-cols-3 gap-10">
          {shopProducts.map((p) => {
            const img = resolveMediaUrl(p.image) || PLACEHOLDER_PRODUCT;
            return (
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
                <div className="bg-gray-50 rounded-2xl p-10 mb-6 overflow-hidden">
                  <img
                    src={img}
                    alt={p.name}
                    className="
                  h-40 mx-auto object-contain
                  transition duration-500
                  group-hover:scale-110
                  "
                  />
                </div>

                <h3 className="font-bold mb-2 text-lg">{p.name}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {p.description || "Quality fertilizer for your farm."}
                </p>
                <p className="text-green-800 font-semibold mb-4">₹{Number(p.price).toFixed(0)}</p>

                <Link
                  to="/product-details"
                  state={{ product: p, shop }}
                  className="inline-block bg-[#F2E8CF] px-8 py-3 rounded-full text-xs uppercase tracking-widest transition-all duration-300 hover:bg-yellow-500 hover:text-white hover:scale-105"
                >
                  View Product
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
