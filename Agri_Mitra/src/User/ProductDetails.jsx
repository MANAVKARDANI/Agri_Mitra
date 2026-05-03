import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { resolveMediaUrl } from "../utils/assetUrl";

const FALLBACK = {
  id: 0,
  name: "Potash",
  price: 499,
  stock: 23,
  description:
    "Our professional-grade fertilizer improves crop quality, strengthens roots, and boosts plant immunity.",
  image:
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop",
};

export default function ProductDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { addItem } = useCart();
  const { showSuccess, showError } = useToast();

  const [quantity, setQuantity] = useState(1);

  const raw = state?.product;
  const product = raw
    ? {
        ...raw,
        image: resolveMediaUrl(raw.image) || FALLBACK.image,
        description: raw.description || FALLBACK.description,
      }
    : FALLBACK;

  const increase = () => {
    if (quantity < Number(product.stock)) {
      setQuantity(quantity + 1);
    }
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const linePayload = () => ({
    name: product.name,
    product_id: product.id,
    price: product.price,
    quantity,
    image: product.image,
    stock: product.stock,
  });

  const handleAddToCart = () => {
    if (!product.id) {
      showError("Open a product from the shop to add it to your cart.");
      return;
    }
    addItem(linePayload());
    showSuccess("Added to cart.");
    navigate("/cart");
  };

  const handleBuyNow = () => {
    if (!product.id) {
      showError("Open a product from the shop to buy.");
      return;
    }
    addItem(linePayload());
    navigate("/billing", {
      state: {
        name: product.name,
        product_id: product.id,
        price: product.price,
        quantity,
        image: product.image,
      },
    });
  };

  return (
    <div className="bg-white text-slate-800 min-h-screen">
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="w-full md:w-1/2">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full object-contain max-h-[420px] transition duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <h1 className="text-5xl font-bold mb-4">{product.name}</h1>

              <p className="text-2xl font-semibold text-gray-700 mb-6">₹{Number(product.price).toFixed(2)}</p>

              <p className="text-gray-500 leading-relaxed mb-10 text-sm">{product.description}</p>

              <div className="flex items-center mb-8">
                <span className="text-sm font-medium uppercase text-gray-500 mr-3">Stock</span>

                <span className="font-bold text-lg">{product.stock}</span>
              </div>

              <div className="flex items-center gap-6 mb-10">
                <div className="flex border border-gray-200 rounded-lg">
                  <button
                    type="button"
                    onClick={decrease}
                    className="px-4 py-2 text-lg hover:text-green-700"
                  >
                    -
                  </button>

                  <span className="px-6 py-2 font-bold">{quantity}</span>

                  <button
                    type="button"
                    onClick={increase}
                    className="px-4 py-2 text-lg hover:text-green-700"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="px-10 py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-xl transition uppercase tracking-widest text-sm shadow-md"
                >
                  Add to cart
                </button>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="px-10 py-4 border-2 border-green-800 text-green-800 font-bold rounded-xl hover:bg-green-800 hover:text-white transition uppercase tracking-widest text-sm"
                >
                  Buy now
                </button>
              </div>
            </div>
          </div>

          <div className="mt-28 border-t pt-16">
            <div className="bg-[#F9F9F7] rounded-3xl p-14">
              <h2 className="text-4xl font-bold text-center mb-6">AGRI-MITRA. We&apos;re here.</h2>

              <p className="text-center text-gray-500 max-w-xl mx-auto mb-12 text-sm">
                Hello, we are AGRI-MITRA. Always beside you when you buy farm products or sell. The best
                results for your harvest are just in sight.
              </p>

              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h4 className="font-bold text-lg mb-3">Office Location</h4>

                  <p className="text-gray-500 text-sm">
                    156 University Road <br />
                    Rajkot - 360005 <br />
                    Gujarat, India
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-3">Get Updates</h4>

                  <div className="flex border-b border-gray-300 pb-2">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full bg-transparent outline-none text-sm"
                    />

                    <button type="button" className="text-green-700 font-semibold">
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
