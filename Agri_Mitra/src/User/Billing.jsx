import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ordersApi } from "../services/api";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";
import { paymentApi } from "../services/api";

export default function Billing() {
  const [payment, setPayment] = useState("UPI");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();
  const { items, clear } = useCart();
  const { showSuccess, showError } = useToast();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const single = state
    ? [
        {
          name: state.name,
          product_id: state.product_id,
          price: state.price,
          quantity: state.quantity,
        },
      ]
    : [];
  const cartItems = items?.length ? items : single;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handleFinalizeOrder = async (paymentStatus = "Pending", paymentMethod = "Cash") => {
    try {
      const itemsPayload = cartItems.map((item) => ({
        product_id: Number(item.product_id),
        quantity: Number(item.quantity),
        price: Number(item.price),
      }));

      await ordersApi.create({
        status: "pending",
        items: itemsPayload,
        payment_method: paymentMethod,
        payment_status: paymentStatus,
      });

      clear();
      showSuccess("Order placed successfully.");
      navigate("/profile");
    } catch (err) {
      showError(err?.response?.data?.message || "Failed to place order");
    }
  };

  const handleRazorpayPayment = async () => {
    if (!window.Razorpay) {
      showError("Razorpay SDK failed to load. Please check your connection.");
      return;
    }
    
    setIsProcessing(true);
    try {
      // 1. Create order on backend
      const { data: order } = await paymentApi.createOrder(total);

      // 2. Open Razorpay modal
      const options = {
        key: "rzp_test_SaWN0V0vXd7f3q",
        amount: order.amount,
        currency: order.currency,
        name: "Agri Mitra",
        description: "Payment for your harvest products",
        order_id: order.id,
        handler: async (response) => {
          try {
            // 3. Verify payment on backend
            const verifyRes = await paymentApi.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data.success) {
              await handleFinalizeOrder("Paid", payment);
            } else {
              showError("Payment verification failed");
            }
          } catch {
            showError("Payment verification error");
          }
        },

        prefill: {
          name: fullName || user?.name,
          email: user?.email,
          contact: phone,
        },
        theme: {
          color: "#15803d",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response) => {
        showError(response.error.description || "Payment failed");
        setIsProcessing(false);
      });
      rzp.open();
    } catch (err) {
      console.error("Razorpay Error:", err);
      showError(err?.response?.data?.message || "Failed to initialize payment");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cartItems.length) {
      showError("Your cart is empty.");
      return;
    }
    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      showError("Please fill billing details.");
      return;
    }

    if (payment === "UPI" || payment === "Card") {
      await handleRazorpayPayment();
    } else {
      // Cash on delivery
      await handleFinalizeOrder("Pending", "Cash");
    }

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
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="mt-2 w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-700 outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">Phone Number</label>

                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
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
              {cartItems.map((item) => (
                <div key={item.product_id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <p>Rs. {item.price}</p>
                </div>
              ))}

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
              disabled={isProcessing}
              className={`w-full mt-8 text-white py-4 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${
                isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-[#111827] hover:bg-black"
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm & Pay →"
              )}
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
