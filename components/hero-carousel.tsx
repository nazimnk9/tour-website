"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "/images/carousel2.jpg",
      title: "Discover & Book things to do",
      subtitle: "Find places and things to do",
    },
    {
      image: "/images/carousel1.jpg",
      title: "Explore the World with us",
      subtitle: "Find places and things to do",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <div className="relative w-full h-96 sm:h-[500px] overflow-hidden">
      {/* Slide */}
      <div className="relative w-full h-full">
        <img
          src={slides[currentSlide].image || "/placeholder.svg"}
          alt="Hero carousel"
          className="w-full h-full object-cover blur-[1px] brightness-40"
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 sm:mb-6 text-balance">
            {slides[currentSlide].title}
          </h1>

          {/* Search (mobile-friendly) */}
          <div className="w-full max-w-2xl">
            <div className="bg-white/95 backdrop-blur rounded-2xl sm:rounded-full shadow-lg p-2">
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2 sm:gap-0">
                <div className="flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4">
                  <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                  <input
                    type="text"
                    placeholder={slides[currentSlide].subtitle}
                    className="w-full bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                </div>

                <button className="w-full sm:w-auto bg-[#ff5533] hover:bg-[#ff5533]/90 text-white font-semibold px-6 sm:px-10 py-3 sm:py-4 transition rounded-xl sm:rounded-full flex items-center justify-center gap-2">
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows (bigger touch targets on mobile) */}
      {/* <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 p-3 sm:p-2 rounded-full transition z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button> */}

      {/* <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 p-3 sm:p-2 rounded-full transition z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button> */}

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 w-3 rounded-full transition ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
