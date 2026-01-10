"use client"

import { useState } from "react"
import {
  Heart,
  Star,
  Share2,
  ChevronLeft,
  ChevronRight,
  Check,
  Minus,
  Plus,
  Clock,
  Users,
  Car,
  Users2,
} from "lucide-react"
import Link from "next/link"
import { ItineraryTimeline } from "./Itinerary-timeline"

interface Tour {
  id: number
  image: string
  title: string
  category: string
  duration?: string
  groupSize?: string
  skipLine?: boolean
  rating: number
  reviews: number
  price: number
  fromPrice?: boolean
  originalPrice?: number
  likelySellOut?: boolean
  description?: string
  images?: string[]
}

const TOURS_DATA: Record<number, Tour> = {
  1: {
    id: 1,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    ],
    title: "From Las Vegas: VIP Los Angeles/Hollywood Day Trip",
    category: "DAY TRIP",
    duration: "7 hours",
    rating: 4.7,
    reviews: 628,
    price: 279,
    fromPrice: false,
    likelySellOut: true,
    description:
      "Head off into the Los Angeles/Hollywood area on board a comfortable Mercedes vehicle. Check out the best of Santa Monica, Rodeo Drive in Beverly Hills, the Sunset Strip, and the Hollywood Walk of Fame.",
  },
  2: {
    id: 2,
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    ],
    title: "From Paris: Day Trip to Champagne with 8 Tastings & Lunch",
    category: "DAY TRIP",
    duration: "10 - 11 hours",
    groupSize: "Small group",
    skipLine: true,
    rating: 4.8,
    reviews: 1493,
    price: 380,
    fromPrice: true,
    description: "Experience the finest champagne regions with guided tastings and a gourmet lunch.",
  },
  3: {
    id: 3,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    ],
    title: "From Edinburgh: Glenfinnan, Glencoe, and Highlands Day Trip",
    category: "DAY TRIP",
    duration: "12 hours",
    groupSize: "Small group",
    rating: 4.6,
    reviews: 6631,
    originalPrice: 78,
    price: 70,
    fromPrice: true,
    description: "Explore the breathtaking Scottish Highlands with visits to iconic locations.",
  },
  4: {
    id: 4,
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    ],
    title: "From Milan: St. Moritz and Bernina Express Tour",
    category: "DAY TRIP",
    duration: "13 hours",
    skipLine: true,
    rating: 4.5,
    reviews: 2909,
    price: 195,
    fromPrice: true,
    likelySellOut: true,
    description: "Journey through the Alps on the scenic Bernina Express train.",
  },
  5: {
    id: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    ],
    title: "Barcelona: Montserrat, Cogwheel, Black Madonna & Winery Tour",
    category: "DAY TRIP",
    duration: "5 - 10 hours",
    skipLine: true,
    rating: 4.8,
    reviews: 5450,
    price: 50,
    fromPrice: true,
    description: "Discover the sacred mountain of Montserrat and local winery experiences.",
  },
  6: {
    id: 6,
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    ],
    title: "Dubai: Overnight Safari, Dinner, Stargazing & Al Khayma Camp",
    category: "DAY TRIP",
    duration: "17 hours",
    groupSize: "Small group",
    rating: 4.8,
    reviews: 2475,
    price: 180,
    fromPrice: true,
    description: "Experience the desert with an overnight safari and traditional Al Khayma camp.",
  },
  7: {
    id: 7,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    ],
    title: "From Venice: Dolomites, Cortina and Lake Braies Day Trip",
    category: "DAY TRIP",
    duration: "9 hours",
    groupSize: "Small group",
    rating: 4.9,
    reviews: 437,
    price: 193,
    fromPrice: true,
    description: "Explore the stunning Dolomites and the famous Lake Braies.",
  },
  8: {
    id: 8,
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    ],
    title: "Athens: Mythology of Delphi, Museum and Arachova Guided Tour",
    category: "DAY TRIP",
    duration: "10 hours",
    skipLine: true,
    rating: 4.7,
    reviews: 4989,
    price: 32,
    fromPrice: true,
    description: "Discover the mythological wonders of Delphi with expert guides.",
  },
}

function DatePicker({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1))

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const renderCalendar = (date: Date) => {
    const daysInMonth = getDaysInMonth(date)
    const firstDay = getFirstDayOfMonth(date)
    const days = []
    const monthName = date.toLocaleString("default", { month: "long", year: "numeric" })

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="text-center py-2"></div>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isHighlighted = [3, 4, 11, 12, 15, 18, 20, 21].includes(day)
      days.push(
        <div
          key={day}
          className={`text-center py-2 text-sm font-medium cursor-pointer rounded ${
            isHighlighted ? "bg-blue-100 text-blue-600 font-semibold" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {day}
        </div>,
      )
    }

    return { monthName, days }
  }

  const currentMonth = renderCalendar(currentDate)
  const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
  const nextMonthData = renderCalendar(nextMonth)

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  if (!isOpen) return null

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10">
      <div className="flex items-center justify-between mb-4">
        <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded">
          <ChevronLeft size={20} className="text-gray-600" />
        </button>
        <h3 className="text-center font-semibold text-gray-900 text-sm">{currentMonth.monthName}</h3>
        <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded">
          <ChevronRight size={20} className="text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-6">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
            {day}
          </div>
        ))}
        {currentMonth.days}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div></div>
        <h3 className="text-center font-semibold text-gray-900 text-sm">{nextMonthData.monthName}</h3>
        <div></div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={`next-${day}`} className="text-center text-xs font-semibold text-gray-600 py-2">
            {day}
          </div>
        ))}
        {nextMonthData.days}
      </div>

      <button
        onClick={onClose}
        className="w-full mt-4 py-2 bg-blue-500 text-white rounded font-semibold hover:bg-blue-600"
      >
        Close
      </button>
    </div>
  )
}

function TravelerCounter({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [adultCount, setAdultCount] = useState(1)
  const [childCount, setChildCount] = useState(0)

  if (!isOpen) return null

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10">
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Adult <span className="text-gray-600 font-normal text-xs">(Age 99 and younger)</span>
        </label>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
            className="p-2 hover:bg-gray-100 rounded-full border border-gray-300"
          >
            <Minus size={16} className="text-gray-600" />
          </button>
          <span className="text-lg font-semibold text-gray-900">{adultCount}</span>
          <button
            onClick={() => setAdultCount(adultCount + 1)}
            className="p-2 hover:bg-gray-100 rounded-full border border-gray-300"
          >
            <Plus size={16} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Child <span className="text-gray-600 font-normal text-xs">(Age 5-11)</span>
        </label>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setChildCount(Math.max(0, childCount - 1))}
            className="p-2 hover:bg-gray-100 rounded-full border border-gray-300"
          >
            <Minus size={16} className="text-gray-600" />
          </button>
          <span className="text-lg font-semibold text-gray-900">{childCount}</span>
          <button
            onClick={() => setChildCount(childCount + 1)}
            className="p-2 hover:bg-gray-100 rounded-full border border-gray-300"
          >
            <Plus size={16} className="text-gray-600" />
          </button>
        </div>
      </div>

      <button onClick={onClose} className="w-full py-2 bg-blue-500 text-white rounded font-semibold hover:bg-blue-600">
        Done
      </button>
    </div>
  )
}

function ReviewCard({
  reviewer,
  location,
  date,
  rating,
  text,
}: { reviewer: string; location: string; date: string; rating: number; text: string }) {
  const getInitial = (name: string) => name.charAt(0).toUpperCase()
  const getAvatarColor = (name: string) => {
    const colors = ["bg-orange-500", "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-pink-500"]
    return colors[name.charCodeAt(0) % colors.length]
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-start gap-4 mb-4">
        <div
          className={`${getAvatarColor(reviewer)} text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0`}
        >
          {getInitial(reviewer)}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-sm font-semibold text-gray-900 ml-2">{rating}</span>
          </div>
          <p className="text-sm font-semibold text-gray-900">
            {reviewer} – {location}
          </p>
          <p className="text-xs text-gray-600">{date} · Verified booking</p>
        </div>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
    </div>
  )
}

export default function TourDetailPage({ tourId }: { tourId: number }) {
  const tour = TOURS_DATA[tourId]
  const [isFavorite, setIsFavorite] = useState(false)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [isTravelerPickerOpen, setIsTravelerPickerOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!tour) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tour not found</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Back to tours
          </Link>
        </div>
      </div>
    )
  }

  const images = tour.images || [tour.image]
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Title and Badges */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">{tour.title}</h1>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            {/* Top Rated Badge */}
            <div className="bg-blue-900 text-white px-3 py-1 rounded font-semibold text-sm">Top rated</div>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(tour.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="font-semibold text-gray-900 text-sm">{tour.rating}</span>
              <span className="text-gray-600 text-sm">
                <span className="underline">{tour.reviews.toLocaleString()} reviews</span>
              </span>
              <span className="text-gray-600 text-sm">• Activity provider: One Day Tours</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 ml-auto">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded transition"
                aria-label="Add to wishlist"
              >
                <Heart size={20} className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"} />
                <span className="text-gray-700 text-sm">Add to wishlist</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded transition">
                <Share2 size={20} className="text-gray-600" />
                <span className="text-gray-700 text-sm">Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery - Grid Layout */}
            <div className="relative mb-6 rounded-lg overflow-auto grid grid-cols-3 gap-2 h-100">
              {/* Main large image on the left */}
              <div className="col-span-2 rounded-lg overflow-auto">
                <img
                  src={images[0] || "/placeholder.svg"}
                  alt={`${tour.title} - Main image`}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Right column with smaller images */}
              <div className="flex flex-col gap-2">
                {/* First thumbnail */}
                <div className="flex-1 rounded-lg overflow-auto">
                  <img
                    src={images[1] || "/placeholder.svg"}
                    alt={`${tour.title} - Image 2`}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Second thumbnail with +4 badge */}
                <div className="flex-1 rounded-lg overflow-auto relative">
                  <img
                    src={images[2] || "/placeholder.svg"}
                    alt={`${tour.title} - Image 3`}
                    className="w-full h-full object-contain"
                  />
                  {/* +4 badge indicator */}
                  {images.length > 3 && (
                    <div className="absolute bottom-3 right-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded flex items-center gap-1 text-sm font-medium">
                      <span>+{images.length - 3}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <p className="text-gray-700 text-sm leading-relaxed">{tour.description}</p>
            </div>

            {/* About this activity */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About this activity</h2>

              {/* Activity Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <Check size={24} className="text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Free cancellation</p>
                    <p className="text-gray-600 text-sm">Cancel up to 24 hours in advance for a full refund</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Share2 size={24} className="text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Reserve now & pay later</p>
                    <p className="text-gray-600 text-sm">
                      Keep your travel plans flexible — book your spot and pay nothing today.{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        flexible
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock size={24} className="text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Duration 14 hours</p>
                    <p className="text-gray-600 text-sm">Check availability to see starting times</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Users size={24} className="text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Live tour guide</p>
                    <p className="text-gray-600 text-sm">English</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Car size={24} className="text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Pickup included</p>
                    <p className="text-gray-600 text-sm">
                      Pickup from your hotel is not guaranteed if you book this activity with less than 48-hours notice.
                      A pickup address and time might be assigned to you
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Users2 size={24} className="text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Small group</p>
                    <p className="text-gray-600 text-sm">Limited to 14 participants</p>
                  </div>
                </div>
              </div>

              {/* Highlighted reviews from other travelers */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Highlighted reviews from other travelers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  <ReviewCard
                    reviewer="Rose"
                    location="United Kingdom"
                    date="December 24, 2025"
                    rating={5}
                    text="What a day, myself and my mother really enjoyed this, Steve was our tour guide, he was extremely knowledgeable, friendly and made everyone feel very comfortable. Once in a life time trip for us and we couldn't have been in better hands on the day. From start to finish it was excellent, so many sites to be seen and photo opportunities along the way, definitely recommend, you won't regret it."
                  />
                  <ReviewCard
                    reviewer="Esme"
                    location="United Kingdom"
                    date="December 22, 2025"
                    rating={5}
                    text="Ward was great - kept us informed about collection time on was friendly when we met him. We then picked Steve up from another hotel who was the host. He was great - funny, friendly and had great information about the local area on the way there and made pit stops for us to stretch legs and use the restrooms. Provided us with refreshments and snacks for journey The maps and the food menu were a great touch on board (Big deans cheeseburger was tasty) Would recommend this day trip. we got some great pictures in Beverly Hills and the Hollywood sign and Steve directed us to the stars on the Hollywood walk off am that we wanted to see! Thanks Steve and Ward"
                  />
                </div>
              </div>

              {/* Check availability */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Check availability</h2>

                {/* Quick date selector */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                  {[
                    "Sun\n11\nJan",
                    "Mon\n12\nJan",
                    "Tue\n13\nJan",
                    "Wed\n14\nJan",
                    "Thu\n15\nJan",
                    "Fri\n16\nJan",
                    "Sat\n17\nJan",
                  ].map((date, idx) => (
                    <button
                      key={idx}
                      className={`flex-shrink-0 px-4 py-3 rounded border text-center text-sm font-medium whitespace-pre-line ${
                        idx === 1
                          ? "border-blue-600 bg-blue-50 text-blue-900"
                          : "border-gray-300 bg-white text-gray-900 hover:border-gray-400"
                      }`}
                    >
                      {date}
                    </button>
                  ))}
                  <button className="flex-shrink-0 px-4 py-3 rounded border border-gray-300 text-gray-600 hover:border-gray-400 flex items-center justify-center">
                    📅
                  </button>
                </div>

                <p className="text-gray-900 font-semibold mb-4">1 option available</p>

                {/* Tour option card */}
                <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 mb-6">
                  <h3 className="font-semibold text-gray-900 text-lg mb-4">{tour.title}</h3>

                  <div className="flex flex-wrap gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock size={20} className="text-gray-600" />
                      <span className="text-gray-700 font-medium">14 hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={20} className="text-gray-600" />
                      <span className="text-gray-700 font-medium">Guide: English</span>
                    </div>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">From</p>
                      <p className="text-3xl font-bold text-gray-900">${tour.price}</p>
                      <p className="text-gray-600 text-sm">per person</p>
                    </div>
                    <div className="text-right">
                      <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition mb-2">
                        Select
                      </button>
                      <div className="flex items-center gap-2 text-teal-600 justify-end">
                        <Check size={18} />
                        <span className="text-sm font-medium">Free cancellation</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-8 pb-8 border-b border-gray-200">
                    <ItineraryTimeline />
                  </div>
              </div>

              {/* Highlights */}
              <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Highlights</h2>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-gray-700">•</span>
                      <span className="text-gray-700">
                        Travel around the Los Angeles area in a luxurious Mercedes-Benz vehicle
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-700">•</span>
                      <span className="text-gray-700">
                        See Santa Monica, the Hollywood Walk of Fame, Sunset Strip, and Rodeo Drive
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-700">•</span>
                      <span className="text-gray-700">
                        Learn about each of the landmarks along the way from your knowledgeable guide
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-700">•</span>
                      <span className="text-gray-700">
                        Take a walk along Rodeo Drive and take a picture at the Beverly Hills Sign
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-700">•</span>
                      <span className="text-gray-700">
                        Savor a hot meal as you sit down to lunch at a restaurant in Santa Monica
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Full description</h2>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    Follow experienced guides on a tour of the Los Angeles/Hollywood area in a luxurious Mercedes
                    vehicle. Enjoy included water, snacks, and lunch, and stay connected with WIFI and USB charging
                    ports.
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed">...</p>
                  <button className="text-blue-600 hover:underline text-sm font-medium mt-3">See more</button>
                </div>
              </div>

              {/* Includes */}
              <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Includes</h2>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check size={20} className="text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">
                        Hotel pickups and drop-offs from 30+ hotels in Las Vegas on the strip
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check size={20} className="text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Experienced Tour Guide</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check size={20} className="text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">
                        bottled water and snacks are included in the vehicle
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check size={20} className="text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">hot lunch at a restaurant</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check size={20} className="text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">WIFI</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check size={20} className="text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">USB charging ports</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check size={20} className="text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">comfortable reclining leather seats</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 font-semibold text-sm">✕</span>
                      <span className="text-gray-700 text-sm">Gratuities</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 font-semibold text-sm">✕</span>
                      <span className="text-gray-700 text-sm">Souvenirs</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Important information</h2>

                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Not suitable for</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Children under 5 years</li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Not allowed</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Pets</li>
                      <li>• Luggage or large bags</li>
                      <li>• Mobility scooters</li>
                      <li>• Alcohol and drugs...</li>
                    </ul>
                    <button className="text-blue-600 hover:underline text-sm font-medium mt-3">See more</button>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Know before you go</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>
                        • Please do not book a flight, show, or restaurant reservation close to the expected return time
                        in case of traffic, car trouble, or some unforeseen event
                      </li>
                      <li>
                        • Please ensure that you are reachable by phone on the day of the tour just in case the driver
                        cannot find you...
                      </li>
                    </ul>
                    <button className="text-blue-600 hover:underline text-sm font-medium mt-3">See more</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Panel */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
              {/* Likely to sell out badge */}
              {tour.likelySellOut && (
                <div className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold mb-4 inline-block">
                  Likely to sell out
                </div>
              )}

              {/* Price */}
              <div className="mb-6">
                <p className="text-gray-600 text-sm mb-2">From</p>
                <div className="flex items-baseline gap-2">
                  {tour.originalPrice && (
                    <span className="text-gray-400 line-through text-sm">${tour.originalPrice}</span>
                  )}
                  <span className="text-4xl font-bold text-gray-900">${tour.price}</span>
                  <span className="text-gray-600 text-sm">per person</span>
                </div>
              </div>

              {/* Travelers Selector */}
              <div className="mb-4 relative">
                <button
                  onClick={() => setIsTravelerPickerOpen(!isTravelerPickerOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg hover:border-gray-400 transition text-gray-700 font-medium"
                >
                  <span className="flex items-center gap-2">
                    <span>👥</span>
                    <span>Adult x 1</span>
                  </span>
                  <ChevronLeft size={20} className="text-gray-600 rotate-180" />
                </button>
                <TravelerCounter isOpen={isTravelerPickerOpen} onClose={() => setIsTravelerPickerOpen(false)} />
              </div>

              {/* Date Selector */}
              <div className="mb-6 relative">
                <button
                  onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg hover:border-gray-400 transition text-gray-700 font-medium"
                >
                  <span className="flex items-center gap-2">
                    <span>📅</span>
                    <span>Select date</span>
                  </span>
                  <ChevronLeft size={20} className="text-gray-600 rotate-180" />
                </button>
                <DatePicker isOpen={isDatePickerOpen} onClose={() => setIsDatePickerOpen(false)} />
              </div>

              {/* Benefits */}
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex items-start gap-3">
                  <Check size={20} className="text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Free cancellation</p>
                    <p className="text-gray-600 text-xs">Cancel up to 24 hours in advance for a full refund</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check size={20} className="text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Reserve now & pay later</p>
                    <p className="text-gray-600 text-xs">
                      Keep your travel plans flexible — book your spot and pay nothing today.{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        Read more
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">You might also like...</h2>

          {/* Carousel Container */}
          <div className="relative">
            <style>{`
                #related-tours-carousel::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
            <div
              className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
              id="related-tours-carousel"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {/* Tour Card 1 - Top Rated */}
              <div className="flex-shrink-0 w-80">
                <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer">
                  {/* Image Container */}
                  <div className="relative">
                    <img
                      src="/city-tour-with-people-and-buildings.jpg"
                      alt="Full-Day City Tour of LA"
                      className="w-full h-60 object-cover"
                    />
                    {/* Top rated Badge */}
                    <div className="absolute top-3 left-3 bg-gray-900 text-white px-3 py-1 rounded text-xs font-bold">
                      Top rated
                    </div>
                    {/* Wishlist Heart */}
                    <button className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100 transition">
                      <Heart size={20} className="text-gray-400 hover:text-red-500" />
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Full-Day City Tour of LA, Hollywood, Beverly Hills & Beaches
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">Pickup available • Small group • 7.5 - 9 hours</p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex text-yellow-400">
                        {"★".repeat(4)}
                        <span className="text-gray-300">★</span>
                      </div>
                      <span className="text-gray-900 font-semibold text-sm">4.7</span>
                      <span className="text-gray-600 text-sm">(597)</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-gray-600 text-sm">From</span>
                      <span className="text-red-600 font-bold text-lg">$81</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tour Card 2 */}
              <div className="flex-shrink-0 w-80">
                <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer">
                  <div className="relative">
                    <img
                      src="/colorful-tour-bus-open-air.jpg"
                      alt="Hollywood Tour Bus"
                      className="w-full h-60 object-cover"
                    />
                    <button className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100 transition">
                      <Heart size={20} className="text-gray-400 hover:text-red-500" />
                    </button>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Hollywood, Beverly Hills & Celebrity Homes Open-Air Bus Tour
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">2 - 3.5 hours</p>
                    <p className="text-gray-600 text-sm mb-3 text-xs">Certified by City Rome Tickets</p>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex text-yellow-400">
                        {"★".repeat(4)}
                        <span className="text-gray-300">★</span>
                      </div>
                      <span className="text-gray-900 font-semibold text-sm">4.5</span>
                      <span className="text-gray-600 text-sm">(1,702)</span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-gray-600 text-sm">From</span>
                      <span className="text-red-600 font-bold text-lg">$33</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tour Card 3 */}
              <div className="flex-shrink-0 w-80">
                <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer">
                  <div className="relative">
                    <img
                      src="/bike-tour-santa-monica-beach.jpg"
                      alt="Santa Monica Beach Bike Tour"
                      className="w-full h-60 object-cover"
                    />
                    <button className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100 transition">
                      <Heart size={20} className="text-gray-400 hover:text-red-500" />
                    </button>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      LA: Santa Monica & Venice Beach Guided Bike or eBike Tour
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">3 hours</p>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex text-yellow-400">
                        {"★".repeat(4)}
                        <span className="text-gray-300">★</span>
                      </div>
                      <span className="text-gray-900 font-semibold text-sm">4.4</span>
                      <span className="text-gray-600 text-sm">(24)</span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-gray-600 text-sm">From</span>
                      <span className="text-red-600 font-bold text-lg">$71</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tour Card 4 */}
              <div className="flex-shrink-0 w-80">
                <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer">
                  <div className="relative">
                    <img
                      src="/hollywood-sign-hiking-tour.jpg"
                      alt="Hollywood Sign Private Tour"
                      className="w-full h-60 object-cover"
                    />
                    <button className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100 transition">
                      <Heart size={20} className="text-gray-400 hover:text-red-500" />
                    </button>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Los Angeles: Private Half Day City Tour</h3>
                    <p className="text-gray-600 text-sm mb-3">4 hours • Pickup available</p>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                      <span className="text-gray-900 font-semibold text-sm">5.0</span>
                      <span className="text-gray-600 text-sm">(3)</span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-gray-600 text-sm">From</span>
                      <span className="text-red-600 font-bold text-lg">$599</span>
                      <span className="text-gray-600 text-xs">per group up to 6</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                const carousel = document.getElementById("related-tours-carousel")
                if (carousel) {
                  carousel.scrollLeft -= 400
                }
              }}
              className="absolute -left-6 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition text-blue-600 hover:bg-blue-50 z-10"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Right Scroll Arrow */}
            <button
              onClick={() => {
                const carousel = document.getElementById("related-tours-carousel")
                if (carousel) {
                  carousel.scrollLeft += 400
                }
              }}
              className="absolute -right-6 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition text-blue-600 hover:bg-blue-50 z-10"
            >
              <ChevronLeft size={24} className="rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
