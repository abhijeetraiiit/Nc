import { BentoGrid, BentoItem, Button, ProductCard } from '@nc/ui';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b-4 border-black p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-black">Nc</h1>
          <nav className="flex gap-4">
            <Button variant="outline" size="sm">Login</Button>
            <Button variant="primary" size="sm">Sign Up</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-6xl font-black mb-4">
            Shop Like Never Before
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            India&apos;s most modern multivendor marketplace with AI-powered discovery
          </p>
          <Button variant="accent" size="lg">
            Explore Now
          </Button>
        </div>
      </section>

      {/* Social Proof Ticker */}
      <section className="bg-black text-white py-4 mb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 overflow-hidden">
            <span className="font-bold whitespace-nowrap">🔥 Trending in Lucknow:</span>
            <span className="whitespace-nowrap">Red Banarasi Saree</span>
            <span className="mx-4">•</span>
            <span className="font-bold whitespace-nowrap">🔥 Trending in Mumbai:</span>
            <span className="whitespace-nowrap">Premium Cotton Kurta</span>
            <span className="mx-4">•</span>
            <span className="font-bold whitespace-nowrap">🔥 Trending in Bangalore:</span>
            <span className="whitespace-nowrap">Organic Spice Collection</span>
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <h3 className="text-3xl font-black mb-8">Discover Categories</h3>
        <BentoGrid columns={3} gap={24}>
          <BentoItem span={2} rowSpan={2}>
            <div className="h-full flex flex-col justify-between">
              <div>
                <h4 className="text-2xl font-black mb-2">Fashion</h4>
                <p className="text-gray-600">Ethnic & Western wear for all occasions</p>
              </div>
              <div className="mt-4">
                <Button variant="primary">Shop Fashion</Button>
              </div>
            </div>
          </BentoItem>
          
          <BentoItem>
            <h4 className="text-xl font-black mb-2">Electronics</h4>
            <p className="text-sm text-gray-600">Latest gadgets & tech</p>
          </BentoItem>
          
          <BentoItem>
            <h4 className="text-xl font-black mb-2">Home & Living</h4>
            <p className="text-sm text-gray-600">Decor & essentials</p>
          </BentoItem>
          
          <BentoItem>
            <h4 className="text-xl font-black mb-2">Beauty</h4>
            <p className="text-sm text-gray-600">Cosmetics & skincare</p>
          </BentoItem>
          
          <BentoItem span={2}>
            <h4 className="text-xl font-black mb-2">Grocery</h4>
            <p className="text-sm text-gray-600">Fresh produce & daily essentials</p>
          </BentoItem>
        </BentoGrid>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-3xl font-black">Trending Now</h3>
          <Link href="/products" className="text-sm font-bold underline">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard
            title="Red Banarasi Saree"
            price={2499}
            mrp={4999}
            image="https://via.placeholder.com/400"
            badge="Trending"
          />
          <ProductCard
            title="Premium Cotton Kurta"
            price={999}
            mrp={1999}
            image="https://via.placeholder.com/400"
          />
          <ProductCard
            title="Organic Spice Collection"
            price={599}
            mrp={899}
            image="https://via.placeholder.com/400"
            badge="GI Tagged"
          />
          <ProductCard
            title="Handcrafted Pottery Set"
            price={1299}
            mrp={2199}
            image="https://via.placeholder.com/400"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 mb-16">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-black mb-8 text-center">Why Choose Nc?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="brutal-border brutal-shadow p-6 bg-white">
              <div className="text-4xl mb-4">🇮🇳</div>
              <h4 className="text-xl font-black mb-2">India-First</h4>
              <p className="text-gray-600">
                Vernacular support in 12+ Indian languages with WhatsApp checkout
              </p>
            </div>
            <div className="brutal-border brutal-shadow p-6 bg-white">
              <div className="text-4xl mb-4">🤖</div>
              <h4 className="text-xl font-black mb-2">AI-Powered</h4>
              <p className="text-gray-600">
                Voice commerce and personalized recommendations just for you
              </p>
            </div>
            <div className="brutal-border brutal-shadow p-6 bg-white">
              <div className="text-4xl mb-4">⚡</div>
              <h4 className="text-xl font-black mb-2">Hyper-Local Delivery</h4>
              <p className="text-gray-600">
                Hour-level delivery estimates for metro cities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-black py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className="font-black mb-4">About Nc</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/press">Press</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-black mb-4">For Vendors</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="/vendor/register">Become a Seller</Link></li>
                <li><Link href="/vendor/login">Vendor Login</Link></li>
                <li><Link href="/vendor/resources">Resources</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-black mb-4">Support</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="/help">Help Center</Link></li>
                <li><Link href="/returns">Returns</Link></li>
                <li><Link href="/shipping">Shipping Info</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-black mb-4">Legal</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
                <li><Link href="/grievance">Grievance Officer</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t-4 border-black pt-8 text-center">
            <p className="text-sm text-gray-600">
              © 2026 Nc E-commerce. All rights reserved. Built with ❤️ for India.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Grievance Officer: grievance@nc-ecommerce.in | +91-1234567890
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
