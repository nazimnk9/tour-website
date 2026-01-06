"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "/images/carousel_3.jpg",
      title: "Discover & book things to do",
      subtitle: "Find places and things to do",
    },
    {
      image: "/images/carousel_2.jpg",
      title: "Discover & book things to do",
      subtitle: "Find places and things to do",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative w-full h-96 sm:h-[500px] overflow-hidden">
      {/* Slide */}
      <div className="relative w-full h-full">
        <img
          src={slides[currentSlide].image || "/placeholder.svg"}
          alt="Hero carousel"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        {/* <div className="absolute inset-0 bg-opacity-40"></div> */}

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-6 text-balance">Discover & book things to do</h1>

          <div className="w-full max-w-2xl">
            <div className="flex items-center bg-white rounded-full shadow-lg p-2">
              <input
                type="text"
                placeholder="Find places and things to do"
                className="flex-1 px-6 py-4 sm:py-5 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0 bg-white rounded-full"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 sm:px-10 py-4 sm:py-5 transition flex-shrink-0 rounded-full flex items-center gap-2">
                <Search size={20} />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full transition z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full transition z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentSlide ? "bg-black" : "bg-white bg-opacity-50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
