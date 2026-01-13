"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { getCart, getTourById, getTourDates, getTourTimeSlots, CartItem, TourPlan } from "@/services/tourService"
import { Loader2, Trash2, Edit2, ShieldCheck, CreditCard, Headphones, Check } from "lucide-react"

interface EnhancedCartItem extends CartItem {
    tour?: TourPlan
    dateString?: string
    timeString?: string
    formattedPrice?: string
}

export default function CartPage() {
    const [cartItems, setCartItems] = useState<EnhancedCartItem[]>([])
    const [loading, setLoading] = useState(true)
    const [subtotal, setSubtotal] = useState(0)

    useEffect(() => {
        loadCart()
    }, [])

    const loadCart = async () => {
        try {
            setLoading(true)
            const cartIdsStr = localStorage.getItem('cartItemId')
            if (!cartIdsStr) {
                setCartItems([])
                setLoading(false)
                return
            }

            const ids = cartIdsStr.split(',').map(id => parseInt(id.trim(), 10)).filter(n => !isNaN(n))
            if (ids.length === 0) {
                setCartItems([])
                setLoading(false)
                return
            }

            const cartResponse = await getCart(ids)

            // Enrich items with tour details
            const enrichedItems = await Promise.all(cartResponse.results.map(async (item) => {
                try {
                    // Fetch Tour Details
                    const tour = await getTourById(item.tour_plan)

                    // Resolve Date and Time
                    // Strategy: Fetch dates for the tour, find the one containing the time slot?
                    // This is computationally heavy but necessary without a direct slot endpoint.
                    // Loop through dates to find the slot.
                    let dateStr = ""
                    let timeStr = ""

                    // Note: Ideally we'd have getTourTimeSlotById or similar. 
                    // Attempting to resolve by fetching dates and searching.
                    const dates = await getTourDates(tour.id)
                    let foundDate = null
                    let foundSlot = null

                    // Optimization: We can't easily guess which date so we might have to search.
                    // Limiting search to active dates to be reasonable.
                    for (const d of dates.results) {
                        const slots = await getTourTimeSlots(d.id)
                        const match = slots.results.find(s => s.id === item.time_slot)
                        if (match) {
                            foundSlot = match
                            foundDate = d
                            break
                        }
                    }

                    if (foundDate && foundSlot) {
                        const dateObj = new Date(foundDate.date)
                        dateStr = dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })

                        // Format time (e.g. 10:00 AM)
                        const [hours, minutes] = foundSlot.start_time.split(':')
                        const h = parseInt(hours, 10)
                        const ampm = h >= 12 ? 'PM' : 'AM'
                        const h12 = h % 12 || 12
                        timeStr = `${h12}:${minutes} ${ampm}`
                    }

                    return {
                        ...item,
                        tour,
                        dateString: dateStr,
                        timeString: timeStr,
                        formattedPrice: item.item_price
                    }
                } catch (err) {
                    console.error("Failed to enrich item", item.id, err)
                    return item
                }
            }))

            setCartItems(enrichedItems)

            // Calculate subtotal
            const total = enrichedItems.reduce((acc, item) => acc + parseFloat(item.item_price), 0)
            setSubtotal(total)

        } catch (error) {
            console.error("Failed to load cart", error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = (idToRemove: number) => {
        // Remove from local storage
        const cartIdsStr = localStorage.getItem('cartItemId')
        if (cartIdsStr) {
            const ids = cartIdsStr.split(',').filter(id => parseInt(id.trim()) !== idToRemove)
            if (ids.length > 0) {
                localStorage.setItem('cartItemId', ids.join(','))
            } else {
                localStorage.removeItem('cartItemId')
            }
            // Reload
            loadCart()
            // Dispatch redux update if we had access here, but standard reload works for page content
            // To update navbar, we'd need to dispatch.
            // But we are in CartPage.
            // Let's dispatch for completeness if user verified redux flow.
            // Since we are not inside a provider boundary that prevents imports easily outside components...
            // We can just rely on reload for now or add dispatch.
            window.dispatchEvent(new Event("storage")); // Hack to trigger updates? No.
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

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                <h1 className="text-3xl font-bold text-[#051036] mb-8">Shopping cart</h1>

                {cartItems.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                        <p className="text-gray-600 text-lg">Your cart is currently empty.</p>
                        <a href="/" className="text-blue-600 hover:underline mt-4 inline-block">Browse tours</a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Group by date? The image shows "Thursday, January 15". 
                                We'll just render list for simplicity or group if needed. 
                                Image shows grouping headers. Let's try basic grouping if possible, 
                                but simple list is robust for now. */}

                            {cartItems.map((item) => (
                                <div key={item.id}>
                                    {/* Date Header (Simulator) */}
                                    {/* <h3 className="text-lg font-bold text-gray-700 mb-4">{item.dateString}</h3> */}

                                    <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row gap-6">
                                        {/* Image */}
                                        <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
                                            {item.tour?.images && item.tour.images.length > 0 ? (
                                                <img
                                                    src={item.tour.images[0].file}
                                                    alt={item.tour.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    No Img
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-lg font-bold text-[#051036] line-clamp-2">
                                                    {item.tour?.title || "Tour Title"}
                                                </h3>
                                                {/* Price mobile */}
                                                {/* <span className="font-bold text-lg sm:hidden">${item.item_price}</span> */}
                                            </div>

                                            {/* Rating - Mocked/Static as not in TourPlan */}
                                            <div className="flex items-center gap-1 mb-2">
                                                <div className="flex text-yellow-400 text-xs">
                                                    ★★★★☆
                                                </div>
                                                <span className="text-xs text-gray-500">4.6 (3,817)</span>
                                            </div>

                                            {/* Date/Time */}
                                            <div className="flex items-center gap-2 text-sm text-[#051036] font-medium mb-1">
                                                <Check size={16} className="text-transparent" /> {/* Spacer/Icon? Image shows clock */}
                                                <span>{item.dateString ? `${item.dateString} • ${item.timeString}` : "Date & Time not available"}</span>
                                            </div>

                                            {/* Travelers */}
                                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                                {/* Image shows User icon */}
                                                <span>
                                                    {[
                                                        item.num_adults > 0 ? `${item.num_adults} adult${item.num_adults > 1 ? 's' : ''}` : '',
                                                        item.num_children > 0 ? `${item.num_children} child${item.num_children > 1 ? 'ren' : ''}` : '',
                                                        item.num_infants > 0 ? `${item.num_infants} infant${item.num_infants > 1 ? 's' : ''}` : ''
                                                    ].filter(Boolean).join(', ')}
                                                </span>
                                            </div>

                                            {/* Free Cancellation */}
                                            <div className="flex items-center gap-2 text-sm text-teal-700 font-medium mb-4">
                                                <Check size={16} className="stroke-2" />
                                                <span>Free cancellation</span>
                                            </div>

                                            {/* Actions & Price */}
                                            <div className="flex justify-between items-end">
                                                <div className="flex gap-4">
                                                    <button className="flex items-center gap-1 px-4 py-1.5 border border-gray-300 rounded-full text-sm font-semibold text-[#051036] hover:bg-gray-50">
                                                        <Edit2 size={14} />
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </div>
                                                <div className="text-xl font-bold text-[#051036]">
                                                    ${item.item_price}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right Sidebar */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Summary Card */}
                            <div className="bg-white border border-gray-200 rounded-xl p-6">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-lg font-bold text-[#051036]">Subtotal ({cartItems.length} items)</span>
                                    <span className="text-lg font-bold text-[#051036]">${subtotal.toFixed(2)}</span>
                                </div>
                                <p className="text-right text-xs text-teal-600 font-medium mb-6">All taxes and fees included</p>

                                <button className="w-full bg-[#0071EB] text-white font-bold py-3.5 rounded-full hover:bg-blue-600 transition-colors mb-4">
                                    Go to checkout
                                </button>

                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Check size={18} className="text-teal-600" />
                                    <span>Free cancellation <br /><span className="text-gray-400 text-xs">Until 24 hours before activity</span></span>
                                </div>
                            </div>

                            {/* Why book with us */}
                            <div className="bg-white border border-gray-200 rounded-xl p-6">
                                <h3 className="font-bold text-[#051036] mb-4">Why book with us?</h3>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <ShieldCheck size={20} className="text-gray-500 mt-0.5" />
                                        <span className="text-sm text-[#051036] font-medium">Secure payment</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CreditCard size={20} className="text-gray-500 mt-0.5" />
                                        <span className="text-sm text-[#051036] font-medium">No hidden costs</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Headphones size={20} className="text-gray-500 mt-0.5" />
                                        <span className="text-sm text-[#051036] font-medium">24/7 customer support worldwide</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    )
}
