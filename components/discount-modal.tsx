"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, ArrowRight, Percent } from "lucide-react"

export default function DiscountModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    // Show modal on first render
    setIsOpen(true)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle email submission
    console.log("Email submitted:", email)
    setIsOpen(false)
    setEmail("")
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop - changed from bg-black bg-opacity-40 to bg-black/30 for better transparency and website visibility */}
      <div className="fixed inset-0 bg-black/30 z-40 transition-opacity" onClick={handleClose} />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden">
          {/* Orange Header */}
          <div className="bg-orange-500 px-6 py-6 relative flex items-start gap-4">
            <div className="flex-shrink-0 pt-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                <Percent className="h-6 w-6 text-orange-500" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-white flex-1 leading-tight">
              You've been selected for an exclusive discount
            </h2>
            {/* Close button */}
            <button
              onClick={handleClose}
              className="flex-shrink-0 text-white hover:bg-orange-600 p-1 rounded transition"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>

          {/* White Body */}
          <div className="px-6 py-6 space-y-4">
            <p className="text-gray-700 text-center font-medium">To receive your discount, enter your email below.</p>

            {/* Email Input Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  required
                  className="flex-1 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none bg-white"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 transition flex-shrink-0"
                  aria-label="Submit"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </form>

            {/* Disclaimer */}
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              You'll receive occasional promotional emails for GetYourGuide products. You can opt out at any time.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
