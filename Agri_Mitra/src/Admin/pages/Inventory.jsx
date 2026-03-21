import {
  PlusCircle,
  Search,
  Filter,
  Download,
  Leaf,
  Droplet,
  AlertTriangle,
  Truck,
  Printer,
  Wand2,
  Pencil,
  Trash2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function Fertilizers() {
  const navigate = useNavigate();

  const fertilizers = [
    {
      name: "Urea Fertilizer",
      supplier: "Green Agro",
      price: "₹500",
      stock: "200 units",
      stockColor: "bg-green-100 text-green-700",
      status: "High Stock",
      statusColor: "text-green-600",
      icon: <Leaf size={18} className="text-green-600" />,
    },
    {
      name: "Organic Compost",
      supplier: "Organic Hub",
      price: "₹800",
      stock: "150 units",
      stockColor: "bg-yellow-100 text-yellow-700",
      status: "Moderate",
      statusColor: "text-yellow-600",
      icon: <Leaf size={18} className="text-orange-500" />,
    },
    {
      name: "Liquid Nitrogen",
      supplier: "Chemical Pros",
      price: "₹1,200",
      stock: "12 units",
      stockColor: "bg-red-100 text-red-700",
      status: "Critical",
      statusColor: "text-red-600",
      icon: <Droplet size={18} className="text-red-500" />,
    },
  ];

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* HEADER */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">All Fertilizers</h1>

          <p className="text-sm text-gray-500">
            Manage and track your agricultural supply stock across all
            suppliers.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/add-fertilizer")}
          className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg text-sm"
        >
          <PlusCircle size={18} />
          Add New Fertilizer
        </button>
      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex justify-between mb-4">
            <p className="text-sm text-gray-500">Total Stock</p>
            <Leaf className="text-green-600" />
          </div>

          <h2 className="text-2xl font-bold">
            350 <span className="text-gray-400 text-sm">Units</span>
          </h2>

          <p className="text-green-600 text-xs mt-2">+12% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex justify-between mb-4">
            <p className="text-sm text-gray-500">Low Stock Alert</p>
            <AlertTriangle className="text-yellow-500" />
          </div>

          <h2 className="text-2xl font-bold">
            2 <span className="text-gray-400 text-sm">Items</span>
          </h2>

          <p className="text-xs text-gray-400 mt-2">
            Requires immediate reorder
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex justify-between mb-4">
            <p className="text-sm text-gray-500">Active Suppliers</p>
            <Truck className="text-blue-500" />
          </div>

          <h2 className="text-2xl font-bold">
            12 <span className="text-gray-400 text-sm">Partners</span>
          </h2>

          <p className="text-xs text-gray-400 mt-2">Across 3 regional hubs</p>
        </div>
      </div>

      {/* SEARCH */}

      <div className="bg-white border rounded-xl p-4 flex justify-between items-center">
        <div className="flex items-center gap-3 w-1/2">
          <Search className="text-gray-400" />
          <input
            placeholder="Search fertilizers, brands, or types..."
            className="outline-none w-full text-sm"
          />
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 border px-3 py-2 rounded-lg text-sm">
            <Filter size={16} />
            Filter
          </button>

          <button className="flex items-center gap-2 border px-3 py-2 rounded-lg text-sm">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* TABLE */}

      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          {/* HEADER */}

          <thead className="bg-green-50 text-gray-600 text-xs uppercase border-b">
            <tr>
              <th className="p-4 text-left font-semibold">Fertilizer Name</th>

              <th className="text-left font-semibold">Supplier</th>

              <th className="text-left font-semibold">Price</th>

              <th className="text-left font-semibold">Stock Level</th>

              <th className="text-left font-semibold">Status</th>

              <th className="text-left font-semibold">Actions</th>
            </tr>
          </thead>

          {/* BODY */}

          <tbody>
            {fertilizers.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                {/* NAME */}

                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      {item.icon}
                    </div>

                    <span className="font-medium text-gray-800">
                      {item.name}
                    </span>
                  </div>
                </td>

                {/* SUPPLIER */}

                <td className="text-gray-600">{item.supplier}</td>

                {/* PRICE */}

                <td className="font-semibold text-gray-800">{item.price}</td>

                {/* STOCK */}

                <td>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${item.stockColor}`}
                  >
                    {item.stock}
                  </span>
                </td>

                {/* STATUS */}

                <td>
                  <div
                    className={`flex items-center gap-2 text-xs font-medium ${item.statusColor}`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current"></span>

                    {item.status}
                  </div>
                </td>

                {/* ACTIONS */}

                <td>
                  <div className="flex items-center gap-4 text-gray-400">
                    <button className="hover:text-blue-600 transition">
                      <Pencil size={16} />
                    </button>

                    <button className="hover:text-red-600 transition">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* PAGINATION */}

        <div className="flex justify-between items-center p-4 text-sm text-gray-500">
          <span>Showing 3 of 42 fertilizers</span>

          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded">1</button>
            <button className="px-3 py-1 border rounded">2</button>
            <button className="px-3 py-1 border rounded">3</button>
          </div>
        </div>
      </div>

      {/* BOTTOM CARDS */}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <Wand2 className="text-green-700" />

            <h3 className="font-semibold">Smart Inventory Optimization</h3>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Let our AI analyze your soil reports to suggest the optimal
            fertilizer restocking levels.
          </p>

          <button className="text-green-700 text-sm font-medium">
            Run Analysis →
          </button>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <Printer className="text-green-700" />

            <h3 className="font-semibold">Batch Print Labels</h3>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Generate QR labels for warehouse tracking system.
          </p>

          <button className="border px-4 py-2 rounded-lg text-sm">
            Generate Labels
          </button>
        </div>
      </div>
    </div>
  );
}
