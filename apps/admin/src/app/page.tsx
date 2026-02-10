import { Button } from '@nc/ui';
import Link from 'next/link';

export default function AdminPanel() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b-4 border-black p-4 bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-black">Nc Admin Panel</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">Settings</Button>
            <Button variant="primary" size="sm">Logout</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white brutal-border brutal-shadow p-6">
            <div className="text-gray-600 text-sm mb-2">Total Vendors</div>
            <div className="text-3xl font-black">1,247</div>
            <div className="text-green-600 text-sm mt-2">+23 this week</div>
          </div>
          <div className="bg-white brutal-border brutal-shadow p-6">
            <div className="text-gray-600 text-sm mb-2">Active Products</div>
            <div className="text-3xl font-black">45,892</div>
            <div className="text-gray-600 text-sm mt-2">128 pending review</div>
          </div>
          <div className="bg-white brutal-border brutal-shadow p-6">
            <div className="text-gray-600 text-sm mb-2">Total Orders</div>
            <div className="text-3xl font-black">89,234</div>
            <div className="text-green-600 text-sm mt-2">+12% from last month</div>
          </div>
          <div className="bg-white brutal-border brutal-shadow p-6">
            <div className="text-gray-600 text-sm mb-2">Platform GMV</div>
            <div className="text-3xl font-black">₹8.9Cr</div>
            <div className="text-green-600 text-sm mt-2">+18% growth</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/admin/vendors/pending" className="block">
            <div className="bg-yellow-100 brutal-border brutal-shadow p-6 hover:translate-x-[-4px] hover:translate-y-[-4px] transition-transform">
              <div className="text-4xl mb-2">👤</div>
              <h3 className="font-black text-xl mb-2">Vendor Approvals</h3>
              <p className="text-gray-700">15 vendors pending approval</p>
            </div>
          </Link>
          <Link href="/admin/products/gi-tag" className="block">
            <div className="bg-green-100 brutal-border brutal-shadow p-6 hover:translate-x-[-4px] hover:translate-y-[-4px] transition-transform">
              <div className="text-4xl mb-2">✅</div>
              <h3 className="font-black text-xl mb-2">GI-Tag Verification</h3>
              <p className="text-gray-700">8 products awaiting verification</p>
            </div>
          </Link>
          <Link href="/admin/compliance" className="block">
            <div className="bg-blue-100 brutal-border brutal-shadow p-6 hover:translate-x-[-4px] hover:translate-y-[-4px] transition-transform">
              <div className="text-4xl mb-2">⚖️</div>
              <h3 className="font-black text-xl mb-2">Compliance Monitor</h3>
              <p className="text-gray-700">All systems compliant</p>
            </div>
          </Link>
        </div>

        {/* Compliance Dashboard */}
        <div className="mb-8">
          <h2 className="text-2xl font-black mb-4">Compliance Status</h2>
          <div className="bg-white brutal-border brutal-shadow p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 border-2 border-green-600">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">✅</span>
                  <div>
                    <div className="font-black">DPDP Act 2023</div>
                    <div className="text-sm text-gray-600">Consent manager active, 2,345 data requests processed</div>
                  </div>
                </div>
                <span className="text-green-600 font-bold">Compliant</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 border-2 border-green-600">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">✅</span>
                  <div>
                    <div className="font-black">GST Automation</div>
                    <div className="text-sm text-gray-600">1,247 vendors registered, TCS deductions active</div>
                  </div>
                </div>
                <span className="text-green-600 font-bold">Compliant</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 border-2 border-green-600">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">✅</span>
                  <div>
                    <div className="font-black">Legal Metrology</div>
                    <div className="text-sm text-gray-600">All products display unit pricing and manufacturer details</div>
                  </div>
                </div>
                <span className="text-green-600 font-bold">Compliant</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 border-2 border-green-600">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">✅</span>
                  <div>
                    <div className="font-black">Consumer Protection</div>
                    <div className="text-sm text-gray-600">Grievance officer assigned, 24h response SLA met</div>
                  </div>
                </div>
                <span className="text-green-600 font-bold">Compliant</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 border-2 border-green-600">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">✅</span>
                  <div>
                    <div className="font-black">FDI Policy</div>
                    <div className="text-sm text-gray-600">Marketplace model verified, no inventory ownership</div>
                  </div>
                </div>
                <span className="text-green-600 font-bold">Compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Vendor Applications */}
        <div>
          <h2 className="text-2xl font-black mb-4">Recent Vendor Applications</h2>
          <div className="bg-white brutal-border brutal-shadow">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b-4 border-black">
                  <tr>
                    <th className="text-left p-4 font-black">Business Name</th>
                    <th className="text-left p-4 font-black">GSTIN</th>
                    <th className="text-left p-4 font-black">Applied</th>
                    <th className="text-left p-4 font-black">Status</th>
                    <th className="text-left p-4 font-black">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b-2 border-gray-200">
                    <td className="p-4 font-bold">Artisan Crafts India</td>
                    <td className="p-4 font-mono text-sm">27AABCU9603R1ZM</td>
                    <td className="p-4 text-sm">2 hours ago</td>
                    <td className="p-4">
                      <span className="bg-yellow-400 text-black px-3 py-1 text-xs font-bold border-2 border-black">
                        Pending
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button variant="accent" size="sm">Approve</Button>
                        <Button variant="outline" size="sm">Review</Button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b-2 border-gray-200">
                    <td className="p-4 font-bold">Premium Textiles Co.</td>
                    <td className="p-4 font-mono text-sm">09AADCP2626F1ZT</td>
                    <td className="p-4 text-sm">5 hours ago</td>
                    <td className="p-4">
                      <span className="bg-yellow-400 text-black px-3 py-1 text-xs font-bold border-2 border-black">
                        Pending
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button variant="accent" size="sm">Approve</Button>
                        <Button variant="outline" size="sm">Review</Button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b-2 border-gray-200">
                    <td className="p-4 font-bold">Organic Foods Ltd</td>
                    <td className="p-4 font-mono text-sm">29AAGCC7409R1ZT</td>
                    <td className="p-4 text-sm">1 day ago</td>
                    <td className="p-4">
                      <span className="bg-green-400 text-black px-3 py-1 text-xs font-bold border-2 border-black">
                        Approved
                      </span>
                    </td>
                    <td className="p-4">
                      <Button variant="outline" size="sm">View</Button>
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
