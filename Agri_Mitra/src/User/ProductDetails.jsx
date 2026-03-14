import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductDetails() {
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  const product = {
    name: "Potash",
    price: 499,
    stock: 23,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC7Jm8GLbEwAHCTT_8QFWbEb-9R6T5YkKeffvSOw14l39IkP7IZZuvfcph_2ist3WMYtZ9-IvgF2A3XjpDKyP1GraRFvOd5eP_wtBNU3gJu1B18qUR4kNQ-ZMIlkGK09oLTTUwp2DgjFgsJO6cSC9Raw1o_qXbAff4YXonKVLIRRxeZZtu5vrKYRENB4NJirbI66WOVgm9Iinpdp4-y1FX8s1Vk_BR03Q-vIfY1KmMEWGetJIkANMqfVEJ9TYqQ8fveWlDBy09zBYF8",
  };

  const increase = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBooking = () => {
    navigate("/billing", {
      state: {
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image,
      },
    });
  };

  return (
    <div className="bg-white text-slate-800 min-h-screen">
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16">
            {/* PRODUCT IMAGE */}
            <div className="w-full md:w-1/2">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg group">
                <img
                  src={product.image}
                  alt="Potash Fertilizer"
                  className="w-full object-contain transition duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* PRODUCT DETAILS */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <h1 className="text-5xl font-bold mb-4">{product.name}</h1>

              <p className="text-2xl font-semibold text-gray-700 mb-6">
                ₹{product.price}.00
              </p>

              <p className="text-gray-500 leading-relaxed mb-10 text-sm">
                Our professional-grade Potash fertilizer improves crop quality,
                strengthens roots, and boosts plant immunity. Perfect for
                farmers looking for better yield and soil health.
              </p>

              {/* STOCK */}
              <div className="flex items-center mb-8">
                <span className="text-sm font-medium uppercase text-gray-500 mr-3">
                  Stock
                </span>

                <span className="font-bold text-lg">{product.stock}</span>
              </div>

              {/* QUANTITY */}
              <div className="flex items-center gap-6 mb-10">
                <div className="flex border border-gray-200 rounded-lg">
                  <button
                    onClick={decrease}
                    className="px-4 py-2 text-lg hover:text-green-700"
                  >
                    -
                  </button>

                  <span className="px-6 py-2 font-bold">{quantity}</span>

                  <button
                    onClick={increase}
                    className="px-4 py-2 text-lg hover:text-green-700"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* ADVANCE BOOKING BUTTON */}
              <button
                onClick={handleBooking}
                className="w-full md:w-auto px-12 py-4 border-2 border-green-800 text-green-800 font-bold rounded-xl hover:bg-green-800 hover:text-white transition uppercase tracking-widest text-sm"
              >
                Advance Booking
              </button>
            </div>
          </div>

          {/* INFORMATION SECTION */}
          <div className="mt-28 border-t pt-16">
            <div className="bg-[#F9F9F7] rounded-3xl p-14">
              <h2 className="text-4xl font-bold text-center mb-6">
                AGRI-MITRA. We're here.
              </h2>

              <p className="text-center text-gray-500 max-w-xl mx-auto mb-12 text-sm">
                Hello, we are AGRI-MITRA. Always beside you when you buy farm
                products or sell. The best results for your harvest are just in
                sight.
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

                    <button className="text-green-700 font-semibold">→</button>
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
