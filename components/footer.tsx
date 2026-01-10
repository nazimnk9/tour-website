"use client"

import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Language & Currency Section */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3 text-base">Language</h3>
              <select className="w-full bg-white text-gray-900 px-4 py-2 rounded text-sm border-none font-medium">
                <option>English (United States)</option>
                <option>Español</option>
              </select>
            </div>

            {/* <div>
              <h3 className="font-semibold mb-3 text-base">Currency</h3>
              <select className="w-full bg-white text-gray-900 px-4 py-2 rounded text-sm border-none font-medium">
                <option>U.S. Dollar ($)</option>
                <option>Euro (€)</option>
                <option>British Pound (£)</option>
                <option>Australian Dollar (A$)</option>
                <option>Canadian Dollar (C$)</option>
              </select>
            </div> */}
          </div>

          {/* Mobile Section */}
          {/* <div>
            <h3 className="font-semibold mb-4 text-base">Mobile</h3>
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-2 hover:opacity-75 transition">
                <img src="/google-play-logo.jpg" alt="Google Play" className="h-10" />
                <div className="text-xs">
                  <div className="text-gray-300">GET IT ON</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </a>
              <a href="#" className="flex items-center gap-2 hover:opacity-75 transition">
                <img src="/app-store-logo.jpg" alt="App Store" className="h-10" />
                <div className="text-xs">
                  <div className="text-gray-300">Download on the</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </a>
            </div>
          </div> */}

          {/* Support Section */}
          <div>
            <h3 className="font-semibold mb-4 text-base">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline text-gray-100">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-gray-100">
                  Legal Notice
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-gray-100">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-gray-100">
                  Cookies and Marketing Preferences
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-gray-100">
                  General Terms and Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-gray-100">
                  Information according to the Digital Services Act
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-gray-100">
                  Sitemap
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-gray-100">
                  Do not Sell or Share my Personal Information
                </a>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="font-semibold mb-4 text-base">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline text-gray-100">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-gray-100">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-gray-100">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-gray-100">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-gray-100">
                  Gift Cards
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-gray-100">
                  Explorer
                </a>
              </li>
            </ul>
          </div>

          {/* Work With Us Section */}
          <div>
            <h3 className="font-semibold mb-4 text-base">Work With Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline text-gray-100">
                  As a Supply Partner
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-gray-100">
                  As a Content Creator
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-gray-100">
                  As an Affiliate Partner
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* <div className="mb-8 pb-8 border-t border-slate-700 pt-8">
          <h3 className="font-semibold mb-4 text-base">Ways You Can Pay</h3>
          <div className="flex flex-wrap gap-3 items-center">
            <img src="/paypal-logo.png" alt="PayPal" className="h-6" />
            <img src="/mastercard-logo.jpg" alt="Mastercard" className="h-6" />
            <img src="/visa-logo.jpg" alt="Visa" className="h-6" />
            <img src="/union-pay-logo.jpg" alt="UnionPay" className="h-6" />
            <img src="/amex-logo.jpg" alt="American Express" className="h-6" />
            <img src="/jcb-logo.jpg" alt="JCB" className="h-6" />
            <img src="/google-pay-logo.jpg" alt="Google Pay" className="h-6" />
            <img src="/apple-pay-logo.png" alt="Apple Pay" className="h-6" />
            <span className="text-gray-400 text-sm">+ more</span>
          </div>
        </div> */}

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-4 border-t border-slate-700">
          <p className="text-sm text-gray-300">© 2019 – 2026 City Rome Tickets. </p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-300 transition" aria-label="Facebook">
              <Facebook size={22} />
            </a>
            <a href="#" className="hover:text-pink-300 transition" aria-label="Instagram">
              <Instagram size={22} />
            </a>
            <a href="#" className="hover:text-blue-300 transition" aria-label="Twitter">
              <Twitter size={22} />
            </a>
            <a href="#" className="hover:text-red-300 transition" aria-label="Pinterest">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.5 2 2 6.5 2 12c0 5 3.7 9.1 8.4 9.9v-7h-2.5V12h2.5v-1.9c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7C18.3 21.1 22 16.9 22 12c0-5.5-4.5-10-10-10z" />
              </svg>
            </a>
            <a href="#" className="hover:text-blue-300 transition" aria-label="LinkedIn">
              <Linkedin size={22} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
