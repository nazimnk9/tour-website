"use client"
import { Heart, ShoppingCart, Globe, User } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center mb-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="text-center">
              <div className="text-sm font-bold text-orange-500 tracking-tight">
                GET
                <br />
                YOUR
                <br />
                GUIDE
              </div>
            </div>
          </div>

          {/* Right menu items */}
          <div className="flex items-center gap-6">
            {/* <button className="text-blue-600 text-sm font-medium hover:text-blue-700">Become a supplier</button>

            <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-900">
              <Heart size={20} />
              <span className="text-xs">Wishlist</span>
            </button> */}

            <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-900">
              <ShoppingCart size={20} />
              <span className="text-xs">Cart</span>
            </button>

            <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-900">
              <Globe size={20} />
              <span className="text-xs">EN/USD $</span>
            </button>

            <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-900">
              <User size={20} />
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </div>

        {/* Sub navigation */}
        {/* <div className="flex gap-8">
          <button className="text-gray-700 font-medium hover:text-gray-900 flex items-center gap-1">
            Places to see
            <span className="text-xs">▼</span>
          </button>
          <button className="text-gray-700 font-medium hover:text-gray-900 flex items-center gap-1">
            Things to do
            <span className="text-xs">▼</span>
          </button>
          <button className="text-gray-700 font-medium hover:text-gray-900 flex items-center gap-1">
            Trip inspiration
            <span className="text-xs">▼</span>
          </button>
        </div> */}
      </div>
    </nav>
  )
}
