import { TourPlan } from "@/services/tourService"
import { Heart } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function TourCard({ tour }: { tour: TourPlan }) {
  const [isFavorite, setIsFavorite] = useState(false)

  // Use first image or placeholder
  const imageUrl = tour.images && tour.images.length > 0 ? tour.images[0].file : "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"

  return (
    <Link href={`/tour/${tour.id}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-48 sm:h-56 overflow-hidden group flex-shrink-0">
          <img
            src={imageUrl}
            alt={tour.title}
            className="w-full h-full object-fixed group-hover:scale-105 transition duration-300"
          />

          {/* Badge - Originals by City Rome Tickets */}
          <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded flex items-center gap-1 text-xs font-medium">
            <span className="w-4 h-4 bg-orange-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
              G
            </span>
            Originals by City Rome Tickets
          </div>

          {/* Wishlist Heart */}
          {/* <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100 transition shadow"
            aria-label="Add to wishlist"
          >
            <Heart size={20} className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"} />
          </button> */}

          {/* Orange bar at bottom of image */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500"></div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 flex flex-col flex-grow">
          {/* Category - Static or derived if available */}
          <div className="text-xs font-semibold text-gray-600 uppercase mb-2">{tour.status === 'ACTIVE' ? 'ACTIVE TOUR' : 'TOUR'}</div>

          {/* Title */}
          <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-3 h-12 sm:h-14">{tour.title}</h3>

          {/* Description used as details for now or truncated */}
          <div className="text-xs text-gray-600 mb-3 mt-2 space-y-1 line-clamp-2">
            <p>{tour.description}</p>
          </div>

          {/* Price */}
          <div className="mt-auto pt-2 flex items-baseline gap-2">
            <span className="text-xs text-gray-600">From</span>
            <span className="text-lg sm:text-xl font-semibold text-gray-900">€{tour.price_adult}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
