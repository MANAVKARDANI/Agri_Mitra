export default function Dashboard() {
  return (
    <div className="space-y-6">

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Suppliers</p>
          <h2 className="text-3xl font-bold">125</h2>
          <div className="w-full bg-gray-200 h-2 rounded mt-4">
            <div className="bg-green-600 h-2 rounded w-3/4"></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Fertilizers</p>
          <h2 className="text-3xl font-bold">320</h2>
          <div className="w-full bg-gray-200 h-2 rounded mt-4">
            <div className="bg-green-600 h-2 rounded w-2/3"></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Users</p>
          <h2 className="text-3xl font-bold">500+</h2>
          <div className="w-full bg-gray-200 h-2 rounded mt-4">
            <div className="bg-blue-500 h-2 rounded w-5/6"></div>
          </div>
        </div>

      </div>


      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold">Add Suppliers</h3>
            <p className="text-sm text-gray-500">
              Register a new retail partner
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold">Manage Fertilizers</h3>
            <p className="text-sm text-gray-500">
              Update catalog pricing
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold">View Orders</h3>
            <p className="text-sm text-gray-500">
              Monitor customer orders
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold">View Users</h3>
            <p className="text-sm text-gray-500">
              Manage user database
            </p>
          </div>

        </div>
      </div>


      {/* Chart Section */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">
            Order Trend Activity
          </h3>

          <div className="h-48 bg-gray-100 rounded flex items-end justify-around p-4">
            {[40,60,30,90,50,70,40].map((h,i)=>(
              <div key={i} className="bg-green-600 w-6 rounded"
              style={{height:h}}></div>
            ))}
          </div>
        </div>


        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">
            Latest Registered Shops
          </h3>

          <ul className="space-y-4 text-sm">

            <li>
              <p className="font-semibold">Green Valley Agri</p>
              <span className="text-gray-500">
                2 hours ago • Punjab
              </span>
            </li>

            <li>
              <p className="font-semibold">Farming First Co.</p>
              <span className="text-gray-500">
                5 hours ago • California
              </span>
            </li>

            <li>
              <p className="font-semibold">Nature's Best Ltd</p>
              <span className="text-gray-500">
                1 day ago • Tuscany
              </span>
            </li>

          </ul>

        </div>

      </div>

    </div>
  );
}