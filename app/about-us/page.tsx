"use client"

import React from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Phone, Mail, Users, Calendar, ShieldCheck, Tag } from "lucide-react"

export default function AboutUsPage() {
    return (
        <div className="min-h-screen bg-white font-sans text-[#051036]">
            <Navbar />

            <main>
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        {/* Left: Image with text and badge */}
                        <div className="relative w-full lg:w-1/2">
                            {/* <div className="absolute -left-12 top-1/2 -rotate-90 origin-center whitespace-nowrap hidden xl:block">
                                <span className="text-sm tracking-[0.2em] font-medium text-gray-400">
                                    <span className="text-[#86bc24]">SINE 1993</span> - 31 YEARS OF EXPERIENCE
                                </span>
                            </div> */}
                            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80"
                                    alt="Scenic landscape"
                                    className="w-full h-full object-fixed"
                                />

                                {/* Tripadvisor Badge */}
                                {/* <div className="absolute top-6 right-6 bg-white rounded-lg p-3 shadow-lg flex flex-col items-center">
                                    <div className="text-[10px] font-bold text-gray-800 mb-1">2024</div>
                                    <div className="text-[12px] font-black italic tracking-tighter mb-1">Travelers&apos;</div>
                                    <div className="text-[12px] font-black italic tracking-tighter mb-2">Choice&ordm;</div>
                                    <div className="bg-[#00af87] rounded-full p-1 mb-2">
                                        <img src="https://www.tripadvisor.com/img/cdsi/img2/branding/v2/Tripadvisor_lockup_horizontal_secondary_colored-11748-2.svg" alt="Tripadvisor" className="h-4 invert" />
                                    </div>
                                    <div className="bg-[#001e32] text-white text-[10px] px-3 py-1 rounded w-full text-center font-bold">Tripadvisor</div>
                                </div> */}

                                {/* <div className="absolute bottom-8 left-8 right-8 text-white">
                                    <div className="h-10 w-24 bg-white/20 backdrop-blur-md rounded-full mb-4"></div>
                                </div> */}
                            </div>
                        </div>

                        {/* Right: Content */}
                        <div className="w-full lg:w-1/2 lg:pl-12">
                            <h4 className="text-orange-500 uppercase tracking-widest text-sm font-bold mb-4">Moliva Travel Agency</h4>
                            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-8">
                                We are the leading tour service provider in Moliva
                            </h1>
                            <p className="text-gray-600 text-[15px] leading-relaxed mb-10">
                                Moliva Travel Agency is your gateway to unforgettable adventures in the beautiful country of Moliva.
                                With years of experience and a passion for travel, we offer expertly curated tours that showcase
                                Moliva&apos;s stunning landscapes, vibrant culture, and rich history. Our dedicated team ensures every
                                aspect of your journey is seamless, from comfortable accommodations to immersive activities.
                                Whether exploring majestic mountains, serene lakes, or bustling market districts, our itineraries
                                cater to all interests. At Moliva Travel Agency, we pride ourselves on exceptional service and
                                unique experiences that leave lasting memories. Discover Moliva&apos;s hidden gems with us!
                            </p>

                            <div className="flex flex-wrap gap-6 items-center">
                                {/* <button className="bg-[#86bc24] hover:bg-[#75a61f] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg">
                                    <Mail size={18} />
                                    Let&apos;s talk now
                                </button> */}
                                <div className="flex items-center gap-2 text-gray-800 font-bold">
                                    <Mail size={18} className="text-[#86bc24]" />
                                    <span>example@gmail.com</span>
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
                <section className="relative py-52 overflow-hidden min-h-screen">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/ocean.jpg"
                            alt="Background"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-[#051036]/30"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl py-32 mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                        <span className="text-orange-500 uppercase tracking-widest text-sm font-bold block mb-4">Great Experience</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-16">Why choose us</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Feature 1 */}
                            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-6">
                                    <Users size={24} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-4">Leading travel agency in Moliva</h3>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    Top-rated agency in Moliva is renowned for exceptional service and unforgettable travel experiences.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-6">
                                    <Calendar size={24} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-4">Years of experience in tour operations</h3>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    With years of expertise, we excel at organizing seamless, enjoyable, and memorable tours for every traveler.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-6">
                                    <ShieldCheck size={24} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-4">Flexible tour packages and bookings</h3>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    We offer customizable trips with flexible packages and convenient booking options tailored to your needs.
                                </p>
                            </div>

                            {/* Feature 4 */}
                            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-6">
                                    <Tag size={24} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-4">Best prices with attractive Offers</h3>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    Enjoy unbeatable prices and exclusive offers, ensuring you receive great value with memorable vacation.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
