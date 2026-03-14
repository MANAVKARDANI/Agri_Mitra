import { Download, Filter, MoreVertical } from "lucide-react";

export default function Orders() {
  const orders = [
    {
      date: "12-Feb-2025",
      name: "Raj Patel",
      initials: "RP",
      product: "Urea Fertilizer",
      price: "₹500",
      qty: 5,
      status: "Not Collected",
    },
    {
      date: "10-Feb-2025",
      name: "Meera Shah",
      initials: "MS",
      product: "Organic Compost",
      price: "₹800",
      qty: 2,
      status: "Collected",
    },
    {
      date: "09-Feb-2025",
      name: "Aman Verma",
      initials: "AV",
      product: "NPK Mix",
      price: "₹750",
      qty: 3,
      status: "Not Collected",
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* ================= HEADER ================= */}

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Orders
          </h1>

          <p className="text-sm text-gray-500">
            Manage and track all customer fertilizer orders in one place.
          </p>
        </div>

        <div className="flex gap-3">

          <button className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm hover:bg-gray-100">
            <Download size={16} />
            Export CSV
          </button>

          <button className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm hover:bg-gray-100">
            <Filter size={16} />
            Filter
          </button>

        </div>

      </div>


      {/* ================= TABLE ================= */}

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">

        <table className="w-full text-sm">

          {/* Table Head */}
          <thead className="bg-green-50 text-green-700 text-xs uppercase">

            <tr>
              <th className="p-4 text-left">Date</th>
              <th className="text-left">Customer</th>
              <th className="text-left">Product</th>
              <th className="text-left">Price</th>
              <th className="text-left">Quantity</th>
              <th className="text-left">Status</th>
              <th className="text-left">Actions</th>
            </tr>

          </thead>


          {/* Table Body */}
          <tbody>

            {orders.map((order, index) => (

              <tr key={index} className="border-t hover:bg-gray-50">

                <td className="p-4 text-gray-600">
                  {order.date}
                </td>


                {/* Customer */}
                <td className="flex items-center gap-3 p-4">

                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-semibold">
                    {order.initials}
                  </div>

                  {order.name}

                </td>


                <td className="text-gray-700">
                  {order.product}
                </td>

                <td className="font-semibold">
                  {order.price}
                </td>

                <td>
                  {order.qty}
                </td>


                {/* Status */}
                <td>

                  {order.status === "Collected" ? (

                    <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                      ● Collected
                    </span>

                  ) : (

                    <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
                      ● Not Collected
                    </span>

                  )}

                </td>


                {/* Actions */}
                <td>

                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical size={18} />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>


        {/* ================= PAGINATION ================= */}

        <div className="flex justify-between items-center p-4 text-sm text-gray-500">

          Showing 3 of 12 orders

          <div className="flex gap-2 items-center">

            <button className="px-3 py-1 border rounded">
              &lt;
            </button>

            <button className="px-3 py-1 bg-green-700 text-white rounded">
              1
            </button>

            <button className="px-3 py-1 border rounded">
              2
            </button>

            <button className="px-3 py-1 border rounded">
              3
            </button>

            <button className="px-3 py-1 border rounded">
              &gt;
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}