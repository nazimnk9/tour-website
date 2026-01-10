"use client"

import { Heart, Star } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

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
}

export default function TourCard({ tour }: { tour: Tour }) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <Link href={`/tour/${tour.id}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
        {/* Image Container */}
        <div className="relative h-48 sm:h-56 overflow-hidden group">
          <img
            src={tour.image || "/placeholder.svg"}
            alt={tour.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />

          {/* Badge - Originals by City Rome Tickets */}
          <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded flex items-center gap-1 text-xs font-medium">
            <span className="w-4 h-4 bg-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              G
            </span>
            Originals by City Rome Tickets
          </div>

          {/* Wishlist Heart */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100 transition shadow"
            aria-label="Add to wishlist"
          >
            <Heart size={20} className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"} />
          </button>

          {/* Orange bar at bottom of image */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500"></div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          {/* Category */}
          <div className="text-xs font-bold text-gray-600 uppercase mb-2">{tour.category}</div>

          {/* Title */}
          <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-3 line-clamp-3 h-12 sm:h-14">{tour.title}</h3>

          {/* Details */}
          <div className="text-xs text-gray-600 mb-3 space-y-1">
            {tour.duration && <p>{tour.duration}</p>}
            {tour.groupSize && tour.skipLine && (
              <p>
                {tour.groupSize} • {tour.skipLine ? "Skip the line" : ""}
              </p>
            )}
            {tour.groupSize && !tour.skipLine && <p>{tour.groupSize}</p>}
            {!tour.groupSize && tour.skipLine && <p>Skip the line</p>}
          </div>

          {/* Likely to sell out badge */}
          {tour.likelySellOut && (
            <div className="inline-block bg-red-600 text-white px-2 py-1 rounded text-xs font-bold mb-3">
              Likely to sell out
            </div>
          )}

          {/* Rating and Reviews */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star size={16} fill="#FCD34D" className="text-yellow-400" />
              <span className="font-semibold text-sm text-gray-900">{tour.rating}</span>
            </div>
            <span className="text-xs text-gray-600">({tour.reviews.toLocaleString()})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            {tour.fromPrice && <span className="text-xs text-gray-600">From</span>}
            {tour.originalPrice && <span className="text-xs text-gray-400 line-through">${tour.originalPrice}</span>}
            <span className="text-lg sm:text-xl font-bold text-gray-900">${tour.price}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
