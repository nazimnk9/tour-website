"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { getCart, createBooking, BookingPayload, TravelerDetail } from "@/services/tourService"
import { isLoggedIn } from "@/services/authService"
import { Loader2, User, Mail, Globe, Phone, Check } from "lucide-react"

export default function CheckoutPage() {
    const [loading, setLoading] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)
    const [step, setStep] = useState(1) // 1: Contact Info (Guest), 2: Traveler Details
    const [totalAdults, setTotalAdults] = useState(0)
    const [isBookNow, setIsBookNow] = useState(false)

    // Forms
    const [guestDetails, setGuestDetails] = useState({
        full_name: "",
        email: "",
        country: "",
        phone: ""
    })

    const [travelerDetails, setTravelerDetails] = useState<TravelerDetail[]>([])

    useEffect(() => {
        checkAuthAndLoad()
    }, [])

    const checkAuthAndLoad = async () => {
        setLoading(true)
        const isUserLoggedIn = isLoggedIn()
        setLoggedIn(isUserLoggedIn)

        // If logged in, skip contact step
        if (isUserLoggedIn) {
            setStep(2)
        }

        // Check for Book Now data first
        const bookNowDataStr = localStorage.getItem('bookNowData')
        let bookNowMode = false
        if (bookNowDataStr) {
            try {
                const bookNowData = JSON.parse(bookNowDataStr)
                setIsBookNow(true)
                bookNowMode = true

                // Set adults count directly from data
                const adults = bookNowData.num_adults || 0 // Default to 0 if not found, though interface implies it exists
                setTotalAdults(adults)
                setTravelerDetails(Array(adults).fill({ name: "", email: "" }))
                setLoading(false)
                return; // Skip cart loading
            } catch (e) {
                console.error("Failed to parse book now data", e)
                // Fallthrough to cart logic
            }
        }

        // Load cart for adult count if not book now
        const cartIdsStr = localStorage.getItem('cartItemId')
        if (!cartIdsStr) {
            setLoading(false)
            return
        }

        const ids = cartIdsStr.split(',').map(id => parseInt(id.trim(), 10)).filter(n => !isNaN(n))

        try {
            const cartResponse = await getCart(ids)
            // Calculate total adults across all items
            const adults = cartResponse.results.reduce((acc, item) => acc + item.num_adults, 0)
            setTotalAdults(adults)

            // Initialize traveler details array
            setTravelerDetails(Array(adults).fill({ name: "", email: "" }))
        } catch (error) {
            console.error("Failed to load cart for checkout", error)
        } finally {
            setLoading(false)
        }
    }

    const handleGuestSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Save to local storage? Or just keep in state? 
        // Prompt says "save data in local storage"
        localStorage.setItem('guestCheckoutDetails', JSON.stringify(guestDetails))
        setStep(2)
    }

    const handleTravelerChange = (index: number, field: keyof TravelerDetail, value: string) => {
        const newDetails = [...travelerDetails]
        newDetails[index] = { ...newDetails[index], [field]: value }
        setTravelerDetails(newDetails)
    }

    const handleFinalSubmit = async () => {
        setLoading(true)
        try {
            let payload: BookingPayload;

            if (isBookNow) {
                const bookNowDataStr = localStorage.getItem('bookNowData')
                if (!bookNowDataStr) throw new Error("Missing booking data")
                const bookNowData = JSON.parse(bookNowDataStr)

                payload = {
                    book_now: "true",
                    single_item: bookNowData,
                    traveler_details: travelerDetails
                }
            } else {
                const cartIdsStr = localStorage.getItem('cartItemId')
                if (!cartIdsStr) throw new Error("No items in cart")

                payload = {
                    cart_item_ids: cartIdsStr.split(',').map(id => parseInt(id.trim(), 10)).filter(n => !isNaN(n)),
                    traveler_details: travelerDetails
                }
            }

            if (!loggedIn) {
                // Attach guest formatted details
                // Prompt says: full_name, email, country, phone post from local storage
                const savedGuest = localStorage.getItem('guestCheckoutDetails')
                if (savedGuest) {
                    const parsed = JSON.parse(savedGuest)
                    payload.full_name = parsed.full_name
                    payload.email = parsed.email
                    payload.country = parsed.country
                    payload.phone = parsed.phone
                } else {
                    // Fallback to state if fetch failed or logic differs
                    payload.full_name = guestDetails.full_name
                    payload.email = guestDetails.email
                    payload.country = guestDetails.country
                    payload.phone = guestDetails.phone
                }
            }

            let token = undefined;
            if (loggedIn) {
                const match = document.cookie.match(new RegExp('(^| )access_token=([^;]+)'));
                if (match) {
                    token = match[2];
                }
            }

            await createBooking(payload, token)
            alert("Booking successful!")

            // Cleanup
            if (isBookNow) {
                localStorage.removeItem('bookNowData')
            } else {
                localStorage.removeItem('cartItemId')
            }
            localStorage.removeItem('guestCheckoutDetails')
            window.location.href = "/"

        } catch (error: any) {
            console.error("Booking failed", error)
            alert(error.message || "Booking failed")
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <Loader2 className="animate-spin text-orange-600" size={40} />
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                <h1 className="text-3xl font-bold text-[#051036] mb-8">Checkout</h1>

                {/* Step 1: Contact Info (Guest Only) */}
                {step === 1 && !loggedIn && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
                        <h2 className="text-xl font-bold text-[#051036] mb-6">Contact Details</h2>
                        <form onSubmit={handleGuestSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                    <input
                                        required
                                        type="text"
                                        className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="John Doe"
                                        value={guestDetails.full_name}
                                        onChange={e => setGuestDetails({ ...guestDetails, full_name: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                    <input
                                        required
                                        type="email"
                                        className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="john@example.com"
                                        value={guestDetails.email}
                                        onChange={e => setGuestDetails({ ...guestDetails, email: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Country</label>
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                        <input
                                            required
                                            type="text"
                                            className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            placeholder="Country"
                                            value={guestDetails.country}
                                            onChange={e => setGuestDetails({ ...guestDetails, country: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                        <input
                                            required
                                            type="tel"
                                            className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            placeholder="+1 234 567 890"
                                            value={guestDetails.phone}
                                            onChange={e => setGuestDetails({ ...guestDetails, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-[#0071EB] text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition mt-4">
                                Continue
                            </button>
                        </form>
                    </div>
                )}

                {/* Step 2: Traveler Details */}
                {step === 2 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
                        <h2 className="text-xl font-bold text-[#051036] mb-6">Traveler Details Form</h2>
                        <div className="space-y-6">
                            {travelerDetails.map((traveler, index) => (
                                <div key={index} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                                    <h3 className="font-semibold text-gray-800 mb-3">Adult {index + 1}</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                                                value={traveler.name}
                                                onChange={e => handleTravelerChange(index, 'name', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                                            <input
                                                required
                                                type="email"
                                                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                                                value={traveler.email}
                                                onChange={e => handleTravelerChange(index, 'email', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handleFinalSubmit}
                            className="w-full bg-[#0071EB] text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition mt-8 flex items-center justify-center gap-2"
                        >
                            <Check size={20} />
                            Final Submit
                        </button>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    )
}
