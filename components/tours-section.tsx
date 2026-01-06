"use client"

import TourCard from "./tour-card"

export default function ToursSection() {
  const tours = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      title: "From Manapouri: Doubtful Sound Wilderness Day Trip",
      category: "DAY TRIP",
      duration: "7 hours",
      rating: 4.8,
      reviews: 1087,
      price: 202,
      fromPrice: true,
      likelySellOut: true,
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      title: "From Paris: Day Trip to Champagne with 8 Tastings & Lunch",
      category: "DAY TRIP",
      duration: "10 - 11 hours",
      groupSize: "Small group",
      skipLine: true,
      rating: 4.8,
      reviews: 1493,
      price: 380,
      fromPrice: true,
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      title: "From Edinburgh: Glenfinnan, Glencoe, and Highlands Day Trip",
      category: "DAY TRIP",
      duration: "12 hours",
      groupSize: "Small group",
      rating: 4.6,
      reviews: 6631,
      originalPrice: 78,
      price: 70,
      fromPrice: true,
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
      title: "From Milan: St. Moritz and Bernina Express Tour",
      category: "DAY TRIP",
      duration: "13 hours",
      skipLine: true,
      rating: 4.5,
      reviews: 2909,
      price: 195,
      fromPrice: true,
      likelySellOut: true,
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      title: "Barcelona: Montserrat, Cogwheel, Black Madonna & Winery Tour",
      category: "DAY TRIP",
      duration: "5 - 10 hours",
      skipLine: true,
      rating: 4.8,
      reviews: 5450,
      price: 50,
      fromPrice: true,
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
      title: "Dubai: Overnight Safari, Dinner, Stargazing & Al Khayma Camp",
      category: "DAY TRIP",
      duration: "17 hours",
      groupSize: "Small group",
      rating: 4.8,
      reviews: 2475,
      price: 180,
      fromPrice: true,
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      title: "From Venice: Dolomites, Cortina and Lake Braies Day Trip",
      category: "DAY TRIP",
      duration: "9 hours",
      groupSize: "Small group",
      rating: 4.9,
      reviews: 437,
      price: 193,
      fromPrice: true,
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
      title: "Athens: Mythology of Delphi, Museum and Arachova Guided Tour",
      category: "DAY TRIP",
      duration: "10 hours",
      skipLine: true,
      rating: 4.7,
      reviews: 4989,
      price: 32,
      fromPrice: true,
    },
  ]

  return (
    <section className="w-full bg-gray-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Unforgettable travel experiences</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  )
}
