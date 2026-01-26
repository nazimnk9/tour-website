"use client"
import Link from "next/link"
import { Heart, ShoppingCart, Globe, User, LogIn, Bell, Sun, HelpCircle, Smartphone, ChevronRight, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"
import { RegisterModal } from "./auth/RegisterModal"
import { LoginModal } from "./auth/LoginModal"
import { isLoggedIn, removeTokens } from "@/services/authService"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { fetchCartCount } from "@/lib/features/cart/cartSlice"

export default function Navbar() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isLoggedInState, setIsLoggedInState] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const dispatch = useAppDispatch()
  const cart = useAppSelector((state) => state.cart)

  useEffect(() => {
    dispatch(fetchCartCount())
  }, [dispatch])

  useEffect(() => {
    setIsLoggedInState(isLoggedIn())
  }, [])

  const handleLogout = () => {
    removeTokens()
    setIsLoggedInState(false)
  }

  const openRegister = () => {
    setIsRegisterOpen(true)
    setIsLoginOpen(false)
  }

  const openLogin = () => {
    setIsLoginOpen(true)
    setIsRegisterOpen(false)
  }

  return (
    <>
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={openLogin}
      />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={openRegister}
        onLoginSuccess={() => setIsLoggedInState(true)}
      />
      <nav className="w-full bg-white shadow-sm">
        {/* Top bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex justify-between items-center mb-1">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="text-center">
                <Link href="/" className="block cursor-pointer">
                  <img
                    src="/images/logo_city_roam_tickets-transparent.png"   // <- put your logo file in /public/images/logo.png
                    alt="City Rome Tickets"
                    className="h-25 w-auto md:h-22 sm:h-22"
                  />
                </Link>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/tour" className="text-gray-600 font-medium hover:text-[#ff5533] text-sm">
                Tours
              </Link>
              <Link href="/about-us" className="text-gray-600 font-medium hover:text-[#ff5533] text-sm">
                About us
              </Link>
              <Link href="/contact" className="text-gray-600 font-medium hover:text-[#ff5533] text-sm">
                Contact
              </Link>
            </div>

            {/* Right menu items */}
            <div className="flex items-center gap-6">
              {/* <button className="text-blue-600 text-sm font-medium hover:text-blue-700">Become a supplier</button>
            
            <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-900">
              <Heart size={20} />
              <span className="text-xs">Wishlist</span>
            </button> */}

              <Link href="/cart" className="relative group flex flex-col items-center gap-1 text-gray-600 hover:text-gray-900 cursor-pointer">
                <div className="relative">
                  <ShoppingCart size={20} />
                  {cart.count > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                      {cart.count}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium">Cart</span>
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <button className="relative group flex flex-col items-center gap-1 text-gray-600 hover:text-gray-900 cursor-pointer">
                <Globe size={20} />
                <span className="text-xs font-medium">EN</span>
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </button>

              <div className="relative group z-50">
                <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-900 cursor-pointer">
                  <User size={20} />
                  <span className="text-xs font-medium">Profile</span>
                  <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                </button>

                {/* Profile Dropdown */}
                <div className="absolute right-0 top-full pt-[10px] w-80 hidden group-hover:block transition-all duration-200 z-[100]">
                  <div className="bg-white rounded-xl shadow-[0_2px_20px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4 bg-transparent">
                      <h3 className="text-xl font-bold text-[#051036] mb-4 text-left">Profile</h3>

                      {!isLoggedInState && (
                        <div
                          onClick={openRegister}
                          className="flex items-center gap-3 p-3 -mx-4 hover:bg-gray-50 bg-[#F5F7FA] transition-colors cursor-pointer mb-2"
                        >
                          <div className="ml-4">
                            <LogIn size={20} className="text-[#051036] stroke-[1.5]" />
                          </div>
                          <span className="text-[15px] font-medium text-[#051036]">Log in or sign up</span>
                        </div>
                      )}

                      <div className="border-b border-gray-100 my-2 -mx-4"></div>

                      <div className="space-y-1 mt-2">
                        <Link href="/settings" className="flex items-center justify-between py-2.5 cursor-pointer hover:bg-gray-50 -mx-4 px-4">
                          <div className="flex items-center gap-3">
                            <Bell size={20} className="text-[#051036] stroke-[1.5]" />
                            <span className="text-[15px] text-[#051036]">Settings</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {/* <span className="flex items-center justify-center w-5 h-5 bg-[#D91B42] text-white text-[10px] font-bold rounded-full">1</span> */}
                            <ChevronRight size={16} className="text-[#051036]" />
                          </div>
                        </Link>
                      </div>

                      <div className="border-b border-gray-100 my-2 -mx-4"></div>

                      <div className="space-y-1 mt-2">
                        <div className="flex items-center gap-3 py-2.5 cursor-pointer hover:bg-gray-50 -mx-4 px-4">
                          <HelpCircle size={20} className="text-[#051036] stroke-[1.5]" />
                          <span className="text-[15px] text-[#051036]">Support</span>
                        </div>

                        {isLoggedInState && (
                          <div
                            onClick={handleLogout}
                            className="flex items-center gap-3 py-2.5 cursor-pointer hover:bg-gray-50 -mx-4 px-4"
                          >
                            <LogOut size={20} className="text-[#051036] stroke-[1.5]" />
                            <span className="text-[15px] text-[#051036]">Log out</span>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Hamburger Menu */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden flex flex-col items-center gap-1 text-gray-600 hover:text-gray-900 cursor-pointer transition-all duration-200"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                <span className="text-xs font-medium">{isMenuOpen ? "Close" : "Menu"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu content */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top duration-200">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link
                href="/tour"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-[#ff5533] rounded-lg transition-colors"
              >
                Tours
              </Link>
              <Link
                href="/about-us"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-[#ff5533] rounded-lg transition-colors"
              >
                About us
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-[#ff5533] rounded-lg transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
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
      </nav>
    </>
  )
}
