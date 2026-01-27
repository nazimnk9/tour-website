"use client"

import React from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import TypingDots from "@/components/TypingDots";
import { Phone, Mail, Users, Calendar, ShieldCheck, Tag } from "lucide-react"

export default function AboutUsPage() {
    return (
        <div className="min-h-screen bg-white font-sans text-[#051036]">
            <Navbar />

            <main>
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        {/* Left: Image with text and badge */}
                        <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start">
                            <div
                                className="
                                relative overflow-hidden rounded-2xl shadow-2xl
                                w-[220px] h-[220px]
                                sm:w-[260px] sm:h-[260px]
                                md:w-[300px] md:h-[300px]
                                lg:w-[340px] lg:h-[340px]
                                xl:w-[380px] xl:h-[380px]
                                "
                            >
                                <img
                                src="/images/memory.png"
                                alt="Scenic landscape"
                                className="w-full h-full object-cover object-center"
                                loading="lazy"
                                />
                            </div>
                        </div>



                        {/* Right: Content */}
                        <div className="w-full lg:w-1/2 ">
                            <h4 className="text-orange-500 uppercase tracking-widest text-sm font-bold mb-4">
                            <TypingDots text="City Rome Tickets" />
                            </h4>
                            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-8">
                                We Are a Leading Tour Service Provider in Rome
                            </h1>
                            <p className="text-gray-600 text-[15px] leading-relaxed mb-10">
                                Our Rome-based tour service specializes in delivering seamless and enriching sightseeing experiences in the heart of Rome. With extensive expertise and a deep appreciation for Italy’s cultural heritage, we provide carefully designed tours that allow travelers to explore iconic landmarks with ease and comfort.
                                Our experienced team ensures smooth access, knowledgeable guidance, and well-organized itineraries that maximize your time at world-famous historical and religious sites.
                                From ancient architectural wonders to masterpieces of art and history, every experience is crafted to be engaging, informative, and stress-free. We are committed to exceptional service, personalized attention, and memorable journeys that bring Italy’s timeless history to life.
                            </p>

                            <div className="flex flex-wrap gap-6 items-center">
                                {/* <button className="bg-[#86bc24] hover:bg-[#75a61f] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg">
                                    <Mail size={18} />
                                    Let&apos;s talk now
                                </button> */}
                                <div className="flex items-center gap-2 text-gray-800 font-bold">
                                    <Mail size={18} className="text-[#86bc24]" />
                                    <a href="mailto:cityrometickets@gmail.com">cityrometickets@gmail.com</a>
                                </div>
                                <div className="flex items-center gap-2 text-gray-800 font-bold">
                                    <Phone size={18} className="text-[#86bc24]" />
                                    <span>+33 321-654-987</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us Section */}
                {/* Why Choose Us Section */}
<section className="relative min-h-screen w-full overflow-hidden">
  {/* Background Video */}
  <div className="absolute inset-0 z-0">
    <video
      className="h-full w-full object-cover brightness-[0.6]"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    >
      <source src="images/about_video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    {/* Overlay (helps text readability on bright scenes) */}
    <div className="absolute inset-0 bg-[#051036]/60" />
  </div>

  {/* Content */}
  <div className="relative z-10 flex min-h-screen items-center">
    <div className="mx-auto w-full max-w-7xl px-4 py-16 text-center text-white sm:px-6 lg:px-8">
      <span className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-orange-500 sm:text-sm">
        Great Experience
      </span>

      <h2 className="mb-10 text-3xl font-extrabold leading-tight sm:text-4xl md:mb-14 md:text-5xl">
        Why choose us
      </h2>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* Feature 1 */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500">
            <Users size={24} className="text-white" />
          </div>
          <h3 className="mb-3 text-lg font-bold sm:text-xl">
            Leading travel agency
          </h3>
          <p className="text-sm leading-relaxed text-white/80">
            Top-rated agency in Italy is renowned for exceptional service and unforgettable travel experiences.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500">
            <Calendar size={24} className="text-white" />
          </div>
          <h3 className="mb-3 text-lg font-bold sm:text-xl">
            Years of experience in tour operations
          </h3>
          <p className="text-sm leading-relaxed text-white/80">
            With years of expertise, we excel at organizing seamless, enjoyable, and memorable tours for every traveler.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500">
            <ShieldCheck size={24} className="text-white" />
          </div>
          <h3 className="mb-3 text-lg font-bold sm:text-xl">
            Flexible tour packages and bookings
          </h3>
          <p className="text-sm leading-relaxed text-white/80">
            We offer customizable trips with flexible packages and convenient booking options tailored to your needs.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500">
            <Tag size={24} className="text-white" />
          </div>
          <h3 className="mb-3 text-lg font-bold sm:text-xl">
            Best prices with attractive offers
          </h3>
          <p className="text-sm leading-relaxed text-white/80">
            Enjoy unbeatable prices and exclusive offers, ensuring you receive great value with memorable vacation.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

            </main>
            <Footer />
        </div>
    )
}
