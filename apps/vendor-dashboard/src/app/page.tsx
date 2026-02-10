import { Button, TrustScoreBadge } from '@nc/ui';
import Link from 'next/link';

export default function VendorDashboard() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b-4 border-white/20 p-4 bg-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-black">Nc Vendor Dashboard</h1>
          <div className="flex items-center gap-4">
            <TrustScoreBadge score={85} />
            <Button variant="outline" size="sm">Profile</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 border-4 border-white/20 p-6 shadow-[8px_8px_0px_rgba(255,255,255,0.1)]">
            <div className="text-gray-400 text-sm mb-2">Total Sales</div>
            <div className="text-3xl font-black">₹2,45,890</div>
            <div className="text-green-400 text-sm mt-2">+12% from last month</div>
          </div>
          <div className="bg-gray-800 border-4 border-white/20 p-6 shadow-[8px_8px_0px_rgba(255,255,255,0.1)]">
            <div className="text-gray-400 text-sm mb-2">Active Orders</div>
            <div className="text-3xl font-black">47</div>
            <div className="text-yellow-400 text-sm mt-2">3 pending dispatch</div>
          </div>
          <div className="bg-gray-800 border-4 border-white/20 p-6 shadow-[8px_8px_0px_rgba(255,255,255,0.1)]">
            <div className="text-gray-400 text-sm mb-2">Products</div>
            <div className="text-3xl font-black">128</div>
            <div className="text-gray-400 text-sm mt-2">12 low stock</div>
          </div>
          <div className="bg-gray-800 border-4 border-white/20 p-6 shadow-[8px_8px_0px_rgba(255,255,255,0.1)]">
            <div className="text-gray-400 text-sm mb-2">Trust Score</div>
            <div className="text-3xl font-black">85/100</div>
            <div className="text-green-400 text-sm mt-2">Trusted Seller</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-black mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="accent" size="lg" className="w-full">
              📦 Add New Product
            </Button>
            <Button variant="secondary" size="lg" className="w-full">
              📄 Generate GST Invoice
            </Button>
            <Button variant="primary" size="lg" className="w-full">
              📊 View Analytics
            </Button>
          </div>
        </div>

        {/* AI Inventory Insights */}
        <div className="mb-8">
          <h2 className="text-2xl font-black mb-4">🤖 AI Inventory Insights</h2>
          <div className="bg-gray-800 border-4 border-green-400 p-6 shadow-[8px_8px_0px_rgba(74,222,128,0.3)]">
            <div className="flex items-start gap-4">
              <div className="text-4xl">💡</div>
              <div className="flex-1">
                <h3 className="font-black text-xl mb-2">Stock Optimization Alert</h3>
                <p className="text-gray-300 mb-4">
                  Your <strong>Blue Cotton Kurtas</strong> are selling 30% faster in Bangalore. 
                  Consider moving 50 units to Devanahalli warehouse to reduce delivery time.
                </p>
                <div className="flex gap-4">
                  <Button variant="accent" size="sm">Move Stock</Button>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Score Breakdown */}
        <div className="mb-8">
          <h2 className="text-2xl font-black mb-4">Trust Score Breakdown</h2>
          <div className="bg-gray-800 border-4 border-white/20 p-6 shadow-[8px_8px_0px_rgba(255,255,255,0.1)]">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Return Rate (30%)</span>
                  <span className="text-sm font-bold">90/100</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-400" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Dispatch Speed (25%)</span>
                  <span className="text-sm font-bold">85/100</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-400" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Authenticity (25%)</span>
                  <span className="text-sm font-bold">88/100</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-400" style={{ width: '88%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Customer Rating (20%)</span>
                  <span className="text-sm font-bold">75/100</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div>
          <h2 className="text-2xl font-black mb-4">Recent Orders</h2>
          <div className="bg-gray-800 border-4 border-white/20 shadow-[8px_8px_0px_rgba(255,255,255,0.1)]">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b-2 border-white/20">
                  <tr>
                    <th className="text-left p-4 font-black">Order ID</th>
                    <th className="text-left p-4 font-black">Customer</th>
                    <th className="text-left p-4 font-black">Amount</th>
                    <th className="text-left p-4 font-black">Status</th>
                    <th className="text-left p-4 font-black">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="p-4 font-mono text-sm">#ORD001</td>
                    <td className="p-4">Rahul Sharma</td>
                    <td className="p-4 font-bold">₹2,499</td>
                    <td className="p-4">
                      <span className="bg-yellow-400 text-black px-2 py-1 text-xs font-bold">
                        Pending
                      </span>
                    </td>
                    <td className="p-4">
                      <Button variant="accent" size="sm">Dispatch</Button>
                    </td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-4 font-mono text-sm">#ORD002</td>
                    <td className="p-4">Priya Patel</td>
                    <td className="p-4 font-bold">₹1,299</td>
                    <td className="p-4">
                      <span className="bg-blue-400 text-black px-2 py-1 text-xs font-bold">
                        Shipped
                      </span>
                    </td>
                    <td className="p-4">
                      <Button variant="outline" size="sm">Track</Button>
                    </td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-4 font-mono text-sm">#ORD003</td>
                    <td className="p-4">Amit Kumar</td>
                    <td className="p-4 font-bold">₹3,599</td>
                    <td className="p-4">
                      <span className="bg-green-400 text-black px-2 py-1 text-xs font-bold">
                        Delivered
                      </span>
                    </td>
                    <td className="p-4">
                      <Button variant="outline" size="sm">Invoice</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
