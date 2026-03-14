import { useState } from "react";

export default function Billing() {
  const [payment, setPayment] = useState("UPI");

  const product = {
    name: "Potash",
    price: 499,
    qty: 1,
  };

  const subtotal = product.price * product.qty;
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Payment Successful!");
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* BILLING FORM */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border p-8">
            <h2 className="text-xl font-bold mb-8">Billing Details</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* NAME + PHONE */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-500">Full Name</label>

                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    className="mt-2 w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-700 outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">Phone Number</label>

                  <input
                    required
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="mt-2 w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-700 outline-none"
                  />
                </div>
              </div>

              {/* ADDRESS */}
              <div>
                <label className="text-sm text-gray-500">
                  Shipping Address
                </label>

                <textarea
                  required
                  rows="3"
                  placeholder="Street address, City, State, ZIP"
                  className="mt-2 w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-700 outline-none"
                />
              </div>

              {/* PAYMENT METHOD */}
              <div>
                <label className="text-sm text-gray-600">Payment Method</label>

                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <label
                    className={`border rounded-lg p-4 flex items-center gap-2 cursor-pointer ${payment === "UPI" ? "border-green-700 bg-green-50" : ""}`}
                  >
                    <input
                      type="radio"
                      checked={payment === "UPI"}
                      onChange={() => setPayment("UPI")}
                    />
                    UPI
                  </label>

                  <label
                    className={`border rounded-lg p-4 flex items-center gap-2 cursor-pointer ${payment === "Card" ? "border-green-700 bg-green-50" : ""}`}
                  >
                    <input
                      type="radio"
                      checked={payment === "Card"}
                      onChange={() => setPayment("Card")}
                    />
                    Card
                  </label>

                  <label
                    className={`border rounded-lg p-4 flex items-center gap-2 cursor-pointer ${payment === "Cash" ? "border-green-700 bg-green-50" : ""}`}
                  >
                    <input
                      type="radio"
                      checked={payment === "Cash"}
                      onChange={() => setPayment("Cash")}
                    />
                    Cash
                  </label>
                </div>
              </div>
            </form>
          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-white rounded-2xl shadow-sm border p-8 h-fit">
            <h2 className="text-lg font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-gray-400">Qty: {product.qty}</p>
                </div>

                <p>Rs. {product.price}</p>
              </div>

              <hr />

              <div className="flex justify-between">
                <p className="text-gray-500">Subtotal</p>
                <p>Rs. {subtotal.toFixed(2)}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-500">Tax (GST 5%)</p>
                <p>Rs. {tax.toFixed(2)}</p>
              </div>

              <div className="flex justify-between font-semibold text-lg">
                <p>Total</p>
                <p className="text-yellow-600">Rs. {total.toFixed(2)}</p>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full mt-8 bg-[#111827] text-white py-4 rounded-xl font-semibold hover:bg-black transition"
            >
              Confirm & Pay →
            </button>

            <p className="text-xs text-gray-400 text-center mt-4">
              Secure SSL Encrypted Payment
            </p>
          </div>
        </div>

        {/* INFO SECTION (same as screenshot bottom section) */}

        <div className="mt-24">
          <div className="bg-[#EEF0F2] rounded-3xl p-14 text-center">
            <h2 className="text-3xl font-bold mb-4">
              AGRI-MITRA . We're here.
            </h2>

            <p className="text-gray-500 text-sm max-w-xl mx-auto mb-12">
              Hello, we are AGRI-MITRA. Always beside you when you buy farm
              products or sell. The best results for your harvest are just in
              sight.
            </p>

            <div className="grid md:grid-cols-2 gap-10 text-left">
              <div>
                <h4 className="font-semibold mb-2">Office Location</h4>

                <p className="text-gray-500 text-sm">
                  156 University, City Rajkot <br />
                  360005 Gujarat <br />
                  India
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Get Updates</h4>

                <div className="flex border-b pb-2">
                  <input
                    placeholder="Your email address"
                    className="bg-transparent outline-none w-full text-sm"
                  />

                  <button className="text-green-700 font-semibold">→</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
