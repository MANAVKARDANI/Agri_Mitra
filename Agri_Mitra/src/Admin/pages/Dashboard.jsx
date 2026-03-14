import {
  Store,
  FlaskConical,
  Users,
  UserPlus,
  Package,
  ClipboardList,
} from "lucide-react";

export default function Dashboard() {
  const chartData = [40, 70, 35, 95, 60, 75, 50];
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  return (
    <div className="space-y-8">
      {/* ================= STATS ================= */}

      <div className="grid md:grid-cols-3 gap-6">
        {/* Suppliers */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg text-green-700">
              <Store size={20} />
            </div>

            <span className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded">
              +12%
            </span>
          </div>

          <p className="text-gray-500 text-sm">Total Suppliers</p>

          <h2 className="text-3xl font-bold mt-1">125</h2>

          <div className="w-full bg-gray-200 h-2 rounded mt-4">
            <div className="bg-green-700 h-2 rounded w-3/4"></div>
          </div>
        </div>

        {/* Fertilizers */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg text-green-700">
              <FlaskConical size={20} />
            </div>

            <span className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded">
              +5%
            </span>
          </div>

          <p className="text-gray-500 text-sm">Total Fertilizers</p>

          <h2 className="text-3xl font-bold mt-1">320</h2>

          <div className="w-full bg-gray-200 h-2 rounded mt-4">
            <div className="bg-green-700 h-2 rounded w-2/3"></div>
          </div>
        </div>

        {/* Users */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
              <Users size={20} />
            </div>

            <span className="text-blue-600 text-xs bg-blue-100 px-2 py-1 rounded">
              +18%
            </span>
          </div>

          <p className="text-gray-500 text-sm">Total Users</p>

          <h2 className="text-3xl font-bold mt-1">500+</h2>

          <div className="w-full bg-gray-200 h-2 rounded mt-4">
            <div className="bg-blue-500 h-2 rounded w-5/6"></div>
          </div>
        </div>
      </div>

      {/* ================= QUICK ACTIONS ================= */}

      <div>
        <h2 className="text-xl font-semibold">Quick Actions</h2>

        <p className="text-gray-500 text-sm mb-6">
          Efficiently manage your day-to-day operations
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Add Supplier */}
          <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="bg-green-100 p-3 w-fit rounded-lg text-green-700 mb-4">
              <UserPlus size={20} />
            </div>

            <h3 className="font-semibold">Add Suppliers</h3>

            <p className="text-sm text-gray-500">
              Register a new retail partner to the network
            </p>
          </div>

          {/* Manage Fertilizers */}
          <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="bg-green-100 p-3 w-fit rounded-lg text-green-700 mb-4">
              <Package size={20} />
            </div>

            <h3 className="font-semibold">Manage Fertilizers</h3>

            <p className="text-sm text-gray-500">
              Update catalog pricing and stock levels
            </p>
          </div>

          {/* Orders */}
          <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="bg-green-100 p-3 w-fit rounded-lg text-green-700 mb-4">
              <ClipboardList size={20} />
            </div>

            <h3 className="font-semibold">View All Orders</h3>

            <p className="text-sm text-gray-500">
              Monitor and process recent customer orders
            </p>
          </div>

          {/* Users */}
          <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="bg-green-100 p-3 w-fit rounded-lg text-green-700 mb-4">
              <Users size={20} />
            </div>

            <h3 className="font-semibold">View All Users</h3>

            <p className="text-sm text-gray-500">
              Access and manage the user database
            </p>
          </div>
        </div>
      </div>

      {/* ================= CHART + SHOPS ================= */}

      <div className="grid md:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl border shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-800">
              Order Trend Activity
            </h3>

            <span className="text-xs bg-gray-100 px-3 py-1 rounded-md text-gray-600">
              Last 7 Days
            </span>
          </div>

          <div className="bg-gray-100 rounded-2xl p-8">
            <div className="flex items-end justify-between h-48">
              {chartData.map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div
                    className={`w-10 rounded-lg transition-all duration-300 hover:scale-105 ${
                      i === 3 ? "bg-green-700" : "bg-green-300"
                    }`}
                    style={{ height: `${h}px` }}
                  ></div>

                  <span className="text-xs text-gray-400 font-medium">
                    {days[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Shops */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-semibold mb-5">Latest Registered Shops</h3>

          <ul className="space-y-5 text-sm">
            <li>
              <p className="font-semibold">Green Valley Agri</p>
              <span className="text-gray-500 text-xs">
                2 hours ago • Punjab
              </span>
            </li>

            <li>
              <p className="font-semibold">Farming First Co.</p>
              <span className="text-gray-500 text-xs">
                5 hours ago • California
              </span>
            </li>

            <li>
              <p className="font-semibold">Nature's Best Ltd</p>
              <span className="text-gray-500 text-xs">1 day ago • Tuscany</span>
            </li>
          </ul>

          <button className="mt-6 w-full bg-gray-100 hover:bg-gray-200 text-sm py-2 rounded-lg">
            VIEW ALL SHOPS
          </button>
        </div>
      </div>
    </div>
  );
}
