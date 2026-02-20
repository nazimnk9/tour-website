"use client"
import Link from "next/link"
import { Heart, ShoppingCart, Globe, User, LogIn, Bell, Sun, HelpCircle, Smartphone, ChevronRight, LogOut, Menu, X, Check } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { RegisterModal } from "./auth/RegisterModal"
import { LoginModal } from "./auth/LoginModal"
import { isLoggedIn, removeTokens, getUserProfile } from "@/services/authService"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { fetchCartCount } from "@/lib/features/cart/cartSlice"
import { useLanguage } from "@/components/LanguageProvider"

export default function Navbar() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isLoggedInState, setIsLoggedInState] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [userName, setUserName] = useState("Profile")

  const profileRef = useRef<HTMLDivElement>(null)
  const languageRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { language, setLanguage, t } = useLanguage()
  const cart = useAppSelector((state) => state.cart)

  const handleLogout = () => {
    removeTokens()
    setIsLoggedInState(false)
    setUserName(t.nav.profile)
    router.push('/')
  }

  useEffect(() => {
    dispatch(fetchCartCount())
  }, [dispatch])

  useEffect(() => {
    const checkLogin = async () => {
      if (isLoggedIn()) {
        try {
          const profile = await getUserProfile()
          setIsLoggedInState(true)
          setUserName(profile.first_name || "User")
        } catch (error) {
          console.error("Session expired", error)
          handleLogout()
        }
      } else {
        setIsLoggedInState(false)
        setUserName(t.nav.profile)
      }
    }
    checkLogin()
  }, [isLoggedInState, t])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

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
        onLoginSuccess={() => {
          setIsLoggedInState(true)
          dispatch(fetchCartCount())
        }}
      />
      <nav className="w-full bg-white shadow-sm sticky top-0 z-[100]">
        {/* Top bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex justify-between items-center mb-1">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="text-center">
                <Link href="/" className="block cursor-pointer">
                  <img
                    src="/images/logo_city_roam_tickets-transparent.png"
                    alt="City Rome Tickets"
                    className="h-25 w-auto md:h-22 sm:h-22"
                  />
                </Link>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/tour" className="text-gray-600 font-medium hover:text-[#ff5533] text-sm">
                {t.nav.tours}
              </Link>
              <Link href="/about-us" className="text-gray-600 font-medium hover:text-[#ff5533] text-sm">
                {t.nav.aboutUs}
              </Link>
              <Link href="/contact" className="text-gray-600 font-medium hover:text-[#ff5533] text-sm">
                {t.nav.contact}
              </Link>
            </div>

            {/* Right menu items */}
            <div className="flex items-center gap-6">
              <Link href="/cart" className="relative group flex flex-col items-center gap-1 text-gray-600 hover:text-gray-900 cursor-pointer">
                <div className="relative">
                  <ShoppingCart size={20} />
                  {cart.count > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                      {cart.count}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium">{t.nav.cart}</span>
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <div className="relative group z-50" ref={languageRef}>
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="relative group flex flex-col items-center gap-1 text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  <Globe size={20} />
                  <span className="text-xs font-medium uppercase">
                    {language?.toUpperCase()}
                  </span>
                  <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                </button>

                {/* Language Dropdown */}
                {/* Language Dropdown */}
                <div
                  className={`absolute right-0 top-full pt-[10px] w-48 ${
                    isLanguageOpen ? 'block' : 'hidden md:group-hover:block'
                  } transition-all duration-200 z-[100]`}
                >
                  <div className="bg-white rounded-xl shadow-[0_2px_20px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-2">
                      {/* English */}
                      <button
                        onClick={() => {
                          setLanguage('en')
                          setIsLanguageOpen(false)
                        }}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-[#051036] hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <span className="font-medium">English</span>
                        {language === 'en' && <Check size={16} className="text-orange-500" />}
                      </button>

                      {/* Italian */}
                      <button
                        onClick={() => {
                          setLanguage('it')
                          setIsLanguageOpen(false)
                        }}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-[#051036] hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <span className="font-medium">Italiano</span>
                        {language === 'it' && <Check size={16} className="text-orange-500" />}
                      </button>

                      {/* German */}
                      <button
                        onClick={() => {
                          setLanguage('de')
                          setIsLanguageOpen(false)
                        }}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-[#051036] hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <span className="font-medium">Deutsch</span>
                        {language === 'de' && <Check size={16} className="text-orange-500" />}
                      </button>

                      {/* Spanish */}
                      <button
                        onClick={() => {
                          setLanguage('es')
                          setIsLanguageOpen(false)
                        }}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-[#051036] hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <span className="font-medium">Español</span>
                        {language === 'es' && <Check size={16} className="text-orange-500" />}
                      </button>

                      {/* French */}
                      <button
                        onClick={() => {
                          setLanguage('fr')
                          setIsLanguageOpen(false)
                        }}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-[#051036] hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <span className="font-medium">Français</span>
                        {language === 'fr' && <Check size={16} className="text-orange-500" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group z-50" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  <User size={20} />
                  <span className="text-xs font-medium">{userName}</span>
                  <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                </button>

                {/* Profile Dropdown */}
                <div className={`absolute right-0 top-full pt-[10px] w-80 ${isProfileOpen ? 'block' : 'hidden md:group-hover:block'} transition-all duration-200 z-[100]`}>
                  <div className="bg-white rounded-xl shadow-[0_2px_20px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4 bg-transparent">
                      <h3 className="text-xl font-bold text-[#051036] mb-4 text-left">{userName}</h3>
                      <Link href="/contact" className="flex items-center justify-between py-2.5 cursor-pointer hover:bg-gray-50 -mx-4 px-4">
                        <div className="flex items-center gap-3">
                          <HelpCircle size={20} className="text-[#051036] stroke-[1.5]" />
                          <span className="text-[15px] text-[#051036]">{t.nav.support}</span>
                        </div>
                      </Link>
                      {!isLoggedInState && (
                        <div
                          onClick={openRegister}
                          className="flex items-center gap-3 p-3 -mx-4 hover:bg-gray-50 bg-[#F5F7FA] transition-colors cursor-pointer mb-2"
                        >
                          <div className="ml-4">
                            <LogIn size={20} className="text-[#051036] stroke-[1.5]" />
                          </div>
                          <span className="text-[15px] font-medium text-[#051036]">{t.nav.loginSignup}</span>
                        </div>
                      )}

                      <div className="space-y-1 mt-2">
                        {isLoggedInState && (
                          <>
                            <Link href="/settings" className="flex items-center justify-between py-2.5 cursor-pointer hover:bg-gray-50 -mx-4 px-4">
                              <div className="flex items-center gap-3">
                                <Bell size={20} className="text-[#051036] stroke-[1.5]" />
                                <span className="text-[15px] text-[#051036]">{t.nav.settings}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <ChevronRight size={16} className="text-[#051036]" />
                              </div>
                            </Link>

                            <div className="border-b border-gray-100 my-2 -mx-4"></div>

                            <div
                              onClick={handleLogout}
                              className="flex items-center gap-3 py-2.5 cursor-pointer hover:bg-gray-50 -mx-4 px-4"
                            >
                              <LogOut size={20} className="text-[#051036] stroke-[1.5]" />
                              <span className="text-[15px] text-[#051036]">{t.nav.logout}</span>
                            </div>
                          </>
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
                <span className="text-xs font-medium">{isMenuOpen ? (language === 'en' ? "Close" : "Chiudi") : (language === 'en' ? "Menu" : "Menu")}</span>
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
                {t.nav.tours}
              </Link>
              <Link
                href="/about-us"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-[#ff5533] rounded-lg transition-colors"
              >
                {t.nav.aboutUs}
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-[#ff5533] rounded-lg transition-colors"
              >
                {t.nav.contact}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
