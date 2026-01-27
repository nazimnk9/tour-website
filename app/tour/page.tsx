"use client"

import { useEffect, useState } from "react"
import { getTourPlans, TourPlan } from "@/services/tourService"
import TourCard from "@/components/tour-card"
import { ChevronDown, X } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function ToursPage() {
    const [tours, setTours] = useState<TourPlan[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [page, setPage] = useState(1)

    // Filter states
    const [durationFilter, setDurationFilter] = useState<string | null>(null)
    const [priceFilter, setPriceFilter] = useState<string | null>(null)

    useEffect(() => {
        const fetchTours = async () => {
            try {
                setLoading(true)

                const params: any = { page }

                // Apply Duration Filter
                if (durationFilter === "0-3") {
                    params.duration_days_min = 0;
                    params.duration_days_max = 3;
                } else if (durationFilter === "4-6") {
                    // Logic says 4-6 based on user request "4-6 passes 4 and 6"
                    params.duration_days_min = 4;
                    params.duration_days_max = 6;
                } else if (durationFilter === "7+") {
                    params.duration_days_min = 7;
                }

                // Apply Price Filter
                if (priceFilter === "500") {
                    params.price_adult_min = 500;
                    params.price_adult_max = 500;
                } else if (priceFilter === "1000") {
                    params.price_adult_min = 1000;
                    params.price_adult_max = 1000;
                } else if (priceFilter === "1500+") {
                    params.price_adult_min = 1500;
                }

                const response = await getTourPlans(params)
                setTours(response.results)
            } catch (err) {
                setError("Failed to load tours")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchTours()
    }, [page, durationFilter, priceFilter])

    const handleDurationChange = (value: string) => {
        setDurationFilter(value === durationFilter ? null : value)
        setPage(1)
    }

    const clearDurationFilter = (e: React.MouseEvent) => {
        e.stopPropagation()
        setDurationFilter(null)
        setPage(1)
    }

    const handlePriceChange = (value: string) => {
        setPriceFilter(value === priceFilter ? null : value)
        setPage(1)
    }

    const clearPriceFilter = (e: React.MouseEvent) => {
        e.stopPropagation()
        setPriceFilter(null)
        setPage(1)
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 pb-12">
                <Navbar />
                {/* Header Section */}

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 ">
                    <div className="">
                        <div className="py-5 md:py-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-[#051036] mb-3">
                                Available Tours in Italy
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Choose your next adventure and book instantly.
                            </p>
                        </div>
                    </div>
                    {/* Filters */}
                    <div className="flex flex-wrap gap-4 mb-8">
                        <Select
                            value={durationFilter || ""}
                            onValueChange={handleDurationChange}
                        >
                            <SelectTrigger className={`w-fit rounded-full text-xs font-medium border shadow-none ${durationFilter ? 'bg-orange-50 border-orange-500 text-orange-600 [&>svg:last-child]:hidden' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'}`}>
                                <div className="flex items-center gap-2 mr-1">
                                    <SelectValue placeholder="Any Duration" />
                                </div>
                                {durationFilter && (
                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            e.preventDefault()
                                            clearDurationFilter(e)
                                        }}
                                        className="hover:bg-orange-200 rounded-full p-0.5 cursor-pointer pointer-events-auto z-10"
                                    >
                                        <X size={14} />
                                    </div>
                                )}
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectItem className="cursor-pointer hover:bg-gray-50" value="0-3">0-3 hours</SelectItem>
                                <SelectItem className="cursor-pointer hover:bg-gray-50" value="4-6">4-6 hours</SelectItem>
                                <SelectItem className="cursor-pointer hover:bg-gray-50" value="7+">7+ Hours</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select
                            value={priceFilter || ""}
                            onValueChange={handlePriceChange}
                        >
                            <SelectTrigger className={`w-fit rounded-full text-xs font-medium border shadow-none ${priceFilter ? 'bg-orange-50 border-orange-500 text-orange-600 [&>svg:last-child]:hidden' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'}`}>
                                <div className="flex items-center gap-2 mr-1">
                                    <SelectValue placeholder="Any Price" />
                                </div>
                                {priceFilter && (
                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            e.preventDefault()
                                            clearPriceFilter(e)
                                        }}
                                        className="hover:bg-orange-200 rounded-full p-0.5 cursor-pointer pointer-events-auto z-10"
                                    >
                                        <X size={14} />
                                    </div>
                                )}
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectItem className="cursor-pointer hover:bg-gray-50" value="500">$500</SelectItem>
                                <SelectItem className="cursor-pointer hover:bg-gray-50" value="1000">$1000</SelectItem>
                                <SelectItem className="cursor-pointer hover:bg-gray-50" value="1500+">$1500+</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Tour Grid */}
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 text-orange-500 border-b-2 border-orange-500"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-12">
                            <p className="text-red-500 font-medium">{error}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {tours.map((tour) => (
                                <TourCard key={tour.id} tour={tour} />
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && !error && tours.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No tours found.</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    )
}
